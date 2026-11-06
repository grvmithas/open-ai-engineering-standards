#!/usr/bin/env node
/**
 * Adds a language tag to every untagged opening code fence in content/ (CLAUDE.md: "never untagged blocks").
 *   node scripts/tag-code-fences.mjs           dry run, lists proposed tags
 *   node scripts/tag-code-fences.mjs --write   apply
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, toPosix, walkContent } from './content-utils.mjs';

const write = process.argv.includes('--write');

function guess(code) {
  const t = code.trim();
  if (/^<(role|context|instructions|system|task|prompt|constraints|output_format)\b/m.test(t)) return 'xml';
  if (/^[{[]/.test(t)) {
    try {
      JSON.parse(t);
      return 'json';
    } catch {
      /* fall through */
    }
  }
  if (/^(\$ |#!\/|npm |npx |node |git |cd |curl |pip |docker |kubectl |export |mkdir )/m.test(t)) return 'bash';
  if (/^[├└│]|─── /m.test(t)) return 'text';
  if (/^(---\n)?[a-zA-Z_][\w-]*:\s*(\S.*)?$/m.test(t.split('\n')[0]) && t.split('\n').every(l => !l.trim() || /^\s*([\w-]+:|- |#)/.test(l))) return 'yaml';
  if (/^(import |export |const |function |interface |type )/m.test(t)) return 'typescript';
  if (/^(def |class |from \w+ import|import \w+$)/m.test(t)) return 'python';
  if (/^#{1,6} |^\s*[-*] \[[ x]\]/m.test(t)) return 'markdown';
  return 'text';
}

/**
 * Author intent for nested examples is "info string opens, bare fence closes". CommonMark instead closes the
 * outer block at the first bare fence, so a ```xml block containing a ```json example breaks the rest of the
 * page. Rebuild the intended tree and lengthen every parent fence beyond its longest child.
 */
function fixNesting(lines) {
  const fences = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^( {0,3})(`{3,})(.*?)\r?$/);
    if (m) fences.push({ i, indent: m[1], ticks: m[2].length, info: m[3].trim() });
  }
  if (!fences.some((f, k) => k > 0 && f.info && fences.slice(0, k).filter(p => p.info).length > fences.slice(0, k).filter(p => !p.info).length)) return false;
  const stack = [];
  const blocks = [];
  for (const f of fences) {
    if (f.info) stack.push({ open: f, children: [] });
    else {
      const node = stack.pop();
      if (!node) return false;
      node.close = f;
      blocks.push(node);
      if (stack.length) stack.at(-1).children.push(node);
    }
  }
  if (stack.length) return false;
  let changed = false;
  const depth = node => (node.children.length ? 1 + Math.max(...node.children.map(depth)) : 0);
  for (const node of blocks) {
    const d = depth(node);
    if (!d) continue;
    const ticks = '`'.repeat(3 + d);
    for (const f of [node.open, node.close]) {
      const cr = lines[f.i].endsWith('\r') ? '\r' : '';
      lines[f.i] = `${f.indent}${ticks}${f === node.open ? f.info : ''}${cr}`;
    }
    changed = true;
  }
  return changed;
}

let total = 0;
for (const abs of walkContent()) {
  const src = fs.readFileSync(abs, 'utf8');
  const lines = src.split('\n');
  if (process.argv.includes('--fix-nesting')) {
    if (fixNesting(lines)) {
      console.log(`nesting repaired: ${toPosix(path.relative(ROOT, abs))}`);
      if (write) fs.writeFileSync(abs, lines.join('\n'));
    }
    continue;
  }
  let open = null;
  let changed = false;
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^( {0,3})(`{3,}|~{3,})([^\r]*)\r?$/);
    if (!m) continue;
    if (!open) {
      open = { i, fence: m[2], indent: m[1], info: m[3].replace(/\r$/, '').trim() };
    } else if (m[2].startsWith(open.fence[0]) && m[2].length >= open.fence.length && !m[3].replace(/\r$/, '').trim()) {
      if (!open.info) {
        const lang = guess(lines.slice(open.i + 1, i).join('\n').replace(/\r/g, ''));
        console.log(`${toPosix(path.relative(ROOT, abs))}:${open.i + 1} → ${lang}`);
        const cr = lines[open.i].endsWith('\r') ? '\r' : '';
        lines[open.i] = `${open.indent}${open.fence}${lang}${cr}`;
        changed = true;
        total += 1;
      }
      open = null;
    }
  }
  if (changed && write) fs.writeFileSync(abs, lines.join('\n'));
}
console.log(`${total} untagged fences ${write ? 'tagged' : 'found (dry run)'}.`);
