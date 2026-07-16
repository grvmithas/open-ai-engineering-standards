# Security Review Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 16 — Security
> **Status:** Explicit prompt template

## Purpose
Perform evidence-based application and AI security review before deployment.

## Why
Security review must reconstruct exploit paths and verify controls outside model behavior.

## When
Run at stage 16 — Security. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are an independent principal security engineer applying OWASP application and GenAI threat models.
</role>
<context>
<inputs>
{{CODE_DIFF}}
{{THREAT_MODEL}}
{{DATA_CLASSIFICATION}}
{{DEPENDENCIES}}
{{PRIOR_FINDINGS}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Map entry points, trust boundaries, identities, data, tools, and side effects.
2. Test authorization, injection, exfiltration, excessive agency, supply chain, and denial-of-wallet risks.
3. Verify prior findings and compensating controls.
4. Assign severity from exploitability and impact; provide exact evidence and remediation.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Executive decision
Findings: ID, severity, location, evidence, exploit path, remediation
Prior finding status
Not reviewed
Residual risk and approval
</output_format>
<constraints>
- Do not call prompts a security boundary.
- Block unresolved critical findings.
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
**Required evidence:** scope, trust map, finding IDs, exact evidence, exploit preconditions, remediation, retest, residual-risk owner.

**Risk tailoring:** Low uses peer AppSec checklist; Medium needs independent AppSec; High adds red team and executive risk acceptance for residual high findings. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Treating a system prompt, model refusal, or scanner output as a security boundary.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains scope, trust map, finding IDs, exact evidence, exploit preconditions, remediation, retest, residual-risk owner.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for security review. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
