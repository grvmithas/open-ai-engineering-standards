# Optimization Pattern — Hooks

> **Pattern:** Optimization  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-optimize.hook.sh`

Runs before hypothesis implementation. Verifies metric, baseline, oracle, and flag.

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking optimization prerequisites..."

: "${OPT_SPEC_FILE:?ERROR: set OPT_SPEC_FILE to the optimization spec markdown}"
: "${BASELINE_FILE:?ERROR: set BASELINE_FILE to the baseline report}"
: "${FEATURE_FLAG:?ERROR: set FEATURE_FLAG to the kill-switch flag name}"

if [[ ! -f "$OPT_SPEC_FILE" ]]; then
  echo "ERROR: OPT_SPEC_FILE not found: $OPT_SPEC_FILE"
  exit 1
fi

if ! grep -qiE 'min(imum)?[[:space:]]*(useful[[:space:]]*)?effect|MIN_EFFECT' "$OPT_SPEC_FILE"; then
  echo "ERROR: Spec missing minimum useful effect size."
  exit 1
fi

if ! grep -qiE 'abort|guardrail' "$OPT_SPEC_FILE"; then
  echo "ERROR: Spec missing abort criteria / guardrails."
  exit 1
fi

if [[ ! -f "$BASELINE_FILE" ]]; then
  echo "ERROR: Baseline report missing: $BASELINE_FILE"
  exit 1
fi

if ! grep -qiE 'p99|p95|percentile' "$BASELINE_FILE"; then
  echo "ERROR: Baseline must include percentile metrics."
  exit 1
fi

if ! grep -qiE 'oracle|golden|correctness' "$OPT_SPEC_FILE"; then
  echo "ERROR: Spec must define a correctness oracle."
  exit 1
fi

if [[ -z "$FEATURE_FLAG" || "$FEATURE_FLAG" == "none" ]]; then
  echo "ERROR: FEATURE_FLAG must be a real kill-switch name."
  exit 1
fi

echo "Prerequisites satisfied. Optimization work may begin (behind $FEATURE_FLAG)."
```

## `post-optimize.hook.sh`

Runs after the optimization report is generated. Verifies report structure before human decision.

```bash
#!/usr/bin/env bash
set -euo pipefail

REPORT_FILE="${1:-}"
if [[ -z "$REPORT_FILE" || ! -f "$REPORT_FILE" ]]; then
  echo "ERROR: Usage: post-optimize.hook.sh <optimization-report>"
  exit 1
fi

echo "Validating optimization report..."

REQUIRED_SECTIONS=(
  "Hypothesis"
  "Baseline vs Candidate"
  "Oracle"
  "Canary Plan"
  "Recommendation"
)

for section in "${REQUIRED_SECTIONS[@]}"; do
  if ! grep -qi "$section" "$REPORT_FILE"; then
    echo "ERROR: Report missing required section: $section"
    exit 1
  fi
done

if ! grep -qiE 'KEEP|KILL|REVISE' "$REPORT_FILE"; then
  echo "ERROR: Report must recommend KEEP, KILL, or REVISE."
  exit 1
fi

if ! grep -qiE 'p99' "$REPORT_FILE"; then
  echo "ERROR: Report must include p99 comparison."
  exit 1
fi

if ! grep -qi "Human Decision" "$REPORT_FILE"; then
  echo "ERROR: Report missing Human Decision footer."
  exit 1
fi

echo "Report structure validated. Ready for human KEEP/KILL/REVISE."
```

## CI integration note

Wire into the harness or `make optimize-check SPEC=... BASELINE=... REPORT=...`. A green unit-test job is not a substitute for baseline/oracle/flag checks.
