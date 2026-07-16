# Provider-Neutral AI Harness

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Decouple applications from provider SDKs while preserving provider-specific safety and capability controls.

## Why
A stable contract enables failover and requalification; a lowest-common-denominator wrapper hides critical differences.

## When
Use for enterprise applications calling external or self-hosted models.

## How
1. Define canonical request, response, error, usage, tool, and policy contracts.
2. Implement adapters that expose declared capability differences.
3. Centralize identity, data policy, redaction, tracing, budgets, and evaluation hooks.
4. Qualify every provider/route independently.
5. Test exit, export, failover, and rollback at least annually.

## Evidence contract
The decision record is the **harness contract and adapter conformance suite**. It records canonical request/response/error; capability declaration; policy hooks; provider fields; test vectors; failover result. The AI platform architect owns completeness; the evidence is invalid when provider adapter behavior escapes the canonical contract. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** contract, policy, or data-boundary test fails.

**Immediate response:** remove the adapter from routing and restore the previous adapter release. Preserve the harness contract and adapter conformance suite, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to provider-neutral ai harness.

## Decision authority
The **AI platform architect** accepts the operational decision. The **provider risk owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Neutral harness | Portability and control | Adapter maintenance |

## Anti-patterns
- Leaking provider objects into application code.
- Failing over without data-boundary checks.

## Enterprise considerations
- Contract for data use, retention, incident notice, and exit.
- Maintain an approved-provider register.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Provider-Neutral AI Harness | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.3 and 3.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Supply-chain and sensitive-data boundaries | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Adapters pass contract tests.
- [ ] Failover respects policy.
- [ ] Exit tested.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MANAGE 2–4 (accessed 2026-07-16).
- ISO, [ISO/IEC 23894:2023](https://www.iso.org/standard/77304.html) (accessed 2026-07-16). This is a design input, not a certification claim.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the harness contract and adapter conformance suite, failure trigger, accountable decision, and scoped framework relationships for provider-neutral ai harness. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
