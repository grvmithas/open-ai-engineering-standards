# Level 8: AI SDLC

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Preserve the complete 26-stage v1.0 lifecycle while applying a mandatory baseline and risk-based control depth.

## Why
A rigid 26-stage ceremony wastes low-risk effort, while stage skipping removes evidence. Tailoring changes depth, independence, and cadence—not accountability.

## When
Use for every software or AI change.

## How
1. Run the baseline: intake and outcome; testable requirements; risk classification; plan; implementation; review; verification; controlled release; monitoring; learning and closure.
2. Map the baseline to the original stages: 1–6 intake/context, 7–10 plan/approve, 11–13 build/review, 14–19 verify/document, 20–22 release/operate, 23–26 learn/close.
3. Low risk may combine artifacts and use peer approval. Medium risk requires independent security/evaluation review and canary. High risk requires domain, security/privacy/risk approvals, human oversight, red team, rollback drill, and enhanced monitoring.
4. Never remove stages 9 human accountability, 14 verification, 16 security disposition, 20 controlled release, 21 monitoring, or 23–25 incident learning; record not-applicable decisions with rationale.
5. Use the prompt and quality-standard catalogs below.

## v1.0 stage map
| Stage | Original scope | Baseline workstream | Required evidence |
|---|---|---|---|
| 1 | Idea | Intake and outcome | Problem and outcome statement |
| 2 | Research | Intake and outcome | Source and feasibility evidence |
| 3 | Requirements | Requirements and risk | Testable requirements |
| 4 | Story kickoff | Requirements and risk | Approved story |
| 5 | Context collection | Requirements and risk | Context inventory and provenance |
| 6 | Knowledge gathering | Requirements and risk | Assumptions and knowledge gaps |
| 7 | Planning | Plan and approve | Implementation plan |
| 8 | Architecture | Plan and approve | Architecture decision and threat model |
| 9 | Human approval | Plan and approve | Named decision, date, and conditions |
| 10 | Prompt generation | Plan and approve | Versioned prompt artifact and tests |
| 11 | Coding | Build and review | Reviewable change set |
| 12 | Self review | Build and review | Author checklist and test evidence |
| 13 | Agent review | Build and review | Independent automated findings with human disposition |
| 14 | Testing | Verify and document | Deterministic test report |
| 15 | Evaluation | Verify and document | Versioned evaluation report |
| 16 | Security | Verify and document | Security findings and disposition |
| 17 | Performance | Verify and document | Baseline comparison and capacity evidence |
| 18 | Accessibility | Verify and document | Accessibility verification |
| 19 | Documentation | Verify and document | User, operator, API, and decision updates |
| 20 | Deployment | Release and operate | Go/no-go, canary, and rollback record |
| 21 | Monitoring | Release and operate | SLO, trace, dashboard, and alert validation |
| 22 | Continuous improvement | Release and operate | Production-review and backlog loop |
| 23 | Postmortem | Learn and close | Incident analysis when triggered; otherwise release review |
| 24 | Lessons learned | Learn and close | Verified lessons and action owners |
| 25 | Knowledge base update | Learn and close | Searchable decisions, runbooks, and regression cases |
| 26 | Feature complete | Learn and close | Definition-of-Done approval |

## Risk-based tailoring
| Risk | Permitted tailoring | Mandatory depth |
|---|---|---|
| Low | Combine related stage artifacts; peer approval; sampled post-release review | Baseline criteria, security disposition, tests, rollback, monitoring, and closure evidence |
| Medium | Combine only intake or documentation artifacts | Independent security/evaluation review, canary, explicit human release approval, and incident drill |
| High | No combined decision gates | Domain, security, privacy, and risk approval; red team; human action oversight; rollback exercise; enhanced monitoring and appeal |

## Prompt catalog
- [Story Kickoff](./prompts/story-kickoff.prompt.md)
- [Implementation Plan](./prompts/implementation-plan.prompt.md)
- [Architecture Review](./prompts/architecture-review.prompt.md)
- [Coding](./prompts/coding.prompt.md)
- [Refactoring](./prompts/refactoring.prompt.md)
- [Security Review](./prompts/security-review.prompt.md)
- [Performance Review](./prompts/performance-review.prompt.md)
- [Test Generation](./prompts/test-generation.prompt.md)
- [Documentation](./prompts/documentation.prompt.md)
- [Release](./prompts/release.prompt.md)
- [Incident](./prompts/incident.prompt.md)
- [Root Cause Analysis](./prompts/root-cause-analysis.prompt.md)
- [Migration](./prompts/migration.prompt.md)
- [Technical Debt](./prompts/technical-debt.prompt.md)
- [Knowledge Capture](./prompts/knowledge-capture.prompt.md)

## Quality standards
- [Definition of Ready](./quality-standards/definition-of-ready.md)
- [Definition of Done](./quality-standards/definition-of-done.md)
- [Prompt Quality](./quality-standards/prompt-quality-standard.md)
- [Agent Quality](./quality-standards/agent-quality-standard.md)
- [Code Quality](./quality-standards/code-quality-standard.md)

## Evidence contract
The decision record is the **lifecycle evidence index**. It records risk tier; tailored stage map; artifact links; approvals; release; monitoring; learning closure. The delivery accountable executive owns completeness; the evidence is invalid when a stage is marked not applicable without rationale and owner. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** mandatory baseline evidence is absent at release.

**Immediate response:** block deployment or reopen the work item until the evidence chain is complete. Preserve the lifecycle evidence index, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to level 8: ai sdlc.

## Decision authority
The **delivery accountable executive** accepts the operational decision. The **independent assurance lead** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Risk tailoring | Proportional effort | Classification governance |
| Uniform depth | Simple | Waste or insufficient control |

## Anti-patterns
- Calling tailoring stage skipping.
- Classifying risk after implementation.

## Enterprise considerations
- High-risk decisions retain genuine human review and appeal.
- Tailoring records are retained with the release evidence and reviewed by the accountable owner.
- Provider or model changes trigger evaluation and provider requalification before promotion.

## Framework relationship
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for Level 8: AI SDLC | Boundary |
|---|---|---|
| NIST AI RMF | GOVERN 1.3; MANAGE 1 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 6–10 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | SSDF lifecycle practices | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] All 26 stages are mapped.
- [ ] Tailoring rationale approved.
- [ ] Incident loop is operational.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the lifecycle evidence index, failure trigger, accountable decision, and scoped framework relationships for level 8: ai sdlc. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
