# OAIES Pattern Library

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide twelve distinct production methods for consequential AI-assisted engineering. The thirteen files in each pattern are operational specifications, not renamed copies of a universal agent loop.

## Catalog

| Pattern | Domain outcome | Maturity |
|---|---|---|
| [Planner](./planner-pattern/README.md) | Turn ambiguous engineering work into a decision-complete execution contract | Stable 2.0 |
| [Reviewer](./reviewer-pattern/README.md) | Detect consequential defects with requirement-traceable, severity-calibrated findings | Stable 2.0 |
| [Context](./context-pattern/README.md) | Construct a minimal, provenance-bearing information package that preserves decision quality | Stable 2.0 |
| [Debug](./debug-pattern/README.md) | Isolate a software defect through reproducible observations and falsifiable experiments | Stable 2.0 |
| [Migration](./migration-pattern/README.md) | Transition data or services while preserving invariants and a tested return path | Stable 2.0 |
| [Legacy Modernization](./legacy-modernization-pattern/README.md) | Replace obsolete internals incrementally while preserving observed business behavior | Stable 2.0 |
| [Architecture](./architecture-pattern/README.md) | Choose and govern a system design against quantified quality-attribute scenarios | Stable 2.0 |
| [Optimization](./optimization-pattern/README.md) | Improve a profiled bottleneck while protecting correctness and downstream guardrails | Stable 2.0 |
| [Enterprise](./enterprise-pattern/README.md) | Operate AI capabilities with enforceable governance across tenants, jurisdictions, and risk tiers | Stable 2.0 |
| [Release](./release-pattern/README.md) | Promote a signed artifact through progressive exposure with objective abort criteria | Stable 2.0 |
| [Hotfix](./hotfix-pattern/README.md) | Contain an active production defect with the smallest reversible intervention | Stable 2.0 |
| [Root Cause](./root-cause-pattern/README.md) | Explain why an incident occurred and prioritize controls that prevent or limit recurrence | Stable 2.0 |

## Completeness contract

Each pattern contains README, problem, context, workflow, prompt, agent, subagents, skills, hooks, checklist, concrete example, failures, and enterprise notes. Run `node validate-pattern-library.mjs` after edits; it verifies structure, local links, placeholders, prompt/agent controls, exact duplicate prose, and pairwise corpus similarity.

## Selection rule

Select from the documented trigger, then execute that pattern's domain workflow. Effect approval is necessary but never substitutes for domain evidence, method, verification, or recovery.

## Tradeoffs

Maintaining distinct methods costs more than a shared template. That cost is required because planning, debugging, migration, incident analysis, and the other domains fail in materially different ways.

## Anti-patterns

Do not satisfy the library by renaming nouns in generic prose. Repeated substantive lines or high pairwise similarity fail validation.

## Enterprise considerations

Organizations map the pattern-specific artifacts to their control catalog, identity system, evidence retention, jurisdiction, incident process, and separation-of-duties model.

## Checklist

- [ ] Twelve indexed patterns each contain thirteen components
- [ ] Domain workflows, roles, skills, hooks, failures, examples, citations, and enterprise controls are distinct
- [ ] Similarity and integrity validation passes

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
