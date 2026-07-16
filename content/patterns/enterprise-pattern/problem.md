# Enterprise: Problem

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enterprise problem operationalizes this pattern outcome: operate ai capabilities with enforceable governance across tenants, jurisdictions, and risk tiers.

## Observable problem

1. When regulated or personal data is processed, an undocumented assumption can become a production decision.
2. When AI contributes to a material decision, an undocumented assumption can become a production decision.
3. When shared services span business units or regions, an undocumented assumption can become a production decision.

## Quality boundary

Enterprise problem quality boundary gate 2 is accepted only when "inventory completeness = 100%" is source-verifiable; otherwise, disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.

## Tradeoffs

Enterprise problem deliberately spends additional review time to protect "inventory completeness = 100%"; evidence weakness triggers "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle".

## Anti-patterns

Enterprise problem rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Enterprise considerations

Enterprise problem governance binds owner, policy revision, and retained proof to "inventory completeness = 100%", with "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" as the recorded recovery authority.

## Checklist

- [ ] Trigger and affected population are quantified
- [ ] Baseline and desired outcome are distinguishable
- [ ] Scope and non-goals have named owners

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
