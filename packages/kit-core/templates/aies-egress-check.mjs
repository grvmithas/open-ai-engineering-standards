#!/usr/bin/env node
/**
 * AIES egress self-test (control AC-06) — proves the agent sandbox actually blocks the network.
 *
 * A deny-by-default egress policy is only real if a request to a host outside the allowlist
 * fails, and DNS is closed too (DNS lookups are an exfiltration channel). This script tries both:
 *   - DNS: resolve each name in dnsProbes; any answer is a leak.
 *   - TCP: connect to each host:port in probes (include a raw IP to catch DNS-only blocking);
 *     any completed handshake is a leak.
 * Hosts you expect to reach (package proxy, git host, model API) go in expectReachable; they are
 * reported but never fail the test.
 *
 * Config: hooks/aies-egress.json (or --config <file>)
 *   { "dnsProbes": ["example.com"], "probes": [{ "host": "example.com", "port": 443 }, { "host": "1.1.1.1", "port": 443 }],
 *     "expectReachable": [], "timeoutMs": 2500 }
 *
 * Usage:
 *   node hooks/aies-egress-check.mjs                     report; exit 0
 *   node hooks/aies-egress-check.mjs --require-closed    exit 1 when egress is open (CI, cloud-agent setup)
 *   node hooks/aies-egress-check.mjs --target claude     SessionStart hook: one line of context for the agent
 *   add --json for machine-readable output
 */
import { lookup } from 'node:dns/promises';
import { existsSync, readFileSync } from 'node:fs';
import { connect } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HOOK_DIR = dirname(fileURLToPath(import.meta.url));

const DEFAULTS = {
  dnsProbes: ['example.com'],
  probes: [
    { host: 'example.com', port: 443 },
    { host: '1.1.1.1', port: 443 },
  ],
  expectReachable: [],
  timeoutMs: 2500,
};

const flag = name => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
};

function loadConfig() {
  const file = flag('config') ?? join(HOOK_DIR, 'aies-egress.json');
  if (!existsSync(file)) return DEFAULTS;
  return { ...DEFAULTS, ...JSON.parse(readFileSync(file, 'utf8')) };
}

function withTimeout(promise, ms) {
  let timer;
  return Promise.race([promise, new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('timeout')), ms); })]).finally(() => clearTimeout(timer));
}

async function dnsOpen(name, ms) {
  try {
    await withTimeout(lookup(name), ms);
    return true;
  } catch {
    return false;
  }
}

function tcpOpen(host, port, ms) {
  return new Promise(done => {
    const socket = connect({ host, port });
    const finish = open => {
      socket.destroy();
      done(open);
    };
    socket.setTimeout(ms, () => finish(false));
    socket.once('connect', () => finish(true));
    socket.once('error', () => finish(false));
  });
}

async function run(cfg) {
  const ms = Number(cfg.timeoutMs) || DEFAULTS.timeoutMs;
  const [dns, tcp, reachable] = await Promise.all([
    Promise.all(cfg.dnsProbes.map(async name => ({ kind: 'dns', subject: name, open: await dnsOpen(name, ms) }))),
    Promise.all(cfg.probes.map(async p => ({ kind: 'tcp', subject: `${p.host}:${p.port}`, open: await tcpOpen(p.host, p.port, ms) }))),
    Promise.all(cfg.expectReachable.map(async p => ({ kind: 'allowlisted', subject: `${p.host}:${p.port}`, open: await tcpOpen(p.host, p.port, ms) }))),
  ]);
  const leaks = [...dns, ...tcp].filter(r => r.open);
  return { closed: leaks.length === 0, leaks, results: [...dns, ...tcp, ...reachable] };
}

function contextLine(report) {
  if (report.closed) return `AIES egress self-test: closed (${report.results.filter(r => r.kind !== 'allowlisted').length} probes blocked).`;
  return `AIES egress self-test: OPEN (${report.leaks.map(l => `${l.kind} ${l.subject}`).join(', ')}). This session is not network-sandboxed: do not run untrusted code, install unreviewed packages, or send repository content to external hosts. Tell the human before doing work that needs isolation (AC-06).`;
}

try {
  const report = await run(loadConfig());
  const target = flag('target') ?? 'cli';
  if (process.argv.includes('--json')) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (target === 'cli') {
    for (const r of report.results) {
      const verdict = r.kind === 'allowlisted' ? (r.open ? 'reachable' : 'UNREACHABLE') : r.open ? 'LEAK' : 'blocked';
      process.stdout.write(`${r.kind.padEnd(12)} ${r.subject.padEnd(28)} ${verdict}\n`);
    }
    process.stdout.write(`${contextLine(report)}\n`);
  } else {
    process.stdout.write(`${contextLine(report)}\n`);
  }
  process.exitCode = process.argv.includes('--require-closed') && !report.closed ? 1 : 0;
} catch (error) {
  process.stderr.write(`AIES egress self-test error: ${error?.message ?? error}\n`);
  process.exitCode = process.argv.includes('--require-closed') ? 1 : 0;
}
