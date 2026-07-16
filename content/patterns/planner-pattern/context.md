# Planner Pattern — Context

> **Pattern:** Planner  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Story or task has testable acceptance criteria (not a one-line wish)
- [ ] Relevant codebase context is assembled (files, services, schemas, ADRs)
- [ ] Technical constraints are written down (perf, security, compatibility, compliance)
- [ ] A human reviewer is available to approve or reject the plan
- [ ] Success/failure of the plan is defined independently of “looks good”

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Change spans more than three files or more than one service
- Change crosses an API, schema, auth, or tenancy boundary
- Multiple valid designs exist with different tradeoffs
- Wrong implementation would force expensive rework or data migration
- Ordering constraints exist (migration before dual-write before cutover)

## Do not apply when

- Single-file typo or copy change
- Pure documentation with no runtime effect
- Configuration flip with no logic and a known rollback
- Hotfix under active incident containment (use [hotfix-pattern](../hotfix-pattern/README.md); plan the durable fix after)

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Story | `story-kickoff` output or ticket | Acceptance criteria + out-of-scope |
| Codebase context | Context assembler / human paste | Paths + excerpts that matter |
| Architecture | Existing diagrams / ADRs | Current services and data stores |
| Constraints | Team standards / compliance | Explicit hard limits |

## Authority boundary

The planner agent **does not write production code**. Its only durable artifact is an approved implementation plan. Coding starts only after named human approval (see workflow step “Human Review”).
