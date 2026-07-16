# Risk-Aware Model Routing

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Route each request to the least costly qualified model without reducing required quality or control.

## Why
Static use of the largest model wastes cost; price-only routing creates safety regressions.

## When
Use when task classes have stable, measurable requirements.

## How
1. Classify task, risk, data boundary, latency objective, and required capabilities.
2. Qualify candidate models per route on locked evaluations.
3. Apply deterministic policy before probabilistic routing.
4. Record route reason and fallback.
5. Requalify on provider/model changes and roll back a route on guardrail breach.

## Evidence contract
The decision record is the **route qualification matrix**. It records task/risk/data class; candidate model; quality lower bound; p95 latency; unit cost; residency; fallback. The AI gateway owner owns completeness; the evidence is invalid when provider capability, terms, or model identifier changes. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** route quality or residency policy is violated.

**Immediate response:** remove the route from policy and send eligible traffic to the last qualified fallback. Preserve the route qualification matrix, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to risk-aware model routing.

## Decision authority
The **AI gateway owner** accepts the operational decision. The **data governance owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Routing | Lower cost and latency | Policy complexity |
| Single model | Simple | Concentration and cost risk |

## Anti-patterns
- Routing restricted data to an unapproved provider.
- Using list price without end-to-end cost.

## Enterprise considerations
- Contract and residency are route constraints.
- Maintain provider exit path.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Risk-Aware Model Routing | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.3 and 3.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM10 Unbounded Consumption | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every route is qualified.
- [ ] Fallback is bounded.
- [ ] Savings include quality impact.

## References
- FinOps Foundation, [FinOps Framework](https://www.finops.org/framework/) (accessed 2026-07-16).
- OWASP, [LLM10: Unbounded Consumption](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the route qualification matrix, failure trigger, accountable decision, and scoped framework relationships for risk-aware model routing. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
