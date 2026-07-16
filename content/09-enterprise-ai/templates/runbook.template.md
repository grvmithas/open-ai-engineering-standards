# AI Service Runbook Template

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Give operators tested procedures for diagnosis, containment, recovery, and escalation.

## Why
Operators need exact, tested actions under pressure, including safe degradation and evidence preservation.

## How
1. Name service, on-call role, prerequisites, permissions, dependencies, and SLOs.
2. Tie each symptom to exact diagnostic queries and bounded actions.
3. Provide safe degradation, rollback, data reconciliation, and escalation procedures.
4. Exercise the runbook and record the last successful game-day release.

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
- Using screenshots instead of executable queries.
- Requiring credentials or access not held by on-call.
- Saying ‘restart service’ without impact and validation.

## Enterprise considerations
- Store privileged commands in the approved operational system with access logs.
- Regional, privacy, and records restrictions apply to diagnostic data.
- Runbook changes follow service change control and game-day verification.

## Checklist
- [ ] Every trigger maps to an action and expected observation.
- [ ] Commands are safe to copy and identify environment.
- [ ] Rollback and reconciliation are tested.
- [ ] Escalation contacts and last exercise date are current.

## References
- Google, [Site Reliability Engineering — Emergency Response](https://sre.google/sre-book/emergency-response/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the RUNBOOK record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
