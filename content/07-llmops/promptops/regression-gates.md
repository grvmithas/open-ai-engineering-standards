# Prompt Regression Gates

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Block releases that exceed justified quality, safety, latency, or cost tolerances.

## Why
A quality gain that violates safety or budget is not a valid improvement.

## When
Use on prompt, model, retrieval, tool, policy, and provider changes.

## How
1. Declare baseline and non-inferiority margin.
2. Run deterministic checks first, then model-graded and adversarial suites.
3. Evaluate risk slices and severe-case zero-tolerance rules.
4. Require human disposition for flaky or disputed failures.
5. Store signed gate result and prevent bypass without expiring exception.

## Evidence contract
The decision record is the **gate decision record**. It records baseline; non-inferiority margins; per-slice results; retries; severe failures; exception expiry. The evaluation gate owner owns completeness; the evidence is invalid when the suite, scorer, or baseline changes without re-baselining. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a zero-tolerance case fails or confidence bound exceeds margin.

**Immediate response:** block promotion; an expiring exception cannot waive severe cases. Preserve the gate decision record, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to prompt regression gates.

## Decision authority
The **evaluation gate owner** accepts the operational decision. The **risk acceptance authority** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Strict gate | Predictable quality | More blocked changes |
| Advisory gate | Faster flow | Uncontrolled regressions |

## Anti-patterns
- Averaging away catastrophic failures.
- Silently retrying until a pass.

## Enterprise considerations
- Audit bypasses.
- Set risk-specific tolerances.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Prompt Regression Gates | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.6; MANAGE 1.3 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8.4 and 9.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Security assertions mapped to the current OWASP LLM risks | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] All material changes trigger gate.
- [ ] Exceptions expire.
- [ ] Severe failures block.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 1.7 and MANAGE 2 (accessed 2026-07-16).
- SLSA, [Provenance](https://slsa.dev/spec/v1.1/provenance) (accessed 2026-07-16); apply the provenance pattern to prompt release envelopes, not as a claim of SLSA conformance.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the gate decision record, failure trigger, accountable decision, and scoped framework relationships for prompt regression gates. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
