import { readFile } from "node:fs/promises";
import { validateAgainstSchema } from "./canonical-schema.mjs";

export const DISPOSITIONS = Object.freeze([
  "applicable-conforming",
  "applicable-exception",
  "applicable-nonconforming",
  "not-applicable",
]);

const equalArrays = (left, right) =>
  left.length === right.length && [...left].sort().every((value, index) => value === [...right].sort()[index]);
const samePeriod = (left, right) => left.start === right.start && left.end === right.end;
const asTime = (value) => Date.parse(value);

function addDuration(instant, duration) {
  const match = /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/.exec(duration);
  if (!match) return Number.NaN;
  const date = new Date(instant);
  date.setUTCFullYear(date.getUTCFullYear() + Number(match[1] ?? 0));
  date.setUTCMonth(date.getUTCMonth() + Number(match[2] ?? 0));
  date.setUTCDate(date.getUTCDate() + Number(match[3] ?? 0));
  date.setUTCHours(date.getUTCHours() + Number(match[4] ?? 0));
  date.setUTCMinutes(date.getUTCMinutes() + Number(match[5] ?? 0));
  date.setUTCSeconds(date.getUTCSeconds() + Number(match[6] ?? 0));
  return date.getTime();
}

function catalogApplicability(control, manifest) {
  const rule = control.applicability;
  return (
    rule.universal ||
    rule.workloadProfiles.some((profile) => manifest.workloadProfiles.includes(profile)) ||
    rule.autonomyLevels.includes(manifest.autonomyLevel) ||
    rule.impactLevels.includes(manifest.impactLevel)
  );
}

function selectorsFromNormative(condition) {
  const upper = condition.toUpperCase();
  const collect = (prefix, maximum) => {
    const selected = new Set([...upper.matchAll(new RegExp(`${prefix}([0-${maximum}])`, "g"))].map((match) => Number(match[1])));
    for (const match of upper.matchAll(new RegExp(`${prefix}([0-${maximum}])[–-]${prefix}?([0-${maximum}])`, "g"))) {
      for (let value = Number(match[1]); value <= Number(match[2]); value += 1) selected.add(value);
    }
    return [...selected].sort().map((value) => `${prefix}${value}`);
  };
  return {
    universal: upper === "UNIVERSAL",
    workloadProfiles: collect("P", 6),
    autonomyLevels: collect("A", 4),
    impactLevels: collect("I", 3),
  };
}

function evidenceIndex(bundle) {
  const index = new Map();
  for (const item of bundle.items) {
    index.set(item.id, item);
    index.set(item.uri, item);
  }
  return index;
}

function evidenceProblems(control, decision, context) {
  const problems = [];
  if (asTime(decision.lastTestedAt) > context.asOfMs) problems.push("control test is dated after assessment instant");
  if (asTime(decision.nextReviewAt) < context.asOfMs) problems.push("control evidence review is stale");
  const items = decision.evidenceRefs.map((reference) => context.evidenceByRef.get(reference));
  if (items.some((item) => !item)) problems.push("one or more SoA evidence references do not resolve");
  const resolved = items.filter(Boolean);
  for (const item of resolved) {
    if (!item.controlRefs.includes(control.id)) problems.push(`evidence ${item.id} does not map to ${control.id}`);
    if (item.scope.systemRef !== context.soa.systemRef) problems.push(`evidence ${item.id} has the wrong system scope`);
    if (!context.soa.environments.includes(item.scope.environment)) problems.push(`evidence ${item.id} has an out-of-scope environment`);
    if (asTime(item.collectedAt) > context.asOfMs) problems.push(`evidence ${item.id} is future-dated`);
    if (asTime(item.retentionUntil) < context.asOfMs) problems.push(`evidence ${item.id} is outside retention`);
    if (
      ["operation", "outcome"].includes(item.evidenceClass) &&
      (asTime(item.coveredPeriod.start) > asTime(context.soa.assessmentPeriod.start) ||
        asTime(item.coveredPeriod.end) < asTime(context.soa.assessmentPeriod.end))
    ) problems.push(`evidence ${item.id} does not cover the full assessment period`);
  }
  const classes = new Set(resolved.map((item) => item.evidenceClass));
  for (const requirement of control.evidenceRequirements) {
    if (!classes.has(requirement.evidenceClass)) problems.push(`missing ${requirement.evidenceClass} evidence`);
  }
  return [...new Set(problems)].sort();
}

