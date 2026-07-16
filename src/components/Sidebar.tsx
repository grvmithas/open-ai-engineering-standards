'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, NavItem } from '@/lib/navigation';

interface SidebarProps {
  onLinkClick?: () => void;
}

function containsPath(item: NavItem, pathname: string): boolean {
  return `/docs/${item.slug}` === pathname || Boolean(item.children?.some(child => containsPath(child, pathname)));
}

function initialExpansion(items: NavItem[], pathname: string, expanded: Record<string, boolean> = {}) {
  for (const item of items) {
    if (item.children?.some(child => containsPath(child, pathname))) {
      expanded[item.slug] = true;
      initialExpansion(item.children, pathname, expanded);
    }
  }
  return expanded;
}

function filterNavigation(items: NavItem[], query: string): NavItem[] {
  if (!query) return items;
  return items.flatMap(item => {
    const children = item.children ? filterNavigation(item.children, query) : [];
    const matches = item.title.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query);
    return matches || children.length > 0 ? [{ ...item, children: children.length > 0 ? children : undefined }] : [];
  });
}

export default function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    () => initialExpansion(navigation, pathname),
  );
  const normalizedQuery = query.trim().toLowerCase();
  const visibleNavigation = useMemo(() => filterNavigation(navigation, normalizedQuery), [normalizedQuery]);

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const href = `/docs/${item.slug}`;
    const isActive = pathname === href;
    const hasChildren = !!item.children && item.children.length > 0;
    const isExpanded =
      Boolean(normalizedQuery) ||
      expandedCategories[item.slug] ||
      Boolean(item.children?.some(child => containsPath(child, pathname)));

    return (
      <li key={`${item.slug}-${depth}`}>
        <div className="flex items-center justify-between group">
          {hasChildren ? (
            <div
              className={`w-full flex items-center rounded-lg text-xs font-semibold select-none transition duration-150 ${
                isActive 
                  ? 'bg-violet-950/20 text-violet-300 border border-violet-950/30' 
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Link
                href={href}
                onClick={onLinkClick}
                className="flex min-w-0 flex-1 items-center gap-2 py-1.5 pl-3"
                style={{ paddingLeft: `${0.75 + depth * 0.65}rem` }}
              >
                {item.icon && <span className="text-sm">{item.icon}</span>}
                <span className="truncate">{item.title}</span>
                {item.badge && (
                  <span className="badge badge-purple px-1 py-0.5 text-[8px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
              <button
                type="button"
                onClick={() => toggleCategory(item.slug)}
                aria-expanded={Boolean(isExpanded)}
                aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`}
                className="p-2.5"
              >
              <span className={`text-[10px] text-slate-500 transition duration-150 ${isExpanded ? 'rotate-90' : ''}`}>
                ▶
              </span>
              </button>
            </div>
          ) : (
            <Link
              href={href}
              onClick={onLinkClick}
              className={`w-full flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition duration-150 ${
                isActive 
                  ? 'bg-violet-950/35 text-violet-300 border border-violet-950/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
              style={{ paddingLeft: `${0.75 + depth * 0.65}rem` }}
            >
              {item.icon && <span className="text-sm">{item.icon}</span>}
              <span>{item.title}</span>
              {item.badge && (
                <span className="badge badge-purple px-1 py-0.5 text-[8px] font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1 border-l border-violet-950/20">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav aria-label="Documentation">
      <label className="mb-3 grid gap-1.5 px-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        Filter navigation
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Title or path…"
          className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-normal normal-case tracking-normal text-white outline-none placeholder:text-slate-600 focus:border-violet-700 focus:ring-2 focus:ring-violet-700/20"
        />
      </label>
      <ul className="space-y-1">
        {visibleNavigation.map(item => renderNavItem(item))}
      </ul>
      {visibleNavigation.length === 0 && (
        <p className="px-3 py-4 text-center text-xs text-slate-500">No navigation entries match.</p>
      )}
    </nav>
  );
}
