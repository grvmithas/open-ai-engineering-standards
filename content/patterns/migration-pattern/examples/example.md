# Migration Pattern — Example: Split email into contacts table

> **Pattern:** Migration  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** Move `users.email` to `user_contacts.email` under live traffic

---

## Migration plan (artifact)

### Compatibility matrix

| Consumer | Current dependency | Required change | Owner |
|----------|--------------------|-----------------|-------|
| `api-users` | reads/writes `users.email` | dual-write; then read contacts | Platform |
| `billing-worker` | reads `users.email` | switch read after cutover | Billing |
| `support-export` | SQL on `users.email` | update query | Support eng |

### Phases

| Phase | Change | Gate | Rollback | PONR? |
|-------|--------|------|----------|-------|
| Expand | Create `user_contacts`; backfill | backfill 100%; null email=0 | Keep table | No |
| Dual | App writes both; read still users | mismatch < 0.01% / 24h | Stop dual-write | No |
| Cutover | Primary read from contacts | p99 + error SLO 48h soak | Flip read back to users | No |
| Contract | Stop writing `users.email`; drop column later | no readers in inventory | **Irreversible drop** | **Yes** |

### Reconciliation

```sql
-- counts
SELECT
  (SELECT count(*) FROM users WHERE email IS NOT NULL) AS u,
  (SELECT count(*) FROM user_contacts WHERE type='email') AS c;

-- semantic sample
SELECT u.id
FROM users u
LEFT JOIN user_contacts c ON c.user_id=u.id AND c.type='email'
WHERE u.email IS DISTINCT FROM c.value
LIMIT 100;
```

### Observability

| Signal | Threshold | Action |
|--------|-----------|--------|
| Dual mismatch rate | < 0.01% over 24h | Block cutover |
| API 5xx on `/users` | < 0.1% | Rollback cutover |
| Backfill lag | 0 remaining | Block dual start |

### Sample gate result (before cutover)

| Check | Result |
|-------|--------|
| Count u vs c | 1_204_332 vs 1_204_332 |
| Semantic sample | 0 rows |
| 24h mismatch metric | 0.002% |

```text
Cutover approver: J. Patel (SSO)  Date: 2026-07-14
Notes: Contract DROP deferred 14 days after soak.
```

This example **is** the artifact — not a pointer elsewhere.
