#!/usr/bin/env node

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const fixturesDirectory = join(root, "fixtures");
const valid = JSON.parse(readFileSync(join(fixturesDirectory, "valid.v1.json"), "utf8"));
const invalid = JSON.parse(readFileSync(join(fixturesDirectory, "invalid.v1.json"), "utf8"));
const schemaNames = Object.keys(valid).sort();
const errors = [];

if (JSON.stringify(schemaNames) !== JSON.stringify(Object.keys(invalid).sort())) {
  errors.push("valid and invalid fixture schema keys differ");
}

for (const schemaName of schemaNames) {
  if (!schemaName.endsWith(".schema.json")) {
    errors.push(`${schemaName}: fixture key is not a schema filename`);
  }
  try {
    readFileSync(join(root, schemaName));
  } catch {
    errors.push(`${schemaName}: referenced schema does not exist`);
  }
}

function requireCondition(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function requireOrderedDates(label, ...values) {
  const timestamps = values.map((value) => Date.parse(value));
  requireCondition(
    timestamps.every(Number.isFinite) &&
      timestamps.every((value, index) => index === 0 || timestamps[index - 1] <= value),
    `${label}: dates are invalid or out of order`,
  );
}

const manifest = valid["ai-system-manifest.v1.schema.json"];
const soa = valid["statement-of-applicability.v1.schema.json"];
const catalog = valid["control-catalog.v1.schema.json"];
const exception = valid["exception.v1.schema.json"];
const evaluation = valid["evaluation-result.v1.schema.json"];
const evidence = valid["evidence-bundle.v1.schema.json"];
const incident = valid["incident.v1.schema.json"];
const riskRegister = valid["risk-register.v1.schema.json"];
const agent = valid["agent-definition.v1.schema.json"];

for (const record of [soa, evaluation, riskRegister, agent]) {
  requireCondition(
    JSON.stringify(record.workloadProfiles) === JSON.stringify(manifest.workloadProfiles) &&
      record.autonomyLevel === manifest.autonomyLevel &&
      record.impactLevel === manifest.impactLevel,
    `${record.id}: kernel classification does not match the system manifest`,
  );
}

const catalogControlIds = catalog.controls.map((control) => control.id);
const decisionControlIds = soa.decisions.map((decision) => decision.controlId);
requireCondition(
  new Set(catalogControlIds).size === catalogControlIds.length,
  "control catalog contains duplicate control IDs",
);
requireCondition(
  new Set(decisionControlIds).size === decisionControlIds.length,
  "SoA contains duplicate control IDs",
);
requireCondition(
  JSON.stringify([...catalogControlIds].sort()) ===
    JSON.stringify([...decisionControlIds].sort()),
  "SoA decisions do not reconcile exactly to the control catalog fixture",
);
requireCondition(
  soa.reconciliation.catalogControlCount === catalogControlIds.length &&
    soa.reconciliation.distinctDecisionCount === new Set(decisionControlIds).size,
  "SoA reconciliation counts are incorrect",
);

const referencedControlIds = new Set([
  exception.controlId,
  ...riskRegister.risks.flatMap((risk) => risk.treatment.controlRefs),
  ...evidence.items.flatMap((item) => item.controlRefs),
]);
for (const controlId of referencedControlIds) {
  requireCondition(
    catalogControlIds.includes(controlId),
    `${controlId}: cross-reference is absent from the catalog fixture`,
  );
}
requireCondition(
  soa.decisions.some(
    (decision) =>
      decision.controlId === exception.controlId &&
      decision.disposition === "applicable-exception" &&
      decision.exceptionRef,
  ),
  "active exception is not represented as applicable-exception in the SoA",
);

requireOrderedDates(
  "manifest lifecycle",
  manifest.createdAt,
  manifest.classificationApprovedAt,
  manifest.updatedAt,
);
requireOrderedDates(
  "SoA assessment period",
  soa.assessmentPeriod.start,
  soa.assessmentPeriod.end,
);
requireOrderedDates("evaluation run", evaluation.startedAt, evaluation.completedAt);
requireOrderedDates(
  "exception lifecycle",
  exception.createdAt,
  exception.detectedAt,
  exception.effectiveAt,
  exception.expiresAt,
  exception.remainingClaimPeriodEnd,
);
requireOrderedDates(
  "exception remediation",
  exception.effectiveAt,
  exception.remediation.dueAt,
  exception.expiresAt,
);
requireOrderedDates("incident reporting", incident.detectedAt, incident.reportedAt);
requireOrderedDates(
  "evidence assessment period",
  evidence.assessmentPeriod.start,
  evidence.assessmentPeriod.end,
  evidence.retentionUntil,
);
for (const item of evidence.items) {
  requireOrderedDates(
    `${item.id} evidence period`,
    item.coveredPeriod.start,
    item.coveredPeriod.end,
    item.collectedAt,
    item.retentionUntil,
  );
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  process.exit(1);
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "oaies-schema-"));
const npx = "npx";

function runNpx(argumentsList) {
  if (process.platform !== "win32") {
    return spawnSync(npx, argumentsList, { encoding: "utf8", stdio: "pipe" });
  }
  const quote = (value) =>
    /[\s"&|<>^]/.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
  return spawnSync(
    process.env.ComSpec ?? "cmd.exe",
    ["/d", "/s", "/c", `npx ${argumentsList.map(quote).join(" ")}`],
    { encoding: "utf8", stdio: "pipe" },
  );
}

try {
  for (const schemaName of schemaNames) {
    const validPath = join(temporaryDirectory, `${basename(schemaName)}.valid.json`);
    const invalidPath = join(temporaryDirectory, `${basename(schemaName)}.invalid.json`);
    writeFileSync(validPath, JSON.stringify(valid[schemaName]), "utf8");
    writeFileSync(invalidPath, JSON.stringify(invalid[schemaName]), "utf8");

    for (const [dataPath, expectation] of [
      [validPath, "--valid"],
      [invalidPath, "--invalid"],
    ]) {
      const result = runNpx([
          "--yes",
          "--package=ajv-cli@5.0.0",
          "--package=ajv-formats@3.0.1",
          "ajv",
          "test",
          "--spec=draft2020",
          "-c",
          "ajv-formats",
          "-s",
          join(root, schemaName),
          "-d",
          dataPath,
          expectation,
        ]);

      if (result.status !== 0) {
        errors.push(
          `${schemaName} ${expectation}\n${result.stdout?.trim() ?? ""}\n${result.stderr?.trim() ?? result.error?.message ?? ""}`.trim(),
        );
      }
    }
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}

if (errors.length > 0) {
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  console.error(`FAILED: ${errors.length} schema fixture pair(s)`);
  process.exit(1);
}

console.log(
  `PASS: ${schemaNames.length} valid and ${schemaNames.length} invalid instances verified with Ajv Draft 2020-12`,
);
