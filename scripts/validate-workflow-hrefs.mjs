#!/usr/bin/env node
/**
 * Validate that every docs slug referenced by workflow lifecycle + quickStart + catalog
 * resolves in content-manifest.json (prevents ghost /docs links).
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, MANIFEST_PATH } from './content-utils.mjs';

function loadManifestSlugs() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  return new Set(manifest.documents.map(doc => doc.slug));
}

function isStaticDocsSlug(slug) {
  return Boolean(slug) && !slug.includes('${') && slug.includes('/') && !slug.includes('*');
}

function extractSlugs(text, source) {
  const refs = [];
  const slugFieldRe = /slug:\s*`([^`]+)`|slug:\s*'([^']+)'/g;
  let m;
  while ((m = slugFieldRe.exec(text)) !== null) {
    const slug = m[1] ?? m[2];
    if (!isStaticDocsSlug(slug)) continue;
    refs.push({ source, slug });
  }
  const hrefRe = /href:\s*['`](\/docs\/[^'`]+)['`]/g;
  while ((m = hrefRe.exec(text)) !== null) {
    const slug = m[1].replace(/^\/docs\//, '');
    if (!isStaticDocsSlug(slug)) continue;
    refs.push({ source, slug });
  }
  const cookbookRe = /cookbookSlug:\s*'([^']+)'/g;
  while ((m = cookbookRe.exec(text)) !== null) {
    if (!isStaticDocsSlug(m[1])) continue;
    refs.push({ source, slug: m[1] });
  }
  const stackSkillRe = /['"]((?:03-skill-engineering|cookbook)\/[^'"]+\.skill)['"]/g;
  while ((m = stackSkillRe.exec(text)) !== null) {
    if (!isStaticDocsSlug(m[1])) continue;
    refs.push({ source, slug: m[1] });
  }
  return refs;
}

const slugs = loadManifestSlugs();
const files = [
  'src/lib/workflows/lifecycle.ts',
  'src/lib/workflows/quickStart.ts',
  'src/lib/workflows/catalog.ts',
];

const refs = files.flatMap(rel => {
  const abs = path.join(ROOT, rel);
  return extractSlugs(fs.readFileSync(abs, 'utf8'), rel);
});

const failures = [];
const seen = new Set();
for (const ref of refs) {
  const key = `${ref.source}::${ref.slug}`;
  if (seen.has(key)) continue;
  seen.add(key);
  if (!slugs.has(ref.slug)) {
    failures.push(`${ref.source}: missing docs slug "${ref.slug}"`);
  }
}

if (failures.length) {
  console.error(`Workflow href validation failed (${failures.length}):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${seen.size} workflow/quickstart/catalog docs slugs against content-manifest (${slugs.size} docs).`);
}
