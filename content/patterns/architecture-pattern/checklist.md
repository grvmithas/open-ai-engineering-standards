# Architecture Pattern — Checklist

> **Pattern:** Architecture  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** High-risk coding does not start without an accepted ADR and independent approval.

## Inputs

- [ ] Drivers and non-goals written
- [ ] QA scenarios measurable
- [ ] Constraints and risk level set
- [ ] Independent reviewer named for High risk

## ADR content

- [ ] ≥2 real alternatives with reject reasons
- [ ] Decision tied to QA scenarios
- [ ] Mermaid diagrams present and consistent with interfaces
- [ ] Trust-boundary and failure-mode analysis present
- [ ] Consequences and re-review triggers listed

## Approval

- [ ] Decision is APPROVE / APPROVE WITH CONDITIONS / REJECT
- [ ] Author ≠ approver when High risk
- [ ] Conditions tracked to closure
- [ ] ADR stored and linked from implementation plan/PR
