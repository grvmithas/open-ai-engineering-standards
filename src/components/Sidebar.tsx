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
      [slug]: !prev[slug],
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
        <div className="group flex items-center justify-between">
          {hasChildren ? (
            <div
              className={`flex w-full items-center rounded-lg text-xs font-semibold transition duration-150 select-none ${
                isActive
                  ? 'border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--primary-dark)]'
                  : 'text-[var(--shell-muted)] hover:bg-[var(--shell-hover)] hover:text-white'
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
                  <span className="badge badge-teal px-1 py-0.5 text-[8px] font-bold">
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
                <span className={`text-[10px] text-[var(--shell-muted)] transition duration-150 ${isExpanded ? 'rotate-90' : ''}`}>
                  ▶
                </span>
              </button>
            </div>
          ) : (
            <Link
              href={href}
              onClick={onLinkClick}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition duration-150 ${
                isActive
                  ? 'border border-[var(--accent-border)] bg-[var(--accent-soft)] text-[var(--primary-dark)]'
                  : 'text-[var(--shell-muted)] hover:bg-[var(--shell-hover)] hover:text-white'
              }`}
              style={{ paddingLeft: `${0.75 + depth * 0.65}rem` }}
            >
              {item.icon && <span className="text-sm">{item.icon}</span>}
              <span>{item.title}</span>
              {item.badge && (
                <span className="badge badge-teal px-1 py-0.5 text-[8px] font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          )}
        </div>

        {hasChildren && isExpanded && (
          <ul className="mt-1 space-y-1 border-l border-[var(--shell-border)]">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <nav aria-label="Documentation">
      <label className="mb-3 grid gap-1.5 px-1 text-[10px] font-bold uppercase tracking-wider text-[var(--shell-muted)]">
        Filter navigation
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Title or path…"
          className="rounded-lg border border-[var(--shell-border)] bg-[var(--shell)] px-3 py-2 text-xs font-normal normal-case tracking-normal text-white outline-none placeholder:text-[var(--shell-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-blue-500/30"
        />
      </label>
      <ul className="space-y-1">
        {visibleNavigation.map(item => renderNavItem(item))}
      </ul>
      {visibleNavigation.length === 0 && (
        <p className="px-3 py-4 text-center text-xs text-[var(--shell-muted)]">No navigation entries match.</p>
      )}
    </nav>
  );
}
