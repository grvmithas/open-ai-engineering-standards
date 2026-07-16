# Optimization: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Reduce catalog p99 from 840ms under 2k RPS. Flame graph PROF-118 assigns 61% CPU to JSON schema compilation. Revision opt-77 caches 500 bounded schemas; 30-run benchmark shows p99 412±18ms, zero oracle mismatch, and memory +96MiB below 128MiB guardrail.

## Execution

1. Define target metric, guardrails, workload, and minimum useful effect; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Measure a statistically sound baseline including variance; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Profile end-to-end and attribute dominant cost; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Form a mechanism-specific optimization hypothesis; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Benchmark one change against control with warmup and confidence interval; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Inspect shifted cost, tail behavior, correctness, and saturation; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Canary under representative production load; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Keep only if effect size and guardrails pass; document capacity headroom; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that approved effect size reached with confidence interval.
- The owner records raw evidence that correctness oracle has zero regression.
- The owner records raw evidence that p99 and saturation guardrails remain within SLO.
- The owner records raw evidence that unit cost is measured end-to-end.

## Rollback exercise

Optimization examples/example rollback exercise gate 1 is accepted only when "approved effect size reached with confidence interval" is source-verifiable; otherwise, disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.

## Tradeoffs

Optimization examples/example deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization examples/example rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization examples/example governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
