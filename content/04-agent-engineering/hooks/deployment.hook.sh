#!/bin/sh
set -eu
hook="deployment"
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
manifest="${OAIES_RELEASE_MANIFEST:-}"
approval="${OAIES_APPROVAL_FILE:-}"
evidence="${OAIES_RELEASE_EVIDENCE:-}"
require_file "$manifest" "OAIES_RELEASE_MANIFEST"
require_file "$approval" "OAIES_APPROVAL_FILE"
require_file "$evidence" "OAIES_RELEASE_EVIDENCE"
grep -q '^artifact_digest=' "$manifest" || fail_data "manifest has no artifact_digest"
grep -q '^environment=' "$manifest" || fail_data "manifest has no environment"
grep -q '^effect=deployment$' "$approval" || fail_gate "approval does not authorize deployment"
grep -q '^status=passed$' "$evidence" || fail_gate "release evidence is not passed"
if [ "$dry_run" -eq 1 ]; then
  printf '%s\n' "$hook: dry-run validation passed"
else
  printf '%s\n' "$hook: gate passed"
fi
exit 0
