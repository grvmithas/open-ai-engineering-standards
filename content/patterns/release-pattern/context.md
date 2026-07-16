# Release: Context Contract

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Make the evidence needed to promote a signed artifact through progressive exposure with objective abort criteria authoritative, bounded, and reproducible.

| Required input | Acceptance test |
|---|---|
| signed artifact and provenance | owner, revision, retrieval time, and authority recorded for signed artifact and provenance |
| test and security results | owner, revision, retrieval time, and authority recorded for test and security results |
| SBOM and dependency policy | owner, revision, retrieval time, and authority recorded for SBOM and dependency policy |
| change record and release notes | owner, revision, retrieval time, and authority recorded for change record and release notes |
| SLO baseline and rollback rehearsal | owner, revision, retrieval time, and authority recorded for SLO baseline and rollback rehearsal |

## Assembly procedure

1. Tie each source to a trigger or workflow decision.
2. Resolve conflicting authority before analysis; preserve both revisions and the resolution.
3. Hash the accepted manifest and set expiry from the fastest-changing source.
4. Exclude unrelated material and redact secrets without removing decision-relevant constraints.

## Tradeoffs

Release context deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release context rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release context governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Checklist

- [ ] signed artifact and provenance is present and provenance-bearing
- [ ] test and security results is present and provenance-bearing
- [ ] SBOM and dependency policy is present and provenance-bearing
- [ ] change record and release notes is present and provenance-bearing
- [ ] SLO baseline and rollback rehearsal is present and provenance-bearing

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
