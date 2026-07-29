import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import AppHeader from '@/components/AppHeader';
import PatternsMegaMenu from '@/components/PatternsMegaMenu';
import {
  PRODUCT_NAME,
  PRODUCT_SHORT,
  PRODUCT_TAGLINE,
  RELEASE_STATUS,
  RELEASE_STATUS_NOTE,
  REPOSITORY_URL,
  SITE_VERSION,
} from '@/lib/site';
import { DEFAULT_DESCRIPTION, SEO_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
  description: DEFAULT_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  alternates: { canonical: '/' },
  openGraph: {
    title: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    description: DEFAULT_DESCRIPTION,
    url: '/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PRODUCT_SHORT} — ${PRODUCT_NAME}`,
    description: PRODUCT_TAGLINE,
  },
};

const CAPABILITIES = [
  { title: 'AI SDLC / AIDLC', desc: 'Stage gates, plans, HITL, and production prompts', href: '/docs/08-ai-sdlc/README' },
  { title: 'Prompt engineering', desc: 'Structured prompts, anti-patterns, templates', href: '/docs/01-prompt-engineering/README' },
  { title: 'Context engineering', desc: 'Minimal high-signal packages, progressive disclosure', href: '/docs/handbook/how-to-give-context' },
  { title: 'Skills & agents', desc: 'Procedures, tool-bounded actors, termination', href: '/docs/handbook/skills-vs-prompts-vs-agents' },
  { title: 'Patterns', desc: 'Planner, reviewer, release, hotfix, and more', href: '/docs/patterns/README' },
  { title: 'Memory & knowledge', desc: 'Hybrid RAG, lifecycle, poisoning defenses', href: '/docs/06-memory-knowledge/README' },
  { title: 'MCP integrations', desc: 'When to add tools — and how not to', href: '/docs/handbook/mcp-when-and-how' },
  { title: 'Evaluation & LLMOps', desc: 'Gates, judges, tracing, cost discipline', href: '/docs/handbook/evals-as-quality-gates' },
  { title: 'Governance', desc: 'Enterprise controls, evidence, SoA semantics', href: '/docs/standard/README' },
  { title: 'Org playbook', desc: 'Roles, operating model, assurance culture', href: '/docs/10-ai-org-playbook/README' },
];

const PRINCIPLES = [
  'Human first',
  'AI assisted',
  'Reproducible',
  'Observable',
  'Testable',
  'Deterministic where it matters',
  'Vendor neutral',
  'Secure by default',
  'Context rich, noise poor',
  'Documentation driven',
];

const ROADMAP = [
  { ver: 'A1', title: 'Corpus publish — prompts, skills, MCP, evals, AIDLC, patterns', state: 'done' },
  { ver: 'A2', title: 'Packaging & discoverability for external contributors', state: 'current' },
  { ver: 'A3', title: 'External pilots with published evidence notes', state: 'next' },
  { ver: 'A4', title: 'Shared governance + non-steward RFC reviewers', state: 'planned' },
  { ver: 'A5', title: 'Inter-assessor SoA reliability notes', state: 'planned' },
  { ver: 'S1', title: 'Community-standard claim (adoption earned)', state: 'future' },
];

const navLink: CSSProperties = {
  padding: '0.4rem 0.75rem',
  borderRadius: 6,
  color: 'var(--shell-muted)',
  fontSize: '0.85rem',
  textDecoration: 'none',
  fontWeight: 500,
};

