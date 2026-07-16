'use client';

import { useState } from 'react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import { REPOSITORY_URL, SITE_VERSION } from '@/lib/site';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#050509]">
      
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 w-full bg-[#050509]/80 backdrop-blur-md border-b border-violet-950/20 h-[60px] flex items-center px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-navigation"
              className="md:hidden p-1.5 rounded-lg border border-violet-950/30 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              <span className="text-base">☰</span>
            </button>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg">⚡</span>
              <span className="font-extrabold text-sm tracking-tight text-white">OAIES</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-violet-950/20 text-violet-300 border border-violet-950/30 rounded font-bold uppercase tracking-wider">
                v{SITE_VERSION}
              </span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-xs md:max-w-md">
            <Search />
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/about"
              className="text-[11px] font-semibold text-slate-300 hover:text-white px-3 py-1.5 border border-violet-950/30 rounded-lg hover:bg-slate-950/40 transition duration-150"
            >
              About
            </Link>
            <a
              href={REPOSITORY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block text-[11px] font-semibold text-slate-300 hover:text-white px-3 py-1.5 border border-violet-950/30 rounded-lg hover:bg-slate-950/40 transition duration-150"
            >
              GitHub
            </a>
          </div>

        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full relative">
        
        {/* ─── Sidebar (Desktop) ─── */}
        <aside className="hidden md:block w-[260px] sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto border-r border-violet-950/15 p-6 scrollbar">
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-3">
                Standard Chapters
              </div>
              <Sidebar />
            </div>
          </div>
        </aside>

        {/* ─── Sidebar (Mobile Drawer) ─── */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <div 
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs" 
            />
            {/* Drawer Content */}
            <div id="mobile-navigation" role="dialog" aria-modal="true" aria-label="Documentation navigation" className="relative w-[280px] bg-[#0c0c16] border-r border-violet-950/30 h-full flex flex-col p-6 overflow-y-auto shadow-2xl z-10">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <span className="font-extrabold text-sm tracking-tight text-white">OAIES</span>
                </Link>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close navigation"
                  className="p-1 rounded-lg border border-violet-950/20 text-slate-400"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 pl-3">
                  Standard Chapters
                </div>
                <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
              </div>
            </div>
          </div>
        )}

        {/* ─── Main Content Wrapper ─── */}
        <main id="main-content" className="flex-1 min-w-0 p-6 md:p-10">
          <div className="max-w-3xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
