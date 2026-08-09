'use client';

import { useState } from 'react';
import ShareButtons from './ShareButtons';

const QUESTIONS = [
  {
    id: 1,
    question: 'How do you structure context for AI agents or prompts?',
    options: [
      { text: 'Dump entire monorepos or full folders into context window', score: 0 },
      { text: 'Paste file snippets manually as needed', score: 1 },
      { text: 'Enforce strict file allowlists & progressive disclosure rules', score: 2 },
    ],
  },
  {
    id: 2,
    question: 'How do you manage agent skills and reusable instructions?',
    options: [
      { text: 'Copy-paste instructions into chat or system prompts each turn', score: 0 },
      { text: 'Maintain a central system prompt file in Git', score: 1 },
      { text: 'Modular versioned skills loaded by reference (.skill.md)', score: 2 },
    ],
  },
  {
    id: 3,
    question: 'How do you bound agent iteration loops and API budget spend?',
    options: [
      { text: 'Unbounded retries until human stops or API crashes', score: 0 },
      { text: 'Static max_turns counter in script', score: 1 },
      { text: 'Budget-guard hooks with task-class spend profiles & depth limits', score: 2 },
    ],
  },
  {
    id: 4,
    question: 'How do you test prompt & agent changes before deployment?',
    options: [
      { text: 'Manual spot checks in playground or chat interface', score: 0 },
      { text: 'Simple unit test assertions on model outputs', score: 1 },
      { text: 'Automated CI/CD eval gates (Promptfoo/DeepEval) triggered on PRs', score: 2 },
    ],
  },
  {
    id: 5,
    question: 'What governance & security controls protect your AI harness?',
    options: [
      { text: 'None / default API keys in code', score: 0 },
      { text: 'Basic rate limits and environment variables', score: 1 },
      { text: 'OWASP LLM01 injection bounds, MCP tool schemas, and audit logs', score: 2 },
    ],
  },
];

export default function MaturityQuiz() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);

  const getMaturityTier = (score: number) => {
    if (score <= 3) {
      return {
        level: 'Level 1–2 (Ad-Hoc Prompting)',
        badgeClass: 'border-red-500/40 bg-red-500/10 text-red-400',
        desc: 'High risk of runaway token bills, prompt drift, and silent security gaps.',
        nextStep: 'Adopt the 50/50 rule and context allowlists to contain token waste.',
        docHref: '/docs/00-foundations/03-50-50-rule',
      };
    }
    if (score <= 7) {
      return {
        level: 'Level 3–5 (Agent Automation)',
        badgeClass: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
        desc: 'Solid procedural foundation. Needs automated budget hooks and CI eval gates.',
        nextStep: 'Implement budget-guard.hook.sh and automated eval gates in CI.',
        docHref: '/docs/handbook/evals-as-quality-gates',
      };
    }
    return {
      level: 'Level 6–10 (Production AI Standard)',
      badgeClass: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
      desc: 'Enterprise-grade maturity with evidence-backed governance & audit readiness.',
      nextStep: 'Explore full AIES normative crosswalks and SoA governance controls.',
      docHref: '/portal',
    };
  };

  const tier = getMaturityTier(totalScore);

  const handleSelect = (questionId: number, score: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: score }));
  };

  return (
    <div className="tile-card rounded-3xl border-2 border-[var(--paper-border)] bg-[var(--paper)] p-6 md:p-10 shadow-xl my-10">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-indigo-400 mb-2">
          🎯 Interactive Diagnostic
        </span>
        <h3 className="text-2xl font-black text-[var(--ink)] tracking-tight">
          AI Engineering Maturity Quiz
        </h3>
        <p className="text-xs text-[var(--ink-muted)] mt-1">
          Assess where your engineering team lands on the 10-Level AI Maturity Scale in 60 seconds.
        </p>
      </div>

      {!submitted ? (
        <div className="space-y-6">
          {QUESTIONS.map((q, idx) => (
            <div key={q.id} className="rounded-2xl border border-[var(--paper-border)] bg-[var(--paper-subtle)] p-4 sm:p-5">
              <h4 className="text-sm font-extrabold text-[var(--ink)] mb-3 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[10px] font-mono text-[var(--accent)] font-bold">
                  {idx + 1}
                </span>
                {q.question}
              </h4>
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[q.id] === opt.score;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, opt.score)}
                      className={`w-full text-left text-xs p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)] font-semibold'
                          : 'border-[var(--paper-border)] bg-[var(--paper)] text-[var(--ink-secondary)] hover:border-[var(--accent-border)]'
                      }`}
                    >
                      <span className="mr-2 font-mono text-[var(--ink-muted)]">
                        {isSelected ? '🔘' : '⚪'}
                      </span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <button
            type="button"
            disabled={Object.keys(answers).length < QUESTIONS.length}
            onClick={() => setSubmitted(true)}
            className="w-full rounded-xl bg-[var(--accent)] py-3 text-xs font-black text-[var(--on-accent)] transition-all hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg"
          >
            Calculate Maturity Score ({Object.keys(answers).length}/{QUESTIONS.length}) →
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-[var(--accent-border)] bg-[var(--paper-subtle)] p-6 md:p-8 space-y-6 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--paper-border)] pb-6">
            <div>
              <div className="text-xs font-bold text-[var(--ink-muted)] uppercase tracking-wider mb-1">
                Your AI Maturity Result
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-[var(--ink)]">
                Score: {totalScore} / 10 Points
              </h4>
            </div>

            <span className={`inline-flex items-center px-4 py-2 rounded-full border text-xs font-extrabold uppercase tracking-wider ${tier.badgeClass}`}>
              {tier.level}
            </span>
          </div>

          <div className="space-y-3 text-xs text-[var(--ink-secondary)] leading-relaxed">
            <p><strong className="text-[var(--ink)] font-extrabold">Assessment:</strong> {tier.desc}</p>
            <p><strong className="text-[var(--accent)] font-extrabold">Recommended Next Step:</strong> {tier.nextStep}</p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--paper-border)]">
            <button
              type="button"
              onClick={() => { setSubmitted(false); setAnswers({}); }}
              className="text-xs font-bold text-[var(--ink-muted)] hover:text-[var(--ink)] underline cursor-pointer"
            >
              ← Retake Quiz
            </button>

            <ShareButtons
              title={`Our Team Scored ${totalScore}/10 on the AI Engineering Maturity Quiz (${tier.level})`}
              text={`Just took the AI Engineering Maturity Quiz on ai-standards.dev — our stack landed at ${tier.level} (${totalScore}/10 pts):`}
              url="https://www.ai-standards.dev"
            />
          </div>
        </div>
      )}
    </div>
  );
}
