# LLMOps Alerting

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Page on actionable user-impacting conditions and ticket slower quality or cost drift.

## Why
Static universal thresholds create noise and hide domain risk.

## When
Use after baselines and response runbooks exist.

## How
1. Define symptom-based pages for availability, severe safety failures, and runaway spend.
2. Use multi-window burn-rate alerts for SLOs.
3. Ticket statistically credible quality drift.
4. Attach release, route, provider, and runbook context.
5. Test alerts and auto-rollback quarterly.

## Evidence contract
The decision record is the **alert rule and game-day evidence**. It records symptom; SLO; windows; severity; route; runbook; auto-action; dedup key; owner. The on-call service owner owns completeness; the evidence is invalid when an alert cannot identify user impact or a responder action. Persist schema, instrumentation, collector, query, dashboard, and alert revisions so operational conclusions remain reproducible.

## Failure response and recovery
**Trigger:** page delivery, burn calculation, or automated rollback fails.

**Immediate response:** disable unsafe automation, invoke the manual runbook, and repair before re-enabling. Preserve the alert rule and game-day evidence, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to llmops alerting.

## Decision authority
The **on-call service owner** accepts the operational decision. The **incident management lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Telemetry can trigger declared alerts or rollback; service and incident owners judge impact, restoration, and invalid measurement windows.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Sensitive alerts | Fast detection | Noise |
| Conservative alerts | Low noise | Longer exposure |

## Anti-patterns
- Paging on every judge-score dip.
- Alerts without owners or runbooks.

## Enterprise considerations
- Separate security incident channels.
- Preserve notification and acknowledgment evidence.

## Framework relationship
**LLMOps Alerting** defines informative diagnosability evidence. Sampling and mutable operational telemetry do not replace required action or records-management logs.

| Source | Relationship for LLMOps Alerting | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 4.2 | Evaluate monitoring coverage against known failure modes and sampling limitations. |
| ISO/IEC 42001 | 42001 clause 10.2 | Performance-evaluation evidence remains subject to data quality, access, retention, and internal-audit scope. |
| Domain threat/control source | Incident detection for LLM01, LLM06, and LLM10 scenarios | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Pages are actionable.
- [ ] Burn-rate windows tested.
- [ ] Provider failover does not bypass controls.

## References
- OpenTelemetry, [GenAI semantic conventions repository](https://github.com/open-telemetry/semantic-conventions-genai) (accessed 2026-07-16); alerts must declare the pinned telemetry contract.
- Google SRE Workbook, [Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the alert rule and game-day evidence, failure trigger, accountable decision, and scoped framework relationships for llmops alerting. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
