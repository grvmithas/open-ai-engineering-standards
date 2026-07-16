# Root Cause Analysis Template

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Document evidence-backed systemic causes and verified prevention without individual blame.

## Why
A useful RCA produces testable systemic prevention and closes the incident-to-evaluation loop.

## How
1. Assign the accountable owner and classification before authoring.
2. Complete causal evidence, trigger, root cause, contributors, detection gap, corrective actions, regression cases, closure review.
3. Link objective source evidence; screenshots and model assertions are supporting material only.
4. Capture dissent, approval identity/date, expiry or review trigger, and recovery path.

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
- Approving a record that still contains unresolved template fields.
- Linking evidence that can change in place without recording a digest or version.
- Using the template itself as proof of legal compliance, control operation, or certification.

## Enterprise considerations
- Apply records classification, access, retention, legal hold, and regional storage to the completed RCA.
- Record the applicable operator, controller/processor, and supplier roles when AI or personal data is involved.
- This is implementation support, not legal advice, a conformity assessment, or an ISO certification claim.

## Checklist
- [ ] Causal evidence, trigger, root cause, contributors, detection gap, corrective actions, regression cases, closure review are complete.
- [ ] Evidence links are immutable or versioned.
- [ ] Decision authority, date, and review trigger are recorded.
- [ ] Failure, rollback, escalation, or supersession path is executable.

## References
- NIST, [AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1) and [Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) and [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). Mapping indicates control alignment only; it is not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the RCA record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
