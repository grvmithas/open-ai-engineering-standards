# Definition of Done

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Define release completion as verified behavior, operational readiness, and closed learning loops.

## Why
Merged code is not a completed production change.

## When
Apply before release and again after stabilization.

## How
1. Trace every acceptance criterion to evidence.
2. Pass code, security, performance, accessibility, evaluation, and documentation controls selected by risk.
3. Validate observability, runbook, canary, and rollback.
4. Capture named release approval.
5. After stabilization, update incidents, golden sets, and knowledge.

## Evidence contract
The decision record is the **completion evidence map**. It records criterion-to-test links; eval; security; operations; release; residual risk; learning update. The service owner owns completeness; the evidence is invalid when evidence is stale relative to the release digest. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** a release lacks rollback validation or has unresolved critical risk.

**Immediate response:** reopen the change, constrain production exposure, and complete missing gates. Preserve the completion evidence map, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to definition of done.

## Decision authority
The **service owner** accepts the operational decision. The **release assurance reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Comprehensive done | Lower operational risk | Longer cycle |

## Anti-patterns
- Closing work at merge.
- Accepting flaky gates without disposition.

## Enterprise considerations
- Retain evidence under policy.
- Keep human accountability for consequential systems.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Definition of Done | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 1 and 4 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8–10 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | SSDF RV.1 and RV.3 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] All criteria traced.
- [ ] No critical open finding.
- [ ] Operational owner accepts service.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the completion evidence map, failure trigger, accountable decision, and scoped framework relationships for definition of done. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
