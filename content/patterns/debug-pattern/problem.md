# Debug: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Debug problem operationalizes this pattern outcome: isolate a software defect through reproducible observations and falsifiable experiments.

## Observable problem

1. When actual behavior violates a specification, an undocumented assumption can become a production decision.
2. When the failure is intermittent or environment-sensitive, an undocumented assumption can become a production decision.
3. When multiple plausible causes remain, an undocumented assumption can become a production decision.

## Quality boundary

Debug problem quality boundary gate 2 is accepted only when "reproduction rate before fix is recorded" is source-verifiable; otherwise, revert probes and fix, restore the locked environment, and preserve diagnostic artifacts.

## Tradeoffs

Debug problem deliberately spends additional review time to protect "reproduction rate before fix is recorded"; evidence weakness triggers "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts".

## Anti-patterns

Debug problem rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Enterprise considerations

Debug problem governance binds owner, policy revision, and retained proof to "reproduction rate before fix is recorded", with "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
