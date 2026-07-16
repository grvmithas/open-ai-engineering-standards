#!/bin/sh
set -eu
here=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
tmp="${TMPDIR:-/tmp}/oaies-hooks-$$"
trap 'rm -rf "$tmp"' EXIT HUP INT TERM
mkdir -p "$tmp/repo"
pass=0
ok() { "$@" >/dev/null 2>&1 || { printf 'FAIL expected success: %s\n' "$*" >&2; exit 1; }; pass=$((pass + 1)); }
bad() { if "$@" >/dev/null 2>&1; then printf 'FAIL expected failure: %s\n' "$*" >&2; exit 1; fi; pass=$((pass + 1)); }
file() { printf '%s\n' "$2" > "$tmp/$1"; }

file requirements 'requirement=approved'
file plan 'step=one'
file write-approval 'effect=workspace-write
target=content/'
file deploy-approval 'effect=deployment
target=staging'
file tests 'status=passed
artifact=abc'
file secrets 'status=passed
artifact=abc'
file failed 'status=failed
artifact=abc'
file format 'status=passed'
file lint 'status=passed'
file manifest 'artifact_digest=sha256:abc
environment=staging'
file release 'status=passed'
file knowledge 'owner=team
source=incident-1
retention=365d'
file tool-result 'status=passed
effect=read
target=repo'
file delegation 'principal=planner
scope=postgres
budget_profile=small
remaining_depth=1'
file no-depth 'principal=planner
scope=postgres
budget_profile=small
remaining_depth=0'
file health 'artifact_digest=sha256:abc
environment=staging
status=healthy'

ok env OAIES_REQUIREMENTS_FILE="$tmp/requirements" sh "$here/pre-planning.hook.sh" --dry-run
bad env OAIES_REQUIREMENTS_FILE="$tmp/missing" sh "$here/pre-planning.hook.sh"
ok env OAIES_PLAN_FILE="$tmp/plan" OAIES_APPROVAL_FILE="$tmp/write-approval" sh "$here/pre-code.hook.sh"
bad env OAIES_PLAN_FILE="$tmp/plan" OAIES_APPROVAL_FILE="$tmp/deploy-approval" sh "$here/pre-code.hook.sh"
ok env OAIES_VERIFY_EVIDENCE="$tmp/tests" sh "$here/post-code.hook.sh"
bad env OAIES_VERIFY_EVIDENCE="$tmp/failed" sh "$here/post-code.hook.sh"
ok env OAIES_TEST_EVIDENCE="$tmp/tests" OAIES_SECRET_SCAN_EVIDENCE="$tmp/secrets" sh "$here/pre-commit.hook.sh" --dry-run
bad env OAIES_TEST_EVIDENCE="$tmp/failed" OAIES_SECRET_SCAN_EVIDENCE="$tmp/secrets" sh "$here/pre-commit.hook.sh" --dry-run
ok env OAIES_FORMAT_EVIDENCE="$tmp/format" OAIES_LINT_EVIDENCE="$tmp/lint" sh "$here/pre-review.hook.sh"
ok env OAIES_RELEASE_MANIFEST="$tmp/manifest" OAIES_APPROVAL_FILE="$tmp/deploy-approval" OAIES_RELEASE_EVIDENCE="$tmp/release" sh "$here/deployment.hook.sh"
ok env OAIES_KNOWLEDGE_FILE="$tmp/knowledge" sh "$here/knowledge-capture.hook.sh"
ok env OAIES_TOOL_EFFECT=read sh "$here/pre-tool-call.hook.sh"
bad env OAIES_TOOL_EFFECT=deployment sh "$here/pre-tool-call.hook.sh"
ok env OAIES_TOOL_EFFECT=deployment OAIES_APPROVAL_FILE="$tmp/deploy-approval" sh "$here/pre-tool-call.hook.sh"
bad env OAIES_TOOL_EFFECT=unknown sh "$here/pre-tool-call.hook.sh"
ok env OAIES_TOOL_RESULT_FILE="$tmp/tool-result" sh "$here/post-tool-call.hook.sh"
ok env OAIES_DELEGATION_FILE="$tmp/delegation" sh "$here/pre-delegation.hook.sh"
bad env OAIES_DELEGATION_FILE="$tmp/no-depth" sh "$here/pre-delegation.hook.sh"
ok env OAIES_HEALTH_EVIDENCE="$tmp/health" sh "$here/post-deployment.hook.sh"
ok env OAIES_BUDGET_PROFILE=small OAIES_BUDGET_REMAINING=1 sh "$here/budget-guard.hook.sh"
bad env OAIES_BUDGET_PROFILE=small OAIES_BUDGET_REMAINING=0 sh "$here/budget-guard.hook.sh"
bad env OAIES_BUDGET_PROFILE=small OAIES_BUDGET_REMAINING=x sh "$here/budget-guard.hook.sh"

(
  cd "$tmp/repo"
  git init -q
  printf '%s\n' 'BEGIN PRIVATE KEY' > key.txt
  git add key.txt
  bad env OAIES_TEST_EVIDENCE="$tmp/tests" OAIES_SECRET_SCAN_EVIDENCE="$tmp/secrets" sh "$here/pre-commit.hook.sh"
)
printf 'PASS: %s deterministic hook assertions\n' "$pass"
