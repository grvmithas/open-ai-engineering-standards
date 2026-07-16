import { readFile } from "node:fs/promises";

export const STATUSES = Object.freeze([
  "pass",
  "fail",
  "not_applicable",
  "exception",
  "not_assessed",
]);

const EVIDENCE_TYPES = new Set(["test", "attestation", "configuration", "trace", "review"]);
const ENVIRONMENTS = new Set(["development", "test", "staging", "production"]);
const DEPLOYMENTS = new Set(["internal", "external", "hybrid"]);
const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const isString = (value) => typeof value === "string" && value.length > 0;
const isDateTime = (value) => isString(value) && !Number.isNaN(Date.parse(value));

function rejectUnknown(value, allowed, path, errors) {
  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) errors.push(`${path}.${key}: unknown property`);
  }
}

function validateExpression(expression, path, errors) {
  if (typeof expression === "boolean") return;
  if (!isObject(expression)) {
    errors.push(`${path}: expected a boolean or expression object`);
    return;
  }
  const operators = ["all", "any", "not"].filter((key) => hasOwn(expression, key));
  if (operators.length > 0) {
    if (operators.length !== 1 || hasOwn(expression, "field") || hasOwn(expression, "operator")) {
      errors.push(`${path}: combine expressions with exactly one of all, any, or not`);
      return;
    }
    const operator = operators[0];
    rejectUnknown(expression, new Set([operator]), path, errors);
    if (operator === "not") {
      validateExpression(expression.not, `${path}.not`, errors);
      return;
    }
    if (!Array.isArray(expression[operator]) || expression[operator].length === 0) {
      errors.push(`${path}.${operator}: expected a non-empty array`);
      return;
    }
    expression[operator].forEach((item, index) =>
      validateExpression(item, `${path}.${operator}[${index}]`, errors),
    );
    return;
  }

  rejectUnknown(expression, new Set(["field", "operator", "value"]), path, errors);
  if (!["environment", "capabilities", "dataClasses", "deployment"].includes(expression.field)) {
    errors.push(`${path}.field: unsupported system field`);
  }
  if (!["equals", "includes", "exists"].includes(expression.operator)) {
    errors.push(`${path}.operator: unsupported operator`);
  }
  if (expression.operator !== "exists" && !hasOwn(expression, "value")) {
    errors.push(`${path}.value: required for ${expression.operator}`);
  }
  if (expression.operator === "includes" && !isString(expression.value)) {
    errors.push(`${path}.value: includes requires a non-empty string`);
  }
}

