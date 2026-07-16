import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './content-utils.mjs';

const manifestPath = path.join(ROOT, 'src', 'generated', 'portal-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('Portal manifest is missing. Run npm run portal:generate.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const failures = [];
const controlIds = manifest.controls.map(control => control.id);

if (manifest.counts.controls !== manifest.controls.length) failures.push('control count does not match controls');
if (manifest.counts.schemas !== manifest.schemas.length) failures.push('schema count does not match schemas');
if (new Set(controlIds).size !== controlIds.length) failures.push('control IDs are not unique');
if (manifest.classification.profiles.length !== 6) failures.push('six workload profiles were not derived');
if (manifest.classification.autonomyLevels.length !== 5) failures.push('five autonomy levels were not derived');
if (manifest.classification.impactLevels.length !== 4) failures.push('four impact levels were not derived');
if (manifest.lifecycle.documents.some(document => document.status.toLowerCase() !== 'normative')) {
  failures.push('a normative source lacks normative status');
}
if ('results' in manifest || 'conformanceResult' in manifest) {
  failures.push('portal manifest must not publish conformance results');
}

if (failures.length) {
  console.error(`Portal validation failed:\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated portal source model: ${manifest.controls.length} controls, ${manifest.schemas.length} schemas.`);
}
