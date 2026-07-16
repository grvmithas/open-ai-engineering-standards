# Optimization: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Optimization subagents operationalizes this pattern outcome: improve a profiled bottleneck while protecting correctness and downstream guardrails.

| Subagent | Mandate | Required output |
|---|---|---|
| Profiler | attributes resource consumption to call paths | profiler artifact with source IDs, uncertainty, and stop status |
| Benchmark designer | controls workload, warmup, and variance | benchmark designer artifact with source IDs, uncertainty, and stop status |
| Guardrail analyst | detects shifted latency, cost, or correctness | guardrail analyst artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Optimization specialists receive only sources needed for "Define target metric, guardrails, workload, and minimum useful effect."; the parent retains effect approval and accountability for "approved effect size reached with confidence interval".

## Tradeoffs

Optimization subagents deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization subagents rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization subagents governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Checklist

- [ ] Profiler returned its required evidence
- [ ] Benchmark designer returned its required evidence
- [ ] Guardrail analyst returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
