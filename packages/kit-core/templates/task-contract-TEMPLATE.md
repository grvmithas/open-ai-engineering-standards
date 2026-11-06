# Task contract — {TASK_ID}

> One task · one branch (`agent/{TASK_ID}`) · one worktree · one base commit.
> Created by `node scripts/aies-worktree.mjs new {TASK_ID}`. Fill every section **before** starting the agent.
> `node scripts/aies-worktree.mjs check {TASK_ID}` enforces the path sections below.

## Objective

{One sentence: the observable outcome. Link the parent plan: plans/{STORY_ID}-plan.md}

## Allowed paths

<!-- Globs, one per bullet. ** matches across directories. Anything not listed is a violation. -->
- `src/feature-x/**`
- `tests/feature-x/**`

## Prohibited paths

<!-- Always-off-limits, even if an allowed glob matches. -->
- `package-lock.json`
- `.github/**`
- `**/migrations/**`

## Acceptance criteria

- [ ] {criterion verifiable by a command or test}
- [ ] Repo verification passes: `{lint}` · `{typecheck}` · `{test}` (exact commands from AIES.md)

## Isolation

| Resource | Value |
|----------|-------|
| Ports | from `.env.worktree` (`PORT`, `AIES_PORT_RANGE`) — never hard-code 3000/5432 |
| Database | schema/db named by `DATABASE_SCHEMA` in `.env.worktree`; never the shared dev DB |
| Credentials | read-only or sandbox tokens only; no production secrets in this worktree |

## Dependencies

- Depends on: {other TASK_IDs that must merge first, or "none"}
- Blocks: {TASK_IDs waiting on this}

## Stop conditions

The agent stops and reports instead of continuing when:

- a change is needed outside **Allowed paths**
- an acceptance criterion conflicts with the parent plan
- verification fails twice for the same cause
- a dependency task has not merged yet
- the budget below is exhausted

## Budget

| Limit | Value |
|-------|-------|
| Wall clock | {e.g. 45 min} |
| Agent turns / tool calls | {e.g. 60} |
| Spend | {e.g. $5} |

## Handoff

On completion the agent writes `reviews/{TASK_ID}-code-review.md` (self-review + evidence) and stops. A human opens the PR, reviews, and merges in dependency order.
