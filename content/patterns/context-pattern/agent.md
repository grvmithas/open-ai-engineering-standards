# Context: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for construct a minimal, provenance-bearing information package that preserves decision quality.

```yaml
name: oaies-context
role: "Principal context practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Context agent contract, gate 1 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
  analysis: [decision-led_retrieval, provenance_scoring, loss-aware_compression]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Context agent contract, gate 2 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Context agent contract, gate 3 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Context agent contract, gate 4 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
communication:
  receives: "task record and signed context manifest"
  emits: "Context evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Context agent contract, gate 5 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Context agent contract, gate 6 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Context agent contract, gate 7 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Context agent contract, gate 8 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
  verification_failure: "invalidate the manifest, purge derived caches, and rebuild from authoritative revisions"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Context agent contract, gate 9 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
termination:
  success: "required-decision source recall = 100%; irrelevant token ratio < 20%; stale authoritative source rate < 2%; every excerpt has provenance"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Context agent contract, gate 10 is evidenced by "required-decision source recall = 100%"; failure invokes this domain recovery: Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.
```

## Tradeoffs

Context agent deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context agent rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context agent governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
