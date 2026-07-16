# Release: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: a verified artifact is ready for production
- [ ] Trigger evidenced: customer behavior or data can change
- [ ] Trigger evidenced: rollback must meet an operational RTO

## Evidence package

- [ ] signed artifact and provenance has authority, revision, timestamp, and owner
- [ ] test and security results has authority, revision, timestamp, and owner
- [ ] SBOM and dependency policy has authority, revision, timestamp, and owner
- [ ] change record and release notes has authority, revision, timestamp, and owner
- [ ] SLO baseline and rollback rehearsal has authority, revision, timestamp, and owner

## Domain execution

- [ ] Freeze artifact digest, configuration, migrations, and release evidence
- [ ] Verify provenance, policy, compatibility, and environment readiness
- [ ] Rehearse rollback and forward-fix against production-like state
- [ ] Deploy internal or dark with no customer authority
- [ ] Canary a representative cohort with automatic abort thresholds
- [ ] Hold and compare SLO, business, security, and support signals
- [ ] Expand 1/10/25/50/100% with approval at risk boundaries
- [ ] Close after observation window; preserve artifact and release ledger

## Measured verification

- [ ] Evidence demonstrates artifact-to-runtime digest match = 100%
- [ ] Evidence demonstrates deployment success > 99%
- [ ] Evidence demonstrates rollback completes within RTO
- [ ] Evidence demonstrates no accelerated SLO burn during holds

## Recovery and closure

- [ ] Rehearsed rollback can halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Release checklist rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Enterprise considerations

Release checklist governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
