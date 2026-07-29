'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = () => {
    if (theme === 'system') {
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    }
    if (resolvedTheme === 'dark') {
      return (
        <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      );
    }
    return (
      <svg className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
        title={`Current theme: ${theme}`}
        className="flex items-center gap-1.5 rounded-lg border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-2.5 py-1.5 text-xs text-[var(--shell-text)] transition duration-150 hover:bg-[var(--shell-hover)] hover:text-[var(--accent)]"
      >
        {getIcon()}
        <span className="hidden capitalize sm:inline-block text-[11px] font-medium">{theme}</span>
        <span className="text-[9px] opacity-60">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-36 rounded-xl border border-[var(--shell-border)] bg-[var(--shell-elevated)] p-1 shadow-xl backdrop-blur-md">
          <button
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              theme === 'light'
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'text-[var(--shell-text)] hover:bg-[var(--shell-hover)] hover:text-[var(--accent)]'
            }`}
          >
            <svg className="h-3.5 w-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Light
          </button>
          <button
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              theme === 'dark'
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'text-[var(--shell-text)] hover:bg-[var(--shell-hover)] hover:text-[var(--accent)]'
            }`}
          >
            <svg className="h-3.5 w-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Dark
          </button>
          <button
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              theme === 'system'
                ? 'bg-[var(--accent-soft)] text-[var(--accent)]'
                : 'text-[var(--shell-text)] hover:bg-[var(--shell-hover)] hover:text-[var(--accent)]'
            }`}
          >
            <svg className="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            System
          </button>
        </div>
      )}
    </div>
  );
}
