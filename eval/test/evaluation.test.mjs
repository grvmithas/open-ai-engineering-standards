import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluateDataset, loadDataset } from "../run.mjs";
import { calibrate } from "../calibrate.mjs";
import { evaluate as evaluateTrace } from "../evaluators/trace.mjs";
import { evaluate as evaluateTools } from "../evaluators/tools.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataset = join(root, "datasets", "v1");

test("versioned dataset contains every required category and dimension", async () => {
  const cases = await loadDataset(dataset);
  assert.equal(cases.length, 8);
  assert.deepEqual(
    [...new Set(cases.map((item) => item.category))].sort(),
    ["adversarial", "edge", "normal", "policy-sensitive"],
  );
  for (const item of cases) {
    assert.deepEqual(
      Object.keys(item.expected).sort(),
      ["finalOutput", "memory", "policy", "retrieval", "routing", "tools", "trace"],
    );
  }
});

test("committed offline candidates pass every deterministic evaluator", async () => {
  const report = await evaluateDataset(dataset, join(root, "fixtures", "candidates.pass.jsonl"));
  assert.equal(report.outcome, "pass");
  for (const aggregate of Object.values(report.aggregate)) {
    assert.deepEqual(aggregate, { passed: 8, total: 8, rate: 1 });
  }
});

test("negative candidates fail closed, including absent case outputs", async () => {
  const report = await evaluateDataset(dataset, join(root, "fixtures", "candidates.fail.jsonl"));
  assert.equal(report.outcome, "fail");
  assert.equal(report.results.filter((result) => !result.passed).length, 8);
  const first = report.results.find((result) => result.id === "normal-runbook-001");
  assert.equal(first.dimensions.retrieval.passed, false);
  assert.equal(first.dimensions.trace.passed, false);
  assert.equal(first.dimensions.finalOutput.passed, false);
});

test("trace and tool evaluators reject control-order and allowlist violations", () => {
  const trace = evaluateTrace(
    { requiredSpans: ["authorization.check", "retrieval.search"], authorizationBeforeRetrieval: true },
    {
      spans: [
        { name: "retrieval.search", traceId: "a".repeat(32), spanId: "a".repeat(16) },
        { name: "authorization.check", traceId: "a".repeat(32), spanId: "b".repeat(16) },
      ],
    },
  );
  assert.equal(trace.passed, false);

  const tools = evaluateTools(
    { allowedCalls: ["ticket.create"], requiredCalls: [] },
    { calls: [{ name: "shell.exec" }] },
  );
  assert.equal(tools.passed, false);
});

test("calibration selects a deterministic threshold and requires both gold labels", () => {
  const report = calibrate([
    { gold: "accept", judgeScore: 0.9 },
    { gold: "accept", judgeScore: 0.7 },
    { gold: "reject", judgeScore: 0.4 },
    { gold: "reject", judgeScore: 0.1 },
  ]);
  assert.equal(report.selected.threshold, 0.7);
  assert.match(report.warning, /not production performance claims/);
  assert.throws(
    () => calibrate([
      { gold: "accept", judgeScore: 0.9 },
      { gold: "accept", judgeScore: 0.8 },
      { gold: "accept", judgeScore: 0.7 },
      { gold: "accept", judgeScore: 0.6 },
    ]),
    /both gold labels/,
  );
});

test("CLI requires no network or paid model keys", () => {
  const execution = spawnSync(
    process.execPath,
    [join(root, "run.mjs"), "--dataset", dataset, "--candidates", join(root, "fixtures", "candidates.pass.jsonl")],
    { encoding: "utf8", env: { PATH: process.env.PATH } },
  );
  assert.equal(execution.status, 0, execution.stderr);
  assert.equal(JSON.parse(execution.stdout).outcome, "pass");
});
