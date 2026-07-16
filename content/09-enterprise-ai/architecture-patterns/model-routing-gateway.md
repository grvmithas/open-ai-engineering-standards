# Enterprise Model Routing Gateway

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Centralize policy-aware model selection, quotas, observability, and failover.

## Why
Distributed provider calls make governance and incident containment inconsistent.

## When
Use when multiple applications, models, or providers exist.

## How
1. Authenticate workload and user context.
2. Evaluate data, geography, risk, capability, budget, and availability policy.
3. Select only qualified routes and record reason.
4. Apply rate, token, tool, and output controls.
5. Fail safely; requalify providers before adding or materially changing routes.

## Evidence contract
The decision record is the **gateway policy release**. It records identity inputs; policy version; approved routes; data/residency constraints; budgets; decisions; failover; kill switch. The AI gateway service owner owns completeness; the evidence is invalid when applications can call providers outside the gateway. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** policy service fails or no qualified route remains.

**Immediate response:** fail closed for consequential work and return an explicit unavailable response. Preserve the gateway policy release, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to enterprise model routing gateway.

## Decision authority
The **AI gateway service owner** accepts the operational decision. The **enterprise security architect** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Central gateway | Consistent control | Potential bottleneck |

## Anti-patterns
- Routing solely on price.
- Silent fallback to unapproved models.

## Enterprise considerations
- Deploy resiliently by region.
- Separate policy administration from runtime.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Enterprise Model Routing Gateway | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.2 and 2.3 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM06 and LLM10 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] No direct provider calls.
- [ ] Route reason logged.
- [ ] Safe failure tested.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MANAGE 2–4 (accessed 2026-07-16).
- ISO, [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). This is a design input, not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the gateway policy release, failure trigger, accountable decision, and scoped framework relationships for enterprise model routing gateway. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
