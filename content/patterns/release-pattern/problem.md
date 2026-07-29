# Release Pattern — Problem

> **Pattern:** Release  
> **Component:** problem.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Statement

Promotions skip eval gates, digests, and abort owners — big-bang ships until the rollback window is already gone.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| No abort owner | Canary fails; nobody decides |
| Unpinned artifacts | “Latest” prompt/image drifts |
| Eval bypass | Model-facing change ships on vibe |
| Monitor lag | Errors noticed by users first |

## Root cause

Release pressure rewards green buttons. Progressive delivery and eval gates look slow until a bad promote is irreversible.

## What breaks when this pattern is skipped

- Hotfix follows every release
- Cannot answer “what digest is live?”
- Eval failures ignored as flaky

## Non-goals of this pattern

- Not a substitute for DoD
- Not automatic promote via MCP status text
- Not optional for AI-touched user-visible paths

## Related

- [Failures](./failures.md) — recovery table  
- [Workflow](./workflow.md) — ordered steps  
- [Checklist](./checklist.md) — exit criteria  

## Changelog

- **1.2 (2026-07-29):** Release problem page expanded with skip-impact and operator symptoms.
