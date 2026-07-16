#!/bin/sh
set -eu
hook="pre-delegation"
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
delegation="${OAIES_DELEGATION_FILE:-}"
require_file "$delegation" "OAIES_DELEGATION_FILE"
grep -q '^principal=' "$delegation" || fail_data "delegation has no principal"
grep -q '^scope=' "$delegation" || fail_data "delegation has no scope"
grep -q '^budget_profile=' "$delegation" || fail_data "delegation has no budget_profile"
depth=$(grep '^remaining_depth=' "$delegation" | sed 's/^remaining_depth=//' | sed -n '1p')
case "$depth" in ""|*[!0-9]*) fail_data "remaining_depth must be a non-negative integer" ;; esac
[ "$depth" -gt 0 ] || fail_gate "delegation depth exhausted"
if [ "$dry_run" -eq 1 ]; then
  printf '%s\n' "$hook: dry-run validation passed"
else
  printf '%s\n' "$hook: gate passed"
fi
exit 0
