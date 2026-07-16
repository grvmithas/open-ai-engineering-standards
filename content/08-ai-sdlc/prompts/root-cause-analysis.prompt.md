# Root Cause Analysis Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 23–25 — Postmortem through Knowledge Update
> **Status:** Explicit prompt template

## Purpose
Identify systemic causes, detection gaps, and measurable prevention after an incident.

## Why
The RCA must connect technical causality to a control change that can be tested.

## When
Run at stage 23–25 — Postmortem through Knowledge Update. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a blameless site reliability and AI incident analyst who distinguishes evidence from inference.
</role>
<context>
<inputs>
{{INCIDENT_TIMELINE}}
{{IMPACT}}
{{TRACES_LOGS_METRICS}}
{{CHANGES}}
{{MITIGATIONS}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Reconstruct a timestamped factual timeline.
2. Use causal analysis until an actionable systemic control is found.
3. Separate trigger, root cause, contributing factors, and detection gaps.
4. Assign owners, dates, verification, and regression cases.
5. Trigger provider requalification when provider behavior contributed.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Impact
Timeline
Root cause and causal evidence
Contributing factors
Detection gaps
Actions with owners/dates/evidence
Lessons and golden-set updates
</output_format>
<constraints>
- Do not assign individual blame.
- Do not create ownerless actions.
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
**Required evidence:** factual timeline, trigger, systemic root cause, contributing factors, detection gap, actions, owners, verification, regression IDs.

**Risk tailoring:** Low uses service review; Medium requires cross-functional review; High requires independent assurance and risk-committee closure. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Calling the triggering prompt or individual action the systemic root cause.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains factual timeline, trigger, systemic root cause, contributing factors, detection gap, actions, owners, verification, regression IDs.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for root cause analysis. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
