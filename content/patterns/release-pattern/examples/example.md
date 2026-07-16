# Release Pattern — Example: Payments API canary that aborted at 5%

> **Pattern:** Release  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** `payments-api` digest promotion with flag `payments.ledger_v2_read`

---

## Artifacts

| Artifact | Digest |
|----------|--------|
| `payments-api` | `sha256:9f3c2a1b8e7d6c5b4a3928170695e4d3c2b1a09876543210fedcba9876543210` |
| Prior (rollback) | `sha256:11aa22bb33cc44dd55ee66ff77889900aabbccddeeff00112233445566778899` |

Provenance: SLSA-style attestation job `attest-2026-07-15T18:02Z` — PASS  
SBOM policy: PASS (no critical CVEs in deny list)

## Abort criteria (pre-declared)

| Metric | Threshold | Window | Action |
|--------|-----------|--------|--------|
| `payments_error_rate` | > 0.5% absolute above 1h baseline | 5m | Abort |
| `payments_p99_ms` | > 350 or > baseline+20% | 5m | Abort |
| `checkout_success_probe` | < 99.0% | 5m | Abort |

Flag: `payments.ledger_v2_read` — disable = immediate read path revert.

## Go decision (inline)

```text
Approver: S. Rahman  Date: 2026-07-15
Decision: GO
Rollback owner: J. Klein  RTO: 10m
```

## Canary log (inline)

| UTC | Stage | Result |
|-----|-------|--------|
| 19:00 | Deploy digest to canary pods | OK |
| 19:05 | Flag 1% | error_rate +0.05% — continue |
| 19:35 | Flag 5% | error_rate +0.7% for 5m — **ABORT** |
| 19:36 | Flag disabled | Probe recovered 19:38 |
| 19:40 | Prior digest confirmed running | Baseline restored |

```text
ABORT reason: payments_error_rate breached +0.5% for 5m at 5% exposure
Action: payments.ledger_v2_read=off; no schema contract attempted
Verification: checkout_success_probe 99.4% at 19:39; p99 210ms
```

## Aftermath

NO_GO for retry until root cause of ledger_v2 read path fixed; change ticket remains open with digests and abort log attached.

This example shows a **successful use of abort** — not a successful promotion.
