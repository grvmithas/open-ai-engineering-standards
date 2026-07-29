# Prompt A/B Testing

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative AIES implementation profile

## Purpose
Compare prompt releases with controlled exposure and safety guardrails.

## Why
Uncontrolled traffic comparisons confound user mix, time, and provider changes.

## When
Use after offline gates pass and before broad promotion.

## How
1. Pre-register hypothesis, primary metric, guardrails, sample size, and stop rule.
2. Randomize by stable unit and prevent cross-arm contamination.
3. Start with internal and low-risk cohorts.
4. Monitor quality, harm, latency, and cost together.
5. Stop, roll back, and investigate on guardrail breach.

## Evidence contract
The decision record is the **experiment protocol and analysis packet**. It records hypothesis; assignment unit; seed; power; minimum detectable effect; guardrails; stop rule; exclusions. The experiment owner owns completeness; the evidence is invalid when traffic allocation or primary outcome changes after exposure starts. Store repository commit, built envelope digest, registry version, environment alias, and signer as one release lineage.

## Failure response and recovery
**Trigger:** a safety guardrail crosses its alpha-spending boundary.

**Immediate response:** stop assignment, pin all eligible traffic to control, and investigate exposed severe cases. Preserve the experiment protocol and analysis packet, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to prompt a/b testing.

## Decision authority
The **experiment owner** accepts the operational decision. The **product safety reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Promotion services may verify signatures and gates; named release and risk owners decide exceptions and production exposure.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Online test | Real behavior | User exposure |
| Offline test | Safe and repeatable | Distribution gap |

## Anti-patterns
- Peeking and stopping on favorable noise.
- Optimizing engagement while ignoring safety.

## Enterprise considerations
- Obtain required consent and notices.
- Exclude protected or vulnerable cohorts where appropriate.

## Framework relationship
**Prompt A/B Testing** is informative prompt-supply-chain guidance. Qualification remains specific to the rendered envelope, model, tools, data, and intended task.

| Source | Relationship for Prompt A/B Testing | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.3 and 2.6 | Apply governance outcomes to the complete execution envelope, not prompt text alone. |
| ISO/IEC 42001 | 42001 clause 9.1 | Management-system alignment depends on controlled authoring, approval, distribution, and corrective action. |
| Domain threat/control source | Overreliance and harmful-output guardrails | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Hypothesis pre-registered.
- [ ] Guardrails automated.
- [ ] Rollback tested.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 1.7 and MANAGE 2 (accessed 2026-07-16).
- SLSA, [Provenance](https://slsa.dev/spec/v1.1/provenance) (accessed 2026-07-16); apply the provenance pattern to prompt release envelopes, not as a claim of SLSA conformance.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the experiment protocol and analysis packet, failure trigger, accountable decision, and scoped framework relationships for prompt a/b testing. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
