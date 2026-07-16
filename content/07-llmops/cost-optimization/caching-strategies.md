# LLM Caching Strategies

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Use exact, semantic, and provider caching without serving stale, cross-tenant, or unauthorized outputs.

## Why
Caching changes data flow and correctness, not just performance.

## When
Use for repeatable, non-personalized workloads with explicit freshness.

## How
1. Classify cacheability by task and data.
2. Build keys from tenant, prompt release, model envelope, policy, locale, and source version.
3. Encrypt values and enforce tenant isolation.
4. Set TTL and event-driven invalidation.
5. Measure hit quality; purge on incident, deletion request, or policy change.

## Evidence contract
The decision record is the **cache policy and isolation test**. It records tenant key; release digest; source freshness; TTL; encryption; purge path; semantic threshold. The cache service owner owns completeness; the evidence is invalid when key composition or source version is incomplete. Cost evidence includes quality and safety deltas, retry/agent amplification, cache effects, and human review—not provider list price alone.

## Failure response and recovery
**Trigger:** cross-tenant hit, stale safety policy, or deletion propagation failure.

**Immediate response:** disable the cache namespace, purge affected entries, and replay deletion jobs. Preserve the cache policy and isolation test, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to llm caching strategies.

## Decision authority
The **cache service owner** accepts the operational decision. The **privacy engineer** provides independent challenge for high-risk scope, failed gates, or exceptions. Budget and routing services can trip circuit breakers; product, FinOps, and abuse owners decide degraded service and temporary quota changes.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Semantic cache | Higher hit rate | False-equivalence risk |
| Exact cache | Predictable | Lower hit rate |

## Anti-patterns
- Caching personalized responses globally.
- Ignoring deletion propagation.

## Enterprise considerations
- Document cache as a data store.
- Apply legal hold and deletion consistently.

## Framework relationship
The **LLM Caching Strategies** profile treats resource consumption as a task-specific reliability and abuse constraint; it supplies neither financial advice nor universal targets.

| Source | Relationship for LLM Caching Strategies | Boundary |
|---|---|---|
| NIST AI RMF | MAP 4.1; MANAGE 2.2 | Relate resource controls to the measured task and exposed population. |
| ISO/IEC 42001 | 42001 clauses 8.2 and 8.4 | Use operational planning evidence within the organization’s own objectives and risk treatment. |
| Domain threat/control source | Sensitive Information Disclosure | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Tenant boundary tested.
- [ ] Invalidation works.
- [ ] Sensitive tasks default off.

## References
- FinOps Foundation, [FinOps Framework](https://www.finops.org/framework/) (accessed 2026-07-16).
- OWASP, [LLM10: Unbounded Consumption](https://genai.owasp.org/llmrisk/llm102025-unbounded-consumption/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the cache policy and isolation test, failure trigger, accountable decision, and scoped framework relationships for llm caching strategies. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
