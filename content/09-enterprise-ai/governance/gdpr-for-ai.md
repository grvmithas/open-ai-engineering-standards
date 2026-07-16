# GDPR for AI Systems

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Implement data-protection controls for personal data used in AI systems.

## Why
Model calls can create new processing, international transfers, retention, and automated-decision risks.

## When
Use before collecting, training on, retrieving, or transmitting personal data.

## How
1. Document purpose, lawful basis, necessity, data categories, recipients, and retention.
2. Complete DPIA where required.
3. Minimize and pseudonymize context; contract processors and assess transfers.
4. Support access, correction, objection, restriction, and erasure across caches and logs.
5. Assess Article 22 and provide meaningful human intervention where applicable.

## Evidence contract
The decision record is the **AI processing record and DPIA file**. It records controller/processor roles; purposes; lawful bases; categories; recipients; transfers; retention; rights; Article 22 analysis. The controller business owner owns completeness; the evidence is invalid when purpose, data source, recipient, or automated effect changes. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** unlawful processing, rights failure, or personal-data breach is suspected.

**Immediate response:** stop the affected processing, preserve minimum evidence, and invoke DPO/breach procedures. Preserve the AI processing record and DPIA file, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to gdpr for ai systems.

## Decision authority
The **controller business owner** accepts the operational decision. The **DPO or privacy counsel** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Data minimization | Lower exposure | Potential quality reduction |

## Anti-patterns
- Treating hashing as anonymization.
- Retaining prompts indefinitely for debugging.

## Enterprise considerations
- Privacy and legal review remain accountable.
- Test data-subject workflows end to end.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for GDPR for AI Systems | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1.2; MAP 4 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8.2 and 8.4 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Privacy is not proven by model safety controls | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Lawful basis recorded.
- [ ] Deletion reaches vendors.
- [ ] Human intervention is genuine.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN and MAP (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) (accessed 2026-07-16). References indicate implementation alignment only; no certification is asserted.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the AI processing record and DPIA file, failure trigger, accountable decision, and scoped framework relationships for gdpr for ai systems. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
