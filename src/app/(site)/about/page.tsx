import Script from 'next/script';
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
  title: `About ${PRODUCT_NAME} & Steward ${STEWARD.name}`,
  description: `${PRODUCT_NAME} (${PRODUCT_SHORT}) — Vendor-neutral working standard for AIDLC, prompts, context, agents, MCP, and LLMOps. Maintained by ${STEWARD.name}.`,
  keywords: [
    STEWARD.name,
    STEWARD.title,
    'AI Engineering Standard',
    'AIDLC Framework',
    'Solutions Architect',
    ...SEO_KEYWORDS.slice(0, 10),
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About ${PRODUCT_NAME} — ${PRODUCT_SHORT}`,
    description: `Vendor-neutral specification for production AI delivery. Steward: ${STEWARD.name}.`,
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `About ${PRODUCT_NAME}`,
    description: `Vendor-neutral working standard for enterprise AI engineering.`,
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
      <Script
        src="https://platform.linkedin.com/badges/js/profile.js"
        async
        defer
        strategy="lazyOnload"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      <PageHero
        eyebrow={`> about · ${PRODUCT_SHORT}`}
        title={`About ${PRODUCT_NAME}`}
        description="A documentation-first, open working specification for production AI delivery — SDLC gates, context engineering, agents, evaluation, MCP, and enterprise governance."
      >
        <span className="inline-flex rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--inverse-accent)]">
          {RELEASE_STATUS}
        </span>
      </PageHero>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 md:px-6">
        {/* Section 1: The Platform Thesis */}
        <article className="paper tile-card overflow-hidden rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-6 shadow-md md:p-8">
          <div className="border-b border-[var(--paper-border)] pb-4 mb-6">
            <span className="inline-block rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
              Platform Mandate
            </span>
            <h2 className="text-xl font-extrabold tracking-tight text-[var(--ink)] sm:text-2xl">
              The LLM is one component. The harness is the product.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-secondary)]">
              {PRODUCT_SHORT} is maintained in the open so engineering organizations can fork one standardized harness —
              prompts, skills, agentHooks, context graphs, and evaluation artifacts — eliminating private dialects and silent regressions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Vendor Neutral', value: 'Any model · any IDE' },
              { label: 'Evidence-First', value: 'Stage gates · SoA · evals' },
              { label: 'Production Depth', value: 'AIDLC · MCP · LLMOps' },
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

        {/* Section 2: Steward & Platform Leadership */}
        <article className="paper tile-card overflow-hidden rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-6 shadow-md md:p-8">
          <div className="mb-6 flex items-center justify-between border-b border-[var(--paper-border)] pb-4">
            <div>
              <span className="inline-block rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
                Project Stewardship
              </span>
              <h2 className="text-xl font-extrabold text-[var(--ink)]">Steward & Author Profile</h2>
            </div>
            <span className="text-xs font-mono text-[var(--ink-muted)]">12+ Yrs Architecture</span>
          </div>

          <div className="grid gap-8 md:grid-cols-12 items-start">
            {/* Left Column: Official LinkedIn Profile Badge (Replaces duplicate photo) */}
            <div className="md:col-span-5 flex flex-col items-center justify-center rounded-2xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-4 shadow-sm">
              <div
                className="badge-base LI-profile-badge"
                data-locale="en_US"
                data-size="medium"
                data-theme="light"
                data-type="VERTICAL"
                data-vanity="gaurav-mithas-06037289"
                data-version="v1"
              >
                <a
                  className="badge-base__link LI-simple-link text-sm font-semibold text-[var(--accent)] hover:underline"
                  href="https://in.linkedin.com/in/gaurav-mithas-06037289?trk=profile-badge"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gaurav Mithas
                </a>
              </div>
            </div>

            {/* Right Column: Platform Steward Biography & Background */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="text-2xl font-black text-[var(--ink)]">{STEWARD.name}</h3>
                <p className="text-sm font-semibold text-[var(--accent)]">{STEWARD.title}</p>
                <p className="text-xs text-[var(--ink-muted)] mt-0.5">{STEWARD.org} · Project Steward, AIES</p>
              </div>

              <p className="text-xs leading-relaxed text-[var(--ink-secondary)]">
                Over 12 years of experience steering enterprise digital transformation, platform engineering, and high-impact AI adoption across global organizations (Publicis Sapient, Nagarro, Wipro, Infosys).
              </p>

              <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-3.5 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">Key Focus & Architecture Expertise</p>
                <ul className="text-[11px] text-[var(--ink-secondary)] space-y-1 list-disc list-inside">
                  <li><strong>AIDLC Rollout</strong>: Scaling frameworks from L1 (ad-hoc prompts) to L5 (autopilot agents, agentHooks, context graphs).</li>
                  <li><strong>Token & Cost Optimization</strong>: Designing semantic prompt caching and bounded context window guidelines.</li>
                  <li><strong>Enterprise Architecture</strong>: MACH Architecture, Microservices, Microfrontends, OpenTelemetry, and Architecture Review Boards.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="mt-8 border-t border-[var(--paper-border)] pt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--ink-muted)] mb-3">Direct Contact & Channels</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-4 py-3 text-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">Email</span>
                <a href={`mailto:${STEWARD.email}`} className="mt-1 inline-block font-semibold text-[var(--accent)] hover:underline">
                  {STEWARD.email}
                </a>
              </div>

              <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-4 py-3 text-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">Phone</span>
                <a href={`tel:${STEWARD.phoneTel}`} className="mt-1 inline-block font-semibold text-[var(--accent)] hover:underline">
                  {STEWARD.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[var(--paper-border)] pt-6">
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-solid rounded-xl bg-[var(--accent)] px-5 py-2.5 text-xs font-bold text-[var(--on-accent)] shadow-sm transition hover:bg-[var(--accent-hover)]"
            >
              GitHub Repository →
            </a>
            <a
              href={STEWARD.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-5 py-2.5 text-xs font-semibold text-[var(--ink)] transition hover:border-[var(--accent-border)]"
            >
              GitHub Profile →
            </a>
            <Link
              href="/start"
              className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] px-5 py-2.5 text-xs font-semibold text-[var(--accent)] transition hover:bg-[var(--accent)] hover:text-[var(--on-accent)]"
            >
              Start onboarding →
            </Link>
          </div>
        </article>
      </div>
    </>
  );
}
