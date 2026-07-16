# Root Cause: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Root Cause problem operationalizes this pattern outcome: explain why an incident occurred and prioritize controls that prevent or limit recurrence.

## Observable problem

1. When a material incident is stabilized, an undocumented assumption can become a production decision.
2. When a near miss reveals systemic exposure, an undocumented assumption can become a production decision.
3. When the same failure class recurs, an undocumented assumption can become a production decision.

## Quality boundary

Root Cause problem quality boundary gate 2 is accepted only when "100% causal edges cite evidence" is source-verifiable; otherwise, withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.

## Tradeoffs

Root Cause problem deliberately spends additional review time to protect "100% causal edges cite evidence"; evidence weakness triggers "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection".

## Anti-patterns

Root Cause problem rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Enterprise considerations

Root Cause problem governance binds owner, policy revision, and retained proof to "100% causal edges cite evidence", with "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
