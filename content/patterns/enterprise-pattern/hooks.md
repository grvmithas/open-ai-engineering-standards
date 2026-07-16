# Enterprise Pattern — Hooks

> **Pattern:** Enterprise  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-enterprise-golive.hook.sh`

Runs before pilot enablement. Verifies inventory, tier, bundle, and kill-switch evidence.

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking enterprise go-live prerequisites..."

: "${PACKAGE_FILE:?ERROR: set PACKAGE_FILE to the go-live package markdown}"
: "${INVENTORY_ID:?ERROR: set INVENTORY_ID}"
: "${KILL_SWITCH_DRILL_LOG:?ERROR: set KILL_SWITCH_DRILL_LOG}"

if [[ ! -f "$PACKAGE_FILE" ]]; then
  echo "ERROR: PACKAGE_FILE not found: $PACKAGE_FILE"
  exit 1
fi

if ! grep -q "$INVENTORY_ID" "$PACKAGE_FILE"; then
  echo "ERROR: Package does not reference INVENTORY_ID=$INVENTORY_ID"
  exit 1
fi

if ! grep -qiE 'risk[[:space:]]*tier|RISK_TIER' "$PACKAGE_FILE"; then
  echo "ERROR: Risk tier missing from package."
  exit 1
fi

if ! grep -qiE 'control map|enforcement' "$PACKAGE_FILE"; then
  echo "ERROR: Control map / enforcement section missing."
  exit 1
fi

if ! grep -qiE 'kill.?switch|disable procedure' "$PACKAGE_FILE"; then
  echo "ERROR: Kill-switch / disable procedure missing."
  exit 1
fi

# Reject certification-substitution language as sole evidence
if grep -qiE 'certified (compliant|under)|iso[[:space:]]*42001 certified|eu ai act certified' "$PACKAGE_FILE"; then
  echo "ERROR: Certification claims are not acceptable as control evidence in this package."
  exit 1
fi

if [[ ! -f "$KILL_SWITCH_DRILL_LOG" ]]; then
  echo "ERROR: Kill-switch drill log missing: $KILL_SWITCH_DRILL_LOG"
  exit 1
fi

if ! grep -qiE 'disabled|deny|blocked|kill' "$KILL_SWITCH_DRILL_LOG"; then
  echo "ERROR: Drill log does not show a successful disable action."
  exit 1
fi

echo "Prerequisites satisfied for go-live review."
```

## `post-enterprise-bind.hook.sh`

Runs after gateway bind. Verifies policy version appears in the package and bind receipt.

```bash
#!/usr/bin/env bash
set -euo pipefail

PACKAGE_FILE="${1:-}"
BIND_RECEIPT="${2:-}"

if [[ -z "$PACKAGE_FILE" || ! -f "$PACKAGE_FILE" || -z "$BIND_RECEIPT" || ! -f "$BIND_RECEIPT" ]]; then
  echo "ERROR: Usage: post-enterprise-bind.hook.sh <package> <bind-receipt>"
  exit 1
fi

echo "Validating gateway bind..."

BUNDLE_VER=$(grep -iE 'policy bundle version' "$PACKAGE_FILE" | head -n1 | sed 's/.*://;s/[[:space:]]*//g' || true)
if [[ -z "$BUNDLE_VER" ]]; then
  echo "ERROR: Could not parse policy bundle version from package."
  exit 1
fi

if ! grep -q "$BUNDLE_VER" "$BIND_RECEIPT"; then
  echo "ERROR: Bind receipt does not contain bundle version $BUNDLE_VER"
  exit 1
fi

if ! grep -qiE 'Human Approval|Risk approver' "$PACKAGE_FILE"; then
  echo "ERROR: Package missing human approval footer."
  exit 1
fi

echo "Bind validated for version $BUNDLE_VER."
```

## CI integration note

Block deploy pipelines that enable AI routes without `INVENTORY_ID` and a matching gateway policy version. Treat missing kill-switch drill as a failed gate for high tier.
