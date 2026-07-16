# Enterprise: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform enterprise work reproducibly.

## Use-case risk tiering

**Trigger:** A new AI use case or material capability change is proposed. **Procedure:** Score impact, autonomy, affected population, data sensitivity, reach, detectability, and reversibility; map the result to prohibited, high, medium, or low controls. **Verification:** Independent risk review reproduces the tier from inventory evidence. **Unhappy path:** Block deployment when ownership, purpose, or affected population is unknown.

## Control mapping

**Trigger:** The use-case tier is approved. **Procedure:** Map each identified harm to preventive, detective, responsive, and evidence controls with owner, frequency, threshold, and exception path. **Verification:** Every high risk has operating-effectiveness evidence, not policy text alone. **Unhappy path:** Add a compensating control and expiry when the standard control cannot operate.

## Model change governance

**Trigger:** Model, prompt, retrieval, tools, or policy will change. **Procedure:** Version the complete bundle, rerun tier-specific evaluations, compare cohorts, canary tenants, and retain a kill switch. **Verification:** Runtime bundle digest matches approval and harm indicators stay within limits. **Unhappy path:** Restore the last approved bundle and revoke changed tool authority.

## Tradeoffs

Independent Enterprise skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Enterprise, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Enterprise skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Use-case risk tiering produced its named, independently verifiable artifact
- [ ] Control mapping produced its named, independently verifiable artifact
- [ ] Model change governance produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
