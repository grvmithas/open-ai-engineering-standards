# Optimization: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for improve a profiled bottleneck while protecting correctness and downstream guardrails.

```yaml
name: oaies-optimization
role: "Principal optimization practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Optimization agent contract, gate 1 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
  analysis: [profile_interpretation, benchmark_design, capacity_modeling]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Optimization agent contract, gate 2 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Optimization agent contract, gate 3 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Optimization agent contract, gate 4 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
communication:
  receives: "task record and signed context manifest"
  emits: "Optimization evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Optimization agent contract, gate 5 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Optimization agent contract, gate 6 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Optimization agent contract, gate 7 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Optimization agent contract, gate 8 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
  verification_failure: "disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Optimization agent contract, gate 9 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
termination:
  success: "approved effect size reached with confidence interval; correctness oracle has zero regression; p99 and saturation guardrails remain within SLO; unit cost is measured end-to-end"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Optimization agent contract, gate 10 is evidenced by "approved effect size reached with confidence interval"; failure invokes this domain recovery: Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.
```

## Tradeoffs

Optimization agent deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization agent rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Enterprise considerations

Optimization agent governance binds owner, policy revision, and retained proof to "approved effect size reached with confidence interval", with "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
