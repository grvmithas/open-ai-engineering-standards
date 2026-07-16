# Hotfix: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for contain an active production defect with the smallest reversible intervention.

```yaml
name: oaies-hotfix
role: "Principal hotfix practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Hotfix agent contract, gate 1 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
  analysis: [rapid_containment, minimal_patching, incident_verification]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Hotfix agent contract, gate 2 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Hotfix agent contract, gate 3 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Hotfix agent contract, gate 4 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
communication:
  receives: "task record and signed context manifest"
  emits: "Hotfix evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Hotfix agent contract, gate 5 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Hotfix agent contract, gate 6 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Hotfix agent contract, gate 7 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Hotfix agent contract, gate 8 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
  verification_failure: "execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Hotfix agent contract, gate 9 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
termination:
  success: "time to containment meets severity target; affected requests/users trend down after action; hotfix changes only authorized scope; rollback remains within incident RTO"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Hotfix agent contract, gate 10 is evidenced by "time to containment meets severity target"; failure invokes this domain recovery: Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.
```

## Tradeoffs

Hotfix agent deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix agent rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix agent governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
