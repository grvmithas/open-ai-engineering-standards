# AI Roles and Accountability

> **Version:** 1.1.0
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

## Role accountabilities
| Role | Accountable decisions | Must not approve alone |
|---|---|---|
| Executive AI sponsor | Risk appetite, high residual-risk acceptance, strategic provider exit, control funding | Technical control effectiveness they did not verify |
| AI platform product owner | Shared-control roadmap, SLOs, provider integration operations | Product outcome or legal applicability |
| Product/use-case owner | Intended use, user outcome, affected-person process, use-case release and retirement | Their own high-risk exception |
| Engineering owner | Architecture, implementation, service reliability, rollback | Independent assurance of their implementation |
| Evaluation owner | Metric definitions, golden-set governance, gate configuration, calibration | Business acceptance of residual harm |
| Security/privacy/data owners | Domain control requirements and findings in their authority | Product value or engineering delivery priority |
| Incident commander | Incident actions and communications during declared command | Permanent risk acceptance after stabilization |
| Independent assurance lead | Assurance scope, sampling, findings, closure verification | Implementing the corrective action they will verify |
| Provider relationship owner | Due diligence, contract controls, notices, requalification, exit | Technical qualification without platform/domain evidence |

## Competence framework
Competence is demonstrated through work evidence, not course attendance alone.

| Level | Scope | Demonstrated evidence | Permitted decisions |
|---|---|---|---|
| Foundation | Uses approved AI tooling and recognizes data/security boundaries | Scenario assessment; passes restricted-data, citation, and escalation exercises | Low-risk tool use within approved workflow |
| Practitioner | Builds or operates one bounded AI component | Reviewed release with tests/evaluation, trace diagnosis, rollback exercise, incident participation | Low-risk implementation and peer review |
| Lead | Owns a production AI service or control | Two successful release cycles, evaluator calibration, threat model, SLO/runbook, corrective-action closure | Medium-risk technical approval within role |
| Principal/domain authority | Defines cross-team architecture, evaluation, security, privacy, legal, or domain practice | Approved standard/profile, independent challenge record, high-severity incident leadership, mentoring outcomes | High-risk recommendation and exception review in domain |
| Assurance authority | Independently evaluates evidence and residual risk | Calibrated assessment results, conflict management, sampled control testing, closure verification | Assurance opinion; not implementation ownership |

Each role record identifies required level by decision type. A person may hold several roles only if conflicts are documented and maker-checker separation remains effective.

## Competence assessment
1. Use scenario-based exercises drawn from actual system risks: prompt injection with tool access, evaluator drift, provider outage, data deletion, rollback, and affected-person escalation.
2. Score observable decisions against a rubric: evidence use, boundary recognition, technical correctness, escalation timing, and recovery.
3. Require production work samples or supervised simulations for Practitioner and above.
4. Reassess annually, after a material role change, and after an incident exposes a competence gap.
5. Assign remediation with deadline and supervised decision limits; training completion alone does not close the gap.

```yaml
competence_record:
  person_or_role_id: pseudonymous-id
  role: evaluation-owner
  required_level: lead
  assessed_at: 2026-07-16
  scenarios: [judge-drift, severe-case-miss, provider-change]
  evidence_refs: [immutable-assessment-id]
  assessor: independent-qualified-role
  result: qualified_with_conditions
  conditions: [second-review-for-high-risk]
  expires_at: 2027-07-16
```

## Delegation, conflicts, and succession
- Delegation is written, scoped by decision and system, time-bound, and accepted by a qualified delegate.
- Accountability remains with the delegating role unless governance explicitly reassigns it.
- Reviewers disclose reporting-line, delivery-goal, financial, vendor, and authorship conflicts.
- High-risk assurance reviewers cannot have authored the control or report to the accountable product/platform owner.
- Every production service, incident role, provider relationship, and high-risk approval role has a qualified backup and tested handoff.
- Loss of the only qualified owner moves the system to restricted operation until succession is complete.

## Evidence contract
The decision record is the **role and competence register**. It records role; decisions; required competence; evidence; delegation; backup; conflicts; review date. The executive role owner owns completeness; the evidence is invalid when an approver lacks competence or has unresolved maker-checker conflict. Organization evidence records mandate, authority, competence, funding, conflicts, decisions, exceptions, metrics, and review cadence.

## Failure response and recovery
**Trigger:** a consequential decision has no authorized accountable person.

**Immediate response:** pause the decision and appoint a qualified independent approver. Preserve the role and competence register, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to ai roles and accountability.

## Decision authority
The **executive role owner** accepts the operational decision. The **HR competence and assurance functions** provides independent challenge for high-risk scope, failed gates, or exceptions. Committees may decide only within delegated authority; executives retain risk appetite and funding accountability while independent assurance retains challenge.

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
The **AI Roles and Accountability** document is an operating aid; effectiveness requires observed decisions, funded controls, and independent evidence rather than the existence of this process.

| Source | Relationship for AI Roles and Accountability | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 2.2 and 2.3 | Use NIST governance outcomes to test decision rights and accountability in practice. |
| ISO/IEC 42001 | 42001 clauses 5.3 and 7.2 | A documented process supports—but does not itself demonstrate—effective management-system operation. |
| Domain threat/control source | Security competence includes current GenAI threat practice | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Every system, release, control, provider, incident, exception, and retirement decision has one accountable role.
- [ ] Role combinations preserve maker-checker and assurance independence.
- [ ] Required competence level is mapped to each decision.
- [ ] Competence is supported by scenarios and work evidence, not attendance alone.
- [ ] Conditional qualifications constrain permissions in workflow/IAM.
- [ ] Delegations are scoped, accepted, expiring, and auditable.
- [ ] Pause, rollback, affected-person escalation, and risk-acceptance authorities are explicit.
- [ ] Qualified backups and handoffs are tested.

## References
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1), GOVERN 2–6 (accessed 2026-07-16).
- ISO, [ISO/IEC 42001:2023](https://www.iso.org/standard/81230.html), clauses 5–10 (accessed 2026-07-16). No certification or conformity claim is made.

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added role decision boundaries, evidence-based competence levels, assessment records, delegation, conflict, and succession controls. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
