#!/usr/bin/env node
/**
 * Adds an `Updated:` line to content pages that have none, using the file's last git commit date —
 * never today's date, so the freshness report keeps telling the truth about unreviewed pages.
 *   node scripts/stamp-dates.mjs           dry run
 *   node scripts/stamp-dates.mjs --write   apply
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, toPosix, walkContent } from './content-utils.mjs';

const write = process.argv.includes('--write');
const HAS_DATE = /(?:last[ -])?(?:updated|reviewed|date)(?::\*\*|\*\*:|:)\s*["']?\d{4}-\d{2}-\d{2}/i;

let count = 0;
for (const abs of walkContent()) {
  const rel = toPosix(path.relative(ROOT, abs));
  if (rel.endsWith('.md.template')) continue;
  const src = fs.readFileSync(abs, 'utf8');
  if (HAS_DATE.test(src)) continue;
  const lines = src.split('\n');
  let h1 = -1;
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(`{3,}|~{3,})/.test(lines[i])) inFence = !inFence;
    if (!inFence && /^# /.test(lines[i])) {
      h1 = i;
      break;
    }
  }
  if (h1 < 0) continue;
  let date;
  try {
    date = execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], { cwd: ROOT, encoding: 'utf8' }).trim();
  } catch {
    date = '';
  }
  const changelog = src.split(/^#{2,3}\s+(?:changelog|change log|revision history)\b.*$/im)[1] ?? '';
  const logged = (changelog.match(/\d{4}-\d{2}-\d{2}/g) ?? []).sort().at(-1) ?? '';
  if (logged > date) date = logged;
  if (!date) continue;
  const cr = lines[h1].endsWith('\r') ? '\r' : '';
  let at = h1 + 1;
  while (at < lines.length && !lines[at].replace('\r', '').trim()) at++;
  if (lines[at]?.startsWith('>')) {
    let end = at;
    while (lines[end + 1]?.startsWith('>')) end++;
    const prev = lines[end].replace(/\r$/, '');
    lines[end] = `${prev.endsWith('  ') ? prev : `${prev}  `}${cr}`;
    lines.splice(end + 1, 0, `> **Updated:** ${date}${cr}`);
  } else {
    lines.splice(h1 + 1, 0, `${cr}`, `> **Updated:** ${date}${cr}`);
  }
  console.log(`${rel} → ${date}`);
  count++;
  if (write) fs.writeFileSync(abs, lines.join('\n'));
}
console.log(`${count} pages ${write ? 'stamped' : 'would be stamped'}.`);
