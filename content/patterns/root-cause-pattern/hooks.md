# Root Cause Pattern — Hooks

> **Pattern:** Root Cause  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-rca.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking RCA prerequisites..."

: "${INCIDENT_ID:?ERROR: set INCIDENT_ID}"
: "${TIMELINE_FILE:?ERROR: set TIMELINE_FILE}"
: "${STATUS:?ERROR: set STATUS to mitigated|monitoring}"

if [[ "$STATUS" != "mitigated" && "$STATUS" != "monitoring" ]]; then
  echo "ERROR: RCA starts after containment (STATUS=mitigated|monitoring). Got: $STATUS"
  exit 1
fi

if [[ ! -f "$TIMELINE_FILE" ]]; then
  echo "ERROR: TIMELINE_FILE not found: $TIMELINE_FILE"
  exit 1
fi

if ! grep -qiE '[0-9]{2}:[0-9]{2}|UTC|Z' "$TIMELINE_FILE"; then
  echo "ERROR: Timeline appears to lack timestamps."
  exit 1
fi

echo "RCA prerequisites OK for $INCIDENT_ID."
```

## `post-rca.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

RCA_FILE="${1:-}"
if [[ -z "$RCA_FILE" || ! -f "$RCA_FILE" ]]; then
  echo "ERROR: Usage: post-rca.hook.sh <rca-file>"
  exit 1
fi

echo "Validating RCA structure..."

REQUIRED_SECTIONS=(
  "Incident Summary"
  "Timeline"
  "Root Cause"
  "5 Whys"
  "Detection Gap"
  "Remediation"
  "Prevention Summary"
)

for section in "${REQUIRED_SECTIONS[@]}"; do
  if ! grep -qi "$section" "$RCA_FILE"; then
    echo "ERROR: RCA missing required section: $section"
    exit 1
  fi
done

# Count "Root cause" sentences — soft check for multiple root headings
ROOT_HITS=$(grep -ciE '^\*\*Root cause|## Root Cause' "$RCA_FILE" || true)
if (( ROOT_HITS < 1 )); then
  echo "ERROR: Root cause statement missing."
  exit 1
fi

if grep -qiE 'improve monitoring|better documentation|be more careful' "$RCA_FILE"; then
  if ! grep -qiE 'alert|threshold|runbook for|Owner:' "$RCA_FILE"; then
    echo "ERROR: Vague prevention language without specifics/owners."
    exit 1
  fi
fi

# Open actions should show Owner and Due nearby — heuristic
if grep -qiE 'Short-Term Actions|Long-Term Actions' "$RCA_FILE"; then
  if ! grep -qiE 'Owner:' "$RCA_FILE"; then
    echo "ERROR: Remediation actions missing Owner fields."
    exit 1
  fi
  if ! grep -qiE 'Due:' "$RCA_FILE"; then
    echo "ERROR: Remediation actions missing Due fields."
    exit 1
  fi
fi

# Blame heuristic — not perfect, blocks common anti-patterns
if grep -qiE 'human error by|negligen|careless(ness)? of' "$RCA_FILE"; then
  echo "ERROR: Blame-oriented language detected; rewrite systemically."
  exit 1
fi

echo "RCA structure validated."
```

## CI integration note

Track RCA FINAL links from the incident ticket. Fail a “incident closed” automation if `post-rca.hook.sh` has not passed for SEV1/SEV2.
