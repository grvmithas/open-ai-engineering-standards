# Release: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for promote a signed artifact through progressive exposure with objective abort criteria.

```yaml
name: oaies-release
role: "Principal release practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Release agent contract, gate 1 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
  analysis: [progressive_delivery, release_evidence_verification, operational_rollback]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Release agent contract, gate 2 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Release agent contract, gate 3 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Release agent contract, gate 4 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
communication:
  receives: "task record and signed context manifest"
  emits: "Release evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Release agent contract, gate 5 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Release agent contract, gate 6 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Release agent contract, gate 7 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Release agent contract, gate 8 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
  verification_failure: "halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Release agent contract, gate 9 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
termination:
  success: "artifact-to-runtime digest match = 100%; deployment success > 99%; rollback completes within RTO; no accelerated SLO burn during holds"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Release agent contract, gate 10 is evidenced by "artifact-to-runtime digest match = 100%"; failure invokes this domain recovery: Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.
```

## Tradeoffs

Release agent deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release agent rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release agent governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
