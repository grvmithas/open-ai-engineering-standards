# Debug Pattern — Problem

> **Pattern:** Debug  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Defects persist or recur because responders jump from symptom to speculative fix without reproduction, competing hypotheses, or single-variable experiments. “Fixed” often means “error string gone,” not “causal factor removed.”

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Reopen rate | Same bug ticket reopens within 14 days |
| Fix without test | PR claims fix; no new failing-then-passing test |
| Shotgun diffs | Debug PR touches many unrelated modules |
| Env mystery | “Works on my machine”; prod still fails |
| Hypothesis vacuum | No written alternatives before first patch |

## Root cause

Agents and humans optimize for clearing the immediate error signal. Causal isolation requires locking the environment, stating expected vs actual, and falsifying hypotheses — work that is skipped under time pressure.

## Non-goals of this pattern

- Not feature design or refactoring sprees
- Not a full incident command process (use incident/hotfix patterns for containment)
- Not vendor outage resolution beyond workaround documentation
- Not required for trivial syntax errors

## Related failure modes

See [failures.md](./failures.md).
