# Definition of Ready

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Prevent implementation from starting before outcome, scope, evidence, risk, and ownership are clear.

## Why
Ambiguity moved into coding becomes expensive rework and hidden risk.

## When
Apply to every change; tailor evidence depth by risk.

## How
1. Approve measurable outcomes and acceptance criteria.
2. Resolve blocking dependencies and unknowns.
3. Classify risk and select required lifecycle controls.
4. Approve architecture for material changes.
5. Name implementation, review, release, and rollback owners.

## Evidence contract
The decision record is the **readiness decision**. It records outcome; criteria; dependencies; data authority; risk tier; architecture need; owners. The product and engineering leads jointly owns completeness; the evidence is invalid when a blocking unknown is hidden as an assumption. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** implementation starts without authorized data or testable criteria.

**Immediate response:** pause coding and return the story to refinement with named resolution owners. Preserve the readiness decision, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to definition of ready.

## Decision authority
The **product and engineering leads jointly** accepts the operational decision. The **risk owner for medium/high work** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Strict readiness | Less rework | More preparation |

## Anti-patterns
- Calling estimates evidence.
- Starting with unresolved authorization or data questions.

## Enterprise considerations
- High-risk work requires independent review.
- Exceptions expire and remain auditable.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Definition of Ready | Boundary |
|---|---|---|
| NIST AI RMF | MAP 1–3 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 6.1 and 8.2 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | SSDF PO.1 and PO.3 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Criteria are testable.
- [ ] Rollback owner named.
- [ ] Required data is authorized.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the readiness decision, failure trigger, accountable decision, and scoped framework relationships for definition of ready. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
