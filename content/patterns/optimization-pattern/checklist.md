# Optimization: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: an SLO or unit-cost target is missed
- [ ] Trigger evidenced: profiling identifies a dominant resource
- [ ] Trigger evidenced: expected growth exhausts capacity

## Evidence package

- [ ] representative workload has authority, revision, timestamp, and owner
- [ ] profiles and traces has authority, revision, timestamp, and owner
- [ ] latency/throughput/cost baseline has authority, revision, timestamp, and owner
- [ ] correctness oracle has authority, revision, timestamp, and owner
- [ ] capacity and saturation signals has authority, revision, timestamp, and owner

## Domain execution

- [ ] Define target metric, guardrails, workload, and minimum useful effect
- [ ] Measure a statistically sound baseline including variance
- [ ] Profile end-to-end and attribute dominant cost
- [ ] Form a mechanism-specific optimization hypothesis
- [ ] Benchmark one change against control with warmup and confidence interval
- [ ] Inspect shifted cost, tail behavior, correctness, and saturation
- [ ] Canary under representative production load
- [ ] Keep only if effect size and guardrails pass; document capacity headroom

## Measured verification

- [ ] Evidence demonstrates approved effect size reached with confidence interval
- [ ] Evidence demonstrates correctness oracle has zero regression
- [ ] Evidence demonstrates p99 and saturation guardrails remain within SLO
- [ ] Evidence demonstrates unit cost is measured end-to-end

## Recovery and closure

- [ ] Rehearsed rollback can disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Optimization checklist rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization checklist governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
