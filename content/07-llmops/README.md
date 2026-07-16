# Level 7: LLMOps

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Operate model-backed systems with qualified evaluation, immutable PromptOps, controlled cost, and portable observability.

## Why
Production behavior changes with prompts, retrieval, models, providers, traffic, and adversaries; operations must continuously prove control.

## When
Adopt after the application harness exists and before production exposure.

## How
1. Implement the evaluation documents below.
2. Version and stage prompt releases.
3. Enforce route, cache, and token budgets.
4. Instrument OpenTelemetry traces, metrics, dashboards, and alerts.
5. Close incidents into golden sets and provider requalification.

## Evidence contract
The decision record is the **LLMOps control-plane inventory**. It records qualified artifact IDs; gate histories; SLOs; spend; open incidents. The LLMOps service owner owns completeness; the evidence is invalid when a production route has no current qualification. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** any release lacks traceable evaluation or rollback.

**Immediate response:** freeze the route and restore the last complete release envelope. Preserve the LLMOps control-plane inventory, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to level 7: llmops.

## Decision authority
The **LLMOps service owner** accepts the operational decision. The **product risk owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Complete LLMOps | Reliable change | Platform investment |

## Anti-patterns
- Manual spot checks as release evidence.
- Provider-specific telemetry with no export path.

## Enterprise considerations
- Evaluation: [framework selection](./evaluation/framework-selection.md), [golden sets](./evaluation/golden-set-management.md), [LLM judges](./evaluation/llm-as-judge.md), [continuous evaluation](./evaluation/continuous-eval.md), [metrics](./evaluation/metrics/README.md).
- PromptOps: [versioning](./promptops/versioning.md), [registries](./promptops/registries.md), [A/B testing](./promptops/ab-testing.md), [staged deployment](./promptops/staged-deployment.md), [regression gates](./promptops/regression-gates.md).
- Cost: [routing](./cost-optimization/model-routing.md), [caching](./cost-optimization/caching-strategies.md), [budgets](./cost-optimization/token-budgets.md).
- Observability: [tracing](./observability/tracing.md), [metrics](./observability/metrics.md), [dashboards](./observability/dashboards.md), [alerting](./observability/alerting.md).

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Level 7: LLMOps | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1.7; MEASURE 2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8–10 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM10 and model-operations failure scenarios | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] All links resolve.
- [ ] Production failures become regression cases.
- [ ] Provider requalification is current.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the LLMOps control-plane inventory, failure trigger, accountable decision, and scoped framework relationships for level 7: llmops. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
