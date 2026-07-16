# LLM Caching Strategies

> **Version:** 1.0.0
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
The decision record is the **cache policy and isolation test**. It records tenant key; release digest; source freshness; TTL; encryption; purge path; semantic threshold. The cache service owner owns completeness; the evidence is invalid when key composition or source version is incomplete. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** cross-tenant hit, stale safety policy, or deletion propagation failure.

**Immediate response:** disable the cache namespace, purge affected entries, and replay deletion jobs. Preserve the cache policy and isolation test, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to llm caching strategies.

## Decision authority
The **cache service owner** accepts the operational decision. The **privacy engineer** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

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
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for LLM Caching Strategies | Boundary |
|---|---|---|
| NIST AI RMF | MAP 4.1; MANAGE 2.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8.2 and 8.4 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
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
