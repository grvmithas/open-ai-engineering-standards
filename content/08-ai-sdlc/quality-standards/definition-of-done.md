# Definition of Done

> **SDLC Gate:** Before merge / release  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Purpose

A change is done only when it is correct, safe, observable, reversible, and evidenced — not when the agent stopped typing.

## Rule

Unchecked items block merge. Production release may impose a stricter subset (see [Deployment checklist](../../checklists/README.md#deployment-checklist)).

---

## Checklist

### Correctness

- [ ] Every acceptance criterion has a verifying test or explicit manual protocol
- [ ] Edge/failure cases from the story are handled
- [ ] Diff matches the approved plan (or an approved plan revision exists)
- [ ] No known Sev-1/Sev-2 defects open on this change

### Quality

- [ ] Automated tests required by the plan are green
- [ ] Types / linters clean for touched packages
- [ ] No secrets, prod dumps, or credentials in the diff
- [ ] Dead code and debug probes removed

### Security and data

- [ ] AuthZ checked on new/changed endpoints and tools
- [ ] User input reaching models is treated as untrusted data
- [ ] PII / secrets not logged
- [ ] Migrations are expand/contract safe or have an approved break window

### Operability

- [ ] Rollback tested or rehearsed for the release class
- [ ] Metrics / traces / logs sufficient to detect the failure modes in the plan
- [ ] Runbook or PR notes cover blast radius and abort criteria
- [ ] Feature flag / canary plan present when risk warrants it

### Knowledge

- [ ] Docs / OpenAPI / ADRs updated when contracts change
- [ ] Changelog entry present for user-visible or ops-visible changes
- [ ] AI prompts/skills/agents touched are versioned with the change

### Human gates

- [ ] Required reviews complete (code + security/architecture when triggered)
- [ ] Approver recorded for high-risk or AI-planned work

---

## Exit artifact

```text
Done: YES | NO
PR: <id>
Plan conformance: YES | DELTA <link>
Tests: <link or CI run>
Rollback: <link or steps>
Approver: <name>  Date: <ISO date>
```

## Anti-patterns

| Anti-pattern | Why it fails |
|--------------|--------------|
| “Tests will come in a follow-up” | Follow-ups evaporate; DoD is the gate |
| Done because the demo worked once | Demo ≠ regression protection |
| Agent said LGTM | Agents do not approve their own work |
| Docs TBD | Contract changes without docs are incomplete |

## Related

- [Definition of Ready](./definition-of-ready.md)
- [Code quality standard](./code-quality-standard.md)
- [Release pattern](../../patterns/release-pattern/README.md)
