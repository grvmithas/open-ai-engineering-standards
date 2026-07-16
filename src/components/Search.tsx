'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';

interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  text: string;
}

interface SearchResult {
  slug: string;
  title: string;
  description: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const openSearch = () => setIsOpen(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen || docs.length > 0) return;
    setIsLoading(true);
    fetch('/search-index.json')
      .then(res => res.json())
      .then((data: SearchDoc[]) => setDocs(data))
      .catch(() => setDocs([]))
      .finally(() => setIsLoading(false));
  }, [isOpen, docs.length]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 10);
    const handleDialogKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleDialogKeyDown);
    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener('keydown', handleDialogKeyDown);
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [isOpen]);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim() || docs.length === 0) return [];
    const fuse = new Fuse(docs, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'description', weight: 0.2 },
        { name: 'text', weight: 0.1 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      findAllMatches: true,
      minMatchCharLength: 2,
    });
    return fuse.search(query).slice(0, 8).map(res => ({
      slug: res.item.slug,
      title: res.item.title,
      description: res.item.description,
    }));
  }, [query, docs]);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(`/docs/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) handleSelect(results[selectedIndex].slug);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={openSearch}
        className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[var(--shell-border)] bg-[var(--shell)] px-3 py-1.5 text-left text-xs text-[var(--shell-muted)] outline-none transition duration-150 hover:border-slate-500 hover:text-white md:w-64"
        aria-label="Search documentation"
      >
        <span className="flex items-center gap-2">
          <span>🔍</span>
          <span>Search docs...</span>
        </span>
        <kbd className="hidden rounded border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--shell-muted)] md:inline-block">
          Ctrl+K
        </kbd>
      </button>

      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/55 px-4 pt-[10vh] backdrop-blur-sm"
        >
          {/* White modal — dark ink */}
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            className="w-full max-w-xl overflow-hidden rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] text-[var(--ink)] shadow-2xl"
          >
            <h2 id="search-dialog-title" className="sr-only">Search documentation</h2>
            <div className="flex items-center gap-3 border-b border-[var(--paper-border)] px-4 py-3.5">
              <span className="text-lg">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search standards, failure modes, prompts, tools..."
                aria-label="Search query"
                aria-controls="search-results"
                className="w-full border-none bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-muted)]"
              />
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
                className="rounded border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                ESC
              </button>
            </div>

            <div id="search-results" role="listbox" aria-label="Search results" className="max-h-[350px] overflow-y-auto p-2">
              {isLoading ? (
                <div className="flex items-center justify-center gap-3 py-10 text-xs text-[var(--ink-muted)]">
                  <div className="spinner"></div>
                  <span>Building search index...</span>
                </div>
              ) : query.trim() === '' ? (
                <div className="py-8 text-center text-xs text-[var(--ink-muted)]">
                  Type to start searching the standard...
                </div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center text-xs text-[var(--ink-muted)]">
                  No results found for &ldquo;<span className="font-medium text-[var(--accent)]">{query}</span>&rdquo;
                </div>
              ) : (
                <div className="space-y-1">
                  {results.map((result, idx) => (
                    <button
                      key={result.slug}
                      role="option"
                      aria-selected={idx === selectedIndex}
                      onClick={() => handleSelect(result.slug)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full flex-col rounded-lg p-3 text-left transition duration-150 ${
                        idx === selectedIndex
                          ? 'border border-[var(--accent-border)] bg-[var(--accent-soft)]'
                          : 'border border-transparent hover:bg-[var(--paper-subtle)]'
                      }`}
                    >
                      <span className="mb-0.5 block text-xs font-semibold text-[var(--ink)]">
                        {result.title}
                      </span>
                      <span className="line-clamp-1 text-[11px] text-[var(--ink-muted)]">
                        {result.description}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--paper-border)] bg-[var(--paper-subtle)] px-4 py-2 text-[10px] text-[var(--ink-muted)]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="font-mono">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="font-mono">Enter</kbd> Select
                </span>
              </div>
              <span>AIES Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
