# Ephemeral implementation plans

> **These files are temporary.** Scope = one story/task until done. Do **not** maintain a permanent living plan in git as the source of truth — that is an anti-pattern.

---

## Purpose

Give the coding agent a **decision-complete contract for this slice only**. When the PR merges (or the task is cancelled), the plan’s job is finished.

## Naming (required)

| Artifact | Path |
|----------|------|
| Active plan | `plans/{STORY_ID}-plan.md` |
| Code review report | `reviews/{STORY_ID}-code-review.md` |

Examples: `plans/JIRA-1234-plan.md`, `plans/GH-88-plan.md`, `reviews/JIRA-1234-code-review.md`.

If there is no tracker id, use a short slug: `plans/2026-07-29-auth-refresh-plan.md`.

## Lifecycle

1. **Create** the plan with the `implementation-plan` prompt (copy from `_TEMPLATE.md`).
2. **Approve** (human) before multi-file coding.
3. **Attach** the plan in every agent session for that story (IDE attach / `@file` / `#file:`).
4. **Attach to the PR** (description link or uploaded artifact) for audit.
5. **Stop maintaining it** after merge — delete, move to `plans/archive/`, or leave as frozen PR evidence. Do **not** keep editing it as a roadmap.

## Temporary memory (preferred patterns)

| Approach | When |
|----------|------|
| Attach `plans/{STORY_ID}-plan.md` each chat turn | Default — durable across sessions without polluting long-term docs |
| IDE chat “sticky” / context include for the plan file | Short spikes |
| PR body checklist mirroring plan tasks | Human review only |
| Agent memory / notes keyed by `STORY_ID` | Optional — still keep the file as the contract |

Do **not** dump the full plan into `CLAUDE.md` / `AGENTS.md` / forever-rules.

## Anti-patterns

- A single root `implementation_plan.md` updated for every feature forever
- Treating the plan as product roadmap or architecture ADR
- Coding with no plan file for multi-file work
- Renaming without `STORY_ID` so reviews cannot correlate plan ↔ PR ↔ review report

## Template

Copy [`_TEMPLATE.md`](./_TEMPLATE.md) → `plans/{STORY_ID}-plan.md`.
