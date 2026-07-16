import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  PRODUCT_NAME,
  PRODUCT_SHORT,
  RELEASE_STATUS,
  REPOSITORY_URL,
  STEWARD,
} from '@/lib/site';
import { SEO_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: `About ${STEWARD.name} — ${STEWARD.title}`,
  description: `${STEWARD.summary} Contact: ${STEWARD.email}, ${STEWARD.phone}. Steward of ${PRODUCT_SHORT}.`,
  keywords: [
    STEWARD.name,
    STEWARD.title,
    'AI Coach',
    'Solutions Architect',
    ...SEO_KEYWORDS.slice(0, 12),
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: `${STEWARD.name} — ${PRODUCT_SHORT} steward`,
    description: STEWARD.summary,
    url: '/about',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: `${STEWARD.name} — ${STEWARD.title}`,
    description: STEWARD.summary,
  },
};

export default function AboutPage() {
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: STEWARD.name,
    jobTitle: STEWARD.title,
    worksFor: { '@type': 'Organization', name: STEWARD.org },
    email: STEWARD.email,
    telephone: STEWARD.phone,
    url: '/about',
    image: STEWARD.photo,
    sameAs: [STEWARD.linkedIn, STEWARD.github],
    knowsAbout: [
      'AIDLC',
      'AI SDLC',
      'Context Engineering',
      'MCP',
      'LLMOps',
      'Enterprise Architecture',
    ],
  };

  return (
    <main id="main-content" style={{ minHeight: '100vh', background: 'var(--shell)', color: 'var(--shell-text)' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        borderBottom: '1px solid var(--shell-border)',
        background: 'rgba(17, 24, 39, 0.92)',
        backdropFilter: 'blur(12px)',
        height: 'var(--header-h)',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 960,
          margin: '0 auto',
          width: '100%',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 800, textDecoration: 'none' }}>
            <span aria-hidden>⚡</span>
            {PRODUCT_SHORT}
          </Link>
          <nav style={{ display: 'flex', gap: '0.25rem', fontSize: '0.85rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Link href="/docs/handbook/README" style={{ padding: '0.4rem 0.75rem', color: 'var(--shell-muted)', textDecoration: 'none' }}>Handbook</Link>
            <Link href="/docs/roadmap" style={{ padding: '0.4rem 0.75rem', color: 'var(--shell-muted)', textDecoration: 'none' }}>Roadmap</Link>
            <Link href="/portal" style={{ padding: '0.4rem 0.75rem', color: 'var(--shell-muted)', textDecoration: 'none' }}>Portal</Link>
            <Link href="/about" style={{ padding: '0.4rem 0.75rem', color: '#93c5fd', textDecoration: 'none', fontWeight: 600 }}>About</Link>
            <a href={REPOSITORY_URL} style={{ padding: '0.4rem 0.75rem', color: 'var(--shell-muted)', textDecoration: 'none' }}>GitHub</a>
          </nav>
        </div>
      </header>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
        {/* Project */}
        <article
          className="paper"
          style={{
            padding: '2rem',
            borderRadius: 12,
            border: '1px solid var(--paper-border)',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '1.25rem',
          }}
        >
          <p style={{
            display: 'inline-block',
            padding: '0.25rem 0.7rem',
            borderRadius: 999,
            border: '1px solid var(--warning-border)',
            background: 'var(--warning-soft)',
            color: 'var(--warning-text)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}>
            {RELEASE_STATUS}
          </p>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            About {PRODUCT_SHORT}
          </h1>
          <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.7, marginBottom: '1rem' }}>
            {PRODUCT_NAME} is a documentation-first, vendor-neutral specification for production AI delivery:
            SDLC gates, context, agents, evaluation, MCP, and governance.
          </p>
          <p style={{ color: 'var(--ink-muted)', lineHeight: 1.7, margin: 0 }}>
            The repository is the product. This page also introduces the current steward so people know who to contact.
          </p>
        </article>

        {/* Steward */}
        <article
          className="paper"
          style={{
            padding: '2rem',
            borderRadius: 12,
            border: '1px solid var(--paper-border)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
            <Image
              src={STEWARD.photo}
              alt={STEWARD.name}
              width={96}
              height={96}
              style={{
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid var(--accent-border)',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 220 }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--ink)', margin: '0 0 0.25rem', letterSpacing: '-0.02em' }}>
                {STEWARD.name}
              </h2>
              <p style={{ color: 'var(--accent)', fontWeight: 600, margin: '0 0 0.35rem', fontSize: '0.95rem' }}>
                {STEWARD.title}
              </p>
              <p style={{ color: 'var(--ink-muted)', margin: '0 0 1rem', fontSize: '0.9rem' }}>
                {STEWARD.org} · Project steward, {PRODUCT_SHORT}
              </p>
              <p style={{ color: 'var(--ink-secondary)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
                {STEWARD.summary}
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '1.75rem 0 0.75rem' }}>
            Contact
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.65rem' }}>
            <li style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--ink-muted)', marginRight: 8 }}>Email</span>
              <a href={`mailto:${STEWARD.email}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                {STEWARD.email}
              </a>
            </li>
            <li style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem' }}>
              <span style={{ color: 'var(--ink-muted)', marginRight: 8 }}>Phone</span>
              <a href={`tel:${STEWARD.phoneTel}`} style={{ color: 'var(--accent)', fontWeight: 600 }}>
                {STEWARD.phone}
              </a>
            </li>
            <li style={{ color: 'var(--ink-secondary)', fontSize: '0.95rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={STEWARD.linkedIn} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                LinkedIn →
              </a>
              <a href={STEWARD.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                GitHub →
              </a>
            </li>
          </ul>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href={REPOSITORY_URL} style={{
              padding: '0.65rem 1.2rem', borderRadius: 8,
              background: 'var(--accent)',
              color: '#fff', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
            }}>
              Repository →
            </a>
            <Link href="/docs/CONTRIBUTING" style={{
              padding: '0.65rem 1.2rem', borderRadius: 8,
              border: '1px solid var(--paper-border)', color: 'var(--ink)',
              fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', background: 'var(--paper-subtle)',
            }}>
              Contribute
            </Link>
            <Link href="/" style={{
              padding: '0.65rem 1.2rem', borderRadius: 8,
              border: '1px solid var(--paper-border)', color: 'var(--ink)',
              fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', background: 'var(--paper-subtle)',
            }}>
              Home
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
