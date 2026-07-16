# Optimization: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Optimization problem operationalizes this pattern outcome: improve a profiled bottleneck while protecting correctness and downstream guardrails.

## Observable problem

1. When an SLO or unit-cost target is missed, an undocumented assumption can become a production decision.
2. When profiling identifies a dominant resource, an undocumented assumption can become a production decision.
3. When expected growth exhausts capacity, an undocumented assumption can become a production decision.

## Quality boundary

Optimization problem quality boundary gate 2 is accepted only when "approved effect size reached with confidence interval" is source-verifiable; otherwise, disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.

## Tradeoffs

Optimization problem deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization problem rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization problem governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
