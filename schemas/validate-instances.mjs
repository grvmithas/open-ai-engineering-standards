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

if (errors.length > 0) {
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  process.exit(1);
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "oaies-schema-"));
const npx = "npx";

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
      const result = spawnSync(
        npx,
        [
          "--yes",
          "ajv-cli@5.0.0",
          "test",
          "--spec=draft2020",
          "-s",
          join(root, schemaName),
          "-d",
          dataPath,
          expectation,
        ],
        {
          encoding: "utf8",
          stdio: "pipe",
          shell: process.platform === "win32",
        },
      );

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
