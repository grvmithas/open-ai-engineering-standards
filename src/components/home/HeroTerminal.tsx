'use client';

import { useState } from 'react';
import { KIT_CLI_COMMAND } from '@/lib/chrome-nav';
import { KIT_VERSION } from '../../../packages/kit-core/lib/options.js';

const SNIPPETS = [
  {
    id: 'cli',
    label: 'CLI Quickstart',
    icon: '⚡',
    command: KIT_CLI_COMMAND,
    desc: 'Interactive: pick stack, agent runtime, and data class — writes native skills, subagents, hooks',
  },
  {
    id: 'claude',
    label: 'Claude Code',
    icon: '🤖',
    command: `${KIT_CLI_COMMAND} --ide claude-code`,
    desc: 'CLAUDE.md, .claude/skills, read-only subagents, guard hook in .claude/settings.json',
  },
  {
    id: 'cursor',
    label: 'Cursor',
    icon: '📐',
    command: `${KIT_CLI_COMMAND} --ide cursor`,
    desc: '.cursor/rules, agents, commands, and a fail-closed guard in .cursor/hooks.json',
  },
];

export default function HeroTerminal() {
  const [activeTab, setActiveTab] = useState('cli');
  const [copied, setCopied] = useState(false);

  const currentSnippet = SNIPPETS.find(s => s.id === activeTab) || SNIPPETS[0];

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(currentSnippet.command);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // fallback
    }
  };

  return (
    <div className="mx-auto max-w-2xl text-left my-8">
      <div className="rounded-2xl border border-slate-800 bg-[#070b14] shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#0d1322] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-2 font-mono text-xs text-slate-400">bash — aies harness setup</span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1">
            {SNIPPETS.map(snippet => (
              <button
                key={snippet.id}
                onClick={() => setActiveTab(snippet.id)}
                type="button"
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === snippet.id
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="mr-1">{snippet.icon}</span>
                {snippet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Command Body */}
        <div className="p-4 sm:p-5 flex items-center justify-between gap-4 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-3 overflow-x-auto py-1 text-slate-200">
            <span className="text-emerald-400 select-none">$</span>
            <code className="text-indigo-200 font-medium whitespace-nowrap">
              {currentSnippet.command}
            </code>
          </div>

          <button
            onClick={handleCopy}
            type="button"
            className="shrink-0 flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-bold text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-400 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <span className="text-emerald-400">✓</span>
                <span className="text-emerald-400 font-bold">Copied</span>
              </>
            ) : (
              <>
                <span>📋</span>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Descriptor sub-bar */}
        <div className="border-t border-slate-800/60 bg-[#090e1a] px-4 py-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
          <span>{currentSnippet.desc}</span>
          <span className="text-indigo-400/80">v{KIT_VERSION}</span>
        </div>
      </div>
    </div>
  );
}
