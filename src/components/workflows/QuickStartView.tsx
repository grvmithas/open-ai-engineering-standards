'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DATA_CLASSES, GOALS, IDES, MATURITIES, MODELS, ROLES, STACKS } from '@/lib/workflows/catalog';
import { buildQuickStart, getPrimaryWorkflowHref } from '@/lib/workflows/quickStart';
import { buildInstallQuery, describeInstallLayout, downloadStarterKitJson, getInstallCommands } from '@/lib/workflows/starterKit';
import type { StarterKitBundle } from '@/lib/workflows/starterKit';
import type { UserProfile } from '@/lib/workflows/types';
import { useUserProfile } from '@/components/providers/UserProfileProvider';
import { FEATURED_PATTERNS } from '@/lib/chrome-nav';

const KIND_LABELS: Record<string, string> = {
  install: 'Install',
  prompt: 'Prompt',
  skill: 'Skill',
  mcp: 'MCP',
  hook: 'Hook',
  agent: 'Agent',
  workflow: 'Workflow',
  checklist: 'Checklist',
  doc: 'Doc',
};

function label(id: string, list: Array<{ id: string; label: string }>) {
  return list.find(x => x.id === id)?.label ?? id;
}

function profileInstallQuery(profile: UserProfile): string {
  return buildInstallQuery(profile);
}

