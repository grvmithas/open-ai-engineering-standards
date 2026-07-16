# Level 10: AI Organization Playbook

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Scale AI engineering through explicit operating models, accountability, measured adoption, and a governed technology radar.

## Why
Technology controls fail when ownership, incentives, funding, and learning loops are absent.

## When
Use when AI work spans multiple teams or materially affects enterprise risk.

## How
1. Adopt the hybrid platform-and-product operating model.
2. Assign accountable owners and independent challenge.
3. Measure outcomes and assurance, not activity volume.
4. Review incidents and provider risk monthly.
5. Update the technology radar quarterly.

## Evidence contract
The decision record is the **AI operating-system scorecard**. It records portfolio; owners; funding; competence; exceptions; incidents; assurance; radar; provider status. The executive AI sponsor owns completeness; the evidence is invalid when a system has no accountable owner or funded control plan. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** portfolio risk exceeds appetite or assurance cannot operate independently.

**Immediate response:** freeze new exposure and require the executive risk owner to approve remediation or retirement. Preserve the AI operating-system scorecard, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to level 10: ai organization playbook.

## Decision authority
The **executive AI sponsor** accepts the operational decision. The **board or enterprise risk committee** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Organization playbook | Repeatable scale | Governance overhead |

## Anti-patterns
- Hiring one expert as the control system.
- Using AI activity telemetry to rank individuals.

## Content
- [Operating model](./governance/operating-model.md)
- [Roles and accountability](./governance/roles-and-accountability.md)
- [Adoption and assurance](./governance/adoption-and-assurance.md)
- [Technology radar](./radar/technology-radar.md)

## Enterprise considerations
- Maintain human oversight and workforce privacy.
- Separate enablement, risk acceptance, and independent assurance decision rights.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Level 10: AI Organization Playbook | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 2–6 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 5–10 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | OWASP informs technical assurance, not organization design | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] All systems have owners.
- [ ] Platform SLOs published.
- [ ] Radar decisions are version-specific.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the AI operating-system scorecard, failure trigger, accountable decision, and scoped framework relationships for level 10: ai organization playbook. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
