# Architecture: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Architecture problem operationalizes this pattern outcome: choose and govern a system design against quantified quality-attribute scenarios.

## Observable problem

1. When a decision is expensive to reverse, an undocumented assumption can become a production decision.
2. When quality attributes conflict, an undocumented assumption can become a production decision.
3. When multiple teams depend on a stable boundary, an undocumented assumption can become a production decision.

## Quality boundary

Architecture problem quality boundary gate 2 is accepted only when "all priority scenarios have measurable responses" is source-verifiable; otherwise, supersede the adr, disable the new topology at its seam, and restore the prior approved architecture.

## Tradeoffs

Architecture problem deliberately spends additional review time to protect "all priority scenarios have measurable responses"; evidence weakness triggers "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture".

## Anti-patterns

Architecture problem rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Enterprise considerations

Architecture problem governance binds owner, policy revision, and retained proof to "all priority scenarios have measurable responses", with "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
