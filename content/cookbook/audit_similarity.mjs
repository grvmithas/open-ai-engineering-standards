import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const files = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.name.endsWith(".md") && entry.name !== "README.md" || entry.isFile() && target !== path.join(root, "README.md") && entry.name.endsWith(".md")) files.push(target);
  }
};
walk(root);

const paragraphs = [];
for (const file of files) {
  let inCode = false;
  let buffer = [];
  const flush = () => {
    const text = buffer.join(" ").replace(/\s+/g, " ").trim();
    buffer = [];
    if (text.length >= 120) paragraphs.push({ file: path.relative(root, file), text });
  };
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    if (line.startsWith("```")) {
      flush();
      inCode = !inCode;
      continue;
    }
    if (inCode || !line.trim() || /^(#|[-*] |\d+\. |\||>)/.test(line.trim())) {
      flush();
      continue;
    }
    buffer.push(line.trim());
  }
  flush();
}

const normalized = (text) => text.toLowerCase().replace(/`[^`]+`/g, " token ").replace(/[^a-z0-9]+/g, " ").trim();
const shingles = (text) => {
  const words = normalized(text).split(" ");
  const result = new Set();
  for (let i = 0; i < words.length - 2; i++) result.add(words.slice(i, i + 3).join(" "));
  return result;
};
const sets = paragraphs.map((p) => shingles(p.text));
const similarity = (a, b) => {
  let intersection = 0;
  for (const item of a) if (b.has(item)) intersection++;
  return intersection / (a.size + b.size - intersection);
};

const exact = new Map();
paragraphs.forEach((p) => {
  const key = normalized(p.text);
  if (!exact.has(key)) exact.set(key, []);
  exact.get(key).push(p.file);
});
const exactGroups = [...exact.values()].filter((group) => new Set(group).size > 1);
const similar = [];
for (let i = 0; i < paragraphs.length; i++) {
  for (let j = i + 1; j < paragraphs.length; j++) {
    if (paragraphs[i].file.split(path.sep)[0] === paragraphs[j].file.split(path.sep)[0]) continue;
    const score = similarity(sets[i], sets[j]);
    if (score >= 0.82) similar.push({ score, a: paragraphs[i].file, b: paragraphs[j].file, text: paragraphs[i].text });
  }
}
similar.sort((a, b) => b.score - a.score);
console.log(`audited_files=${files.length}`);
console.log(`audited_prose_paragraphs=${paragraphs.length}`);
console.log(`cross_file_exact_duplicate_groups=${exactGroups.length}`);
console.log(`cross_technology_paragraph_pairs_jaccard_gte_0.82=${similar.length}`);
for (const item of similar.slice(0, 20)) console.log(`${item.score.toFixed(3)} ${item.a} <> ${item.b} :: ${item.text.slice(0, 140)}`);
process.exitCode = exactGroups.length || similar.length ? 1 : 0;