export function validateManifest(manifest) {
  const errors = [];
  if (!isObject(manifest)) return ["$: expected an object"];
  rejectUnknown(
    manifest,
    new Set(["schemaVersion", "standardVersion", "assessmentId", "system", "controls", "exceptions"]),
    "$",
    errors,
  );
  if (manifest.schemaVersion !== "1.0.0") errors.push("$.schemaVersion: expected 1.0.0");
  if (!isString(manifest.standardVersion)) errors.push("$.standardVersion: required string");
  if (!isString(manifest.assessmentId) || !/^[A-Za-z0-9._-]+$/.test(manifest.assessmentId)) {
    errors.push("$.assessmentId: expected a portable identifier");
  }

  if (!isObject(manifest.system)) {
    errors.push("$.system: expected an object");
  } else {
    rejectUnknown(
      manifest.system,
      new Set(["id", "environment", "capabilities", "dataClasses", "deployment"]),
      "$.system",
      errors,
    );
    if (!isString(manifest.system.id)) errors.push("$.system.id: required string");
    if (!ENVIRONMENTS.has(manifest.system.environment)) errors.push("$.system.environment: invalid value");
    if (!DEPLOYMENTS.has(manifest.system.deployment)) errors.push("$.system.deployment: invalid value");
    for (const field of ["capabilities", "dataClasses"]) {
      if (!Array.isArray(manifest.system[field]) || manifest.system[field].some((item) => !isString(item))) {
        errors.push(`$.system.${field}: expected non-empty strings`);
      } else if (new Set(manifest.system[field]).size !== manifest.system[field].length) {
        errors.push(`$.system.${field}: duplicate values are not allowed`);
      }
    }
  }

  if (!Array.isArray(manifest.controls) || manifest.controls.length === 0) {
    errors.push("$.controls: expected a non-empty array");
  } else {
    const controlIds = new Set();
    manifest.controls.forEach((control, index) => {
      const path = `$.controls[${index}]`;
      if (!isObject(control)) {
        errors.push(`${path}: expected an object`);
        return;
      }
      rejectUnknown(control, new Set(["id", "title", "applicability", "requirements"]), path, errors);
      if (!isString(control.id) || !/^[A-Z][A-Z0-9-]+$/.test(control.id)) {
        errors.push(`${path}.id: expected an uppercase control identifier`);
      } else if (controlIds.has(control.id)) {
        errors.push(`${path}.id: duplicate control identifier`);
      } else controlIds.add(control.id);
      if (!isString(control.title)) errors.push(`${path}.title: required string`);
      validateExpression(control.applicability, `${path}.applicability`, errors);
      if (!Array.isArray(control.requirements) || control.requirements.length === 0) {
        errors.push(`${path}.requirements: expected a non-empty array`);
      } else {
        const requirementIds = new Set();
        control.requirements.forEach((requirement, requirementIndex) => {
          const requirementPath = `${path}.requirements[${requirementIndex}]`;
          if (!isObject(requirement)) {
            errors.push(`${requirementPath}: expected an object`);
            return;
          }
          rejectUnknown(requirement, new Set(["id", "evidenceTypes"]), requirementPath, errors);
          if (!isString(requirement.id)) errors.push(`${requirementPath}.id: required string`);
          else if (requirementIds.has(requirement.id)) {
            errors.push(`${requirementPath}.id: duplicate requirement identifier`);
          } else requirementIds.add(requirement.id);
          if (
            !Array.isArray(requirement.evidenceTypes) ||
            requirement.evidenceTypes.length === 0 ||
            requirement.evidenceTypes.some((type) => !EVIDENCE_TYPES.has(type))
          ) {
            errors.push(`${requirementPath}.evidenceTypes: invalid evidence types`);
          }
        });
      }
    });
  }

  if (manifest.exceptions !== undefined && !Array.isArray(manifest.exceptions)) {
    errors.push("$.exceptions: expected an array");
  } else {
    (manifest.exceptions ?? []).forEach((exception, index) => {
      const path = `$.exceptions[${index}]`;
      if (!isObject(exception)) {
        errors.push(`${path}: expected an object`);
        return;
      }
      rejectUnknown(exception, new Set(["controlId", "reason", "approvedBy", "expiresAt"]), path, errors);
      if (!isString(exception.controlId)) errors.push(`${path}.controlId: required string`);
      if (!isString(exception.reason) || exception.reason.length < 10) errors.push(`${path}.reason: minimum 10 characters`);
      if (!isString(exception.approvedBy)) errors.push(`${path}.approvedBy: required string`);
      if (!isDateTime(exception.expiresAt)) errors.push(`${path}.expiresAt: invalid date-time`);
    });
  }
  return errors;
}

export function validateEvidence(evidence) {
  const errors = [];
  if (!isObject(evidence)) return ["$: expected an object"];
  rejectUnknown(evidence, new Set(["schemaVersion", "assessmentId", "generatedAt", "artifacts"]), "$", errors);
  if (evidence.schemaVersion !== "1.0.0") errors.push("$.schemaVersion: expected 1.0.0");
  if (!isString(evidence.assessmentId)) errors.push("$.assessmentId: required string");
  if (!isDateTime(evidence.generatedAt)) errors.push("$.generatedAt: invalid date-time");
  if (!Array.isArray(evidence.artifacts)) {
    errors.push("$.artifacts: expected an array");
    return errors;
  }
  const ids = new Set();
  evidence.artifacts.forEach((artifact, index) => {
    const path = `$.artifacts[${index}]`;
    if (!isObject(artifact)) {
      errors.push(`${path}: expected an object`);
      return;
    }
    rejectUnknown(
      artifact,
      new Set(["id", "controlId", "requirementId", "type", "uri", "digest", "observedAt", "validUntil", "result", "metadata"]),
      path,
      errors,
    );
    for (const field of ["id", "controlId", "requirementId", "uri"]) {
      if (!isString(artifact[field])) errors.push(`${path}.${field}: required string`);
    }
    if (ids.has(artifact.id)) errors.push(`${path}.id: duplicate artifact identifier`);
    else ids.add(artifact.id);
    if (!EVIDENCE_TYPES.has(artifact.type)) errors.push(`${path}.type: invalid evidence type`);
    if (!/^sha256:[a-f0-9]{64}$/.test(artifact.digest ?? "")) errors.push(`${path}.digest: invalid sha256 digest`);
    if (!isDateTime(artifact.observedAt)) errors.push(`${path}.observedAt: invalid date-time`);
    if (artifact.validUntil !== undefined && !isDateTime(artifact.validUntil)) errors.push(`${path}.validUntil: invalid date-time`);
    if (!["pass", "fail"].includes(artifact.result)) errors.push(`${path}.result: expected pass or fail`);
    if (artifact.metadata !== undefined && !isObject(artifact.metadata)) errors.push(`${path}.metadata: expected an object`);
  });
  return errors;
}

