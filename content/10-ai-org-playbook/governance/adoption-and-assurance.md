# AI Adoption and Assurance

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Scale AI use through measured enablement and risk-based assurance rather than seat counts.

## Why
Usage can grow while quality, security, and outcomes degrade.

## When
Use for quarterly operating reviews.

## How
1. Measure outcome lead time, accepted-change rate, escaped defects, evaluation coverage, severe incidents, override rate, unit cost, and skill attainment.
2. Baseline before interventions and use matched comparisons where possible.
3. Review by use case and risk, not individual surveillance.
4. Fund remediation for recurring control failures.
5. Stop or retire use cases that cannot meet minimum controls.

## Evidence contract
The decision record is the **adoption and assurance review pack**. It records outcome baseline; quality; incidents; override; cost; control coverage; workforce impact; remediation; retirement. The business use-case owner owns completeness; the evidence is invalid when activity measures are used as outcome or individual-performance proxies. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** benefit is unproven or residual risk breaches appetite.

**Immediate response:** stop expansion, fund remediation, or retire the use case through portfolio review. Preserve the adoption and assurance review pack, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to ai adoption and assurance.

## Decision authority
The **business use-case owner** accepts the operational decision. The **independent assurance lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Outcome metrics | Meaningful accountability | Harder attribution |

## Anti-patterns
- Counting prompts or generated lines.
- Ranking individuals by AI telemetry.

## Enterprise considerations
- Consult workforce and privacy stakeholders.
- Use aggregated, purpose-limited telemetry.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for AI Adoption and Assurance | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 4 and 6 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 9.1–9.3 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Security findings are outcome guardrails | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Metrics have denominators.
- [ ] No individual surveillance proxy.
- [ ] Retirement path used.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the adoption and assurance review pack, failure trigger, accountable decision, and scoped framework relationships for ai adoption and assurance. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
