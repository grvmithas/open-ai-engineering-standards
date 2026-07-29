import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <PageHero
        eyebrow={`> about · ${PRODUCT_SHORT}`}
        title={`About ${PRODUCT_NAME}`}
        description="A documentation-first, vendor-neutral specification for production AI delivery — SDLC gates, context, agents, evaluation, MCP, and governance."
      >
        <span className="inline-flex rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--inverse-accent)]">
          {RELEASE_STATUS}
        </span>
      </PageHero>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-10 md:px-6">
        <article className="paper overflow-hidden rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] shadow-md">
          <div className="border-b border-[var(--paper-border)] bg-[var(--paper-subtle)] px-6 py-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">The standard</h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              The repository is the product. {PRODUCT_SHORT} is maintained in the open so teams can fork one harness —
              prompts, skills, hooks, patterns, and assurance artifacts — before building any AI product.
            </p>
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-3">
            {[
              { label: 'Vendor neutral', value: 'Any model · any IDE' },
              { label: 'Evidence-first', value: 'Gates · SoA · evals' },
              { label: 'Production depth', value: 'AIDLC · MCP · LLMOps' },
            ].map(item => (
              <div
                key={item.label}
                className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--ink)]">{item.value}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="paper overflow-hidden rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-6 shadow-md md:p-8">
          <div className="flex flex-wrap items-start gap-5">
            <Image
              src={STEWARD.photo}
              alt={STEWARD.name}
              width={112}
              height={112}
              className="h-28 w-28 shrink-0 rounded-2xl border-2 border-[var(--accent-border)] object-cover shadow-sm"
            />
            <div className="min-w-[220px] flex-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--ink)]">{STEWARD.name}</h2>
              <p className="mt-1 font-semibold text-[var(--accent)]">{STEWARD.title}</p>
              <p className="mt-1 text-sm text-[var(--ink-muted)]">
                {STEWARD.org} · Project steward, {PRODUCT_SHORT}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-secondary)]">{STEWARD.summary}</p>
            </div>
          </div>

          <h3 className="mt-8 text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)]">Contact</h3>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            <li className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-4 py-3 text-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">Email</span>
              <a href={`mailto:${STEWARD.email}`} className="mt-1 inline-block font-semibold text-[var(--accent)] hover:underline">
                {STEWARD.email}
              </a>
            </li>
            <li className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-4 py-3 text-sm">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">Phone</span>
              <a href={`tel:${STEWARD.phoneTel}`} className="mt-1 inline-block font-semibold text-[var(--accent)] hover:underline">
                {STEWARD.phone}
              </a>
            </li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={STEWARD.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              LinkedIn →
            </a>
            <a
              href={STEWARD.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--accent)] hover:underline"
            >
              GitHub →
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--paper-border)] pt-6">
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-solid rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-bold text-[var(--on-accent)] shadow-sm transition hover:bg-[var(--accent-hover)]"
            >
              Repository →
            </a>
            <Link
              href="/docs/CONTRIBUTING"
              className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent-border)]"
            >
              Contribute
            </Link>
            <Link
              href="/start"
              className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] px-5 py-2.5 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
            >
              Start onboarding
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
