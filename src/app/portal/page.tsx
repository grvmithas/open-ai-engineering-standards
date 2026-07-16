import type { Metadata } from 'next';
import Link from 'next/link';
import PortalExplorer from '@/components/PortalExplorer';
import portalManifest from '@/generated/portal-manifest.json';
import { SITE_VERSION } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Standards Portal',
  description: 'Browse OAIES normative controls, classification guidance, evidence and SoA requirements, crosswalks, schemas, lifecycle status, and governance records.',
  alternates: { canonical: '/portal' },
  openGraph: {
    title: 'OAIES Standards Portal',
    description: 'Machine-derived discovery for OAIES controls, assurance artifacts, conformance tooling, and governance.',
    type: 'website',
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
    <div className="min-h-screen bg-[#050509]">
      <header className="sticky top-0 z-40 h-[60px] border-b border-violet-950/30 bg-[#050509]/90 px-4 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span aria-hidden="true">⚡</span>
            <span className="text-sm font-extrabold text-white">OAIES</span>
            <span className="rounded border border-violet-900/40 bg-violet-950/20 px-1.5 py-0.5 text-[9px] font-bold text-violet-300">v{SITE_VERSION}</span>
          </Link>
          <nav aria-label="Portal navigation" className="flex items-center gap-2 text-xs font-semibold">
            <Link href="/docs/standard/README" className="rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-900 hover:text-white">Normative standard</Link>
            <Link href="/docs/README" className="rounded-lg border border-slate-800 px-3 py-2 text-slate-300 hover:border-violet-800 hover:text-white">All docs</Link>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="border-b border-slate-900 px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <div className="inline-flex rounded-full border border-violet-800/40 bg-violet-950/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-violet-300">
              Generated from canonical sources
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-5xl">Standards portal</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              Explore the normative control baseline, classify workload characteristics, plan assurance evidence, discover crosswalks, and onboard machine-readable conformance tooling without overstating what repository artifacts prove.
            </p>
            <div className="mt-8 grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map(stat => (
                <div key={stat.label} className="rounded-xl border border-slate-800 bg-slate-900/30 p-4">
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="mt-1 text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 text-xs">
              <span className="rounded-full border border-amber-800/40 bg-amber-950/20 px-3 py-1.5 font-semibold text-amber-200">Normative: creates requirements</span>
              <span className="rounded-full border border-cyan-800/40 bg-cyan-950/20 px-3 py-1.5 font-semibold text-cyan-200">Informative: supports interpretation</span>
              <span className="rounded-full border border-emerald-800/40 bg-emerald-950/20 px-3 py-1.5 font-semibold text-emerald-200">Tooling: validates supplied artifacts</span>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 pb-24">
          <PortalExplorer />
        </div>
      </main>
    </div>
  );
}
