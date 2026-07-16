# Root Cause Analysis Template

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Document evidence-backed systemic causes and verified prevention without individual blame.

## Why
A useful RCA produces testable systemic prevention and closes the incident-to-evaluation loop.

## How
1. Validate the incident timeline from traces, logs, changes, and communications.
2. Separate trigger, systemic root cause, contributors, and detection gaps.
3. Test causal claims with counterfactuals: would the proposed control have prevented or bounded recurrence?
4. Assign corrective actions with owner, deadline, verification, regression case, and closure reviewer.

## Decision authority
The service owner implements actions; an independent reviewer verifies prevention before closure.

## Incident and impact
{{INCIDENT_ID_SUMMARY_OBJECTIVE_IMPACT}}

## Factual timeline
{{TIMESTAMPED_EVENTS_WITH_EVIDENCE}}

## Causal analysis
**Trigger:** {{TRIGGER}}
**Root cause:** {{SYSTEMIC_CAUSE}}
**Contributing factors:** {{FACTORS}}
**Detection gap:** {{WHY_CONTROLS_MISSED_IT}}

## Corrective actions
| Action | Owner | Due | Verification | Regression case |
|---|---|---|---|---|
| {{ACTION}} | {{OWNER}} | {{DATE}} | {{EVIDENCE}} | {{CASE_ID}} |

## Closure approval
{{REVIEWER_DATE_RESIDUAL_RISK_PROVIDER_REQUALIFICATION}}

## Tradeoffs
| Use | Benefit | Cost |
|---|---|---|
| Complete RCA record | Reconstructable decision and ownership | Authoring and independent review time |
| Proportionate abbreviated record | Lower low-risk overhead | Requires an explicit tailoring rationale |

## Anti-patterns
- Naming an individual action as root cause.
- Creating training-only actions for a technical control failure.
- Closing remediation when a ticket closes rather than when prevention is tested.

## Enterprise considerations
- Protect sensitive incident and personnel information while preserving technical accountability.
- High-severity action closure receives independent verification.
- Recurring causes enter portfolio risk and funding review.

## Checklist
- [ ] Root cause is systemic and evidenced.
- [ ] Counterfactual prevention is credible.
- [ ] Actions change measurable controls.
- [ ] Independent replay or failure injection supports closure.

## References
- Google, [Site Reliability Engineering — Postmortem Culture](https://sre.google/sre-book/postmortem-culture/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the RCA record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
