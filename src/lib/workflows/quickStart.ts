import { STACKS } from './catalog';
import type { QuickStartRecommendation, UserProfile } from './types';

const STACK_SKILL: Record<string, string> = {
  react: '03-skill-engineering/skills/react.skill',
  nextjs: '03-skill-engineering/skills/nextjs.skill',
  'react-native': 'cookbook/react-native/skills/react-native.skill',
  nodejs: '03-skill-engineering/skills/node.skill',
  nestjs: '03-skill-engineering/skills/node.skill',
  python: '03-skill-engineering/skills/python.skill',
  fastapi: '03-skill-engineering/skills/python.skill',
  java: '03-skill-engineering/skills/java.skill',
  dotnet: '03-skill-engineering/skills/dotnet.skill',
};

const IDE_SETUP: Record<string, { title: string; href: string }> = {
  cursor: { title: 'Cursor — project rules & context', href: '/docs/handbook/how-to-give-context' },
  copilot: { title: 'GitHub Copilot — instructions file', href: '/docs/handbook/how-to-give-context' },
  'claude-code': { title: 'Claude Code — CLAUDE.md baseline', href: '/docs/02-context-engineering/templates/CLAUDE.md.template' },
  vscode: { title: 'VS Code — extensions & context', href: '/docs/handbook/how-to-give-context' },
  windsurf: { title: 'Windsurf — flow rules', href: '/docs/handbook/how-to-give-context' },
  continue: { title: 'Continue — config & skills', href: '/docs/03-skill-engineering/README' },
};

const ROLE_WORKFLOW: Record<string, string> = {
  'product-manager': 'idea',
  architect: 'architecture',
  frontend: 'ai-coding',
  backend: 'ai-coding',
  fullstack: 'implementation-planning',
  qa: 'testing',
  devops: 'devops',
  'engineering-manager': 'project-kickoff',
  'ai-engineer': 'implementation-planning',
};

const GOAL_ENTRY: Record<string, { href: string; title: string }> = {
  'new-product': { title: 'Start at Idea → Kickoff', href: '/workflows/idea' },
  'existing-codebase': { title: 'Context pattern for onboarding', href: '/docs/patterns/context-pattern/README' },
  'legacy-modernize': { title: 'Legacy modernization pattern', href: '/docs/patterns/legacy-modernization-pattern/README' },
  learn: { title: 'Practitioner handbook', href: '/docs/handbook/README' },
  'browse-standards': { title: 'Standards portal', href: '/portal' },
  'explore-examples': { title: 'Cookbook index', href: '/docs/cookbook/README' },
};

const MATURITY_EXTRAS: Record<string, QuickStartRecommendation[]> = {
  beginner: [
    { title: 'Skills vs prompts vs agents', description: 'Pick the right artifact type first', href: '/docs/handbook/skills-vs-prompts-vs-agents', kind: 'doc' },
    { title: 'Planner pattern', description: 'Your first safe multi-step workflow', href: '/docs/patterns/planner-pattern/README', kind: 'workflow' },
  ],
  intermediate: [
    { title: 'Hooks in practice', description: 'Wire pre-code and post-code gates', href: '/docs/handbook/hooks-in-practice', kind: 'hook' },
    { title: 'Evals as quality gates', description: 'Block bad releases automatically', href: '/docs/handbook/evals-as-quality-gates', kind: 'checklist' },
  ],
  advanced: [
    { title: 'MCP when and how', description: 'Add tools without losing control', href: '/docs/handbook/mcp-when-and-how', kind: 'mcp' },
    { title: 'Agent engineering', description: 'Termination, budgets, delegation', href: '/docs/04-agent-engineering/README', kind: 'agent' },
  ],
  enterprise: [
    { title: 'AI migration bible path', description: 'Org pilot → team harness → production gate → SoA', href: '/docs/handbook/ai-migration-bible-path', kind: 'workflow' },
    { title: 'Enterprise pattern', description: 'Governance at org scale', href: '/docs/patterns/enterprise-pattern/README', kind: 'workflow' },
    { title: 'Standards & SoA', description: 'Normative controls portal', href: '/portal', kind: 'doc' },
  ],
};

