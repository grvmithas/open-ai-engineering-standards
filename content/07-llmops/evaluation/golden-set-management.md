# Golden Set Management

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Build representative, versioned evaluation datasets that support release decisions.

## Why
A stale or contaminated test set turns evaluation into false confidence.

## When
Use before the first release and continuously after incidents and sampled production review.

## How
1. Define task taxonomy, risk strata, languages, edge cases, abuse cases, and prohibited outcomes.
2. Source examples with provenance and lawful-use metadata; remove secrets and direct identifiers.
3. Create independent author, reviewer, and approver roles; adjudicate disagreements.
4. Split development and locked holdout sets; detect benchmark contamination.
5. Version changes, record label rationale, and add every confirmed production failure before closing its incident.

## Evidence contract
The decision record is the **dataset card and signed manifest**. It records case ID; source provenance; consent basis; risk slice; label; adjudication; split; content hash. The evaluation data steward owns completeness; the evidence is invalid when provenance is missing or holdout contamination is detected. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a case leaks, is mislabeled, or appears in optimization data.

**Immediate response:** quarantine the dataset version, revoke holdout access, and rebuild affected baselines. Preserve the dataset card and signed manifest, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to golden set management.

## Decision authority
The **evaluation data steward** accepts the operational decision. The **domain adjudication lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Locked holdout | Strong regression signal | Slower iteration |
| Production-derived cases | High relevance | Privacy and sampling bias |

## Anti-patterns
- Training prompts against the holdout.
- Deleting difficult cases because scores fall.

## Enterprise considerations
- Apply retention and deletion requirements.
- Require domain experts for regulated labels.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Golden Set Management | Boundary |
|---|---|---|
| NIST AI RMF | MAP 3; MEASURE 2.5 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 7.5 and 8.4 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Data poisoning and sensitive-information disclosure | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every item has provenance.
- [ ] Coverage gaps have owners.
- [ ] Contamination checks pass.
- [ ] Incident cases enter regression.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the dataset card and signed manifest, failure trigger, accountable decision, and scoped framework relationships for golden set management. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
