# Optimization Pattern — Example: Checkout p99 via Redis batching

> **Pattern:** Optimization  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** `POST /checkout` p99 above SLO; N+1 Redis GETs on cart lines

---

## Spec (intake)

| Field | Value |
|-------|-------|
| Service | `checkout-api` |
| Target metric | `http_server_duration_p99_ms{route=/checkout}` |
| SLO | p99 ≤ 400 ms over 5m |
| Min useful effect | ≥20% p99 reduction (≤320 ms) |
| Flag | `checkout.redis_mget_cart` |
| Workload ID | `wl-checkout-peak-2026-07` |
| Oracle | Cart total + tax match golden fixtures; idempotent checkout key intact |

### Abort criteria (pre-declared)

- p99 > 450 ms for 5 consecutive minutes on canary cohort  
- error_rate > baseline + 0.1%  
- Redis CPU > 70% on primary  
- Oracle probe failure

## Baseline (inline artifact)

Workload: 60% 3-line carts, 30% 10-line, 10% 30-line; 200 RPS; warm-up 2m; n=40 one-minute windows.

| Metric | Baseline |
|--------|----------|
| p50 | 120 ms |
| p95 | 310 ms |
| p99 | 520 ms |
| error_rate | 0.12% |
| Redis cmds / checkout | ~31 GETs |

Profiler attribution: 48% of critical-path time in sequential `GET cart:line:*`.

## Hypothesis

Replace per-line `GET` with one `MGET` (+ pipeline for writes) behind `checkout.redis_mget_cart`. Single mechanism; no schema change.

## Candidate results (inline)

| Metric | Baseline | Candidate | Delta |
|--------|----------|-----------|-------|
| p50 | 120 ms | 95 ms | −21% |
| p95 | 310 ms | 240 ms | −23% |
| p99 | 520 ms | 280 ms | −46% |
| error_rate | 0.12% | 0.11% | flat |
| Redis cmds / checkout | 31 | 3 | −90% |
| Oracle | — | PASS (120/120) | — |

## Canary

| Stage | % | Hold | Result |
|-------|---|------|--------|
| 1 | 1% | 30m | No abort |
| 2 | 5% | 2h | No abort |
| 3 | 25% | 24h | No abort |

## Human decision

```text
Approver: M. Okonkwo  Date: 2026-07-14
Decision: KEEP
Notes: Promote to 100% after 48h at 25%; watch Redis CPU dashboard.
Capacity headroom: ~340 RPS until Redis CPU soft limit 65%.
```

This example **is** the artifact — numbers are illustrative of the required shape, not a claim about a live system.
