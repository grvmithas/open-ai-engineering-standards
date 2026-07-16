# Enterprise: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Enterprise failures operationalizes this pattern outcome: operate ai capabilities with enforceable governance across tenants, jurisdictions, and risk tiers.

| Failure | Observable signal | Recovery |
|---|---|---|
| policy PDF | controls are descriptive but unenforced | move decisions to gateway policy |
| model-only evaluation | workflow harms are missed | test end-to-end use case |
| one-time approval | vendor/model drift escapes review | subscribe to changes and reevaluate |
| global default | jurisdiction and tenant needs conflict | apply scoped policy bundles |

## Rollback failure

Enterprise failures rollback failure gate 2 is accepted only when "inventory completeness = 100%" is source-verifiable; otherwise, disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.

## Tradeoffs

Enterprise failures deliberately spends additional review time to protect "inventory completeness = 100%"; evidence weakness triggers "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle".

## Anti-patterns

Enterprise failures rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Enterprise considerations

Enterprise failures governance binds owner, policy revision, and retained proof to "inventory completeness = 100%", with "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for policy PDF
- [ ] Detection exists for model-only evaluation
- [ ] Detection exists for one-time approval
- [ ] Detection exists for global default

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
