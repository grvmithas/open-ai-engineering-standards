# AI-Assisted Code Quality Standard

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Hold AI-authored code to the same or higher evidence bar as human-authored code.

## Why
Generation speed increases review volume and supply-chain risk; authorship does not establish correctness.

## When
Apply to all code created or materially modified with AI.

## How
1. Require accountable human ownership.
2. Use repository and framework rules as source of truth.
3. Run formatting, static analysis, unit, integration, security, and dependency checks appropriate to risk.
4. Review generated dependencies, licenses, secrets, and provenance.
5. Keep changes small and reversible.

## Evidence contract
The decision record is the **AI-assisted change dossier**. It records accountable author; diff; provenance; dependency review; static analysis; tests; license/security results. The human code owner owns completeness; the evidence is invalid when generated APIs or test claims are not verifiable in the repository. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a critical defect or unauthorized dependency is found.

**Immediate response:** revert the change and invalidate derivative generated patches. Preserve the AI-assisted change dossier, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to ai-assisted code quality standard.

## Decision authority
The **human code owner** accepts the operational decision. The **designated reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Stronger gates | Reliable scaling | Compute and review cost |

## Anti-patterns
- Approving because code compiles.
- Accepting fabricated APIs or tests.

## Enterprise considerations
- Record material AI assistance where policy requires.
- Do not submit restricted code to unapproved providers.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for AI-Assisted Code Quality Standard | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 2.1 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 7.2 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | SSDF PW.4, PW.7, and RV.1 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] No new diagnostics.
- [ ] Tests cover failure paths.
- [ ] Human owner signs off.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the AI-assisted change dossier, failure trigger, accountable decision, and scoped framework relationships for ai-assisted code quality standard. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
