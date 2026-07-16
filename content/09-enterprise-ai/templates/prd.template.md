# AI Product Requirements Document Template

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Define user outcome, intended use, measurable requirements, risk, and lifecycle controls.

## Why
AI product requirements must bind intended use and prohibited use to measurable outcomes and affected-person controls.

## How
1. Identify affected users, intended use, prohibited use, and accountable product owner.
2. Set outcome, quality, safety, oversight, and unit-cost requirements with baselines.
3. Document data/model/provider flows and affected-person notices or appeal.
4. Define release, monitoring, rollback, and retirement criteria before approval.

## Decision authority
Product owns outcomes; domain and risk reviewers approve high-impact intended use and control sufficiency.

## Product and ownership
{{NAME_OWNER_STAKEHOLDERS}}

## Intended use and prohibited use
{{USERS_CONTEXT_BOUNDARIES}}

## Outcomes and requirements
| Requirement | Metric | Baseline | Target | Evidence |
|---|---|---|---|---|
| {{REQUIREMENT}} | {{METRIC}} | {{BASELINE}} | {{TARGET}} | {{EVIDENCE}} |

## Data, model, provider, and affected-person impact
{{DATA_FLOWS_RISK_CLASSIFICATION_HUMAN_OVERSIGHT}}

## Acceptance, rollout, rollback, and retirement
{{GATES_CANARY_ABORT_OWNER_RETIREMENT}}

## Tradeoffs
| Use | Benefit | Cost |
|---|---|---|
| Complete PRD record | Reconstructable decision and ownership | Authoring and independent review time |
| Proportionate abbreviated record | Lower low-risk overhead | Requires an explicit tailoring rationale |

## Anti-patterns
- Writing model capability as a user outcome.
- Omitting prohibited uses or affected-person impact.
- Setting quality targets without populations, denominators, or failure severity.

## Enterprise considerations
- Counsel determines legal applicability; the PRD records the decision and engineering obligations.
- Procurement and data owners approve provider/data boundaries.
- High-impact products document meaningful oversight, complaint, correction, and retirement capacity.

## Checklist
- [ ] Intended and prohibited uses are unambiguous.
- [ ] Requirements have baseline, target, population, and evidence source.
- [ ] Data/provider and human-decision flows are diagrammed.
- [ ] Abort and retirement rules have owners.

## References
- NIST, [AI RMF MAP](https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook/Map) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the PRD record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
