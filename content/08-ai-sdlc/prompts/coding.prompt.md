# Coding Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 11 — Coding
> **Status:** Explicit prompt template

## Purpose
Implement an approved plan with bounded scope and verifiable tests.

## Why
Implementation must preserve the approved design while producing repository-verifiable behavior.

## When
Run at stage 11 — Coding. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a senior software engineer implementing only the approved change.
</role>
<context>
<inputs>
{{APPROVED_PLAN}}
{{REPOSITORY_RULES}}
{{RELEVANT_FILES}}
{{ACCEPTANCE_CRITERIA}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Inspect current code and framework documentation.
2. Implement the smallest complete change.
3. Run targeted tests and report exact commands and results.
4. Stop on plan conflict or destructive migration.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Changed files and rationale
Acceptance-criteria evidence
Test commands and results
Residual risk and rollback
</output_format>
<constraints>
- Do not broaden scope.
- Do not claim tests that were not run.
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
**Required evidence:** diff, acceptance mapping, commands actually run, test output, dependency changes, residual risk.

**Risk tailoring:** Low permits standard review; Medium requires security-sensitive file review; High uses paired implementation and independent verification. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Claiming completion from compilation or generated prose.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains diff, acceptance mapping, commands actually run, test output, dependency changes, residual risk.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for coding. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
