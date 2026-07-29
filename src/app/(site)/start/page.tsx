'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import OnboardingTerminal from '@/components/onboarding/OnboardingTerminal';

export default function StartPage() {
  return (
    <>
      <PageHero
        eyebrow="> /start · Step 1 of 3"
        title="Onboarding"
        description={
          <>
            Build your profile once. Next: install <strong className="text-[var(--inverse-text)]">Your kit</strong>, then run a lifecycle workflow.
          </>
        }
        size="md"
      >
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/quickstart"
            className="rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1.5 font-medium text-[var(--inverse-accent)] transition hover:bg-white/10"
          >
            Step 2 — Your kit
          </Link>
          <Link
            href="/workflows"
            className="rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1.5 font-medium text-[var(--inverse-accent)] transition hover:bg-white/10"
          >
            Step 3 — Workflows
          </Link>
          <span className="rounded-full border border-[var(--inverse-border)] bg-white/5 px-3 py-1.5 text-[var(--inverse-muted)]">
            Press <kbd className="font-mono">Ctrl+K</kbd> to search
          </span>
        </div>
      </PageHero>

      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="paper rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-4 shadow-md md:p-6">
          <Suspense fallback={<p className="text-center text-sm text-[var(--ink-muted)]">Loading terminal...</p>}>
            <OnboardingTerminal />
          </Suspense>
        </div>
      </div>
    </>
  );
}
