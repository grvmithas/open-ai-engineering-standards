import type { NavItem } from './navigation-types';

export type { NavItem } from './navigation-types';

/**
 * Curated handbook navigation — depth over dump.
 * Full catalog pages remain reachable via search and in-page links;
 * the sidebar shows only the reading spine organizations actually use.
 */
export const navigation: NavItem[] = [
  {
    title: 'Get started',
    slug: '_quickstart',
    icon: '⚡',
    badge: '5 min',
    href: '/start',
    children: [
      { title: '1. Onboarding', slug: '_start', href: '/start', badge: '/start' },
      { title: '2. Your kit', slug: '_quickstart-page', href: '/quickstart', badge: 'Install' },
      { title: '3. First workflow', slug: '_workflows', href: '/workflows' },
      { title: '4. How to browse', slug: 'handbook/how-to-browse', badge: 'Order' },
      { title: '5. SDLC tooling map', slug: '08-ai-sdlc/stage-tooling-map', badge: 'Tools' },
    ],
  },
  {
    title: 'AI SDLC',
    slug: '08-ai-sdlc/README',
    icon: '🔄',
    badge: 'Stages',
    children: [
      { title: 'Stage tooling map', slug: '08-ai-sdlc/stage-tooling-map', badge: 'Start' },
      { title: 'Definition of Ready', slug: '08-ai-sdlc/quality-standards/definition-of-ready' },
      { title: 'Definition of Done', slug: '08-ai-sdlc/quality-standards/definition-of-done' },
      { title: 'Story Kickoff', slug: '08-ai-sdlc/prompts/story-kickoff.prompt' },
      { title: 'Implementation Plan', slug: '08-ai-sdlc/prompts/implementation-plan.prompt' },
      { title: 'Architecture Review', slug: '08-ai-sdlc/prompts/architecture-review.prompt' },
      { title: 'Coding', slug: '08-ai-sdlc/prompts/coding.prompt' },
      { title: 'Test Generation', slug: '08-ai-sdlc/prompts/test-generation.prompt' },
      { title: 'Security Review', slug: '08-ai-sdlc/prompts/security-review.prompt' },
      { title: 'Release', slug: '08-ai-sdlc/prompts/release.prompt' },
      { title: 'Incident', slug: '08-ai-sdlc/prompts/incident.prompt' },
      { title: 'Root Cause Analysis', slug: '08-ai-sdlc/prompts/root-cause-analysis.prompt' },
      { title: 'Knowledge Capture', slug: '08-ai-sdlc/prompts/knowledge-capture.prompt' },
      { title: 'Quality Checklists', slug: 'checklists/README' },
    ],
  },
  {
    title: 'Patterns',
    slug: 'patterns/README',
    icon: '🎯',
    badge: '12',
    children: [
      { title: 'Which pattern first?', slug: 'patterns/README' },
      { title: 'Planner', slug: 'patterns/planner-pattern/README' },
      { title: 'Context', slug: 'patterns/context-pattern/README' },
      { title: 'Reviewer', slug: 'patterns/reviewer-pattern/README' },
      { title: 'Debug', slug: 'patterns/debug-pattern/README' },
      { title: 'Architecture', slug: 'patterns/architecture-pattern/README' },
      { title: 'Migration', slug: 'patterns/migration-pattern/README' },
      { title: 'Legacy Modernization', slug: 'patterns/legacy-modernization-pattern/README' },
      { title: 'Optimization', slug: 'patterns/optimization-pattern/README' },
      { title: 'Release', slug: 'patterns/release-pattern/README' },
      { title: 'Hotfix', slug: 'patterns/hotfix-pattern/README' },
      { title: 'Root Cause', slug: 'patterns/root-cause-pattern/README' },
      { title: 'Enterprise', slug: 'patterns/enterprise-pattern/README' },
    ],
  },
  {
    title: 'Practitioner handbook',
    slug: 'handbook/README',
    icon: '📘',
    badge: 'Daily',
    children: [
      { title: 'How to browse', slug: 'handbook/how-to-browse', badge: 'Order' },
      { title: 'AI migration bible path', slug: 'handbook/ai-migration-bible-path', badge: 'Org' },
      { title: 'External standards map', slug: 'handbook/external-standards-map', badge: 'OWASP/NIST' },
      { title: 'Skills vs prompts vs agents', slug: 'handbook/skills-vs-prompts-vs-agents' },
      { title: 'How to give context', slug: 'handbook/how-to-give-context' },
      { title: 'How to set up planning', slug: 'handbook/how-to-set-up-planning' },
      { title: 'Human in the loop', slug: 'handbook/human-in-the-loop' },
      { title: 'PR review with AI', slug: 'handbook/pr-review-with-ai' },
      { title: 'Evals as quality gates', slug: 'handbook/evals-as-quality-gates' },
      { title: 'Hooks in practice', slug: 'handbook/hooks-in-practice' },
      { title: 'MCP when and how', slug: 'handbook/mcp-when-and-how' },
      { title: 'Containing token waste', slug: 'handbook/containing-token-waste' },
      { title: 'AIDLC roles & evolving delivery', slug: 'handbook/aidlc-roles-and-evolving-delivery' },
    ],
  },
  {
    title: 'Foundations',
    slug: '00-foundations/README',
    icon: '🧱',
    children: [
      { title: 'The Harness Principle', slug: '00-foundations/02-the-harness-principle' },
      { title: 'LLM Failure Modes', slug: '00-foundations/04-failure-modes' },
      { title: 'XML Structured Prompts', slug: '01-prompt-engineering/patterns/xml-structured' },
      { title: 'Prompt Anti-Patterns', slug: '01-prompt-engineering/anti-patterns/prompt-anti-patterns' },
      { title: 'System Prompt Template', slug: '01-prompt-engineering/templates/system-prompt.template' },
      { title: 'CLAUDE.md Template', slug: '02-context-engineering/templates/CLAUDE.md.template' },
    ],
  },
  {
    title: 'Reference spine',
    slug: 'README',
    icon: '🚀',
    children: [
      { title: 'Principles', slug: 'principles', badge: 'Draft' },
      { title: 'Roadmap', slug: 'roadmap' },
      { title: 'Handbook overview', slug: 'handbook/README', badge: 'Daily' },
      { title: 'Contributing', slug: 'CONTRIBUTING' },
      { title: 'Changelog', slug: 'CHANGELOG' },
    ],
  },
  {
    title: 'Ops & assurance',
    slug: '07-llmops/README',
    icon: '⚙️',
    children: [
      { title: 'Evaluation frameworks', slug: '07-llmops/evaluation/framework-selection' },
      { title: 'LLM-as-Judge', slug: '07-llmops/evaluation/llm-as-judge' },
      { title: 'Tracing', slug: '07-llmops/observability/tracing' },
      { title: 'Hooks overview', slug: '04-agent-engineering/hooks/README' },
      { title: 'Coder agent', slug: '04-agent-engineering/agents/coder.agent' },
      { title: 'Multi-agent systems', slug: '05-multi-agent-systems/README' },
      { title: 'Memory & knowledge', slug: '06-memory-knowledge/README' },
      { title: 'Standards Portal', slug: 'standard/README' },
      { title: 'External standards map', slug: 'handbook/external-standards-map' },
      { title: 'Crosswalks', slug: 'standard/crosswalks/README' },
      { title: 'EU AI Act map', slug: 'standard/crosswalks/eu-ai-act' },
    ],
  },
  {
    title: 'Cookbook',
    slug: 'cookbook/README',
    icon: '🍳',
    children: [
      { title: 'React', slug: 'cookbook/react/README', badge: 'Kit' },
      { title: 'Next.js', slug: 'cookbook/nextjs/README', badge: 'Kit' },
      { title: 'Node.js', slug: 'cookbook/node/README', badge: 'Kit' },
      { title: 'Python', slug: 'cookbook/python/README', badge: 'Kit' },
      { title: 'Java', slug: 'cookbook/java/README', badge: 'Kit' },
      { title: '.NET', slug: 'cookbook/dotnet/README', badge: 'Kit' },
      { title: 'React Native', slug: 'cookbook/react-native/README', badge: 'Kit' },
      { title: 'PostgreSQL', slug: 'cookbook/postgres/README' },
      { title: 'Redis', slug: 'cookbook/redis/README' },
      { title: 'MongoDB', slug: 'cookbook/mongo/README' },
      { title: 'Kubernetes', slug: 'cookbook/kubernetes/README' },
      { title: 'Docker', slug: 'cookbook/docker/README' },
      { title: 'Azure', slug: 'cookbook/azure/README' },
      { title: 'AWS', slug: 'cookbook/aws/README' },
      { title: 'GraphQL', slug: 'cookbook/graphql/README' },
      { title: 'Microfrontends', slug: 'cookbook/microfrontends/README' },
      { title: 'Performance', slug: 'cookbook/performance/README' },
      { title: 'Accessibility', slug: 'cookbook/accessibility/README' },
      { title: 'All cookbooks →', slug: 'cookbook/README' },
    ],
  },
  {
    title: 'Libraries & org',
    slug: 'resources/README',
    icon: '📚',
    children: [
      { title: 'Skills catalog', slug: '03-skill-engineering/README' },
      { title: 'Agents catalog', slug: '04-agent-engineering/README' },
      { title: 'MCP catalog', slug: 'mcps/README' },
      { title: 'GitHub MCP', slug: 'mcps/version-control/github.mcp' },
      { title: 'Enterprise AI', slug: '09-enterprise-ai/README' },
      { title: 'Org playbook', slug: '10-ai-org-playbook/README' },
      { title: 'Resources', slug: 'resources/README' },
    ],
  },
];

