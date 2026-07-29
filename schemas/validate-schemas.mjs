#!/usr/bin/env node

import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = dirname(fileURLToPath(import.meta.url));
const dialect = "https://json-schema.org/draft/2020-12/schema";
const versionedName = /^[a-z0-9-]+\.v[1-9][0-9]*\.schema\.json$/;

function pointerExists(document, pointer) {
  let current = document;
  for (const encodedToken of pointer.slice(2).split("/")) {
    const token = encodedToken.replaceAll("~1", "/").replaceAll("~0", "~");
    if (
      current === null ||
      typeof current !== "object" ||
      Array.isArray(current) ||
      !(token in current)
    ) {
      return false;
    }
    current = current[token];
  }
  return true;
}

function walkSchema(node, location, root, errors) {
  if (Array.isArray(node)) {
    node.forEach((value, index) =>
      walkSchema(value, `${location}/${index}`, root, errors),
    );
    return;
  }
  if (node === null || typeof node !== "object") {
    return;
  }

  const declaredType = node.type;
  const isObject =
    declaredType === "object" ||
    (Array.isArray(declaredType) && declaredType.includes("object"));
  if (
    isObject &&
    !Object.hasOwn(node, "additionalProperties") &&
    !Object.hasOwn(node, "unevaluatedProperties")
  ) {
    errors.push(
      `${location}: object schema must set additionalProperties or unevaluatedProperties`,
    );
  }

  const isNamedSchemaContainer =
    location.endsWith("/properties") || location.endsWith("/$defs");
  if (!isNamedSchemaContainer && Object.hasOwn(node, "required")) {
    if (
      !Array.isArray(node.required) ||
      !node.required.every((item) => typeof item === "string")
    ) {
      errors.push(`${location}: required must be an array of strings`);
    } else {
      if (new Set(node.required).size !== node.required.length) {
        errors.push(`${location}: required contains duplicate names`);
      }
      if (
        isObject &&
        node.properties &&
        typeof node.properties === "object"
      ) {
        const undeclared = node.required.filter(
          (name) => !Object.hasOwn(node.properties, name),
        );
        if (undeclared.length > 0) {
          errors.push(
            `${location}: required properties not declared: ${undeclared.join(", ")}`,
          );
        }
      }
    }
  }

  if (
    typeof node.$ref === "string" &&
    node.$ref.startsWith("#/") &&
    !pointerExists(root, node.$ref)
  ) {
    errors.push(`${location}: unresolved local reference ${node.$ref}`);
  }

  for (const [key, value] of Object.entries(node)) {
    walkSchema(value, `${location}/${key}`, root, errors);
  }
}

function validateFile(filename, seenIds) {
  const errors = [];
  let schema;
  try {
    schema = JSON.parse(readFileSync(join(rootDirectory, filename), "utf8"));
  } catch (error) {
    return [`${filename}: invalid JSON: ${error.message}`];
  }

  if (schema.$schema !== dialect) {
    errors.push(`${filename}: $schema must be ${dialect}`);
  }
  if (typeof schema.$id !== "string" || !schema.$id.startsWith("https://")) {
    errors.push(`${filename}: $id must be an HTTPS URI`);
  } else if (seenIds.has(schema.$id)) {
    errors.push(`${filename}: duplicate $id ${schema.$id}`);
  } else {
    seenIds.add(schema.$id);
  }
  if (!versionedName.test(filename)) {
    errors.push(`${filename}: filename must include a major version`);
  }
  if (schema.type !== "object") {
    errors.push(`${filename}: root type must be object`);
  }
  if (schema.additionalProperties !== false) {
    errors.push(`${filename}: root must set additionalProperties to false`);
  }
  if (!Array.isArray(schema.required) || !schema.required.includes("schemaVersion")) {
    errors.push(`${filename}: schemaVersion must be required`);
  }
  const version = schema.properties?.schemaVersion?.const;
  if (
    typeof version !== "string" ||
    !/^[0-9]+\.[0-9]+\.[0-9]+$/.test(version)
  ) {
    errors.push(
      `${filename}: schemaVersion must use a semantic-version const`,
    );
  }

  walkSchema(schema, filename, schema, errors);
  return errors;
}

const filenames = readdirSync(rootDirectory)
  .filter((filename) => filename.endsWith(".schema.json"))
  .sort();

if (filenames.length === 0) {
  console.error("ERROR: no versioned JSON Schemas found");
  process.exit(1);
}

const seenIds = new Set();
const errors = filenames.flatMap((filename) =>
  validateFile(filename, seenIds),
);

if (errors.length > 0) {
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  console.error(
    `FAILED: ${errors.length} error(s) across ${filenames.length} schema(s)`,
  );
  process.exit(1);
}

console.log(
  `PASS: ${filenames.length} Draft 2020-12 schemas passed AIES structural validation`,
);
