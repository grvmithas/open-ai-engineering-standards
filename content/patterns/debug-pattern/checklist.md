# Debug: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: actual behavior violates a specification
- [ ] Trigger evidenced: the failure is intermittent or environment-sensitive
- [ ] Trigger evidenced: multiple plausible causes remain

## Evidence package

- [ ] minimal reproduction has authority, revision, timestamp, and owner
- [ ] expected-versus-actual record has authority, revision, timestamp, and owner
- [ ] logs, traces, metrics, dumps has authority, revision, timestamp, and owner
- [ ] environment and dependency lock has authority, revision, timestamp, and owner
- [ ] recent changes and known-good baseline has authority, revision, timestamp, and owner

## Domain execution

- [ ] Write a deterministic symptom statement without assigning cause
- [ ] Capture a minimal reproduction and a known-good control
- [ ] Build a timeline across logs, traces, deploys, and configuration
- [ ] Enumerate mutually distinguishable hypotheses
- [ ] Rank hypotheses by explanatory power and test cost
- [ ] Change one variable per experiment and preserve raw output
- [ ] Localize the causal mechanism and add a failing regression test
- [ ] Apply the smallest fix; run focused, suite, and production guardrails

## Measured verification

- [ ] Evidence demonstrates reproduction rate before fix is recorded
- [ ] Evidence demonstrates regression test fails before and passes after
- [ ] Evidence demonstrates no unrelated variable changes during causal experiment
- [ ] Evidence demonstrates recurrence monitor remains clear for one release window

## Recovery and closure

- [ ] Rehearsed rollback can revert probes and fix, restore the locked environment, and preserve diagnostic artifacts
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Debug checklist rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Enterprise considerations

Debug checklist governance binds owner, policy revision, and retained proof to "reproduction rate before fix is recorded", with "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
