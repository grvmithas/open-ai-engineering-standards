# AI Roles and Accountability

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Assign one accountable human for every AI system, release, control, incident, and provider relationship.

## Why
Shared responsibility without decision rights produces unowned risk.

## When
Use at portfolio intake and every ownership change.

## How
1. Name product, engineering, model-risk, data, security, privacy, operations, and provider owners.
2. Define maker-checker separation for high-impact changes.
3. Document who can approve, pause, roll back, and retire.
4. Maintain succession and on-call coverage.
5. Review accountability quarterly.

## Evidence contract
The decision record is the **role and competence register**. It records role; decisions; required competence; evidence; delegation; backup; conflicts; review date. The executive role owner owns completeness; the evidence is invalid when an approver lacks competence or has unresolved maker-checker conflict. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a consequential decision has no authorized accountable person.

**Immediate response:** pause the decision and appoint a qualified independent approver. Preserve the role and competence register, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to ai roles and accountability.

## Decision authority
The **executive role owner** accepts the operational decision. The **HR competence and assurance functions** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Explicit accountability | Fast decisions | Named ownership burden |

## Anti-patterns
- Making the vendor accountable for customer outcomes.
- Assigning committees without a single owner.

## Enterprise considerations
- Executives own risk acceptance.
- Humans retain oversight for consequential decisions.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for AI Roles and Accountability | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 2.2 and 2.3 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 5.3 and 7.2 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Security competence includes current GenAI threat practice | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every system has owner.
- [ ] Pause authority known.
- [ ] Backups assigned.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the role and competence register, failure trigger, accountable decision, and scoped framework relationships for ai roles and accountability. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
