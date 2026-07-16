# Planner Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Turn ambiguous engineering work into a decision-complete execution contract.

## Applicability

- more than three components change
- a dependency order constrains delivery
- an API, schema, or trust boundary changes

## Evidence

- acceptance criteria
- repository map and owners
- ADRs and dependency graph
- API/schema contracts
- delivery and risk constraints

## Components

Planner README components gate 1 is accepted only when "decision completeness = 100%" is source-verifiable; otherwise, stop implementation, revert partial increments, and return to the last approved plan revision.

README is component thirteen.

## Outcome measures

- decision completeness = 100%
- unplanned file-change rate < 10%
- plan-driven rework < 10%
- all critical-path owners acknowledge

## Rollback

Stop implementation, revert partial increments, and return to the last approved plan revision.

## Tradeoffs

Planner README deliberately spends additional review time to protect "decision completeness = 100%"; evidence weakness triggers "Stop implementation, revert partial increments, and return to the last approved plan revision".

## Anti-patterns

Planner README rejects shortcuts around "Classify ambiguity and list decisions execution must not make." because they sever the evidence chain required for "decision completeness = 100%".

## Citations

- [C4 model](https://c4model.com/)
- [Architecture Decision Records](https://adr.github.io/)
- [NASA Systems Engineering Handbook](https://www.nasa.gov/reference/systems-engineering-handbook/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
