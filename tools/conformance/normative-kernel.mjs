import { readFile } from "node:fs/promises";
import { join } from "node:path";

const NORMATIVE_FILES = Object.freeze([
  "01-kernel-and-applicability.md",
  "02-normative-controls.md",
  "03-evidence-exceptions-conformance.md",
  "04-lifecycle-and-assessment.md",
]);

const CONTROL_ROW = /^\|\s*(OAIES-(?:GOV|RSK|DAT|MOD|AGT|SEC|OPS|ASR)-\d{3}[a-z]?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|$/;

export async function loadNormativeControls(standardDirectory) {
  const controls = [];
  for (const file of NORMATIVE_FILES) {
    const text = await readFile(join(standardDirectory, file), "utf8");
    for (const [index, line] of text.split(/\r?\n/).entries()) {
      const match = CONTROL_ROW.exec(line);
      if (!match) continue;
      controls.push({
        id: match[1],
        requirement: match[2].replaceAll("**", ""),
        applicability: match[3],
        objectiveEvidence: match[4],
        source: `${file}:${index + 1}`,
      });
    }
  }
  const duplicates = controls
    .filter((control, index) => controls.findIndex((candidate) => candidate.id === control.id) !== index)
    .map((control) => control.id);
  if (duplicates.length > 0) throw new Error(`Normative control IDs are duplicated: ${[...new Set(duplicates)].join(", ")}`);
  if (controls.length === 0) throw new Error(`No normative controls found in ${standardDirectory}`);
  return controls.sort((left, right) => left.id.localeCompare(right.id));
}

export function controlApplies(control, manifest) {
  const condition = control.applicability.toUpperCase();
  if (
    condition.includes("UNIVERSAL") ||
    condition.includes("EVERY ") ||
    condition.includes("ANY ") ||
    condition.includes("ACTIVE CLAIM") ||
    condition.includes("POSITIVE CONCLUSION")
  ) return true;
  if (manifest.workloadProfiles.some((profile) => condition.includes(profile))) return true;
  if (condition.includes(manifest.autonomyLevel)) return true;
  if (condition.includes(manifest.impactLevel)) return true;
  if (condition.includes("I2–I3") && ["I2", "I3"].includes(manifest.impactLevel)) return true;
  if (condition.includes("A2–A4") && ["A2", "A3", "A4"].includes(manifest.autonomyLevel)) return true;
  return false;
}
