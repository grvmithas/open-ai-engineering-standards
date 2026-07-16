# Legacy Modernization Pattern — Hooks

> **Pattern:** Legacy Modernization  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-modernization.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking modernization slice prerequisites..."

if [[ -z "${SLICE_FILE:-}" || ! -f "$SLICE_FILE" ]]; then
  echo "ERROR: SLICE_FILE missing. Define a capability slice first."
  exit 1
fi

if ! grep -qiE 'in scope|out of scope|capability' "$SLICE_FILE"; then
  echo "ERROR: SLICE_FILE must declare in/out of scope for a capability."
  exit 1
fi

if grep -qiE 'entire monolith|whole system|big.?bang|rewrite everything' "$SLICE_FILE"; then
  echo "ERROR: Slice looks unbounded / big-bang. Narrow to one capability."
  exit 1
fi

echo "Slice prerequisites OK."
```

## `post-modernization-plan.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

PLAN="${1:-}"
if [[ -z "$PLAN" || ! -f "$PLAN" ]]; then
  echo "ERROR: Usage: post-modernization-plan.hook.sh <slice-plan-file>"
  exit 1
fi

for key in "Seam" "Parity" "Traffic" "Retirement"; do
  if ! grep -qi "$key" "$PLAN"; then
    echo "ERROR: Plan missing required section/keyword: $key"
    exit 1
  fi
done

if grep -qiE 'cut over 100%|big.?bang|single weekend' "$PLAN" \
  && ! grep -qiE '1%|10%|shadow|canary' "$PLAN"; then
  echo "ERROR: 100% cutover without incremental/shadow steps."
  exit 1
fi

echo "Modernization slice plan validated."
```

## `pre-retire-legacy.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${TRAFFIC_EVIDENCE:-}" || ! -f "$TRAFFIC_EVIDENCE" ]]; then
  echo "ERROR: TRAFFIC_EVIDENCE required (proof of 100% on new path)."
  exit 1
fi

if ! grep -qiE '100%|fully shifted|no legacy traffic' "$TRAFFIC_EVIDENCE"; then
  echo "ERROR: Evidence does not show full traffic shift."
  exit 1
fi

echo "Traffic evidence present. Retirement may proceed with human approval."
```
