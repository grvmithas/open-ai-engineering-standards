# Hotfix: Subagents

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Hotfix subagents operationalizes this pattern outcome: contain an active production defect with the smallest reversible intervention.

| Subagent | Mandate | Required output |
|---|---|---|
| Incident commander | owns priorities, decisions, and communication | incident commander artifact with source IDs, uncertainty, and stop status |
| Hotfix implementer | creates the minimal change | hotfix implementer artifact with source IDs, uncertainty, and stop status |
| Safety reviewer | independently checks blast radius and rollback | safety reviewer artifact with source IDs, uncertainty, and stop status |

## Delegation protocol

Hotfix specialists receive only sources needed for "Establish incident command, severity, roles, and update cadence."; the parent retains effect approval and accountability for "time to containment meets severity target".

## Tradeoffs

Hotfix subagents deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix subagents rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix subagents governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Checklist

- [ ] Incident commander returned its required evidence
- [ ] Hotfix implementer returned its required evidence
- [ ] Safety reviewer returned its required evidence

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
