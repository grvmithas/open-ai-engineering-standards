# Definition of Ready

> **SDLC Gate:** Before coding starts  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Purpose

Nothing enters implementation until the team can execute without inventing product or architecture decisions mid-flight.

## Rule

If you cannot check an item, **stop**. Fix it, or document a named waiver (approver + date + expiry). Waivers are exceptions, not a lifestyle.

---

## Checklist

### Story quality

- [ ] User / job-to-be-done is explicit
- [ ] Acceptance criteria are testable (QA can write tests from them)
- [ ] Happy path + at least two edge/failure cases covered
- [ ] Out-of-scope listed
- [ ] Dependencies identified and available (or explicitly sequenced)

### Technical readiness

- [ ] Implementation plan exists for multi-file / cross-service work ([Planner Pattern](../../patterns/planner-pattern/README.md))
- [ ] Files/services expected to change are named
- [ ] Data model impact known (none / additive / breaking + migration approach)
- [ ] API contract impact known (none / additive / breaking)
- [ ] Rollback approach named
- [ ] Observability impact considered (new metrics/traces/logs)

### Risk and ownership

- [ ] Top risks listed with mitigations
- [ ] Security impact considered (authz, injection, data exposure)
- [ ] Privacy / residency impact considered when personal data is involved
- [ ] Implementation owner named
- [ ] Reviewer / approver named
- [ ] On-call / rollout owner named for production-bound work

### AI-assisted work extras

- [ ] Context package assembled (relevant paths, not the whole monorepo)
- [ ] Prompt / agent / skill versions pinned if used in the change
- [ ] Evaluation or golden cases identified when model behavior is user-visible

---

## Exit artifact

A short readiness record linked from the ticket/PR:

```text
Ready: YES | NO
Story: <id>
Plan: <link or N/A + reason>
Approver: <name>  Date: <ISO date>
Waivers: <none | list>
```

## Anti-patterns

| Anti-pattern | Why it fails |
|--------------|--------------|
| “We’ll figure out the schema in the PR” | Schema is an architecture decision; belongs in the plan |
| Ready because sprint started | Calendar is not a quality gate |
| AI coder started without a story | Optimizes tokens, not outcomes |
| Waiver with no expiry | Permanent exception disguised as process |

## Related

- [Definition of Done](./definition-of-done.md)
- [Implementation plan prompt](../prompts/implementation-plan.prompt.md)
- [Planner pattern](../../patterns/planner-pattern/README.md)
