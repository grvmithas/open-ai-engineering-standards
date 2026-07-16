# Planner: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Split invoice generation from a billing monolith. Artifacts: ADR-042, graph billing-dag.mmd, contracts/invoice-v2.yaml, plan PLAN-318. Sequence: shadow read, dual-write, reconcile 10,000 invoices, move 5% traffic, then retire the old path.

## Execution

1. Classify ambiguity and list decisions execution must not make; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Map affected components, owners, contracts, and dependency edges; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Generate viable designs and reject those violating hard constraints; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Record the chosen design and rejected alternatives in an ADR; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Sequence vertical increments by dependency and reversibility; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Attach tests, observability, rollout, and rollback to each increment; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Run a pre-mortem with security, operations, and domain owners; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Freeze the approved plan; route deviations through replanning; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that decision completeness = 100%.
- The owner records raw evidence that unplanned file-change rate < 10%.
- The owner records raw evidence that plan-driven rework < 10%.
- The owner records raw evidence that all critical-path owners acknowledge.

## Rollback exercise

Planner examples/example rollback exercise gate 1 is accepted only when "decision completeness = 100%" is source-verifiable; otherwise, stop implementation, revert partial increments, and return to the last approved plan revision.

## Tradeoffs

Planner examples/example deliberately spends additional review time to protect "decision completeness = 100%"; evidence weakness triggers "Stop implementation, revert partial increments, and return to the last approved plan revision".

## Anti-patterns

Planner examples/example rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Enterprise considerations

Planner examples/example governance binds owner, policy revision, and retained proof to "decision completeness = 100%", with "Stop implementation, revert partial increments, and return to the last approved plan revision" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
