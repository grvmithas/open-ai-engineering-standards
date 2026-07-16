#!/usr/bin/env node
import { assess, readJson } from "./lib.mjs";

const USAGE = `Usage:
  node tools/conformance/cli.mjs assess --manifest <path> --evidence <path> [--as-of <ISO-8601>] [--format json|text]

Exit codes:
  0  Assessment passed (pass, not_applicable, or approved exception)
  1  Assessment contains fail or not_assessed
  2  Input or invocation is invalid`;

function parseArgs(argv) {
  if (argv[0] !== "assess") throw new Error(USAGE);
  const options = { format: "text" };
  for (let index = 1; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || value === undefined) throw new Error(USAGE);
    const name = key.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    if (!["manifest", "evidence", "asOf", "format"].includes(name)) throw new Error(`Unknown option: ${key}`);
    options[name] = value;
  }
  if (!options.manifest || !options.evidence) throw new Error(USAGE);
  if (!["json", "text"].includes(options.format)) throw new Error("--format must be json or text");
  return options;
}

function toText(report) {
  const rows = report.controls.map((control) => `${control.id.padEnd(18)} ${control.status}`);
  return [
    `OAIES assessment ${report.assessmentId} at ${report.asOf}`,
    ...rows,
    `Outcome: ${report.outcome}`,
    `Summary: ${Object.entries(report.summary)
      .map(([status, count]) => `${status}=${count}`)
      .join(" ")}`,
    report.diagnostics.orphanEvidence.length > 0
      ? `Warning: orphan evidence ${report.diagnostics.orphanEvidence.join(", ")}`
      : "Diagnostics: no orphan evidence",
  ].join("\n");
}

async function main() {
  try {
    const options = parseArgs(process.argv.slice(2));
    const [manifest, evidence] = await Promise.all([
      readJson(options.manifest),
      readJson(options.evidence),
    ]);
    const report = assess(manifest, evidence, { asOf: options.asOf });
    process.stdout.write(`${options.format === "json" ? JSON.stringify(report, null, 2) : toText(report)}\n`);
    process.exitCode = report.outcome === "pass" ? 0 : 1;
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    if (error.validationErrors) {
      for (const validationError of error.validationErrors) process.stderr.write(`- ${validationError}\n`);
    }
    process.exitCode = 2;
  }
}

await main();
