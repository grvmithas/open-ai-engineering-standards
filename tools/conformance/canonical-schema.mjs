import { readFile } from "node:fs/promises";
import { join } from "node:path";

const CONTRACT_FILES = Object.freeze({
  manifest: "ai-system-manifest.v1.schema.json",
  soa: "statement-of-applicability.v1.schema.json",
  evidence: "evidence-bundle.v1.schema.json",
  exception: "exception.v1.schema.json",
  catalog: "control-catalog.v1.schema.json",
});

const typeMatches = (value, type) => {
  if (type === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
  if (type === "array") return Array.isArray(value);
  if (type === "integer") return Number.isInteger(value);
  if (type === "number") return typeof value === "number" && Number.isFinite(value);
  if (type === "null") return value === null;
  return typeof value === type;
};

function resolveReference(root, reference) {
  if (!reference.startsWith("#/")) throw new Error(`Only local schema references are supported: ${reference}`);
  return reference
    .slice(2)
    .split("/")
    .reduce((value, segment) => value[segment.replaceAll("~1", "/").replaceAll("~0", "~")], root);
}

function validFormat(value, format) {
  if (format === "date-time") {
    return typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value) && !Number.isNaN(Date.parse(value));
  }
  if (format === "uri") {
    try {
      const parsed = new URL(value);
      return Boolean(parsed.protocol);
    } catch {
      return false;
    }
  }
  if (format === "uri-reference") {
    return typeof value === "string" && value.length > 0 && !/\s/.test(value);
  }
  return true;
}

function inspect(value, schema, root, path, errors) {
  if (schema.$ref) return inspect(value, resolveReference(root, schema.$ref), root, path, errors);
  if (schema.const !== undefined && value !== schema.const) errors.push(`${path}: expected constant ${JSON.stringify(schema.const)}`);
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${path}: expected one of ${schema.enum.join(", ")}`);
  if (schema.type && !typeMatches(value, schema.type)) {
    errors.push(`${path}: expected ${schema.type}`);
    return;
  }
  if (typeof value === "string") {
    if (schema.minLength !== undefined && value.length < schema.minLength) errors.push(`${path}: minimum length is ${schema.minLength}`);
    if (schema.maxLength !== undefined && value.length > schema.maxLength) errors.push(`${path}: maximum length is ${schema.maxLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${path}: does not match ${schema.pattern}`);
    if (schema.format && !validFormat(value, schema.format)) errors.push(`${path}: invalid ${schema.format}`);
  }
  if (typeof value === "number" && schema.minimum !== undefined && value < schema.minimum) {
    errors.push(`${path}: minimum is ${schema.minimum}`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems !== undefined && value.length < schema.minItems) errors.push(`${path}: requires at least ${schema.minItems} items`);
    if (schema.maxItems !== undefined && value.length > schema.maxItems) errors.push(`${path}: permits at most ${schema.maxItems} items`);
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) {
      errors.push(`${path}: duplicate items are not allowed`);
    }
    if (schema.items) value.forEach((item, index) => inspect(item, schema.items, root, `${path}[${index}]`, errors));
    if (schema.contains && !value.some((item) => {
      const candidateErrors = [];
      inspect(item, schema.contains, root, path, candidateErrors);
      return candidateErrors.length === 0;
    })) {
      errors.push(`${path}: no item satisfies contains`);
    }
  }
  if (value !== null && typeof value === "object" && !Array.isArray(value)) {
    for (const required of schema.required ?? []) {
      if (!Object.prototype.hasOwnProperty.call(value, required)) errors.push(`${path}.${required}: required property`);
    }
    for (const [key, propertySchema] of Object.entries(schema.properties ?? {})) {
      if (Object.prototype.hasOwnProperty.call(value, key)) inspect(value[key], propertySchema, root, `${path}.${key}`, errors);
    }
    if (schema.additionalProperties === false) {
      const allowed = new Set(Object.keys(schema.properties ?? {}));
      for (const key of Object.keys(value)) if (!allowed.has(key)) errors.push(`${path}.${key}: unknown property`);
    }
  }
  for (const subschema of schema.allOf ?? []) inspect(value, subschema, root, path, errors);
  if (schema.if) {
    const conditionErrors = [];
    inspect(value, schema.if, root, path, conditionErrors);
    if (conditionErrors.length === 0 && schema.then) inspect(value, schema.then, root, path, errors);
  }
  if (schema.not) {
    const candidateErrors = [];
    inspect(value, schema.not, root, path, candidateErrors);
    if (candidateErrors.length === 0) errors.push(`${path}: prohibited schema combination`);
  }
}

export function validateAgainstSchema(value, schema, label = "$") {
  const errors = [];
  inspect(value, schema, schema, label, errors);
  return errors;
}

export async function loadCanonicalSchemas(schemaDirectory) {
  const entries = await Promise.all(
    Object.entries(CONTRACT_FILES).map(async ([name, file]) => {
      const path = join(schemaDirectory, file);
      const schema = JSON.parse(await readFile(path, "utf8"));
      if (schema.$schema !== "https://json-schema.org/draft/2020-12/schema" || !schema.$id) {
        throw new Error(`${path}: not a canonical Draft 2020-12 schema`);
      }
      return [name, schema];
    }),
  );
  return Object.fromEntries(entries);
}
