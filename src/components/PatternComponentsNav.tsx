'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const COMPONENTS = [
  { file: 'README', label: 'Overview' },
  { file: 'problem', label: 'Problem' },
  { file: 'context', label: 'Context' },
  { file: 'workflow', label: 'Workflow' },
  { file: 'prompt', label: 'Prompt' },
  { file: 'agent', label: 'Agent' },
  { file: 'subagents', label: 'Subagents' },
  { file: 'skills', label: 'Skills' },
  { file: 'mcps', label: 'MCPs' },
  { file: 'hooks', label: 'Hooks' },
  { file: 'checklist', label: 'Checklist' },
  { file: 'examples/example', label: 'Example' },
  { file: 'failures', label: 'Failures' },
  { file: 'enterprise-notes', label: 'Enterprise' },
] as const;

/** In-page nav for pattern envelopes — keeps components discoverable when left nav is README-only. */
export default function PatternComponentsNav({ patternDir }: { patternDir: string }) {
  const pathname = usePathname();
  const base = `/docs/${patternDir}`;

  return (
    <nav
      aria-label="Pattern components"
      className="mb-8 rounded-lg border border-[var(--paper-border)] bg-transparent p-2"
    >
      <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
        This pattern
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {COMPONENTS.map(c => {
          const href = c.file === 'README' ? `${base}/README` : `${base}/${c.file}`;
          const active = pathname === href;
          return (
            <li key={c.file}>
              <Link
                href={href}
                className={`inline-block rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                  active
                    ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                    : 'text-[var(--ink-muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]'
                }`}
              >
                {c.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
