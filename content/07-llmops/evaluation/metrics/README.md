# Evaluation Metrics Catalog

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Define claim-level faithfulness, groundedness, context recall, hallucination rate, and decision rules.

## Why
Metric names are often inconsistent; operational definitions prevent score laundering.

## When
Use when specifying evaluation plans and dashboards.

## How
1. Faithfulness: supported claims divided by verifiable claims in supplied context.
2. Groundedness: weighted support score for each externally checkable claim against approved sources.
3. Context recall: required reference facts retrieved divided by all required facts.
4. Hallucination rate: unsupported or contradicted claims divided by verifiable claims; also report severe-case rate.
5. Report numerator, denominator, abstentions, confidence interval, slice results, judge version, and threshold rationale.

## Evidence contract
The decision record is the **metric specification registry**. It records metric ID; unit; numerator; denominator; abstention rule; severity weighting; confidence method; owner. The measurement owner owns completeness; the evidence is invalid when an implementation changes without a metric-version change. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** denominator integrity fails or a severe error is averaged away.

**Immediate response:** invalidate the report and recompute from claim-level annotations. Preserve the metric specification registry, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to evaluation metrics catalog.

## Decision authority
The **measurement owner** accepts the operational decision. The **domain risk reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Claim-level metrics | Actionable diagnosis | Annotation cost |
| Aggregate score | Simple trend | Masks severe tails |

## Anti-patterns
- A universal 0.85 threshold.
- Counting unverifiable style statements as hallucinations.
- Reporting means without denominators.

## Enterprise considerations
- Set stricter gates for safety-critical claims.
- Provide human appeal for consequential outcomes.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Evaluation Metrics Catalog | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.5 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 9.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Misinformation and overreliance metrics | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Definitions are fixed.
- [ ] Severe failures are separately gated.
- [ ] Confidence intervals are reported.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the metric specification registry, failure trigger, accountable decision, and scoped framework relationships for evaluation metrics catalog. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
