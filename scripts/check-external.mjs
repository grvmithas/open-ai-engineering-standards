#!/usr/bin/env node
/**
 * Remote endpoint liveness — the kit recommends vendor-hosted MCP servers and links vendor docs.
 * A 404/410 or DNS failure means the vendor moved; 401/403/405/406 means "alive, needs auth or a POST".
 *   node scripts/check-external.mjs [--json]
 */
import { MCP_SERVERS } from '../packages/kit-core/lib/mcp-catalog.js';

const VENDOR_DOCS = {
  'agents.md': 'https://agents.md/',
  'agent-skills-spec': 'https://agentskills.io/specification',
  'mcp-spec': 'https://modelcontextprotocol.io/specification/latest',
  'mcp-registry': 'https://registry.modelcontextprotocol.io/',
  'claude-code-subagents': 'https://code.claude.com/docs/en/sub-agents',
  'claude-code-hooks': 'https://code.claude.com/docs/en/hooks',
  'cursor-hooks': 'https://cursor.com/docs/agent/hooks',
  'copilot-custom-agents': 'https://docs.github.com/en/copilot/reference/custom-agents-configuration',
  'codex-config': 'https://developers.openai.com/codex/config-reference',
  'gemini-cli-docs': 'https://geminicli.com/docs/',
  'kiro-hooks': 'https://kiro.dev/docs/hooks/',
  'opencode-agents': 'https://opencode.ai/docs/agents/',
};

const DEAD = new Set([404, 410]);
const TIMEOUT_MS = 15_000;

async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (method === 'HEAD' && (res.status === 405 || res.status === 501)) continue;
      return { status: res.status, ok: !DEAD.has(res.status) && res.status < 500 };
    } catch (error) {
      if (method === 'GET') return { status: 0, ok: false, error: error.cause?.code ?? error.name };
    }
  }
  return { status: 0, ok: false };
}

const targets = [
  ...Object.entries(MCP_SERVERS)
    .filter(([, s]) => s.url)
    .map(([id, s]) => ({ kind: 'mcp', id, url: s.url })),
  ...Object.entries(VENDOR_DOCS).map(([id, url]) => ({ kind: 'doc', id, url })),
];

const results = await Promise.all(targets.map(async t => ({ ...t, ...(await probe(t.url)) })));
const failed = results.filter(r => !r.ok);

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ checked: results.length, failed }, null, 2));
} else {
  for (const r of results) {
    console.log(`${r.ok ? '✓' : '✗'} ${String(r.status || r.error).padEnd(12)} ${r.kind.padEnd(4)} ${r.id.padEnd(24)} ${r.url}`);
  }
  console.log(`\n${results.length - failed.length}/${results.length} reachable.`);
}

if (failed.length) {
  console.error(`Unreachable or moved: ${failed.map(f => f.id).join(', ')} — triage per content/handbook/vendor-watchlist.md.`);
  process.exitCode = 1;
}