export function flattenNav(items: NavItem[]): NavItem[] {
  return items.reduce<NavItem[]>((acc, item) => {
    acc.push(item);
    if (item.children) acc.push(...flattenNav(item.children));
    return acc;
  }, []);
}

export function findNavItem(slug: string): NavItem | undefined {
  return flattenNav(navigation).find(item => item.slug === slug);
}

export function getPrevNext(slug: string): { prev?: NavItem; next?: NavItem } {
  const flat = flattenNav(navigation).filter(
    (item, index, items) => items.findIndex(candidate => candidate.slug === item.slug) === index,
  );
  const idx = flat.findIndex(item => item.slug === slug);
  return {
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}

/** Pattern cards for the mega menu — README only, not 13 components. */
export const patternCatalog: Array<{
  title: string;
  slug: string;
  outcome: string;
}> = [
  { title: 'Planner', slug: 'patterns/planner-pattern/README', outcome: 'Decision-complete execution contracts' },
  { title: 'Reviewer', slug: 'patterns/reviewer-pattern/README', outcome: 'Severity-calibrated defect findings' },
  { title: 'Context', slug: 'patterns/context-pattern/README', outcome: 'Minimal high-signal packages' },
  { title: 'Debug', slug: 'patterns/debug-pattern/README', outcome: 'Hypothesis-driven defect isolation' },
  { title: 'Migration', slug: 'patterns/migration-pattern/README', outcome: 'Safe data/service transitions' },
  { title: 'Legacy Modernization', slug: 'patterns/legacy-modernization-pattern/README', outcome: 'Incremental strangler seams' },
  { title: 'Architecture', slug: 'patterns/architecture-pattern/README', outcome: 'Scenario-governed design choices' },
  { title: 'Optimization', slug: 'patterns/optimization-pattern/README', outcome: 'Profile-guided improvement' },
  { title: 'Enterprise', slug: 'patterns/enterprise-pattern/README', outcome: 'Governed multi-tenant AI' },
  { title: 'Release', slug: 'patterns/release-pattern/README', outcome: 'Progressive exposure with abort' },
  { title: 'Hotfix', slug: 'patterns/hotfix-pattern/README', outcome: 'Smallest reversible containment' },
  { title: 'Root Cause', slug: 'patterns/root-cause-pattern/README', outcome: 'Evidence-bound incident learning' },
];
