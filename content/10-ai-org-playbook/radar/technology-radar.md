# OAIES Technology Radar

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Maintain an evidence-based Adopt, Trial, Assess, and Hold view of AI technologies and practices.

## Why
Fast-changing provider claims require repeatable qualification, not trend following.

## When
Review quarterly and after major incidents or provider changes.

## How
1. Accept proposals with owner, use case, evidence, risks, exit path, and review date.
2. Assess in a sandbox; Trial with bounded users and data; Adopt only after production gates.
3. Move to Hold on unresolved security, reliability, legal, interoperability, or concentration risk.
4. Record version-specific decisions; never approve a brand indefinitely.
5. Requalify providers at least annually and on material model, terms, region, control, or incident changes.

## Ring semantics
| Ring | Permitted use | Required evidence | Exit condition |
|---|---|---|---|
| Adopt | Approved use cases may select the exact qualified version through standard architecture | Production evidence, support model, security/data review, cost, interoperability, exit drill, accountable owner | Material change, failed requalification, or better standard replaces it |
| Trial | Bounded production-like use with named cohort, data class, budget, duration, and kill switch | Sandbox assessment, threat model, evaluation baseline, monitoring, rollback | Trial decision date reached or guardrail breach |
| Assess | Research/sandbox only; no production or restricted data | Technical spike, primary-source review, risk hypotheses, test plan | Evidence supports Trial or risk/cost warrants Hold |
| Hold | No new use; existing use follows a dated exit or explicitly approved containment plan | Reason, affected inventory, migration owner, deadline, exception if temporary | Exit completes or new evidence wins formal reconsideration |

A ring attaches to `technology + version + deployment model + use case + data boundary`, never to a vendor name alone.

## Technology Steering Committee operation
| Element | Requirement |
|---|---|
| Membership | Chair, AI platform, product/domain engineering, security, privacy/data, procurement/FinOps; legal and independent assurance attend when triggered |
| Quorum | Chair plus platform, product/domain, and security; privacy/legal required when their trigger applies |
| Conflict | Vendor relationship, authorship, budget ownership, or delivery-goal conflict is disclosed; conflicted members do not cast the deciding vote |
| Evidence deadline | Docket distributed three business days before normal meeting; emergency decisions record why normal notice was impossible |
| Decision | Adopt, Trial, Assess, Hold, defer for named evidence, or reject; record dissent and conditions |
| Voting | Consensus sought; chair decides within delegated risk appetite; high residual-risk acceptance escalates to executive authority |
| Review | Adopt annually; Trial at most 90 days without renewal; Assess at most two quarters; Hold exit monthly |

The TSC curates technical choices. It does not determine legal compliance, approve a product outcome, or replace independent assurance.

## Proposal docket
```yaml
radar_item:
  id: RAD-2026-031
  technology: product-or-practice
  immutable_version: version-or-digest
  deployment_model: managed-eu
  proposed_ring: trial
  intended_use: bounded-use-case
  prohibited_uses: [consequential-autonomous-action]
  data_classes: [public, internal]
  owner: named-role
  evidence:
    capability_eval: immutable-id
    threat_model: immutable-id
    provider_due_diligence: immutable-id
    cost_model: immutable-id
    interoperability_test: immutable-id
  trial:
    cohort: internal-20-users
    ends_at: 2026-09-30
    guardrails: [quality-floor, no-restricted-data, daily-budget]
    kill_switch: tested-control-id
  exit_plan: migration-and-data-deletion-record
  next_review: 2026-08-15
```

## Provider and technology requalification triggers
- Model alias, weights, API version, system behavior, context window, tool semantics, or safety policy changes.
- Data-use, retention, training, subprocessors, region, security, audit, SLA, indemnity, or termination terms change.
- Material vulnerability, incident, regulator action, ownership change, service degradation, or exit-test failure.
- Evaluation drift, unexplained cost/latency shift, interoperability break, or concentration exposure exceeds threshold.

The owner opens a requalification ticket within one business day of a trigger. Until disposition, new deployments stop; existing exposure follows the risk-specific containment decision.

## Radar metrics
| Metric | Interpretation |
|---|---|
| Decision lead time by ring | Whether evidence review is a bottleneck |
| Trial graduation rate and median age | Whether trials produce decisions rather than permanent pilots |
| Hold exit overdue days | Accumulated unsupported technology risk |
| Requalification freshness | Percentage of active Adopt/Trial items within review period |
| Provider concentration by critical workload | Exit and correlated-failure exposure |
| Conditions/exception exposure | Requests, users, spend, and days under conditional approval |
| Post-Adopt incident and rollback rate | Quality of qualification decisions |

## Evidence contract
The decision record is the **technology decision docket**. It records technology/version; use case; ring; evidence; risk; owner; provider terms; exit; review date. The technology steering committee owns completeness; the evidence is invalid when a ring is interpreted as permanent or product-wide approval. Organization evidence records mandate, authority, competence, funding, conflicts, decisions, exceptions, metrics, and review cadence.

## Failure response and recovery
**Trigger:** material vulnerability, terms change, or failed requalification occurs.

**Immediate response:** move the item to Hold, block new use, and execute the documented exit plan. Preserve the technology decision docket, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to oaies technology radar.

## Decision authority
The **technology steering committee** accepts the operational decision. The **security/risk assurance representative** provides independent challenge for high-risk scope, failed gates, or exceptions. Committees may decide only within delegated authority; executives retain risk appetite and funding accountability while independent assurance retains challenge.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Curated radar | Focus and reuse | Governance maintenance |

## Anti-patterns
- Adopting from benchmark marketing.
- Treating Adopt as permanent approval.

## Enterprise considerations
- Current baseline: Adopt OpenTelemetry-compatible tracing and versioned evaluations; Trial bounded agent workflows; Assess emerging agent interoperability; Hold autonomous high-impact actions without independent authorization.
- Radar status is internal guidance, not certification.

## Framework relationship
The **OAIES Technology Radar** document is an operating aid; effectiveness requires observed decisions, funded controls, and independent evidence rather than the existence of this process.

| Source | Relationship for OAIES Technology Radar | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1.5 and MANAGE 3 | Use NIST governance outcomes to test decision rights and accountability in practice. |
| ISO/IEC 42001 | 42001 clauses 6.3 and 8.1 | A documented process supports—but does not itself demonstrate—effective management-system operation. |
| Domain threat/control source | Current threat evidence affects ring placement | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Ring attaches to immutable version, deployment, use case, and data boundary.
- [ ] TSC quorum, conflicts, dissent, conditions, and authority are recorded.
- [ ] Trial has cohort, end date, guardrails, monitoring, budget, and tested kill switch.
- [ ] Adopt has production evidence, operating owner, and successful exit drill.
- [ ] Hold has affected inventory, migration funding, owner, and deadline.
- [ ] Provider/model/terms/security trigger starts requalification and blocks new exposure.
- [ ] Trial age, Hold overdue days, requalification freshness, concentration, and post-Adopt incidents are reviewed.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added ring contracts, TSC quorum and decision protocol, proposal schema, requalification triggers, and radar operating metrics. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
