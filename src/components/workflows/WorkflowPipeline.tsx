'use client';

import Link from 'next/link';
import { LIFECYCLE_WORKFLOWS } from '@/lib/workflows/lifecycle';

export default function WorkflowPipeline({ activeSlug }: { activeSlug?: string }) {
  const activeIndex = LIFECYCLE_WORKFLOWS.findIndex(w => w.slug === activeSlug);

  return (
    <div className="overflow-x-auto pb-2 pt-1">
      <ol className="flex min-w-max items-center gap-1.5 px-1">
        {LIFECYCLE_WORKFLOWS.map((stage, i) => {
          const isActive = stage.slug === activeSlug;
          const isCompleted = activeIndex !== -1 && i < activeIndex;

          let badgeClass = '';
          if (isActive) {
            badgeClass = 'bg-[var(--accent)] text-[var(--on-accent)] shadow-sm ring-2 ring-offset-2 ring-blue-500/20';
          } else if (isCompleted) {
            badgeClass = 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] hover:bg-blue-100/70';
          } else {
            badgeClass = 'text-[var(--ink-muted)] bg-[var(--paper-subtle)] border border-[var(--paper-border)] hover:bg-[var(--paper-border)]/55 hover:text-[var(--ink)]';
          }

          return (
            <li key={stage.slug} className="flex items-center gap-1.5">
              <Link
                href={`/workflows/${stage.slug}`}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${badgeClass}`}
              >
                <span className="font-mono text-[10px] opacity-75">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <span>{stage.title}</span>
                {isCompleted && (
                  <span className="text-[10px] text-[var(--accent)]" aria-hidden="true">✓</span>
                )}
              </Link>
              {i < LIFECYCLE_WORKFLOWS.length - 1 ? (
                <span className="text-slate-300 font-bold px-0.5 text-sm" aria-hidden>→</span>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
