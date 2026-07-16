# Risk-Aware Model Routing

> **Version:** 1.1.0
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
The decision record is the **route qualification matrix**. It records task/risk/data class; candidate model; quality lower bound; p95 latency; unit cost; residency; fallback. The AI gateway owner owns completeness; the evidence is invalid when provider capability, terms, or model identifier changes. Cost evidence includes quality and safety deltas, retry/agent amplification, cache effects, and human review—not provider list price alone.

## Failure response and recovery
**Trigger:** route quality or residency policy is violated.

**Immediate response:** remove the route from policy and send eligible traffic to the last qualified fallback. Preserve the route qualification matrix, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to risk-aware model routing.

## Decision authority
The **AI gateway owner** accepts the operational decision. The **data governance owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Budget and routing services can trip circuit breakers; product, FinOps, and abuse owners decide degraded service and temporary quota changes.

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
The **Risk-Aware Model Routing** profile treats resource consumption as a task-specific reliability and abuse constraint; it supplies neither financial advice nor universal targets.

| Source | Relationship for Risk-Aware Model Routing | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.3 and 3.2 | Relate resource controls to the measured task and exposed population. |
| ISO/IEC 42001 | 42001 clause 8.1 | Use operational planning evidence within the organization’s own objectives and risk treatment. |
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
