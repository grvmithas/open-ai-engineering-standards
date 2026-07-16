'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { patternCatalog } from '@/lib/navigation';

interface PatternsMegaMenuProps {
  /** Visual density for header contexts */
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
            ? 'rounded-lg border border-violet-950/30 px-3 py-1.5 text-[11px] font-semibold text-slate-300 transition hover:bg-slate-950/40 hover:text-white'
            : 'rounded-md px-3 py-1.5 text-sm font-medium text-slate-400 transition hover:text-white'
        }
      >
        Patterns ▾
      </button>
      {open && (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-[min(92vw,720px)] rounded-2xl border border-violet-900/40 bg-[#0c0c16]/98 p-4 shadow-2xl backdrop-blur-md"
        >
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-violet-300">AI Engineering Patterns</p>
              <p className="mt-1 text-xs text-slate-400">Twelve operational envelopes — open the pattern README, not a dump of 13 stubs.</p>
            </div>
            <Link
              href="/docs/patterns/README"
              onClick={() => setOpen(false)}
              className="shrink-0 text-xs font-semibold text-violet-300 underline decoration-violet-700 underline-offset-4 hover:text-violet-200"
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
                className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 transition hover:border-violet-700/50 hover:bg-violet-950/20"
              >
                <div className="text-sm font-bold text-white">{pattern.title}</div>
                <div className="mt-1 text-[11px] leading-4 text-slate-400">{pattern.outcome}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
