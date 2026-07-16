import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
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
    <main id="main-content" style={{ minHeight: '100vh', background: 'var(--shell)', color: 'var(--shell-text)' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(17, 24, 39, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--shell-border)',
        height: 'var(--header-h)',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', width: '100%', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span style={{ fontSize: '1.25rem' }} aria-hidden>⚡</span>
            <span style={{ fontWeight: 800, letterSpacing: '-0.02em', color: '#fff', fontSize: '0.95rem' }}>{PRODUCT_SHORT}</span>
            <span style={{
              padding: '0.1rem 0.45rem',
              background: 'rgba(245, 158, 11, 0.15)',
              color: '#fcd34d',
              borderRadius: 4,
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              border: '1px solid rgba(245, 158, 11, 0.35)',
            }}>
              {RELEASE_STATUS}
            </span>
          </Link>
          <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: '0.1rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link href="/docs/principles" style={navLink}>Principles</Link>
            <Link href="/docs/roadmap" style={navLink}>Roadmap</Link>
            <Link href="/docs/handbook/README" style={navLink}>Handbook</Link>
            <PatternsMegaMenu />
            <Link href="/docs/08-ai-sdlc/README" style={navLink}>AIDLC</Link>
            <Link href="/portal" style={navLink}>Portal</Link>
            <Link href="/about" style={navLink}>About</Link>
            <Link href="/docs/CONTRIBUTING" style={navLink}>Contribute</Link>
            <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer" style={{
              marginLeft: '0.35rem',
              padding: '0.4rem 0.85rem',
              borderRadius: 8,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: '0.85rem',
              textDecoration: 'none',
              fontWeight: 600,
            }}>
              Repository →
            </a>
          </nav>
        </div>
      </header>

      <section style={{
        padding: '4.5rem 2rem 3.5rem',
        borderBottom: '1px solid var(--shell-border)',
        background: 'linear-gradient(180deg, #111827 0%, var(--shell) 100%)',
      }}>
        <div style={{ maxWidth: 880, margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            display: 'inline-block',
            marginBottom: '1.1rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 999,
            background: 'rgba(37, 99, 235, 0.15)',
            color: '#93c5fd',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            border: '1px solid rgba(37, 99, 235, 0.35)',
          }}>
            Open · Community driven · Vendor neutral
          </p>
          <h1 style={{
            fontSize: 'clamp(2.3rem, 5vw, 3.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '0.9rem',
            color: '#fff',
          }}>
            {PRODUCT_NAME}
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#d1d5db', maxWidth: 640, margin: '0 auto 0.65rem', lineHeight: 1.65 }}>
            {PRODUCT_TAGLINE}
          </p>
          <p style={{ fontSize: '0.92rem', color: 'var(--shell-muted)', maxWidth: 560, margin: '0 auto 1.75rem', lineHeight: 1.6 }}>
            {RELEASE_STATUS_NOTE}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer" style={{
              padding: '0.75rem 1.5rem', borderRadius: 10, background: 'var(--accent)', color: '#fff',
              fontWeight: 700, fontSize: '0.92rem', textDecoration: 'none',
            }}>
              Open the repository →
            </a>
            <Link href="/docs/handbook/README" style={{
              padding: '0.75rem 1.5rem', borderRadius: 10, background: 'var(--paper)', color: 'var(--ink)',
              fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none', border: '1px solid var(--paper-border)',
            }}>
              Practitioner handbook
            </Link>
            <Link href="/docs/roadmap" style={{
              padding: '0.75rem 1.5rem', borderRadius: 10,
              background: 'transparent', color: '#93c5fd',
              fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none',
              border: '1px solid rgba(147, 197, 253, 0.4)',
            }}>
              View roadmap
            </Link>
          </div>
          <p style={{ marginTop: '1.75rem', fontSize: '0.8rem', color: 'var(--shell-muted)' }}>
            Maintained in the open. Attribution:{' '}
            <Link href="/about" style={{ color: '#d1d5db' }}>project steward</Link>
            {' '}· not a personal portfolio.
          </p>
        </div>
      </section>

      {/* White content band */}
      <section style={{ background: 'var(--paper-subtle)', color: 'var(--ink)', padding: '3rem 2rem', borderBottom: '1px solid var(--paper-border)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.65rem', letterSpacing: '-0.02em' }}>
            Why AI engineering needs a standard
          </h2>
          <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '0.85rem' }}>
            Teams invent private dialects for prompts, agents, evals, and approvals. The result is unreproducible delivery,
            silent security gaps, and tools that cannot interoperate. AIES exists so organizations share one vocabulary,
            one set of gates, and one way to evidence production readiness — without locking to a single model vendor.
          </p>
          <p style={{ color: 'var(--ink-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
            Trust comes from documentation, versioning, and community critique — not from declaring “the standard” on day one.
          </p>
        </div>
      </section>

      <section style={{ background: 'var(--paper-subtle)', color: 'var(--ink)', padding: '1rem 2rem 3.5rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.35rem' }}>
              Standards by capability
            </h2>
            <p style={{ color: 'var(--ink-muted)', maxWidth: 560 }}>
              Organized by engineering concern — not by a laundry list of frameworks.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
            {CAPABILITIES.map(item => (
              <Link key={item.title} href={item.href} style={{
                ...paperCard,
                display: 'block',
                padding: '1rem 1.1rem',
                textDecoration: 'none',
              }}>
                <div style={{ fontWeight: 700, color: 'var(--ink)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper)', color: 'var(--ink)', padding: '2.5rem 2rem', borderTop: '1px solid var(--paper-border)', borderBottom: '1px solid var(--paper-border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Engineering principles</h2>
              <p style={{ color: 'var(--ink-muted)', marginTop: 6 }}>The constitution every AIES artifact should obey.</p>
            </div>
            <Link href="/docs/principles" style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600 }}>
              Full principles →
            </Link>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {PRINCIPLES.map(name => (
              <span key={name} style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 999,
                border: '1px solid var(--accent-border)',
                background: 'var(--accent-soft)',
                color: 'var(--primary-dark)',
                fontSize: '0.78rem',
                fontWeight: 600,
              }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--paper-subtle)', color: 'var(--ink)', padding: '2.5rem 2rem 3rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, flexWrap: 'wrap', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>Adoption roadmap</h2>
              <p style={{ color: 'var(--ink-muted)', marginTop: 6 }}>Corpus is shipped. What remains is external adoption and shared governance.</p>
            </div>
            <Link href="/docs/roadmap" style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 600 }}>
              Detailed roadmap →
            </Link>
          </div>
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.55rem' }}>
            {ROADMAP.map(item => {
              const isCurrent = item.state === 'current';
              const isDone = item.state === 'done';
              return (
                <li key={item.ver} style={{
                  ...paperCard,
                  display: 'grid',
                  gridTemplateColumns: '4.5rem 1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '0.85rem 1rem',
                  border: isCurrent
                    ? '1px solid var(--warning-border)'
                    : isDone
                      ? '1px solid var(--accent-border)'
                      : '1px solid var(--paper-border)',
                  background: isCurrent
                    ? 'var(--warning-soft)'
                    : isDone
                      ? 'var(--accent-soft)'
                      : 'var(--paper)',
                }}>
                  <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontWeight: 700, color: 'var(--ink)' }}>{item.ver}</span>
                  <span style={{ color: 'var(--ink-secondary)' }}>{item.title}</span>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: isCurrent ? 'var(--warning-text)' : isDone ? 'var(--primary-dark)' : 'var(--ink-muted)',
                  }}>
                    {item.state}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section style={{ background: 'var(--paper-subtle)', padding: '1rem 2rem 4rem' }}>
        <div style={{
          ...paperCard,
          maxWidth: 900,
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.55rem' }}>Community & contributing</h2>
          <p style={{ color: 'var(--ink-muted)', marginBottom: '1.35rem', lineHeight: 1.65 }}>
            AIES improves through issues, PRs, pilot evidence, and disagreement on the record.
          </p>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs/CONTRIBUTING" style={{
              padding: '0.6rem 1.2rem', borderRadius: 8, background: 'var(--accent)', color: '#fff',
              fontWeight: 700, fontSize: '0.86rem', textDecoration: 'none',
            }}>
              Contributing guide
            </Link>
            <a href={REPOSITORY_URL} target="_blank" rel="noopener noreferrer" style={{
              padding: '0.6rem 1.2rem', borderRadius: 8, border: '1px solid var(--paper-border)', color: 'var(--ink)',
              fontWeight: 600, fontSize: '0.86rem', textDecoration: 'none', background: 'var(--paper)',
            }}>
              GitHub
            </a>
            <Link href="/portal" style={{
              padding: '0.6rem 1.2rem', borderRadius: 8, border: '1px solid var(--accent-border)', color: 'var(--accent)',
              fontWeight: 600, fontSize: '0.86rem', textDecoration: 'none', background: 'var(--accent-soft)',
            }}>
              Standards portal
            </Link>
          </div>
        </div>
      </section>

      <footer style={{
        borderTop: '1px solid var(--shell-border)',
        padding: '1.5rem 2rem 2.25rem',
        textAlign: 'center',
        color: 'var(--shell-muted)',
        fontSize: '0.8rem',
        background: 'var(--shell)',
      }}>
        <p>
          <strong style={{ color: '#d1d5db' }}>{PRODUCT_SHORT}</strong>
          {' '}— {PRODUCT_NAME} · {RELEASE_STATUS} · site v{SITE_VERSION}
        </p>
        <p style={{ marginTop: '0.4rem', maxWidth: 640, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55 }}>
          Not affiliated with OpenAI, Anthropic, or any model vendor. “Open” means open-source and community-governed.
        </p>
        <p style={{ marginTop: '0.75rem' }}>
          <Link href="/docs/principles" style={{ color: 'var(--shell-muted)', marginRight: '1rem', textDecoration: 'none' }}>Principles</Link>
          <Link href="/docs/roadmap" style={{ color: 'var(--shell-muted)', marginRight: '1rem', textDecoration: 'none' }}>Roadmap</Link>
          <Link href="/docs/CONTRIBUTING" style={{ color: 'var(--shell-muted)', marginRight: '1rem', textDecoration: 'none' }}>Contribute</Link>
          <Link href="/about" style={{ color: 'var(--shell-muted)', textDecoration: 'none' }}>About</Link>
        </p>
      </footer>
    </main>
  );
}
