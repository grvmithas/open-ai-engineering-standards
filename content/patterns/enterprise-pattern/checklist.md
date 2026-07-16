# Enterprise: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: regulated or personal data is processed
- [ ] Trigger evidenced: AI contributes to a material decision
- [ ] Trigger evidenced: shared services span business units or regions

## Evidence package

- [ ] AI system inventory has authority, revision, timestamp, and owner
- [ ] use-case risk assessment has authority, revision, timestamp, and owner
- [ ] data flow and classification has authority, revision, timestamp, and owner
- [ ] model/vendor evaluation has authority, revision, timestamp, and owner
- [ ] control map, SLOs, and incident obligations has authority, revision, timestamp, and owner

## Domain execution

- [ ] Register use case, owner, model, purpose, users, and prohibited uses
- [ ] Tier risk from impact, autonomy, data, reach, and reversibility
- [ ] Map data flow, legal basis, residency, retention, and subprocessors
- [ ] Threat-model model, retrieval, tools, supply chain, and human handoffs
- [ ] Select controls and independent evidence for the risk tier
- [ ] Evaluate quality, safety, bias, privacy, security, and accessibility
- [ ] Deploy through tenant canaries with policy enforcement and kill switch
- [ ] Continuously monitor drift, incidents, vendor changes, and control effectiveness

## Measured verification

- [ ] Evidence demonstrates inventory completeness = 100%
- [ ] Evidence demonstrates high-risk controls have independent evidence
- [ ] Evidence demonstrates policy decisions are attributable and retrievable < 1 business day
- [ ] Evidence demonstrates risk-tier SLO and harm indicators stay within threshold

## Recovery and closure

- [ ] Rehearsed rollback can disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Enterprise checklist rejects shortcuts around "Register use case, owner, model, purpose, users, and prohibited uses." because they sever the evidence chain required for "inventory completeness = 100%".

## Enterprise considerations

Enterprise checklist governance binds owner, policy revision, and retained proof to "inventory completeness = 100%", with "Disable the use case at the policy gateway, revoke tool credentials, and restore the approved model-prompt-policy bundle" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
