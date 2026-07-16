# Architecture Decision Record Template

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Record an architectural decision, alternatives, evidence, consequences, and reversal conditions.

## Why
A decision is reviewable only when alternatives, evidence, consequences, and reversal conditions are explicit.

## How
1. Assign the accountable owner and classification before authoring.
2. Complete decision drivers, option evidence, dissent, implementation owner, validation, reversal trigger.
3. Link objective source evidence; screenshots and model assertions are supporting material only.
4. Capture dissent, approval identity/date, expiry or review trigger, and recovery path.

## Decision authority
Architecture review owns acceptance; supersession preserves the prior ADR and links the replacing record.

## ADR-{{NUMBER}}: {{TITLE}}
**Status:** PROPOSED | ACCEPTED | SUPERSEDED | REJECTED
**Date / deciders:** {{DATE_AND_NAMES}}
**Risk classification:** {{RISK}}

## Context and problem
{{OBSERVED_PROBLEM_AND_EVIDENCE}}

## Decision drivers
{{RANKED_DRIVERS}}

## Options
| Option | Evidence | Benefits | Costs | Risks |
|---|---|---|---|---|
| {{OPTION}} | {{EVIDENCE}} | {{BENEFITS}} | {{COSTS}} | {{RISKS}} |

## Decision and consequences
{{DECISION_RATIONALE_AND_POSITIVE_NEGATIVE_CONSEQUENCES}}

## Implementation, validation, and rollback
{{STEPS_GATES_ROLLBACK_TRIGGER_AND_OWNER}}

## Approval and review date
{{APPROVER_DATE_REVIEW_TRIGGER}}

## Tradeoffs
| Use | Benefit | Cost |
|---|---|---|
| Complete ADR record | Reconstructable decision and ownership | Authoring and independent review time |
| Proportionate abbreviated record | Lower low-risk overhead | Requires an explicit tailoring rationale |

## Anti-patterns
- Approving a record that still contains unresolved template fields.
- Linking evidence that can change in place without recording a digest or version.
- Using the template itself as proof of legal compliance, control operation, or certification.

## Enterprise considerations
- Apply records classification, access, retention, legal hold, and regional storage to the completed ADR.
- Record the applicable operator, controller/processor, and supplier roles when AI or personal data is involved.
- This is implementation support, not legal advice, a conformity assessment, or an ISO certification claim.

## Checklist
- [ ] Decision drivers, option evidence, dissent, implementation owner, validation, reversal trigger are complete.
- [ ] Evidence links are immutable or versioned.
- [ ] Decision authority, date, and review trigger are recorded.
- [ ] Failure, rollback, escalation, or supersession path is executable.

## References
- NIST, [AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1) and [Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) and [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). Mapping indicates control alignment only; it is not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the ADR record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
