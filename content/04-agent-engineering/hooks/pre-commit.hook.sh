#!/bin/sh
set -eu
hook="pre-commit"
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
tests="${OAIES_TEST_EVIDENCE:-}"
secrets="${OAIES_SECRET_SCAN_EVIDENCE:-}"
require_file "$tests" "OAIES_TEST_EVIDENCE"
require_file "$secrets" "OAIES_SECRET_SCAN_EVIDENCE"
grep -q '^status=passed$' "$tests" || fail_gate "test evidence is not passed"
grep -q '^status=passed$' "$secrets" || fail_gate "secret-scan evidence is not passed"
if [ "$dry_run" -eq 0 ]; then
  git rev-parse --is-inside-work-tree >/dev/null 2>&1 || fail_data "not inside a Git work tree"
  staged=$(git diff --cached --no-ext-diff --unified=0 --no-color 2>/dev/null) ||
    fail_data "cannot inspect staged diff"
  if printf '%s\n' "$staged" | grep -Eq 'BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY'; then
    fail_gate "staged diff contains a private-key header"
  fi
fi
if [ "$dry_run" -eq 1 ]; then
  printf '%s\n' "$hook: dry-run validation passed"
else
  printf '%s\n' "$hook: gate passed"
fi
exit 0
