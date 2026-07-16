# Architecture: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Choose ingestion topology for 120k events/s. ADR-088 compares Kafka, Pub/Sub, and current queue against p99<2s, regional RTO 15m, and $38/TB. Prototype ARC-P7 falsifies ordering assumptions; Kafka is selected with partition-skew fitness test.

## Execution

1. Name stakeholders and express quality attributes as stimulus-response scenarios; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Separate hard constraints from preferences; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Model workload, growth, failure domains, and trust boundaries; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Develop at least two viable options and a baseline; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Evaluate options with scenario walkthroughs and prototypes; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Choose one option; record tradeoffs and rejected alternatives in an ADR; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Define fitness functions for architectural claims; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Review the ADR when assumptions or thresholds change; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that all priority scenarios have measurable responses.
- The owner records raw evidence that prototype validates highest-risk assumption.
- The owner records raw evidence that fitness functions run in CI or operations.
- The owner records raw evidence that ADR review date and owner are current.

## Rollback exercise

Architecture examples/example rollback exercise gate 1 is accepted only when "all priority scenarios have measurable responses" is source-verifiable; otherwise, supersede the adr, disable the new topology at its seam, and restore the prior approved architecture.

## Tradeoffs

Architecture examples/example deliberately spends additional review time to protect "all priority scenarios have measurable responses"; evidence weakness triggers "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture".

## Anti-patterns

Architecture examples/example rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Enterprise considerations

Architecture examples/example governance binds owner, policy revision, and retained proof to "all priority scenarios have measurable responses", with "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
