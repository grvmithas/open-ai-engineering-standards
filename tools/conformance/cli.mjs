#!/usr/bin/env node
import { resolve } from "node:path";
import { loadCanonicalSchemas } from "./canonical-schema.mjs";
import { assess, readJson } from "./lib.mjs";
import { loadNormativeControls } from "./normative-kernel.mjs";

const USAGE = `Usage:
  node tools/conformance/cli.mjs assess --manifest <path> --soa <path> --catalog <path> --evidence <path>
    [--exception <path> ...] [--as-of <ISO-8601>] [--schema-dir <path>]
    [--standard-dir <path>] [--format json|text]

Exit codes:
  0  Conformant without exceptions
  1  Nonconformant
  2  Input, schema, or reconciliation is invalid
  3  Conformant with exceptions (qualified outcome; not an unqualified pass)`;

function parseArgs(argv) {
  if (argv[0] !== "assess") throw new Error(USAGE);
  const options = {
    format: "text",
    exceptions: [],
    schemaDir: resolve("schemas"),
    standardDir: resolve("content", "standard"),
  };
  for (let index = 1; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || value === undefined) throw new Error(USAGE);
    const name = key.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    if (name === "exception") options.exceptions.push(value);
    else {
      if (!["manifest", "soa", "catalog", "evidence", "asOf", "format", "schemaDir", "standardDir"].includes(name)) {
        throw new Error(`Unknown option: ${key}`);
      }
      options[name] = value;
    }
  }
  if (!options.manifest || !options.soa || !options.catalog || !options.evidence) throw new Error(USAGE);
  if (!["json", "text"].includes(options.format)) throw new Error("--format must be json or text");
  return options;
}

function toText(report) {
  const rows = report.controls.map(
    (control) =>
      `${control.controlId.padEnd(18)} ${control.disposition}` +
      (control.reasons.length > 0 ? ` — ${control.reasons.join("; ")}` : ""),
  );
  return [
    `OAIES assessment ${report.soaId} at ${report.asOf}`,
    ...rows,
    `Claim status: ${report.claimStatus}`,
    `Summary: ${Object.entries(report.summary)
      .map(([status, count]) => `${status}=${count}`)
      .join(" ")}`,
    report.diagnostics.orphanExceptions.length > 0
      ? `Warning: orphan exceptions ${report.diagnostics.orphanExceptions.join(", ")}`
      : "Diagnostics: no orphan exceptions",
  ].join("\n");
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const [manifest, soa, catalog, evidence, exceptions, schemas, normativeControls] = await Promise.all([
      readJson(options.manifest),
      readJson(options.soa),
      readJson(options.catalog),
      readJson(options.evidence),
      Promise.all(options.exceptions.map(readJson)),
      loadCanonicalSchemas(resolve(options.schemaDir)),
      loadNormativeControls(resolve(options.standardDir)),
    ]);
    const report = assess(
      { manifest, soa, catalog, evidence, exceptions },
      { asOf: options.asOf, schemas, normativeControls },
    );
    process.stdout.write(`${options.format === "json" ? JSON.stringify(report, null, 2) : toText(report)}\n`);
    process.exitCode =
      report.claimStatus === "conformant"
        ? 0
        : report.claimStatus === "conformant_with_exceptions"
          ? 3
          : 1;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    if (error.validationErrors) {
      for (const validationError of error.validationErrors) process.stderr.write(`- ${validationError}\n`);
    }
    process.exitCode = 2;
  }
}

await main();
