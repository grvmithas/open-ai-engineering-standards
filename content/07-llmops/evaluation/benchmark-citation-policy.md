# Benchmark Citation Policy

> **Version:** 1.0.0
> **Last updated:** 2026-11-06
> **Status:** Normative AIES operating standard. Benchmark status is a dated snapshot; the registry below is re-verified quarterly.

## Purpose

Decide what public benchmark scores may be used for, which benchmarks may be cited at all, and how to cite them. The goal is that model selection, vendor claims, and AIES documents never rest on saturated, contaminated, or harness-dependent numbers.

## Why

Public benchmarks decay. Once a benchmark is popular:

- its tasks leak into training data (contamination);
- frontier models cluster near the ceiling (saturation);
- labs tune harnesses and scaffolds to it, so the score measures the harness as much as the model.

By late 2026:

- **SWE-bench Verified** is saturated and contaminated. Vals archived it, and OpenAI stopped reporting it in February 2026.
- **The SWE-bench Pro public split** was reportedly about 30% broken. Pro V2 is near ceiling on the public set but shows a gap of roughly 18 points against its private set. That gap is contamination made visible.
- **Terminal-Bench 2.1** is saturating, with frontier scores of 74–84%. The same model moves by about 3 points depending on the harness.
- **Memory benchmarks** (LoCoMo, LongMemEval): vendor-reported scores don't agree with independent reruns.

A team that picks a model, approves a vendor, or writes a standard on these numbers is optimizing for someone else's test set. Your outcome depends on your tasks, your harness, and your data, and only your private evals measure those ([evaluating coding agents](../../handbook/evaluating-coding-agents.md)).

## When

| Decision | Public benchmarks may | Public benchmarks may not |
|---|---|---|
| Building a shortlist of candidate models | Narrow the field to 2–4 candidates | Pick the winner |
| Model upgrade or release decision | Nothing | Be cited as evidence; use the private eval suite ([model lifecycle](../model-lifecycle.md)) |
| Vendor or tool procurement | Prompt questions about the vendor's harness and holdouts | Substitute for a pilot on your own tasks |
| AIES documents and internal standards | Illustrate a trend, with the benchmark tier and caveats below | Justify a normative requirement |
| Marketing or external claims | Appear only with the harness, date, and split disclosed | Be compared across different harnesses |

## How

### 1. Classify every benchmark before citing it

| Tier | Meaning | How to cite |
|---|---|---|
| **Discriminating** | Still separates frontier models; has a private or refreshed holdout | Score, split, harness, date, and source |
| **Saturating** | Frontier scores cluster within a few points; harness variance is comparable to model gaps | Only with harness disclosure and a variance note; never as a ranking |
| **Retired** | Saturated, contaminated, or broken | Do not cite as evidence; mention only historically |

### 2. Registry (snapshot 2026-11-06)

| Benchmark | Domain | Tier | Note |
|---|---|---|---|
| FrontierCode 2.0 | Agentic coding | Discriminating | Separates current frontier models |
| SWE-bench Pro V2 — Hard | Agentic coding | Discriminating | Cite the private-set result where published |
| SWE-bench Pro V2 — public set | Agentic coding | Saturating | About 18-point public–private gap; contamination signal |
| Terminal-Bench 2.1 | Agentic terminal tasks | Saturating | 74–84% frontier band; ±3 points by harness; reward hacking now recorded as 0 |
| tau-bench–style end-state tasks | Tool-using agents | Method, not a score | Use the method (goal-state checks) in private evals; don't rank models on public numbers |
| LoCoMo, LongMemEval | Agent memory | Saturating | Vendor scores aren't comparable; independent reruns differ by 10–20 points |
| MTEB and embedding leaderboards | Retrieval | Saturating | Aggregator-run; re-test on your own corpus |
| SWE-bench Verified | Agentic coding | **Retired** | Saturated and contaminated; archived by Vals; dropped by OpenAI in February 2026 |
| SWE-bench Pro (original public split) | Agentic coding | **Retired** | About 30% of tasks reportedly broken |
| HumanEval, MBPP | Code generation | **Retired** | Saturated for years; contaminated |

### 3. Cite with the full context

