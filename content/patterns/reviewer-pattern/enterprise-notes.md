# Reviewer: Enterprise Operations

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Reviewer enterprise-notes operationalizes this pattern outcome: detect consequential defects with requirement-traceable, severity-calibrated findings.

## Tailored controls

Code-owner policy enforces independent approval for payment paths. Findings containing customer data are redacted; review evidence is retained with the signed build and mapped to SOX change controls.

## Governance model

Reviewer enterprise-notes governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Metrics and assurance

- Control dashboard reports 100% findings include file/line and reproduction evidence.
- Control dashboard reports blocking false-positive rate < 5%.
- Control dashboard reports critical requirement coverage = 100%.
- Control dashboard reports fix verification performed by reviewer.

Reviewer enterprise-notes metrics and assurance gate 3 is accepted only when "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision." is source-verifiable; otherwise, reject approval, remove unverified review-driven edits, and restore the reviewed revision.

## Tradeoffs

Reviewer enterprise-notes deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer enterprise-notes rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Citations

- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [NIST SSDF](https://doi.org/10.6028/NIST.SP.800-218)
- [Google Engineering Practices review](https://google.github.io/eng-practices/review/)

## Checklist

- [ ] RACI, data flow, threat model, capacity, and recovery are current
- [ ] Audit evidence can be retrieved within one business day

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
