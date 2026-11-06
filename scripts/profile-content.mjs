#!/usr/bin/env node
/**
 * Content profiler — scores every document against the AIES document contract (CLAUDE.md)
 * and flags systemic quality problems.
 *   node scripts/profile-content.mjs                   summary to stdout
 *   node scripts/profile-content.mjs --report <file>   markdown report
 *   node scripts/profile-content.mjs --json <file>     per-document JSON
 *   node scripts/profile-content.mjs --min-score 70    exit 1 if any contract-bound doc scores below
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { ROOT, stripFencedCode, stripFrontmatter, toPosix, walkContent } from './content-utils.mjs';

const args = process.argv.slice(2);
const flag = name => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : null;
};
const NOW = new Date(flag('as-of') ?? new Date().toISOString().slice(0, 10));

/** The seven sections CLAUDE.md requires, plus Changelog for edit history. Synonyms are accepted. */
const SECTIONS = {
  purpose: /^#{1,3}\s+(\d+\.\s*)?(purpose|overview|what this (solves|is)|summary)\b/im,
  why: /^#{1,3}\s+(\d+\.\s*)?(why\b|rationale|reasoning|why this|the problem|motivation)/im,
  how: /^#{1,3}\s+(\d+\.\s*)?(how\b|implementation|(operating\s+)?procedure|steps|step-by-step|usage|workflow|process|the path|setup|instructions)/im,
  tradeoffs: /^#{1,3}\s+(\d+\.\s*)?trade-?offs/im,
  antiPatterns: /^#{1,3}\s+(\d+\.\s*)?(.*anti-?patterns|what not to do|common mistakes|failure modes)/im,
  enterprise: /^#{1,3}\s+(\d+\.\s*)?(enterprise|governance|compliance)/im,
  checklist: /^#{1,3}\s+(\d+\.\s*)?(.*checklist|quality gate|readiness gate|definition of done|verification)/im,
  changelog: /^#{1,3}\s+(\d+\.\s*)?(changelog|change log|revision history)/im,
};
const SECTION_WEIGHTS = { purpose: 10, why: 15, how: 15, tradeoffs: 15, antiPatterns: 15, enterprise: 10, checklist: 15, changelog: 5 };

