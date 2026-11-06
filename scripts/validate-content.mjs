import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import {
  ROOT,
  buildManifest,
  stripFencedCode,
  toPosix,
  walkContent,
} from './content-utils.mjs';

const failures = [];
const manifest = buildManifest();
const slugs = new Set();

for (const document of manifest.documents) {
  if (slugs.has(document.slug)) failures.push(`Duplicate slug: ${document.slug}`);
  slugs.add(document.slug);
  let markdown = fs.readFileSync(path.join(ROOT, document.sourcePath), 'utf8');
  if (markdown.charCodeAt(0) === 0xFEFF) {
    markdown = markdown.slice(1);
  }
  if (!/^#\s+\S/m.test(stripFencedCode(markdown))) {
    failures.push(`${document.sourcePath}: missing one H1 title`);
  }
  if (!document.description.trim()) failures.push(`${document.sourcePath}: missing description`);
}

for (const filePath of walkContent()) {
  if (fs.statSync(filePath).size === 0) {
    failures.push(`${toPosix(path.relative(ROOT, filePath))}: empty content file`);
  }
}

// Source skills and agents feed runtime-native files; enforce the open Agent Skills limits at the source.
const SKILL_NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
for (const filePath of walkContent()) {
  const rel = toPosix(path.relative(ROOT, filePath));
  const isSkill = rel.endsWith('.skill.md') && !rel.startsWith('content/patterns/');
  const isAgent = /\.(agent|subagent)\.md$/.test(rel) && !rel.startsWith('content/patterns/');
  if (!isSkill && !isAgent) continue;
  const text = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  let data;
  try {
    data = matter(text).data;
  } catch (error) {
    failures.push(`${rel}: invalid YAML frontmatter (${error.message})`);
    continue;
  }
  const name = String(data.name ?? '');
  const description = String(data.description ?? '');
  if (!SKILL_NAME.test(name) || name.length > 64) failures.push(`${rel}: frontmatter name must be kebab-case ≤ 64 chars`);
  if (!description || description.length > 1024) failures.push(`${rel}: frontmatter description required, ≤ 1024 chars`);
  if (/^[.,;:]\s|^\s*Use (when|for)\b/.test(description) || description.length < 40) failures.push(`${rel}: frontmatter description must start with what the artifact does (runtimes delegate on it)`);
  if (isAgent && !data.tools) failures.push(`${rel}: agent frontmatter must declare tools`);
}

if (failures.length) {
  console.error(`Content validation failed (${failures.length}):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${manifest.documentCount} canonical content documents.`);
}
