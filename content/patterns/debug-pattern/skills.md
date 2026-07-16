# Debug: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform debug work reproducibly.

## Reproduction minimization

**Trigger:** A failure can be observed but has too many variables. **Procedure:** Remove inputs, services, timing conditions, and configuration one at a time while preserving the symptom and a known-good control. **Verification:** The smallest case reproduces at a recorded rate on a locked environment. **Unhappy path:** Instrument rather than guess when minimization makes an intermittent failure disappear.

## Hypothesis matrix

**Trigger:** More than one mechanism explains the symptom. **Procedure:** For each hypothesis, record predicted observations, contradicting observations, cheapest discriminating test, and expected control result. **Verification:** Every experiment can eliminate at least one candidate cause. **Unhappy path:** Collect new telemetry when hypotheses make identical predictions.

## Controlled experimentation

**Trigger:** A discriminating test is selected. **Procedure:** Capture baseline, vary exactly one factor, run treatment and control repeatedly, and retain raw output with environment fingerprint. **Verification:** Observed direction and magnitude match the surviving hypothesis and regression test. **Unhappy path:** Restore baseline before testing the next variable.

## Tradeoffs

Independent Debug skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Debug, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Debug skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Reproduction minimization produced its named, independently verifiable artifact
- [ ] Hypothesis matrix produced its named, independently verifiable artifact
- [ ] Controlled experimentation produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
