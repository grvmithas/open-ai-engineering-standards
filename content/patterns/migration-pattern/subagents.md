# Migration: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Migration subagents operationalizes this pattern outcome: transition data or services while preserving invariants and a tested return path.

| Subagent | Mandate | Required output |
|---|---|---|
| Data profiler | classifies shape and anomalies | data profiler artifact with source IDs, uncertainty, and stop status |
| Compatibility engineer | designs coexistence contracts | compatibility engineer artifact with source IDs, uncertainty, and stop status |
| Reconciliation auditor | independently proves equivalence | reconciliation auditor artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Migration specialists receive only sources needed for "Define invariants, loss tolerance, RPO, RTO, and abort thresholds."; the parent retains effect approval and accountability for "record and monetary reconciliation = 100%".

## Tradeoffs

Migration subagents deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration subagents rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration subagents governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Checklist

- [ ] Data profiler returned its required evidence
- [ ] Compatibility engineer returned its required evidence
- [ ] Reconciliation auditor returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
