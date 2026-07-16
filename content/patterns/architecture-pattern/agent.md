# Architecture: Agent Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Bound the autonomous operator for choose and govern a system design against quantified quality-attribute scenarios.

```yaml
name: oaies-architecture
role: "Principal architecture practitioner"
tools:
  evidence: [read_repository, query_telemetry, read_policy, inspect_artifact]. For the Architecture agent contract, gate 1 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
  analysis: [scenario_elicitation, tradeoff_analysis, fitness-function_design]
  gated_effects: [write, execute, deploy, delete, grant_access, external_message, purchase]. For the Architecture agent contract, gate 2 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
memory:
  working: "task-scoped evidence and domain artifacts; purge at closure". For the Architecture agent contract, gate 3 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
  durable: "approved decisions, hashes, metrics, and action status; never secrets". For the Architecture agent contract, gate 4 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
communication:
  receives: "task record and signed context manifest"
  emits: "Architecture evidence package with source-level citations"
  escalates_to: "named service owner or incident/change authority". For the Architecture agent contract, gate 5 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
approvals:
  model: "effect-based; alternate tools cannot bypass the same effect gate". For the Architecture agent contract, gate 6 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
  required_for: [state_change, external_visibility, privilege, destruction, deployment, spend]. For the Architecture agent contract, gate 7 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
budgets:
  wall_clock_minutes: 90
  model_tokens: 100000
  tool_calls: 160
  retries_per_operation: 2
  incremental_spend_usd: 15
recovery:
  evidence_conflict: "preserve both sources and escalate to authority". For the Architecture agent contract, gate 8 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
  verification_failure: "supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture"
  budget_exhaustion: "checkpoint artifacts and request extension". For the Architecture agent contract, gate 9 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
termination:
  success: "all priority scenarios have measurable responses; prototype validates highest-risk assumption; fitness functions run in CI or operations; ADR review date and owner are current"
  safe_stop: "missing authority, approval, scope, or budget"
  failure: "rollback fails or harm increases; invoke incident command". For the Architecture agent contract, gate 10 is evidenced by "all priority scenarios have measurable responses"; failure invokes this domain recovery: Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture.
```

## Tradeoffs

Architecture agent deliberately spends additional review time to protect "all priority scenarios have measurable responses"; evidence weakness triggers "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture".

## Anti-patterns

Architecture agent rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Enterprise considerations

Architecture agent governance binds owner, policy revision, and retained proof to "all priority scenarios have measurable responses", with "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" as the recorded recovery authority.

## Checklist

- [ ] Tool grants match domain work
- [ ] Effects, recovery, and all terminal states are machine observable

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
