import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = path.dirname(fileURLToPath(import.meta.url));
const expected = [
  "planner", "reviewer", "context", "debug", "migration", "legacy-modernization",
  "architecture", "optimization", "enterprise", "release", "hotfix", "root-cause",
];
const components = [
  "README.md", "problem.md", "context.md", "workflow.md", "prompt.md", "agent.md",
  "subagents.md", "skills.md", "hooks.md", "checklist.md", "examples/example.md",
  "failures.md", "enterprise-notes.md",
];
const failures = [];
const files = [];

for (const name of expected) {
  const directory = path.join(root, `${name}-pattern`);
  for (const component of components) {
    const file = path.join(directory, component);
    if (!fs.existsSync(file)) failures.push(`missing: ${name}-pattern/${component}`);
    else files.push(file);
  }
}

const localLink = /\[[^\]]+\]\(([^)]+)\)/g;
// Flag unfinished authoring markers. Allow {{TEMPLATE_VARS}} in prompts — those are bindings, not TODOs.
const unfinishedMarker = /\b(?:TODO|TBD|FIXME|PLACEHOLDER)\b/i;
for (const file of files.concat(path.join(root, "README.md"))) {
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  if (unfinishedMarker.test(text)) failures.push(`placeholder: ${rel}`);
  // Outside prompt.md, bare {{vars}} usually means unfinished scaffolding.
  if (!rel.endsWith(`${path.sep}prompt.md`) && !rel.endsWith("/prompt.md") && /\{\{[A-Z0-9_]+\}\}/.test(text)) {
    failures.push(`placeholder: ${rel}`);
  }
  if (/(?:artifact|evidence|report)\s+(?:is\s+)?attached|attaches the resulting artifact/i.test(text)) {
    failures.push(`artifact claim without inline content: ${rel}`);
  }
  if (/\*\*[^*\n]*[,:;]\.\*\*/.test(text)) {
    failures.push(`malformed generated heading: ${path.relative(root, file)}`);
  }
  const sections = [...text.matchAll(/^## .+$/gm)];
  for (let index = 0; index < sections.length; index++) {
    const start = sections[index].index + sections[index][0].length;
    const end = sections[index + 1]?.index ?? text.length;
    if (!text.slice(start, end).trim()) {
      failures.push(`empty section: ${path.relative(root, file)} ${sections[index][0]}`);
    }
  }
  if ((text.match(/```/g) ?? []).length % 2 !== 0) {
    failures.push(`unbalanced code fence: ${path.relative(root, file)}`);
  }
  for (const match of text.matchAll(localLink)) {
    const target = match[1].split("#")[0];
    if (target && !/^(?:https?:|mailto:)/.test(target) &&
        !fs.existsSync(path.resolve(path.dirname(file), target))) {
      failures.push(`broken link: ${path.relative(root, file)} -> ${match[1]}`);
    }
  }
}

for (const name of expected) {
  const prompt = fs.readFileSync(path.join(root, `${name}-pattern`, "prompt.md"), "utf8");
  for (const tag of ["role", "context", "instructions", "output_format", "constraints"]) {
    if (!prompt.includes(`<${tag}>`) || !prompt.includes(`</${tag}>`)) {
      failures.push(`prompt XML: ${name} missing ${tag}`);
    }
  }
  const reasoningProhibition =
    /(?:do not|never|must not)\s+(?:provide|reveal|expose|return|request)?[^.\n<]{0,100}(?:chain-of-thought|private (?:hidden )?reasoning)/i;
  if (!reasoningProhibition.test(prompt)) {
    failures.push(`prompt reasoning prohibition is not explicit: ${name}`);
  }
  const agent = fs.readFileSync(path.join(root, `${name}-pattern`, "agent.md"), "utf8");
  for (const field of [
    "read_only:", "effect_capable:", "memory:", "communication:", "approvals:",
    "budgets:", "recovery:", "termination:", "success:", "safe_stop:", "failure:",
  ]) {
    if (!agent.includes(field)) failures.push(`agent contract: ${name} missing ${field}`);
  }
}

const normalize = (line) => line.toLowerCase()
  .replace(/`[^`]+`/g, " ")
  .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
  .replace(/[^a-z0-9 ]/g, " ")
  .replace(/\s+/g, " ").trim();
const ignored = /^(?:#|>|```|\||- \[[ x]\]|- 2026-07-16:|[0-9]+\.|$)/;
const proseByPattern = new Map();
const lineOwners = new Map();
for (const name of expected) {
  const patternFiles = files.filter((file) => file.includes(`${name}-pattern`));
  const lines = [];
  for (const file of patternFiles) {
    let fenced = false;
    fs.readFileSync(file, "utf8").split(/\r?\n/).forEach((line, index) => {
      if (line.trim().startsWith("```")) { fenced = !fenced; return; }
      if (fenced) return;
      if (ignored.test(line.trim())) return;
      const normalized = normalize(line);
      if (normalized.length < 55) return;
      lines.push(normalized);
      if (!lineOwners.has(normalized)) lineOwners.set(normalized, []);
      lineOwners.get(normalized).push(`${path.relative(root, file)}:${index + 1}`);
    });
  }
  proseByPattern.set(name, new Set(lines));
}

const duplicateLines = [...lineOwners].filter(([, locations]) => locations.length > 1);
const totalLines = [...lineOwners.values()].reduce((sum, locations) => sum + locations.length, 0);
const duplicateOccurrences = duplicateLines.reduce((sum, [, locations]) => sum + locations.length, 0);
const duplicateRate = totalLines ? duplicateOccurrences / totalLines : 0;
if (duplicateRate > 0.03) failures.push(`duplicate substantive line rate ${(duplicateRate * 100).toFixed(2)}% > 3%`);

const pairs = [];
const gramsByPattern = new Map();
const gramsByFile = new Map();
for (const name of expected) {
  const patternFiles = files.filter((file) => file.includes(`${name}-pattern`));
  for (const file of patternFiles) {
    let fenced = false;
    const words = fs.readFileSync(file, "utf8").split(/\r?\n/)
      .filter((line) => {
        if (line.trim().startsWith("```")) { fenced = !fenced; return false; }
        return !fenced && !ignored.test(line.trim());
      })
      .flatMap((line) => normalize(line).split(" "))
      .filter((word) => word.length > 2);
    const grams = new Set();
    for (let index = 0; index <= words.length - 7; index++) grams.add(words.slice(index, index + 7).join(" "));
    gramsByFile.set(file, grams);
  }
  const words = patternFiles
    .flatMap((file) => {
      let fenced = false;
      return fs.readFileSync(file, "utf8").split(/\r?\n/).filter((line) => {
        if (line.trim().startsWith("```")) { fenced = !fenced; return false; }
        return !fenced;
      });
    })
    .filter((line) => !ignored.test(line.trim()))
    .flatMap((line) => normalize(line).split(" "))
    .filter((word) => word.length > 2);
  const grams = new Set();
  for (let index = 0; index <= words.length - 7; index++) {
    grams.add(words.slice(index, index + 7).join(" "));
  }
  gramsByPattern.set(name, grams);
}
for (let i = 0; i < expected.length; i++) {
  for (let j = i + 1; j < expected.length; j++) {
    const a = proseByPattern.get(expected[i]), b = proseByPattern.get(expected[j]);
    const intersection = [...a].filter((line) => b.has(line)).length;
    const union = new Set([...a, ...b]).size;
    const ga = gramsByPattern.get(expected[i]), gb = gramsByPattern.get(expected[j]);
    const gramIntersection = [...ga].filter((gram) => gb.has(gram)).length;
    const gramUnion = new Set([...ga, ...gb]).size;
    pairs.push({
      pair: `${expected[i]}:${expected[j]}`,
      score: union ? intersection / union : 0,
      gramScore: gramUnion ? gramIntersection / gramUnion : 0,
    });
  }
}
const highest = pairs.sort((a, b) => b.score - a.score)[0];
const highestGram = [...pairs].sort((a, b) => b.gramScore - a.gramScore)[0];
const withinPairs = [];
for (const name of expected) {
  const patternFiles = files.filter((file) => file.includes(`${name}-pattern`));
  for (let left = 0; left < patternFiles.length; left++) {
    for (let right = left + 1; right < patternFiles.length; right++) {
      const a = gramsByFile.get(patternFiles[left]), b = gramsByFile.get(patternFiles[right]);
      const intersection = [...a].filter((gram) => b.has(gram)).length;
      const union = new Set([...a, ...b]).size;
      withinPairs.push({
        pair: `${path.relative(root, patternFiles[left])}:${path.relative(root, patternFiles[right])}`,
        score: union ? intersection / union : 0,
      });
    }
  }
}
const highestWithin = withinPairs.sort((a, b) => b.score - a.score)[0];
if (highest.score > 0.08) failures.push(`highest pair similarity ${(highest.score * 100).toFixed(2)}% > 8%`);
if (highestGram.gramScore > 0.12) failures.push(`highest 7-gram similarity ${(highestGram.gramScore * 100).toFixed(2)}% > 12%`);
if (highestWithin.score > 0.12) failures.push(`highest within-pattern 7-gram similarity ${(highestWithin.score * 100).toFixed(2)}% > 12%`);

console.log(`patterns=${expected.length}`);
console.log(`component_files=${files.length}`);
console.log(`duplicate_substantive_lines=${duplicateLines.length}`);
console.log(`duplicate_occurrence_rate=${(duplicateRate * 100).toFixed(2)}%`);
console.log(`highest_pair=${highest.pair}`);
console.log(`highest_pair_similarity=${(highest.score * 100).toFixed(2)}%`);
console.log(`highest_7gram_pair=${highestGram.pair}`);
console.log(`highest_7gram_similarity=${(highestGram.gramScore * 100).toFixed(2)}%`);
console.log(`highest_within_pattern_pair=${highestWithin.pair}`);
console.log(`highest_within_pattern_7gram_similarity=${(highestWithin.score * 100).toFixed(2)}%`);
const [highestGramLeft, highestGramRight] = highestGram.pair.split(":");
const sharedGrams = [...gramsByPattern.get(highestGramLeft)]
  .filter((gram) => gramsByPattern.get(highestGramRight).has(gram));
console.log(`shared_7grams_in_highest_pair=${sharedGrams.length}`);
for (const gram of sharedGrams.slice(0, 5)) console.log(`- shared-7gram: ${gram}`);
if (duplicateLines.length) {
  console.log("duplicate_findings:");
  for (const [line, owners] of duplicateLines.slice(0, 10)) {
    console.log(`- [${owners.join(", ")}] ${line}`);
  }
}

let bashSnippets = 0;
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/```bash\s*\n([\s\S]*?)```/g)) {
    bashSnippets++;
    const script = match[1];
    if (/\}\s*\.\s+[A-Z]|policy_check\b/.test(script)) {
      failures.push(`non-executable shell content: ${path.relative(root, file)}`);
      continue;
    }
    const syntax = spawnSync("bash", ["-n"], { input: script, encoding: "utf8" });
    if (syntax.error?.code === "ENOENT") {
      failures.push(`cannot validate bash because bash is unavailable: ${path.relative(root, file)}`);
    } else if (syntax.status !== 0) {
      failures.push(`bash syntax error: ${path.relative(root, file)}: ${syntax.stderr.trim()}`);
    }
  }
}
for (const name of expected) {
  const example = fs.readFileSync(path.join(root, `${name}-pattern`, "examples/example.md"), "utf8");
  if (!/\|---|```(?:mermaid|json|yaml|text)/.test(example)) {
    failures.push(`example lacks an inline concrete artifact: ${name}`);
  }
}
console.log(`bash_snippets_validated=${bashSnippets}`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("validation=passed");
