# Staged Prompt Deployment

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Promote qualified prompt releases through development, staging, canary, and production.

## Why
Blast radius must grow only as evidence grows.

## When
Use for every prompt or model-envelope release.

## How
1. Validate locally against schema and unit cases.
2. Run locked regression and adversarial gates in CI.
3. Deploy to staging with production-like data contracts.
4. Canary to a bounded cohort with automatic abort thresholds.
5. Promote gradually; retain previous release for instant rollback.

## Evidence contract
The decision record is the **promotion ledger**. It records manifest digest; environment; gate result; canary cohort; exposure; abort threshold; approver. The release manager owns completeness; the evidence is invalid when staging differs materially from production policy or data contracts. Store repository commit, built envelope digest, registry version, environment alias, and signer as one release lineage.

## Failure response and recovery
**Trigger:** canary SLO burn or severe-quality threshold breaches.

**Immediate response:** set the production alias to the prior digest and drain in-flight agent work. Preserve the promotion ledger, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to staged prompt deployment.

## Decision authority
The **release manager** accepts the operational decision. The **service on-call** provides independent challenge for high-risk scope, failed gates, or exceptions. Promotion services may verify signatures and gates; named release and risk owners decide exceptions and production exposure.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Gradual rollout | Limits blast radius | Longer lead time |

## Anti-patterns
- Promoting directly from development.
- Canarying without automatic abort.

## Enterprise considerations
- Require change records for high-risk systems.
- Keep regional rollout controls.

## Framework relationship
**Staged Prompt Deployment** is informative prompt-supply-chain guidance. Qualification remains specific to the rendered envelope, model, tools, data, and intended task.

| Source | Relationship for Staged Prompt Deployment | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.4 | Apply governance outcomes to the complete execution envelope, not prompt text alone. |
| ISO/IEC 42001 | 42001 clauses 8.1 and 8.4 | Management-system alignment depends on controlled authoring, approval, distribution, and corrective action. |
| Domain threat/control source | Unsafe output and excessive agency | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Each environment is immutable.
- [ ] Abort thresholds are live.
- [ ] Previous release remains deployable.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 1.7 and MANAGE 2 (accessed 2026-07-16).
- SLSA, [Provenance](https://slsa.dev/spec/v1.1/provenance) (accessed 2026-07-16); apply the provenance pattern to prompt release envelopes, not as a claim of SLSA conformance.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the promotion ledger, failure trigger, accountable decision, and scoped framework relationships for staged prompt deployment. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
