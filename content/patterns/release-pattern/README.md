# Release Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Promote a signed artifact through progressive exposure with objective abort criteria.

## Applicability

- a verified artifact is ready for production
- customer behavior or data can change
- rollback must meet an operational RTO

## Evidence

- signed artifact and provenance
- test and security results
- SBOM and dependency policy
- change record and release notes
- SLO baseline and rollback rehearsal

## Components

Release README components gate 1 is accepted only when "artifact-to-runtime digest match = 100%" is source-verifiable; otherwise, halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.

README is component thirteen.

## Outcome measures

- artifact-to-runtime digest match = 100%
- deployment success > 99%
- rollback completes within RTO
- no accelerated SLO burn during holds

## Rollback

Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.

## Tradeoffs

Release README deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release README rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Citations

- [SLSA](https://slsa.dev/spec/v1.0/)
- [CISA SBOM](https://www.cisa.gov/sbom)
- [Google SRE canarying](https://sre.google/workbook/canarying-releases/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
