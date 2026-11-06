#!/usr/bin/env node
/**
 * Content freshness report — flags pages whose `Updated:` date has aged past the review window.
 *   node scripts/freshness-report.mjs [--days 120] [--volatile-days 90] [--fail-over N] [--summary <file>] [--json]
 * Volatile pages (vendor runtimes, MCP, models) get the shorter window: they rot fastest.
 */
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './content-utils.mjs';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const DAYS = Number(flag('days', 120));
const VOLATILE_DAYS = Number(flag('volatile-days', 90));
const FAIL_OVER = flag('fail-over', null);
const SUMMARY = flag('summary', null);
const AS_JSON = args.includes('--json');
const NOW = new Date(flag('as-of', new Date().toISOString().slice(0, 10)));

const CONTENT = path.join(ROOT, 'content');
const VOLATILE = /\b(Claude Code|Cursor|Copilot|Codex|Gemini CLI|Kiro|Windsurf|Devin|opencode|MCP|Model Context Protocol|gpt-\d|claude-(opus|sonnet|haiku)|gemini-\d)\b/;
const VOLATILE_HITS = 6;
const DATE = /(?:\*\*Updated:\*\*|^updated:|Updated:)\s*["']?(\d{4}-\d{2}-\d{2})/im;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

const rows = [];
let undated = 0;
for (const file of walk(CONTENT)) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(DATE);
  if (!match) {
    undated += 1;
    continue;
  }
  const age = Math.floor((NOW - new Date(match[1])) / 86_400_000);
  const volatileHits = (text.match(new RegExp(VOLATILE.source, 'g')) ?? []).length;
  const volatile = volatileHits >= VOLATILE_HITS;
  const limit = volatile ? VOLATILE_DAYS : DAYS;
  if (age > limit) {
    rows.push({ file: path.relative(ROOT, file).replaceAll('\\', '/'), updated: match[1], age, volatile, limit });
  }
}
rows.sort((a, b) => Number(b.volatile) - Number(a.volatile) || b.age - a.age);

const report = {
  asOf: NOW.toISOString().slice(0, 10),
  windows: { default: DAYS, volatile: VOLATILE_DAYS },
  stale: rows.length,
  staleVolatile: rows.filter(r => r.volatile).length,
  undated,
  rows,
};

if (AS_JSON) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Freshness as of ${report.asOf}: ${report.stale} stale (${report.staleVolatile} volatile), ${undated} undated.`);
  for (const r of rows.slice(0, 40)) {
    console.log(`  ${r.volatile ? '⚡' : '·'} ${r.age}d > ${r.limit}d  ${r.file}`);
  }
  if (rows.length > 40) console.log(`  … +${rows.length - 40} more (use --json)`);
}

if (SUMMARY) {
  const md = [
    '### Content freshness',
    '',
    `As of **${report.asOf}** — **${report.stale}** stale (${report.staleVolatile} volatile ⚡), ${undated} undated.`,
    '',
    '| Page | Updated | Age | Window |',
    '|------|---------|-----|--------|',
    ...rows.slice(0, 60).map(r => `| ${r.volatile ? '⚡ ' : ''}\`${r.file}\` | ${r.updated} | ${r.age}d | ${r.limit}d |`),
    '',
  ].join('\n');
  fs.appendFileSync(SUMMARY, md);
}

if (FAIL_OVER !== null && rows.length > Number(FAIL_OVER)) {
  console.error(`Stale pages (${rows.length}) exceed --fail-over ${FAIL_OVER}.`);
  process.exitCode = 1;
}