function requiredApprovalRoles(impact) {
  if (impact === "I3") return ["accountable-executive", "legal-compliance", "independent-risk-owner"];
  if (impact === "I2") return ["independent-risk-owner", "business-owner"];
  return ["system-owner", "control-owner"];
}

function exceptionProblems(exceptionRecord, control, decision, context) {
  const problems = [];
  const effective = asTime(exceptionRecord.effectiveAt);
  const expires = asTime(exceptionRecord.expiresAt);
  const created = asTime(exceptionRecord.createdAt);
  const detected = asTime(exceptionRecord.detectedAt);
  const claimEnd = asTime(exceptionRecord.remainingClaimPeriodEnd);
  const remediationDue = asTime(exceptionRecord.remediation.dueAt);
  if (!["approved", "active"].includes(exceptionRecord.status)) problems.push("exception status is not approved or active");
  if (effective > context.asOfMs || expires < context.asOfMs) problems.push("exception is not active at the assessment instant");
  if (exceptionRecord.systemRef !== context.soa.systemRef) problems.push("exception systemRef does not match the SoA");
  if (exceptionRecord.systemVersion !== context.soa.systemVersion) problems.push("exception systemVersion does not match the SoA");
  if (exceptionRecord.soaRef !== context.soa.id) problems.push("exception soaRef does not exactly match the SoA id");
  if (exceptionRecord.controlId !== decision.controlId) problems.push("exception controlId does not match the SoA decision");
  if (exceptionRecord.controlVersion !== decision.controlVersion) problems.push("exception controlVersion does not match the SoA decision");
  if (decision.exceptionRef !== exceptionRecord.id) problems.push("SoA exceptionRef does not exactly match the exception id");
  if (exceptionRecord.compensatingControls.some((compensation) => compensation.testResult !== "pass")) {
    problems.push("a compensating control test did not pass");
  }
  if (exceptionRecord.residualRiskDisposition === "unacceptable") problems.push("residual risk is unacceptable");
  for (const role of requiredApprovalRoles(exceptionRecord.residualImpact)) {
    if (!exceptionRecord.approvals.some((approval) => approval.role === role && approval.decision === "approve")) {
      problems.push(`missing required ${role} approval`);
    }
  }
  for (const approval of exceptionRecord.approvals.filter((item) => item.decision === "approve")) {
    const record = context.evidenceByRef.get(approval.recordRef);
    if (!record || record.type !== "approval" || record.sourceIdentity !== approval.identity) {
      problems.push(`approval by ${approval.identity} lacks attributable approval evidence`);
    }
    if (asTime(approval.decidedAt) > effective) problems.push(`approval by ${approval.identity} occurred after effectiveAt`);
  }
  for (const compensation of exceptionRecord.compensatingControls) {
    if (asTime(compensation.testedAt) > effective) problems.push("compensating control was tested after effectiveAt");
    if (
      exceptionRecord.approvals
        .filter((approval) => approval.decision === "approve")
        .some((approval) => asTime(compensation.testedAt) > asTime(approval.decidedAt))
    ) problems.push("compensating control was not tested before approval");
    for (const reference of compensation.evidenceRefs) {
      const item = context.evidenceByRef.get(reference);
      if (!item || !item.controlRefs.includes(control.id)) problems.push("compensating-control evidence is missing or wrong-control");
    }
  }
  if (!(detected <= created && created <= effective && effective < expires)) {
    problems.push("detected, created, effective, and expiry chronology is invalid");
  }
  if (expires > claimEnd || expires > remediationDue) problems.push("expiry exceeds claim or remediation horizon");
  if (effective < asTime(context.soa.assessmentPeriod.start)) problems.push("effectiveAt precedes the SoA claim period");
  if (asTime(exceptionRecord.exposure.start) > asTime(exceptionRecord.exposure.end)) problems.push("exposure chronology is invalid");
  if (expires > addDuration(effective, exceptionRecord.maximumPermittedDuration)) {
    problems.push("exception exceeds its maximum permitted duration");
  }
  if (exceptionRecord.remainingClaimPeriodEnd !== context.soa.assessmentPeriod.end) {
    problems.push("remaining claim period does not match the SoA assessment period");
  }
  const latestApproval = Math.max(...exceptionRecord.approvals.filter((item) => item.decision === "approve").map((item) => asTime(item.decidedAt)));
  if (asTime(context.manifest.updatedAt) > latestApproval) problems.push("material system change occurred after exception approval");
  if (exceptionRecord.materialChangeInvalidates !== true) problems.push("material change must invalidate the exception");
  const prohibitedText = [
    exceptionRecord.exactUnmetRequirement,
    exceptionRecord.rootCause,
    exceptionRecord.timeBoundJustification,
  ].join(" ");
  if (
    exceptionRecord.controlId === "OAIES-RSK-001" ||
    /legal obligation|prohibited (?:ai )?practice|evidence falsification|unbounded a4|imminent i3 harm/i.test(prohibitedText)
  ) problems.push("exception applies to a prohibited condition");
  return [...new Set(problems)].sort();
}

