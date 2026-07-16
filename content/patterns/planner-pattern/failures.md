# Planner: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Planner failures operationalizes this pattern outcome: turn ambiguous engineering work into a decision-complete execution contract.

| Failure | Observable signal | Recovery |
|---|---|---|
| task-list masquerading as a plan | coder must still choose architecture | replan around interfaces and decisions |
| false precision | line-level steps describe code not contracts | raise detail to behavior and boundaries |
| dependency inversion | later work is required by an earlier step | recompute the DAG |
| approval theater | reviewer cannot explain the design | repeat review with teach-back |

## Rollback failure

Planner failures rollback failure gate 2 is accepted only when "decision completeness = 100%" is source-verifiable; otherwise, stop implementation, revert partial increments, and return to the last approved plan revision.

## Tradeoffs

Planner failures deliberately spends additional review time to protect "decision completeness = 100%"; evidence weakness triggers "Stop implementation, revert partial increments, and return to the last approved plan revision".

## Anti-patterns

Planner failures rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Enterprise considerations

Planner failures governance binds owner, policy revision, and retained proof to "decision completeness = 100%", with "Stop implementation, revert partial increments, and return to the last approved plan revision" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for task-list masquerading as a plan
- [ ] Detection exists for false precision
- [ ] Detection exists for dependency inversion
- [ ] Detection exists for approval theater

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
