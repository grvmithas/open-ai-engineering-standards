#!/usr/bin/env node
import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { evaluate as retrieval } from "./evaluators/retrieval.mjs";
import { evaluate as routing } from "./evaluators/routing.mjs";
import { evaluate as tools } from "./evaluators/tools.mjs";
import { evaluate as memory } from "./evaluators/memory.mjs";
import { evaluate as policy } from "./evaluators/policy.mjs";
import { evaluate as trace } from "./evaluators/trace.mjs";
import { evaluate as finalOutput } from "./evaluators/final-output.mjs";

const EVALUATORS = { retrieval, routing, tools, memory, policy, trace, finalOutput };

async function readJsonLines(path) {
  const text = await readFile(path, "utf8");
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      try {
        return JSON.parse(line);
      } catch (error) {
        throw new Error(`${path}:${index + 1}: ${error.message}`);
      }
    });
}

export async function loadDataset(directory) {
  const names = (await readdir(directory)).filter((name) => name.endsWith(".jsonl")).sort();
  const cases = (await Promise.all(names.map((name) => readJsonLines(resolve(directory, name))))).flat();
  const ids = new Set();
  for (const testCase of cases) {
    if (testCase.schemaVersion !== "1.0.0" || testCase.datasetVersion !== "1.0.0") {
      throw new Error(`${testCase.id ?? "unknown"}: unsupported dataset contract`);
    }
    if (ids.has(testCase.id)) throw new Error(`${testCase.id}: duplicate case identifier`);
    ids.add(testCase.id);
    for (const dimension of Object.keys(EVALUATORS)) {
      if (!testCase.expected?.[dimension]) throw new Error(`${testCase.id}: missing ${dimension} expectation`);
    }
  }
  return cases.sort((left, right) => left.id.localeCompare(right.id));
}

export async function evaluateDataset(datasetDirectory, candidatePath) {
  const [cases, candidates] = await Promise.all([
    loadDataset(datasetDirectory),
    readJsonLines(candidatePath),
  ]);
  const candidateById = new Map(candidates.map((candidate) => [candidate.id, candidate]));
  const results = cases.map((testCase) => {
    const candidate = candidateById.get(testCase.id);
    const dimensions = Object.fromEntries(
      Object.entries(EVALUATORS).map(([name, evaluator]) => [
        name,
        candidate
          ? evaluator(testCase.expected[name], candidate.actual?.[name])
          : { passed: false, score: 0, checks: { candidatePresent: false } },
      ]),
    );
    return {
      id: testCase.id,
      category: testCase.category,
      passed: Object.values(dimensions).every((dimension) => dimension.passed),
      dimensions,
    };
  });
  const aggregate = Object.fromEntries(
    Object.keys(EVALUATORS).map((name) => {
      const passed = results.filter((item) => item.dimensions[name].passed).length;
      return [name, { passed, total: results.length, rate: results.length === 0 ? 0 : passed / results.length }];
    }),
  );
  return {
    schemaVersion: "1.0.0",
    datasetVersion: "1.0.0",
    outcome: results.every((result) => result.passed) ? "pass" : "fail",
    aggregate,
    results,
  };
}

async function main() {
  const args = process.argv.slice(2);
  const datasetIndex = args.indexOf("--dataset");
  const candidatesIndex = args.indexOf("--candidates");
  if (datasetIndex === -1 || candidatesIndex === -1 || !args[datasetIndex + 1] || !args[candidatesIndex + 1]) {
    throw new Error("Usage: node eval/run.mjs --dataset eval/datasets/v1 --candidates <jsonl>");
  }
  const report = await evaluateDataset(resolve(args[datasetIndex + 1]), resolve(args[candidatesIndex + 1]));
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  process.exitCode = report.outcome === "pass" ? 0 : 1;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 2;
  });
}
