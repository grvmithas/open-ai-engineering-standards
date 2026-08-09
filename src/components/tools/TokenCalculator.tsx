'use client';

import { useState } from 'react';
import Link from 'next/link';
import ShareButtons from './ShareButtons';

export default function TokenCalculator() {
  const [monthlySpend, setMonthlySpend] = useState<number>(5000);
  const [contextKb, setContextKb] = useState<number>(60);
  const [devCount, setDevCount] = useState<number>(8);

  // Calculations based on AIES handbook "containing-token-waste.md"
  // Progressive disclosure reduces prompt context size by ~80%
  const optimizedContextKb = Math.max(4, Math.round(contextKb * 0.18));
  const tokenSavingsPercent = 82;
  
  // Model routing & budget guard hooks cut overall spend by ~65-70%
  const monthlySavings = Math.round(monthlySpend * 0.68);
  const yearlySavings = monthlySavings * 12;
  const devHoursSavedMonthly = Math.round(devCount * 18);

  return (
    <div className="tile-card rounded-3xl border-2 border-[var(--accent-border)] bg-[var(--paper)] p-6 md:p-10 shadow-xl my-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent-border)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-black uppercase tracking-wider text-[var(--accent)] mb-2">
            🧮 Interactive FinOps Calculator
          </span>
          <h3 className="text-2xl font-black text-[var(--ink)] tracking-tight">
            Token Waste & Cost Savings Calculator
          </h3>
          <p className="text-xs text-[var(--ink-muted)] mt-1">
            Calculate how much your team saves by applying AIES context allowlists, progressive disclosure & model routing.
          </p>
        </div>

        <Link
          href="/docs/handbook/containing-token-waste"
          className="text-xs font-bold text-[var(--accent)] hover:underline"
        >
          Read Token Waste Handbook →
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-12 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Monthly Spend */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold text-[var(--ink)]">
              <label htmlFor="spend-range">Current Monthly LLM Spend:</label>
              <span className="font-mono text-sm text-[var(--accent)] bg-[var(--accent-soft)] px-2 py-0.5 rounded border border-[var(--accent-border)] font-black">
                ${monthlySpend.toLocaleString()}/mo
              </span>
            </div>
            <input
              id="spend-range"
              type="range"
              min="200"
              max="50000"
              step="250"
              value={monthlySpend}
              onChange={e => setMonthlySpend(Number(e.target.value))}
              className="w-full h-2 bg-[var(--paper-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)] border border-[var(--paper-border)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-muted)] mt-1 font-mono">
              <span>$200/mo</span>
              <span>$25,000/mo</span>
              <span>$50,000/mo</span>
            </div>
          </div>

          {/* Slider 2: Context Size */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold text-[var(--ink)]">
              <label htmlFor="context-range">Avg Prompt Context Size:</label>
              <span className="font-mono text-sm text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30 font-black">
                {contextKb} KB / prompt
              </span>
            </div>
            <input
              id="context-range"
              type="range"
              min="10"
              max="200"
              step="5"
              value={contextKb}
              onChange={e => setContextKb(Number(e.target.value))}
              className="w-full h-2 bg-[var(--paper-subtle)] rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-[var(--paper-border)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-muted)] mt-1 font-mono">
              <span>10 KB (compact)</span>
              <span>100 KB (monorepo dump)</span>
              <span>200 KB</span>
            </div>
          </div>

          {/* Slider 3: Dev Count */}
          <div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold text-[var(--ink)]">
              <label htmlFor="dev-range">AI Engineers / Developers:</label>
              <span className="font-mono text-sm text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-black">
                {devCount} engineers
              </span>
            </div>
            <input
              id="dev-range"
              type="range"
              min="1"
              max="50"
              step="1"
              value={devCount}
              onChange={e => setDevCount(Number(e.target.value))}
              className="w-full h-2 bg-[var(--paper-subtle)] rounded-lg appearance-none cursor-pointer accent-emerald-500 border border-[var(--paper-border)]"
            />
            <div className="flex justify-between text-[10px] text-[var(--ink-muted)] mt-1 font-mono">
              <span>1 dev</span>
              <span>25 devs</span>
              <span>50 devs</span>
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-6 rounded-2xl border border-[var(--accent-border)] bg-[var(--paper-subtle)] p-6 space-y-6">
          <div className="border-b border-[var(--paper-border)] pb-4">
            <div className="text-[11px] font-bold text-[var(--ink-muted)] uppercase tracking-wider mb-1">
              Estimated Monthly Savings Under AIES
            </div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-500 tracking-tight">
              ${monthlySavings.toLocaleString()}{' '}
              <span className="text-xs font-normal text-[var(--ink-muted)]">/ month</span>
            </div>
            <div className="text-xs font-bold text-[var(--ink-secondary)] mt-1">
              🎉 ${yearlySavings.toLocaleString()} projected annual API savings
            </div>
          </div>

          {/* Comparison Metrics */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] p-3">
              <div className="text-[10px] text-[var(--ink-muted)] font-mono">Context Reduction</div>
              <div className="text-lg font-black text-indigo-400 mt-0.5">
                {contextKb} KB → {optimizedContextKb} KB
              </div>
              <div className="text-[10px] text-emerald-500 font-bold">{tokenSavingsPercent}% less token noise</div>
            </div>

            <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] p-3">
              <div className="text-[10px] text-[var(--ink-muted)] font-mono">Dev Time Saved</div>
              <div className="text-lg font-black text-sky-400 mt-0.5">
                ~{devHoursSavedMonthly} hrs / mo
              </div>
              <div className="text-[10px] text-[var(--ink-muted)]">Fewer iteration loops</div>
            </div>
          </div>

          {/* Share widget */}
          <div className="pt-2 border-t border-[var(--paper-border)]">
            <ShareButtons
              title={`Token Waste Calculator — Save $${monthlySavings.toLocaleString()}/mo with AIES`}
              text={`Our team calculated a projected $${monthlySavings.toLocaleString()}/mo (${tokenSavingsPercent}% token waste reduction) using the AI Engineering Standard Token Calculator:`}
              url="https://www.ai-standards.dev/docs/handbook/containing-token-waste"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
