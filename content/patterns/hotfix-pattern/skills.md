# Hotfix: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform hotfix work reproducibly.

## Rapid containment

**Trigger:** Active impact exceeds the incident tolerance. **Procedure:** Compare feature disablement, traffic isolation, rollback, rate limiting, and access revocation; choose the fastest reversible control that reduces harm. **Verification:** Live affected-user or request metrics improve immediately after containment. **Unhappy path:** Escalate incident command when containment moves rather than reduces impact.

## Minimal patching

**Trigger:** Containment is insufficient and the failed invariant is localized. **Procedure:** Restrict changed files and behavior to the causal path, prohibit refactoring, pair author, and independently review against explicit non-goals. **Verification:** The exact incident test and critical smoke path pass with an auditable small diff. **Unhappy path:** Return to containment when the patch requires architectural decisions.

## Incident verification

**Trigger:** A hotfix canary receives production traffic. **Procedure:** Compare impacted signal, control cohort, SLOs, security, data integrity, and rollback readiness for the severity-specific hold. **Verification:** Impact declines without a new regression and communication records cite actual metrics. **Unhappy path:** Invoke the preapproved rollback at the first abort threshold.

## Tradeoffs

Independent Hotfix skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Hotfix, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Hotfix skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Rapid containment produced its named, independently verifiable artifact
- [ ] Minimal patching produced its named, independently verifiable artifact
- [ ] Incident verification produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
