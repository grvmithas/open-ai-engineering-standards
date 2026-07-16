# Reviewer Pattern — Example: Auth-scoped report API PR

> **Pattern:** Reviewer  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** PR adds `POST /api/v1/reports` with org scoping

---

## Inputs (abbreviated)

**AC:**
1. Authenticated user with `reports:create` can create a report for their org  
2. Users cannot create reports for another org  
3. Invalid payload returns 400 with field errors  
4. Unauthenticated requests return 401  

**Risk:** internal API, handles confidential business data, JWT auth, no payments, not AI.

## Review report (artifact)

### Summary

Correctness mostly sound; org scoping is enforced in the service but the route trusts a client-supplied `orgId`. One High security finding; tests miss cross-org denial.

**Verdict:** Request changes

### Critical

_None_

### High

| ID | Title | Location | Issue | Remediation |
|----|-------|----------|-------|-------------|
| REV-001 | Client-supplied orgId | `src/routes/reports.ts:38` | Handler uses `body.orgId` instead of token `org_id` | Derive org from auth context; reject body.orgId mismatch with 403 |
| REV-002 | Missing cross-org test | `tests/reports.int.test.ts` | Only happy-path create; no foreign org attempt | Add test: user A token + org B id → 403 |

### Medium

| ID | Title | Location | Issue | Remediation |
|----|-------|----------|-------|-------------|
| REV-003 | Unbounded title length | `reportService.ts:22` | Title string not length-capped | Cap at 200 chars in schema + DB |

### Nit

- Prefer `const` for the Zod schema export in `reports.ts`

### AC → Test map

| AC | Test evidence | Gap? |
|----|---------------|------|
| Create with permission | `creates report for caller org` | No |
| Cross-org denied | — | **Yes → REV-002** |
| 400 on invalid | `rejects empty title` | No |
| 401 unauthenticated | `rejects missing token` | No |

### Positive notes

- Migration is expand-only with `(org_id, created_at)` index — good rollout posture  
- OpenTelemetry span attributes on the handler are clear

### Fix verification (round 2)

| ID | Status | Evidence |
|----|--------|----------|
| REV-001 | Resolved | Route now uses `ctx.auth.orgId` only |
| REV-002 | Resolved | New test `denies foreign orgId` fails on old rev, passes on new |
| REV-003 | Resolved | Zod `.max(200)` + DB `varchar(200)` |

**Verdict (round 2):** Approve

```text
Reviewer: S. Okonkwo  Date: 2026-07-16
Author: A. Chen
SoD: distinct identities — OK for High-risk internal API
```

This example **is** the artifact — not a pointer to a file elsewhere.
