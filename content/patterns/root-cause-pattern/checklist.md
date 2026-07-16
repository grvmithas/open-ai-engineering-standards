# Root Cause: Quality Gate

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Applicability

- [ ] Trigger evidenced: a material incident is stabilized
- [ ] Trigger evidenced: a near miss reveals systemic exposure
- [ ] Trigger evidenced: the same failure class recurs

## Evidence package

- [ ] normalized incident timeline has authority, revision, timestamp, and owner
- [ ] logs, traces, metrics, and deploys has authority, revision, timestamp, and owner
- [ ] decision and communication records has authority, revision, timestamp, and owner
- [ ] architecture and control design has authority, revision, timestamp, and owner
- [ ] interviews and counterfactual experiments has authority, revision, timestamp, and owner

## Domain execution

- [ ] Set a blameless charter: explain system conditions, not individual fault
- [ ] Reconstruct a UTC timeline from independent sources and mark uncertainty
- [ ] Build a causal graph from initiating event through mechanisms to impact
- [ ] Distinguish root mechanisms, contributing conditions, and latent controls
- [ ] Test each causal edge against evidence and alternative explanations
- [ ] Use five-whys only as an interview prompt; branch the graph when causes diverge
- [ ] Run counterfactual tests: remove each condition and predict whether impact persists
- [ ] Prioritize actions: eliminate hazard, add prevention, reduce blast radius, improve detection, then procedure/training
- [ ] Assign owners, dates, leading indicators, and effectiveness review
- [ ] Publish factual narrative; revisit after actions demonstrate sustained effectiveness

## Measured verification

- [ ] Evidence demonstrates 100% causal edges cite evidence
- [ ] Evidence demonstrates timeline uncertainty is explicit
- [ ] Evidence demonstrates actions favor engineered controls over reminders
- [ ] Evidence demonstrates effectiveness reviewed at 30/60/90 days

## Recovery and closure

- [ ] Rehearsed rollback can withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection
- [ ] Residual risks and follow-ups have owners and dates
- [ ] Artifact hashes, effect approvals, and raw checks are retained

## Anti-patterns

Root Cause checklist rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Enterprise considerations

Root Cause checklist governance binds owner, policy revision, and retained proof to "100% causal edges cite evidence", with "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection" as the recorded recovery authority.

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
