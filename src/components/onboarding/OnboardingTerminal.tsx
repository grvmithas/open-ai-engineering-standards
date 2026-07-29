'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  DATA_CLASSES,
  GOALS,
  IDES,
  MATURITIES,
  MODELS,
  ROLES,
  STACKS,
} from '@/lib/workflows/catalog';
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

const STEPS = ['goal', 'role', 'maturity', 'ide', 'model', 'dataClass', 'stack', 'done'] as const;
type Step = (typeof STEPS)[number];

function labelForGoal(id: UserGoal) {
  return GOALS.find(g => g.id === id)?.label ?? id;
}

function labelForRole(id: UserRole) {
  return ROLES.find(r => r.id === id)?.label ?? id;
}

function labelForMaturity(id: AiMaturity) {
  return MATURITIES.find(m => m.id === id)?.label ?? id;
}

function labelForIde(id: UserIde) {
  return IDES.find(i => i.id === id)?.label ?? id;
}

function labelForModel(id: ModelProvider) {
  return MODELS.find(m => m.id === id)?.label ?? id;
}

function labelForDataClass(id: DataClass) {
  return DATA_CLASSES.find(d => d.id === id)?.label ?? id;
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
    'AIES Engineering OS v1.0',
    'Type a number or click an option. Your profile is saved locally.',
    '',
    '> /start',
    '',
  ]);
  const draftRef = useRef<Partial<UserProfile>>({});
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const promptedRef = useRef(false);

  useEffect(() => {
    const stack = searchParams.get('stack') as TechStack | null;
    const ide = searchParams.get('ide') as UserIde | null;
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
      case 'role':
        append([
          `✓ Goal: ${labelForGoal(draft.goal!)}`,
          '',
          'Step 2 — Choose your role:',
          ...ROLES.map((r, i) => `  ${i + 1}. ${r.label}`),
          '',
        ]);
        break;
      case 'maturity':
        append([
          `✓ Role: ${labelForRole(draft.role!)}`,
          '',
          'Step 3 — AI experience:',
          ...MATURITIES.map((m, i) => `  ${i + 1}. ${m.label} — ${m.hint}`),
          '',
        ]);
        break;
      case 'ide':
        append([
          `✓ Experience: ${labelForMaturity(draft.maturity!)}`,
          '',
          'Step 4 — Select your IDE:',
          ...IDES.map((i, idx) => `  ${idx + 1}. ${i.label}`),
          '',
        ]);
        break;
      case 'model':
        append([
          `✓ IDE: ${labelForIde(draft.ide!)}`,
          '',
          'Step 5 — Model / provider:',
          ...MODELS.map((m, i) => `  ${i + 1}. ${m.label} — ${m.hint}`),
          '',
        ]);
        break;
      case 'dataClass':
        append([
          `✓ Model: ${labelForModel(draft.model!)}`,
          '',
          'Step 6 — Data classification:',
          ...DATA_CLASSES.map((d, i) => `  ${i + 1}. ${d.label} — ${d.hint}`),
          '',
        ]);
        break;
      case 'stack':
        append([
          `✓ Data class: ${labelForDataClass(draft.dataClass!)}`,
          '',
          'Step 7 — Technology stack:',
          ...STACKS.map((s, i) => `  ${i + 1}. ${s.label}`),
          '',
        ]);
        break;
      case 'done':
        append([
          `✓ Stack: ${labelForStack(draft.stack!)}`,
          '',
          'Generating Your kit...',
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
        setStep('role');
        promptStep('role', draftRef.current);
        break;
      }
      case 'role': {
        const item = ROLES[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, role: item.id };
        setStep('maturity');
        promptStep('maturity', draftRef.current);
        break;
      }
      case 'maturity': {
        const item = MATURITIES[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, maturity: item.id };
        setStep('ide');
        promptStep('ide', draftRef.current);
        break;
      }
      case 'ide': {
        const item = IDES[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, ide: item.id };
        setStep('model');
        promptStep('model', draftRef.current);
        break;
      }
      case 'model': {
        const item = MODELS[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, model: item.id };
        setStep('dataClass');
        promptStep('dataClass', draftRef.current);
        break;
      }
      case 'dataClass': {
        const item = DATA_CLASSES[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, dataClass: item.id };
        setStep('stack');
        promptStep('stack', draftRef.current);
        break;
      }
      case 'stack': {
        const item = STACKS[num];
        if (!item) return;
        draftRef.current = { ...draftRef.current, stack: item.id };
        const next = draftRef.current as UserProfile;
        if (
          !next.goal ||
          !next.role ||
          !next.maturity ||
          !next.ide ||
          !next.model ||
          !next.dataClass ||
          !next.stack
        ) {
          append('Incomplete profile — restart with /start');
          return;
        }
        finish(next);
        break;
      }
      default:
        break;
    }
  }, [step, promptStep, finish, append]);

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
      case 'role': return ROLES;
      case 'maturity': return MATURITIES;
      case 'ide': return IDES;
      case 'model': return MODELS;
      case 'dataClass': return DATA_CLASSES;
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
