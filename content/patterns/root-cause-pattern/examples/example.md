# Root Cause Pattern — Example: INC-2841 checkout empty discount

> **Pattern:** Root Cause  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** Follows hotfix example; blameless RCA with inline artifacts

---

# Root Cause Analysis: Checkout 500s on empty discount code

**Incident ID:** INC-2841  
**Date:** 2026-07-17  
**Authors:** K. Liu (scribe), A. Mensah (IC), D. Ortiz (checkout)  
**Severity:** SEV1  
**Status:** FINAL  

## Incident Summary

From 13:55–14:16Z on 2026-07-16, `POST /checkout` returned HTTP 500 for carts submitting an empty discount string after promo parser v2 deployed. Impact peaked near 18% of checkouts. Contained by disabling `checkout.promo_parser_v2`, then mitigated with a null-guard hotfix.

**Impact:**
- Users affected: ~18% of checkout attempts for 21 minutes  
- Revenue impact: estimated checkout GMV dip during window (finance ticket FIN-902)  
- Duration: detect 6m; contain 4m after declare; full mitigate ~53m from deploy  
- SLA breach: Yes — availability SLO monthly error budget burn accelerated  

## Timeline

| Time (UTC) | Event | Who |
|-----------|-------|-----|
| 13:55 | Deploy promo parser v2 `sha256:aa11…` | CD |
| 14:01 | Alert `checkout_error_rate > 2%` | Monitor |
| 14:07 | Customer reports spike | Support |
| 14:12 | SEV1 declared; IC A. Mensah | On-call |
| 14:14 | Flag `checkout.promo_parser_v2=off` | IC |
| 14:16 | Probes recover ≥99% | Verify |
| 14:45–15:05 | Hotfix null guard + staged flag on | Eng |

## Root Cause

**Root cause (one sentence):**  
Empty discount strings were not in the promo parser’s contract tests or canary abort signals, so a parser that assumed non-empty codes could reach 100% traffic without failing a quality gate.

### 5 Whys Analysis

| Why # | Question | Answer |
|-------|---------|--------|
| Why 1 | Why did checkout 500? | NPE in promo parser on `""` discount |
| Why 2 | Why did empty string reach parser? | Client sends `""` when field cleared; API did not normalize |
| Why 3 | Why wasn’t this caught in tests? | Contract tests only covered `null` and valid codes — not empty string |
| Why 4 | Why did canary not stop it? | Abort watched infrastructure errors broadly but not checkout success by discount-present cohort |
| Why 5 | Why was that gap allowed? | Release checklist had no input-boundary cases for promo fields — systemic test/canary gap |

## Contributing Factors

| Factor | Category | How It Contributed |
|--------|---------|-------------------|
| Rapid flag-on after deploy | Process | Shortened soak at low % |
| Client sends `""` not `null` | Technical | Unexpected wire value |
| No golden case for empty discount | Technical | Eval/test gap |

## Detection Gap Analysis

**Time to detection:** ~6 minutes (deploy → alert)  
**How detected:** Alert + customer reports  

**Why wasn’t this caught earlier?**
- [x] No monitoring for this failure mode (cohort-specific success)  
- [ ] Alert existed but threshold was wrong  
- [ ] Alert fired but was ignored  
- [ ] This was caught (detection was adequate)  

Alert existed for global error rate — adequate for SEV declare, inadequate for **pre-prod/canary** prevention.

## Remediation

### Immediate Actions (Already Done)
- [x] Flag disable — IC — 14:14Z  
- [x] Null-guard hotfix — Eng — 14:45Z  

### Short-Term Actions (Within 1 Sprint)
- [ ] Add contract tests: `null`, `""`, whitespace, valid codes — **Owner:** D. Ortiz — **Due:** 2026-07-18 — **Prevents:** parser NPE on empty  
- [ ] Canary abort: `checkout_success_probe < 99%` for 3m at any stage — **Owner:** J. Klein — **Due:** 2026-07-22 — **Prevents:** silent 100% promote  

### Long-Term Actions (Within 1 Quarter)
- [ ] Input-boundary checklist item on release template for form-backed APIs — **Owner:** S. Rahman — **Due:** 2026-08-30  

## Lessons Learned

**What went well:** Fast IC declare; flag containment in 4 minutes  
**What could be improved:** Canary quality abort; empty-string fixtures  
**What surprised us:** Clients send `""` more often than `null`  

## Prevention Summary

This incident WILL NOT recur when:
- [ ] Contract tests for empty discount are green in CI  
- [ ] Canary aborts on checkout_success_probe threshold above  
- [ ] Release template includes input-boundary checklist item  

```text
Reviewed by: L. Cho  Date: 2026-07-17
```

This example **is** the RCA artifact shape required by the pattern and SDLC prompt.
