# Reviewer: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Reviewer failures operationalizes this pattern outcome: detect consequential defects with requirement-traceable, severity-calibrated findings.

| Failure | Observable signal | Recovery |
|---|---|---|
| style flood | material findings are hidden by nits | separate automation and editorial feedback |
| speculation as defect | finding cannot be reproduced | downgrade to question or withdraw |
| diff tunnel vision | unchanged caller breaks new contract | trace callers and consumers |
| rubber-stamp approval | review duration and evidence are absent | reopen independent review |

## Rollback failure

Reviewer failures rollback failure gate 2 is accepted only when "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision." is source-verifiable; otherwise, reject approval, remove unverified review-driven edits, and restore the reviewed revision.

## Tradeoffs

Reviewer failures deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer failures rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Enterprise considerations

Reviewer failures governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for style flood
- [ ] Detection exists for speculation as defect
- [ ] Detection exists for diff tunnel vision
- [ ] Detection exists for rubber-stamp approval

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
