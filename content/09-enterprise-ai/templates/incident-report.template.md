# AI Incident Report Template

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Record impact, evidence, decisions, containment, recovery, and communication during an incident.

## Why
The live incident record separates observed facts, decisions, and hypotheses while coordinating containment.

## How
1. Open the record at declaration and name commander, scribe, severity, and affected services.
2. Record UTC observations, hypotheses, decisions, actions, and evidence references separately.
3. Track user/decision/data impact and communications as knowledge changes.
4. Close live response only after validated containment, recovery, and follow-up ownership.

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
- Reconstructing the timeline from memory after recovery.
- Replacing impact counts with adjectives.
- Including blame or unnecessary personal data.

## Enterprise considerations
- Security/privacy/legal notification assessment uses restricted linked records.
- Public and customer communication follows designated authority.
- Preserve provider/model/prompt/tool release identity for affected decisions.

## Checklist
- [ ] Commander and severity are current.
- [ ] Timeline distinguishes fact, hypothesis, and decision.
- [ ] Impact has population and duration.
- [ ] Recovery and follow-up owners are verified.

## References
- NIST, [SP 800-61 Rev. 3](https://doi.org/10.6028/NIST.SP.800-61r3) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the INCIDENT-REPORT record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
