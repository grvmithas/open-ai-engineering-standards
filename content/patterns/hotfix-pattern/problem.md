# Hotfix: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Hotfix problem operationalizes this pattern outcome: contain an active production defect with the smallest reversible intervention.

## Observable problem

1. When customer harm is active or imminent, an undocumented assumption can become a production decision.
2. When normal release lead time exceeds incident tolerance, an undocumented assumption can become a production decision.
3. When incident command authorizes an emergency path, an undocumented assumption can become a production decision.

## Quality boundary

Hotfix problem quality boundary gate 2 is accepted only when "time to containment meets severity target" is source-verifiable; otherwise, execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.

## Tradeoffs

Hotfix problem deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix problem rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix problem governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
