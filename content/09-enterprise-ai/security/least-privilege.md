# Least Privilege for AI Agents

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Grant the minimum identity, data, tool, and action authority for one bounded task.

## Why
Agent uncertainty and injection make standing broad privilege unacceptable.

## When
Use for every retrieval, model, and tool interaction.

## How
1. Decompose capabilities by task.
2. Issue short-lived delegated tokens with audience and tenant constraints.
3. Require policy checks per action.
4. Separate propose, approve, and execute for consequential changes.
5. Revoke automatically and review usage.

## Evidence contract
The decision record is the **agent capability grant ledger**. It records delegator; agent; audience; tenant; scopes; resources; expiry; approval; use; revocation. The resource service owner owns completeness; the evidence is invalid when standing or wildcard privilege appears. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** an action occurs outside the approved task capability.

**Immediate response:** revoke the grant, stop the agent, and reconcile downstream side effects. Preserve the agent capability grant ledger, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to least privilege for ai agents.

## Decision authority
The **resource service owner** accepts the operational decision. The **PAM/IAM assurance** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Narrow grants | Low blast radius | More token exchanges |

## Anti-patterns
- Using user-wide OAuth tokens.
- Trusting tool descriptions as policy.

## Enterprise considerations
- Integrate PAM for privileged tasks.
- Monitor unused and anomalous permissions.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Least Privilege for AI Agents | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 2.3; MANAGE 2.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM06 Excessive Agency | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] No wildcard production scope.
- [ ] Revocation immediate.
- [ ] Deny paths tested.

## References
- OWASP, [Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) (accessed 2026-07-16).
- NIST, [Cybersecurity Framework 2.0](https://doi.org/10.6028/NIST.CSWP.29) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the agent capability grant ledger, failure trigger, accountable decision, and scoped framework relationships for least privilege for ai agents. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
