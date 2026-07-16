# Legacy Modernization Pattern — Checklist

> **Pattern:** Legacy Modernization  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** No production traffic ramp without parity green; no legacy delete without 100% evidence.

## Slice design

- [ ] Capability in/out of scope written
- [ ] Legacy entry points mapped
- [ ] Seam chosen and recorded
- [ ] SME / business owner named

## Parity and shift

- [ ] Parity fixtures include edge cases
- [ ] Shadow/parity report green
- [ ] Traffic steps + abort KPIs written
- [ ] Rollback to legacy path tested

## Retirement

- [ ] 100% traffic evidence file
- [ ] Idle period observed
- [ ] Legacy path disabled/removed for slice only
- [ ] Next slice selected