function validateCrossDocument(context, normativeControls) {
  const errors = [];
  const { manifest, soa, evidence, catalog } = context;
  if (soa.status !== "approved") errors.push("soa.status: an assessment requires an approved SoA");
  if (soa.systemVersion !== manifest.version) errors.push("soa.systemVersion: does not match manifest.version");
  if (soa.boundaryRef !== manifest.boundaryRef) errors.push("soa.boundaryRef: does not match manifest.boundaryRef");
  if (!equalArrays(soa.workloadProfiles, manifest.workloadProfiles)) errors.push("soa.workloadProfiles: does not match manifest");
  if (soa.autonomyLevel !== manifest.autonomyLevel) errors.push("soa.autonomyLevel: does not match manifest");
  if (soa.impactLevel !== manifest.impactLevel) errors.push("soa.impactLevel: does not match manifest");
  if (!soa.environments.every((environment) => manifest.environments.includes(environment))) errors.push("soa.environments: outside manifest scope");
  if (soa.catalogVersion !== catalog.version) errors.push("soa.catalogVersion: does not match catalog.version");
  if (soa.oaiesVersion !== catalog.version) errors.push("soa.oaiesVersion: does not match canonical catalog version");
  if (catalog.status !== "approved") errors.push("catalog.status: catalog must be approved");
  if (evidence.systemRef !== soa.systemRef || evidence.systemVersion !== soa.systemVersion) errors.push("evidence: system audience does not match SoA");
  if (!samePeriod(evidence.assessmentPeriod, soa.assessmentPeriod)) errors.push("evidence.assessmentPeriod: does not match SoA");
  if (asTime(evidence.createdAt) > context.asOfMs) errors.push("evidence.createdAt: bundle is future-dated");
  if (asTime(evidence.retentionUntil) < context.asOfMs) errors.push("evidence.retentionUntil: bundle is expired");

  const normativeIds = normativeControls.map((control) => control.id).sort();
  const catalogIds = catalog.controls.map((control) => control.id).sort();
  const decisionIds = soa.decisions.map((decision) => decision.controlId).sort();
  const uniqueDecisions = new Set(decisionIds);
  if (!equalArrays(catalogIds, normativeIds)) errors.push("catalog.controls: does not exactly reconcile to content/standard normative controls");
  const normativeById = new Map(normativeControls.map((control) => [control.id, control]));
  for (const control of catalog.controls) {
    const normative = normativeById.get(control.id);
    if (!normative) continue;
    if (control.objective !== normative.requirement) errors.push(`catalog.${control.id}: objective diverges from content/standard`);
    if (
      control.applicability.condition !== normative.applicability &&
      !control.applicability.condition.startsWith(`${normative.applicability} `)
    ) {
      errors.push(`catalog.${control.id}: applicability condition diverges from content/standard`);
    }
    const selectors = selectorsFromNormative(normative.applicability);
    if (
      control.applicability.universal !== selectors.universal ||
      !equalArrays(control.applicability.workloadProfiles, selectors.workloadProfiles) ||
      !equalArrays(control.applicability.autonomyLevels, selectors.autonomyLevels) ||
      !equalArrays(control.applicability.impactLevels, selectors.impactLevels)
    ) errors.push(`catalog.${control.id}: structured applicability diverges from content/standard`);
    if (control.verification !== normative.objectiveEvidence) {
      errors.push(`catalog.${control.id}: verification diverges from content/standard objective evidence`);
    }
  }
  if (!equalArrays(decisionIds, normativeIds) || uniqueDecisions.size !== decisionIds.length) {
    errors.push("soa.decisions: incomplete or duplicate catalog reconciliation");
  }
  if (
    soa.reconciliation.catalogControlCount !== normativeIds.length ||
    soa.reconciliation.distinctDecisionCount !== uniqueDecisions.size ||
    soa.reconciliation.missingControlIds.length > 0 ||
    soa.reconciliation.duplicateControlIds.length > 0
  ) errors.push("soa.reconciliation: declared counts or issue lists are inconsistent");
  for (const decision of soa.decisions) {
    if (decision.controlVersion !== catalog.version) errors.push(`soa.${decision.controlId}: controlVersion does not match catalog`);
  }
  return errors;
}

