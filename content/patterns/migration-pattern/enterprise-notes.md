# Migration: Enterprise Operations

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Migration enterprise-notes operationalizes this pattern outcome: transition data or services while preserving invariants and a tested return path.

## Tailored controls

Migration evidence includes data lineage, residency, retention, backup encryption, processor changes, and customer notification. Finance requires independent reconciliation sign-off before contract.

## Governance model

Migration enterprise-notes governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Metrics and assurance

- Control dashboard reports record and monetary reconciliation = 100%.
- Control dashboard reports unclassified mismatch count = 0.
- Control dashboard reports error-budget burn stays below abort threshold.
- Control dashboard reports restore completes within RTO.

Migration enterprise-notes metrics and assurance gate 3 is accepted only when "record and monetary reconciliation = 100%" is source-verifiable; otherwise, stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.

## Tradeoffs

Migration enterprise-notes deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration enterprise-notes rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Citations

- [AWS migration best practices](https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-database-migration/best-practices.html)
- [Martin Fowler Parallel Change](https://martinfowler.com/bliki/ParallelChange.html)
- [Google SRE data integrity](https://sre.google/sre-book/data-integrity/)

## Checklist

- [ ] RACI, data flow, threat model, capacity, and recovery are current
- [ ] Audit evidence can be retrieved within one business day

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
