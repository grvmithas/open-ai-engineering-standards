# Request for Comments Process

**Version:** 1.0.0  
**Last updated:** 2026-07-16

## Purpose

This process governs high-impact OAIES proposals before implementation.

## Why

Architecture, governance, and normative standard changes are expensive to reverse. An RFC forces the decision, evidence, compatibility impact, and migration path to be reviewed before code or content makes the outcome appear inevitable.

## How

### When an RFC is required

Use an RFC for a new domain, breaking change, governance change, public extension point, content schema change, or cross-cutting website architecture. Routine corrections and backward-compatible refinements use a normal pull request.

### Required RFC structure

1. Purpose and problem statement.
2. Why the change is necessary now.
3. One recommended design with implementation steps.
4. Compatibility and migration plan.
5. Security, privacy, accessibility, and enterprise impact.
6. Tradeoffs and rejected alternatives.
7. Rollout, observability, rollback, and success metrics.
8. Anti-patterns prevented.
9. Verifiable acceptance checklist.

### Lifecycle

1. Open a GitHub discussion or issue to confirm RFC scope.
2. Submit the complete RFC as `rfcs/NNNN-short-title.md`; the next number is assigned during review.
3. Keep review open for at least seven calendar days and at least fourteen days for governance changes.
4. Resolve blocking feedback and record dissent.
5. Obtain approval under `GOVERNANCE.md`.
6. Merge with status `Accepted`; implementation occurs in separate pull requests linked to the RFC.
7. Mark the RFC `Implemented`, `Superseded`, or `Withdrawn` without rewriting its decision history.

## Tradeoffs

- Review windows delay implementation but prevent premature commitments.
- A single recommended design improves decisiveness but requires rejected alternatives to remain visible.
- Immutable accepted records preserve history but require superseding RFCs for material changes.

## Anti-patterns

- **Implementation-first RFC:** review must occur before irreversible adoption.
- **Menu without a decision:** an RFC recommends one approach.
- **Perpetual draft:** sponsors close or withdraw stale proposals after 60 days without activity.
- **Silent scope expansion:** material changes restart the review window.

## Enterprise considerations

Regulated or security-sensitive proposals must identify control owners, evidence retention, data classification, and rollout approval. Confidential implementation details belong in a restricted companion record, while the public RFC states the decision and risk class.

## Checklist

- [ ] The change actually requires an RFC.
- [ ] One design is recommended.
- [ ] Compatibility and migration are explicit.
- [ ] Security and enterprise impacts are assessed.
- [ ] Minimum review window elapsed.
- [ ] Required approvals are recorded.
- [ ] Implementation and supersession links are maintained.

## Changelog

### 1.0.0 — 2026-07-16

- Established RFC thresholds, structure, lifecycle, and review windows.
