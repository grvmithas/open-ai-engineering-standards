# Root Cause: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

INC-447 delayed payroll for 18,204 employees. Timeline TL-447 reconciles NTP offsets across deploy d-993, queue q-payroll, and alert a-81. Graph CG-447 shows malformed tenant config plus non-idempotent retry and a disabled saturation alert; replay CF-12 proves removing either retry defect or config bypass prevents impact. Actions eliminate bypass, enforce idempotency, isolate tenant queues, and restore alert coverage.

## Execution

1. Set a blameless charter: explain system conditions, not individual fault; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Reconstruct a UTC timeline from independent sources and mark uncertainty; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Build a causal graph from initiating event through mechanisms to impact; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Distinguish root mechanisms, contributing conditions, and latent controls; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Test each causal edge against evidence and alternative explanations; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Use five-whys only as an interview prompt; branch the graph when causes diverge; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Run counterfactual tests: remove each condition and predict whether impact persists; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Prioritize actions: eliminate hazard, add prevention, reduce blast radius, improve detection, then procedure/training; the record attaches the resulting artifact to the example's primary change or incident ID.
9. Assign owners, dates, leading indicators, and effectiveness review; the record attaches the resulting artifact to the example's primary change or incident ID.
10. Publish factual narrative; revisit after actions demonstrate sustained effectiveness; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that 100% causal edges cite evidence.
- The owner records raw evidence that timeline uncertainty is explicit.
- The owner records raw evidence that actions favor engineered controls over reminders.
- The owner records raw evidence that effectiveness reviewed at 30/60/90 days.

## Rollback exercise

Root Cause examples/example rollback exercise gate 1 is accepted only when "100% causal edges cite evidence" is source-verifiable; otherwise, withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.

## Tradeoffs

Root Cause examples/example deliberately spends additional review time to protect "100% causal edges cite evidence"; evidence weakness triggers "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection".

## Anti-patterns

Root Cause examples/example rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Enterprise considerations

Root Cause examples/example governance binds owner, policy revision, and retained proof to "100% causal edges cite evidence", with "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
