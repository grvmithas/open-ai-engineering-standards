'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PatternsMegaMenu from '@/components/PatternsMegaMenu';
import Search from '@/components/Search';
import { RELEASE_STATUS, REPOSITORY_URL, PRODUCT_SHORT } from '@/lib/site';

import ThemeToggle from '@/components/ThemeToggle';

interface AppHeaderProps {
  onMenuClick?: () => void;
}

export default function AppHeader({ onMenuClick }: AppHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getLinkClass = (href: string) => {
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
    return `rounded-md px-2.5 py-1.5 text-xs font-semibold transition-all duration-150 ${
      isActive
        ? 'bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent-border)] shadow-sm font-bold'
        : 'text-[var(--shell-muted)] hover:text-[var(--shell-text)] hover:bg-[var(--shell-hover)]'
    }`;
  };

  return (
    <header className="sticky top-0 z-40 flex h-[60px] items-center border-b border-[var(--shell-border)] bg-[var(--shell-elevated)]/95 px-4 backdrop-blur-md md:px-6">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        
        {/* Left Side: Mobile Sidebar Toggle + Brand */}
        <div className="flex shrink-0 items-center gap-2">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              aria-label="Toggle sidebar menu"
              className="mr-1 rounded-lg border border-[var(--shell-border)] p-1.5 text-[var(--shell-text)] hover:bg-[var(--shell-hover)] md:hidden"
            >
              <span className="text-sm">☰</span>
            </button>
          )}
          
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)] text-sm text-[var(--on-accent)] shadow-sm" aria-hidden="true">
              ⚡
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-extrabold tracking-tight text-[var(--shell-text)]">{PRODUCT_SHORT}</span>
              <span className="hidden text-[9px] font-medium text-[var(--shell-muted)] sm:inline">AI Engineering Standard</span>
            </span>
            <span className="hidden rounded-full border border-amber-500/35 bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-500 sm:inline-block">
              {RELEASE_STATUS}
            </span>
          </Link>
        </div>

        {/* Center: Inline Typeahead Search (Always present on all pages) */}
        <div className="hidden min-w-[200px] max-w-[400px] flex-1 shrink sm:block md:max-w-[440px] lg:max-w-[480px] mx-3">
          <Search />
        </div>

        {/* Right Side Navigation (Desktop) */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-1.5">
          <Link href="/docs/principles" className={getLinkClass('/docs/principles')}>
            Principles
          </Link>
          <Link href="/docs/roadmap" className={getLinkClass('/docs/roadmap')}>
            Roadmap
          </Link>
          <Link href="/docs/handbook/README" className={getLinkClass('/docs/handbook/README')}>
            Handbook
          </Link>
          <PatternsMegaMenu compact />
          <Link href="/portal" className={getLinkClass('/portal')}>
            Portal
          </Link>
          <Link href="/about" className={getLinkClass('/about')}>
            About
          </Link>
          <a
            href={REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-[11px] font-semibold text-[var(--on-accent)] transition hover:bg-[var(--accent-hover)] hover:shadow-sm"
          >
            GitHub
          </a>
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile Header Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {pathname !== '/' && (
            <div className="w-[120px] xs:w-[150px]">
              <Search />
            </div>
          )}
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="rounded-lg border border-[var(--shell-border)] p-1.5 text-[var(--shell-text)] hover:bg-[var(--shell-hover)]"
          >
            <span className="text-xs">⁝ Menu</span>
          </button>
        </div>
      </div>

      {/* Floating Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="absolute right-4 top-[65px] z-50 w-[240px] rounded-xl border border-[var(--shell-border)] bg-[var(--shell-elevated)] p-3 shadow-xl md:hidden">
          <div className="flex flex-col gap-1.5">
            <Link
              href="/docs/principles"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-semibold text-[var(--shell-text)] hover:bg-[var(--shell-hover)]"
            >
              Principles
            </Link>
            <Link
              href="/docs/roadmap"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-semibold text-[var(--shell-text)] hover:bg-[var(--shell-hover)]"
            >
              Roadmap
            </Link>
            <Link
              href="/docs/handbook/README"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-semibold text-[var(--shell-text)] hover:bg-[var(--shell-hover)]"
            >
              Handbook
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs text-[var(--shell-muted)] hover:text-white hover:bg-[var(--shell-hover)]"
            >
              Portal
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs text-[var(--shell-muted)] hover:text-white hover:bg-[var(--shell-hover)]"
            >
              About
            </Link>
            <div className="border-t border-[var(--shell-border)] my-1" />
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg bg-[var(--accent)] text-center px-3 py-2 text-xs font-bold text-[var(--on-accent)] hover:bg-[var(--accent-hover)]"
            >
              GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
