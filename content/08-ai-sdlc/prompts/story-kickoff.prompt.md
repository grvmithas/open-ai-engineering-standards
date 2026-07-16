# Story Kickoff Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 4 — Story Kickoff
> **Status:** Explicit prompt template

## Purpose
Transform a feature idea into testable scope, evidence requirements, and risk-based lifecycle tailoring.

## Why
Ambiguous intent compounds across every later stage.

## When
Run at stage 4 — Story Kickoff. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are an engineering lead who converts intent into an unambiguous story without inventing architecture.
</role>
<context>
<inputs>
{{BUSINESS_OUTCOME}}
{{USER_NEED}}
{{SYSTEM_CONTEXT}}
{{CONSTRAINTS}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. State measurable outcome and non-goals.
2. Write happy, edge, failure, security, and observability acceptance criteria.
3. Classify change risk and recommend SDLC controls without removing baseline controls.
4. List unknowns, dependencies, evidence, and approval owner.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Story and outcome
Gherkin acceptance criteria
Risk classification and tailored controls
Dependencies and unknowns
Definition of Ready
</output_format>
<constraints>
- Do not prescribe architecture.
- Do not call a story ready with blocking unknowns.
- Do not fabricate files, test results, citations, approvals, or measurements.
- Do not execute irreversible actions without named human approval.
- Separate observed facts, inferences, and unresolved questions.
</constraints>
```

## Tradeoffs
| Decision | Benefit | Cost |
|---|---|---|
| Use this stage-specific prompt | Consistent evidence and handoff | Preparation and human verification |
| Use a manual artifact with the same schema | Tool independence | Less automated consistency |

## Stage evidence and tailoring
**Required evidence:** approved outcome, Gherkin criteria, risk tier, non-goals, dependencies, data authority.

**Risk tailoring:** Low may combine discovery notes; Medium needs technical risk review; High needs product, domain, privacy, and risk concurrence. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- A story that is easy to read but impossible to test.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains approved outcome, Gherkin criteria, risk tier, non-goals, dependencies, data authority.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for story kickoff. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
