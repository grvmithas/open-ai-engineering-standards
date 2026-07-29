import { DOC_ARCHITECTURE, IDES, STACKS } from './catalog';
import { LIFECYCLE_WORKFLOWS } from './lifecycle';
import type { CommandEntry } from './types';

export const COMMAND_ACTIONS: CommandEntry[] = [
  { id: 'start', title: '/start — Onboarding (Step 1)', subtitle: 'Goal → role → stack → Your kit', href: '/start', keywords: ['start', 'onboard', 'begin', 'setup', 'quick'], group: 'action' },
  { id: 'quickstart', title: 'Your kit (Step 2)', subtitle: 'IDE-native skills, prompts, cookbook install', href: '/quickstart', keywords: ['quickstart', 'quick start', 'kit', 'install', 'my setup', 'cursor', 'copilot'], group: 'action' },
  { id: 'workflows', title: 'Lifecycle workflows (Step 3)', subtitle: 'Idea → production', href: '/workflows', keywords: ['workflow', 'lifecycle', 'sdlc', 'aidlc', 'process'], group: 'workflow' },
  { id: 'portal', title: 'Standards portal', href: '/portal', keywords: ['standard', 'governance', 'soa', 'compliance'], group: 'doc' },
  { id: 'handbook', title: 'Practitioner handbook', href: '/docs/handbook/README', keywords: ['handbook', 'guide', 'how to'], group: 'doc' },
  { id: 'migration', title: 'AI migration bible path', subtitle: 'Org pilot → harness → gate → SoA', href: '/docs/handbook/ai-migration-bible-path', keywords: ['migration', 'bible', 'org', 'pilot', 'adoption', 'rollout', 'soa'], group: 'doc' },
  { id: 'how-to-browse', title: 'How to browse AIES', subtitle: 'Kit → workflow → SDLC tools → patterns', href: '/docs/handbook/how-to-browse', keywords: ['browse', 'order', 'navigation', 'getting started', 'reading path'], group: 'doc' },
  { id: 'sdlc-tooling', title: 'AI SDLC stage tooling map', subtitle: 'Prompts · skills · patterns per stage', href: '/docs/08-ai-sdlc/stage-tooling-map', keywords: ['sdlc', 'aidlc', 'stage', 'prompt', 'skill', 'leverage', 'tools'], group: 'doc' },
  { id: 'standards-map', title: 'External standards map', subtitle: 'OWASP · NIST · ISO · SLSA · EU AI Act', href: '/docs/handbook/external-standards-map', keywords: ['owasp', 'nist', 'iso', '42001', 'slsa', 'eu ai act', 'crosswalk', 'compliance'], group: 'doc' },
  { id: 'eu-ai-act', title: 'EU AI Act engineering map', subtitle: 'Evidence only — not conformity', href: '/docs/standard/crosswalks/eu-ai-act', keywords: ['eu', 'ai act', 'conformity', 'ce', 'high-risk'], group: 'doc' },
  { id: 'crosswalks', title: 'Standards crosswalks', subtitle: 'OWASP · NIST · ISO · SLSA · protocols', href: '/docs/standard/crosswalks/README', keywords: ['crosswalk', 'owasp', 'nist', 'iso', 'otel', 'mcp'], group: 'doc' },
  { id: 'patterns', title: 'Pattern library', subtitle: '12 runnable Mermaid envelopes', href: '/docs/patterns/README', keywords: ['pattern', 'patterns', 'planner', 'reviewer', 'mermaid'], group: 'doc' },
  { id: 'prompts', title: 'AI SDLC prompts', href: '/docs/08-ai-sdlc/prompts/story-kickoff.prompt', keywords: ['prompt', 'prompts', 'template'], group: 'doc' },
  { id: 'skills', title: 'Skill engineering', href: '/docs/03-skill-engineering/README', keywords: ['skill', 'skills', 'procedure'], group: 'doc' },
  { id: 'mcp', title: 'MCP integrations', href: '/docs/mcps/README', keywords: ['mcp', 'tools', 'integration'], group: 'doc' },
  { id: 'agents', title: 'Agent engineering', href: '/docs/04-agent-engineering/README', keywords: ['agent', 'agents', 'delegation'], group: 'doc' },
  { id: 'rag', title: 'Memory & RAG', href: '/docs/06-memory-knowledge/README', keywords: ['rag', 'retrieval', 'memory', 'knowledge', 'context engineering'], group: 'doc' },
  { id: 'context', title: 'Context engineering', href: '/docs/handbook/how-to-give-context', keywords: ['context', 'context engineering', 'claude.md'], group: 'doc' },
  { id: 'evals', title: 'Evals as quality gates', href: '/docs/handbook/evals-as-quality-gates', keywords: ['eval', 'evals', 'quality', 'gate'], group: 'doc' },
  { id: 'qa', title: 'Testing workflow', href: '/workflows/testing', keywords: ['qa', 'test', 'testing', 'quality assurance'], group: 'workflow' },
  { id: 'security-wf', title: 'Security workflow', href: '/workflows/security', keywords: ['security', 'threat', 'vulnerability'], group: 'workflow' },
  { id: 'performance-wf', title: 'Performance workflow', href: '/workflows/performance', keywords: ['performance', 'perf', 'latency', 'slo'], group: 'workflow' },
  { id: 'cookbook', title: 'Cookbook examples', href: '/docs/cookbook/README', keywords: ['example', 'examples', 'cookbook', 'recipe'], group: 'doc' },
];

