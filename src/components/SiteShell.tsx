'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppHeader from '@/components/AppHeader';
import Sidebar from '@/components/Sidebar';

type MaxWidth = '3xl' | '4xl' | '5xl' | '7xl' | 'full';

interface SiteShellProps {
  children: React.ReactNode;
  /** Center main column (journey / about pages). Docs use full width. */
  constrain?: boolean;
  maxWidth?: MaxWidth;
  variant?: 'paper' | 'subtle' | 'shell';
  /** Docs layout manages its own inner padding. */
  bare?: boolean;
}

const MAX: Record<MaxWidth, string> = {
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-none',
};

const BG: Record<NonNullable<SiteShellProps['variant']>, string> = {
  paper: 'bg-[var(--paper)]',
  subtle: 'bg-[var(--paper-subtle)]',
  shell: 'bg-[var(--shell)]',
};

export default function SiteShell({
  children,
  constrain = false,
  maxWidth = '4xl',
  variant = 'paper',
  bare = false,
}: SiteShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainInner = bare ? (
    children
  ) : (
    <div className={`${constrain ? `mx-auto w-full ${MAX[maxWidth]} px-4 py-8 md:px-6 md:py-10` : 'h-full w-full px-6 py-8 md:px-10 md:py-10 xl:px-12'}`}>
      {children}
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-[var(--shell)] text-[var(--shell-text)]">
      <AppHeader onMenuClick={() => setIsSidebarOpen(prev => !prev)} />

      <div className="relative flex w-full flex-1">
        <aside className="sticky top-[60px] hidden h-[calc(100vh-60px)] w-[260px] shrink-0 overflow-y-auto border-r border-[var(--sidebar-border)] bg-[var(--sidebar-bg)] p-5 md:block lg:w-[280px]">
          <div className="mb-3 pl-3 text-[10px] font-bold uppercase tracking-widest text-[var(--sidebar-muted)]">
            Book navigation
          </div>
          <Sidebar />
        </aside>

        {isSidebarOpen ? (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />
            <div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Documentation navigation"
              className="relative z-10 flex h-full w-[280px] flex-col overflow-y-auto border-r border-[var(--shell-border)] bg-[var(--shell-elevated)] p-6 shadow-xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden>⚡</span>
                  <span className="text-sm font-extrabold tracking-tight text-[var(--shell-text)]">AIES</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close navigation"
                  className="rounded-lg border border-[var(--shell-border)] p-1 text-[var(--shell-muted)]"
                >
                  ✕
                </button>
              </div>
              <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        ) : null}

        <main id="main-content" className={`min-w-0 flex-1 ${BG[variant]} text-[var(--ink)]`}>
          {mainInner}
        </main>
      </div>
    </div>
  );
}
