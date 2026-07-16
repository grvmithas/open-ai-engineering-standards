# Debug Pattern — Subagents

> **Pattern:** Debug  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Repro Locker | Pins runtime, flags, data seed, commit SHA | Before experiments | Repro recipe + rate |
| Hypothesis Tester | Executes single-variable experiments | During diagnosis | Confirm / rule-out rows |
| Similarity Scanner | Searches for the same anti-pattern | After root cause known | Path list + risk notes |

## Repro Locker contract

- Record commit SHA, config flags, dependency versions, dataset ID
- State repro rate (always / N% / once)
- Prefer staging or local over prod for invasive probes

## Hypothesis Tester contract

- One independent variable per run
- Cheapest high-likelihood experiment first
- Write raw result, not narrative spin

## Similarity Scanner contract

- Search by error signature, API shape, and anti-pattern snippet
- Open follow-up tickets for non-trivial hits; do not silently “also fix everything” in the same PR without approval
