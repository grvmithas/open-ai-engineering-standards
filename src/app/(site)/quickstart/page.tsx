'use client';

import Link from 'next/link';
import PageHero from '@/components/PageHero';
import QuickStartView from '@/components/workflows/QuickStartView';

export default function QuickStartPage() {
  return (
    <>
      <PageHero
        eyebrow="> /quickstart · Step 2 of 3"
        title="Your kit"
        description="Install the harness into your repo, then continue to a lifecycle workflow."
        size="md"
      >
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/start"
            className="rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1.5 font-medium text-[var(--inverse-accent)] transition hover:bg-white/10"
          >
            Re-run onboarding
          </Link>
          <Link
            href="/workflows"
            className="rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1.5 font-medium text-[var(--inverse-accent)] transition hover:bg-white/10"
          >
            Step 3 — Workflows
          </Link>
        </div>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="paper rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-5 shadow-md md:p-8">
          <QuickStartView />
        </div>
      </div>
    </>
  );
}
