# Migration: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: schema, provider, protocol, or platform changes
- [ ] Trigger evidenced: old and new systems must coexist
- [ ] Trigger evidenced: cutover can corrupt or strand data

## Evidence package

- [ ] source/target inventory has authority, revision, timestamp, and owner
- [ ] data profile and invariants has authority, revision, timestamp, and owner
- [ ] compatibility matrix has authority, revision, timestamp, and owner
- [ ] dependency and traffic map has authority, revision, timestamp, and owner
- [ ] backup, restore, and reconciliation results has authority, revision, timestamp, and owner

## Domain execution

- [ ] Define invariants, loss tolerance, RPO, RTO, and abort thresholds
- [ ] Profile source data including malformed and orphaned records
- [ ] Design expand-migrate-contract compatibility phases
- [ ] Backfill idempotently with checkpoints and dead-letter handling
- [ ] Dual-read or shadow-read and compare semantic results
- [ ] Canary writes; reconcile counts, hashes, money, and referential integrity
- [ ] Shift traffic in measured stages with hold periods
- [ ] Contract old paths only after rollback expiry and restore proof

## Measured verification

- [ ] Evidence demonstrates record and monetary reconciliation = 100%
- [ ] Evidence demonstrates unclassified mismatch count = 0
- [ ] Evidence demonstrates error-budget burn stays below abort threshold
- [ ] Evidence demonstrates restore completes within RTO

## Recovery and closure

- [ ] Rehearsed rollback can stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Migration checklist rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration checklist governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
