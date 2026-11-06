'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, NavItem } from '@/lib/navigation';

interface SidebarProps {
  onLinkClick?: () => void;
}



function itemHref(item: NavItem): string {
  return item.href ?? `/docs/${item.slug}`;
}

/** Exact page match only — used for the single filled active chip. */
function isExactActive(item: NavItem, pathname: string): boolean {
  return itemHref(item) === pathname;
}

/** True if this item's docs folder owns the current path (ancestor or self). */
function isPathUnderItem(item: NavItem, pathname: string): boolean {
  if (!pathname.startsWith('/docs/')) return false;
  const docPath = pathname.slice('/docs/'.length);
  const folder = item.slug.replace(/\/README$/i, '').replace(/\/index$/i, '');
  if (!folder || !folder.includes('/')) return false;
  return docPath === folder || docPath.startsWith(`${folder}/`);
}

function containsPath(item: NavItem, pathname: string): boolean {
  return (
    isExactActive(item, pathname) ||
    isPathUnderItem(item, pathname) ||
    Boolean(item.children?.some(child => containsPath(child, pathname)))
  );
}

function activePatternDir(pathname: string): string | null {
  if (!pathname.startsWith('/docs/patterns/')) return null;
  const rest = pathname.slice('/docs/patterns/'.length);
  const segment = rest.split('/')[0];
  if (!segment?.endsWith('-pattern')) return null;
  return `patterns/${segment}`;
}

function initialExpansion(items: NavItem[], pathname: string, expanded: Record<string, boolean> = {}) {
  for (const item of items) {
    if (item.children?.some(child => containsPath(child, pathname))) {
      expanded[item.slug] = true;
      initialExpansion(item.children, pathname, expanded);
    }
  }
  const patternDir = activePatternDir(pathname);
  if (patternDir) {
    expanded['patterns/README'] = true;
    expanded[`${patternDir}/README`] = true;
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

function leafClass(active: boolean): string {
  if (active) {
    return 'bg-[var(--accent)] text-[var(--on-accent)] font-bold shadow-xs';
  }
  return 'text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]';
}

function branchClass(exact: boolean, inTrail: boolean): string {
  if (exact) {
    return 'text-[var(--sidebar-text)] font-bold';
  }
  if (inTrail) {
    return 'text-[var(--sidebar-text)] font-semibold';
  }
  return 'text-[var(--sidebar-muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--sidebar-text)]';
}

export default function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const [query, setQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    () => initialExpansion(navigation, pathname),
  );
  const [expandedForPath, setExpandedForPath] = useState(pathname);
  if (expandedForPath !== pathname) {
    setExpandedForPath(pathname);
    setExpandedCategories(prev => ({ ...prev, ...initialExpansion(navigation, pathname) }));
  }

  const normalizedQuery = query.trim().toLowerCase();
  const visibleNavigation = useMemo(
    () => filterNavigation(navigation, normalizedQuery),
    [normalizedQuery],
  );

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const href = itemHref(item);
    const exact = isExactActive(item, pathname);
    const inTrail = !exact && containsPath(item, pathname);
    const hasChildren = !!item.children && item.children.length > 0;
    const isExpanded =
      Boolean(normalizedQuery) ||
      expandedCategories[item.slug] ||
      Boolean(item.children?.some(child => containsPath(child, pathname)));
    const pad = { paddingLeft: `${0.75 + depth * 0.7}rem` };

    return (
      <li key={`${item.slug}-${depth}`} className="relative">
        {hasChildren ? (
          <div className={`group flex items-center rounded-md ${branchClass(exact, inTrail)}`}>
            {inTrail || exact ? (
              <span
                aria-hidden
                className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-[var(--accent)]"
              />
            ) : null}
            <Link
              href={href}
              onClick={() => {
                onLinkClick?.();
                // Toggle category expansion when clicking the item link text
                toggleCategory(item.slug);
              }}
              className="flex min-w-0 flex-1 items-center gap-2 py-1.5 pr-1 text-xs font-semibold transition"
              style={pad}
            >
              {item.icon && depth === 0 ? <span className="text-sm opacity-80">{item.icon}</span> : null}
              <span className="truncate">{item.title}</span>
              {item.badge ? (
                <span className="rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wide text-[var(--shell-muted)]">
                  {item.badge}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              onClick={() => toggleCategory(item.slug)}
              aria-expanded={Boolean(isExpanded)}
              aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${item.title}`}
              className="shrink-0 px-2 py-1.5 text-[10px] text-[var(--sidebar-muted)] hover:text-[var(--sidebar-text)]"
            >
              <span className={`inline-block transition duration-150 ${isExpanded ? 'rotate-90' : ''}`}>▶</span>
            </button>
          </div>
        ) : (
          <Link
            href={href}
            onClick={onLinkClick}
            className={`relative flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition ${leafClass(exact)}`}
            style={pad}
          >
            {item.icon && depth === 0 ? <span className="text-sm opacity-80">{item.icon}</span> : null}
            <span className="truncate">{item.title}</span>
            {item.badge ? (
              <span
                className={`rounded px-1 py-0.5 text-[8px] font-bold uppercase tracking-wide ${
                  exact ? 'text-[var(--on-accent)]/80' : 'text-[var(--sidebar-muted)]'
                }`}
              >
                {item.badge}
              </span>
            ) : null}
          </Link>
        )}

        {hasChildren && isExpanded ? (
          <ul className="mt-0.5 space-y-0.5 border-l border-[var(--sidebar-border)] ml-3">
            {item.children!.map(child => renderNavItem(child, depth + 1))}
          </ul>
        ) : null}
      </li>
    );
  };

  return (
    <nav aria-label="Documentation">
      <label className="mb-3 grid gap-1.5 px-1 text-[10px] font-bold uppercase tracking-wider text-[var(--sidebar-muted)]">
        Filter navigation
        <input
          type="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Title or path…"
          className="rounded-lg border border-[var(--sidebar-border)] bg-[var(--sidebar-hover)] px-3 py-2 text-xs font-normal normal-case tracking-normal text-[var(--sidebar-text)] outline-none placeholder:text-[var(--sidebar-muted)] focus:border-[var(--accent)] focus:ring-2 focus:ring-indigo-500/30"
        />
      </label>
      <ul className="space-y-0.5">{visibleNavigation.map(item => renderNavItem(item))}</ul>
      {visibleNavigation.length === 0 ? (
        <p className="px-3 py-4 text-center text-xs text-[var(--sidebar-muted)]">No navigation entries match.</p>
      ) : null}
    </nav>
  );
}
