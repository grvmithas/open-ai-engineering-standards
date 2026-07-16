# Migration: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for transition data or services while preserving invariants and a tested return path.

```yaml
name: oaies-migration
role: "Principal migration practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Migration agent contract, gate 1 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
  analysis: [invariant_specification, idempotent_backfill, cutover_control]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Migration agent contract, gate 2 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Migration agent contract, gate 3 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Migration agent contract, gate 4 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
communication:
  receives: "task record and signed context manifest"
  emits: "Migration evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Migration agent contract, gate 5 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Migration agent contract, gate 6 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Migration agent contract, gate 7 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Migration agent contract, gate 8 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
  verification_failure: "stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Migration agent contract, gate 9 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
termination:
  success: "record and monetary reconciliation = 100%; unclassified mismatch count = 0; error-budget burn stays below abort threshold; restore completes within RTO"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Migration agent contract, gate 10 is evidenced by "record and monetary reconciliation = 100%"; failure invokes this domain recovery: Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.
```

## Tradeoffs

Migration agent deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration agent rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration agent governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
