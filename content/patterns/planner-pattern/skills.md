# Planner: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform planner work reproducibly.

## Decision decomposition

**Trigger:** Planning input contains an unresolved implementation choice. **Procedure:** Convert each ambiguity into a decision record with owner, options, hard constraints, due point, and consequence of deferral. **Verification:** Every execution step references a resolved decision; blocking decisions count is zero. **Unhappy path:** Stop plan approval and return the decision to its accountable owner.

## Dependency sequencing

**Trigger:** The plan changes components with ordering constraints. **Procedure:** Build a directed graph from build, deploy, schema, contract, and organizational dependencies; collapse cycles into a jointly delivered increment and topologically sort the rest. **Verification:** The graph has no unexplained cycle and every increment can be verified before dependents start. **Unhappy path:** Re-slice the increments instead of inventing a linear order.

## Pre-mortem facilitation

**Trigger:** A complete draft is ready for challenge. **Procedure:** Ask domain, security, and operations owners to assume the plan failed; convert credible scenarios into prevention, detection, rollback, or explicit risk acceptance. **Verification:** Every high-impact scenario has an owner and control in the plan. **Unhappy path:** Escalate uncovered irreversible failure before approval.

## Tradeoffs

Independent Planner skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Planner, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Planner skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Decision decomposition produced its named, independently verifiable artifact
- [ ] Dependency sequencing produced its named, independently verifiable artifact
- [ ] Pre-mortem facilitation produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
