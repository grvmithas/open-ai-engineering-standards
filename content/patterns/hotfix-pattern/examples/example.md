# Hotfix: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

INC-884: OAuth refresh loop drives 38% login failures. Commander disables refresh-v3 for 90% traffic, patch HOT-884 pins issuer normalization in one file, test oauth_issuer_case reproduces, canary reaches 10% for 10m, and rollback command rel deploy auth@sha256:7ca is rehearsed.

## Execution

1. Establish incident command, severity, roles, and update cadence; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Contain blast radius using flags, rate limits, isolation, or rollback; the record attaches the resulting artifact to the example's primary change or incident ID.
3. State the narrow failed invariant and evidence; avoid broad diagnosis; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Choose the smallest reversible remediation and explicit non-goals; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Pair-author and independently review the hotfix; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Test the exact failure, critical smoke path, and rollback; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Canary under incident observation with automatic abort; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Close emergency path; schedule full RCA and durable remediation; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that time to containment meets severity target.
- The owner records raw evidence that affected requests/users trend down after action.
- The owner records raw evidence that hotfix changes only authorized scope.
- The owner records raw evidence that rollback remains within incident RTO.

## Rollback exercise

Hotfix examples/example rollback exercise gate 1 is accepted only when "time to containment meets severity target" is source-verifiable; otherwise, execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment.

## Tradeoffs

Hotfix examples/example deliberately spends additional review time to protect "time to containment meets severity target"; evidence weakness triggers "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment".

## Anti-patterns

Hotfix examples/example rejects shortcuts around "Establish incident command, severity, roles, and update cadence." because they sever the evidence chain required for "time to containment meets severity target".

## Enterprise considerations

Hotfix examples/example governance binds owner, policy revision, and retained proof to "time to containment meets severity target", with "Execute the preapproved command to restore the known-good artifact or disable the feature, then verify containment" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
