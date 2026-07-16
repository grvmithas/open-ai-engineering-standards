import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import {
  AuditLog,
  CredentialBroker,
  HarnessError,
  InMemoryStore,
  JsonFileStore,
  ReferenceHarness,
  TraceRecorder,
} from "../src/harness.mjs";

const fixedClock = () => new Date("2026-07-16T12:00:00.000Z");
const traceFactory = () => {
  let tick = 1_000n;
  let id = 0;
  return new TraceRecorder({
    clockNanos: () => tick++,
    idFactory: (bytes) => String(++id).padStart(bytes * 2, "0"),
  });
};

function buildHarness(overrides = {}) {
  const order = [];
  const audit = new AuditLog(fixedClock);
  const checkpoints = new InMemoryStore();
  const idempotency = new InMemoryStore();
  const dependencies = {
    authorization: {
      authorize: async () => {
        order.push("authorization");
        return { allowed: true, decisionId: "decision-1" };
      },
    },
    retriever: {
      search: async ({ authorization }) => {
        order.push("retrieval");
        assert.equal(authorization.decisionId, "decision-1");
        return [{ id: "doc-1", text: "Approved operational guidance." }];
      },
    },
    policy: {
      evaluate: async ({ phase }) => ({
        allowed: true,
        policyVersion: "policy-1",
        ...(phase === "output" ? { transformedAnswer: "Policy-safe answer." } : {}),
      }),
    },
    providers: [{
      name: "local",
      model: "deterministic-fixture",
      generate: async () => ({
        answer: "Draft answer.",
        toolCalls: [],
        usage: { inputTokens: 10, outputTokens: 5, costUsd: 0 },
      }),
    }],
    toolGate: { authorize: async () => ({ allowed: false }) },
    sandbox: { execute: async () => ({ output: null }) },
    credentialBroker: new CredentialBroker({
      clock: fixedClock,
      issuer: async (claims) => ({ ...claims, token: "opaque-test-token" }),
    }),
    checkpoints,
    idempotency,
    audit,
    traceFactory,
    ...overrides,
  };
  return {
    harness: new ReferenceHarness(dependencies),
    order,
    audit,
    checkpoints,
    idempotency,
  };
}

const request = {
  idempotencyKey: "request-1",
  user: { id: "user-1", roles: ["operator"] },
  query: "What is the approved procedure?",
  context: { collection: "runbooks" },
};

