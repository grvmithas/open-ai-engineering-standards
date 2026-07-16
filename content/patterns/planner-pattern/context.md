# Planner: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to turn ambiguous engineering work into a decision-complete execution contract authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| acceptance criteria | owner, revision, retrieval time, and authority recorded for acceptance criteria |
| repository map and owners | owner, revision, retrieval time, and authority recorded for repository map and owners |
| ADRs and dependency graph | owner, revision, retrieval time, and authority recorded for ADRs and dependency graph |
| API/schema contracts | owner, revision, retrieval time, and authority recorded for API/schema contracts |
| delivery and risk constraints | owner, revision, retrieval time, and authority recorded for delivery and risk constraints |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Planner context deliberately spends additional review time to protect "decision completeness = 100%"; evidence weakness triggers "Stop implementation, revert partial increments, and return to the last approved plan revision".

## Anti-patterns

Planner context rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Enterprise considerations

Planner context governance binds owner, policy revision, and retained proof to "decision completeness = 100%", with "Stop implementation, revert partial increments, and return to the last approved plan revision" as the recorded recovery authority.

## Checklist

- [ ] acceptance criteria is present and provenance-bearing
- [ ] repository map and owners is present and provenance-bearing
- [ ] ADRs and dependency graph is present and provenance-bearing
- [ ] API/schema contracts is present and provenance-bearing
- [ ] delivery and risk constraints is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
