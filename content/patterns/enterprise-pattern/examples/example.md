# Enterprise: Worked Production Example

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Scenario and artifacts

Approve support summarization for EU customers. AIR-61 uses model bundle mb-4.2, DPIA-31, red-team RT-204, residency route eu-west, retention 30 days, and human-send control. Policy denies health-data tickets and records decision IDs without ticket text.

## Execution

1. Register use case, owner, model, purpose, users, and prohibited uses; the record attaches the resulting artifact to the example's primary change or incident ID.
2. Tier risk from impact, autonomy, data, reach, and reversibility; the record attaches the resulting artifact to the example's primary change or incident ID.
3. Map data flow, legal basis, residency, retention, and subprocessors; the record attaches the resulting artifact to the example's primary change or incident ID.
4. Threat-model model, retrieval, tools, supply chain, and human handoffs; the record attaches the resulting artifact to the example's primary change or incident ID.
5. Select controls and independent evidence for the risk tier; the record attaches the resulting artifact to the example's primary change or incident ID.
6. Evaluate quality, safety, bias, privacy, security, and accessibility; the record attaches the resulting artifact to the example's primary change or incident ID.
7. Deploy through tenant canaries with policy enforcement and kill switch; the record attaches the resulting artifact to the example's primary change or incident ID.
8. Continuously monitor drift, incidents, vendor changes, and control effectiveness; the record attaches the resulting artifact to the example's primary change or incident ID.

## Verification

- The owner records raw evidence that inventory completeness = 100%.
- The owner records raw evidence that high-risk controls have independent evidence.
- The owner records raw evidence that policy decisions are attributable and retrievable < 1 business day.
- The owner records raw evidence that risk-tier SLO and harm indicators stay within threshold.

## Rollback exercise

Enterprise examples/example rollback exercise gate 1 is accepted only when "inventory completeness = 100%" is source-verifiable; otherwise, disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle.

## Tradeoffs

Enterprise examples/example deliberately spends additional review time to protect "inventory completeness = 100%"; evidence weakness triggers "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle".

## Anti-patterns

Enterprise examples/example rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Enterprise considerations

Enterprise examples/example governance binds owner, policy revision, and retained proof to "inventory completeness = 100%", with "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" as the recorded recovery authority.

## Checklist

- [ ] Every stated artifact has an owner and storage location in the system of record
- [ ] Reported outcomes come from executed checks

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
