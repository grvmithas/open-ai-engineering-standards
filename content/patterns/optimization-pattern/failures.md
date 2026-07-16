# Optimization: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Optimization failures operationalizes this pattern outcome: improve a profiled bottleneck while protecting correctness and downstream guardrails.

| Failure | Observable signal | Recovery |
|---|---|---|
| optimize intuition | changed code is not dominant cost | profile first |
| average-only win | p99 or variance regresses | measure distributions |
| microbenchmark victory | end-to-end cost shifts elsewhere | run system benchmark |
| cache without bounds | memory and staleness become failures | set eviction and freshness invariants |

## Rollback failure

Optimization failures rollback failure gate 2 is accepted only when "approved effect size reached with confidence interval" is source-verifiable; otherwise, disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.

## Tradeoffs

Optimization failures deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization failures rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization failures governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for optimize intuition
- [ ] Detection exists for average-only win
- [ ] Detection exists for microbenchmark victory
- [ ] Detection exists for cache without bounds

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
