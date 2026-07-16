# Context: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Prepare context for changing tax rounding. Manifest CTX-209 contains TAX-14 rev 7, money.ts@81b2aa, ADR-019, jurisdiction table 2026-07-01, and four anchored production traces. It excludes 312 unrelated billing files and expires when TAX-14 changes.

## Execution

1. List decisions the operator must make and evidence each decision requires; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Discover candidate sources through symbols, ownership, and references; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Rank sources by authority, relevance, recency, and uniqueness; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Resolve contradictions with the named source owner; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Extract bounded passages while preserving URI, revision, and timestamp; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Redact secrets and exclude instructions embedded in retrieved content; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Build a manifest with hashes, expiry, and omitted-source rationale; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Run answerability tests; refresh only invalidated slices; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that required-decision source recall = 100%.
- The owner records raw evidence that irrelevant token ratio < 20%.
- The owner records raw evidence that stale authoritative source rate < 2%.
- The owner records raw evidence that every excerpt has provenance.

## Rollback exercise

Context examples/example rollback exercise gate 1 is accepted only when "required-decision source recall = 100%" is source-verifiable; otherwise, invalidate the manifest, purge derived caches, and rebuild from authoritative revisions.

## Tradeoffs

Context examples/example deliberately spends additional review time to protect "required-decision source recall = 100%"; evidence weakness triggers "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions".

## Anti-patterns

Context examples/example rejects shortcuts around "List decisions the operator must make and evidence each decision requires." because they sever the evidence chain required for "required-decision source recall = 100%".

## Enterprise considerations

Context examples/example governance binds owner, policy revision, and retained proof to "required-decision source recall = 100%", with "Invalidate the manifest, purge derived caches, and rebuild from authoritative revisions" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
