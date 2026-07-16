'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation, NavItem } from '@/lib/navigation';

interface SidebarProps {
  onLinkClick?: () => void;
}

export default function Sidebar({ onLinkClick }: SidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(() => {
    // Expand categories matching pathname initially
    const initial: Record<string, boolean> = {};
    navigation.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => `/docs/${child.slug}` === pathname);
        if (hasActiveChild || `/docs/${item.slug}` === pathname) {
          initial[item.title] = true;
        }
      }
    });
    return initial;
  });

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderNavItem = (item: NavItem) => {
    const href = `/docs/${item.slug}`;
    const isActive = pathname === href;
    const hasChildren = !!item.children && item.children.length > 0;
    const isExpanded = expandedCategories[item.title];

    return (
      <div key={item.title} className="mb-1">
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
                onClick={() => toggleCategory(item.title)}
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
          <div className="pl-4 mt-1 border-l border-violet-950/20 ml-4 space-y-1">
            {item.children!.map(child => {
              const childHref = `/docs/${child.slug}`;
              const isChildActive = pathname === childHref;

              return (
                <Link
                  key={child.title}
                  href={childHref}
                  onClick={onLinkClick}
                  className={`block py-1.5 px-3 text-[11px] font-medium rounded-md transition duration-150 ${
                    isChildActive
                      ? 'text-violet-300 bg-violet-950/15 border-l-2 border-violet-500 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-950/30'
                  }`}
                >
                  {child.title}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="space-y-1">
      {navigation.map(item => renderNavItem(item))}
    </nav>
  );
}
