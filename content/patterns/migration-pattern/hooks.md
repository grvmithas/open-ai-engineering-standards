# Migration Pattern — Hooks

> **Pattern:** Migration  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-migration.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking migration prerequisites..."

if [[ -z "${PLAN_DRAFT:-}" || ! -f "$PLAN_DRAFT" ]]; then
  echo "ERROR: PLAN_DRAFT missing. Start from migration prompt output path."
  exit 1
fi

if [[ -z "${CONSUMER_FILE:-}" || ! -f "$CONSUMER_FILE" ]]; then
  echo "ERROR: CONSUMER_FILE missing. Inventory consumers before migration design."
  exit 1
fi

if ! grep -qiE 'owner|service|consumer' "$CONSUMER_FILE"; then
  echo "ERROR: CONSUMER_FILE does not look like an inventory."
  exit 1
fi

ROW_COUNT=$(grep -cE '^\|' "$CONSUMER_FILE" || true)
if (( ROW_COUNT < 2 )); then
  echo "ERROR: Consumer inventory appears empty."
  exit 1
fi

echo "Prerequisites satisfied."
```

## `post-migration-plan.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

PLAN="${1:-}"
if [[ -z "$PLAN" || ! -f "$PLAN" ]]; then
  echo "ERROR: Usage: post-migration-plan.hook.sh <migration-plan-file>"
  exit 1
fi

echo "Validating migration plan..."

for section in "Expand" "Cutover" "Contract" "Rollback" "Reconciliation"; do
  if ! grep -qi "$section" "$PLAN"; then
    echo "ERROR: Plan missing required section/keyword: $section"
    exit 1
  fi
done

if ! grep -qiE 'point of no return|PONR' "$PLAN"; then
  echo "ERROR: Plan must name the point of no return."
  exit 1
fi

if grep -qiE 'drop column|DROP TABLE' "$PLAN" && ! grep -qi 'Contract' "$PLAN"; then
  echo "ERROR: Destructive DDL referenced without Contract phase context."
  exit 1
fi

echo "Migration plan structure validated."
```

## `pre-contract.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

# Block contract phase unless soak evidence file exists
if [[ -z "${SOAK_EVIDENCE:-}" || ! -f "$SOAK_EVIDENCE" ]]; then
  echo "ERROR: SOAK_EVIDENCE file required before contract (metrics + duration)."
  exit 1
fi

if ! grep -qiE 'error|latency|mismatch|soak|duration' "$SOAK_EVIDENCE"; then
  echo "ERROR: Soak evidence lacks metrics/duration content."
  exit 1
fi

echo "Soak evidence present. Contract phase may proceed pending human approval."
```
