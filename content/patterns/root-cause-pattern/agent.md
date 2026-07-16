# Root Cause: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for explain why an incident occurred and prioritize controls that prevent or limit recurrence.

```yaml
name: oaies-root-cause
role: "Principal root cause practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Root Cause agent contract, gate 1 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
  analysis: [timeline_reconstruction, causal_graphing, counterfactual_testing, corrective-action_hierarchy]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Root Cause agent contract, gate 2 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Root Cause agent contract, gate 3 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Root Cause agent contract, gate 4 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
communication:
  receives: "task record and signed context manifest"
  emits: "Root Cause evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Root Cause agent contract, gate 5 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Root Cause agent contract, gate 6 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Root Cause agent contract, gate 7 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Root Cause agent contract, gate 8 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
  verification_failure: "withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Root Cause agent contract, gate 9 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
termination:
  success: "100% causal edges cite evidence; timeline uncertainty is explicit; actions favor engineered controls over reminders; effectiveness reviewed at 30/60/90 days"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Root Cause agent contract, gate 10 is evidenced by "100% causal edges cite evidence"; failure invokes this domain recovery: Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.
```

## Tradeoffs

Root Cause agent deliberately spends additional review time to protect "100% causal edges cite evidence"; evidence weakness triggers "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection".

## Anti-patterns

Root Cause agent rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Enterprise considerations

Root Cause agent governance binds owner, policy revision, and retained proof to "100% causal edges cite evidence", with "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
