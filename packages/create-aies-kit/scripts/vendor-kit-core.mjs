#!/usr/bin/env node
/** Copy packages/kit-core/lib → packages/create-aies-kit/lib/kit-core for a self-contained npm package. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const src = path.resolve(here, '../../kit-core/lib');
const dest = path.resolve(here, '../lib/kit-core');

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });

for (const name of fs.readdirSync(src)) {
  if (!name.endsWith('.js')) continue;
  fs.copyFileSync(path.join(src, name), path.join(dest, name));
}

console.log(`Vendored ${fs.readdirSync(dest).length} kit-core modules → ${dest}`);