export function evaluateApplicability(expression, system) {
  if (typeof expression === "boolean") return expression;
  if (hasOwn(expression, "all")) return expression.all.every((item) => evaluateApplicability(item, system));
  if (hasOwn(expression, "any")) return expression.any.some((item) => evaluateApplicability(item, system));
  if (hasOwn(expression, "not")) return !evaluateApplicability(expression.not, system);
  const actual = system[expression.field];
  if (expression.operator === "exists") {
    return Array.isArray(actual) ? actual.length > 0 : actual !== undefined && actual !== null && actual !== "";
  }
  if (expression.operator === "includes") return Array.isArray(actual) && actual.includes(expression.value);
  return actual === expression.value;
}

function activeException(manifest, controlId, asOfMs) {
  return (manifest.exceptions ?? []).find(
    (exception) => exception.controlId === controlId && Date.parse(exception.expiresAt) >= asOfMs,
  );
}

export function assess(manifest, evidence, options = {}) {
  const errors = [
    ...validateManifest(manifest).map((message) => `manifest${message}`),
    ...validateEvidence(evidence).map((message) => `evidence${message}`),
  ];
  if (manifest?.assessmentId !== evidence?.assessmentId) {
    errors.push("assessmentId: manifest and evidence must match");
  }
  if (errors.length > 0) {
    const error = new Error("Conformance input validation failed");
    error.validationErrors = errors.sort();
    throw error;
  }

  const asOf = options.asOf ?? evidence.generatedAt;
  if (!isDateTime(asOf)) throw new Error("--as-of must be an ISO 8601 date-time");
  const asOfMs = Date.parse(asOf);
  const knownRequirements = new Set(
    manifest.controls.flatMap((control) => control.requirements.map((requirement) => `${control.id}/${requirement.id}`)),
  );
  const orphanEvidence = evidence.artifacts
    .filter((artifact) => !knownRequirements.has(`${artifact.controlId}/${artifact.requirementId}`))
    .map((artifact) => artifact.id)
    .sort();

  const controls = [...manifest.controls]
    .sort((left, right) => left.id.localeCompare(right.id))
    .map((control) => {
      if (!evaluateApplicability(control.applicability, manifest.system)) {
        return { id: control.id, status: "not_applicable", requirements: [] };
      }
      const exception = activeException(manifest, control.id, asOfMs);
      if (exception) {
        return {
          id: control.id,
          status: "exception",
          exception: {
            approvedBy: exception.approvedBy,
            expiresAt: exception.expiresAt,
            reason: exception.reason,
          },
          requirements: [],
        };
      }
      const requirements = [...control.requirements]
        .sort((left, right) => left.id.localeCompare(right.id))
        .map((requirement) => {
          const artifacts = evidence.artifacts
            .filter(
              (artifact) =>
                artifact.controlId === control.id &&
                artifact.requirementId === requirement.id &&
                requirement.evidenceTypes.includes(artifact.type) &&
                Date.parse(artifact.observedAt) <= asOfMs &&
                (artifact.validUntil === undefined || Date.parse(artifact.validUntil) >= asOfMs),
            )
            .sort((left, right) => left.id.localeCompare(right.id));
          const status =
            artifacts.length === 0
              ? "not_assessed"
              : artifacts.some((artifact) => artifact.result === "fail")
                ? "fail"
                : "pass";
          return { id: requirement.id, status, evidenceIds: artifacts.map((artifact) => artifact.id) };
        });
      const status = requirements.some((requirement) => requirement.status === "fail")
        ? "fail"
        : requirements.some((requirement) => requirement.status === "not_assessed")
          ? "not_assessed"
          : "pass";
      return { id: control.id, status, requirements };
    });

  const summary = Object.fromEntries(STATUSES.map((status) => [status, 0]));
  controls.forEach((control) => {
    summary[control.status] += 1;
  });
  return {
    schemaVersion: "1.0.0",
    assessmentId: manifest.assessmentId,
    standardVersion: manifest.standardVersion,
    asOf: new Date(asOfMs).toISOString(),
    outcome: summary.fail > 0 || summary.not_assessed > 0 ? "fail" : "pass",
    summary,
    controls,
    diagnostics: { orphanEvidence },
  };
}

export async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    throw new Error(`Cannot read JSON at ${path}: ${error.message}`);
  }
}
