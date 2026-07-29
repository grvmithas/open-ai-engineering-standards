# Context Pattern — Problem

> **Pattern:** Context  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Agents receive unranked dumps, stale docs, or untrusted retrieval in the system channel — then “confidently” implement against poisoned or oversized packs.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Token blowups | Packs routinely exceed budget with low signal |
| Instruction smuggling | Retrieved text alters tool policy |
| Stale truth | Answers cite deleted APIs or old ADRs |
| Hidden task | More context added instead of clarifying AC |

## Root cause

Retrieval without trust labels and budgets treats all tokens as equal. System-channel contamination turns data into unintended instructions.

## What breaks when this pattern is skipped

- Planner/coder thrash on contradictory sources
- Security review finds tool allowlist changed by retrieved text
- Cost spikes with no quality gain

## Non-goals of this pattern

- Not a substitute for clear acceptance criteria
- Not infinite memory
- Not a license to paste production secrets

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Context problem page expanded with skip-impact and operator symptoms.
