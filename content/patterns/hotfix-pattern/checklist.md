# Hotfix: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: customer harm is active or imminent
- [ ] Trigger evidenced: normal release lead time exceeds incident tolerance
- [ ] Trigger evidenced: incident command authorizes an emergency path

## Evidence package

- [ ] incident severity and commander has authority, revision, timestamp, and owner
- [ ] impact and affected scope has authority, revision, timestamp, and owner
- [ ] live telemetry or reproduction has authority, revision, timestamp, and owner
- [ ] last known-good artifact has authority, revision, timestamp, and owner
- [ ] tested rollback command and communication plan has authority, revision, timestamp, and owner

## Domain execution

- [ ] Establish incident command, severity, roles, and update cadence
- [ ] Contain blast radius using flags, rate limits, isolation, or rollback
- [ ] State the narrow failed invariant and evidence; avoid broad diagnosis
- [ ] Choose the smallest reversible remediation and explicit non-goals
- [ ] Pair-author and independently review the hotfix
- [ ] Test the exact failure, critical smoke path, and rollback
- [ ] Canary under incident observation with automatic abort
- [ ] Close emergency path; schedule full RCA and durable remediation

## Measured verification

- [ ] Evidence demonstrates time to containment meets severity target
- [ ] Evidence demonstrates affected requests/users trend down after action
- [ ] Evidence demonstrates hotfix changes only authorized scope
- [ ] Evidence demonstrates rollback remains within incident RTO

## Recovery and closure

- [ ] Rehearsed rollback can execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Hotfix checklist rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix checklist governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
