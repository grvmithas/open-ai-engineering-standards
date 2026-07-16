# OAIES Technology Radar

> **Version:** 1.0.0
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

## Evidence contract
The decision record is the **technology decision docket**. It records technology/version; use case; ring; evidence; risk; owner; provider terms; exit; review date. The technology steering committee owns completeness; the evidence is invalid when a ring is interpreted as permanent or product-wide approval. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** material vulnerability, terms change, or failed requalification occurs.

**Immediate response:** move the item to Hold, block new use, and execute the documented exit plan. Preserve the technology decision docket, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to oaies technology radar.

## Decision authority
The **technology steering committee** accepts the operational decision. The **security/risk assurance representative** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

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
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for OAIES Technology Radar | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1.5 and MANAGE 3 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 6.3 and 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Current threat evidence affects ring placement | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every item versioned.
- [ ] Owners and review dates present.
- [ ] Provider requalification current.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the technology decision docket, failure trigger, accountable decision, and scoped framework relationships for oaies technology radar. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
