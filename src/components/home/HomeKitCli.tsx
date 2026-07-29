'use client';

import { useState } from 'react';
import { KIT_CLI_COMMAND } from '@/lib/chrome-nav';

/** Copyable CLI — dual-surface USP for cold visitors. */
export default function HomeKitCli() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(KIT_CLI_COMMAND);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto mt-4 flex max-w-xl flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      <pre className="flex-1 overflow-x-auto rounded-lg border border-[var(--shell-border)] bg-[#0d1117] px-3 py-2.5 text-left font-mono text-[11px] text-[#e6edf3]">
        {KIT_CLI_COMMAND}
      </pre>
      <button
        type="button"
        onClick={() => void copy()}
        className="shrink-0 rounded-lg border border-[rgba(147,197,253,0.4)] px-3 py-2 text-xs font-semibold text-[#93c5fd] hover:bg-[rgba(37,99,235,0.15)]"
      >
        {copied ? 'Copied' : 'Copy CLI'}
      </button>
    </div>
  );
}
