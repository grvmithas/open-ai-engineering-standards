# Context: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform context work reproducibly.

## Decision-led retrieval

**Trigger:** An operator identifies a decision it cannot support. **Procedure:** Translate the decision into source authorities and bounded queries; stop retrieval when all acceptance questions have authoritative coverage. **Verification:** The manifest maps each decision to at least one current source and records omitted candidates. **Unhappy path:** Do not compensate for a missing authority with broader search.

## Provenance scoring

**Trigger:** Multiple sources make overlapping or conflicting claims. **Procedure:** Score ownership, normative status, revision, recency, directness, and corroboration; preserve conflict until the authority resolves it. **Verification:** Every excerpt carries source ID, revision, timestamp, and authority score. **Unhappy path:** Quarantine unresolved conflicting claims from decision use.

## Loss-aware compression

**Trigger:** The accepted sources exceed the context budget. **Procedure:** Extract constraints, exceptions, examples, interfaces, and source anchors; compare compressed claims against originals. **Verification:** Answerability tests pass with at least twenty percent budget headroom. **Unhappy path:** Restore the source passage when compression changes scope or modality.

## Tradeoffs

Independent Context skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Context, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Context skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Decision-led retrieval produced its named, independently verifiable artifact
- [ ] Provenance scoring produced its named, independently verifiable artifact
- [ ] Loss-aware compression produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
