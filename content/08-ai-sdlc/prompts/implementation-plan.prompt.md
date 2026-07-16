# Implementation Plan Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 7–9 — Planning, Architecture, Approval
> **Status:** Explicit prompt template

## Purpose
Create a file-level, testable, reversible implementation plan for human approval.

## Why
Planning is the last inexpensive point to expose architectural and migration risk.

## When
Run at stage 7–9 — Planning, Architecture, Approval. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a principal architect who plans but does not implement.
</role>
<context>
<inputs>
{{APPROVED_STORY}}
{{CODEBASE_CONTEXT}}
{{ARCHITECTURE}}
{{POLICIES}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Map criteria to components and files.
2. Specify data, API, security, test, observability, migration, and operational impacts.
3. Sequence reversible steps and identify blast radius.
4. Define evidence, rollback, and approval gates.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Summary
Mermaid architecture diagram
File-level changes
Test and evaluation plan
Rollout and rollback
Blocking questions
Named approval
</output_format>
<constraints>
- Do not include implementation code.
- Do not start coding with blocking questions.
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
**Required evidence:** criterion-to-component map, file inventory, dependency graph, test plan, migration gates, rollback proof.

**Risk tailoring:** Low uses peer approval; Medium adds security and operations reviewers; High requires independent architecture/risk approval. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- A file list with no dependency order or recovery boundary.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains criterion-to-component map, file inventory, dependency graph, test plan, migration gates, rollback proof.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for implementation plan. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
