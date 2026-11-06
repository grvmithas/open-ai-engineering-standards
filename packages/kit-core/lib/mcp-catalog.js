/**
 * MCP recommendations for kit install + enhance.
 * Specs live under content/mcps/; configs here are enable-ready stubs (secrets via env).
 */
import path from 'node:path';

export const MCP_SPECS = [
  { id: 'github', category: 'version-control', file: 'version-control/github.mcp.md', label: 'GitHub' },
  { id: 'gitlab', category: 'version-control', file: 'version-control/gitlab.mcp.md', label: 'GitLab' },
  { id: 'azure-devops', category: 'version-control', file: 'version-control/azure-devops.mcp.md', label: 'Azure DevOps' },
  { id: 'bitbucket-cloud', category: 'version-control', file: 'version-control/bitbucket-cloud.mcp.md', label: 'Bitbucket Cloud' },
  { id: 'filesystem', category: 'infrastructure-data', file: 'infrastructure-data/filesystem.mcp.md', label: 'Filesystem' },
  { id: 'docker', category: 'infrastructure-data', file: 'infrastructure-data/docker.mcp.md', label: 'Docker' },
  { id: 'kubernetes', category: 'infrastructure-data', file: 'infrastructure-data/kubernetes.mcp.md', label: 'Kubernetes' },
  { id: 'postgresql', category: 'infrastructure-data', file: 'infrastructure-data/postgresql.mcp.md', label: 'PostgreSQL' },
  { id: 'redis', category: 'infrastructure-data', file: 'infrastructure-data/redis.mcp.md', label: 'Redis' },
  { id: 'supabase', category: 'infrastructure-data', file: 'infrastructure-data/supabase.mcp.md', label: 'Supabase' },
  { id: 'playwright', category: 'browser-testing', file: 'browser-testing/playwright.mcp.md', label: 'Playwright' },
  { id: 'chrome-devtools', category: 'browser-testing', file: 'browser-testing/chrome-devtools.mcp.md', label: 'Chrome DevTools' },
  { id: 'sentry', category: 'observability', file: 'observability/sentry.mcp.md', label: 'Sentry' },
  { id: 'datadog', category: 'observability', file: 'observability/datadog.mcp.md', label: 'Datadog' },
  { id: 'grafana', category: 'observability', file: 'observability/grafana.mcp.md', label: 'Grafana' },
  { id: 'opentelemetry', category: 'observability', file: 'observability/opentelemetry.mcp.md', label: 'OpenTelemetry' },
  { id: 'jira', category: 'project-management', file: 'project-management/jira.mcp.md', label: 'Jira' },
  { id: 'linear', category: 'project-management', file: 'project-management/linear.mcp.md', label: 'Linear' },
  { id: 'notion', category: 'project-management', file: 'project-management/notion.mcp.md', label: 'Notion' },
  { id: 'asana', category: 'project-management', file: 'project-management/asana.mcp.md', label: 'Asana' },
  { id: 'monday', category: 'project-management', file: 'project-management/monday.mcp.md', label: 'Monday' },
  { id: 'slack', category: 'communication', file: 'communication/slack.mcp.md', label: 'Slack' },
  { id: 'microsoft-teams', category: 'communication', file: 'communication/microsoft-teams.mcp.md', label: 'Microsoft Teams' },
  { id: 'discord', category: 'communication', file: 'communication/discord.mcp.md', label: 'Discord' },
];

/**
 * Enable-ready server definitions (MCP 2026-07-28 era).
 * Prefer the vendor-hosted Streamable HTTP endpoint with OAuth 2.1 — no long-lived token in the repo.
 * stdio entries remain only where no vendor remote exists. Reference servers archived by the MCP
 * project (server-github, server-postgres, server-redis, server-slack) are intentionally absent.
 * Endpoints verified 2026-11-06; re-verify in the quarterly vendor review.
 */
export const MCP_SERVERS = {
  github: {
    transport: 'http',
    url: 'https://api.githubcopilot.com/mcp/readonly',
    auth: 'oauth',
    note: 'Read-only endpoint. Drop /readonly only after approval; narrow toolsets with the X-MCP-Toolsets header.',
  },
  gitlab: { transport: 'http', url: 'https://gitlab.com/api/v4/mcp', auth: 'oauth' },
  sentry: {
    transport: 'http',
    url: 'https://mcp.sentry.dev/mcp',
    auth: 'oauth',
    note: 'Scope by URL: /mcp/{org}/{project}.',
  },
  linear: { transport: 'http', url: 'https://mcp.linear.app/mcp/readonly', auth: 'oauth' },
  notion: { transport: 'http', url: 'https://mcp.notion.com/mcp', auth: 'oauth' },
  jira: {
    transport: 'http',
    url: 'https://mcp.atlassian.com/v2/mcp',
    auth: 'oauth',
    note: 'Atlassian Rovo MCP (Jira + Confluence); honors the signed-in user\'s permissions.',
  },
  asana: { transport: 'http', url: 'https://mcp.asana.com/v2/mcp', auth: 'oauth' },
  supabase: {
    transport: 'http',
    url: 'https://mcp.supabase.com/mcp?read_only=true',
    auth: 'oauth',
    note: 'Add &project_ref=<ref> to pin one project.',
  },
  playwright: { transport: 'stdio', command: 'npx', args: ['-y', '@playwright/mcp@latest'] },
  'chrome-devtools': { transport: 'stdio', command: 'npx', args: ['-y', 'chrome-devtools-mcp@latest'] },
  filesystem: {
    transport: 'stdio',
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '.'],
    note: 'Usually redundant: coding agents already have scoped file tools.',
  },
};

