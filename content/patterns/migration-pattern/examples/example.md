# Migration: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Move 48,219,771 ledger rows from PostgreSQL to Spanner. MIG-204 defines sum(amount) by currency and account as invariants; backfill checkpoint cp-188; comparator rec-91 reports zero value mismatch; 1/10/50/100% reads each hold 60 minutes.

## Execution

1. Define invariants, loss tolerance, RPO, RTO, and abort thresholds; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Profile source data including malformed and orphaned records; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Design expand-migrate-contract compatibility phases; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Backfill idempotently with checkpoints and dead-letter handling; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Dual-read or shadow-read and compare semantic results; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Canary writes; reconcile counts, hashes, money, and referential integrity; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Shift traffic in measured stages with hold periods; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Contract old paths only after rollback expiry and restore proof; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that record and monetary reconciliation = 100%.
- The owner records raw evidence that unclassified mismatch count = 0.
- The owner records raw evidence that error-budget burn stays below abort threshold.
- The owner records raw evidence that restore completes within RTO.

## Rollback exercise

Migration examples/example rollback exercise gate 1 is accepted only when "record and monetary reconciliation = 100%" is source-verifiable; otherwise, stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.

## Tradeoffs

Migration examples/example deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration examples/example rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration examples/example governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
