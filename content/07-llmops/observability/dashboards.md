# LLMOps Dashboard Standard

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Provide role-specific operational, quality, cost, and governance views.

## Why
A single crowded dashboard obscures action and ownership.

## When
Use for on-call, product, platform, and risk reviews.

## How
1. Create an on-call view for SLOs, errors, latency, provider health, and active releases.
2. Create quality and safety views with sample size and confidence.
3. Create FinOps views by tenant, route, and unit outcome.
4. Annotate deployments, model changes, and incidents.
5. Link every panel to definition, owner, and drill-down trace.

## Evidence contract
The decision record is the **dashboard-as-code release**. It records panel query; metric version; owner; audience; refresh; threshold; trace drill-down; access policy. The observability experience owner owns completeness; the evidence is invalid when a panel has no definition or mixes incompatible releases. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a decision panel is stale or its query fails validation.

**Immediate response:** mark the view invalid, route responders to source queries, and roll back dashboard revision. Preserve the dashboard-as-code release, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to llmops dashboard standard.

## Decision authority
The **observability experience owner** accepts the operational decision. The **on-call lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Role views | Actionable | More maintenance |

## Anti-patterns
- Unlabeled averages.
- Displaying raw sensitive content.

## Enterprise considerations
- Apply least-privilege access.
- Retain snapshots for high-risk release evidence.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for LLMOps Dashboard Standard | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 3.1 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 9.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Exposure-aware operational reporting | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Deployments annotated.
- [ ] No orphan panels.
- [ ] Drill-down verified.

## References
- OpenTelemetry, [Generative AI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) (accessed 2026-07-16); pin the convention version because portions remain Development.
- OpenTelemetry, [Trace semantic conventions](https://opentelemetry.io/docs/specs/semconv/general/trace/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the dashboard-as-code release, failure trigger, accountable decision, and scoped framework relationships for llmops dashboard standard. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
