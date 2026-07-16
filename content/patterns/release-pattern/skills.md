# Release: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform release work reproducibly.

## Progressive delivery

**Trigger:** A signed artifact is eligible for production. **Procedure:** Choose representative cohorts, traffic stages, hold periods, business/SLO/security signals, and automatic abort thresholds before exposure. **Verification:** Every promotion has completed its hold with cohort comparison and named approval. **Unhappy path:** Abort and restore the previous digest without negotiating thresholds during release.

## Release evidence verification

**Trigger:** A release candidate is frozen. **Procedure:** Bind source revision, reproducible build, signatures, SBOM, policy result, artifact digest, configuration, migration, and runtime identity. **Verification:** Independent verification traces production bytes back to reviewed source. **Unhappy path:** Reject mutable tags, missing attestations, or environment-built artifacts.

## Operational rollback

**Trigger:** The candidate can alter production state. **Procedure:** Rehearse artifact restore, feature disablement, backward-compatible schema behavior, queue/event handling, cache effects, and health verification. **Verification:** Rollback time and restored data/service invariants meet RTO and RPO. **Unhappy path:** Do not release when rollback depends on an untested destructive migration.

## Tradeoffs

Independent Release skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Release, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Release skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Progressive delivery produced its named, independently verifiable artifact
- [ ] Release evidence verification produced its named, independently verifiable artifact
- [ ] Operational rollback produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
