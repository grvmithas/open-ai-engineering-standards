# Reviewer: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Reviewer problem operationalizes this pattern outcome: detect consequential defects with requirement-traceable, severity-calibrated findings.

## Observable problem

1. When an artifact changes runtime behavior, an undocumented assumption can become a production decision.
2. When a public contract or security boundary changes, an undocumented assumption can become a production decision.
3. When release evidence needs independent challenge, an undocumented assumption can become a production decision.

## Quality boundary

Reviewer problem quality boundary gate 2 is accepted only when "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision." is source-verifiable; otherwise, reject approval, remove unverified review-driven edits, and restore the reviewed revision.

## Tradeoffs

Reviewer problem deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer problem rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Enterprise considerations

Reviewer problem governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
