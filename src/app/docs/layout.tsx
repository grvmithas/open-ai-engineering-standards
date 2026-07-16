'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import PatternsMegaMenu from '@/components/PatternsMegaMenu';
import { REPOSITORY_URL, RELEASE_STATUS } from '@/lib/site';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--shell)] text-[var(--shell-text)]">
      <header className="sticky top-0 z-40 flex h-[60px] w-full items-center border-b border-[var(--shell-border)] bg-[var(--shell-elevated)]/95 px-4 backdrop-blur-md md:px-6">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-navigation"
              className="rounded-lg border border-[var(--shell-border)] p-1.5 text-[var(--shell-text)] hover:bg-[var(--shell-hover)] md:hidden"
              aria-label="Toggle menu"
            >
              <span className="text-base">☰</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg" aria-hidden>⚡</span>
              <span className="text-sm font-extrabold tracking-tight text-white">AIES</span>
              <span className="hidden rounded border border-amber-500/40 bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-200 sm:inline-block">
                {RELEASE_STATUS}
              </span>
            </Link>
          </div>

          <div className="max-w-xs flex-1 md:max-w-md">
            <Search />
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/docs/handbook/README"
              className="hidden rounded-lg bg-[var(--accent)] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-[var(--accent-hover)] sm:inline-block"
            >
              Handbook
            </Link>
            <PatternsMegaMenu compact />
            <Link
              href="/portal"
              className="rounded-lg border border-[var(--shell-border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--shell-muted)] transition hover:border-slate-500 hover:text-white"
            >
              Portal
            </Link>
            <Link
              href="/about"
              className="rounded-lg border border-[var(--shell-border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--shell-muted)] transition hover:border-slate-500 hover:text-white"
            >
              About
            </Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-[var(--shell-border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--shell-muted)] transition hover:border-slate-500 hover:text-white sm:inline-block"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="relative flex w-full flex-1">
        <aside className="sticky top-[60px] hidden h-[calc(100vh-60px)] w-[260px] shrink-0 overflow-y-auto border-r border-[var(--shell-border)] bg-[var(--bg-sidebar)] p-5 md:block lg:w-[280px]">
          <div className="mb-3 pl-3 text-[10px] font-bold uppercase tracking-widest text-[var(--shell-muted)]">
            Handbook navigation
          </div>
          <Sidebar />
        </aside>

        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
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
                  <span className="text-lg">⚡</span>
                  <span className="text-sm font-extrabold tracking-tight text-white">AIES</span>
                </Link>
                <button
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
        )}

        {/* Full-width white reading column — fills remaining viewport */}
        <main id="main-content" className="min-w-0 flex-1 bg-[var(--paper)]">
          <div className="paper h-full w-full px-6 py-8 md:px-10 md:py-10 xl:px-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
