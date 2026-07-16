# RBAC and ABAC for AI

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Authorize AI users, agents, tools, data, and actions with policy enforced outside the model.

## Why
Natural-language instructions are not access control.

## When
Use for every model gateway and tool-capable agent.

## How
1. Define roles, attributes, resources, actions, and tenant boundaries.
2. Issue short-lived workload identity.
3. Evaluate policy at each retrieval and tool call.
4. Require step-up or dual approval for high-impact actions.
5. Review entitlements and test deny paths quarterly.

## Evidence contract
The decision record is the **authorization policy bundle**. It records subject; workload; tenant; resource; action; context; decision; policy version; approval; expiry. The IAM product owner owns completeness; the evidence is invalid when a model can influence policy inputs not bound by trusted identity. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** cross-tenant access or unauthorized side effect occurs.

**Immediate response:** revoke tokens, disable the capability, and review all decisions under the affected policy version. Preserve the authorization policy bundle, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to rbac and abac for ai.

## Decision authority
The **IAM product owner** accepts the operational decision. The **application security owner** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Fine-grained policy | Least privilege | Policy complexity |

## Anti-patterns
- One service account for all agents.
- Passing credentials in prompts.

## Enterprise considerations
- Integrate with enterprise IAM.
- Separate development and production identities.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for RBAC and ABAC for AI | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM06 Excessive Agency | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Default deny.
- [ ] Tenant isolation tested.
- [ ] Break-glass expires.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN and MAP (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) (accessed 2026-07-16). References indicate implementation alignment only; no certification is asserted.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the authorization policy bundle, failure trigger, accountable decision, and scoped framework relationships for rbac and abac for ai. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
