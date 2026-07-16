# Optimization: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to improve a profiled bottleneck while protecting correctness and downstream guardrails authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| representative workload | owner, revision, retrieval time, and authority recorded for representative workload |
| profiles and traces | owner, revision, retrieval time, and authority recorded for profiles and traces |
| latency/throughput/cost baseline | owner, revision, retrieval time, and authority recorded for latency/throughput/cost baseline |
| correctness oracle | owner, revision, retrieval time, and authority recorded for correctness oracle |
| capacity and saturation signals | owner, revision, retrieval time, and authority recorded for capacity and saturation signals |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Optimization context deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization context rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization context governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Checklist

- [ ] representative workload is present and provenance-bearing
- [ ] profiles and traces is present and provenance-bearing
- [ ] latency/throughput/cost baseline is present and provenance-bearing
- [ ] correctness oracle is present and provenance-bearing
- [ ] capacity and saturation signals is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
