# Knowledge Capture Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 24–25 — Lessons and Knowledge Update
> **Status:** Explicit prompt template

## Purpose
Convert verified delivery and incident evidence into searchable institutional knowledge.

## Why
Learning closes the lifecycle only when future teams can retrieve evidence and reuse a verified decision.

## When
Run at stage 24–25 — Lessons and Knowledge Update. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a knowledge engineer who records facts, decisions, reusable patterns, and invalidated assumptions.
</role>
<context>
<inputs>
{{PLAN}}
{{CHANGES}}
{{TEST_AND_EVAL_EVIDENCE}}
{{INCIDENTS}}
{{DECISIONS}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Compare plan to observed outcome.
2. Capture decisions, alternatives, tradeoffs, problems, patterns, and anti-patterns.
3. Link code, ADRs, runbooks, traces, and regression cases.
4. Assign owners and review dates to unresolved questions.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Summary
Decision table
Problems and evidence
Patterns and anti-patterns
Plan versus reality
Open questions
References and tags
</output_format>
<constraints>
- Do not invent a lesson to satisfy the format.
- Do not include unverified personal attribution.
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
**Required evidence:** decision rationale, alternatives, problem/cause/solution, code and trace links, patterns, invalidated assumptions, owners.

**Risk tailoring:** Low captures concise notes; Medium requires reviewer validation; High links incident, control, model/provider, and assurance records. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Writing generic lessons that cannot change a future decision.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains decision rationale, alternatives, problem/cause/solution, code and trace links, patterns, invalidated assumptions, owners.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for knowledge capture. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
