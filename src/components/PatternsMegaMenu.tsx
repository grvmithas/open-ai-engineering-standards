'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { patternCatalog } from '@/lib/navigation';

interface PatternsMegaMenuProps {
  compact?: boolean;
}

export default function PatternsMegaMenu({ compact = false }: PatternsMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen(current => !current)}
        className={
          compact
            ? 'rounded-lg border border-[var(--shell-border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--shell-muted)] transition hover:border-slate-500 hover:text-white'
            : 'rounded-md px-3 py-1.5 text-sm font-medium text-[var(--shell-muted)] transition hover:text-white'
        }
      >
        Patterns ▾
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-[min(92vw,720px)] rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] p-4 text-[var(--ink)] shadow-xl"
        >
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">AI Engineering Patterns</p>
              <p className="mt-1 text-xs text-[var(--ink-muted)]">Twelve operational envelopes — open the pattern README.</p>
            </div>
            <Link
              href="/docs/patterns/README"
              onClick={() => setOpen(false)}
              className="shrink-0 text-xs font-semibold text-[var(--accent)] underline decoration-[var(--accent-border)] underline-offset-4 hover:text-[var(--accent-hover)]"
            >
              Pattern library →
            </Link>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {patternCatalog.map(pattern => (
              <Link
                key={pattern.slug}
                href={`/docs/${pattern.slug}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-3 transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]"
              >
                <div className="text-sm font-bold text-[var(--ink)]">{pattern.title}</div>
                <div className="mt-1 text-[11px] leading-4 text-[var(--ink-muted)]">{pattern.outcome}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
