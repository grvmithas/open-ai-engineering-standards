# Prompt Quality Standard

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Set the minimum production bar for structured, testable, versioned prompts.

## Why
Prompt quality is an engineering property established by evidence, not prose review.

## When
Apply to system, developer, evaluator, and agent prompts.

## How
1. Use XML role, context, instructions, output_format, constraints, and thinking/scratchpad instruction.
2. State authority boundaries, stop conditions, and at least three constraints.
3. Version the complete execution envelope.
4. Test normal, edge, adversarial, multilingual, and malformed inputs.
5. Define release and rollback gates.

## Evidence contract
The decision record is the **prompt qualification package**. It records XML schema; variables; authority; stop conditions; envelope digest; normal/edge/adversarial results. The prompt owner owns completeness; the evidence is invalid when a tool, schema, policy, or model setting changes outside the prompt version. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** prompt regression or injection control fails.

**Immediate response:** withdraw the release alias and restore the prior qualified envelope. Preserve the prompt qualification package, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to prompt quality standard.

## Decision authority
The **prompt owner** accepts the operational decision. The **security reviewer for tool-capable prompts** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Explicit structure | Predictability | More maintenance |

## Anti-patterns
- Embedding secrets.
- Relying on prompt text as authorization.

## Enterprise considerations
- Review data residency.
- Apply accessible and non-discriminatory language.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Prompt Quality Standard | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.6 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8.1 and 8.4 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM01, LLM06, and LLM08 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Schema validated.
- [ ] Injection cases pass.
- [ ] Fallback defined.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the prompt qualification package, failure trigger, accountable decision, and scoped framework relationships for prompt quality standard. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
