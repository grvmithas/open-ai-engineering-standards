# Enterprise: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to operate AI capabilities with enforceable governance across tenants, jurisdictions, and risk tiers authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| AI system inventory | owner, revision, retrieval time, and authority recorded for AI system inventory |
| use-case risk assessment | owner, revision, retrieval time, and authority recorded for use-case risk assessment |
| data flow and classification | owner, revision, retrieval time, and authority recorded for data flow and classification |
| model/vendor evaluation | owner, revision, retrieval time, and authority recorded for model/vendor evaluation |
| control map, SLOs, and incident obligations | owner, revision, retrieval time, and authority recorded for control map, SLOs, and incident obligations |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Enterprise context deliberately spends additional review time to protect "inventory completeness = 100%"; evidence weakness triggers "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle".

## Anti-patterns

Enterprise context rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Enterprise considerations

Enterprise context governance binds owner, policy revision, and retained proof to "inventory completeness = 100%", with "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" as the recorded recovery authority.

## Checklist

- [ ] AI system inventory is present and provenance-bearing
- [ ] use-case risk assessment is present and provenance-bearing
- [ ] data flow and classification is present and provenance-bearing
- [ ] model/vendor evaluation is present and provenance-bearing
- [ ] control map, SLOs, and incident obligations is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