test("file store preserves checkpoints across adapter instances", async () => {
  const directory = await mkdtemp(join(tmpdir(), "oaies-checkpoint-"));
  const path = join(directory, "checkpoints.json");
  try {
    await new JsonFileStore(path).put("request-1", { stage: "authorized", decisionId: "decision-1" });
    assert.deepEqual(
      await new JsonFileStore(path).get("request-1"),
      { stage: "authorized", decisionId: "decision-1" },
    );
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test("authorization precedes retrieval and response is structured, governed, and traced", async () => {
  const { harness, order, checkpoints } = buildHarness();
  const response = await harness.run(request);
  assert.deepEqual(order, ["authorization", "retrieval"]);
  assert.equal(response.schemaVersion, "1.0.0");
  assert.equal(response.answer, "Policy-safe answer.");
  assert.equal(response.budget.used.inputTokens, 10);
  assert.match(response.trace.resourceSpans[0].scopeSpans[0].spans[0].traceId, /^[a-f0-9]{32}$/);
  assert.equal((await checkpoints.get(request.idempotencyKey)).stage, "completed");
});

test("fallback is explicit and idempotency prevents repeated side effects", async () => {
  let fallbackCalls = 0;
  const providers = [
    { name: "primary", model: "fixture", generate: async () => { throw new Error("unavailable"); } },
    {
      name: "fallback",
      model: "fixture",
      generate: async () => {
        fallbackCalls += 1;
        return {
          answer: "Recovered.",
          toolCalls: [],
          usage: { inputTokens: 1, outputTokens: 1, costUsd: 0 },
        };
      },
    },
  ];
  const { harness, audit } = buildHarness({ providers });
  const first = await harness.run(request);
  const replay = await harness.run(request);
  assert.equal(first.provider, "fallback");
  assert.deepEqual(replay, first);
  assert.equal(fallbackCalls, 1);
  assert.ok(audit.events.some((event) => event.type === "provider.fallback"));
  assert.ok(audit.events.some((event) => event.type === "idempotency.replayed"));
});

test("tool execution receives a scoped short-lived credential and sandbox limits", async () => {
  let invocation;
  const { harness } = buildHarness({
    providers: [{
      name: "local",
      model: "fixture",
      generate: async () => ({
        answer: "Created.",
        toolCalls: [{ name: "ticket.create", arguments: { title: "Incident" } }],
        usage: { inputTokens: 1, outputTokens: 1, costUsd: 0 },
      }),
    }],
    toolGate: {
      authorize: async () => ({
        allowed: true,
        scopes: ["tickets:write"],
        ttlSeconds: 30,
        sandboxProfile: "network-deny-by-default",
        limits: { timeoutMs: 1_000, memoryMb: 64 },
      }),
    },
    sandbox: {
      execute: async (input) => {
        invocation = input;
        return { output: { ticketId: "T-1" } };
      },
    },
  });
  const response = await harness.run(request);
  assert.equal(invocation.credential.audience, "ticket.create");
  assert.deepEqual(invocation.credential.scopes, ["tickets:write"]);
  assert.equal(invocation.credential.expiresAt, "2026-07-16T12:00:30.000Z");
  assert.equal(invocation.sandboxProfile, "network-deny-by-default");
  assert.deepEqual(response.toolResults, [{ name: "ticket.create", output: { ticketId: "T-1" } }]);
});

test("later policy failure triggers compensation and a durable failed checkpoint", async () => {
  let compensated = 0;
  const { harness, checkpoints, audit } = buildHarness({
    providers: [{
      name: "local",
      model: "fixture",
      generate: async () => ({
        answer: "Sensitive value",
        toolCalls: [{ name: "record.write", arguments: {} }],
        usage: { inputTokens: 1, outputTokens: 1, costUsd: 0 },
      }),
    }],
    toolGate: {
      authorize: async () => ({
        allowed: true,
        scopes: ["record:write"],
        sandboxProfile: "isolated",
        limits: {},
      }),
    },
    sandbox: {
      execute: async () => ({ output: { id: "R-1" }, compensate: async () => { compensated += 1; } }),
    },
    policy: {
      evaluate: async ({ phase }) =>
        phase === "input"
          ? { allowed: true, policyVersion: "policy-1" }
          : { allowed: false, reason: "Sensitive output blocked", policyVersion: "policy-1" },
    },
  });
  await assert.rejects(() => harness.run(request), (error) => error.code === "policy_denied");
  assert.equal(compensated, 1);
  assert.equal((await checkpoints.get(request.idempotencyKey)).stage, "failed");
  assert.ok(audit.events.some((event) => event.type === "tool.compensated"));
});

test("cancellation, budgets, malformed output, and credential TTL fail closed", async () => {
  const cancelled = buildHarness().harness;
  const controller = new AbortController();
  controller.abort("user cancelled");
  await assert.rejects(() => cancelled.run(request, { signal: controller.signal }), (error) => error.code === "cancelled");

  const budgeted = buildHarness().harness;
  await assert.rejects(
    () => budgeted.run({ ...request, idempotencyKey: "budget" }, {
      estimate: { inputTokens: 5, outputTokens: 5, costUsd: 1 },
      budget: { maxInputTokens: 10, maxOutputTokens: 10, maxCostUsd: 0.1 },
    }),
    (error) => error.code === "budget_exceeded",
  );

  const malformed = buildHarness({
    providers: [{ name: "bad", model: "fixture", generate: async () => ({ prose: "not structured" }) }],
  }).harness;
  await assert.rejects(
    () => malformed.run({ ...request, idempotencyKey: "malformed" }),
    (error) => error instanceof HarnessError && error.code === "providers_exhausted",
  );

  const broker = new CredentialBroker({ issuer: async (claims) => claims, clock: fixedClock });
  await assert.rejects(
    () => broker.issue({ subject: "u", audience: "tool", scopes: ["write"], ttlSeconds: 301 }),
    (error) => error.code === "credential_ttl_exceeded",
  );
});
