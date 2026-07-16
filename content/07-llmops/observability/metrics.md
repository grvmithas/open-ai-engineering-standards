# LLMOps Metrics

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Measure reliability, quality, safety, latency, cost, and human intervention with defined denominators.

## Why
Token and latency dashboards alone cannot show whether the system is useful or safe.

## When
Use for service objectives, release gates, capacity, and governance.

## How
1. Define request success, task success, severe failure, abstention, override, escalation, latency, token, and cost metrics.
2. Segment by route, artifact version, tenant class, language, and risk.
3. Set SLOs from user impact and baseline evidence.
4. Use exemplars to connect metrics to traces.
5. Review metric validity quarterly.

## Evidence contract
The decision record is the **metric catalog and SLO workbook**. It records instrument; unit; population; labels; aggregation; objective; error budget; owner; exemplar query. The service reliability owner owns completeness; the evidence is invalid when a metric loses denominator or cardinality controls. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** SLO burn or data-quality monitor breaches.

**Immediate response:** suppress invalid decision automation, repair instrumentation, and recompute the affected window. Preserve the metric catalog and SLO workbook, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to llmops metrics.

## Decision authority
The **service reliability owner** accepts the operational decision. The **product quality owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Broad metrics | Balanced decisions | Instrumentation load |

## Anti-patterns
- Metrics without denominators.
- Using evaluator score as a production SLO without calibration.

## Enterprise considerations
- Suppress small cohorts.
- Limit access to sensitive slices.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for LLMOps Metrics | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.5 and 3.1 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 9.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Operational indicators for current LLM risks | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every alert maps to impact.
- [ ] Slices expose regressions.
- [ ] Metric owners assigned.

## References
- OpenTelemetry, [Generative AI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) (accessed 2026-07-16); pin the convention version because portions remain Development.
- OpenTelemetry, [Trace semantic conventions](https://opentelemetry.io/docs/specs/semconv/general/trace/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the metric catalog and SLO workbook, failure trigger, accountable decision, and scoped framework relationships for llmops metrics. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
