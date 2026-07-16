# Hotfix Pattern — Hooks

> **Pattern:** Hotfix  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-hotfix.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking hotfix lane prerequisites..."

: "${INCIDENT_FILE:?ERROR: set INCIDENT_FILE to the action package or incident doc}"
: "${IC_NAME:?ERROR: set IC_NAME}"
: "${SEVERITY:?ERROR: set SEVERITY (SEV1|SEV2|SEV3|SEV4)}"

if [[ ! -f "$INCIDENT_FILE" ]]; then
  echo "ERROR: INCIDENT_FILE not found: $INCIDENT_FILE"
  exit 1
fi

if ! grep -q "$IC_NAME" "$INCIDENT_FILE"; then
  echo "ERROR: IC_NAME not recorded in incident file."
  exit 1
fi

if ! grep -qiE "SEV|severity" "$INCIDENT_FILE"; then
  echo "ERROR: Severity not recorded."
  exit 1
fi

if ! grep -qiE 'contain|flag|rollback|LKG|last known' "$INCIDENT_FILE"; then
  echo "ERROR: No containment action documented — contain before code hotfix."
  exit 1
fi

echo "Hotfix prerequisites OK (IC=$IC_NAME $SEVERITY)."
```

## `post-hotfix-diff.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

ALLOWED_LIST="${1:-}"
DIFF_STAT="${2:-}"

if [[ -z "$ALLOWED_LIST" || ! -f "$ALLOWED_LIST" || -z "$DIFF_STAT" || ! -f "$DIFF_STAT" ]]; then
  echo "ERROR: Usage: post-hotfix-diff.hook.sh <allowed-paths.txt> <git-diff-name-only.txt>"
  exit 1
fi

echo "Validating hotfix diff scope..."

while IFS= read -r path; do
  [[ -z "$path" || "$path" =~ ^# ]] && continue
  if ! grep -Fxq "$path" "$ALLOWED_LIST"; then
    echo "ERROR: Path not on allowed list: $path"
    exit 1
  fi
done < "$DIFF_STAT"

# Block obvious drive-bys
if grep -qiE 'package-lock|pnpm-lock|yarn.lock|go.sum|Cargo.lock' "$DIFF_STAT"; then
  echo "ERROR: Lockfile changes are not allowed on the hotfix lane."
  exit 1
fi

echo "Diff scope OK."
```

## CI integration note

Emergency pipelines must require `INCIDENT_ID`, `IC_NAME`, and an allowed-path list artifact. Reject PRs titled “hotfix” that lack an incident ID.
