# Migration Prompt

> **Version:** 1.0.0
> **Last updated:** 2026-07-16
> **SDLC stage:** 7–20 — Planning through Deployment
> **Status:** Explicit prompt template

## Purpose
Plan and execute reversible data, API, model, prompt, or provider migrations.

## Why
Migration safety depends on compatibility, reconciliation, and knowing the point of no return.

## When
Run at stage 7–20 — Planning through Deployment. Re-run whenever requirements, dependencies, model/provider versions, risk classification, or production evidence changes.

## How
1. Bind inputs to immutable repository, ticket, trace, policy, or release references.
2. Run without unreviewed side effects and stop on a missing authority or fact.
3. Have the accountable stage owner verify the output against source evidence.
4. Record the tailoring decision, approval, and next-stage handoff.

```xml
<role>
You are a migration architect specializing in compatibility and rollback.
</role>
<context>
<inputs>
{{SOURCE_STATE}}
{{TARGET_STATE}}
{{DEPENDENCIES}}
{{DATA_PROFILE}}
{{SLOS}}
</inputs>
<risk_profile>{{RISK_LEVEL}}</risk_profile>
<evidence>{{SOURCE_LINKS_LOGS_TRACES_AND_DIFFS}}</evidence>
</context>
<instructions>
<thinking>Analyze privately; do not expose hidden reasoning.</thinking>
Produce concise conclusions and a verifiable evidence trail.
1. Inventory consumers and invariants.
2. Use expand/migrate/contract with dual-read or shadow validation where justified.
3. Reconcile counts and semantic outcomes.
4. Define point-of-no-return and backup restore proof.
5. Requalify providers and models before traffic shift.
Identify assumptions and stop when a required fact is unavailable.
Define rollback triggers, responsible humans, and post-release incident feedback.
</instructions>
<output_format>
Compatibility matrix
Phases and gates
Reconciliation queries
Rollback per phase
Ownership
</output_format>
<constraints>
- Do not perform destructive contraction before consumers are verified.
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
**Required evidence:** consumer inventory, phase gates, shadow/dual-read results, reconciliation queries, backups, rollback per phase.

**Risk tailoring:** Low migrates with reversible flags; Medium requires staged traffic and operations approval; High requires rehearsal and independent data validation. Tailoring may combine artifacts, but it may not remove accountable approval, verification, release rollback, monitoring, or incident learning.

## Anti-patterns
- Contracting old state before every consumer and recovery path is verified.
- Accepting generated citations, approvals, test results, or file locations without source verification.

## Enterprise considerations
- Apply the approved data classification and provider boundary before supplying context.
- Record model/provider identity when the prompt contributes to a consequential lifecycle decision.
- Exceptions name an owner, compensating control, expiry, and review path; the generating model cannot approve one.

## Checklist
- [ ] The stage owner verified every factual claim against source evidence.
- [ ] The output contains consumer inventory, phase gates, shadow/dual-read results, reconciliation queries, backups, rollback per phase.
- [ ] Tailoring matches the recorded risk tier.
- [ ] Blocking unknowns remain blocking rather than inferred.
- [ ] The next stage has an explicit owner and acceptance condition.

## References
- NIST, [Secure Software Development Framework 1.1](https://doi.org/10.6028/NIST.SP.800-218) (accessed 2026-07-16).
- NIST, [AI RMF 1.0](https://doi.org/10.6028/NIST.AI.100-1) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added stage-specific evidence, risk tailoring, verification, and failure boundaries for migration. |
| 1.0.0 | 2026-07-16 | Initial operational prompt. |
