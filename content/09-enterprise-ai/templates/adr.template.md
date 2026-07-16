# Architecture Decision Record Template

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Record an architectural decision, alternatives, evidence, consequences, and reversal conditions.

## Why
A decision is reviewable only when alternatives, evidence, consequences, and reversal conditions are explicit.

## How
1. State the decision boundary, deciders, status, and supersession chain.
2. Attach measured drivers and immutable evidence for every viable option.
3. Record dissent, selected consequences, implementation owner, and validation.
4. Define the condition and authority for reversal or supersession.

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
- Listing options that were never genuinely viable.
- Using ‘industry standard’ as rationale without system evidence.
- Editing an Accepted ADR in place instead of superseding it.

## Enterprise considerations
- Classify decision evidence and restrict commercially sensitive option analysis.
- Link applicable provider, data, security, and legal reviews without claiming the ADR performs those reviews.
- Review Accepted ADRs on their trigger date and after architecture incidents.

## Checklist
- [ ] Status and supersession chain are consistent.
- [ ] Drivers and options cite measured evidence.
- [ ] Negative consequences have owners.
- [ ] Validation and reversal conditions are executable.

## References
- Michael Nygard, [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the ADR record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
