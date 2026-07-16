# Reviewer: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: an artifact changes runtime behavior
- [ ] Trigger evidenced: a public contract or security boundary changes
- [ ] Trigger evidenced: release evidence needs independent challenge

## Evidence package

- [ ] diff and base revision has authority, revision, timestamp, and owner
- [ ] acceptance criteria has authority, revision, timestamp, and owner
- [ ] threat model and policies has authority, revision, timestamp, and owner
- [ ] test and coverage output has authority, revision, timestamp, and owner
- [ ] runtime or benchmark evidence has authority, revision, timestamp, and owner

## Domain execution

- [ ] Reconstruct intended behavior from requirements before reading the implementation
- [ ] Partition review by correctness, security, reliability, operability, and maintainability
- [ ] Trace every changed behavior to a requirement and test
- [ ] Follow data and authority across trust boundaries
- [ ] Reproduce suspected defects on the exact revision
- [ ] Calibrate severity from likelihood, impact, reachability, and detectability
- [ ] Separate blocking findings from non-blocking improvements
- [ ] Verify fixes and close only the reproduced defect, not the comment

## Measured verification

- [ ] Evidence demonstrates 100% findings include file/line and reproduction evidence
- [ ] Evidence demonstrates blocking false-positive rate < 5%
- [ ] Evidence demonstrates critical requirement coverage = 100%
- [ ] Evidence demonstrates fix verification performed by reviewer

## Recovery and closure

- [ ] Rehearsed rollback can reject approval, remove unverified review-driven edits, and restore the reviewed revision
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Reviewer checklist rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Enterprise considerations

Reviewer checklist governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
