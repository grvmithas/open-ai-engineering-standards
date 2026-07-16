# Context Pattern — Hooks

> **Pattern:** Context  
> **Component:** hooks.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## `pre-context.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Checking context-assembly prerequisites..."

if [[ -z "${TASK_FILE:-}" || ! -f "$TASK_FILE" ]]; then
  echo "ERROR: TASK_FILE missing. Write task intent before assembling context."
  exit 1
fi

if [[ -z "${MAX_BYTES:-}" ]]; then
  echo "ERROR: MAX_BYTES unset. Set a hard budget (e.g. export MAX_BYTES=80000)."
  exit 1
fi

if ! [[ "$MAX_BYTES" =~ ^[0-9]+$ ]] || (( MAX_BYTES < 1000 )); then
  echo "ERROR: MAX_BYTES must be an integer >= 1000."
  exit 1
fi

if [[ -z "${OUT_FILE:-}" ]]; then
  echo "ERROR: OUT_FILE unset. Specify where the package will be written."
  exit 1
fi

echo "Prerequisites satisfied. Context assembly can begin."
```

## `post-context.hook.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

PACKAGE="${1:-${OUT_FILE:-}}"
if [[ -z "$PACKAGE" || ! -f "$PACKAGE" ]]; then
  echo "ERROR: Usage: post-context.hook.sh <context-package-file>"
  exit 1
fi

echo "Validating context package..."

SIZE=$(wc -c < "$PACKAGE" | tr -d ' ')
if [[ -n "${MAX_BYTES:-}" ]] && (( SIZE > MAX_BYTES )); then
  echo "ERROR: Package size $SIZE exceeds MAX_BYTES=$MAX_BYTES."
  exit 1
fi

if ! grep -qiE 'Manifest|Why included|^\|.*\|.*\|' "$PACKAGE"; then
  echo "ERROR: Package missing Manifest / why-included table."
  exit 1
fi

if ! grep -qiE 'Exclusions|Deliberate exclusions' "$PACKAGE"; then
  echo "ERROR: Package missing deliberate exclusions section."
  exit 1
fi

# Secret / credential heuristics
if grep -qE 'BEGIN (RSA |OPENSSH )?PRIVATE KEY|AKIA[0-9A-Z]{16}|api[_-]?key\s*[:=]\s*['\''\"]?[A-Za-z0-9]{20,}' "$PACKAGE"; then
  echo "ERROR: Possible secret material detected in context package."
  exit 1
fi

if grep -qiE '(^|/)\.env(\.|$)|password\s*=\s*[^$]' "$PACKAGE"; then
  echo "ERROR: .env or password assignment patterns detected."
  exit 1
fi

echo "Context package validated. Ready for handoff."
```

## CI integration note

Fail the job if `post-context.hook.sh` exits non-zero. Do not upload packages that fail secret greps to shared logs.
