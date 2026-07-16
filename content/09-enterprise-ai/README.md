# Level 9: Enterprise AI

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Provide governance, security, architecture, and evidence templates for enterprise AI systems.

## Why
Enterprise controls must be risk-based, technically enforceable, and auditable without overstating framework alignment as compliance.

## When
Use for systems operating across teams, tenants, regulated data, consequential outcomes, or external providers.

## How
1. Classify intended use, affected parties, data, autonomy, and impact.
2. Map applicable legal and policy duties with accountable counsel and risk owners.
3. Implement gateway, identity, isolation, audit, human oversight, and incident controls.
4. Qualify and periodically requalify providers.
5. Retain objective evidence and test exit/rollback.

## Evidence contract
The decision record is the **enterprise AI system record**. It records intended use; operator roles; risk; data flow; controls; providers; owners; evidence; review date. The enterprise AI accountable executive owns completeness; the evidence is invalid when the inventory does not reflect current use or suppliers. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** an unclassified system or unapproved provider reaches production.

**Immediate response:** suspend the capability and convene applicability, security, and service owners. Preserve the enterprise AI system record, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to level 9: enterprise ai.

## Decision authority
The **enterprise AI accountable executive** accepts the operational decision. The **independent assurance function** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Enterprise controls | Consistent assurance | Operational overhead |

## Anti-patterns
- Claiming ISO certification from document alignment.
- Treating an external model provider as the accountable operator.

## Enterprise considerations
- Governance: [EU AI Act](./governance/eu-ai-act.md), [GDPR](./governance/gdpr-for-ai.md), [RBAC](./governance/rbac-patterns.md), [audit logging](./governance/audit-logging.md), [responsible AI](./governance/responsible-ai.md).
- Security: [prompt injection](./security/prompt-injection-defense.md), [sandboxing](./security/sandboxing.md), [least privilege](./security/least-privilege.md), [OAuth for MCP](./security/oauth-for-mcp.md), [red teaming](./security/red-teaming.md).
- Architecture: [provider-neutral harness](./architecture-patterns/provider-neutral-harness.md), [routing gateway](./architecture-patterns/model-routing-gateway.md), [prompt registry](./architecture-patterns/centralized-prompt-registry.md).
- Templates: [ADR](./templates/adr.template.md), [PRD](./templates/prd.template.md), [RFC](./templates/rfc.template.md), [runbook](./templates/runbook.template.md), [incident report](./templates/incident-report.template.md), [RCA](./templates/rca.template.md).
- Control mappings are implementation aids, not legal conclusions or certification claims.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Level 9: Enterprise AI | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1–6 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 4–10 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | OWASP risk coverage is system-specific | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every linked document exists.
- [ ] Provider exit tested.
- [ ] Human accountability assigned.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN and MAP (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) (accessed 2026-07-16). References indicate implementation alignment only; no certification is asserted.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the enterprise AI system record, failure trigger, accountable decision, and scoped framework relationships for level 9: enterprise ai. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
