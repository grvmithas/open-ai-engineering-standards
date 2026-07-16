# Prompt Injection Defense

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Contain direct and indirect prompt injection with deterministic trust boundaries.

## Why
Models cannot reliably distinguish instructions from untrusted content.

## When
Use whenever user or retrieved content reaches a model.

## How
1. Label and isolate trusted instructions from data.
2. Constrain tools with schema, policy, least privilege, and confirmation.
3. Sanitize rendering and validate outputs before side effects.
4. Detect suspicious patterns as signals, not sole controls.
5. Red-team cross-channel exfiltration and maintain kill switches.

## Evidence contract
The decision record is the **injection threat model and control test pack**. It records trust zones; instruction/data labels; retrieval sources; tools; secrets; side effects; egress; attack corpus. The application security owner owns completeness; the evidence is invalid when new content channel or tool bypasses mediation. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** injection causes secret access, policy bypass, or unauthorized action.

**Immediate response:** disable affected tools, rotate exposed credentials, and replay traces against the attack corpus. Preserve the injection threat model and control test pack, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to prompt injection defense.

## Decision authority
The **application security owner** accepts the operational decision. The **red-team lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Strict mediation | Limits impact | More false blocks |

## Anti-patterns
- Asking the model to ignore injection.
- Giving retrieved documents authority.

## Enterprise considerations
- Assume compromise of model behavior.
- Monitor emerging attack patterns.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Prompt Injection Defense | Boundary |
|---|---|---|
| NIST AI RMF | MAP 2.3; MANAGE 2.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM01 Prompt Injection | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] No raw secret access.
- [ ] Side effects independently authorized.
- [ ] Kill switch tested.

## References
- OWASP, [Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) (accessed 2026-07-16).
- NIST, [Cybersecurity Framework 2.0](https://doi.org/10.6028/NIST.CSWP.29) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the injection threat model and control test pack, failure trigger, accountable decision, and scoped framework relationships for prompt injection defense. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
