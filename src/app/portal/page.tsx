import type { Metadata } from 'next';
import Link from 'next/link';
import PortalExplorer from '@/components/PortalExplorer';
import portalManifest from '@/generated/portal-manifest.json';
import { PRODUCT_NAME, PRODUCT_SHORT, RELEASE_STATUS, SITE_VERSION } from '@/lib/site';
import { SEO_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Standards Portal — Normative Controls, SoA & Crosswalks',
  description:
    `Browse ${PRODUCT_SHORT} normative controls, workload classification, evidence and Statement of Applicability requirements, standards crosswalks, JSON schemas, and conformance CLI onboarding.`,
  keywords: [
    'AI standards portal',
    'Statement of Applicability',
    'AI controls',
    'AI governance crosswalk',
    ...SEO_KEYWORDS.slice(0, 10),
  ],
  alternates: { canonical: '/portal' },
  openGraph: {
    title: `${PRODUCT_SHORT} Standards Portal`,
    description: `Machine-derived discovery for ${PRODUCT_NAME} controls, assurance artifacts, conformance tooling, and governance.`,
    url: '/portal',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${PRODUCT_SHORT} Standards Portal`,
    description: 'Normative controls, SoA workflow, schemas, and crosswalks.',
  },
};

export default function PortalPage() {
  const stats = [
    { value: portalManifest.counts.controls, label: 'Normative controls' },
    { value: portalManifest.counts.controlFamilies, label: 'Control families' },
    { value: portalManifest.counts.schemas, label: 'JSON schemas' },
    { value: portalManifest.counts.crosswalks, label: 'Crosswalks' },
  ];

  return (
    <div className="min-h-screen bg-[var(--shell)] text-[var(--shell-text)]">
      <header className="sticky top-0 z-40 h-[60px] border-b border-[var(--shell-border)] bg-[var(--shell-elevated)]/95 px-4 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span aria-hidden="true">⚡</span>
            <span className="text-sm font-extrabold text-white">{PRODUCT_SHORT}</span>
            <span className="rounded border border-amber-500/40 bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-200">
              {RELEASE_STATUS} · v{SITE_VERSION}
            </span>
          </Link>
          <nav aria-label="Portal navigation" className="flex items-center gap-2 text-xs font-semibold">
            <Link href="/docs/standard/README" className="rounded-lg px-3 py-2 text-[var(--shell-muted)] hover:text-white">Normative standard</Link>
            <Link href="/docs/README" className="rounded-lg border border-[var(--shell-border)] px-3 py-2 text-[var(--shell-muted)] hover:border-slate-500 hover:text-white">All docs</Link>
            <Link href="/about" className="rounded-lg border border-[var(--shell-border)] px-3 py-2 text-[var(--shell-muted)] hover:border-slate-500 hover:text-white">About</Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b border-[var(--shell-border)] px-4 py-14">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-blue-200">
              Generated from canonical sources
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">Standards portal</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              Explore the normative control baseline, classify workload characteristics, plan assurance evidence, discover crosswalks, and onboard machine-readable conformance tooling without overstating what repository artifacts prove.
            </p>
            <div className="mt-8 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map(stat => (
                <div key={stat.label} className="rounded-xl border border-[var(--shell-border)] bg-[var(--shell-elevated)] p-4">
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-[var(--shell-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 font-semibold text-amber-200">Normative: creates requirements</span>
              <span className="rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1.5 font-semibold text-sky-200">Informative: supports interpretation</span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-200">Tooling: validates supplied artifacts</span>
            </div>
          </div>
        </section>

        {/* White paper workspace for interactive explorer */}
        <div className="bg-[var(--paper-subtle)] px-4 py-10 text-[var(--ink)]">
          <div className="paper mx-auto max-w-7xl rounded-xl border border-[var(--paper-border)] p-6 shadow-[var(--shadow-sm)] md:p-8">
            <PortalExplorer />
          </div>
        </div>
      </main>
    </div>
  );
}
