# Context: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to construct a minimal, provenance-bearing information package that preserves decision quality authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| task and decision inventory | owner, revision, retrieval time, and authority recorded for task and decision inventory |
| source authority map | owner, revision, retrieval time, and authority recorded for source authority map |
| file/API/ADR revisions | owner, revision, retrieval time, and authority recorded for file/API/ADR revisions |
| data classifications | owner, revision, retrieval time, and authority recorded for data classifications |
| token budget and freshness policy | owner, revision, retrieval time, and authority recorded for token budget and freshness policy |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Context context deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context context rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context context governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Checklist

- [ ] task and decision inventory is present and provenance-bearing
- [ ] source authority map is present and provenance-bearing
- [ ] file/API/ADR revisions is present and provenance-bearing
- [ ] data classifications is present and provenance-bearing
- [ ] token budget and freshness policy is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