export function buildQuickStart(profile: UserProfile): QuickStartRecommendation[] {
  const stackMeta = STACKS.find(s => s.id === profile.stack);
  const items: QuickStartRecommendation[] = [];

  const goalEntry = GOAL_ENTRY[profile.goal];
  if (goalEntry) {
    items.push({ title: goalEntry.title, description: 'Primary path for your goal', href: goalEntry.href, kind: 'workflow' });
  }

  const ide = IDE_SETUP[profile.ide];
  if (ide) {
    items.push({ title: ide.title, description: 'IDE setup from AIES templates', href: ide.href, kind: 'install' });
  }

  const skillSlug = STACK_SKILL[profile.stack];
  if (skillSlug) {
    items.push({
      title: `${stackMeta?.label ?? profile.stack} skill`,
      description: 'Stack-specific procedures for agents',
      href: `/docs/${skillSlug}`,
      kind: 'skill',
    });
  }

  if (stackMeta?.cookbookSlug) {
    items.push({
      title: `${stackMeta.label} cookbook`,
      description: 'Prompts, checklists, and debug flows',
      href: `/docs/${stackMeta.cookbookSlug}`,
      kind: 'doc',
    });
  }

  items.push(
    { title: 'Story kickoff prompt', description: 'Frame the first slice of work', href: '/docs/08-ai-sdlc/prompts/story-kickoff.prompt', kind: 'prompt' },
    { title: 'Implementation plan prompt', description: 'Plan before code', href: '/docs/08-ai-sdlc/prompts/implementation-plan.prompt', kind: 'prompt' },
    { title: 'Code review skill', description: 'Structured PR review procedure', href: '/docs/03-skill-engineering/skills/code-review.skill', kind: 'skill' },
    { title: 'PR review with AI', description: 'Human-accountable review playbook', href: '/docs/handbook/pr-review-with-ai', kind: 'doc' },
    { title: 'Debug skill', description: 'Systematic troubleshooting', href: '/docs/03-skill-engineering/skills/debug.skill', kind: 'skill' },
    { title: 'DevOps skill', description: 'Pipeline and release discipline', href: '/docs/03-skill-engineering/skills/devops.skill', kind: 'skill' },
    { title: 'Hooks README', description: 'agentHooks baseline (shell hooks)', href: '/docs/04-agent-engineering/hooks/README', kind: 'hook' },
    { title: 'MCP catalog', description: 'Pick integrations deliberately', href: '/docs/mcps/README', kind: 'mcp' },
    { title: 'Reviewer agent pattern', description: 'Human-accountable review', href: '/docs/patterns/reviewer-pattern/README', kind: 'agent' },
    { title: 'Definition of Ready', description: 'Kickoff checklist', href: '/docs/08-ai-sdlc/quality-standards/definition-of-ready', kind: 'checklist' },
    { title: 'How to set up planning', description: 'End-to-end planning workflow', href: '/docs/handbook/how-to-set-up-planning', kind: 'workflow' },
  );

  const roleSlug = ROLE_WORKFLOW[profile.role];
  if (roleSlug) {
    items.push({
      title: 'Your role workflow',
      description: 'Jump to the lifecycle stage that matches your job',
      href: `/workflows/${roleSlug}`,
      kind: 'workflow',
    });
  }

  items.push(...(MATURITY_EXTRAS[profile.maturity] ?? []));

  if (profile.model) {
    items.push({
      title: 'Model policy (kit)',
      description: 'Pin providers, IDs, and data-class rules in MODEL_POLICY.md (under your IDE folder) after install',
      href: '/docs/handbook/mcp-when-and-how',
      kind: 'doc',
    });
  }

  if (profile.dataClass === 'confidential') {
    items.push({
      title: 'MCP when and how',
      description: 'Confidential data — MCP off by default; allowlist before enabling tools',
      href: '/docs/handbook/mcp-when-and-how',
      kind: 'mcp',
    });
  }

  return items;
}

export function getPrimaryWorkflowHref(profile: UserProfile): string {
  const roleSlug = ROLE_WORKFLOW[profile.role];
  if (roleSlug) return `/workflows/${roleSlug}`;
  return GOAL_ENTRY[profile.goal]?.href ?? '/workflows';
}
