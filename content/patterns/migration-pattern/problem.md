# Migration: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Migration problem operationalizes this pattern outcome: transition data or services while preserving invariants and a tested return path.

## Observable problem

1. When schema, provider, protocol, or platform changes, an undocumented assumption can become a production decision.
2. When old and new systems must coexist, an undocumented assumption can become a production decision.
3. When cutover can corrupt or strand data, an undocumented assumption can become a production decision.

## Quality boundary

Migration problem quality boundary gate 2 is accepted only when "record and monetary reconciliation = 100%" is source-verifiable; otherwise, stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.

## Tradeoffs

Migration problem deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration problem rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration problem governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
