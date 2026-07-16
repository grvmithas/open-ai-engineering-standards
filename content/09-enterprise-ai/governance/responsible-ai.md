# Responsible AI Operating Standard

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Govern validity, safety, fairness, privacy, transparency, accountability, and human control throughout the lifecycle.

## Why
Principles without measurable controls do not change system behavior.

## When
Use at portfolio intake, design, release, monitoring, and retirement.

## How
1. Define intended use, affected people, foreseeable misuse, and prohibited outcomes.
2. Engage domain and affected-stakeholder expertise proportionate to impact.
3. Set slice-based quality, fairness, safety, and appeal metrics.
4. Document limitations and user disclosures.
5. Monitor, receive complaints, remediate, and retire when controls are insufficient.

## Evidence contract
The decision record is the **AI impact and assurance case**. It records intended/foreseeable use; affected groups; harms; metrics; human oversight; notice; appeal; monitoring; retirement. The product accountable owner owns completeness; the evidence is invalid when affected populations or decision consequences change. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a prohibited outcome, material disparity, or ineffective appeal is observed.

**Immediate response:** pause the affected decision path and route cases to qualified humans while reassessing controls. Preserve the AI impact and assurance case, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to responsible ai operating standard.

## Decision authority
The **product accountable owner** accepts the operational decision. The **responsible-AI assurance chair** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Broad participation | Better risk discovery | Time and coordination |

## Anti-patterns
- Fairness as one aggregate metric.
- Transparency that exposes security controls.

## Enterprise considerations
- Board or executive risk appetite sets boundaries.
- Independent challenge for high-impact uses.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Responsible AI Operating Standard | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 5; MAP 5 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 6.1 and 8.4 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Safety and misuse scenarios selected per system | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Affected groups considered.
- [ ] Appeal works.
- [ ] Retirement criteria exist.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN and MAP (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) (accessed 2026-07-16). References indicate implementation alignment only; no certification is asserted.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the AI impact and assurance case, failure trigger, accountable decision, and scoped framework relationships for responsible ai operating standard. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
