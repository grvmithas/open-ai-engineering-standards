# Legacy Modernization: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: unsupported technology creates material risk
- [ ] Trigger evidenced: change lead time is dominated by legacy coupling
- [ ] Trigger evidenced: contracts are undocumented but production behavior is relied upon

## Evidence package

- [ ] characterization tests has authority, revision, timestamp, and owner
- [ ] runtime dependency and call graph has authority, revision, timestamp, and owner
- [ ] consumer contracts has authority, revision, timestamp, and owner
- [ ] change and incident history has authority, revision, timestamp, and owner
- [ ] support/security lifecycle dates has authority, revision, timestamp, and owner

## Domain execution

- [ ] Inventory business capabilities, consumers, and operational pain
- [ ] Capture golden-master and characterization tests before refactoring
- [ ] Create seams around time, I/O, state, and external dependencies
- [ ] Select a vertical capability by value, coupling, and reversibility
- [ ] Place a strangler route with shadow comparison
- [ ] Implement the replacement behind contract tests
- [ ] Shift traffic gradually and compare business outcomes
- [ ] Delete the legacy slice only after consumer and rollback expiry

## Measured verification

- [ ] Evidence demonstrates characterized critical behavior = 100%
- [ ] Evidence demonstrates contract mismatch rate = 0
- [ ] Evidence demonstrates change lead time improves by target
- [ ] Evidence demonstrates legacy attack surface decreases each tranche

## Recovery and closure

- [ ] Rehearsed rollback can flip the strangler route to the legacy implementation and replay buffered work after reconciliation
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Legacy Modernization checklist rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Enterprise considerations

Legacy Modernization checklist governance binds owner, policy revision, and retained proof to "characterized critical behavior = 100%", with "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
