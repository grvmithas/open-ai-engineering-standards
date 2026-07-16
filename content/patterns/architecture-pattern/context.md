# Architecture: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to choose and govern a system design against quantified quality-attribute scenarios authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| quality-attribute scenarios | owner, revision, retrieval time, and authority recorded for quality-attribute scenarios |
| workload and failure model | owner, revision, retrieval time, and authority recorded for workload and failure model |
| threat model | owner, revision, retrieval time, and authority recorded for threat model |
| cost and capacity model | owner, revision, retrieval time, and authority recorded for cost and capacity model |
| ADRs and organizational constraints | owner, revision, retrieval time, and authority recorded for ADRs and organizational constraints |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Architecture context deliberately spends additional review time to protect "all priority scenarios have measurable responses"; evidence weakness triggers "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture".

## Anti-patterns

Architecture context rejects shortcuts around "Name stakeholders and express quality attributes as stimulus-response scenarios." because they sever the evidence chain required for "all priority scenarios have measurable responses".

## Enterprise considerations

Architecture context governance binds owner, policy revision, and retained proof to "all priority scenarios have measurable responses", with "Supersede the ADR, disable the new topology at its seam, and restore the prior approved architecture" as the recorded recovery authority.

## Checklist

- [ ] quality-attribute scenarios is present and provenance-bearing
- [ ] workload and failure model is present and provenance-bearing
- [ ] threat model is present and provenance-bearing
- [ ] cost and capacity model is present and provenance-bearing
- [ ] ADRs and organizational constraints is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
