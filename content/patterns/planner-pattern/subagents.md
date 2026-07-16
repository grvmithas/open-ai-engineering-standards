# Planner Pattern — Subagents

> **Pattern:** Planner  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Context Assembler | Fetches relevant files, ADRs, schemas, and call sites | Before planning | Context package with paths + excerpts |
| Dependency Analyzer | Maps component and data dependencies | During planning | Mermaid or table of ordered edges |
| Risk Assessor | Identifies implementation, security, and ops risks | After plan draft | Top risks + mitigations + rollback notes |

## Context Assembler contract

- Prefer precision over volume: include files the change will touch or depend on
- Exclude secrets, production dumps, and unrelated monorepo trees
- Label each excerpt with path and why it was included

## Dependency Analyzer contract

- Edge types: compile-time, runtime, data, deploy-order
- Cycle detection: if a cycle exists, plan must break it (feature flag, expand/contract, etc.)
- Output must drive the **Implementation Sequence** section

## Risk Assessor contract

- At least three risks for multi-service or schema-changing work
- Each risk needs: likelihood, impact, mitigation, detection signal
- Schema/API breaks always appear as risks even when “expected”
