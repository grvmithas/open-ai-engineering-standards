# Root Cause: Skills

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Provide the domain procedures required to perform root cause work reproducibly.

## Timeline reconstruction

**Trigger:** The incident is stable enough for investigation. **Procedure:** Normalize source clocks to UTC, record offsets and uncertainty, merge telemetry, deploys, decisions, and communications, and reconcile conflicts without averaging them away. **Verification:** Every material event cites a contemporaneous source and uncertain intervals remain marked. **Unhappy path:** Request missing records or narrow claims rather than filling gaps from memory.

## Causal graphing

**Trigger:** A verified timeline and impact boundary exist. **Procedure:** Connect initiating events, mechanisms, contributing conditions, missing or failed controls, and impact as directed edges; branch where five-whys would force a single chain. **Verification:** Every edge has evidence and an alternative explanation review. **Unhappy path:** Remove unsupported edges and preserve them as rejected hypotheses.

## Counterfactual testing

**Trigger:** A candidate causal edge would change corrective action. **Procedure:** Replay, simulate, or reason from a controlled comparison with the condition removed; predict impact before observing the result. **Verification:** The result distinguishes necessary, sufficient, and contributing conditions. **Unhappy path:** Mark the claim provisional when the counterfactual cannot be tested.

## Corrective-action hierarchy

**Trigger:** The causal graph survives challenge. **Procedure:** Prioritize hazard elimination, engineered prevention, blast-radius reduction, and detection before procedure or training; attach owner, due date, leading indicator, and 30/60/90-day review. **Verification:** The action breaks a named causal edge and effectiveness telemetry remains healthy. **Unhappy path:** Reopen the action when it closes administratively without changing recurrence risk.

## Tradeoffs

Independent Root Cause skill verification spends a second practitioner pass to prevent an attractive artifact from substituting for reproducible domain evidence.

## Anti-patterns

For Root Cause, never claim skill completion from narrative alone; retain the domain inputs, transformations, thresholds, outputs, and unhappy-path result.

## Enterprise considerations

Enterprise Root Cause skill versions have named technical owners and mandatory review after a related incident, policy revision, or toolchain change.

## Checklist

- [ ] Timeline reconstruction produced its named, independently verifiable artifact
- [ ] Causal graphing produced its named, independently verifiable artifact
- [ ] Counterfactual testing produced its named, independently verifiable artifact
- [ ] Corrective-action hierarchy produced its named, independently verifiable artifact

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
