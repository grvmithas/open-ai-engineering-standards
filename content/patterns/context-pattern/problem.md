# Context Pattern — Problem

> **Pattern:** Context  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Downstream agents (planner, coder, reviewer, debugger) fail when context is empty, stale, secret-laden, or a noisy whole-repo dump. They invent APIs, miss existing helpers, or leak sensitive material into prompts and logs.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Invented symbols | Agent references types/functions absent from package and repo |
| “Missing file” loops | Agent repeatedly asks for paths that should have been included |
| Token blowouts | Context package > budget; quality degrades mid-task |
| Secret hits | Hook or DLP flags keys, tokens, `.env`, prod dumps |
| Stale excerpts | Package cites deleted APIs or pre-refactor shapes |

## Root cause

Context is treated as incidental paste rather than an engineered artifact: no inclusion rationale, no exclusion rules, no size budget, no validation before consumption.

## Non-goals of this pattern

- Not a vector database / RAG product architecture
- Not a substitute for CLAUDE.md / AGENTS.md standing instructions
- Not unbounded “index the company”
- Not planning or coding — only packaging evidence for those agents

## Related failure modes

See [failures.md](./failures.md).
