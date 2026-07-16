# Enterprise AI Red Teaming

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Exercise realistic abuse paths across model, data, tools, users, and operations.

## Why
Static tests miss adaptive, multi-step, and socio-technical failures.

## When
Use before high-risk launch, after material changes, and on a risk-based cadence.

## How
1. Define scope, rules, safety, stop conditions, and evidence handling.
2. Build threat scenarios from OWASP GenAI and system-specific abuse cases.
3. Test injection, exfiltration, excessive agency, poisoning, model/provider failure, and denial-of-wallet.
4. Validate impact through safe proof, not destructive exploitation.
5. Track findings to regression tests and verify remediation independently.

## Evidence contract
The decision record is the **red-team campaign record**. It records rules; target digest; scenarios; operators; safety stops; evidence; findings; owners; retests; regression IDs. The red-team lead owns completeness; the evidence is invalid when target release differs from the tested release. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a critical exploit or safety-stop failure is confirmed.

**Immediate response:** stop testing, contain exposed systems, and enter coordinated incident handling. Preserve the red-team campaign record, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to enterprise ai red teaming.

## Decision authority
The **red-team lead** accepts the operational decision. The **system risk owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Independent red team | Finds blind spots | Cost and coordination |

## Anti-patterns
- Running scanners and calling it red teaming.
- Publishing exploitable details before remediation.

## Enterprise considerations
- Use independent challenge for high impact.
- Coordinate vulnerability disclosure.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Enterprise AI Red Teaming | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.7; MANAGE 4 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8.4 and 10.2 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Scenario catalog maps explicitly to OWASP LLM Top 10 2025 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Scope approved.
- [ ] Safety stop works.
- [ ] All confirmed issues regression-tested.

## References
- OWASP, [Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) (accessed 2026-07-16).
- NIST, [Cybersecurity Framework 2.0](https://doi.org/10.6028/NIST.CSWP.29) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the red-team campaign record, failure trigger, accountable decision, and scoped framework relationships for enterprise ai red teaming. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
