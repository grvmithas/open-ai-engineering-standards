'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GOALS, IDES, STACKS, normalizeUserIde } from '@/lib/workflows/catalog';
import type {
  AiMaturity,
  DataClass,
  ModelProvider,
  TechStack,
  UserGoal,
  UserIde,
  UserProfile,
  UserRole,
} from '@/lib/workflows/types';
import { useUserProfile } from '@/components/providers/UserProfileProvider';

const STEPS = ['goal', 'ide', 'stack', 'done'] as const;
type Step = (typeof STEPS)[number];

function labelForGoal(id: UserGoal) {
  return GOALS.find(g => g.id === id)?.label ?? id;
}

function labelForIde(id: UserIde) {
  return IDES.find(i => i.id === id)?.label ?? id;
}

function labelForStack(id: TechStack) {
  return STACKS.find(s => s.id === id)?.label ?? id;
}

export default function OnboardingTerminal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { saveProfile } = useUserProfile();
  const [step, setStep] = useState<Step>('goal');
  const [history, setHistory] = useState<string[]>([
    'AIES Engineering OS · kit 2.0',
    'Streamlined Onboarding — 3 quick steps to scaffold your AI harness.',
    '',
    '> /start',
    '',
  ]);
  const draftRef = useRef<Partial<UserProfile>>({
    role: 'fullstack',
    maturity: 'intermediate',
    model: 'claude',
    dataClass: 'internal',
  });
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptedRef = useRef(false);

  useEffect(() => {
    const stack = searchParams.get('stack') as TechStack | null;
    const ide = normalizeUserIde(searchParams.get('ide'));
    const model = searchParams.get('model') as ModelProvider | null;
    const dataClass = (searchParams.get('dataClass') ?? searchParams.get('data-class')) as DataClass | null;
    if (stack || ide || model || dataClass) {
      draftRef.current = {
        ...draftRef.current,
        ...(stack ? { stack } : {}),
        ...(ide ? { ide } : {}),
        ...(model ? { model } : {}),
        ...(dataClass ? { dataClass } : {}),
      };
    }
  }, [searchParams]);

  const append = useCallback((lines: string | string[]) => {
    setHistory(prev => [...prev, ...(Array.isArray(lines) ? lines : [lines])]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, step]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [step]);

  const promptStep = useCallback((s: Step, draft: Partial<UserProfile>) => {
    switch (s) {
      case 'goal':
        append([
          'Step 1 — Choose your goal:',
          ...GOALS.map((g, i) => `  ${i + 1}. ${g.label} — ${g.hint}`),
          '',
        ]);
        break;
      case 'ide':
        append([
          `✓ Goal: ${labelForGoal(draft.goal!)}`,
          '',
          'Step 2 — Select your IDE:',
          ...IDES.map((i, idx) => `  ${idx + 1}. ${i.label}`),
          '',
        ]);
        break;
      case 'stack':
        append([
          `✓ IDE: ${labelForIde(draft.ide!)}`,
          '',
          'Step 3 — Select your Technology stack:',
          ...STACKS.map((s, i) => `  ${i + 1}. ${s.label}`),
          '',
        ]);
        break;
      case 'done':
        append([
          `✓ Stack: ${labelForStack(draft.stack!)}`,
          '',
          'Scaffolding your IDE harness kit...',
          '→ Redirecting to /quickstart',
          '',
        ]);
        break;
    }
  }, [append]);

  useEffect(() => {
    if (step === 'goal' && !promptedRef.current) {
      promptedRef.current = true;
      promptStep('goal', draftRef.current);
    }
  }, [step, promptStep]);

  const finish = useCallback((profile: UserProfile) => {
    saveProfile(profile);
    setStep('done');
    promptStep('done', profile);
    window.setTimeout(() => router.push('/quickstart'), 900);
  }, [saveProfile, router, promptStep]);

  const selectByIndex = useCallback((n: number) => {
    const num = n - 1;
    switch (step) {
      case 'goal': {
        const item = GOALS[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, goal: item.id };

        // Handle Direct Content Redirect Goals
        if (item.id === 'browse-standards') {
          append([`✓ Goal: ${item.label}`, '→ Directing to Standards Portal...', '']);
          window.setTimeout(() => router.push('/portal'), 500);
          return;
        }
        if (item.id === 'explore-examples') {
          append([`✓ Goal: ${item.label}`, '→ Directing to Cookbooks & Recipes...', '']);
          window.setTimeout(() => router.push('/docs/cookbook/README'), 500);
          return;
        }
        if (item.id === 'learn') {
          append([`✓ Goal: ${item.label}`, '→ Directing to Practitioner Handbook...', '']);
          window.setTimeout(() => router.push('/docs/handbook/README'), 500);
          return;
        }

        setStep('ide');
        promptStep('ide', draftRef.current);
        break;
      }
      case 'ide': {
        const item = IDES[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, ide: item.id };
        setStep('stack');
        promptStep('stack', draftRef.current);
        break;
      }
      case 'stack': {
        const item = STACKS[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, stack: item.id };
        const next = {
          role: 'fullstack' as UserRole,
          maturity: 'intermediate' as AiMaturity,
          model: 'claude' as ModelProvider,
          dataClass: 'internal' as DataClass,
          ...draftRef.current,
        } as UserProfile;

        finish(next);
        break;
      }
      default:
        break;
    }
  }, [step, promptStep, finish, append, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    append(`> ${trimmed}`);
    setInput('');

    const asNum = parseInt(trimmed, 10);
    if (!Number.isNaN(asNum) && asNum >= 1) {
      selectByIndex(asNum);
      return;
    }

    if (trimmed === '/back' && step !== 'goal') {
      const idx = STEPS.indexOf(step);
      if (idx > 0) {
        const prev = STEPS[idx - 1];
        setStep(prev);
        append(`← back to ${prev}`);
        promptStep(prev, draftRef.current);
      }
      return;
    }

    append('Invalid input — enter a number from the list, or /back');
  };

  const options = useMemo(() => {
    switch (step) {
      case 'goal': return GOALS;
      case 'ide': return IDES;
      case 'stack': return STACKS;
      default: return [];
    }
  }, [step]);

  return (
    <div className="mx-auto max-w-3xl">
      <div
        className="overflow-hidden rounded-xl border border-[var(--shell-border)] bg-[#0d1117] font-mono text-sm shadow-2xl"
        style={{ minHeight: 420 }}
      >
        <div className="flex items-center gap-2 border-b border-[var(--shell-border)] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs text-[var(--shell-muted)]">aies — onboarding</span>
        </div>

        <div className="max-h-[480px] overflow-y-auto p-4 leading-relaxed text-[#e6edf3]">
          {history.map((line, i) => (
            <div key={`${i}-${line.slice(0, 12)}`} className={line.startsWith('>') ? 'text-[#79c0ff]' : line.startsWith('✓') ? 'text-emerald-400' : 'text-[#c9d1d9]'}>
              {line || '\u00A0'}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {step !== 'done' && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-[var(--shell-border)] px-4 py-3">
            <span className="text-[#79c0ff]">&gt;</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={step === 'goal' ? '1-6 or click below' : 'number or /back'}
              className="flex-1 bg-transparent text-[#e6edf3] outline-none placeholder:text-[var(--shell-muted)]"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        )}
      </div>

      {step !== 'done' && options.length > 0 && (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {options.map((opt, i) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                append(`> ${i + 1}`);
                selectByIndex(i + 1);
              }}
              className="rounded-lg border border-[var(--paper-border)] bg-[var(--paper)] px-4 py-3 text-left text-sm text-[var(--ink)] transition hover:border-[var(--accent-border)] hover:bg-[var(--accent-soft)]"
            >
              <span className="font-mono text-xs text-[var(--accent)]">{i + 1}.</span>{' '}
              <span className="font-semibold">{'label' in opt ? opt.label : ''}</span>
              {'hint' in opt && opt.hint ? (
                <span className="mt-0.5 block text-xs text-[var(--ink-muted)]">{opt.hint}</span>
              ) : null}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
