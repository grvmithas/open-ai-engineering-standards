# Release: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Release problem operationalizes this pattern outcome: promote a signed artifact through progressive exposure with objective abort criteria.

## Observable problem

1. When a verified artifact is ready for production, an undocumented assumption can become a production decision.
2. When customer behavior or data can change, an undocumented assumption can become a production decision.
3. When rollback must meet an operational RTO, an undocumented assumption can become a production decision.

## Quality boundary

Release problem quality boundary gate 2 is accepted only when "artifact-to-runtime digest match = 100%" is source-verifiable; otherwise, halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.

## Tradeoffs

Release problem deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release problem rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release problem governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
