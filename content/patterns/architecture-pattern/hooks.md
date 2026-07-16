# Architecture Pattern — Hooks

> **Pattern:** Architecture  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-architecture.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking architecture prerequisites..."

if [[ -z "${DRIVERS_FILE:-}" || ! -f "$DRIVERS_FILE" ]]; then
  echo "ERROR: DRIVERS_FILE missing. Write problem/forces before architecture work."
  exit 1
fi

if ! grep -qiE 'driver|force|constraint|quality|scenario|non-?goal' "$DRIVERS_FILE"; then
  echo "ERROR: DRIVERS_FILE lacks drivers/constraints/QA language."
  exit 1
fi

if [[ -z "${RISK_LEVEL:-}" ]]; then
  echo "ERROR: RISK_LEVEL unset (Low|Medium|High)."
  exit 1
fi

if [[ "$RISK_LEVEL" == "High" && -z "${REVIEWER_ID:-}" ]]; then
  echo "ERROR: High risk requires REVIEWER_ID (independent of author)."
  exit 1
fi

echo "Prerequisites satisfied."
```

## `post-architecture.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

ADR="${1:-}"
if [[ -z "$ADR" || ! -f "$ADR" ]]; then
  echo "ERROR: Usage: post-architecture.hook.sh <adr-file>"
  exit 1
fi

echo "Validating ADR structure..."

for key in "Context" "Decision" "Consequences" "Alternatives"; do
  if ! grep -qi "$key" "$ADR"; then
    echo "ERROR: ADR missing required section: $key"
    exit 1
  fi
done

if ! grep -qi "mermaid" "$ADR"; then
  echo "ERROR: ADR must include a Mermaid diagram."
  exit 1
fi

ALT_ROWS=$(grep -cE '^\|.*\|.*\|' "$ADR" || true)
if (( ALT_ROWS < 3 )); then
  echo "WARNING: Alternatives table may be too thin (want header + ≥2 options)."
fi

if ! grep -qiE 'failure|trust|tenancy|degraded' "$ADR"; then
  echo "ERROR: ADR missing trust/failure analysis language."
  exit 1
fi

echo "ADR structure validated. Ready for review."
```
