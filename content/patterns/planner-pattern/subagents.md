# Planner: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Planner subagents operationalizes this pattern outcome: turn ambiguous engineering work into a decision-complete execution contract.

| Subagent | Mandate | Required output |
|---|---|---|
| Repository mapper | builds a symbol and ownership map | repository mapper artifact with source IDs, uncertainty, and stop status |
| Dependency analyst | finds ordering and contract edges | dependency analyst artifact with source IDs, uncertainty, and stop status |
| Risk challenger | runs pre-mortem and tests reversibility | risk challenger artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Planner specialists receive only sources needed for "Classify ambiguity and list decisions execution must not make."; the parent retains effect approval and accountability for "decision completeness = 100%".

## Tradeoffs

Planner subagents deliberately spends additional review time to protect "decision completeness = 100%"; evidence weakness triggers "Stop implementation, revert partial increments, and return to the last approved plan revision".

## Anti-patterns

Planner subagents rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Enterprise considerations

Planner subagents governance binds owner, policy revision, and retained proof to "decision completeness = 100%", with "Stop implementation, revert partial increments, and return to the last approved plan revision" as the recorded recovery authority.

## Checklist

- [ ] Repository mapper returned its required evidence
- [ ] Dependency analyst returned its required evidence
- [ ] Risk challenger returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
