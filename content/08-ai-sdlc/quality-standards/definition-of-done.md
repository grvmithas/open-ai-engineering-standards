# Definition of Done

> **SDLC Gate:** Before merge / release  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

A change is done only when it is correct, safe, observable, reversible, and evidenced — not when the agent stopped typing.

## Why

Agents end turns with confident summaries. A background agent can open a PR at 3 a.m. claiming every criterion is met. "Done" must therefore be a property of artifacts — CI runs, review records, rollback plans — that exist independently of any model's account of its own work.

## How

1. Paste the checklist into the PR template so every PR, human or agent, carries it.
2. Automate every machine-checkable item as a required status check (tests, types, secret scan, changelog presence, AIES audit score).
3. Reviewers check only the items CI cannot: plan conformance, operability, knowledge.
4. Emit the exit artifact in the PR description; the merge bot refuses PRs without it.

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
- [ ] Prompt or model changes re-ran the evaluation suite; results linked

### Human gates

- [ ] Required reviews complete (code + security/architecture when triggered)
- [ ] Approver recorded for high-risk or AI-planned work
- [ ] Approver is not the identity (human or agent) that authored the change

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
| Agent summary pasted as evidence | A model's description of its work is not a CI result |

## Tradeoffs

| Choice | You gain | You give up |
|---|---|---|
| Uniform DoD for every change | No negotiation per PR; agents and humans held equal | Trivial changes carry checklist overhead — mitigate by auto-checking N/A items in CI |
| Rollback rehearsal required | Recoverable releases | Time per release class (rehearse per class, not per PR) |
| Eval rerun on prompt/model change | Behavior regressions caught pre-merge | CI minutes and API cost |

## Enterprise considerations

- The exit artifact is change-management evidence (SOC 2 CC8.1, ISO 27001 A.8.32). Retain it with the PR for the audit period.
- For high-risk AI systems under the EU AI Act, link the DoD record to the technical documentation and post-market monitoring plan of the affected system.
- Track DoD waivers; recurring waivers on the same item mean the gate is mis-sized, not that teams are lazy.

## Related

- [Definition of Ready](./definition-of-ready.md)
- [Code quality standard](./code-quality-standard.md)
- [Release pattern](../../patterns/release-pattern/README.md)

## Changelog

- **1.2 — 2026-11-06:** Added Why, How (PR template + required checks), eval-rerun and author≠approver items, Tradeoffs, and Enterprise considerations.
- **1.1 — 2026-07-16:** Initial gate.
