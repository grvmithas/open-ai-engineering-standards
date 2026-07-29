import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PortalExplorer from '@/components/PortalExplorer';
import portalManifest from '@/generated/portal-manifest.json';
import { PRODUCT_NAME, PRODUCT_SHORT } from '@/lib/site';
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
    <>
      <PageHero
        eyebrow="> portal · assurance"
        title="Standards portal"
        description="Explore the normative control baseline, classify workload characteristics, plan assurance evidence, discover crosswalks, and onboard machine-readable conformance tooling — without overstating what repository artifacts prove."
        layout="contained"
      >
        <span className="inline-flex rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--inverse-accent)]">
          Generated from canonical sources
        </span>
        <div className="mt-6 grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-4">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="rounded-xl border border-[var(--inverse-border)] bg-white/5 p-4 backdrop-blur-sm"
            >
              <div className="text-2xl font-extrabold text-[var(--inverse-text)]">{stat.value}</div>
              <div className="mt-1 text-xs text-[var(--inverse-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-semibold text-amber-200">
            Normative: creates requirements
          </span>
          <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 font-semibold text-sky-200">
            Informative: supports interpretation
          </span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-semibold text-emerald-200">
            Tooling: validates supplied artifacts
          </span>
        </div>
      </PageHero>

      <div className="px-4 py-10 md:px-6">
        <div className="paper mx-auto max-w-7xl rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-6 shadow-md md:p-8">
          <PortalExplorer />
        </div>
      </div>
    </>
  );
}