export function assess(input, options) {
  const { manifest, soa, catalog, evidence, exceptions = [] } = input;
  const { schemas, normativeControls } = options;
  const schemaErrors = [
    ...validateAgainstSchema(manifest, schemas.manifest, "manifest"),
    ...validateAgainstSchema(soa, schemas.soa, "soa"),
    ...validateAgainstSchema(catalog, schemas.catalog, "catalog"),
    ...validateAgainstSchema(evidence, schemas.evidence, "evidence"),
    ...exceptions.flatMap((record, index) => validateAgainstSchema(record, schemas.exception, `exceptions[${index}]`)),
  ];
  if (schemaErrors.length > 0) {
    const error = new Error("Canonical schema validation failed");
    error.validationErrors = schemaErrors.sort();
    throw error;
  }
  const asOf = options.asOf ?? evidence.createdAt;
  const asOfMs = asTime(asOf);
  if (Number.isNaN(asOfMs)) throw new Error("--as-of must be an ISO 8601 date-time");
  if (new Set(exceptions.map((record) => record.id)).size !== exceptions.length) {
    const error = new Error("Canonical document reconciliation failed");
    error.validationErrors = ["exceptions: duplicate exception IDs are not allowed"];
    throw error;
  }
  const context = { manifest, soa, catalog, evidence, asOfMs, evidenceByRef: evidenceIndex(evidence) };
  const crossDocumentErrors = validateCrossDocument(context, normativeControls);
  if (crossDocumentErrors.length > 0) {
    const error = new Error("Canonical document reconciliation failed");
    error.validationErrors = crossDocumentErrors.sort();
    throw error;
  }

  const exceptionById = new Map(exceptions.map((record) => [record.id, record]));
  const decisionById = new Map(soa.decisions.map((decision) => [decision.controlId, decision]));
  const controls = [...catalog.controls]
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((control) => {
      const decision = decisionById.get(control.id);
      const computedApplicable = catalogApplicability(control, manifest);
      const reasons = [];
      let disposition = decision.disposition;
      if (computedApplicable && decision.disposition === "not-applicable") {
        reasons.push("SoA excludes a control selected by canonical applicability");
        disposition = "applicable-nonconforming";
      }
      if (decision.disposition === "applicable-conforming") {
        reasons.push(...evidenceProblems(control, decision, context));
        if (reasons.length > 0) disposition = "applicable-nonconforming";
      } else if (decision.disposition === "applicable-exception") {
        reasons.push(...evidenceProblems(control, decision, context));
        const exceptionRecord = exceptionById.get(decision.exceptionRef);
        if (!exceptionRecord) reasons.push("referenced exception does not resolve");
        else reasons.push(...exceptionProblems(exceptionRecord, control, decision, context));
        if (reasons.length > 0) disposition = "applicable-nonconforming";
      }
      return {
        controlId: control.id,
        controlVersion: decision.controlVersion,
        computedApplicable,
        soaDisposition: decision.disposition,
        disposition,
        reasons: [...new Set(reasons)].sort(),
        ...(decision.exceptionRef ? { exceptionRef: decision.exceptionRef } : {}),
      };
    });

  const usedExceptionIds = new Set(soa.decisions.map((decision) => decision.exceptionRef).filter(Boolean));
  const orphanExceptions = exceptions.filter((record) => !usedExceptionIds.has(record.id)).map((record) => record.id).sort();
  const summary = Object.fromEntries(DISPOSITIONS.map((disposition) => [disposition, 0]));
  controls.forEach((control) => {
    summary[control.disposition] += 1;
  });
  const claimStatus =
    summary["applicable-nonconforming"] > 0
      ? "nonconformant"
      : summary["applicable-exception"] > 0
        ? "conformant_with_exceptions"
        : "conformant";
  return {
    schemaVersion: "1.0.0",
    systemRef: soa.systemRef,
    systemVersion: soa.systemVersion,
    soaId: soa.id,
    oaiesVersion: soa.oaiesVersion,
    asOf: new Date(asOfMs).toISOString(),
    claimStatus,
    summary,
    controls,
    diagnostics: { orphanExceptions },
  };
}

export async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    throw new Error(`Cannot read JSON at ${path}: ${error.message}`);
  }
}
