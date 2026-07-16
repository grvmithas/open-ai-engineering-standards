# Hotfix Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Contain an active production defect with the smallest reversible intervention.

## Applicability

- customer harm is active or imminent
- normal release lead time exceeds incident tolerance
- incident command authorizes an emergency path

## Evidence

- incident severity and commander
- impact and affected scope
- live telemetry or reproduction
- last known-good artifact
- tested rollback command and communication plan

## Components

Hotfix README components gate 1 is accepted only when "time to containment meets severity target" is source-verifiable; otherwise, execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.

README is component thirteen.

## Outcome measures

- time to containment meets severity target
- affected requests/users trend down after action
- hotfix changes only authorized scope
- rollback remains within incident RTO

## Rollback

Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.

## Tradeoffs

Hotfix README deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix README rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Citations

- [Google SRE incident response](https://sre.google/sre-book/managing-incidents/)
- [NIST SP 800-61r2](https://doi.org/10.6028/NIST.SP.800-61r2)
- [PagerDuty Incident Response](https://response.pagerduty.com/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
