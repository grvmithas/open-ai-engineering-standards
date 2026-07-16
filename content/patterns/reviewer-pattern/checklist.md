# Reviewer Pattern — Checklist

> **Pattern:** Reviewer  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** Do not merge High-risk changes until every item is checked or waived by a named human distinct from the author.

## Intake

- [ ] Diff and base revision attached
- [ ] Acceptance criteria attached
- [ ] Risk profile completed (sensitivity, deployment, PII/payments/AI)
- [ ] Test evidence recorded for changed behavior (commands + results in the review notes)

## Review execution

- [ ] Intent reconstructed from AC before deep code read
- [ ] Correctness pass completed (edge cases + error paths)
- [ ] Security pass completed or explicitly N/A with reason
- [ ] Perf/reliability pass completed
- [ ] Maintainability + AC→test map completed
- [ ] Prior findings verified closed or reopened

## Findings quality

- [ ] Every Critical/High has file:line + remediation
- [ ] Severity matches reachability × impact
- [ ] Nits do not outnumber or obscure blockers
- [ ] At least one specific positive note

## Verdict and SoD

- [ ] Exactly one verdict issued
- [ ] No open Critical under Approve
- [ ] Author ≠ final approver for High-risk
- [ ] Review report linked on the PR
