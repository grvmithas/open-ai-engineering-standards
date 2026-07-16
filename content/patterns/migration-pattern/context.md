# Migration: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to transition data or services while preserving invariants and a tested return path authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| source/target inventory | owner, revision, retrieval time, and authority recorded for source/target inventory |
| data profile and invariants | owner, revision, retrieval time, and authority recorded for data profile and invariants |
| compatibility matrix | owner, revision, retrieval time, and authority recorded for compatibility matrix |
| dependency and traffic map | owner, revision, retrieval time, and authority recorded for dependency and traffic map |
| backup, restore, and reconciliation results | owner, revision, retrieval time, and authority recorded for backup, restore, and reconciliation results |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Migration context deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration context rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration context governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Checklist

- [ ] source/target inventory is present and provenance-bearing
- [ ] data profile and invariants is present and provenance-bearing
- [ ] compatibility matrix is present and provenance-bearing
- [ ] dependency and traffic map is present and provenance-bearing
- [ ] backup, restore, and reconciliation results is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
