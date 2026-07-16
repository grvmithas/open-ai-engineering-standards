#!/bin/sh
set -eu
hook="budget-guard"
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
remaining="${OAIES_BUDGET_REMAINING:-}"
profile="${OAIES_BUDGET_PROFILE:-}"
[ -n "$profile" ] || fail_usage "OAIES_BUDGET_PROFILE is required"
case "$remaining" in ""|*[!0-9]*) fail_data "OAIES_BUDGET_REMAINING must be a non-negative integer" ;; esac
[ "$remaining" -gt 0 ] || fail_gate "budget profile $profile is exhausted"
if [ "$dry_run" -eq 1 ]; then
  printf '%s\n' "$hook: dry-run validation passed"
else
  printf '%s\n' "$hook: gate passed"
fi
exit 0
