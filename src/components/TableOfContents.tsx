'use client';

import { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headingElements = headings.map(h => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 },
    );

    headingElements.forEach(el => observer.observe(el));
    return () => headingElements.forEach(el => observer.unobserve(el));
  }, [headings]);

  if (headings.length === 0) return null;

  const baseLevel = Math.min(...headings.map(h => h.level));

  return (
    <nav className="select-none" aria-label="Table of contents">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--ink-muted)]">
        On This Page
      </div>
      <ul className="border-l border-[var(--paper-border)] text-xs font-medium">
        {headings.map(h => {
          const isActive = activeId === h.id;
          const depth = Math.max(0, h.level - baseLevel);
          return (
            <li key={h.id} className="relative">
              {isActive && (
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 left-[-1.5px] w-[2px] bg-[var(--accent)]"
                />
              )}
              <a
                href={`#${h.id}`}
                className={`block py-1.5 transition duration-150 ${
                  isActive
                    ? 'font-semibold text-[var(--accent)]'
                    : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
                style={{ paddingLeft: `${0.9 + depth * 0.7}rem` }}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
