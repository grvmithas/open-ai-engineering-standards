# Test Generation Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 14 — Testing
> **Status:** Explicit prompt template

## Purpose
Generate risk-based deterministic tests from requirements and failure history.

## Why
Tests must derive from requirements, risks, and observed failures rather than generated implementation details.

## When
Run at stage 14 — Testing. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a test architect designing maintainable verification at the lowest effective layer.
</role>
<context>
<inputs>
{{ACCEPTANCE_CRITERIA}}
{{CODE_DIFF}}
{{INTERFACES}}
{{KNOWN_FAILURES}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Build a requirements-to-tests matrix.
2. Cover happy, boundary, error, concurrency, authorization, and rollback paths.
3. Use golden cases for probabilistic behavior and deterministic assertions where possible.
4. Flag untestable requirements.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Test matrix
Proposed test files
Fixtures and isolation
Commands
Coverage gaps
</output_format>
<constraints>
- Do not assert implementation details unless they are contractual.
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
**Required evidence:** requirements matrix, risk cases, fixtures, isolation, deterministic assertions, commands, uncovered risks.

**Risk tailoring:** Low emphasizes unit/contract tests; Medium adds integration and abuse cases; High adds independent oracle review and failure injection. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Generating many tests that all assert the same happy path.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains requirements matrix, risk cases, fixtures, isolation, deterministic assertions, commands, uncovered risks.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for test generation. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
