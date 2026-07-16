# Continuous Evaluation

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Detect quality drift between releases and close the production-to-test feedback loop.

## Why
Provider behavior, traffic, knowledge, and adversaries change without repository changes.

## When
Run on each change, scheduled canaries, sampled production traffic, and after incidents.

## How
1. Gate pull requests on deterministic and compact regression suites.
2. Run full suites nightly and on provider/model notices.
3. Sample production by risk and failure signals; redact before review.
4. Compare to a declared baseline with uncertainty and minimum sample size.
5. Freeze rollout, roll back, or degrade safely when guardrails breach; open and learn from an incident.

## Evidence contract
The decision record is the **evaluation run ledger**. It records release ID; dataset hash; sampling frame; sample size; baseline delta; interval; decision; reviewer. The production evaluation owner owns completeness; the evidence is invalid when sampling or baseline comparability is broken. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a severe case occurs or a guardrail crosses its sequential boundary.

**Immediate response:** halt rollout, preserve sampled traces, restore the previous route, and seed the incident case into regression. Preserve the evaluation run ledger, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to continuous evaluation.

## Decision authority
The **production evaluation owner** accepts the operational decision. The **on-call incident commander** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Frequent evaluation | Fast detection | Cost and reviewer load |
| Sparse evaluation | Lower cost | Longer unsafe exposure |

## Anti-patterns
- Testing only when prompts change.
- Alerting on noisy point estimates.
- Reusing production data without authorization.

## Enterprise considerations
- Use risk-weighted sampling.
- Route telemetry through approved regions and processors.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Continuous Evaluation | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 3; MANAGE 4 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 9.1 and 10.2 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Monitoring and incident response for LLM risks | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] PR and scheduled gates run.
- [ ] Alerts name an owner.
- [ ] Rollback is exercised.
- [ ] Provider requalification is scheduled.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), MEASURE 2–3 (accessed 2026-07-16).
- NIST, [AI 600-1 Generative AI Profile](https://doi.org/10.6028/NIST.AI.600-1), Measurement and Evaluation risks (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the evaluation run ledger, failure trigger, accountable decision, and scoped framework relationships for continuous evaluation. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
