# Reviewer: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform reviewer work reproducibly.

## Behavioral diffing

**Trigger:** A revision changes executable behavior or a contract. **Procedure:** Map changed inputs, outputs, state, authority, errors, and timing to requirements before assessing implementation style. **Verification:** Each changed behavior has a requirement and test anchor. **Unhappy path:** Block review when intended behavior cannot be established.

## Defect reproduction

**Trigger:** A suspected defect could be blocking. **Procedure:** Construct the smallest input and environment that fails on the reviewed revision and succeeds on the control revision or stated oracle. **Verification:** Attach commands, revision, expected result, actual result, and raw output. **Unhappy path:** Withdraw or downgrade a finding that cannot be reproduced.

## Severity calibration

**Trigger:** A reproduced defect needs prioritization. **Procedure:** Score reachability, affected population, impact, detectability, existing controls, and reversibility; use the highest credible consequence, not reviewer intuition. **Verification:** A second reviewer can derive the same severity from the recorded factors. **Unhappy path:** Escalate disagreement on release-blocking severity to the risk owner.

## Tradeoffs

Independent Reviewer skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Reviewer, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Reviewer skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Behavioral diffing produced its named, independently verifiable artifact
- [ ] Defect reproduction produced its named, independently verifiable artifact
- [ ] Severity calibration produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
