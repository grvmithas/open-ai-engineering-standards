# Migration: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform migration work reproducibly.

## Invariant specification

**Trigger:** Migration scope and business data are known. **Procedure:** Express balances, uniqueness, ordering, referential integrity, retention, and allowed loss as executable source-versus-target checks. **Verification:** Checks fail on seeded corruption and pass on the known-good snapshot. **Unhappy path:** Do not cut over while a business invariant has no oracle.

## Idempotent backfill

**Trigger:** Historical state must be copied while writes continue. **Procedure:** Use stable migration keys, bounded batches, checkpoints, retry-safe upserts, dead-letter capture, and source watermarks. **Verification:** Replaying any completed batch produces no additional effect and reconciliation remains exact. **Unhappy path:** Pause at the last checkpoint when lag or mismatch exceeds threshold.

## Cutover control

**Trigger:** Shadow comparison meets its hold period. **Procedure:** Freeze the stage artifact, verify rollback, shift one traffic tranche, hold, reconcile, and promote only on objective gates. **Verification:** Each stage records traffic, duration, SLOs, mismatches, and approval. **Unhappy path:** Return traffic to compatibility mode at the first abort signal.

## Tradeoffs

Independent Migration skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Migration, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Migration skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Invariant specification produced its named, independently verifiable artifact
- [ ] Idempotent backfill produced its named, independently verifiable artifact
- [ ] Cutover control produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
