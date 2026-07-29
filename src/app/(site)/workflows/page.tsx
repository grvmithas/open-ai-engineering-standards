import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { DOC_ARCHITECTURE } from '@/lib/workflows/catalog';
import { LIFECYCLE_WORKFLOWS } from '@/lib/workflows/lifecycle';

export const metadata: Metadata = {
  title: 'Lifecycle workflows',
  description: 'Journey-driven workflows from idea to continuous improvement — with prompts, skills, MCP, agents, and human gates at every stage.',
  alternates: { canonical: '/workflows' },
};

export default function WorkflowsIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="> workflows · Step 3"
        title="Lifecycle workflows"
        description={
          <>
            After onboarding and installing Your kit — pick the stage that answers{' '}
            <strong className="text-[var(--inverse-text)]">what should I do next?</strong>
            {' '}Each page links to real corpus artifacts (prompts, skills, patterns, gates).
          </>
        }
        size="md"
      >
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/start"
            className="rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1.5 font-medium text-[var(--inverse-accent)] transition hover:bg-white/10"
          >
            Step 1 — Onboarding
          </Link>
          <Link
            href="/quickstart"
            className="rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1.5 font-medium text-[var(--inverse-accent)] transition hover:bg-white/10"
          >
            Step 2 — Your kit
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
        <ol className="space-y-0">
          {LIFECYCLE_WORKFLOWS.map((stage, i) => (
            <li key={stage.slug}>
              <Link
                href={`/workflows/${stage.slug}`}
                className="group block rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-5 shadow-sm transition hover:border-[var(--accent-border)] hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--accent)]">{(i + 1).toString().padStart(2, '0')}</span>
                    <h2 className="mt-1 text-lg font-bold text-[var(--ink)] group-hover:text-[var(--accent)]">{stage.title}</h2>
                    <p className="mt-1 text-sm text-[var(--ink-muted)]">{stage.goal}</p>
                  </div>
                  <span className="mt-1 text-[var(--ink-muted)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent)]" aria-hidden>→</span>
                </div>
              </Link>
              {i < LIFECYCLE_WORKFLOWS.length - 1 ? (
                <div className="flex justify-center py-1.5 text-[var(--ink-muted)]" aria-hidden>↓</div>
              ) : null}
            </li>
          ))}
        </ol>

        <section className="section-band mt-14 overflow-hidden rounded-2xl border p-6 md:p-8">
          <h2 className="text-lg font-bold text-[var(--inverse-text)]">Learn · Operate · Assure</h2>
          <p className="mt-1 text-sm text-[var(--inverse-muted)]">
            Systematic surfaces after the harness is installed — not a raw folder dump.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {DOC_ARCHITECTURE.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-[var(--inverse-border)] bg-white/5 p-4 transition hover:border-[var(--inverse-accent)] hover:bg-white/10"
              >
                <div className="font-semibold text-[var(--inverse-text)]">{item.title}</div>
                <div className="mt-1 text-xs text-[var(--inverse-muted)]">{item.desc}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
