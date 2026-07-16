import fs from 'node:fs';
import path from 'node:path';
import {
  MANIFEST_PATH,
  ROOT,
  SEARCH_PATH,
  buildManifest,
  searchableText,
  stableJson,
  stripFrontmatter,
} from './content-utils.mjs';

const checkOnly = process.argv.includes('--check');
const manifest = buildManifest();
const manifestJson = stableJson(manifest);
const searchJson = stableJson({
  schemaVersion: manifest.schemaVersion,
  documentCount: manifest.documentCount,
  docs: manifest.documents.map(({ slug, sourcePath, title, description }) => ({
    slug,
    title,
    description,
    text: searchableText(stripFrontmatter(fs.readFileSync(path.join(ROOT, sourcePath), 'utf8'))),
  })),
});

const outputs = [
  [MANIFEST_PATH, manifestJson],
  [SEARCH_PATH, searchJson],
];

let stale = false;
for (const [filePath, expected] of outputs) {
  if (checkOnly) {
    if (!fs.existsSync(filePath) || fs.readFileSync(filePath, 'utf8') !== expected) {
      console.error(`${path.relative(process.cwd(), filePath)} is stale. Run npm run content:generate.`);
      stale = true;
    }
    continue;
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, expected, 'utf8');
}

if (stale) process.exitCode = 1;
else console.log(`${checkOnly ? 'Verified' : 'Generated'} manifest for ${manifest.documentCount} documents.`);
