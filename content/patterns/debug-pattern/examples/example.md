# Debug Pattern — Example: Intermittent 500 on user fetch

> **Pattern:** Debug  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** `GET /api/users/:id` returns 500 ~5% after Redis caching PR

---

## Bug analysis (artifact)

**Root cause:** Cache write is async; a concurrent read can observe a miss and pass `null` into the user DTO mapper.  
**Category:** race

### Characterization

| Field | Value |
|-------|-------|
| Expected | 200 + user JSON |
| Actual | 500, empty body ~5% of requests |
| Env | staging + prod |
| Started after | Redis caching PR `def5678` (Tuesday) |
| Repro | ~5% under `hey -n 2000 -c 50` |

### Hypothesis testing

| # | Hypothesis | Test | Result |
|---|------------|------|--------|
| 1 | Race between cache write and read | Add timing logs around get/set; load test | **Confirmed** — read returns null while write in-flight |
| 2 | DTO mapper throws on unexpected field | Unit test mapper with fixture variants | Ruled out — only throws on null user |
| 3 | DB pool exhaustion | Watch pool metrics during load | Ruled out — pool idle > 40% |

### Fix applied

- Await cache set before returning from cache layer; treat null miss as DB fetch only after write settlement
- Files: `src/cache/userCache.ts`, `src/services/userService.ts`
- Regression test: `userCache.concurrent.test.ts` — concurrent get/set must not yield null user to mapper

### Verification

- [x] Load test error rate 0/2000 on staging  
- [x] Unit + integration green  
- [x] Mapper still rejects null explicitly (defense in depth)

### Similar risks

| Location | Notes |
|----------|-------|
| `src/cache/sessionCache.ts` | Same async set pattern — filed follow-up TICKET-4421 |
| `src/cache/reportCache.ts` | Already awaits set — OK |

```text
Debugger: M. Ruiz  Date: 2026-07-16
Reviewer: S. Okonkwo
```

This example **is** the artifact — not a pointer elsewhere.
