# Migration Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Transition data or services while preserving invariants and a tested return path.

## Applicability

- schema, provider, protocol, or platform changes
- old and new systems must coexist
- cutover can corrupt or strand data

## Evidence

- source/target inventory
- data profile and invariants
- compatibility matrix
- dependency and traffic map
- backup, restore, and reconciliation results

## Components

Migration README components gate 1 is accepted only when "record and monetary reconciliation = 100%" is source-verifiable; otherwise, stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.

README is component thirteen.

## Outcome measures

- record and monetary reconciliation = 100%
- unclassified mismatch count = 0
- error-budget burn stays below abort threshold
- restore completes within RTO

## Rollback

Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.

## Tradeoffs

Migration README deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration README rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Citations

- [AWS migration best practices](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-database-migration/best-practices.html)
- [Martin Fowler Parallel Change](https://martinfowler.com/bliki/ParallelChange.html)
- [Google SRE data integrity](https://sre.google/sre-book/data-integrity/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
