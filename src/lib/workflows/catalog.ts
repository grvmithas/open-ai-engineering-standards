import type { AiMaturity, DataClass, ModelProvider, TechStack, UserGoal, UserIde, UserRole } from './types';

export const GOALS: Array<{ id: UserGoal; label: string; hint: string }> = [
  { id: 'new-product', label: 'Build a new product', hint: 'Greenfield AI-assisted delivery from idea to production' },
  { id: 'existing-codebase', label: 'Join an existing codebase', hint: 'Onboard fast with context, patterns, and safe first PR' },
  { id: 'legacy-modernize', label: 'Modernize legacy software', hint: 'Migration, strangler patterns, and controlled refactors' },
  { id: 'learn', label: 'Learn AI Engineering', hint: 'Handbook-first path through prompts, agents, and evals' },
  { id: 'browse-standards', label: 'Browse standards', hint: 'Normative controls, portal, and governance' },
  { id: 'explore-examples', label: 'Explore examples', hint: 'Cookbooks, patterns, and starter workflows' },
];

export const ROLES: Array<{ id: UserRole; label: string }> = [
  { id: 'product-manager', label: 'Product Manager' },
  { id: 'architect', label: 'Architect' },
  { id: 'frontend', label: 'Frontend Developer' },
  { id: 'backend', label: 'Backend Developer' },
  { id: 'fullstack', label: 'Full Stack Engineer' },
  { id: 'qa', label: 'QA Engineer' },
  { id: 'devops', label: 'DevOps Engineer' },
  { id: 'engineering-manager', label: 'Engineering Manager' },
  { id: 'ai-engineer', label: 'AI Engineer' },
];

export const MATURITIES: Array<{ id: AiMaturity; label: string; hint: string }> = [
  { id: 'beginner', label: 'Beginner', hint: 'Docs reading path — install is always complete' },
  { id: 'intermediate', label: 'Intermediate', hint: 'Docs reading path — install is always complete' },
  { id: 'advanced', label: 'Advanced', hint: 'Docs reading path — install is always complete' },
  { id: 'enterprise', label: 'Enterprise transformation', hint: 'Docs reading path — install is always complete' },
];

export const IDES: Array<{ id: UserIde; label: string }> = [
  { id: 'cursor', label: 'Cursor' },
  { id: 'claude-code', label: 'Claude Code' },
  { id: 'copilot', label: 'GitHub Copilot (VS Code / CLI / cloud agent)' },
  { id: 'codex', label: 'OpenAI Codex' },
  { id: 'gemini-cli', label: 'Gemini CLI' },
  { id: 'kiro', label: 'Kiro' },
  { id: 'windsurf', label: 'Devin Desktop (Windsurf)' },
  { id: 'opencode', label: 'opencode' },
  { id: 'continue', label: 'Continue' },
];

const IDE_ALIASES: Record<string, UserIde> = {
  vscode: 'copilot',
  devin: 'windsurf',
  gemini: 'gemini-cli',
  claude: 'claude-code',
};

/** Maps retired/alias ids (old links, saved profiles) onto a supported target; null when unknown. */
export function normalizeUserIde(value: string | null | undefined): UserIde | null {
  if (!value) return null;
  const id = IDE_ALIASES[value] ?? value;
  return IDES.some(i => i.id === id) ? (id as UserIde) : null;
}

export const MODELS: Array<{ id: ModelProvider; label: string; hint: string }> = [
  { id: 'claude', label: 'Claude (Anthropic)', hint: 'Pin model IDs; strong for coding agents' },
  { id: 'gpt', label: 'GPT (OpenAI)', hint: 'Pin model IDs; org gateway recommended' },
  { id: 'gemini', label: 'Gemini (Google)', hint: 'Pin model IDs; watch multimodal data paths' },
  { id: 'multi', label: 'Multi-model / gateway', hint: 'Abstract providers; route by task' },
  { id: 'local', label: 'Local / open-weight', hint: 'Offline evals; no assumed cloud tools' },
  { id: 'undecided', label: 'Undecided', hint: 'Least privilege until you pick a primary' },
];

export const DATA_CLASSES: Array<{ id: DataClass; label: string; hint: string }> = [
  { id: 'public', label: 'Public', hint: 'Public content — still ban secrets in prompts' },
  { id: 'internal', label: 'Internal', hint: 'Org-only data — approved providers, redact PII' },
  { id: 'confidential', label: 'Confidential / regulated', hint: 'Private endpoints; MCP off by default; strict HITL' },
];

export const STACKS: Array<{ id: TechStack; label: string; cookbookSlug?: string }> = [
  { id: 'react', label: 'React', cookbookSlug: 'cookbook/react/README' },
  { id: 'nextjs', label: 'Next.js', cookbookSlug: 'cookbook/nextjs/README' },
  { id: 'react-native', label: 'React Native', cookbookSlug: 'cookbook/react-native/README' },
  { id: 'nodejs', label: 'Node.js', cookbookSlug: 'cookbook/node/README' },
  { id: 'nestjs', label: 'NestJS', cookbookSlug: 'cookbook/node/README' },
  { id: 'python', label: 'Python', cookbookSlug: 'cookbook/python/README' },
  { id: 'fastapi', label: 'FastAPI', cookbookSlug: 'cookbook/python/README' },
  { id: 'java', label: 'Java', cookbookSlug: 'cookbook/java/README' },
  { id: 'dotnet', label: '.NET', cookbookSlug: 'cookbook/dotnet/README' },
];

export const DOC_ARCHITECTURE = [
  { title: 'Onboarding', href: '/start', desc: 'Profile in 5 minutes — goal, role, stack, model' },
  { title: 'Your kit', href: '/quickstart', desc: 'IDE-native install (Cursor/.github/.claude) after onboarding' },
  { title: 'Workflows', href: '/workflows', desc: 'Lifecycle from idea to production' },
  { title: 'Patterns', href: '/docs/patterns/README', desc: '12 runnable Mermaid envelopes' },
  { title: 'Handbook', href: '/docs/handbook/README', desc: 'Daily practitioner playbooks' },
  { title: 'Migration path', href: '/docs/handbook/ai-migration-bible-path', desc: 'Org pilot → harness → gate → SoA' },
  { title: 'Standards', href: '/portal', desc: 'Normative controls & assurance' },
  { title: 'AIDLC', href: '/docs/08-ai-sdlc/README', desc: 'Roles, gates, and SDLC prompts' },
  { title: 'Examples', href: '/docs/cookbook/README', desc: 'Stack-specific cookbooks' },
  { title: 'Contribute', href: '/docs/CONTRIBUTING', desc: 'PRs, pilots, and critique' },
] as const;
