# Context Pattern — Example: Package for “add reports API”

> **Pattern:** Context  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Task intent:** Plan `POST /api/v1/reports` with org scoping  
> **Budget:** 80_000 bytes

---

## Context package (artifact)

**Actual size:** 41_220 bytes (~10.3k tokens)  
**Commit:** `abc1234`  
**Consumer:** planner

### Manifest

| Path | Why included | Excerpt |
|------|--------------|---------|
| `src/routes/users.ts` | Existing auth-scoped route pattern | 1–80 |
| `src/auth/permissions.ts` | Permission registry to extend | full |
| `src/services/userService.ts` | Org-scoping pattern in services | 40–120 |
| `db/migrations/20260101_users.sql` | Migration style + org_id convention | full |
| `src/middleware/auth.ts` | How `ctx.auth.orgId` is set | full |
| `docs/adr/0007-tenancy.md` | Tenancy invariant | full |

### Excerpt sample

#### `src/middleware/auth.ts`
Why: Shows canonical org id source for handlers.

```typescript
// ctx.auth.orgId is set from JWT; handlers must not trust body.orgId
export function requireAuth(req, res, next) { /* ... */ }
```

### Deliberate exclusions

| Path / pattern | Reason |
|----------------|--------|
| `node_modules/**` | Dependency noise |
| `src/components/**` | UI out of scope for first plan pass |
| `.env*` | Secrets |
| `ops/prod-dumps/**` | Production data forbidden |

### Gaps

- No existing `reports` module (expected — greenfield feature)

### Handoff

Ready for planner-pattern. If UI is in scope later, re-assemble with `ReportForm` peers under `src/components/`.

This example **is** the artifact — not a pointer elsewhere.
