# Reviewer Pattern — Hooks

> **Pattern:** Reviewer  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-review.hook.sh`

Runs before the reviewer activates. Verifies diff and acceptance criteria exist.

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking review prerequisites..."

if [[ -z "${DIFF_FILE:-}" || ! -f "$DIFF_FILE" ]]; then
  echo "ERROR: DIFF_FILE missing. Export a patch (e.g. git diff base...HEAD > /tmp/pr.diff)."
  exit 1
fi

DIFF_SIZE=$(wc -c < "$DIFF_FILE" | tr -d ' ')
if (( DIFF_SIZE < 20 )); then
  echo "ERROR: Diff is empty or trivially small. Nothing to review."
  exit 1
fi

if [[ -z "${AC_FILE:-}" || ! -f "$AC_FILE" ]]; then
  echo "ERROR: AC_FILE missing. Provide acceptance criteria before review."
  exit 1
fi

if ! grep -qiE 'acceptance|criteria|AC-|must |should ' "$AC_FILE"; then
  echo "ERROR: AC_FILE does not look like acceptance criteria."
  exit 1
fi

if [[ -n "${RISK_FILE:-}" && -f "$RISK_FILE" ]]; then
  if ! grep -qiE 'pii|payment|sensitivity|deployment|public|internal' "$RISK_FILE"; then
    echo "WARNING: RISK_FILE present but missing sensitivity/deployment fields."
  fi
else
  echo "WARNING: RISK_FILE unset — defaulting to elevated caution for security pass."
fi

echo "Prerequisites satisfied. Review can begin."
```

## `post-review.hook.sh`

Runs after the review report is written. Verifies verdict and findings structure.

```bash
#!/usr/bin/env bash
set -euo pipefail

REPORT="${1:-}"
if [[ -z "$REPORT" || ! -f "$REPORT" ]]; then
  echo "ERROR: Usage: post-review.hook.sh <review-report-file>"
  exit 1
fi

echo "Validating review report structure..."

if ! grep -qiE 'Verdict:.*(Approve|Request changes|Block)' "$REPORT"; then
  echo "ERROR: Report missing a valid Verdict line."
  exit 1
fi

REQUIRED=("Critical" "Summary" "AC")
for section in "${REQUIRED[@]}"; do
  if ! grep -qi "$section" "$REPORT"; then
    echo "ERROR: Report missing required section/keyword: $section"
    exit 1
  fi
done

# If verdict is Approve, Critical section must not list open blockers with REV- IDs
if grep -qiE 'Verdict:.*Approve' "$REPORT" && ! grep -qiE 'Verdict:.*Approve with' "$REPORT"; then
  if grep -qiE '^\| *REV-[0-9]+' "$REPORT" | head -1 | grep -qi Critical; then
    echo "WARNING: Approve with REV-* rows present — confirm Critical table is empty."
  fi
fi

if grep -qiE 'Verdict:.*Approve' "$REPORT" && grep -qiE 'CRITICAL|must fix before merge' "$REPORT"; then
  # Soft check: open Critical tables often still have header-only rows
  if grep -E '\| *REV-[0-9]+' "$REPORT" | grep -qi 'block\|critical'; then
    echo "ERROR: Approve verdict with open Critical findings."
    exit 1
  fi
fi

echo "Review report structure validated."
```

## CI integration note

Call `pre-review` from the agent harness before review; call `post-review` as a PR check on the uploaded report artifact. Green unit tests do not replace this structure gate.
