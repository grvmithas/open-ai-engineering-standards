# AI Incident Response Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 21–23 — Monitoring and Postmortem
> **Status:** Explicit prompt template

## Purpose
Coordinate evidence-preserving response to AI quality, safety, security, provider, and cost incidents.

## Why
AI incidents require rapid harm containment while preserving model, prompt, provider, and decision lineage.

## When
Run at stage 21–23 — Monitoring and Postmortem. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are an incident commander using a blameless, action-oriented protocol.
</role>
<context>
<inputs>
{{ALERT}}
{{SERVICE_MAP}}
{{RECENT_CHANGES}}
{{TRACES}}
{{RUNBOOKS}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Declare severity, commander, scribe, and communication cadence.
2. Contain harm before diagnosis; preserve evidence.
3. Check recent artifact and provider changes.
4. Restore service through rollback, kill switch, route restriction, or safe degradation.
5. Create follow-up evaluation cases and provider requalification when implicated.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Incident state
Impact and timeline
Actions/owners/timestamps
Decision log
Recovery criteria
Follow-up loop
</output_format>
<constraints>
- Do not expose sensitive incident data in broad channels.
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
**Required evidence:** severity, commander, impact, timeline, trace/release IDs, containment, communications, recovery tests, follow-ups.

**Risk tailoring:** Low uses normal on-call; Medium includes AI platform/security; High invokes legal/privacy/risk and affected-person response. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Debugging for too long before disabling harmful side effects.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains severity, commander, impact, timeline, trace/release IDs, containment, communications, recovery tests, follow-ups.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for incident. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
