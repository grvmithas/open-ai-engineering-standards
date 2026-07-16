# Context Pattern — Failures

> **Pattern:** Context  
> **Component:** failures.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Failure 1: Whole-repo dump

**Symptom:** Package is huge; agent ignores the three relevant files.  
**Cause:** No ranking or hard budget.  
**Recovery:** Re-run seed→expand→trim with `MAX_BYTES`; delete the dump.

## Failure 2: Missing call sites

**Symptom:** Planner designs a duplicate helper that already exists.  
**Cause:** Included implementation but not importers/routes.  
**Recovery:** Expand call sites; add route registration and existing helper to package.

## Failure 3: Secrets in context

**Symptom:** Hook or DLP flags keys; or worse, package already shared.  
**Cause:** No scrubber / exclusion rules.  
**Recovery:** Destroy package; rotate credentials if exposed; fix rules; re-assemble.

## Failure 4: Stale excerpts

**Symptom:** Agent codes against deleted APIs.  
**Cause:** Cached package from an old branch.  
**Recovery:** Regenerate from current HEAD; pin package to commit SHA.

## Failure 5: Budget theater

**Symptom:** Tiny package missing critical schema; agent invents columns.  
**Cause:** Over-trimmed to look “efficient.”  
**Recovery:** Raise budget for schema+contracts; never omit the contract surface for data changes.
