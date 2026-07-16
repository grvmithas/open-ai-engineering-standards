# Migration: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Migration failures operationalizes this pattern outcome: transition data or services while preserving invariants and a tested return path.

| Failure | Observable signal | Recovery |
|---|---|---|
| big-bang cutover | unknown incompatibility reaches all traffic | return to expand/contract phases |
| count-only reconciliation | equal counts hide wrong values | compare canonical hashes and invariants |
| non-idempotent replay | retry duplicates effects | introduce stable migration keys |
| permanent dual-write | divergence surface never closes | assign contract deadline and owner |

## Rollback failure

Migration failures rollback failure gate 2 is accepted only when "record and monetary reconciliation = 100%" is source-verifiable; otherwise, stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events.

## Tradeoffs

Migration failures deliberately spends additional review time to protect "record and monetary reconciliation = 100%"; evidence weakness triggers "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events".

## Anti-patterns

Migration failures rejects shortcuts around "Define invariants, loss tolerance, RPO, RTO, and abort thresholds." because they sever the evidence chain required for "record and monetary reconciliation = 100%".

## Enterprise considerations

Migration failures governance binds owner, policy revision, and retained proof to "record and monetary reconciliation = 100%", with "Stop writers, route to the compatibility path, restore the last verified checkpoint, and reconcile replayed events" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for big-bang cutover
- [ ] Detection exists for count-only reconciliation
- [ ] Detection exists for non-idempotent replay
- [ ] Detection exists for permanent dual-write

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