const workflowCommands: CommandEntry[] = LIFECYCLE_WORKFLOWS.map(w => ({
  id: `wf-${w.slug}`,
  title: w.title,
  subtitle: w.goal.slice(0, 72) + (w.goal.length > 72 ? '…' : ''),
  href: `/workflows/${w.slug}`,
  keywords: [w.slug, w.title.toLowerCase(), ...w.title.split(/\s+/).map(s => s.toLowerCase())],
  group: 'workflow' as const,
}));

const stackCommands: CommandEntry[] = STACKS.map(s => ({
  id: `stack-${s.id}`,
  title: s.label,
  subtitle: 'Stack cookbook & skills',
  href: s.cookbookSlug ? `/docs/${s.cookbookSlug}` : '/start',
  keywords: [s.id, s.label.toLowerCase(), s.label.replace('.', '').toLowerCase()],
  group: 'stack' as const,
}));

const ideCommands: CommandEntry[] = IDES.map(i => ({
  id: `ide-${i.id}`,
  title: i.label,
  subtitle: 'IDE setup via /start',
  href: '/start',
  keywords: [i.id, i.label.toLowerCase(), 'ide', 'editor'],
  group: 'ide' as const,
}));

const docArchCommands: CommandEntry[] = DOC_ARCHITECTURE.map(d => ({
  id: `arch-${d.title.toLowerCase().replace(/\s+/g, '-')}`,
  title: d.title,
  subtitle: d.desc,
  href: d.href,
  keywords: [d.title.toLowerCase(), ...d.desc.toLowerCase().split(/\s+/)],
  group: 'doc' as const,
}));

export const STATIC_COMMAND_INDEX: CommandEntry[] = [
  ...COMMAND_ACTIONS,
  ...workflowCommands,
  ...stackCommands,
  ...ideCommands,
  ...docArchCommands,
];

/** Natural language hints like "I am a React developer using Cursor" */
export function parseNaturalLanguageQuery(query: string): Partial<{
  stack: string;
  ide: string;
  action: string;
}> {
  const q = query.toLowerCase();
  const result: Partial<{ stack: string; ide: string; action: string }> = {};

  for (const s of STACKS) {
    if (q.includes(s.label.toLowerCase()) || q.includes(s.id)) {
      result.stack = s.id;
      break;
    }
  }

  for (const i of IDES) {
    if (q.includes(i.label.toLowerCase()) || q.includes(i.id.replace('-', ' '))) {
      result.ide = i.id;
      break;
    }
  }

  if (q.includes('start') || q.includes('setup') || q.includes('onboard')) {
    result.action = '/start';
  }

  return result;
}
