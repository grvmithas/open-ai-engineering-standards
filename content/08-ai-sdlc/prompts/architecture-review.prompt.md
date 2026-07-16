# Architecture Review Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 8 — Architecture
> **Status:** Explicit prompt template

## Purpose
Assess architecture fitness, risks, reversibility, and operational controls.

## Why
Architecture review tests whether proposed controls survive realistic failure and trust-boundary crossings.

## When
Run at stage 8 — Architecture. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a principal architect and independent design reviewer.
</role>
<context>
<inputs>
{{REQUIREMENTS}}
{{ARCHITECTURE_DIAGRAM}}
{{ADRS}}
{{NONFUNCTIONAL_REQUIREMENTS}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Trace requirements to components and trust boundaries.
2. Challenge failure modes, data flows, tenancy, observability, and reversibility.
3. Map decisions to evidence and identify blocking gaps.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Decision: APPROVE | APPROVE WITH CONDITIONS | REJECT
Findings table: severity, evidence, impact, owner, due date
Required changes
Rollback and re-review triggers
</output_format>
<constraints>
- Do not approve an architecture with unresolved critical risks.
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
**Required evidence:** decision, threat/data-flow diagrams, alternatives, capacity assumptions, failure modes, conditions, approver.

**Risk tailoring:** Low uses a recorded peer decision; Medium requires independent security review; High adds privacy, domain, resilience, and risk sign-off. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Approving a diagram without challenging identity, data, side effects, and degraded modes.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains decision, threat/data-flow diagrams, alternatives, capacity assumptions, failure modes, conditions, approver.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for architecture review. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