/** @deprecated kept for 1.x consumers; use MCP_SERVERS. */
export const MCP_SERVER_STUBS = MCP_SERVERS;

/**
 * Render enabled servers for one client config format.
 * @param {'portable'|'cursor'|'gemini'|'opencode'|'vscode'} format
 * @param {string[]} ids
 */
export function renderMcpServers(format, ids) {
  /** @type {Record<string, object>} */
  const out = {};
  for (const id of ids) {
    const s = MCP_SERVERS[id];
    if (!s) continue;
    if (s.transport === 'http') {
      out[id] = {
        portable: { type: 'http', url: s.url },
        vscode: { type: 'http', url: s.url },
        cursor: { url: s.url },
        gemini: { httpUrl: s.url },
        opencode: { type: 'remote', url: s.url, enabled: true },
      }[format];
    } else {
      out[id] = {
        portable: { type: 'stdio', command: s.command, args: s.args },
        vscode: { type: 'stdio', command: s.command, args: s.args },
        cursor: { command: s.command, args: s.args },
        gemini: { command: s.command, args: s.args },
        opencode: { type: 'local', command: [s.command, ...s.args], enabled: true },
      }[format];
    }
  }
  return out;
}

/** Codex `.codex/config.toml` — every server commented out until a human enables it. */
export function renderCodexMcpToml(ids) {
  const lines = [];
  for (const id of ids) {
    const s = MCP_SERVERS[id];
    if (!s) continue;
    lines.push(`# [mcp_servers.${id.replace(/[^a-z0-9_]/gi, '_')}]`);
    if (s.transport === 'http') {
      lines.push(`# url = "${s.url}"`);
    } else {
      lines.push(`# command = "${s.command}"`);
      lines.push(`# args = [${s.args.map(a => `"${a}"`).join(', ')}]`);
    }
    lines.push('');
  }
  return lines.join('\n');
}

export function stackMcpIds(stackId) {
  const base = ['github'];
  switch (stackId) {
    case 'react':
    case 'nextjs':
    case 'react-native':
      return [...base, 'playwright', 'chrome-devtools', 'sentry'];
    case 'nodejs':
    case 'nestjs':
      return [...base, 'docker', 'postgresql', 'redis', 'playwright', 'sentry'];
    case 'python':
    case 'fastapi':
      return [...base, 'docker', 'postgresql', 'redis', 'sentry'];
    case 'java':
    case 'dotnet':
      return [...base, 'docker', 'postgresql', 'kubernetes', 'sentry'];
    default:
      return base;
  }
}

/**
 * Heuristic scan of a product repo (enhance mode).
 * @param {string} cwd
 * @param {{ existsSync: Function, readFileSync: Function }} fs
 */
export function detectRepoSignals(cwd, fs) {
  const exists = rel => fs.existsSync(path.join(cwd, rel));
  const read = rel => {
    try {
      return fs.readFileSync(path.join(cwd, rel), 'utf8');
    } catch {
      return '';
    }
  };

  const signals = {
    packageJson: exists('package.json'),
    pyproject: exists('pyproject.toml') || exists('requirements.txt'),
    dockerfile: exists('Dockerfile') || exists('docker-compose.yml') || exists('compose.yml'),
    kubernetes: exists('k8s') || exists('kubernetes') || exists('helm') || exists('Chart.yaml'),
    githubActions: exists('.github/workflows'),
    playwright: false,
    sentry: false,
    prisma: false,
    next: false,
    nest: false,
    fastapi: false,
    redis: false,
    postgres: false,
  };

  const pkg = read('package.json');
  if (pkg) {
    signals.playwright = /playwright/i.test(pkg);
    signals.sentry = /sentry/i.test(pkg);
    signals.prisma = /prisma/i.test(pkg);
    signals.next = /"next"/i.test(pkg);
    signals.nest = /@nestjs/i.test(pkg);
    signals.redis = /ioredis|"redis"/i.test(pkg);
    signals.postgres = /pg\b|postgres|prisma/i.test(pkg);
  }
  const py = read('requirements.txt') + read('pyproject.toml');
  if (py) {
    signals.fastapi = /fastapi/i.test(py);
    signals.sentry = signals.sentry || /sentry/i.test(py);
    signals.redis = signals.redis || /redis/i.test(py);
    signals.postgres = signals.postgres || /psycopg|sqlalchemy|asyncpg/i.test(py);
  }

  const ids = new Set(['github']);
  if (exists('.gitlab-ci.yml')) ids.add('gitlab');
  if (exists('supabase')) ids.add('supabase');
  if (signals.dockerfile) ids.add('docker');
  if (signals.kubernetes) ids.add('kubernetes');
  if (signals.playwright || signals.next) ids.add('playwright');
  if (signals.next || signals.playwright) ids.add('chrome-devtools');
  if (signals.sentry) ids.add('sentry');
  if (signals.postgres || signals.prisma) ids.add('postgresql');
  if (signals.redis) ids.add('redis');
  if (signals.githubActions) ids.add('github');

  return { signals, recommendedMcpIds: [...ids] };
}

export function buildRecommendedMcpConfig(ids) {
  /** @type {Record<string, object>} */
  const recommended = {};
  for (const id of ids) {
    if (MCP_SERVERS[id]) recommended[id] = MCP_SERVERS[id];
  }
  return recommended;
}
