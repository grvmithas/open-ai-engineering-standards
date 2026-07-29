# AIES agent hooks (evidence gates)

> Installed by `create-aies-kit`. These are **deterministic evidence gates**, not task runners.

## Purpose

Block plan→code→commit→review→deploy progression unless declared evidence exists. Humans/orchestrators still run lint, tests, and deploys — hooks only validate that evidence was recorded.

## Layout

| Path | Role |
|------|------|
| `hooks/*.hook.sh` | POSIX gates (pre-planning, pre-code, pre-review, pre-commit, …) |
| `hooks/README.md` | This file |
| `aies-hooks.json` or `.cursor/aies-hooks.json` | Machine-readable hook registry for agents/IDEs |

## Typical AI development loop

```text
story → plans/{STORY_ID}-plan.md (approve)
     → pre-planning / pre-code hooks
     → coding prompt + plan attached
     → verify (lint/typecheck/test — repo commands)
     → reviews/{STORY_ID}-code-review.md
     → pre-review / pre-commit hooks
     → PR + attach plan + review
```

## Example (dry-run)

```sh
# After you have a plan file and approval record:
printf '%s\n' 'effect=workspace-write' 'target=plans/JIRA-1-plan.md' > /tmp/approval.evidence
OAIES_PLAN_FILE=plans/JIRA-1-plan.md OAIES_APPROVAL_FILE=/tmp/approval.evidence \
  sh hooks/pre-code.hook.sh --dry-run
```

## Wire to this repo

After `enhance-repo`, document the **exact** lint/test commands in `AIES.md` and paste them into evidence producers. Do not invent commands.

## Anti-patterns

- Bypassing a failed hook with `--force` folklore
- Treating `status=passed` text as cryptographic attestation
- Putting hooks under `.github/` as if they were GitHub Actions (they are not)

Full contract: see AIES handbook *Hooks in practice* / upstream `04-agent-engineering/hooks`.
