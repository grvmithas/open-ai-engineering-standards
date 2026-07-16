# Agent Quality Standard

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Require bounded authority, observable state, termination, recovery, and human control for agents.

## Why
Autonomous loops amplify small errors into repeated side effects.

## When
Apply to any system that selects tools or acts over multiple steps.

## How
1. Define role, allowed tools, memory scope, communication protocol, and prohibited actions.
2. Enforce least privilege outside the model.
3. Set step, time, token, cost, and side-effect budgets.
4. Require idempotency, checkpoints, and compensating actions.
5. Test failure, interruption, tool deception, and human handoff.

## Evidence contract
The decision record is the **agent safety case**. It records tools; scopes; memory; budgets; state machine; termination; approvals; compensation; test traces. The agent product owner owns completeness; the evidence is invalid when the agent gains an undeclared capability or persistent memory. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** termination, authorization, or side-effect reconciliation fails.

**Immediate response:** disable autonomous execution, revoke credentials, and reconcile all uncertain actions. Preserve the agent safety case, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to agent quality standard.

## Decision authority
The **agent product owner** accepts the operational decision. The **security and operations jointly** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Bounded agent | Safer and diagnosable | Reduced autonomy |

## Anti-patterns
- Giving broad credentials to improve completion.
- Using model refusal as the only guardrail.

## Enterprise considerations
- Segregate duties for high-impact actions.
- Log proposed, approved, and executed actions.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Agent Quality Standard | Boundary |
|---|---|---|
| NIST AI RMF | MAP 2.3; MANAGE 2.2 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clause 8.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | LLM06 and LLM08 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Termination deterministic.
- [ ] Human can pause.
- [ ] Side effects auditable.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the agent safety case, failure trigger, accountable decision, and scoped framework relationships for agent quality standard. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
