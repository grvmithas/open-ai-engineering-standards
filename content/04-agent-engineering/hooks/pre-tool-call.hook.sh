#!/bin/sh
set -eu
hook="pre-tool-call"
dry_run=0
case "${1:-}" in
  "") ;;
  --dry-run) dry_run=1 ;;
  *) printf '%s\n' "$hook: usage: $0 [--dry-run]" >&2; exit 64 ;;
esac
fail_usage() { printf '%s\n' "$hook: $*" >&2; exit 64; }
fail_data() { printf '%s\n' "$hook: $*" >&2; exit 65; }
fail_gate() { printf '%s\n' "$hook: $*" >&2; exit 70; }
require_file() {
  [ -n "$1" ] || fail_usage "$2 is required"
  [ -f "$1" ] && [ -r "$1" ] || fail_data "$2 is not a readable regular file"
  [ -s "$1" ] || fail_data "$2 is empty"
}
effect="${OAIES_TOOL_EFFECT:-}"
[ -n "$effect" ] || fail_usage "OAIES_TOOL_EFFECT is required"
case "$effect" in
  read|search|verify|workspace-write) ;;
  production-mutation|deployment|deletion|irreversible-migration|external-message|permission-change|new-spend)
    approval="${OAIES_APPROVAL_FILE:-}"
    require_file "$approval" "OAIES_APPROVAL_FILE"
    grep -q "^effect=$effect$" "$approval" || fail_gate "approval does not match effect=$effect"
    grep -q '^target=' "$approval" || fail_data "approval has no target"
    ;;
  *) fail_data "unknown effect classification: $effect" ;;
esac
if [ "$dry_run" -eq 1 ]; then
  printf '%s\n' "$hook: dry-run validation passed"
else
  printf '%s\n' "$hook: gate passed"
fi
exit 0
