# LLMOps Alerting

> **Version:** 1.0.0
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
The decision record is the **alert rule and game-day evidence**. It records symptom; SLO; windows; severity; route; runbook; auto-action; dedup key; owner. The on-call service owner owns completeness; the evidence is invalid when an alert cannot identify user impact or a responder action. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** page delivery, burn calculation, or automated rollback fails.

**Immediate response:** disable unsafe automation, invoke the manual runbook, and repair before re-enabling. Preserve the alert rule and game-day evidence, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to llmops alerting.

## Decision authority
The **on-call service owner** accepts the operational decision. The **incident management lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

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
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for LLMOps Alerting | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 4.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 10.2 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Incident detection for LLM01, LLM06, and LLM10 scenarios | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Pages are actionable.
- [ ] Burn-rate windows tested.
- [ ] Provider failover does not bypass controls.

## References
- OpenTelemetry, [Generative AI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) (accessed 2026-07-16); pin the convention version because portions remain Development.
- OpenTelemetry, [Trace semantic conventions](https://opentelemetry.io/docs/specs/semconv/general/trace/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the alert rule and game-day evidence, failure trigger, accountable decision, and scoped framework relationships for llmops alerting. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
