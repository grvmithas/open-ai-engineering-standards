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

/** Runnable stubs — copy into mcpServers only after human approval + secrets. */
export const MCP_SERVER_STUBS = {
  github: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-github'],
    env: { GITHUB_PERSONAL_ACCESS_TOKEN: '${GITHUB_TOKEN}' },
  },
  filesystem: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-filesystem', '${WORKSPACE_ROOT}'],
  },
  docker: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-docker'],
  },
  postgresql: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-postgres'],
    env: { POSTGRES_CONNECTION_STRING: '${DATABASE_URL}' },
  },
  redis: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-redis'],
    env: { REDIS_URL: '${REDIS_URL}' },
  },
  playwright: {
    command: 'npx',
    args: ['-y', '@playwright/mcp@latest'],
  },
  sentry: {
    command: 'npx',
    args: ['-y', '@sentry/mcp-server'],
    env: { SENTRY_AUTH_TOKEN: '${SENTRY_AUTH_TOKEN}' },
  },
  linear: {
    command: 'npx',
    args: ['-y', 'mcp-linear'],
    env: { LINEAR_API_KEY: '${LINEAR_API_KEY}' },
  },
  slack: {
    command: 'npx',
    args: ['-y', '@modelcontextprotocol/server-slack'],
    env: { SLACK_BOT_TOKEN: '${SLACK_BOT_TOKEN}' },
  },
};

export function stackMcpIds(stackId) {
  const base = ['github', 'filesystem'];
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

  const ids = new Set(['github', 'filesystem']);
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
    if (MCP_SERVER_STUBS[id]) recommended[id] = MCP_SERVER_STUBS[id];
  }
  return recommended;
}
