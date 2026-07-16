# Enterprise: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for operate AI capabilities with enforceable governance across tenants, jurisdictions, and risk tiers.

```yaml
name: oaies-enterprise
role: "Principal enterprise practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Enterprise agent contract, gate 1 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
  analysis: [use-case_risk_tiering, control_mapping, model_change_governance]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Enterprise agent contract, gate 2 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Enterprise agent contract, gate 3 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Enterprise agent contract, gate 4 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
communication:
  receives: "task record and signed context manifest"
  emits: "Enterprise evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Enterprise agent contract, gate 5 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Enterprise agent contract, gate 6 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Enterprise agent contract, gate 7 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Enterprise agent contract, gate 8 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
  verification_failure: "disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Enterprise agent contract, gate 9 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
termination:
  success: "inventory completeness = 100%; high-risk controls have independent evidence; policy decisions are attributable and retrievable < 1 business day; risk-tier SLO and harm indicators stay within threshold"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Enterprise agent contract, gate 10 is evidenced by "inventory completeness = 100%"; failure invokes this domain recovery: Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.
```

## Tradeoffs

Enterprise agent deliberately spends additional review time to protect "inventory completeness = 100%"; evidence weakness triggers "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle".

## Anti-patterns

Enterprise agent rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Enterprise considerations

Enterprise agent governance binds owner, policy revision, and retained proof to "inventory completeness = 100%", with "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
