# Optimization Pattern — Problem

> **Pattern:** Optimization  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Performance work ships on intuition: no baseline, many variables changed at once, p50 celebrated while p99 or correctness quietly regresses.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| No baseline | Cannot prove improvement |
| Multi-knob PRs | Cannot attribute the win/loss |
| Correctness break | Faster path fails oracle |
| Contract blind | p99/cost SLO ignored |

## Root cause

Optimization prestige rewards visible activity. Measurement and oracles feel like bureaucracy until a silent break hits production.

## What breaks when this pattern is skipped

- Perf “wins” roll back after incidents
- Eval/quality gates fail after hot-path edits
- Arguments replace dashboards

## Non-goals of this pattern

- Not premature micro-opts without a measured hotspot
- Not a substitute for algorithmic redesign when complexity dominates
- Not auto-tune via MCP in production

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Optimization problem page expanded with skip-impact and operator symptoms.
