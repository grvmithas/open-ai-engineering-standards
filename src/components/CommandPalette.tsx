'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';
import { STATIC_COMMAND_INDEX, parseNaturalLanguageQuery } from '@/lib/workflows/commandIndex';

interface SearchDoc {
  slug: string;
  title: string;
  description: string;
  text: string;
}

type PaletteItem = {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  group: string;
};

const GROUP_LABELS: Record<string, string> = {
  action: 'Actions',
  workflow: 'Workflows',
  stack: 'Stacks',
  ide: 'IDEs',
  doc: 'Documentation',
  search: 'Search',
};

interface CommandPaletteProps {
  /** Show inline search trigger (docs header). Hidden on pages that use hero command entry. */
  showTrigger?: boolean;
  className?: string;
}

export default function CommandPalette({ showTrigger = false, className }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loadedDocs, setDocs] = useState<SearchDoc[] | null>(null);
  const docs = useMemo(() => loadedDocs ?? [], [loadedDocs]);
  const isLoading = isOpen && loadedDocs === null;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

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
    if (!isOpen || loadedDocs !== null) return;
    fetch('/search-index.json')
      .then(res => res.json())
      .then((data: SearchDoc[]) => setDocs(data))
      .catch(() => setDocs([]));
  }, [isOpen, loadedDocs]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      window.clearTimeout(timeout);
      (previouslyFocused ?? trigger)?.focus();
    };
  }, [isOpen]);

  const staticResults = useMemo<PaletteItem[]>(() => {
    if (!query.trim()) {
      return STATIC_COMMAND_INDEX.slice(0, 12).map(c => ({
        id: c.id,
        title: c.title,
        subtitle: c.subtitle,
        href: c.href,
        group: c.group,
      }));
    }

    const fuse = new Fuse(STATIC_COMMAND_INDEX, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'subtitle', weight: 0.2 },
        { name: 'keywords', weight: 0.3 },
      ],
      threshold: 0.35,
      ignoreLocation: true,
    });

    return fuse.search(query).slice(0, 8).map(r => ({
      id: r.item.id,
      title: r.item.title,
      subtitle: r.item.subtitle,
      href: r.item.href,
      group: r.item.group,
    }));
  }, [query]);

  const docResults = useMemo<PaletteItem[]>(() => {
    if (!query.trim() || docs.length === 0) return [];
    const fuse = new Fuse(docs, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'description', weight: 0.2 },
        { name: 'text', weight: 0.1 },
      ],
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
    return fuse.search(query).slice(0, 6).map(res => ({
      id: `doc-${res.item.slug}`,
      title: res.item.title,
      subtitle: res.item.description,
      href: `/docs/${res.item.slug}`,
      group: 'search',
    }));
  }, [query, docs]);

  const nlHint = useMemo(() => parseNaturalLanguageQuery(query), [query]);

  const results = useMemo(() => {
    const merged = [...staticResults, ...docResults];
    const seen = new Set<string>();
    return merged.filter(item => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    }).slice(0, 14);
  }, [staticResults, docResults]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(href);
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
      if (nlHint.action && query.toLowerCase().includes('i am')) {
        const params = new URLSearchParams();
        if (nlHint.stack) params.set('stack', nlHint.stack);
        if (nlHint.ide) params.set('ide', nlHint.ide);
        handleSelect(`/start?${params.toString()}`);
        return;
      }
      if (results[selectedIndex]) handleSelect(results[selectedIndex].href);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  const resultsWithIndex = useMemo(() => {
    return results.map((item, index) => ({ ...item, index }));
  }, [results]);

  const grouped = useMemo(() => {
    const map = new Map<string, Array<PaletteItem & { index: number }>>();
    for (const item of resultsWithIndex) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return map;
  }, [resultsWithIndex]);

  return (
    <>
      {showTrigger && (
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(true)}
          className={className ?? 'flex w-full cursor-pointer items-center justify-between rounded-lg border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-3 py-1.5 text-left text-xs text-[var(--shell-muted)] outline-none transition duration-150 hover:border-[var(--accent)] hover:bg-[var(--shell-hover)] hover:text-[var(--shell-text)]'}
          aria-label="Open command palette"
        >
          <span className="flex items-center gap-2">
            <span className="font-mono text-[var(--accent)]">&gt;</span>
            <span>Command palette...</span>
          </span>
          <kbd className="hidden rounded border border-[var(--shell-border)] bg-[var(--shell-elevated)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--shell-muted)] md:inline-block">
            Ctrl+K
          </kbd>
        </button>
      )}

      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/55 px-4 pt-[8vh] backdrop-blur-sm"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="command-palette-title"
            className="w-full max-w-2xl overflow-hidden rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] text-[var(--ink)] shadow-2xl"
          >
            <h2 id="command-palette-title" className="sr-only">Command palette</h2>
            <div className="flex items-center gap-3 border-b border-[var(--paper-border)] px-4 py-3.5">
              <span className="font-mono text-sm font-bold text-[var(--accent)]">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Try: React, Cursor, Performance, /start, RAG..."
                aria-label="Command query"
                className="w-full border-none bg-transparent font-mono text-sm text-[var(--ink)] outline-none placeholder:text-[var(--ink-muted)]"
              />
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close command palette"
                className="rounded border border-[var(--paper-border)] bg-[var(--paper-subtle)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)]"
              >
                ESC
              </button>
            </div>

            {nlHint.stack || nlHint.ide ? (
              <div className="border-b border-[var(--paper-border)] bg-[var(--accent-soft)] px-4 py-2 text-xs text-[var(--primary-dark)]">
                Detected profile hint — press Enter to open <strong>/start</strong>
                {nlHint.stack ? ` with ${nlHint.stack}` : ''}
                {nlHint.ide ? ` + ${nlHint.ide}` : ''}
              </div>
            ) : null}

            <div className="max-h-[420px] overflow-y-auto p-2">
              {isLoading && query.trim() !== '' ? (
                <div className="flex items-center justify-center gap-3 py-10 text-xs text-[var(--ink-muted)]">
                  <div className="spinner" />
                  <span>Loading search index...</span>
                </div>
              ) : results.length === 0 ? (
                <div className="py-10 text-center text-xs text-[var(--ink-muted)]">
                  {query.trim() === '' ? (
                    <>
                      <p className="mb-2 font-mono text-[var(--ink-secondary)]">&gt; /start</p>
                      <p>Type a stack, workflow, or doc topic. Natural language works too.</p>
                    </>
                  ) : (
                    <>No matches — try <button type="button" className="text-[var(--accent)] underline" onClick={() => handleSelect('/start')}>onboarding</button></>
                  )}
                </div>
              ) : (
                Array.from(grouped.entries()).map(([group, items]) => (
                  <div key={group} className="mb-2">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                      {GROUP_LABELS[group] ?? group}
                    </div>
                    <div className="space-y-0.5">
                      {items.map(item => (
                          <button
                            key={item.id}
                            onClick={() => handleSelect(item.href)}
                            onMouseEnter={() => setSelectedIndex(item.index)}
                            className={`flex w-full flex-col rounded-lg px-3 py-2.5 text-left transition duration-150 ${
                              item.index === selectedIndex
                                ? 'border border-[var(--accent-border)] bg-[var(--accent-soft)]'
                                : 'border border-transparent hover:bg-[var(--paper-subtle)]'
                            }`}
                          >
                            <span className="text-xs font-semibold text-[var(--ink)]">{item.title}</span>
                            {item.subtitle ? (
                              <span className="line-clamp-1 text-[11px] text-[var(--ink-muted)]">{item.subtitle}</span>
                            ) : null}
                          </button>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[var(--paper-border)] bg-[var(--paper-subtle)] px-4 py-2 text-[10px] text-[var(--ink-muted)]">
              <div className="flex items-center gap-3">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> open</span>
                <span><kbd className="font-mono">esc</kbd> close</span>
              </div>
              <span className="font-mono">AIES OS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
