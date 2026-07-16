# Legacy Modernization: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for replace obsolete internals incrementally while preserving observed business behavior.

```yaml
name: oaies-legacy-modernization
role: "Principal legacy modernization practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Legacy Modernization agent contract, gate 1 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
  analysis: [characterization_testing, seam_extraction, strangler_rollout]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Legacy Modernization agent contract, gate 2 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Legacy Modernization agent contract, gate 3 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Legacy Modernization agent contract, gate 4 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
communication:
  receives: "task record and signed context manifest"
  emits: "Legacy Modernization evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Legacy Modernization agent contract, gate 5 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Legacy Modernization agent contract, gate 6 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Legacy Modernization agent contract, gate 7 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Legacy Modernization agent contract, gate 8 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
  verification_failure: "flip the strangler route to the legacy implementation and replay buffered work after reconciliation"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Legacy Modernization agent contract, gate 9 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
termination:
  success: "characterized critical behavior = 100%; contract mismatch rate = 0; change lead time improves by target; legacy attack surface decreases each tranche"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Legacy Modernization agent contract, gate 10 is evidenced by "characterized critical behavior = 100%"; failure invokes this domain recovery: Flip the strangler route to the legacy implementation and replay buffered work after reconciliation.
```

## Tradeoffs

Legacy Modernization agent deliberately spends additional review time to protect "characterized critical behavior = 100%"; evidence weakness triggers "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation".

## Anti-patterns

Legacy Modernization agent rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Enterprise considerations

Legacy Modernization agent governance binds owner, policy revision, and retained proof to "characterized critical behavior = 100%", with "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