Every benchmark citation in an AIES document, ADR, or vendor evaluation includes:

```text
<benchmark> <version/split> — <score> — harness: <scaffold, tools, attempts, time limit> — <date> — <source URL> — tier: <discriminating|saturating>
```

A number without its harness and split is not a citation.

### 4. Make the decision on private evals

1. Shortlist 2–4 models using discriminating benchmarks, plus cost, latency, data terms, and the context window.
2. Run the shortlist on the private eval suite: your tasks, your harness, scored on outcome (tests pass, end state reached, reviewer accepts). See [framework selection](./framework-selection.md) and [golden set management](./golden-set-management.md).
3. Keep a **private holdout**: at least 20% of eval cases that never appear in prompts, fine-tuning data, or vendor-shared material. Rotate a slice each quarter, because cases leak through logs and shared traces.
4. Report the decision with eval deltas, cost per task, and confidence intervals, not leaderboard ranks.

### 5. Enforce

- `scripts/profile-content.mjs` flags retired benchmarks cited as evidence in AIES content. Lines that describe them as retired, saturated, or contaminated are exempt.
- Reviewers reject ADRs and model-change PRs whose only evidence is a public benchmark.
- Re-verify the registry every quarter, alongside the [model lifecycle](../model-lifecycle.md) review.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Public benchmarks only for shortlisting | No decisions on contaminated numbers | You must build and maintain a private eval suite |
| Mandatory harness disclosure | Citations become reproducible and comparable | Many vendor numbers fail the bar and can't be cited |
| A retired tier with a lint rule | Old numbers stop propagating through docs | Historical discussion needs explicit "retired" framing |
| A rotating private holdout | Detects your own contamination | Fewer cases are available for prompt iteration |

## Anti-patterns

- **"Model X scores 85% on SWE-bench Verified, so we're switching."** It's retired. The score says nothing about your repository.
- **Comparing scores from different harnesses.** A 3-point harness swing is larger than many model gaps on saturating benchmarks.
- **Quoting a vendor's memory-benchmark win.** Independent reruns reorder vendors. Run your own memory eval.
- **Tuning prompts on the holdout.** Once the holdout informs a change, it's a dev set. Rotate it.
- **Citing a benchmark in a normative requirement.** Standards outlive benchmarks; tie requirements to measurable outcomes on your own tasks.

## Enterprise considerations

- **Procurement:** require vendors to disclose harness, split, date, and holdout status for every number in a proposal, and to run a pilot on your tasks before contract.
- **Regulatory evidence:** accuracy and robustness claims for high-risk systems (EU AI Act Article 15) need evidence from the intended purpose and population. Public benchmark scores don't qualify.
- **Governance:** the eval owner, a named role in the [org playbook](../../10-ai-org-playbook/README.md), owns the benchmark registry and the private holdout, and signs off on any external benchmark claim.

## Checklist

- [ ] No model, vendor, or release decision cites a public benchmark as its deciding evidence
- [ ] Every benchmark citation carries split, harness, date, source, and tier
- [ ] No retired benchmark is cited as evidence; the content profiler reports zero hits
- [ ] A private holdout of at least 20% of eval cases exists and is rotated quarterly
- [ ] The registry was re-verified this quarter

## References

- [Scale Labs — SWE-bench Pro V2](https://labs.scale.com/blog/swe-bench-pro-v2)
- [Cognition — FrontierCode 2.0](https://cognition.com/blog/frontier-code-2.0)
- [Agentic coding benchmarks 2026 overview](https://backgrind.com/blog/agentic-coding-benchmarks-2026/)
- [LLM coding benchmarks status](https://www.startrise.io/blog/llm-coding-benchmarks/)
- [OmniMemEval independent memory results](https://github.com/MemTensor/OmniMemEval/blob/main/docs/user_memory/results.md)

Sources accessed 2026-11-06. Several status claims come from secondary reporting; re-check primary sources before citing them externally.

## Changelog

- **1.0.0 — 2026-11-06:** Initial policy. Adds the benchmark tiers and 2026 registry, a citation format, a private-holdout rule, and a content-profiler rule that retires SWE-bench Verified, HumanEval, and MBPP as evidence.
