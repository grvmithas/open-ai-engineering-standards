# Planner: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: more than three components change
- [ ] Trigger evidenced: a dependency order constrains delivery
- [ ] Trigger evidenced: an API, schema, or trust boundary changes

## Evidence package

- [ ] acceptance criteria has authority, revision, timestamp, and owner
- [ ] repository map and owners has authority, revision, timestamp, and owner
- [ ] ADRs and dependency graph has authority, revision, timestamp, and owner
- [ ] API/schema contracts has authority, revision, timestamp, and owner
- [ ] delivery and risk constraints has authority, revision, timestamp, and owner

## Domain execution

- [ ] Classify ambiguity and list decisions execution must not make
- [ ] Map affected components, owners, contracts, and dependency edges
- [ ] Generate viable designs and reject those violating hard constraints
- [ ] Record the chosen design and rejected alternatives in an ADR
- [ ] Sequence vertical increments by dependency and reversibility
- [ ] Attach tests, observability, rollout, and rollback to each increment
- [ ] Run a pre-mortem with security, operations, and domain owners
- [ ] Freeze the approved plan; route deviations through replanning

## Measured verification

- [ ] Evidence demonstrates decision completeness = 100%
- [ ] Evidence demonstrates unplanned file-change rate < 10%
- [ ] Evidence demonstrates plan-driven rework < 10%
- [ ] Evidence demonstrates all critical-path owners acknowledge

## Recovery and closure

- [ ] Rehearsed rollback can stop implementation, revert partial increments, and return to the last approved plan revision
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Planner checklist rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Enterprise considerations

Planner checklist governance binds owner, policy revision, and retained proof to "decision completeness = 100%", with "Stop implementation, revert partial increments, and return to the last approved plan revision" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
