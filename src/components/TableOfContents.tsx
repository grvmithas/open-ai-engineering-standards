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
      (entries) => {
        // Find first visible heading
        const visible = entries.find(entry => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px', // Trigger when heading enters top half of viewport
        threshold: 0.1
      }
    );

    headingElements.forEach(el => observer.observe(el));

    return () => {
      headingElements.forEach(el => observer.unobserve(el));
    };
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="space-y-2 select-none" aria-label="Table of contents">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
        On This Page
      </div>
      <ul className="space-y-2 border-l border-violet-950/20 pl-4 text-xs font-medium">
        {headings.map(h => (
          <li 
            key={h.id}
            style={{ paddingLeft: `${(h.level - 1) * 0.75}rem` }}
          >
            <a
              href={`#${h.id}`}
              className={`block py-0.5 transition duration-150 ${
                activeId === h.id
                  ? 'text-violet-400 font-semibold border-l-2 border-violet-500 -ml-[18px] pl-4'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
