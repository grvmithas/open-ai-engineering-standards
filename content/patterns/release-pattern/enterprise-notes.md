# Release: Enterprise Operations

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Release enterprise-notes operationalizes this pattern outcome: promote a signed artifact through progressive exposure with objective abort criteria.

## Tailored controls

Release segregation separates build, approval, and production identities. Evidence supports SOX, PCI, customer notices, regional freezes, accessibility attestation, and vendor deployment windows.

## Governance model

Release enterprise-notes governance binds owner, policy revision, and retained proof to "artifact-to-runtime digest match = 100%", with "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health" as the recorded recovery authority.

## Metrics and assurance

- Control dashboard reports artifact-to-runtime digest match = 100%.
- Control dashboard reports deployment success > 99%.
- Control dashboard reports rollback completes within RTO.
- Control dashboard reports no accelerated SLO burn during holds.

Release enterprise-notes metrics and assurance gate 3 is accepted only when "artifact-to-runtime digest match = 100%" is source-verifiable; otherwise, halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health.

## Tradeoffs

Release enterprise-notes deliberately spends additional review time to protect "artifact-to-runtime digest match = 100%"; evidence weakness triggers "Halt promotion, redeploy the signed previous artifact, reverse only backward-safe migrations, and verify service/data health".

## Anti-patterns

Release enterprise-notes rejects shortcuts around "Freeze artifact digest, configuration, migrations, and release evidence." because they sever the evidence chain required for "artifact-to-runtime digest match = 100%".

## Citations

- [SLSA](https://slsa.dev/spec/v1.0/)
- [CISA SBOM](https://www.cisa.gov/sbom)
- [Google SRE canarying](https://sre.google/workbook/canarying-releases/)

## Checklist

- [ ] RACI, data flow, threat model, capacity, and recovery are current
- [ ] Audit evidence can be retrieved within one business day

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
