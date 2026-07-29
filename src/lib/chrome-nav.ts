/** Shared primary chrome — keep homepage and AppHeader identical. */
export const CHROME_NAV = [
  { href: '/start', label: '> /start', mono: true },
  { href: '/workflows', label: 'Workflows' },
  { href: '/docs/patterns/README', label: 'Patterns', mega: 'patterns' as const },
  { href: '/docs/handbook/README', label: 'Handbook' },
  { href: '/portal', label: 'Portal' },
] as const;

/** Post-onboard IA: Learn → Operate → Assure */
export const JOURNEY_LAYERS = [
  {
    id: 'learn',
    title: 'Learn',
    blurb: 'Shared vocabulary and runnable illustrations',
    items: [
      { title: 'How to browse', desc: 'Logical order: kit → workflow → SDLC tools → patterns', href: '/docs/handbook/how-to-browse' },
      { title: 'Practitioner handbook', desc: 'Day-to-day operating manual', href: '/docs/handbook/README' },
      { title: 'SDLC stage tooling', desc: 'Prompts, skills, patterns per major stage', href: '/docs/08-ai-sdlc/stage-tooling-map' },
      { title: 'Pattern library', desc: '12 Mermaid envelopes with HITL gates', href: '/docs/patterns/README' },
    ],
  },
  {
    id: 'operate',
    title: 'Operate',
    blurb: 'Install the harness, then run the lifecycle',
    items: [
      { title: 'Lifecycle workflows', desc: 'Idea → production, stage by stage', href: '/workflows' },
      { title: 'Your kit', desc: 'IDE-native prompts, skills, and stack cookbook after /start', href: '/quickstart' },
      { title: 'Hooks in practice', desc: 'Fail-closed gates before bad artifacts leave', href: '/docs/handbook/hooks-in-practice' },
    ],
  },
  {
    id: 'assure',
    title: 'Assure',
    blurb: 'Evidence for governance — not slide decks',
    items: [
      { title: 'Standards portal', desc: 'Normative controls and SoA evidence paths', href: '/portal' },
      { title: 'External standards map', desc: 'OWASP · NIST · ISO · SLSA · EU AI Act (evidence only)', href: '/docs/handbook/external-standards-map' },
      { title: 'EU AI Act engineering map', desc: 'Indicative evidence — not conformity / CE', href: '/docs/standard/crosswalks/eu-ai-act' },
      { title: 'Crosswalks index', desc: 'All framework maps in one place', href: '/docs/standard/crosswalks/README' },
      { title: 'AI migration bible path', desc: 'Org pilot → harness → production gate → SoA', href: '/docs/handbook/ai-migration-bible-path' },
    ],
  },
] as const;

/** Featured patterns after onboard — visual USP */
export const FEATURED_PATTERNS = [
  {
    title: 'Planner',
    outcome: 'Decision-complete execution contracts before multi-file work',
    href: '/docs/patterns/planner-pattern/README',
  },
  {
    title: 'Context',
    outcome: 'Minimal high-signal packages agents can actually use',
    href: '/docs/patterns/context-pattern/README',
  },
  {
    title: 'Reviewer',
    outcome: 'Severity-calibrated findings humans still own',
    href: '/docs/patterns/reviewer-pattern/README',
  },
] as const;

export const KIT_CLI_COMMAND = 'npx @grvmithas/create-aies-kit';