export default function QuickStartView() {
  const { profile, clearProfile, isLoaded } = useUserProfile();
  const [copied, setCopied] = useState<'npx' | 'enhance' | 'ps1' | 'bash' | null>(null);
  const [downloading, setDownloading] = useState(false);

  const recommendations = useMemo(
    () => (profile ? buildQuickStart(profile) : []),
    [profile],
  );

  const commands = useMemo(
    () => (profile ? getInstallCommands(profile) : null),
    [profile],
  );

  const copy = async (which: 'npx' | 'enhance' | 'ps1' | 'bash') => {
    if (!commands) return;
    const text =
      which === 'npx'
        ? commands.npx
        : which === 'enhance'
          ? commands.enhance
          : which === 'ps1'
            ? commands.powershell
            : commands.bash;
    await navigator.clipboard.writeText(text);
    setCopied(which);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const downloadJson = async () => {
    if (!profile || downloading) return;
    setDownloading(true);
    try {
      const query = profileInstallQuery(profile);
      const res = await fetch(`/api/kit?${query}&format=json`);
      if (!res.ok) throw new Error('Kit download failed');
      const bundle = (await res.json()) as StarterKitBundle;
      downloadStarterKitJson(bundle);
    } catch {
      // keep UI quiet — user can retry
    } finally {
      setDownloading(false);
    }
  };

  if (!isLoaded) {
    return <p className="text-sm text-[var(--ink-muted)]">Loading profile...</p>;
  }

  if (!profile) {
    return (
      <div className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] p-8 text-center">
        <p className="font-mono text-sm text-[var(--accent)]">&gt; /start</p>
        <p className="mt-2 text-[var(--ink-secondary)]">No profile yet. Complete Step 1 — Onboarding — to unlock Your kit.</p>
        <Link
          href="/start"
          className="cta-solid mt-4 inline-block rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--on-accent)]"
        >
          Step 1 — Onboarding →
        </Link>
      </div>
    );
  }

  const primaryHref = getPrimaryWorkflowHref(profile);
  const stackEntry = STACKS.find(s => s.id === profile.stack);
  const cookbookId = stackEntry?.cookbookSlug?.match(/^cookbook\/([^/]+)/)?.[1] ?? null;
  const layout = describeInstallLayout(profile.ide, { cookbookId });

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-[var(--accent-border)] bg-[var(--accent-soft)] p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)]">Your profile</p>
        <p className="mt-2 text-sm text-[var(--ink-secondary)]">
          {label(profile.goal, GOALS)} · {label(profile.role, ROLES)} · {label(profile.maturity, MATURITIES)} · {label(profile.ide, IDES)} · {label(profile.model, MODELS)} · {label(profile.dataClass, DATA_CLASSES)} · {label(profile.stack, STACKS)}
        </p>
        <p className="mt-2 text-xs text-[var(--ink-muted)]">
          Maturity only shapes the reading path in <code className="font-mono">AIES.md</code> — the install is always complete.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={primaryHref}
            className="cta-solid inline-flex items-center rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--on-accent)] shadow-sm transition hover:bg-[var(--accent-hover)]"
          >
            Step 3 — Continue workflow →
          </Link>
          <Link
            href="/start"
            className="inline-flex items-center rounded-lg border border-[var(--paper-border)] bg-[var(--paper)] px-4 py-2 text-xs font-semibold text-[var(--ink-secondary)] transition hover:border-[var(--accent-border)]"
          >
            Re-run onboarding
          </Link>
          <button
            type="button"
            onClick={clearProfile}
            className="rounded-lg px-4 py-2 text-xs font-medium text-[var(--ink-muted)] underline-offset-2 hover:text-[var(--ink)] hover:underline"
          >
            Clear profile
          </button>
        </div>
      </div>

      {commands && (
        <section className="rounded-xl border border-[var(--paper-border)] bg-[var(--paper)] p-5">
          <h2 className="text-lg font-bold text-[var(--ink)]">Install into your project</h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Run this in the <strong className="text-[var(--ink-secondary)]">root of your app repo</strong>.
            Kit 2.0 writes files the runtime actually loads: native subagents and commands, open-standard
            skills, an enforcing guard hook, and a parallel-worktree helper, plus the{' '}
            {label(profile.stack, STACKS)} cookbook at repo root.{' '}
            <strong className="text-[var(--ink-secondary)]">
              No <code className="font-mono text-xs">.aies/</code> folder. No MCP server enabled by default.
            </strong>
          </p>

          <div className="mt-3 overflow-x-auto rounded-lg border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-3 text-[11px] leading-relaxed text-[var(--ink-secondary)]">
            <p className="font-semibold text-[var(--ink)]">What gets written</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4 font-mono">
              <li>{layout.rootFiles.join(' · ')}{layout.rootFiles.includes(layout.rulesFile) ? '' : ` · ${layout.rulesFile}`}</li>
              <li>Skills — {layout.skillsDir}/&lt;name&gt;/SKILL.md</li>
              <li>Native — {(layout.ideOnly ?? []).map(d => `${d}/`).join(' · ') || layout.promptsDir}</li>
              <li>Hooks — hooks/aies-guard.mjs → {layout.hooksFile}</li>
              <li>Parallel — scripts/aies-worktree.mjs · plans/_TASK_CONTRACT.md</li>
              <li>Repo root — {layout.cookbookDir}/ · {layout.guidesDir}/ · {layout.mcpsDir}/ · templates/ · reviews/</li>
              <li>{layout.mcpFile ?? 'MCP (user-level for this runtime)'} — empty; see mcps/recommended.json</li>
            </ul>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--ink-secondary)]">1 — Install kit</span>
                <button
                  type="button"
                  onClick={() => copy('npx')}
                  className="rounded border border-[var(--paper-border)] px-2 py-1 text-[10px] font-semibold text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                >
                  {copied === 'npx' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-3 font-mono text-[11px] leading-relaxed text-[#e6edf3]">
                {commands.npx}
              </pre>
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--ink-secondary)]">2 — Enhance for this repo (after install)</span>
                <button
                  type="button"
                  onClick={() => copy('enhance')}
                  className="rounded border border-[var(--paper-border)] px-2 py-1 text-[10px] font-semibold text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                >
                  {copied === 'enhance' ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-[#0d1117] p-3 font-mono text-[11px] leading-relaxed text-[#e6edf3]">
                {commands.enhance}
              </pre>
            </div>
            <details className="rounded-lg border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-3">
              <summary className="cursor-pointer text-xs font-semibold text-[var(--ink-secondary)]">
                Alternative installers (PowerShell / bash one-liners)
              </summary>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-[var(--ink-muted)]">PowerShell</span>
                    <button type="button" onClick={() => copy('ps1')} className="text-[10px] font-semibold text-[var(--accent)]">
                      {copied === 'ps1' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded bg-[#0d1117] p-2 font-mono text-[10px] text-[#e6edf3]">{commands.powershell}</pre>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold text-[var(--ink-muted)]">Bash</span>
                    <button type="button" onClick={() => copy('bash')} className="text-[10px] font-semibold text-[var(--accent)]">
                      {copied === 'bash' ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <pre className="overflow-x-auto rounded bg-[#0d1117] p-2 font-mono text-[10px] text-[#e6edf3]">{commands.bash}</pre>
                </div>
              </div>
            </details>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={downloadJson}
              disabled={downloading}
              className="rounded-lg border border-[var(--paper-border)] px-3 py-2 text-xs font-semibold text-[var(--ink-secondary)] hover:bg-[var(--paper-subtle)] disabled:opacity-50"
            >
              {downloading ? 'Preparing…' : 'Download kit JSON'}
            </button>
            <Link
              href={primaryHref}
              className="cta-solid inline-flex items-center rounded-lg bg-[var(--accent)] px-3 py-2 text-xs font-semibold text-[var(--on-accent)] hover:bg-[var(--accent-hover)]"
            >
              Continue to workflows →
            </Link>
          </div>
        </section>
      )}

      {recommendations.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-[var(--ink)]">Recommended next</h2>
          <ul className="mt-3 space-y-2">
            {recommendations.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg border border-[var(--paper-border)] bg-[var(--paper)] px-4 py-3 transition hover:border-[var(--accent-border)]"
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {KIND_LABELS[item.kind] ?? item.kind}
                  </span>
                  <div className="font-semibold text-[var(--ink)]">{item.title}</div>
                  {item.description ? (
                    <div className="text-xs text-[var(--ink-muted)]">{item.description}</div>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="text-lg font-bold text-[var(--ink)]">Featured patterns</h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {FEATURED_PATTERNS.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-lg border border-[var(--paper-border)] bg-[var(--paper)] p-4 transition hover:border-[var(--accent-border)]"
            >
              <div className="font-semibold text-[var(--ink)]">{p.title}</div>
              <div className="mt-1 text-xs text-[var(--ink-muted)]">{p.outcome}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
