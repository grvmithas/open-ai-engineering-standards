# Release Pattern — Hooks

> **Pattern:** Release  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-release.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking release prerequisites..."

: "${RELEASE_PACKAGE:?ERROR: set RELEASE_PACKAGE}"
: "${ARTIFACT_DIGEST:?ERROR: set ARTIFACT_DIGEST}"
: "${FEATURE_FLAG:?ERROR: set FEATURE_FLAG (or 'traffic-split' with SPLIT_CONFIG)}"

if [[ ! -f "$RELEASE_PACKAGE" ]]; then
  echo "ERROR: RELEASE_PACKAGE not found: $RELEASE_PACKAGE"
  exit 1
fi

if [[ ! "$ARTIFACT_DIGEST" =~ ^sha256:[a-f0-9]{64}$ ]]; then
  echo "ERROR: ARTIFACT_DIGEST must be sha256:<64 hex> (mutable tags rejected)."
  exit 1
fi

if ! grep -q "$ARTIFACT_DIGEST" "$RELEASE_PACKAGE"; then
  echo "ERROR: Package does not reference ARTIFACT_DIGEST."
  exit 1
fi

if ! grep -qiE 'abort criteria' "$RELEASE_PACKAGE"; then
  echo "ERROR: Abort criteria section missing."
  exit 1
fi

if ! grep -qiE 'rollback' "$RELEASE_PACKAGE"; then
  echo "ERROR: Rollback section missing."
  exit 1
fi

# crude check that abort section contains a number
if ! awk 'BEGIN{IGNORECASE=1} /abort criteria/{f=1} f && /[0-9]/ {found=1} END{exit !found}' "$RELEASE_PACKAGE"; then
  echo "ERROR: Abort criteria appear non-quantitative (no numbers found)."
  exit 1
fi

if [[ "$FEATURE_FLAG" == "none" ]]; then
  echo "ERROR: FEATURE_FLAG=none is not allowed for this pattern without SPLIT_CONFIG."
  exit 1
fi

echo "Release prerequisites OK for $ARTIFACT_DIGEST."
```

## `post-canary-stage.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

STAGE_LOG="${1:-}"
if [[ -z "$STAGE_LOG" || ! -f "$STAGE_LOG" ]]; then
  echo "ERROR: Usage: post-canary-stage.hook.sh <stage-log>"
  exit 1
fi

echo "Validating canary stage log..."

if ! grep -qiE 'stage|exposure|hold' "$STAGE_LOG"; then
  echo "ERROR: Stage log missing stage/exposure/hold markers."
  exit 1
fi

if grep -qiE 'raised threshold|increased abort|relaxed abort' "$STAGE_LOG"; then
  echo "ERROR: Abort criteria renegotiation detected in stage log."
  exit 1
fi

if grep -qiE 'ABORT|aborted' "$STAGE_LOG"; then
  if ! grep -qiE 'flag.*(off|disabled)|redeploy|rollback' "$STAGE_LOG"; then
    echo "ERROR: Abort recorded without rollback/flag-disable action."
    exit 1
  fi
fi

echo "Stage log validated."
```

## CI integration note

Promotion jobs must require `ARTIFACT_DIGEST` and a package path. Block any deploy job whose image reference is only a floating tag.
