# AI Product Requirements Document Template

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative implementation template; replace every `{{...}}` field or state `Not applicable — <reason>`.

## Purpose
Define user outcome, intended use, measurable requirements, risk, and lifecycle controls.

## Why
AI product requirements must bind intended use and prohibited use to measurable outcomes and affected-person controls.

## How
1. Assign the accountable owner and classification before authoring.
2. Complete user outcome, intended/prohibited use, risk tier, data/provider flow, evaluation plan, oversight, appeal, retirement.
3. Link objective source evidence; screenshots and model assertions are supporting material only.
4. Capture dissent, approval identity/date, expiry or review trigger, and recovery path.

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
- Approving a record that still contains unresolved template fields.
- Linking evidence that can change in place without recording a digest or version.
- Using the template itself as proof of legal compliance, control operation, or certification.

## Enterprise considerations
- Apply records classification, access, retention, legal hold, and regional storage to the completed PRD.
- Record the applicable operator, controller/processor, and supplier roles when AI or personal data is involved.
- This is implementation support, not legal advice, a conformity assessment, or an ISO certification claim.

## Checklist
- [ ] User outcome, intended/prohibited use, risk tier, data/provider flow, evaluation plan, oversight, appeal, retirement are complete.
- [ ] Evidence links are immutable or versioned.
- [ ] Decision authority, date, and review trigger are recorded.
- [ ] Failure, rollback, escalation, or supersession path is executable.

## References
- NIST, [AI Risk Management Framework 1.0](https://doi.org/10.6028/NIST.AI.100-1) and [Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1) (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) and [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). Mapping indicates control alignment only; it is not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Specialized authority, evidence, tailoring, and recovery fields for the PRD record. |
| 1.0.0 | 2026-07-16 | Initial enterprise template. |
