# Reviewer: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Review payment retry PR #184. Artifacts: commit 6ab91e2, REQ-PAY-77, failing test retry_duplicate_charge.spec.ts, trace tr-992. Finding R-03 proves an idempotency key is regenerated after timeout, enabling duplicate capture; severity is blocking.

## Execution

1. Reconstruct intended behavior from requirements before reading the implementation; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Partition review by correctness, security, reliability, operability, and maintainability; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Trace every changed behavior to a requirement and test; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Follow data and authority across trust boundaries; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Reproduce suspected defects on the exact revision; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Calibrate severity from likelihood, impact, reachability, and detectability; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Separate blocking findings from non-blocking improvements; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Verify fixes and close only the reproduced defect, not the comment; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that 100% findings include file/line and reproduction evidence.
- The owner records raw evidence that blocking false-positive rate < 5%.
- The owner records raw evidence that critical requirement coverage = 100%.
- The owner records raw evidence that fix verification performed by reviewer.

## Rollback exercise

Reviewer examples/example rollback exercise gate 1 is accepted only when "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision." is source-verifiable; otherwise, reject approval, remove unverified review-driven edits, and restore the reviewed revision.

## Tradeoffs

Reviewer examples/example deliberately spends additional review time to protect "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision."; evidence weakness triggers "Reject approval, remove unverified review-driven edits, and restore the reviewed revision".

## Anti-patterns

Reviewer examples/example rejects shortcuts around "Reconstruct intended behavior from requirements before reading the implementation." because they sever the evidence chain required for "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.".

## Enterprise considerations

Reviewer examples/example governance binds owner, policy revision, and retained proof to "100% findings include file/line and reproduction evidence. For the Reviewer README contract, gate 1 is evidenced by "100% findings include file/line and reproduction evidence"; failure invokes this domain recovery: Reject approval, remove unverified review-driven edits, and restore the reviewed revision.", with "Reject approval, remove unverified review-driven edits, and restore the reviewed revision" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
