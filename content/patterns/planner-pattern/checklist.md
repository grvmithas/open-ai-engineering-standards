# Planner Pattern — Checklist

> **Pattern:** Planner  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** Coding does not start until every item is checked or explicitly waived with a named approver.

## Intake

- [ ] Story has clear, testable acceptance criteria
- [ ] Out-of-scope items listed
- [ ] Context assembled (relevant files included; secrets excluded)
- [ ] Constraints documented (perf, security, compatibility, compliance)

## Plan content

- [ ] Mermaid component / data-flow diagram present
- [ ] Every create/modify/delete path listed
- [ ] New dependencies listed
- [ ] API contract changes flagged (breaking vs non-breaking)
- [ ] Schema/data changes include migration strategy
- [ ] Implementation sequence respects dependencies
- [ ] Test plan covers unit / integration / e2e as applicable
- [ ] Rollback strategy defined per deployable stage
- [ ] Performance and security considerations present
- [ ] Blocking questions empty (or waived in writing)

## Approval

- [ ] Human reviewed for understanding (can restate the plan)
- [ ] Approver name + date recorded
- [ ] Plan artifact stored with the change (linked from PR)

## After coding starts

- [ ] Diff stays within planned paths or an approved plan revision exists
- [ ] Reviewer checked plan conformance, not only style
