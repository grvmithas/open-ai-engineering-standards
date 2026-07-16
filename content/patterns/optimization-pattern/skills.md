# Optimization: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform optimization work reproducibly.

## Profile interpretation

**Trigger:** A target metric misses its threshold under a representative workload. **Procedure:** Correlate CPU, allocation, I/O, locks, queues, network, and downstream spans; distinguish utilization from saturation and causal cost from incidental samples. **Verification:** The dominant path explains enough baseline cost to achieve the proposed effect size. **Unhappy path:** Do not optimize a path whose maximum theoretical gain misses the target.

## Benchmark design

**Trigger:** An optimization hypothesis names a mechanism. **Procedure:** Fix workload fingerprint, warmup, environment, control revision, repetitions, correctness oracle, and confidence interval before running treatment. **Verification:** Results are stable across order randomization and report variance and tails. **Unhappy path:** Discard contaminated runs rather than selecting favorable samples.

## Capacity modeling

**Trigger:** The change improves the measured benchmark. **Procedure:** Project throughput and saturation at growth and failure conditions; include shifted memory, storage, network, and vendor limits. **Verification:** Headroom meets the planning horizon without violating unit cost or SLO guardrails. **Unhappy path:** Keep the baseline when the optimization only moves the bottleneck.

## Tradeoffs

Independent Optimization skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Optimization, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Optimization skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Profile interpretation produced its named, independently verifiable artifact
- [ ] Benchmark design produced its named, independently verifiable artifact
- [ ] Capacity modeling produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
