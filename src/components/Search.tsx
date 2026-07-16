'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Fuse from 'fuse.js';

interface SearchResult {
  slug: string;
  title: string;
  description: string;
}

interface SearchDocument extends SearchResult {
  text: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<SearchDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Load the static index once so opening the search dialog is immediate.
  useEffect(() => {
    let active = true;

    fetch('/search-index.json')
      .then(res => {
        if (!res.ok) throw new Error(`Search index request failed: ${res.status}`);
        return res.json() as Promise<{ docs?: SearchDocument[] }>;
      })
      .then(data => {
        if (active) setDocs(data.docs ?? []);
      })
      .catch(err => {
        console.error('Failed to load search index:', err);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openSearch = () => {
    setSelectedIndex(0);
    setIsOpen(true);
  };

  // Handle hotkeys (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => {
          if (!prev) setSelectedIndex(0);
          return !prev;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus the dialog, trap keyboard focus, and restore focus on close.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = triggerRef.current;
    const timeout = window.setTimeout(() => inputRef.current?.focus(), 0);
    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !modalRef.current) return;
      const focusable = [...modalRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      )];
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable.at(-1)!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
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
    if (!query.trim() || docs.length === 0) {
      return [];
    }

    const fuse = new Fuse(docs, {
      keys: [
        { name: 'title', weight: 0.7 },
        { name: 'description', weight: 0.2 },
        { name: 'text', weight: 0.1 }
      ],
      threshold: 0.4,
      ignoreLocation: true,
      findAllMatches: true,
      minMatchCharLength: 2
    });

    return fuse.search(query).slice(0, 8).map(res => ({
      slug: res.item.slug,
      title: res.item.title,
      description: res.item.description
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
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].slug);
      }
    }
  };

  // Close modal when clicking outside
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={openSearch}
        className="w-full md:w-64 flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-slate-950/60 hover:bg-slate-900 border border-violet-950/40 hover:border-violet-900/60 rounded-lg transition duration-150 text-left outline-none cursor-pointer"
        aria-label="Search documentation"
      >
        <span className="flex items-center gap-2">
          <span>🔍</span>
          <span>Search docs...</span>
        </span>
        <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-900 border border-slate-800 rounded text-slate-500">
          Ctrl+K
        </kbd>
      </button>

      {/* Search Modal Dialog */}
      {isOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-dialog-title"
            className="w-full max-w-xl bg-slate-900 border border-violet-950/60 rounded-xl shadow-2xl overflow-hidden"
          >
            <h2 id="search-dialog-title" className="sr-only">Search documentation</h2>
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-violet-950/30">
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
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none border-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close search"
                className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-500 hover:text-slate-300"
              >
                ESC
              </button>
            </div>

            {/* Results List */}
            <div id="search-results" role="listbox" aria-label="Search results" className="max-h-[350px] overflow-y-auto p-2">
              {isLoading ? (
                <div className="flex items-center justify-center py-10 gap-3 text-xs text-slate-400">
                  <div className="spinner"></div>
                  <span>Building search index...</span>
                </div>
              ) : query.trim() === '' ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  Type to start searching the standard...
                </div>
              ) : results.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-500">
                  No results found for &ldquo;<span className="text-violet-400 font-medium">{query}</span>&rdquo;
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
                      className={`w-full text-left p-3 rounded-lg flex flex-col transition duration-150 ${
                        idx === selectedIndex
                          ? 'bg-violet-950/30 border border-violet-950/60 text-violet-300'
                          : 'border border-transparent text-slate-300 hover:bg-slate-950/20'
                      }`}
                    >
                      <span className="font-semibold text-xs text-white block mb-0.5">
                        {result.title}
                      </span>
                      <span className="text-[11px] text-slate-400 line-clamp-1">
                        {result.description}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 border-t border-violet-950/20 bg-slate-950/40 flex items-center justify-between text-[10px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="font-mono">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="font-mono">Enter</kbd> Select
                </span>
              </div>
              <span>OAIES Search</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
