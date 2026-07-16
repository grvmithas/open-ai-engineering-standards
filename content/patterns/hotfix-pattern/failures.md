# Hotfix: Failure Modes

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Hotfix failures operationalizes this pattern outcome: contain an active production defect with the smallest reversible intervention.

| Failure | Observable signal | Recovery |
|---|---|---|
| emergency refactor | scope exceeds failed invariant | reduce to containment patch |
| diagnosis before containment | harm continues during analysis | stabilize first |
| hotfix becomes permanent | temporary bypass persists | assign expiry and durable fix |
| silent response | stakeholders infer status | follow severity cadence |

## Rollback failure

Hotfix failures rollback failure gate 2 is accepted only when "time to containment meets severity target" is source-verifiable; otherwise, execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.

## Tradeoffs

Hotfix failures deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix failures rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix failures governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Checklist

- [ ] Detection exists for emergency refactor
- [ ] Detection exists for diagnosis before containment
- [ ] Detection exists for hotfix becomes permanent
- [ ] Detection exists for silent response

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
