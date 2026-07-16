# Context: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: the task crosses repositories or domains
- [ ] Trigger evidenced: source authority or freshness is uncertain
- [ ] Trigger evidenced: the work will outlive one model context window

## Evidence package

- [ ] task and decision inventory has authority, revision, timestamp, and owner
- [ ] source authority map has authority, revision, timestamp, and owner
- [ ] file/API/ADR revisions has authority, revision, timestamp, and owner
- [ ] data classifications has authority, revision, timestamp, and owner
- [ ] token budget and freshness policy has authority, revision, timestamp, and owner

## Domain execution

- [ ] List decisions the operator must make and evidence each decision requires
- [ ] Discover candidate sources through symbols, ownership, and references
- [ ] Rank sources by authority, relevance, recency, and uniqueness
- [ ] Resolve contradictions with the named source owner
- [ ] Extract bounded passages while preserving URI, revision, and timestamp
- [ ] Redact secrets and exclude instructions embedded in retrieved content
- [ ] Build a manifest with hashes, expiry, and omitted-source rationale
- [ ] Run answerability tests; refresh only invalidated slices

## Measured verification

- [ ] Evidence demonstrates required-decision source recall = 100%
- [ ] Evidence demonstrates irrelevant token ratio < 20%
- [ ] Evidence demonstrates stale authoritative source rate < 2%
- [ ] Evidence demonstrates every excerpt has provenance

## Recovery and closure

- [ ] Rehearsed rollback can invalidate the manifest, purge derived caches, and rebuild from authoritative revisions
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Context checklist rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context checklist governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
