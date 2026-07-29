import fs from 'node:fs';
import path from 'node:path';
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

if (failures.length) {
  console.error(`Content validation failed (${failures.length}):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${manifest.documentCount} canonical content documents.`);
}
