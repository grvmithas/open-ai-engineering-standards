# Enterprise Model Routing Gateway

> **Version:** 1.1.0
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
The decision record is the **gateway policy release**. It records identity inputs; policy version; approved routes; data/residency constraints; budgets; decisions; failover; kill switch. The AI gateway service owner owns completeness; the evidence is invalid when applications can call providers outside the gateway. Architecture evidence binds diagrams and contracts to deployed adapters, policies, identities, data routes, resilience tests, and exit drills.

## Failure response and recovery
**Trigger:** policy service fails or no qualified route remains.

**Immediate response:** fail closed for consequential work and return an explicit unavailable response. Preserve the gateway policy release, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to enterprise model routing gateway.

## Decision authority
The **AI gateway service owner** accepts the operational decision. The **enterprise security architect** provides independent challenge for high-risk scope, failed gates, or exceptions. Runtime policy may select only approved paths; architecture, service, data, and risk owners approve topology and failover boundaries.

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
**Enterprise Model Routing Gateway** is an informative architecture pattern. Teams may use an equivalent design that satisfies the same boundaries, and no portability or provider-neutrality certification is implied.

| Source | Relationship for Enterprise Model Routing Gateway | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.2 and 2.3 | Use NIST risk outcomes to evaluate the actual data and control plane. |
| ISO/IEC 42001 | 42001 clause 8.1 | ISO-related evidence is informative unless incorporated into the organization’s formally scoped system. |
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
