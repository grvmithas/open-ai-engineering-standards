# AI Incident Report Template

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Record impact, evidence, decisions, containment, recovery, and communication during an incident.

## Why
The live incident record separates observed facts, decisions, and hypotheses while coordinating containment.

## How
1. Assign the accountable owner and classification before authoring.
2. Complete severity, impact, timeline, trace/release/provider IDs, actions, communications, recovery evidence, follow-up owners.
3. Link objective source evidence; screenshots and model assertions are supporting material only.
4. Capture dissent, approval identity/date, expiry or review trigger, and recovery path.

## Decision authority
The incident commander owns decisions; legal, privacy, security, or risk joins according to impact triggers.

## Incident identity
{{ID_SEVERITY_COMMANDER_SCRIBE_STATUS}}

## Impact and affected parties
{{START_DURATION_SCOPE_USER_AND_BUSINESS_IMPACT}}

## Timeline and decision log
| UTC time | Observation or action | Evidence | Owner |
|---|---|---|---|
| {{TIME}} | {{EVENT}} | {{TRACE_OR_LOG}} | {{OWNER}} |

## Containment, recovery, and communications
{{ACTIONS_VALIDATION_NOTIFICATIONS}}

## Follow-up
{{RCA_OWNER_GOLDEN_SET_CASE_PROVIDER_REQUALIFICATION_KNOWLEDGE_UPDATE}}

## Tradeoffs
| Use | Benefit | Cost |
|---|---|---|
| Complete INCIDENT-REPORT record | Reconstructable decision and ownership | Authoring and independent review time |
| Proportionate abbreviated record | Lower low-risk overhead | Requires an explicit tailoring rationale |

## Anti-patterns
- Approving a record that still contains unresolved template fields.
- Linking evidence that can change in place without recording a digest or version.
- Using the template itself as proof of legal compliance, control operation, or certification.

## Enterprise considerations
- Apply records classification, access, retention, legal hold, and regional storage to the completed INCIDENT-REPORT.
- Record the applicable operator, controller/processor, and supplier roles when AI or personal data is involved.
- This is implementation support, not legal advice, a conformity assessment, or an ISO certification claim.

## Checklist
- [ ] Severity, impact, timeline, trace/release/provider ids, actions, communications, recovery evidence, follow-up owners are complete.
- [ ] Evidence links are immutable or versioned.
- [ ] Decision authority, date, and review trigger are recorded.
- [ ] Failure, rollback, escalation, or supersession path is executable.

## References
- NIST, [AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1) and [Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) and [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). Mapping indicates control alignment only; it is not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the INCIDENT-REPORT record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
