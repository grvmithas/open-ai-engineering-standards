# AI Service Runbook Template

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Give operators tested procedures for diagnosis, containment, recovery, and escalation.

## Why
Operators need exact, tested actions under pressure, including safe degradation and evidence preservation.

## How
1. Assign the accountable owner and classification before authoring.
2. Complete service map, SLOs, signals, exact controls, access prerequisites, validation, escalation, rollback.
3. Link objective source evidence; screenshots and model assertions are supporting material only.
4. Capture dissent, approval identity/date, expiry or review trigger, and recovery path.

## Decision authority
On-call owns execution; service and incident owners approve restoration after consequential failure.

## Service ownership and SLOs
{{SERVICE_ONCALL_DEPENDENCIES_SLOS}}

## Signals and dashboards
{{METRICS_TRACES_LOGS_RELEASE_AND_PROVIDER_STATUS}}

## Triage
1. {{VERIFY_IMPACT}}
2. {{CHECK_RECENT_RELEASES_AND_PROVIDER_CHANGES}}
3. {{PRESERVE_EVIDENCE}}

## Containment and recovery
| Condition | Action | Command or control | Approval | Validation |
|---|---|---|---|---|
| {{TRIGGER}} | {{ACTION}} | {{EXACT_PROCEDURE}} | {{APPROVER}} | {{CHECK}} |

## Rollback, escalation, and incident follow-up
{{ROLLBACK_KILL_SWITCH_CONTACTS_GOLDEN_SET_UPDATE}}

## Tradeoffs
| Use | Benefit | Cost |
|---|---|---|
| Complete RUNBOOK record | Reconstructable decision and ownership | Authoring and independent review time |
| Proportionate abbreviated record | Lower low-risk overhead | Requires an explicit tailoring rationale |

## Anti-patterns
- Approving a record that still contains unresolved template fields.
- Linking evidence that can change in place without recording a digest or version.
- Using the template itself as proof of legal compliance, control operation, or certification.

## Enterprise considerations
- Apply records classification, access, retention, legal hold, and regional storage to the completed RUNBOOK.
- Record the applicable operator, controller/processor, and supplier roles when AI or personal data is involved.
- This is implementation support, not legal advice, a conformity assessment, or an ISO certification claim.

## Checklist
- [ ] Service map, slos, signals, exact controls, access prerequisites, validation, escalation, rollback are complete.
- [ ] Evidence links are immutable or versioned.
- [ ] Decision authority, date, and review trigger are recorded.
- [ ] Failure, rollback, escalation, or supersession path is executable.

## References
- NIST, [AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1) and [Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) and [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). Mapping indicates control alignment only; it is not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the RUNBOOK record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
