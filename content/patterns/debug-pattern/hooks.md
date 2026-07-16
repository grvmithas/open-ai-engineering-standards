# Debug Pattern — Hooks

> **Pattern:** Debug  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-debug.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking debug prerequisites..."

if [[ -z "${SYMPTOM_FILE:-}" || ! -f "$SYMPTOM_FILE" ]]; then
  echo "ERROR: SYMPTOM_FILE missing. Capture expected/actual before debugging."
  exit 1
fi

if ! grep -qiE 'expected|actual|error|fail' "$SYMPTOM_FILE"; then
  echo "ERROR: SYMPTOM_FILE must describe expected/actual or error text."
  exit 1
fi

if [[ -z "${ENV_NAME:-}" ]]; then
  echo "ERROR: ENV_NAME unset (dev|staging|prod|test)."
  exit 1
fi

echo "Prerequisites satisfied. Debugging can begin."
```

## `post-debug.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

REPORT="${1:-}"
if [[ -z "$REPORT" || ! -f "$REPORT" ]]; then
  echo "ERROR: Usage: post-debug.hook.sh <debug-report-file>"
  exit 1
fi

echo "Validating debug report..."

for key in "Root cause" "Hypothesis" "Fix" "Regression"; do
  if ! grep -qi "$key" "$REPORT"; then
    echo "ERROR: Report missing required section/keyword: $key"
    exit 1
  fi
done

# Require at least 3 hypothesis rows (markdown table heuristics)
HCOUNT=$(grep -cE '^\| *[0-9]+ *\|' "$REPORT" || true)
if (( HCOUNT < 3 )); then
  echo "ERROR: Need at least 3 numbered hypothesis rows in the report table."
  exit 1
fi

if ! grep -qiE 'regression test|test that fails|fails before' "$REPORT"; then
  echo "ERROR: Report must reference a regression test."
  exit 1
fi

echo "Debug report validated."
```

## CI integration note

For fix PRs tagged `bug`, require `post-debug.hook.sh` on the attached report path, or embed the same sections in the PR body and grep that file.
