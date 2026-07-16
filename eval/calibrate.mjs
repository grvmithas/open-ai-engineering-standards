#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

function metrics(records, threshold) {
  const counts = { trueAccept: 0, trueReject: 0, falseAccept: 0, falseReject: 0 };
  for (const record of records) {
    const predicted = record.judgeScore >= threshold ? "accept" : "reject";
    if (record.gold === "accept" && predicted === "accept") counts.trueAccept += 1;
    if (record.gold === "reject" && predicted === "reject") counts.trueReject += 1;
    if (record.gold === "reject" && predicted === "accept") counts.falseAccept += 1;
    if (record.gold === "accept" && predicted === "reject") counts.falseReject += 1;
  }
  const acceptTotal = counts.trueAccept + counts.falseReject;
  const rejectTotal = counts.trueReject + counts.falseAccept;
  const sensitivity = counts.trueAccept / acceptTotal;
  const specificity = counts.trueReject / rejectTotal;
  return {
    threshold,
    balancedAccuracy: (sensitivity + specificity) / 2,
    sensitivity,
    specificity,
    agreement: (counts.trueAccept + counts.trueReject) / records.length,
    counts,
  };
}

export function calibrate(records) {
  if (!Array.isArray(records) || records.length < 4) throw new Error("Calibration requires at least four labeled records");
  for (const record of records) {
    if (!["accept", "reject"].includes(record.gold) || typeof record.judgeScore !== "number" || record.judgeScore < 0 || record.judgeScore > 1) {
      throw new Error("Each record requires gold=accept|reject and judgeScore between 0 and 1");
    }
  }
  if (!records.some((record) => record.gold === "accept") || !records.some((record) => record.gold === "reject")) {
    throw new Error("Calibration requires both gold labels");
  }
  const thresholds = [...new Set(records.map((record) => record.judgeScore))].sort((left, right) => right - left);
  const candidates = thresholds.map((threshold) => metrics(records, threshold));
  candidates.sort(
    (left, right) =>
      right.balancedAccuracy - left.balancedAccuracy ||
      right.specificity - left.specificity ||
      right.threshold - left.threshold,
  );
  return {
    schemaVersion: "1.0.0",
    recordCount: records.length,
    selected: candidates[0],
    candidates,
    warning: "Selection metrics are calibration-set estimates, not production performance claims.",
  };
}

async function main() {
  const path = process.argv[2];
  if (!path) throw new Error("Usage: node eval/calibrate.mjs <labeled-jsonl>");
  const records = (await readFile(resolve(path), "utf8"))
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  process.stdout.write(`${JSON.stringify(calibrate(records), null, 2)}\n`);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 2;
  });
}
