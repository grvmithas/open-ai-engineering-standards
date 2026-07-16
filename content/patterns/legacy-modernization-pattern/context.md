# Legacy Modernization: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to replace obsolete internals incrementally while preserving observed business behavior authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| characterization tests | owner, revision, retrieval time, and authority recorded for characterization tests |
| runtime dependency and call graph | owner, revision, retrieval time, and authority recorded for runtime dependency and call graph |
| consumer contracts | owner, revision, retrieval time, and authority recorded for consumer contracts |
| change and incident history | owner, revision, retrieval time, and authority recorded for change and incident history |
| support/security lifecycle dates | owner, revision, retrieval time, and authority recorded for support/security lifecycle dates |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Legacy Modernization context deliberately spends additional review time to protect "characterized critical behavior = 100%"; evidence weakness triggers "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation".

## Anti-patterns

Legacy Modernization context rejects shortcuts around "Inventory business capabilities, consumers, and operational pain." because they sever the evidence chain required for "characterized critical behavior = 100%".

## Enterprise considerations

Legacy Modernization context governance binds owner, policy revision, and retained proof to "characterized critical behavior = 100%", with "Flip the strangler route to the legacy implementation and replay buffered work after reconciliation" as the recorded recovery authority.

## Checklist

- [ ] characterization tests is present and provenance-bearing
- [ ] runtime dependency and call graph is present and provenance-bearing
- [ ] consumer contracts is present and provenance-bearing
- [ ] change and incident history is present and provenance-bearing
- [ ] support/security lifecycle dates is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
