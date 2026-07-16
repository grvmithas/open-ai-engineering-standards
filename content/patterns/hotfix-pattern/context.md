# Hotfix: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to contain an active production defect with the smallest reversible intervention authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| incident severity and commander | owner, revision, retrieval time, and authority recorded for incident severity and commander |
| impact and affected scope | owner, revision, retrieval time, and authority recorded for impact and affected scope |
| live telemetry or reproduction | owner, revision, retrieval time, and authority recorded for live telemetry or reproduction |
| last known-good artifact | owner, revision, retrieval time, and authority recorded for last known-good artifact |
| tested rollback command and communication plan | owner, revision, retrieval time, and authority recorded for tested rollback command and communication plan |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Hotfix context deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix context rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix context governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Checklist

- [ ] incident severity and commander is present and provenance-bearing
- [ ] impact and affected scope is present and provenance-bearing
- [ ] live telemetry or reproduction is present and provenance-bearing
- [ ] last known-good artifact is present and provenance-bearing
- [ ] tested rollback command and communication plan is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
