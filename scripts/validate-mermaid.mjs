import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { ROOT, toPosix, walkContent } from './content-utils.mjs';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.DOMParser = dom.window.DOMParser;
globalThis.Element = dom.window.Element;
const { default: mermaid } = await import('mermaid/dist/mermaid.esm.min.mjs');

const failures = [];
let diagramCount = 0;

for (const filePath of walkContent()) {
  const markdown = fs.readFileSync(filePath, 'utf8');
  for (const match of markdown.matchAll(/^```mermaid[ \t]*\r?\n([\s\S]*?)^```[ \t]*$/gm)) {
    diagramCount += 1;
    try {
      await mermaid.parse(match[1]);
    } catch (error) {
      failures.push(
        `${toPosix(path.relative(ROOT, filePath))}: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

if (failures.length) {
  console.error(`Mermaid validation failed (${failures.length}):\n${failures.join('\n\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${diagramCount} Mermaid diagrams.`);
}
