# AI Organization Operating Model

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Establish a hybrid platform-and-product model with explicit service ownership and decision rights.

## Why
Central standards without embedded delivery become a bottleneck; federation without a platform fragments controls.

## When
Use once multiple teams build or operate AI systems.

## How
1. Charter an AI platform team for gateway, evaluation, observability, approved providers, and standards.
2. Embed accountable AI engineers in product teams.
3. Create an AI governance forum with engineering, product, security, privacy, legal, risk, and affected-domain representation.
4. Publish RACI, service catalog, exception process, and funding model.
5. Review portfolio risk, incidents, adoption, and provider health monthly.

## Evidence contract
The decision record is the **operating-model charter**. It records decision rights; service catalog; funding; intake; RACI; SLOs; assurance calendar; escalation. The CTO or delegated AI executive owns completeness; the evidence is invalid when platform or assurance lacks mandate, capacity, or independence. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** control demand exceeds funded capacity or teams bypass platform boundaries.

**Immediate response:** prioritize by risk, suspend unsupported launches, and escalate funding decisions. Preserve the operating-model charter, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to ai organization operating model.

## Decision authority
The **CTO or delegated AI executive** accepts the operational decision. The **enterprise risk executive** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Hybrid model | Scale with consistency | Coordination overhead |

## Anti-patterns
- A central team owning every use case.
- A committee approving designs without technical evidence.

## Enterprise considerations
- Board-level risk appetite flows to product controls.
- Separate enablement metrics from risk oversight.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for AI Organization Operating Model | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 2.1 and 2.3 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 5.1 and 7.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Technical risk owners consume OWASP findings | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Decision rights explicit.
- [ ] Platform has SLOs.
- [ ] Exceptions expire.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the operating-model charter, failure trigger, accountable decision, and scoped framework relationships for ai organization operating model. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
