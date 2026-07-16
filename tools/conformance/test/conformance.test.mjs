import assert from "node:assert/strict";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { loadCanonicalSchemas, validateAgainstSchema } from "../canonical-schema.mjs";
import { assess } from "../lib.mjs";
import { loadNormativeControls } from "../normative-kernel.mjs";
import { buildFixture } from "./fixtures.mjs";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const toolRoot = join(repositoryRoot, "tools", "conformance");
const schemaDirectory = join(repositoryRoot, "schemas");
const standardDirectory = join(repositoryRoot, "content", "standard");
const schemas = await loadCanonicalSchemas(schemaDirectory);
const normativeControls = await loadNormativeControls(standardDirectory);
const options = { schemas, normativeControls, asOf: "2026-07-16T00:00:00.000Z" };
const clone = (value) => structuredClone(value);
const run = (fixture, overrides = {}) => assess(fixture, { ...options, ...overrides });
const exceptionControl = (report) => report.controls.find((control) => control.controlId === "OAIES-DAT-010");

test("canonical schemas and normative content are the only contracts", () => {
  assert.ok(normativeControls.length > 40);
  assert.match(schemas.exception.$id, /exception/);
  assert.equal(validateAgainstSchema(buildFixture(normativeControls).manifest, schemas.manifest, "manifest").length, 0);
});

test("valid active exception produces a qualified claim, never unqualified conformance", () => {
  const report = run(buildFixture(normativeControls));
  assert.equal(report.claimStatus, "conformant_with_exceptions");
  assert.equal(report.summary["applicable-exception"], 1);
  assert.equal(exceptionControl(report).disposition, "applicable-exception");
  assert.equal(report.summary["applicable-nonconforming"], 0);
});

test("fully conforming SoA produces unqualified conformance", () => {
  const report = run(buildFixture(normativeControls, { withException: false }));
  assert.equal(report.claimStatus, "conformant");
  assert.equal(report.summary["applicable-exception"], 0);
});

test("forged approval evidence invalidates the exception", () => {
  const fixture = buildFixture(normativeControls);
  fixture.evidence.items.find((item) => item.id === "EVI-APPROVAL-RISK").sourceIdentity = "attacker";
  const report = run(fixture);
  assert.equal(report.claimStatus, "nonconformant");
  assert.match(exceptionControl(report).reasons.join(" "), /lacks attributable approval evidence/);
});

test("expired exception becomes applicable-nonconforming", () => {
  const fixture = buildFixture(normativeControls);
  const report = run(fixture, { asOf: "2026-10-01T00:00:00.000Z" });
  assert.equal(report.claimStatus, "nonconformant");
  assert.match(exceptionControl(report).reasons.join(" "), /not active/);
});

test("wrong system audience and control evidence invalidate compensation", () => {
  const fixture = buildFixture(normativeControls);
  fixture.exceptions[0].systemRef = "urn:oaies:system:SYS-OTHER";
  fixture.evidence.items.find((item) => item.uri === "urn:oaies:evidence:OAIES-DAT-010").controlRefs = ["OAIES-DAT-011"];
  const report = run(fixture);
  assert.equal(report.claimStatus, "nonconformant");
  assert.match(exceptionControl(report).reasons.join(" "), /systemRef does not match/);
  assert.match(exceptionControl(report).reasons.join(" "), /wrong-control/);
});

test("failed compensating control is rejected by canonical exception schema", () => {
  const fixture = buildFixture(normativeControls);
  fixture.exceptions[0].compensatingControls[0].testResult = "fail";
  assert.throws(
    () => run(fixture),
    (error) =>
      error.message === "Canonical schema validation failed" &&
      error.validationErrors.some((message) => message.includes("testResult")),
  );
});

test("missing risk-tier approvals invalidate an otherwise schema-valid exception", () => {
  const fixture = buildFixture(normativeControls);
  fixture.exceptions[0].approvals = fixture.exceptions[0].approvals.map((approval) => ({
    ...approval,
    role: approval.role === "independent-risk-owner" ? "system-owner" : "control-owner",
  }));
  const report = run(fixture);
  assert.equal(report.claimStatus, "nonconformant");
  assert.match(exceptionControl(report).reasons.join(" "), /independent-risk-owner/);
  assert.match(exceptionControl(report).reasons.join(" "), /business-owner/);
});

test("I3 exception requires executive, legal, and independent risk approvals", () => {
  const fixture = buildFixture(normativeControls);
  fixture.manifest.impactLevel = "I3";
  fixture.manifest.workloadProfiles.push("P6");
  fixture.manifest.accountableExecutive = {
    id: "executive",
    name: "Accountable Executive",
    role: "Accountable Executive",
  };
  fixture.soa.impactLevel = "I3";
  fixture.exceptions[0].residualImpact = "I3";
  fixture.exceptions[0].approvals[0].role = "accountable-executive";
  const report = run(fixture);
  assert.equal(report.claimStatus, "nonconformant");
  assert.match(exceptionControl(report).reasons.join(" "), /legal-compliance/);
  assert.match(exceptionControl(report).reasons.join(" "), /independent-risk-owner/);
});

