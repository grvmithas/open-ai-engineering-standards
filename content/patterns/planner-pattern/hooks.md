# Planner Pattern — Hooks

> **Pattern:** Planner  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-planning.hook.sh`

Runs before the planner activates. Verifies story and context exist.

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking planning prerequisites..."

if [[ -z "${STORY_FILE:-}" || ! -f "$STORY_FILE" ]]; then
  echo "ERROR: Story file not found. Run story-kickoff first and set STORY_FILE."
  exit 1
fi

if ! grep -qiE 'acceptance|criteria|AC-' "$STORY_FILE"; then
  echo "ERROR: Story appears to lack acceptance criteria."
  exit 1
fi

if [[ -z "${CONTEXT_FILE:-}" || ! -f "$CONTEXT_FILE" ]]; then
  echo "ERROR: CONTEXT_FILE missing. Assemble context before planning."
  exit 1
fi

CONTEXT_SIZE=$(wc -c < "$CONTEXT_FILE" | tr -d ' ')
if (( CONTEXT_SIZE < 500 )); then
  echo "WARNING: Context seems thin (<500 bytes). Proceed only if intentionally small."
fi

echo "Prerequisites satisfied. Planning can begin."
```

## `post-planning.hook.sh`

Runs after plan generation. Verifies required sections before human review.

```bash
#!/usr/bin/env bash
set -euo pipefail

PLAN_FILE="${1:-}"
if [[ -z "$PLAN_FILE" || ! -f "$PLAN_FILE" ]]; then
  echo "ERROR: Usage: post-planning.hook.sh <plan-file>"
  exit 1
fi

echo "Validating plan structure..."

REQUIRED_SECTIONS=(
  "Architecture Diagram"
  "Implementation Sequence"
  "Rollback"
  "Test Plan"
)

for section in "${REQUIRED_SECTIONS[@]}"; do
  if ! grep -qi "$section" "$PLAN_FILE"; then
    echo "ERROR: Plan missing required section: $section"
    exit 1
  fi
done

if ! grep -qi "mermaid" "$PLAN_FILE"; then
  echo "ERROR: Plan must include a Mermaid architecture diagram."
  exit 1
fi

if ! grep -qi "Human Approval" "$PLAN_FILE"; then
  echo "ERROR: Plan missing Human Approval footer."
  exit 1
fi

echo "Plan structure validated. Ready for human review."
```

## CI integration note

Wire these hooks into the agent harness or a make target (`make plan-check PLAN=...`). Do not treat a green unit test suite as a substitute for plan structure validation.
