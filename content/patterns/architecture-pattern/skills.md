# Architecture: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform architecture work reproducibly.

## Scenario elicitation

**Trigger:** A stakeholder states a broad quality goal. **Procedure:** Write source, stimulus, environment, affected artifact, expected response, and numeric response measure; prioritize by business impact. **Verification:** Every priority quality attribute has testable normal and failure scenarios. **Unhappy path:** Reject adjectives such as scalable or secure without a response measure.

## Tradeoff analysis

**Trigger:** Two viable designs satisfy hard constraints. **Procedure:** Walk each design through priority scenarios, interactions, sensitivities, operational burden, cost, and organizational constraints. **Verification:** The ADR explains why the selected option wins and what it sacrifices. **Unhappy path:** Prototype the highest-risk uncertainty when paper analysis cannot distinguish options.

## Fitness-function design

**Trigger:** The ADR makes a claim that can decay. **Procedure:** Encode dependency, latency, resilience, security, cost, or topology assertions in CI or continuous telemetry with an owner and threshold. **Verification:** A seeded violation fails the function and alerts the accountable owner. **Unhappy path:** Reopen the ADR when a claim cannot be monitored.

## Tradeoffs

Independent Architecture skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Architecture, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Architecture skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Scenario elicitation produced its named, independently verifiable artifact
- [ ] Tradeoff analysis produced its named, independently verifiable artifact
- [ ] Fitness-function design produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
