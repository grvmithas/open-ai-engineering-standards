# Reviewer: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to detect consequential defects with requirement-traceable, severity-calibrated findings authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| diff and base revision | owner, revision, retrieval time, and authority recorded for diff and base revision |
| acceptance criteria | owner, revision, retrieval time, and authority recorded for acceptance criteria |
| threat model and policies | owner, revision, retrieval time, and authority recorded for threat model and policies |
| test and coverage output | owner, revision, retrieval time, and authority recorded for test and coverage output |
| runtime or benchmark evidence | owner, revision, retrieval time, and authority recorded for runtime or benchmark evidence |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Reviewer context deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer context rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Enterprise considerations

Reviewer context governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Checklist

- [ ] diff and base revision is present and provenance-bearing
- [ ] acceptance criteria is present and provenance-bearing
- [ ] threat model and policies is present and provenance-bearing
- [ ] test and coverage output is present and provenance-bearing
- [ ] runtime or benchmark evidence is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
