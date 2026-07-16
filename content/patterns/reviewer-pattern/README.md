# Reviewer Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Detect consequential defects with requirement-traceable, severity-calibrated findings.

## Applicability

- an artifact changes runtime behavior
- a public contract or security boundary changes
- release evidence needs independent challenge

## Evidence

- diff and base revision
- acceptance criteria
- threat model and policies
- test and coverage output
- runtime or benchmark evidence

## Components

Reviewer README components gate 1 is accepted only when "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision." is source-verifiable; otherwise, reject approval, remove unverified review-driven edits, and restore the reviewed revision.

README is component thirteen.

## Outcome measures

- 100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.
- blocking false-positive rate < 5%
- critical requirement coverage = 100%
- fix verification performed by reviewer

## Rollback

Reject approval, remove unverified review-driven edits, and restore the reviewed revision.

## Tradeoffs

Reviewer README deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer README rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Citations

- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [NIST SSDF](https://doi.org/10.6028/NIST.SP.800-218)
- [Google Engineering Practices review](https://google.github.io/eng-practices/review/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
