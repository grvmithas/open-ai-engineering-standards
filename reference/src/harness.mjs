import { createHash, randomBytes } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export class HarnessError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = "HarnessError";
    this.code = code;
    this.details = details;
  }
}

export class InMemoryStore {
  constructor() {
    this.values = new Map();
  }
  async get(key) {
    return this.values.get(key);
  }
  async put(key, value) {
    this.values.set(key, structuredClone(value));
  }
}

export class JsonFileStore {
  constructor(path) {
    this.path = path;
    this.writeQueue = Promise.resolve();
  }
  async readAll() {
    try {
      return JSON.parse(await readFile(this.path, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return {};
      throw error;
    }
  }
  async get(key) {
    return (await this.readAll())[key];
  }
  async put(key, value) {
    const write = async () => {
      const values = await this.readAll();
      values[key] = structuredClone(value);
      await mkdir(dirname(this.path), { recursive: true });
      const temporaryPath = `${this.path}.${process.pid}.tmp`;
      await writeFile(temporaryPath, `${JSON.stringify(values, null, 2)}\n`, { encoding: "utf8", mode: 0o600 });
      await rename(temporaryPath, this.path);
    };
    this.writeQueue = this.writeQueue.then(write, write);
    return this.writeQueue;
  }
}

export class AuditLog {
  constructor(clock = () => new Date()) {
    this.clock = clock;
    this.events = [];
  }
  async emit(type, attributes = {}) {
    const event = {
      schemaVersion: "1.0.0",
      timestamp: this.clock().toISOString(),
      type,
      attributes: structuredClone(attributes),
    };
    this.events.push(event);
    return event;
  }
}

export class CredentialBroker {
  constructor({ issuer, clock = () => new Date(), maxTtlSeconds = 300 }) {
    this.issuer = issuer;
    this.clock = clock;
    this.maxTtlSeconds = maxTtlSeconds;
  }
  async issue({ subject, audience, scopes, ttlSeconds = 60 }) {
    if (!subject || !audience || !Array.isArray(scopes) || scopes.length === 0) {
      throw new HarnessError("credential_invalid", "Delegated credentials require subject, audience, and scopes");
    }
    if (ttlSeconds <= 0 || ttlSeconds > this.maxTtlSeconds) {
      throw new HarnessError("credential_ttl_exceeded", `Credential TTL must be 1-${this.maxTtlSeconds} seconds`);
    }
    const issuedAt = this.clock();
    return this.issuer({
      subject,
      audience,
      scopes: [...new Set(scopes)].sort(),
      issuedAt: issuedAt.toISOString(),
      expiresAt: new Date(issuedAt.getTime() + ttlSeconds * 1000).toISOString(),
    });
  }
}

export class TokenCostBudget {
  constructor({ maxInputTokens, maxOutputTokens, maxCostUsd }) {
    this.limit = { inputTokens: maxInputTokens, outputTokens: maxOutputTokens, costUsd: maxCostUsd };
    this.used = { inputTokens: 0, outputTokens: 0, costUsd: 0 };
  }
  reserve(estimate) {
    for (const key of Object.keys(this.limit)) {
      if (this.used[key] + estimate[key] > this.limit[key]) {
        throw new HarnessError("budget_exceeded", `${key} budget exceeded`, {
          limit: this.limit[key],
          attempted: this.used[key] + estimate[key],
        });
      }
    }
  }
  consume(usage) {
    this.reserve(usage);
    for (const key of Object.keys(this.used)) this.used[key] += usage[key];
  }
  snapshot() {
    return { limit: { ...this.limit }, used: { ...this.used } };
  }
}

function hex(bytes) {
  return randomBytes(bytes).toString("hex");
}

export class TraceRecorder {
  constructor({ clockNanos = () => BigInt(Date.now()) * 1_000_000n, idFactory = hex } = {}) {
    this.clockNanos = clockNanos;
    this.idFactory = idFactory;
    this.traceId = idFactory(16);
    this.spans = [];
  }
  async span(name, attributes, operation, parentSpanId) {
    const span = {
      traceId: this.traceId,
      spanId: this.idFactory(8),
      ...(parentSpanId ? { parentSpanId } : {}),
      name,
      kind: "INTERNAL",
      startTimeUnixNano: this.clockNanos().toString(),
      endTimeUnixNano: undefined,
      status: { code: "UNSET" },
      attributes: { ...attributes },
      events: [],
    };
    this.spans.push(span);
    try {
      const result = await operation(span);
      span.status = { code: "OK" };
      return result;
    } catch (error) {
      span.status = { code: "ERROR", message: error.message };
      span.events.push({
        name: "exception",
        timeUnixNano: this.clockNanos().toString(),
        attributes: { "exception.type": error.name, "exception.message": error.message },
      });
      throw error;
    } finally {
      span.endTimeUnixNano = this.clockNanos().toString();
    }
  }
  export() {
    return {
      resourceSpans: [{
        resource: { attributes: { "service.name": "oaies-reference-harness" } },
        scopeSpans: [{ scope: { name: "oaies.reference", version: "1.0.0" }, spans: structuredClone(this.spans) }],
      }],
    };
  }
}

function throwIfCancelled(signal) {
  if (signal?.aborted) throw new HarnessError("cancelled", "Execution cancelled", { reason: signal.reason });
}

function validateStructuredOutput(output) {
  if (
    output === null ||
    typeof output !== "object" ||
    Array.isArray(output) ||
    typeof output.answer !== "string" ||
    !Array.isArray(output.toolCalls) ||
    output.toolCalls.some(
      (call) => !call || typeof call !== "object" || typeof call.name !== "string" || typeof call.arguments !== "object",
    )
  ) {
    throw new HarnessError(
      "structured_output_invalid",
      "Provider output must match { answer: string, toolCalls: Array<{ name, arguments }> }",
    );
  }
  return output;
}

function hashRequest(request) {
  return createHash("sha256")
    .update(JSON.stringify({ user: request.user, query: request.query, context: request.context ?? null }))
    .digest("hex");
}

export class ReferenceHarness {
  constructor(dependencies) {
    this.authorization = dependencies.authorization;
    this.retriever = dependencies.retriever;
    this.policy = dependencies.policy;
    this.providers = dependencies.providers;
    this.toolGate = dependencies.toolGate;
    this.sandbox = dependencies.sandbox;
    this.credentialBroker = dependencies.credentialBroker;
    this.checkpoints = dependencies.checkpoints;
    this.idempotency = dependencies.idempotency;
    this.audit = dependencies.audit;
    this.traceFactory = dependencies.traceFactory ?? (() => new TraceRecorder());
  }

  async run(request, options = {}) {
    if (!request.idempotencyKey || !request.user?.id || typeof request.query !== "string") {
      throw new HarnessError("request_invalid", "idempotencyKey, user.id, and query are required");
    }
    const requestHash = hashRequest(request);
    const prior = await this.idempotency.get(request.idempotencyKey);
    if (prior) {
      if (prior.requestHash !== requestHash) {
        throw new HarnessError("idempotency_conflict", "Idempotency key was reused with a different request");
      }
      await this.audit.emit("idempotency.replayed", { idempotencyKey: request.idempotencyKey });
      return structuredClone(prior.response);
    }

    const trace = this.traceFactory();
    const budget = new TokenCostBudget(
      options.budget ?? { maxInputTokens: 4_000, maxOutputTokens: 1_000, maxCostUsd: 0.25 },
    );
    const compensations = [];
    const checkpoint = async (stage, data = {}) => {
      await this.checkpoints.put(request.idempotencyKey, {
        schemaVersion: "1.0.0",
        requestHash,
        stage,
        data,
      });
      await this.audit.emit("checkpoint.saved", { idempotencyKey: request.idempotencyKey, stage });
    };

    try {
      throwIfCancelled(options.signal);
      await checkpoint("started");
      const decision = await trace.span("authorization.check", { "enduser.id": request.user.id }, () =>
        this.authorization.authorize({
          subject: request.user,
          action: "retrieve",
          resource: request.context?.collection ?? "default",
        }),
      );
      if (!decision?.allowed) throw new HarnessError("authorization_denied", "Retrieval is not authorized");
      await checkpoint("authorized", { decisionId: decision.decisionId });
      await this.audit.emit("authorization.allowed", { decisionId: decision.decisionId, subject: request.user.id });

      throwIfCancelled(options.signal);
      const documents = await trace.span(
        "retrieval.search",
        { "oaies.authorization.decision_id": decision.decisionId },
        () => this.retriever.search({ query: request.query, authorization: decision }),
      );
      await checkpoint("retrieved", { documentIds: documents.map((document) => document.id) });

      const inputDecision = await this.policy.evaluate({
        phase: "input",
        user: request.user,
        query: request.query,
        documents,
      });
      if (!inputDecision.allowed) throw new HarnessError("policy_denied", inputDecision.reason);
      await this.audit.emit("policy.allowed", { phase: "input", policyVersion: inputDecision.policyVersion });

      throwIfCancelled(options.signal);
      const estimate = options.estimate ?? { inputTokens: 500, outputTokens: 250, costUsd: 0.05 };
      budget.reserve(estimate);
      let modelOutput;
      let providerName;
      const providerErrors = [];
      for (const provider of this.providers) {
        try {
          modelOutput = await trace.span(
            "model.generate",
            { "gen_ai.system": provider.name, "gen_ai.request.model": provider.model },
            () => provider.generate({ query: request.query, documents, responseFormat: "oaies.answer.v1" }),
          );
          modelOutput = validateStructuredOutput(modelOutput);
          providerName = provider.name;
          break;
        } catch (error) {
          modelOutput = undefined;
          providerErrors.push({ provider: provider.name, code: error.code ?? error.name });
          await this.audit.emit("provider.fallback", { provider: provider.name, code: error.code ?? error.name });
        }
      }
      if (!modelOutput) throw new HarnessError("providers_exhausted", "Every configured provider failed", { providerErrors });
      budget.consume(modelOutput.usage ?? estimate);
      await checkpoint("generated", { provider: providerName });

      const toolResults = [];
      for (const call of modelOutput.toolCalls) {
        throwIfCancelled(options.signal);
        const gate = await this.toolGate.authorize({ user: request.user, call, request });
        if (!gate.allowed) throw new HarnessError("tool_denied", `Tool ${call.name} is not authorized`);
        const credential = await this.credentialBroker.issue({
          subject: request.user.id,
          audience: call.name,
          scopes: gate.scopes,
          ttlSeconds: Math.min(gate.ttlSeconds ?? 60, 300),
        });
        const execution = await trace.span(
          "tool.execute",
          { "gen_ai.tool.name": call.name, "oaies.sandbox.profile": gate.sandboxProfile },
          () =>
            this.sandbox.execute({
              call,
              credential,
              limits: gate.limits,
              signal: options.signal,
              sandboxProfile: gate.sandboxProfile,
            }),
        );
        toolResults.push({ name: call.name, output: execution.output });
        if (execution.compensate) compensations.push(execution.compensate);
        await this.audit.emit("tool.executed", { name: call.name, credentialExpiresAt: credential.expiresAt });
        await checkpoint("tool_executed", { tool: call.name });
      }

      throwIfCancelled(options.signal);
      const outputDecision = await this.policy.evaluate({
        phase: "output",
        user: request.user,
        answer: modelOutput.answer,
        toolResults,
      });
      if (!outputDecision.allowed) throw new HarnessError("policy_denied", outputDecision.reason);
      const response = {
        schemaVersion: "1.0.0",
        answer: outputDecision.transformedAnswer ?? modelOutput.answer,
        toolResults,
        provider: providerName,
        budget: budget.snapshot(),
        trace: trace.export(),
      };
      await checkpoint("completed", { provider: providerName });
      await this.idempotency.put(request.idempotencyKey, { requestHash, response });
      await this.audit.emit("request.completed", { idempotencyKey: request.idempotencyKey, provider: providerName });
      return response;
    } catch (error) {
      for (const compensate of compensations.reverse()) {
        try {
          await compensate();
          await this.audit.emit("tool.compensated", { idempotencyKey: request.idempotencyKey });
        } catch (compensationError) {
          await this.audit.emit("tool.compensation_failed", { message: compensationError.message });
        }
      }
      await checkpoint("failed", { code: error.code ?? error.name });
      await this.audit.emit("request.failed", { idempotencyKey: request.idempotencyKey, code: error.code ?? error.name });
      throw error;
    }
  }
}
