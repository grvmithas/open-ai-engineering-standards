# Token Budget Standard

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative AIES implementation profile

## Purpose
Enforce per-task input, output, retry, and monthly token budgets.

## Why
Unbounded context and retries create denial-of-wallet and latency risk.

## When
Use for every production model route.

## How
1. Set budgets from measured task distributions and SLOs.
2. Reserve tokens for safety instructions and structured output.
3. Trim by deterministic priority; never silently remove mandatory evidence.
4. Cap retries and total agent-loop spend.
5. Alert on forecast variance and degrade safely before hard exhaustion.

## Evidence contract
The decision record is the **budget policy and exhaustion test**. It records task cap; context reserve; output cap; retry cap; loop cap; tenant quota; override expiry. The FinOps product owner owns completeness; the evidence is invalid when mandatory evidence is truncated or retries evade the aggregate cap. Cost evidence includes quality and safety deltas, retry/agent amplification, cache effects, and human review—not provider list price alone.

## Failure response and recovery
**Trigger:** spend velocity or token amplification crosses its circuit breaker.

**Immediate response:** stop retries, switch to bounded degradation, and page the quota owner. Preserve the budget policy and exhaustion test, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to token budget standard.

## Decision authority
The **FinOps product owner** accepts the operational decision. The **abuse-prevention lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Budget and routing services can trip circuit breakers; product, FinOps, and abuse owners decide degraded service and temporary quota changes.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Hard cap | Predictable spend | Possible incomplete output |
| Soft cap | Flexible | Runaway risk |

## Anti-patterns
- One global token limit.
- Retrying malformed output indefinitely.

## Enterprise considerations
- Budget by tenant and use case.
- Require approval for temporary increases.

## Framework relationship
The **Token Budget Standard** profile treats resource consumption as a task-specific reliability and abuse constraint; it supplies neither financial advice nor universal targets.

| Source | Relationship for Token Budget Standard | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.2 | Relate resource controls to the measured task and exposed population. |
| ISO/IEC 42001 | 42001 clause 8.1 | Use operational planning evidence within the organization’s own objectives and risk treatment. |
| Domain threat/control source | LLM10 Unbounded Consumption | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Budgets cover retries.
- [ ] Truncation is visible.
- [ ] Denial-of-wallet tests pass.

## References
- FinOps Foundation, [FinOps Framework](https://www.finops.org/framework/) (accessed 2026-07-16).
- OWASP, [LLM10: Unbounded Consumption](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the budget policy and exhaustion test, failure trigger, accountable decision, and scoped framework relationships for token budget standard. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