test("stale evidence invalidates a conforming control", () => {
  const fixture = buildFixture(normativeControls, { withException: false });
  const decision = fixture.soa.decisions.find((item) => item.controlId === "OAIES-DAT-010");
  decision.nextReviewAt = "2026-07-01T00:00:00.000Z";
  const report = run(fixture);
  assert.equal(report.claimStatus, "nonconformant");
  assert.match(exceptionControl(report).reasons.join(" "), /stale/);
});

test("incomplete SoA and catalog reconciliation is an invalid assessment input", () => {
  const missingDecision = buildFixture(normativeControls);
  missingDecision.soa.decisions.pop();
  assert.throws(
    () => run(missingDecision),
    (error) =>
      error.message === "Canonical document reconciliation failed" &&
      error.validationErrors.some((message) => message.includes("incomplete or duplicate")),
  );

  const missingCatalogControl = buildFixture(normativeControls);
  missingCatalogControl.catalog.controls.pop();
  assert.throws(
    () => run(missingCatalogControl),
    (error) =>
      error.message === "Canonical document reconciliation failed" &&
      error.validationErrors.some((message) => message.includes("content/standard")),
  );
});

test("prohibited exceptions and material changes cannot qualify a claim", () => {
  const prohibited = buildFixture(normativeControls);
  prohibited.exceptions[0].exactUnmetRequirement = "A legal obligation would be waived during this temporary exception.";
  assert.match(exceptionControl(run(prohibited)).reasons.join(" "), /prohibited condition/);

  const changed = buildFixture(normativeControls);
  changed.manifest.updatedAt = "2026-07-02T00:00:00.000Z";
  assert.match(exceptionControl(run(changed)).reasons.join(" "), /material system change/);
});

test("residual disposition, chronology, and duration policy fail closed", () => {
  const unacceptable = buildFixture(normativeControls);
  unacceptable.exceptions[0].residualRiskDisposition = "unacceptable";
  assert.throws(
    () => run(unacceptable),
    (error) =>
      error.message === "Canonical schema validation failed" &&
      error.validationErrors.some((message) => message.includes("residualRiskDisposition")),
  );

  const chronology = buildFixture(normativeControls);
  chronology.exceptions[0].remediation.dueAt = "2026-08-01T00:00:00.000Z";
  assert.match(exceptionControl(run(chronology)).reasons.join(" "), /remediation horizon/);

  const duration = buildFixture(normativeControls);
  duration.exceptions[0].maximumPermittedDuration = "P30D";
  assert.match(exceptionControl(run(duration)).reasons.join(" "), /maximum permitted duration/);
});

test("CLI returns distinct codes for conformant, qualified, nonconformant, and invalid", async () => {
  const directory = await mkdtemp(join(tmpdir(), "oaies-conformance-"));
  try {
    const writeFixture = async (fixture) => {
      for (const name of ["manifest", "soa", "catalog", "evidence"]) {
        await writeFile(join(directory, `${name}.json`), JSON.stringify(fixture[name]), "utf8");
      }
      if (fixture.exceptions[0]) {
        await writeFile(join(directory, "exception.json"), JSON.stringify(fixture.exceptions[0]), "utf8");
      }
    };
    const command = (includeException = true) => [
      join(toolRoot, "cli.mjs"),
      "assess",
      "--manifest", join(directory, "manifest.json"),
      "--soa", join(directory, "soa.json"),
      "--catalog", join(directory, "catalog.json"),
      "--evidence", join(directory, "evidence.json"),
      ...(includeException ? ["--exception", join(directory, "exception.json")] : []),
      "--schema-dir", schemaDirectory,
      "--standard-dir", standardDirectory,
      "--as-of", options.asOf,
      "--format", "json",
    ];

    await writeFixture(buildFixture(normativeControls));
    const qualified = spawnSync(process.execPath, command(), { encoding: "utf8" });
    assert.equal(qualified.status, 3, qualified.stderr);
    assert.equal(JSON.parse(qualified.stdout).claimStatus, "conformant_with_exceptions");

    await writeFixture(buildFixture(normativeControls, { withException: false }));
    const conformant = spawnSync(process.execPath, command(false), { encoding: "utf8" });
    assert.equal(conformant.status, 0, conformant.stderr);

    const stale = buildFixture(normativeControls, { withException: false });
    stale.soa.decisions[0].nextReviewAt = "2026-01-02T00:00:00.000Z";
    await writeFixture(stale);
    const nonconformant = spawnSync(process.execPath, command(false), { encoding: "utf8" });
    assert.equal(nonconformant.status, 1, nonconformant.stderr);

    stale.manifest.schemaVersion = "2.0.0";
    await writeFixture(stale);
    const invalid = spawnSync(process.execPath, command(false), { encoding: "utf8" });
    assert.equal(invalid.status, 2);
    assert.match(invalid.stderr, /Canonical schema validation failed/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
