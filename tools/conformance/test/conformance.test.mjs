import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { assess, evaluateApplicability, validateEvidence, validateManifest } from "../lib.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fixture = async (name) => JSON.parse(await readFile(join(root, "fixtures", name), "utf8"));

test("applicability expressions are deterministic and composable", () => {
  const system = {
    environment: "production",
    capabilities: ["retrieval"],
    dataClasses: [],
    deployment: "external",
  };
  assert.equal(evaluateApplicability({ field: "capabilities", operator: "includes", value: "retrieval" }, system), true);
  assert.equal(
    evaluateApplicability(
      {
        all: [
          { field: "environment", operator: "equals", value: "production" },
          { not: { field: "deployment", operator: "equals", value: "internal" } },
        ],
      },
      system,
    ),
    true,
  );
});

test("assessment reports all five statuses with stable ordering", async () => {
  const report = assess(await fixture("manifest.valid.json"), await fixture("evidence.valid.json"));
  assert.equal(report.outcome, "fail");
  assert.deepEqual(report.summary, {
    pass: 1,
    fail: 1,
    not_applicable: 1,
    exception: 1,
    not_assessed: 1,
  });
  assert.deepEqual(
    report.controls.map(({ id, status }) => [id, status]),
    [
      ["AUTHZ-01", "pass"],
      ["BUDGET-01", "fail"],
      ["MEMORY-01", "not_applicable"],
      ["POLICY-01", "not_assessed"],
      ["TRACE-01", "exception"],
    ],
  );
  assert.deepEqual(report.diagnostics.orphanEvidence, ["unmapped-artifact"]);
});

test("expired exceptions and evidence become not assessed at the requested instant", async () => {
  const report = assess(await fixture("manifest.valid.json"), await fixture("evidence.valid.json"), {
    asOf: "2026-09-01T00:00:00.000Z",
  });
  assert.equal(report.controls.find((control) => control.id === "AUTHZ-01").status, "not_assessed");
  assert.equal(report.controls.find((control) => control.id === "TRACE-01").status, "not_assessed");
});

test("negative manifest fixture returns actionable validation errors", async () => {
  const errors = validateManifest(await fixture("manifest.invalid.json"));
  assert.ok(errors.length >= 8);
  assert.ok(errors.some((error) => error.includes("unknown property")));
  assert.ok(errors.some((error) => error.includes("duplicate")));
});

test("evidence rejects malformed digests and unknown properties", () => {
  const errors = validateEvidence({
    schemaVersion: "1.0.0",
    assessmentId: "a",
    generatedAt: "2026-07-16T00:00:00Z",
    artifacts: [{
      id: "x",
      controlId: "C",
      requirementId: "R",
      type: "test",
      uri: "urn:test",
      digest: "not-a-digest",
      observedAt: "never",
      result: "maybe",
      extra: true,
    }],
  });
  assert.ok(errors.some((error) => error.includes("digest")));
  assert.ok(errors.some((error) => error.includes("unknown property")));
  assert.ok(errors.some((error) => error.includes("result")));
});

test("CLI uses distinct assessment and validation exit codes", () => {
  const failed = spawnSync(
    process.execPath,
    [join(root, "cli.mjs"), "assess", "--manifest", join(root, "fixtures", "manifest.valid.json"), "--evidence", join(root, "fixtures", "evidence.valid.json"), "--format", "json"],
    { encoding: "utf8" },
  );
  assert.equal(failed.status, 1);
  assert.equal(JSON.parse(failed.stdout).outcome, "fail");

  const invalid = spawnSync(
    process.execPath,
    [join(root, "cli.mjs"), "assess", "--manifest", join(root, "fixtures", "manifest.invalid.json"), "--evidence", join(root, "fixtures", "evidence.valid.json")],
    { encoding: "utf8" },
  );
  assert.equal(invalid.status, 2);
  assert.match(invalid.stderr, /validation failed/);
});
