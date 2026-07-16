# Reviewer: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Reviewer subagents operationalizes this pattern outcome: detect consequential defects with requirement-traceable, severity-calibrated findings.

| Subagent | Mandate | Required output |
|---|---|---|
| Contract tracer | maps requirements to code and tests | contract tracer artifact with source IDs, uncertainty, and stop status |
| Security reviewer | models attacker-controlled paths | security reviewer artifact with source IDs, uncertainty, and stop status |
| Operations reviewer | checks SLOs, telemetry, and recovery | operations reviewer artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Reviewer specialists receive only sources needed for "Reconstruct intended behavior from requirements before reading the implementation."; the parent retains effect approval and accountability for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Tradeoffs

Reviewer subagents deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer subagents rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Enterprise considerations

Reviewer subagents governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Checklist

- [ ] Contract tracer returned its required evidence
- [ ] Security reviewer returned its required evidence
- [ ] Operations reviewer returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