const paperCard: CSSProperties = {
  background: 'var(--paper)',
  color: 'var(--ink)',
  border: '1px solid var(--paper-border)',
  borderRadius: 12,
  boxShadow: 'var(--shadow-sm)',
};

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--shell)] text-[var(--shell-text)]">
      <AppHeader />

      {/* Hero — inverse band for contrast in both themes */}
      <section className="hero-band relative overflow-hidden border-b border-[var(--inverse-border)]">
        <div className="hero-band-grid pointer-events-none absolute inset-0" aria-hidden />
        <div className="hero-band-glow pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center md:px-6 lg:py-24">
          <p className="inline-block rounded-full border border-[var(--inverse-border)] bg-white/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--inverse-accent)] mb-5">
            Community · Vendor Neutral · Working Standard
          </p>
          <h1 className="text-3xl font-black tracking-tight text-[var(--inverse-text)] sm:text-5xl lg:text-6xl mb-4">
            {PRODUCT_NAME}
          </h1>
          <p className="mx-auto max-w-2xl text-base text-[var(--inverse-muted)] sm:text-xl leading-relaxed mb-3">
            {PRODUCT_TAGLINE}
          </p>
          <p className="mx-auto max-w-xl text-xs text-[var(--inverse-muted)]/90 sm:text-sm leading-relaxed mb-8">
            {RELEASE_STATUS_NOTE}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/quickstart"
              className="cta-solid rounded-xl bg-[var(--accent)] px-6 py-3.5 text-sm font-bold text-[var(--on-accent)] shadow-lg transition-all duration-200 hover:bg-[var(--accent-hover)] hover:shadow-xl hover:-translate-y-0.5"
            >
              Quickstart Guide →
            </Link>
            <Link
              href="/docs/README"
              className="rounded-xl border border-[var(--inverse-border)] bg-white/5 px-6 py-3.5 text-sm font-semibold text-[var(--inverse-text)] backdrop-blur-sm transition-all duration-200 hover:border-[var(--inverse-accent)] hover:bg-white/10 hover:-translate-y-0.5"
            >
              Read Docs
            </Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--inverse-border)] bg-transparent px-6 py-3.5 text-sm font-semibold text-[var(--inverse-accent)] transition-all duration-200 hover:bg-white/5 hover:-translate-y-0.5"
            >
              GitHub
            </a>
          </div>

          <p className="mt-7 text-xs text-[var(--inverse-muted)]">
            Maintained in the open. Attribution:{' '}
            <Link href="/about" className="font-medium text-[var(--inverse-accent)] hover:underline">project steward</Link>
            {' '}· open standard specification.
          </p>
        </div>
      </section>

      {/* Featured gateway cards — light paper on dark / dark band feel */}
      <section className="section-band border-b px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="text-xl font-extrabold tracking-tight text-[var(--inverse-text)] sm:text-2xl">
              Get Started with Documentation
            </h2>
            <p className="mt-1 text-sm text-[var(--inverse-muted)]">
              Choose your entry point into the AI Engineering Standard.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 1: Quickstart */}
            <Link
              href="/quickstart"
              className="tile-card group flex flex-col justify-between rounded-2xl p-6 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-500">
                    ⚡ Quickstart
                  </span>
                  <span className="text-xs font-mono text-[var(--ink-muted)]">2 min setup</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  Quickstart Guide
                </h3>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-4">
                  Rapidly install IDE-native skills, prompt standards, and stage gate configurations into your project harness with `npx`.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                Start Quickstart →
              </div>
            </Link>

            {/* Card 2: Read Docs */}
            <Link
              href="/docs/README"
              className="tile-card group flex flex-col justify-between rounded-2xl p-6 md:p-8"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-500">
                    📖 Read Docs
                  </span>
                  <span className="text-xs font-mono text-[var(--ink-muted)]">Full sidebar</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
                  Read Docs
                </h3>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-4">
                  Explore full interactive documentation with sidepanel navigation covering AIDLC, Evals, Prompt Engineering, MCP, and Org Playbooks.
                </p>
              </div>
              <div className="flex items-center text-xs font-bold text-[var(--accent)] group-hover:translate-x-1 transition-transform">
                Read Docs →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Core Mission & Manifesto Section (Prominently Featured) */}
      <section className="border-b border-[var(--paper-border)] bg-gradient-to-r from-[var(--paper)] via-[var(--accent-soft)] to-[var(--paper)] px-4 py-14 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="tile-card relative overflow-hidden rounded-3xl border-2 border-[var(--accent-border)] bg-[var(--paper)] p-8 md:p-12 shadow-xl">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 h-36 w-36 rounded-full bg-[var(--accent)]/10 blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[var(--accent)]">
                  ⚡ Core Mission & Justification
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-[var(--ink)] sm:text-4xl leading-tight mb-6">
                Why AI engineering needs a standard
              </h2>

              <blockquote className="border-l-4 border-[var(--accent)] pl-5 md:pl-6 my-4">
                <p className="text-base font-medium text-[var(--ink)] sm:text-lg leading-relaxed mb-4">
                  Teams invent private dialects for prompts, agents, evals, and approvals. The result is unreproducible delivery,
                  silent security gaps, and tools that cannot interoperate.{' '}
                  <strong className="font-extrabold text-[var(--accent)] underline decoration-[var(--accent-border)]">
                    AIES exists so organizations share one vocabulary, one set of gates, and one way to evidence production readiness
                  </strong>{' '}
                  — without locking to a single model vendor.
                </p>
                <p className="text-sm font-semibold text-[var(--ink-secondary)] italic">
                  &ldquo;Trust comes from documentation, versioning, and community critique — not from declaring &lsquo;the standard&rsquo; on day one.&rdquo;
                </p>
              </blockquote>

              <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-[var(--paper-border)]">
                <Link
                  href="/docs/principles"
                  className="cta-solid inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-extrabold text-[var(--on-accent)] shadow-md transition hover:bg-[var(--accent-hover)] hover:shadow-lg"
                >
                  Explore Standard Principles →
                </Link>
                <Link
                  href="/docs/handbook/README"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-5 py-2.5 text-xs font-bold text-[var(--ink)] transition hover:border-[var(--accent)]"
                >
                  Read Practitioner Handbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="bg-[var(--paper-subtle)] px-4 py-12 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl mb-1">
              Standards by capability
            </h2>
            <p className="text-xs text-[var(--ink-muted)]">
              Organized by engineering concern — not by a laundry list of frameworks.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {CAPABILITIES.map(item => (
              <Link
                key={item.title}
                href={item.href}
                className="tile-card group block rounded-xl p-4 text-decoration-none"
              >
                <div className="text-xs font-bold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-1">
                  {item.title}
                </div>
                <div className="text-[11px] text-[var(--ink-muted)] leading-normal">
                  {item.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Principles */}
      <section className="border-t border-b border-[var(--paper-border)] bg-[var(--paper)] px-4 py-10 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl">
                Engineering principles
              </h2>
              <p className="text-xs text-[var(--ink-muted)] mt-1">
                The constitution every AIES artifact should obey.
              </p>
            </div>
            <Link href="/docs/principles" className="text-xs font-bold text-[var(--accent)] hover:underline">
              Full principles →
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRINCIPLES.map(name => (
              <span
                key={name}
                className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--primary-dark)]"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contributing — inverse band */}
      <section className="section-band border-t px-4 py-12 md:px-6">
        <div className="tile-card mx-auto max-w-3xl rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-8 text-center shadow-lg">
          <h2 className="text-lg font-bold text-[var(--ink)] mb-2">Community & Contributing</h2>
          <p className="text-xs text-[var(--ink-muted)] mb-6 leading-relaxed">
            AIES improves through issues, PRs, pilot evidence, and disagreement on the record.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/CONTRIBUTING"
              className="cta-solid rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-bold text-[var(--on-accent)] transition hover:bg-[var(--accent-hover)]"
            >
              Contributing guide
            </Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[var(--paper-border)] bg-[var(--paper)] px-4 py-2 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--accent)]"
            >
              GitHub
            </a>
            <Link
              href="/portal"
              className="rounded-lg border border-[var(--accent-border)] bg-[var(--accent-soft)] px-4 py-2 text-xs font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
            >
              Standards portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--shell-border)] bg-[var(--shell)] px-4 py-8 text-center text-xs text-[var(--shell-muted)] md:px-6">
        <p>
          <strong className="text-[var(--shell-text)]">{PRODUCT_SHORT}</strong>
          {' '}— {PRODUCT_NAME} · {RELEASE_STATUS} · site v{SITE_VERSION}
        </p>
        <p className="mx-auto mt-2 max-w-lg text-[11px] leading-relaxed">
          Not affiliated with OpenAI, Anthropic, or any model vendor. “Open” means open-source and community-governed.
        </p>
        <p className="mt-4 flex flex-wrap justify-center gap-4">
          <Link href="/docs/principles" className="hover:text-[var(--shell-text)]">Principles</Link>
          <Link href="/docs/roadmap" className="hover:text-[var(--shell-text)]">Roadmap</Link>
          <Link href="/docs/CONTRIBUTING" className="hover:text-[var(--shell-text)]">Contribute</Link>
          <Link href="/about" className="hover:text-[var(--shell-text)]">About</Link>
        </p>
      </footer>
    </main>
  );
}
