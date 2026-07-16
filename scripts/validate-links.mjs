import fs from 'node:fs';
import path from 'node:path';
import {
  ROOT,
  stripFencedCode,
  toPosix,
  walkContent,
} from './content-utils.mjs';

const failures = [];
const files = walkContent();

function headingIds(markdown) {
  const counts = new Map();
  return new Set(
    [...stripFencedCode(markdown).matchAll(/^#{1,6}\s+(.+)$/gm)].map(match => {
      const base = match[1]
        .replace(/<[^>]+>/g, '')
        .replace(/[*_`~]/g, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, '')
        .trim()
        .replace(/\s+/g, '-');
      const count = counts.get(base) ?? 0;
      counts.set(base, count + 1);
      return count === 0 ? base : `${base}-${count}`;
    }),
  );
}

function resolveTarget(source, href) {
  const [rawTarget, fragment] = href.split('#', 2);
  if (!rawTarget) return { filePath: source, fragment };

  const decoded = decodeURIComponent(rawTarget.split(/[?]/, 1)[0]);
  const base = decoded.startsWith('/')
    ? path.join(ROOT, decoded.replace(/^\/+/, ''))
    : path.resolve(path.dirname(source), decoded);
  const candidates = [
    base,
    `${base}.md`,
    path.join(base, 'README.md'),
  ];
  return { filePath: candidates.find(candidate => fs.existsSync(candidate)), fragment, attempted: base };
}

for (const source of files) {
  const markdown = fs.readFileSync(source, 'utf8');
  const content = stripFencedCode(markdown);
  const links = content.matchAll(/!?\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g);

  for (const match of links) {
    const href = match[1];
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(href)) continue;

    const { filePath, fragment, attempted } = resolveTarget(source, href);
    if (!filePath) {
      failures.push(`${toPosix(path.relative(ROOT, source))}: missing ${toPosix(path.relative(ROOT, attempted))}`);
      continue;
    }
    if (fragment && /\.(?:md|md\.template)$/i.test(filePath)) {
      const ids = headingIds(fs.readFileSync(filePath, 'utf8'));
      if (!ids.has(decodeURIComponent(fragment).toLowerCase())) {
        failures.push(`${toPosix(path.relative(ROOT, source))}: missing #${fragment} in ${toPosix(path.relative(ROOT, filePath))}`);
      }
    }
  }
}

if (failures.length) {
  console.error(`Internal-link validation failed (${failures.length}):\n${failures.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`Validated internal links in ${files.length} content files.`);
}
