# Debug: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Orders intermittently stay PENDING. Repro DEBUG-551 uses event e-442 and clock skew +31s. Trace t-81 proves lease expiry compares database UTC with worker local time. Test lease_clock_skew.spec fails on 3f210ac and passes after monotonic-time normalization.

## Execution

1. Write a deterministic symptom statement without assigning cause; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Capture a minimal reproduction and a known-good control; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Build a timeline across logs, traces, deploys, and configuration; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Enumerate mutually distinguishable hypotheses; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Rank hypotheses by explanatory power and test cost; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Change one variable per experiment and preserve raw output; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Localize the causal mechanism and add a failing regression test; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Apply the smallest fix; run focused, suite, and production guardrails; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that reproduction rate before fix is recorded.
- The owner records raw evidence that regression test fails before and passes after.
- The owner records raw evidence that no unrelated variable changes during causal experiment.
- The owner records raw evidence that recurrence monitor remains clear for one release window.

## Rollback exercise

Debug examples/example rollback exercise gate 1 is accepted only when "reproduction rate before fix is recorded" is source-verifiable; otherwise, revert probes and fix, restore the locked environment, and preserve diagnostic artifacts.

## Tradeoffs

Debug examples/example deliberately spends additional review time to protect "reproduction rate before fix is recorded"; evidence weakness triggers "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts".

## Anti-patterns

Debug examples/example rejects shortcuts around "Write a deterministic symptom statement without assigning cause." because they sever the evidence chain required for "reproduction rate before fix is recorded".

## Enterprise considerations

Debug examples/example governance binds owner, policy revision, and retained proof to "reproduction rate before fix is recorded", with "Revert probes and fix, restore the locked environment, and preserve diagnostic artifacts" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
