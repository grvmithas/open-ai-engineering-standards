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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M8.75 14.5a5.75 5.75 0 1 1 0-11.5 5.75 5.75 0 0 1 0 11.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M13.1 13.1 16.5 16.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function DocSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<SearchDoc[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modKey, setModKey] = useState('Ctrl');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
    setModKey(isApple ? '⌘' : 'Ctrl');
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
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
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const staticResults = useMemo<PaletteItem[]>(() => {
    if (!query.trim()) {
      return STATIC_COMMAND_INDEX.slice(0, 8).map(c => ({
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

    return fuse.search(query).slice(0, 6).map(r => ({
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
    }).slice(0, 10);
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
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
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
    <div ref={containerRef} className="relative w-full">
      <div
        className={`group relative flex w-full items-center rounded-full border bg-gradient-to-b from-[var(--shell-elevated)] to-[var(--shell)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition duration-150 ${
          isOpen
            ? 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
            : 'border-[var(--shell-border)] hover:border-[var(--accent-border)]'
        }`}
      >
        <span className="pointer-events-none absolute left-3 text-[var(--shell-muted)] transition group-focus-within:text-[var(--accent)]">
          <SearchIcon className="h-3.5 w-3.5" />
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={e => {
            setQuery(e.target.value);
            setSelectedIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search standards, workflows…"
          aria-label="Search documentation"
          className="w-full rounded-full bg-transparent py-2 pl-9 pr-16 text-xs text-[var(--shell-text)] outline-none placeholder:text-[var(--shell-muted)]"
        />
        <kbd className="pointer-events-none absolute right-2 hidden items-center gap-0.5 rounded-md border border-[var(--shell-border)] bg-[var(--shell)] px-1.5 py-0.5 font-mono text-[9px] font-medium tracking-wide text-[var(--shell-muted)] sm:inline-flex">
          <span>{modKey}</span>
          <span>K</span>
        </kbd>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(92vw,560px)] overflow-hidden rounded-2xl border border-[var(--paper-border)] bg-[var(--paper)] text-[var(--ink)] shadow-2xl ring-1 ring-black/5">
          {nlHint.stack || nlHint.ide ? (
            <div className="border-b border-[var(--paper-border)] bg-[var(--accent-soft)] px-3.5 py-2 text-[11px] text-[var(--primary-dark)]">
              Profile hint — press Enter to open <strong>/start</strong>
              {nlHint.stack ? ` (${nlHint.stack})` : ''}
            </div>
          ) : null}

          <div className="max-h-[380px] overflow-y-auto p-2">
            {isLoading && query.trim() !== '' ? (
              <div className="flex items-center justify-center gap-2 py-8 text-xs text-[var(--ink-muted)]">
                <div className="spinner" />
                <span>Searching index…</span>
              </div>
            ) : results.length === 0 ? (
              <div className="py-8 text-center text-xs text-[var(--ink-muted)]">
                {query.trim() ? (
                  <>No matches for &quot;{query}&quot;</>
                ) : (
                  <>Type to search docs, workflows, and actions</>
                )}
              </div>
            ) : (
              Array.from(grouped.entries()).map(([group, items]) => (
                <div key={group} className="mb-1.5">
                  <div className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                    {GROUP_LABELS[group] ?? group}
                  </div>
                  <div className="space-y-0.5">
                    {items.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelect(item.href)}
                        onMouseEnter={() => setSelectedIndex(item.index)}
                        className={`flex w-full flex-col rounded-xl px-2.5 py-2 text-left transition duration-150 ${
                          item.index === selectedIndex
                            ? 'border border-[var(--accent-border)] bg-[var(--accent-soft)] font-semibold text-[var(--accent)]'
                            : 'border border-transparent text-[var(--ink)] hover:bg-[var(--paper-subtle)]'
                        }`}
                      >
                        <span className="text-xs font-medium">{item.title}</span>
                        {item.subtitle ? (
                          <span className="mt-0.5 line-clamp-1 text-[10px] text-[var(--ink-muted)] opacity-90">
                            {item.subtitle}
                          </span>
                        ) : null}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[var(--paper-border)] bg-[var(--paper-subtle)] px-3.5 py-2 text-[9px] text-[var(--ink-muted)]">
            <div className="flex items-center gap-3">
              <span>
                <kbd className="rounded border border-[var(--paper-border)] bg-[var(--paper)] px-1 font-mono">↑↓</kbd>{' '}
                navigate
              </span>
              <span>
                <kbd className="rounded border border-[var(--paper-border)] bg-[var(--paper)] px-1 font-mono">↵</kbd>{' '}
                select
              </span>
              <span>
                <kbd className="rounded border border-[var(--paper-border)] bg-[var(--paper)] px-1 font-mono">esc</kbd>{' '}
                close
              </span>
            </div>
            <span className="font-mono font-bold tracking-wide text-[var(--accent)]">AIES</span>
          </div>
        </div>
      )}
    </div>
  );
}
