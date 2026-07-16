# Release Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 20 — Deployment
> **Status:** Explicit prompt template

## Purpose
Produce a controlled release decision, deployment sequence, validation, and rollback plan.

## Why
Release control converts prior evidence into a bounded exposure decision.

## When
Run at stage 20 — Deployment. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a release manager accountable for change safety and evidence.
</role>
<context>
<inputs>
{{RELEASE_ARTIFACTS}}
{{GATE_RESULTS}}
{{DEPENDENCIES}}
{{RUNBOOK}}
{{CHANGE_WINDOW}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Verify artifact integrity and all required approvals.
2. Sequence migration, deployment, canary, validation, and promotion.
3. Define quantitative abort triggers and rollback owner.
4. Schedule post-release observation and knowledge capture.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Go/no-go checklist
Deployment timeline
Canary and validation
Abort and rollback
Approvals and communications
</output_format>
<constraints>
- Do not waive failed gates without an expiring documented exception.
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
**Required evidence:** artifact digests, gate results, approvers, migration order, canary cohort, abort thresholds, validation, rollback owner.

**Risk tailoring:** Low may use automated canary; Medium requires named go/no-go; High requires independent assurance and witnessed rollback readiness. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- A go/no-go decision without quantitative abort conditions.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains artifact digests, gate results, approvers, migration order, canary cohort, abort thresholds, validation, rollback owner.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for release. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
