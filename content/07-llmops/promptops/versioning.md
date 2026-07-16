# Prompt Versioning

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Treat prompts, schemas, tools, policies, and model settings as one immutable release unit.

## Why
Prompt behavior depends on the entire execution envelope.

## When
Use for every production prompt.

## How
1. Assign content-addressed versions.
2. Store source, variables, output schema, model settings, tool contracts, and owners.
3. Sign releases and preserve lineage.
4. Promote aliases only after gates pass.
5. Roll back aliases atomically.

## Evidence contract
The decision record is the **prompt release manifest**. It records source digest; rendered digest; schema; tool contracts; policy; model parameters; aliases; signature. The PromptOps release manager owns completeness; the evidence is invalid when any runtime component is mutable outside the manifest. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** digest mismatch or undeclared runtime configuration.

**Immediate response:** reject startup or pin the alias to the previous signed manifest. Preserve the prompt release manifest, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to prompt versioning.

## Decision authority
The **PromptOps release manager** accepts the operational decision. The **application owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Immutable releases | Reproducibility | Storage and process overhead |

## Anti-patterns
- Editing production aliases in place.
- Versioning prompt text but not tools or model settings.

## Enterprise considerations
- Separate author and promoter permissions.
- Retain lineage under records policy.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Prompt Versioning | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1.7; MANAGE 2.3 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 7.5 and 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Supply-chain and prompt leakage controls | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every call records release ID.
- [ ] Rollback is one operation.
- [ ] Drift is detectable.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 1.7 and MANAGE 2 (accessed 2026-07-16).
- SLSA, [Provenance](https://slsa.dev/spec/v1.1/provenance) (accessed 2026-07-16); apply the provenance pattern to prompt release envelopes, not as a claim of SLSA conformance.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the prompt release manifest, failure trigger, accountable decision, and scoped framework relationships for prompt versioning. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
