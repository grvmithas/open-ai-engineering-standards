# Architecture: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: a decision is expensive to reverse
- [ ] Trigger evidenced: quality attributes conflict
- [ ] Trigger evidenced: multiple teams depend on a stable boundary

## Evidence package

- [ ] quality-attribute scenarios has authority, revision, timestamp, and owner
- [ ] workload and failure model has authority, revision, timestamp, and owner
- [ ] threat model has authority, revision, timestamp, and owner
- [ ] cost and capacity model has authority, revision, timestamp, and owner
- [ ] ADRs and organizational constraints has authority, revision, timestamp, and owner

## Domain execution

- [ ] Name stakeholders and express quality attributes as stimulus-response scenarios
- [ ] Separate hard constraints from preferences
- [ ] Model workload, growth, failure domains, and trust boundaries
- [ ] Develop at least two viable options and a baseline
- [ ] Evaluate options with scenario walkthroughs and prototypes
- [ ] Choose one option; record tradeoffs and rejected alternatives in an ADR
- [ ] Define fitness functions for architectural claims
- [ ] Review the ADR when assumptions or thresholds change

## Measured verification

- [ ] Evidence demonstrates all priority scenarios have measurable responses
- [ ] Evidence demonstrates prototype validates highest-risk assumption
- [ ] Evidence demonstrates fitness functions run in CI or operations
- [ ] Evidence demonstrates ADR review date and owner are current

## Recovery and closure

- [ ] Rehearsed rollback can supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Architecture checklist rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Enterprise considerations

Architecture checklist governance binds owner, policy revision, and retained proof to "all priority scenarios have measurable responses", with "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
