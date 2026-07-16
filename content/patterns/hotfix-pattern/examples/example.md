# Hotfix Pattern — Example: SEV1 checkout null guard

> **Pattern:** Hotfix  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** `checkout-api` 500s after deploy; NPE on empty discount code

---

## Declare (inline)

```text
Incident: INC-2841
SEV1 — checkout 500s ~18% of POST /checkout
IC: A. Mensah   Scribe: K. Liu
Declared: 2026-07-16T14:12Z
Cadence: status every 10m in #inc-2841
Containment success: checkout_success_probe ≥ 99% for 10m
```

## Recent changes

| Time | Change |
|------|--------|
| 13:55Z | Deploy `sha256:aa11…` payments promo parsing |
| 14:01Z | First alert `checkout_error_rate > 2%` |

LKG: `sha256:77bb…` (13:10Z)  
Flag available: `checkout.promo_parser_v2`

## Containment (executed)

```text
14:14Z IC: set checkout.promo_parser_v2=off
14:16Z probe 99.3% — CONTAINED
Evidence: flag audit + trace IDs preserved; bad digest kept for analysis (not deleted)
```

## Minimal patch scope

Allowed paths only:

```text
src/checkout/promoParser.ts
src/checkout/promoParser.test.ts
```

Forbidden: lockfiles, fmt-only, unrelated modules.

Patch intent: treat empty string discount as `null`; no behavior change for valid codes.

## Emergency deploy + verify

| Time | Event |
|------|-------|
| 14:40Z | Hotfix digest `sha256:cc22…` deployed (flag still off) |
| 14:45Z | Flag on at 5% — probes OK |
| 14:55Z | Flag 100% — error_rate baseline |
| 15:05Z | SEV1 → MONITORING |

## Abort criteria (were armed)

- error_rate > 1% for 3m after flag on → disable flag  
- new exception class in logs → disable flag  

## Follow-ups

- Durable: add contract test for empty discount; owner D. Ortiz due 2026-07-18  
- RCA: scheduled 2026-07-17 per [root-cause-pattern](../../root-cause-pattern/README.md)

```text
IC Decision: A. Mensah 14:14Z contain; 14:38Z authorize minimal patch
```
