'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { GOALS, IDES, STACKS } from '@/lib/workflows/catalog';
import { parseNaturalLanguageQuery } from '@/lib/workflows/commandIndex';
import { getPrimaryWorkflowHref } from '@/lib/workflows/quickStart';
import { useUserProfile } from '@/components/providers/UserProfileProvider';

export default function HomeCommandEntry() {
  const router = useRouter();
  const { profile, isLoaded } = useUserProfile();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    if (trimmed === '/start' || trimmed.startsWith('/start')) {
      router.push('/start');
      return;
    }

    const nl = parseNaturalLanguageQuery(trimmed);
    if (nl.stack || nl.ide || trimmed.toLowerCase().includes('i am')) {
      const params = new URLSearchParams();
      if (nl.stack) params.set('stack', nl.stack);
      if (nl.ide) params.set('ide', nl.ide);
      router.push(`/start?${params.toString()}`);
      return;
    }

    router.push(`/start`);
  };

  if (!isLoaded) return null;

  if (profile) {
    const workflowHref = getPrimaryWorkflowHref(profile);
    const stackLabel = STACKS.find(s => s.id === profile.stack)?.label ?? profile.stack;
    const ideLabel = IDES.find(i => i.id === profile.ide)?.label ?? profile.ide;
    const goalLabel = GOALS.find(g => g.id === profile.goal)?.label ?? profile.goal;

    return (
      <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-[var(--accent-border)] bg-[rgba(37,99,235,0.12)] p-5 text-left">
        <p className="font-mono text-xs text-[#93c5fd]">Welcome back</p>
        <p className="mt-1 text-sm text-[#e5e7eb]">
          {goalLabel} · {stackLabel} · {ideLabel}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Link href="/quickstart" className="cta-solid rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--on-accent)]">
            Step 2 — Your kit →
          </Link>
          <Link href={workflowHref} className="rounded-lg border border-[rgba(147,197,253,0.4)] px-4 py-2 text-xs font-semibold text-[#93c5fd]">
            Step 3 — Continue workflow
          </Link>
          <Link href="/docs/patterns/README" className="rounded-lg px-4 py-2 text-xs text-[#9ca3af] underline">
            Patterns
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 max-w-xl">
      <form onSubmit={handleSubmit} className="overflow-hidden rounded-xl border border-[var(--shell-border)] bg-[#0d1117] shadow-xl">
        <div className="flex items-center gap-2 px-4 py-3.5">
          <span className="font-mono text-sm font-bold text-[#79c0ff]">&gt;</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="/start or I am a React developer using Cursor"
            className="w-full bg-transparent font-mono text-sm text-[#e6edf3] outline-none placeholder:text-[var(--shell-muted)]"
            spellCheck={false}
          />
          <kbd className="hidden rounded border border-[var(--shell-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--shell-muted)] sm:inline">
            Ctrl+K
          </kbd>
        </div>
      </form>
      <p className="mt-2 text-center text-xs text-[var(--shell-muted)]">
        <Link href="/start" className="text-[#93c5fd] hover:underline">Step 1 — Onboarding</Link>
        {' · '}
        Press Ctrl+K for command palette
      </p>
    </div>
  );
}
