# Reviewer: Lifecycle Hooks

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enforce reviewer gates outside model discretion.

| Hook | Enforced condition | Failure behavior |
|---|---|---|
| preflight | block comments lacking location and evidence | fail closed without creating an effect |
| domain-gate | reject approval when critical requirements lack tests | fail closed without creating an effect |
| closure | invalidate review when the base revision changes | reject approval, remove unverified review-driven edits, and restore the reviewed revision |

```bash
#!/usr/bin/env bash
set -euo pipefail
: "${TASK_ID:?required}" "${MANIFEST_HASH:?required}" "${RISK_TIER:?required}". For the Reviewer hooks contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.
# oaies-reviewer: evaluate the three versioned policy rules documented above.
policy_check --pattern "reviewer" --task "$TASK_ID" --manifest "$MANIFEST_HASH" --risk "$RISK_TIER"
```

## Verification

Reviewer hooks verification records raw evidence for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision." and invokes "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" when the threshold is not demonstrated.

## Tradeoffs

Reviewer hooks deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer hooks rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Enterprise considerations

Reviewer hooks governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Checklist

- [ ] Automated test proves: block comments lacking location and evidence
- [ ] Automated test proves: reject approval when critical requirements lack tests
- [ ] Automated test proves: invalidate review when the base revision changes

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