/** Terms that indicate content written against superseded models, APIs, or tools. */
const OUTDATED = [
  [/\bgpt-4(?!\.\d|o)\b|\bgpt-4-turbo\b|\bgpt-3\.5\b|text-davinci/gi, 'legacy OpenAI model id'],
  [/\bgpt-4o(-mini)?\b/gi, 'gpt-4o era model id'],
  [/\bclaude[- ](2|instant|3(\.5)?)[- ]?(opus|sonnet|haiku)?\b|claude-3-/gi, 'legacy Claude model id'],
  [/\bgemini[- ]1\.[05]\b|\bgemini-pro\b|\bpalm ?2\b/gi, 'legacy Gemini/PaLM model id'],
  [/openai\.(Completion|ChatCompletion)\.create|\bfunctions\s*=\s*\[|function_call\s*=/g, 'legacy OpenAI SDK / function-calling API'],
  [/@modelcontextprotocol\/server-(github|postgres|redis|slack|gitlab|gdrive|puppeteer|sqlite|brave-search)\b/g, 'archived MCP reference server'],
  [/\bMCP\b[^\n]{0,40}\b2024-11-05\b|\b2025-03-26\b|\bHTTP\+SSE\b/g, 'superseded MCP spec/transport'],
  [/\.windsurfrules|\.cursorrules\b/g, 'deprecated rules file'],
  [/\blangchain\.(llms|chat_models)\b|LLMChain\b|initialize_agent\b|AgentExecutor\b/g, 'legacy LangChain API'],
  [/\bAutoGen\b(?![^\n]{0,80}(Agent Framework|successor|existing))/g, 'AutoGen (superseded by Microsoft Agent Framework)'],
  [/\b(GPT|LLM)s? (can(no|')t|cannot) (browse|see images|use tools)\b/gi, 'outdated capability claim'],
];

const PLACEHOLDER = /\b(TODO|TBD|FIXME|XXX|lorem ipsum|coming soon)\b|\[(insert|placeholder|your [a-z ]+ here)\]|<insert [^>]+>/gi;
const HEDGE = /\b(you (could|might) (want to )?(consider|try)|there are (several|many|three|a few) ways|it depends on your|may or may not)\b/gi;

function docType(rel) {
  const name = path.basename(rel);
  if (/^content\/patterns\/[^/]+\/(?!README\.md$)/.test(rel)) return 'fragment';
  if (name.endsWith('.prompt.md')) return rel.startsWith('content/08-ai-sdlc/prompts/') ? 'kit-prompt' : 'prompt';
  if (name.endsWith('.skill.md')) return 'skill';
  if (name.endsWith('.subagent.md')) return 'subagent';
  if (name.endsWith('.agent.md')) return 'agent';
  if (name.endsWith('.mcp.md')) return 'mcp';
  if (name.endsWith('.template.md') || name.endsWith('.md.template') || rel.includes('/templates/')) return 'template';
  if (/checklist/i.test(name) || rel.includes('/checklists/')) return 'checklist';
  if (/^content\/(CHANGELOG|CONTRIBUTING|roadmap|principles)\.md$|^content\/(governance|community|case-studies)\//.test(rel)) return 'meta';
  if (name === 'README.md') return 'index';
  return 'chapter';
}

/** Index pages, templates, and checklists are navigational/fill-in artifacts — scored, but not contract-bound. */
const CONTRACT_BOUND = new Set(['chapter', 'prompt', 'kit-prompt', 'skill', 'agent', 'subagent', 'mcp']);

function typeChecks(type, body) {
  const issues = [];
  if (type === 'prompt' || type === 'kit-prompt') {
    for (const tag of ['role', 'instructions', 'output_format', 'constraints']) {
      if (!new RegExp(`<${tag}>`, 'i').test(body)) issues.push(`prompt missing <${tag}>`);
    }
    const constraints = [...body.matchAll(/<constraints>([\s\S]*?)<\/constraints>/gi)].map(m => m[1]).sort((a, b) => b.length - a.length)[0] ?? '';
    const constraintCount = (constraints.match(/^\s*([-*]|\d+\.)\s|<constraint>/gm) ?? []).length;
    if (constraints && constraintCount < 3) issues.push('prompt has < 3 constraints');
    if (/<(instructions)>/i.test(body) && body.length > 4000 && !/<(thinking|scratchpad)>/i.test(body)) issues.push('complex prompt without <thinking>/<scratchpad>');
  }
  if (type === 'skill') {
    if (!/(trigger|activate|when to use|use when)/i.test(body)) issues.push('skill without trigger');
    if (!/(verif|validate|how do you know|success criteria)/i.test(body)) issues.push('skill without verification');
    if (!/(unhappy|fail|error|rollback|if .* (fails|breaks))/i.test(body)) issues.push('skill without unhappy path');
  }
  if (type === 'agent' || type === 'subagent') {
    if (!/terminat|stop condition|done when/i.test(body)) issues.push('agent without termination criteria');
    if (!/failure mode|recovery|escalat/i.test(body)) issues.push('agent without failure modes/recovery');
    if (!/success metric|metrics|kpi|measure/i.test(body)) issues.push('agent without success metrics');
    if (!/memory/i.test(body)) issues.push('agent without memory requirements');
  }
  return issues;
}

function normalizeParagraph(p) {
  return p.toLowerCase().replace(/[`*_>#|\-\[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
}

const docs = [];
const paragraphIndex = new Map();

for (const abs of walkContent()) {
  const rel = toPosix(path.relative(ROOT, abs));
  const raw = fs.readFileSync(abs, 'utf8').replace(/^\uFEFF/, '');
  const body = stripFrontmatter(raw);
  const prose = stripFencedCode(body);
  const type = docType(rel);
  const words = (type.endsWith('prompt') ? body : prose).split(/\s+/).filter(Boolean).length;

  let untagged = 0;
  let blocks = 0;
  let nestedFences = 0;
  let open = null;
  for (const line of body.split(/\r?\n/)) {
    const m = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);
    if (!m) continue;
    if (!open) open = { fence: m[1], info: m[2].trim() };
    else if (m[2].trim() && m[1][0] === open.fence[0] && m[1].length >= open.fence.length) nestedFences += 1;
    else if (m[1][0] === open.fence[0] && m[1].length >= open.fence.length && !m[2].trim()) {
      blocks += 1;
      if (!open.info) untagged += 1;
      open = null;
    }
  }

  const sections = Object.fromEntries(Object.entries(SECTIONS).map(([k, re]) => [k, re.test(prose)]));
  const sectionScore = Object.entries(sections).reduce((s, [k, ok]) => s + (ok ? SECTION_WEIGHTS[k] : 0), 0);

  const date =
    raw.match(/(?:last[ -])?(?:updated|reviewed|date)(?::\*\*|\*\*:|:)\s*["']?(\d{4}-\d{2}-\d{2})/i)?.[1] ??
    [...prose.matchAll(/^(?:[-*] |\| *)?(?:\d+\.\d+(?:\.\d+)?\s*(?:\(|—|-|\|)\s*)?(\d{4}-\d{2}-\d{2})/gm)].map(m => m[1]).sort().at(-1) ??
    null;
  const age = date ? Math.floor((NOW - new Date(date)) / 86_400_000) : null;

  const outdated = [];
  const currentProse = prose
    .split(/\r?\n/)
    .filter(l => !/(archiv|legacy|deprecat|avoid|successor|supersed|migrat|delete|instead of|existing systems|in 202[2-5]|202[2-5][–-]202[2-6]|no longer|retired|diverge)/i.test(l))
    .join('\n');
  for (const [re, label] of OUTDATED) {
    const hits = currentProse.match(re);
    if (hits) outdated.push({ label, count: hits.length, sample: hits[0] });
  }
  const placeholders = type === 'template' ? [] : prose.split(/\r?\n/).filter(l => !l.trimStart().startsWith('|')).join('\n').match(PLACEHOLDER) ?? [];
  const hedges = prose.match(HEDGE) ?? [];
  const typeIssues = typeChecks(type, body);

  const paragraphs = prose.split(/\r?\n\s*\r?\n/).map(normalizeParagraph).filter(p => p.length >= 220);
  for (const p of paragraphs) {
    const h = crypto.createHash('sha1').update(p).digest('hex').slice(0, 16);
    if (!paragraphIndex.has(h)) paragraphIndex.set(h, { files: new Set(), sample: p.slice(0, 140) });
    paragraphIndex.get(h).files.add(rel);
  }

  let penalty = 0;
  penalty += Math.min(15, untagged * 3);
  penalty += Math.min(15, nestedFences * 5);
  penalty += Math.min(15, placeholders.length * 5);
  penalty += Math.min(10, outdated.reduce((s, o) => s + o.count, 0) * 2);
  penalty += Math.min(15, typeIssues.length * 5);
  penalty += words < 250 && CONTRACT_BOUND.has(type) ? 10 : 0;
  penalty += !date ? 5 : 0;

  docs.push({
    rel,
    area: rel.split('/')[1],
    type,
    contractBound: CONTRACT_BOUND.has(type),
    words,
    tokens: Math.round(raw.length / 4),
    sections,
    missingSections: Object.entries(sections).filter(([, ok]) => !ok).map(([k]) => k),
    codeBlocks: blocks,
    untagged,
    nestedFences,
    mermaid: (body.match(/```mermaid/g) ?? []).length,
    tables: (prose.match(/^\|[-: |]+\|$/gm) ?? []).length,
    externalLinks: (prose.match(/\]\(https?:\/\//g) ?? []).length,
    updated: date,
    ageDays: age,
    outdated,
    placeholders: placeholders.slice(0, 5),
    hedges: hedges.length,
    typeIssues,
    paragraphCount: paragraphs.length,
    score: Math.max(0, (type === 'kit-prompt' ? 100 : sectionScore) - penalty),
  });
}

const dupClusters = [...paragraphIndex.values()].filter(v => v.files.size >= 3);
const dupByFile = new Map();
for (const c of dupClusters) for (const f of c.files) dupByFile.set(f, (dupByFile.get(f) ?? 0) + 1);
for (const d of docs) {
  d.duplicatedParagraphs = dupByFile.get(d.rel) ?? 0;
  d.duplicationRatio = d.paragraphCount ? +(d.duplicatedParagraphs / d.paragraphCount).toFixed(2) : 0;
}

// ---- aggregate ----
const bound = docs.filter(d => d.contractBound);
const pct = (n, total) => `${total ? Math.round((100 * n) / total) : 0}%`;
const avg = list => (list.length ? Math.round(list.reduce((s, d) => s + d.score, 0) / list.length) : 0);
const byArea = new Map();
for (const d of docs) {
  if (!byArea.has(d.area)) byArea.set(d.area, []);
  byArea.get(d.area).push(d);
}
const byType = new Map();
for (const d of docs) {
  if (!byType.has(d.type)) byType.set(d.type, []);
  byType.get(d.type).push(d);
}

const sectionCoverage = Object.keys(SECTIONS).map(k => [k, bound.filter(d => d.sections[k]).length]);
const outdatedTotals = new Map();
for (const d of docs) for (const o of d.outdated) {
  const cur = outdatedTotals.get(o.label) ?? { files: 0, hits: 0 };
  cur.files += 1;
  cur.hits += o.count;
  outdatedTotals.set(o.label, cur);
}
const typeIssueTotals = new Map();
for (const d of docs) for (const t of d.typeIssues) typeIssueTotals.set(t, (typeIssueTotals.get(t) ?? 0) + 1);

const summary = {
  asOf: NOW.toISOString().slice(0, 10),
  documents: docs.length,
  contractBound: bound.length,
  averageScore: avg(bound),
  totalTokens: docs.reduce((s, d) => s + d.tokens, 0),
  untaggedBlocks: docs.reduce((s, d) => s + d.untagged, 0),
  filesWithUntagged: docs.filter(d => d.untagged).length,
  filesWithNestedFences: docs.filter(d => d.nestedFences).length,
  filesWithPlaceholders: docs.filter(d => d.placeholders.length).length,
  filesWithOutdated: docs.filter(d => d.outdated.length).length,
  undated: docs.filter(d => !d.updated).length,
  duplicateClusters: dupClusters.length,
};

console.log(`Profiled ${summary.documents} docs (${summary.contractBound} contract-bound). Avg contract score ${summary.averageScore}/100.`);
console.log(`Untagged code blocks: ${summary.untaggedBlocks} in ${summary.filesWithUntagged} files · placeholders: ${summary.filesWithPlaceholders} files · outdated terms: ${summary.filesWithOutdated} files · undated: ${summary.undated} · duplicate paragraph clusters (≥3 files): ${summary.duplicateClusters}`);

const reportPath = flag('report');
if (reportPath) {
  const L = [];
  const row = cells => `| ${cells.join(' | ')} |`;
  L.push('# Content Profile', '', `> Generated by \`scripts/profile-content.mjs\` on ${summary.asOf}. Do not edit by hand; re-run to refresh.`, '');
  L.push('## Summary', '', '| Metric | Value |', '|---|---|');
  for (const [k, v] of Object.entries(summary)) L.push(row([k, String(v)]));
  L.push('', '## Score by area (contract-bound docs)', '', row(['Area', 'Docs', 'Bound', 'Avg score', 'Avg words', 'Tokens', 'Untagged', 'Outdated files', 'Dup ratio ≥0.3']), row(Array(9).fill('---')));
  for (const [area, list] of [...byArea.entries()].sort()) {
    const b = list.filter(d => d.contractBound);
    L.push(row([area, list.length, b.length, avg(b), Math.round(list.reduce((s, d) => s + d.words, 0) / list.length), list.reduce((s, d) => s + d.tokens, 0), list.reduce((s, d) => s + d.untagged, 0), list.filter(d => d.outdated.length).length, list.filter(d => d.duplicationRatio >= 0.3).length].map(String)));
  }
  L.push('', '## Score by document type', '', row(['Type', 'Docs', 'Avg score', 'Most common type issue']), row(Array(4).fill('---')));
  for (const [type, list] of [...byType.entries()].sort()) {
    const counts = new Map();
    for (const d of list) for (const t of d.typeIssues) counts.set(t, (counts.get(t) ?? 0) + 1);
    const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    L.push(row([type, String(list.length), String(avg(list)), top ? `${top[0]} (${top[1]})` : '—']));
  }
  L.push('', '## Required-section coverage (contract-bound docs)', '', row(['Section', 'Present', 'Coverage']), row(['---', '---', '---']));
  for (const [k, n] of sectionCoverage) L.push(row([k, String(n), pct(n, bound.length)]));
  L.push('', '## Outdated terms', '', row(['Term', 'Files', 'Hits']), row(['---', '---', '---']));
  for (const [label, v] of [...outdatedTotals.entries()].sort((a, b) => b[1].files - a[1].files)) L.push(row([label, String(v.files), String(v.hits)]));
  L.push('', '## Type-specific contract issues', '', row(['Issue', 'Files']), row(['---', '---']));
  for (const [t, n] of [...typeIssueTotals.entries()].sort((a, b) => b[1] - a[1])) L.push(row([t, String(n)]));
  L.push('', '## Lowest-scoring contract-bound documents (bottom 40)', '', row(['Score', 'Doc', 'Missing sections', 'Other issues']), row(Array(4).fill('---')));
  for (const d of [...bound].sort((a, b) => a.score - b.score).slice(0, 40)) {
    const other = [...d.typeIssues, d.untagged ? `${d.untagged} untagged` : '', d.outdated.length ? `outdated: ${d.outdated.map(o => o.label).join(', ')}` : '', d.words < 250 ? `${d.words} words` : ''].filter(Boolean).join('; ');
    L.push(row([String(d.score), `\`${d.rel}\``, d.missingSections.join(', ') || '—', other || '—']));
  }
  L.push('', '## Largest documents (token cost when loaded into an agent)', '', row(['Tokens', 'Doc']), row(['---', '---']));
  for (const d of [...docs].sort((a, b) => b.tokens - a.tokens).slice(0, 15)) L.push(row([String(d.tokens), `\`${d.rel}\``]));
  L.push('', '## Most duplicated paragraphs (boilerplate candidates)', '', row(['Files', 'Paragraph (start)']), row(['---', '---']));
  for (const c of dupClusters.sort((a, b) => b.files.size - a.files.size).slice(0, 15)) L.push(row([String(c.files.size), c.sample.replace(/\|/g, '/')]));
  fs.writeFileSync(path.resolve(reportPath), `${L.join('\n')}\n`);
  console.log(`Report → ${reportPath}`);
}

const jsonPath = flag('json');
if (jsonPath) fs.writeFileSync(path.resolve(jsonPath), JSON.stringify({ summary, docs }, null, 2));

const minScore = flag('min-score');
if (minScore !== null) {
  const below = bound.filter(d => d.score < Number(minScore));
  if (below.length) {
    console.error(`${below.length} contract-bound docs below ${minScore}.`);
    process.exitCode = 1;
  }
}
