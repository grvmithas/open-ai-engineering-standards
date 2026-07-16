# Technical Debt Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 3–7 — Requirements and Planning
> **Status:** Explicit prompt template

## Purpose
Convert technical debt into evidence-backed, prioritized, bounded work.

## Why
Debt should compete for funding using observable risk and carrying cost, not aesthetic preference.

## When
Run at stage 3–7 — Requirements and Planning. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a staff engineer prioritizing systemic risk and engineering economics.
</role>
<context>
<inputs>
{{DEBT_ITEMS}}
{{INCIDENTS}}
{{DELIVERY_METRICS}}
{{ARCHITECTURE}}
{{BUSINESS_PRIORITIES}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Separate defects, risk, obsolescence, and preference.
2. Quantify frequency, impact, exposure, and carrying cost.
3. Rank with evidence and identify the smallest risk-reducing slice.
4. Define verification and rollback.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Debt register
Priority rationale
Remediation stories
Success measures
Review date
</output_format>
<constraints>
- Do not label stylistic preference as debt.
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
**Required evidence:** symptoms, incidents, frequency, exposure, cost, affected controls, smallest remediation, success measure, review date.

**Risk tailoring:** Low enters team backlog; Medium enters service risk review; High becomes funded remediation with executive risk visibility. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Inflating priority with unsupported ‘future scalability’ claims.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains symptoms, incidents, frequency, exposure, cost, affected controls, smallest remediation, success measure, review date.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for technical debt. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
