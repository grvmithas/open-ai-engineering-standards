# Root Cause Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Explain why an incident occurred and prioritize controls that prevent or limit recurrence.

## Applicability

- a material incident is stabilized
- a near miss reveals systemic exposure
- the same failure class recurs

## Evidence

- normalized incident timeline
- logs, traces, metrics, and deploys
- decision and communication records
- architecture and control design
- interviews and counterfactual experiments

## Components

Root Cause README components gate 1 is accepted only when "100% causal edges cite evidence" is source-verifiable; otherwise, withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.

README is component thirteen.

## Outcome measures

- 100% causal edges cite evidence
- timeline uncertainty is explicit
- actions favor engineered controls over reminders
- effectiveness reviewed at 30/60/90 days

## Rollback

Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection.

## Tradeoffs

Root Cause README deliberately spends additional review time to protect "100% causal edges cite evidence"; evidence weakness triggers "Withdraw unsupported causal claims, preserve the draft, and reopen timeline or experiment collection".

## Anti-patterns

Root Cause README rejects shortcuts around "Set a blameless charter: explain system conditions, not individual fault." because they sever the evidence chain required for "100% causal edges cite evidence".

## Citations

- [Google SRE postmortem culture](https://sre.google/sre-book/postmortem-culture/)
- [NTSB investigative process](https://www.ntsb.gov/investigations/process/Pages/default.aspx)
- [DOE Causal Analysis Guide](https://www.energy.gov/sites/default/files/2015/07/f24/DOE-HDBK-1028-2009_Vol3.pdf)
- [Sidney Dekker Just Culture](https://www.sidneydekker.com/books/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
