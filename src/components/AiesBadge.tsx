'use me';
'use client';

import { useState } from 'react';

export default function AiesBadge() {
  const [copied, setCopied] = useState<string | null>(null);

  const markdownSnippet = `[![AIES Compliant](https://img.shields.io/badge/AIES-Compliant-6366f1?style=for-the-badge&logo=shield)](https://www.ai-standards.dev)`;
  const htmlSnippet = `<a href="https://www.ai-standards.dev" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/AIES-Compliant-6366f1?style=for-the-badge&logo=shield" alt="AIES Compliant" /></a>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="tile-card rounded-2xl border-2 border-[var(--accent-border)] bg-[var(--paper)] p-6 md:p-8 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] mb-1">
            Official Repository Badge
          </span>
          <h3 className="text-xl font-extrabold text-[var(--ink)]">AIES Compliant README Badge</h3>
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            Display this badge in your repository README to signal compliance with the AI Engineering Standard.
          </p>
        </div>

        {/* Live Badge Preview */}
        <div className="flex items-center gap-3 rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-3">
          <a href="https://www.ai-standards.dev" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.shields.io/badge/AIES-Compliant-6366f1?style=for-the-badge&logo=shield"
              alt="AIES Compliant Badge"
              className="h-7"
            />
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Markdown Snippet */}
        <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[var(--ink)]">Markdown Code</span>
            <button
              onClick={() => copyToClipboard(markdownSnippet, 'markdown')}
              className="rounded-lg bg-[var(--accent)] px-3 py-1 text-[11px] font-bold text-white transition hover:bg-[var(--accent-hover)]"
            >
              {copied === 'markdown' ? '✓ Copied!' : 'Copy Markdown'}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-[var(--shell)] p-3 text-[11px] text-[var(--shell-text)] font-mono">
            <code>{markdownSnippet}</code>
          </pre>
        </div>

        {/* HTML Snippet */}
        <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[var(--ink)]">HTML Code</span>
            <button
              onClick={() => copyToClipboard(htmlSnippet, 'html')}
              className="rounded-lg border border-[var(--paper-border)] bg-[var(--paper)] px-3 py-1 text-[11px] font-bold text-[var(--ink)] transition hover:border-[var(--accent)]"
            >
              {copied === 'html' ? '✓ Copied!' : 'Copy HTML'}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-lg bg-[var(--shell)] p-3 text-[11px] text-[var(--shell-text)] font-mono">
            <code>{htmlSnippet}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
