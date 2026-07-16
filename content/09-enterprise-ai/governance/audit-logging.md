# Enterprise AI Audit Logging

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Record tamper-evident decision and action lineage while minimizing sensitive content.

## Why
Accountability requires reconstructing who requested, what artifacts ran, what was approved, and what executed.

## When
Use on every production AI request and administrative change.

## How
1. Record trace/request/tenant/actor IDs, prompt and policy digests, model/provider version, tools, approvals, outcome, latency, tokens, and cost.
2. Hash or tokenize sensitive payloads; store content only under explicit policy.
3. Use append-only protected storage and synchronized clocks.
4. Test access, retention, legal hold, export, and deletion.
5. Link incidents and evaluations to trace IDs.

## Evidence contract
The decision record is the **AI action lineage record**. It records actor/workload; tenant; request/trace; artifact digests; provider/model; tool; proposed/approved/executed action; retention class. The records and service owners jointly owns completeness; the evidence is invalid when the executed action cannot be reconstructed or log content exceeds approved minimization. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** audit write failures or tamper signals exceed tolerance.

**Immediate response:** fail closed for consequential actions and move non-consequential traffic to a bounded queue. Preserve the AI action lineage record, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to enterprise ai audit logging.

## Decision authority
The **records and service owners jointly** accepts the operational decision. The **internal audit or security assurance** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Detailed lineage | Strong accountability | Storage/privacy cost |

## Anti-patterns
- Logging raw prompts by default.
- Allowing operators to alter their own audit trail.

## Enterprise considerations
- Retention is requirement-specific, not a universal duration.
- Restrict privileged log access.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Enterprise AI Audit Logging | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 4.1; MANAGE 4 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 7.5 and 9.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Logs must not create LLM06 sensitive-data exposure | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every action reconstructable.
- [ ] Clock skew monitored.
- [ ] Sensitive fields minimized.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN and MAP (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html) (accessed 2026-07-16). References indicate implementation alignment only; no certification is asserted.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the AI action lineage record, failure trigger, accountable decision, and scoped framework relationships for enterprise ai audit logging. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
