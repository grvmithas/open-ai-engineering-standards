# Planner: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Planner problem operationalizes this pattern outcome: turn ambiguous engineering work into a decision-complete execution contract.

## Observable problem

1. When more than three components change, an undocumented assumption can become a production decision.
2. When a dependency order constrains delivery, an undocumented assumption can become a production decision.
3. When an API, schema, or trust boundary changes, an undocumented assumption can become a production decision.

## Quality boundary

Planner problem quality boundary gate 2 is accepted only when "decision completeness = 100%" is source-verifiable; otherwise, stop implementation, revert partial increments, and return to the last approved plan revision.

## Tradeoffs

Planner problem deliberately spends additional review time to protect "decision completeness = 100%"; evidence weakness triggers "Stop implementation, revert partial increments, and return to the last approved plan revision".

## Anti-patterns

Planner problem rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Enterprise considerations

Planner problem governance binds owner, policy revision, and retained proof to "decision completeness = 100%", with "Stop implementation, revert partial increments, and return to the last approved plan revision" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
