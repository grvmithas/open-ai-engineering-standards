# Definition of Ready

> **SDLC Gate:** Before coding starts  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Nothing enters implementation until the team can execute without inventing product or architecture decisions mid-flight.

## Why

A human developer who hits an undefined decision asks someone. An agent invents an answer, implements it consistently across twenty files, and writes tests that lock it in. Ambiguity that cost a conversation now costs a revert. Readiness is the cheapest place to remove ambiguity — and for delegated or background agents, the ready story *is* the task contract.

## How

1. Run the checklist at refinement; the ticket carries the exit artifact.
2. For agent-executed work, convert the ready story into a task contract (`plans/_TASK_CONTRACT.md` in the starter kit; `node scripts/aies-worktree.mjs new <task-id>` creates one per worktree): goal, acceptance criteria, allowed paths, forbidden actions, verification commands, budget.
3. Use the story-kickoff prompt to have an agent *challenge* readiness (find missing edge cases, unnamed dependencies) before any implementation agent starts.

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
- [ ] For delegated/background agents: task contract written with allowed paths, verification commands, and budget
- [ ] Parallel work split into non-overlapping file sets (one worktree per agent)

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
| Assigning a vague ticket to a cloud agent "to see what it does" | It will decide the product for you, plausibly and at scale |

## Tradeoffs

| Choice | You gain | You give up |
|---|---|---|
| Hard readiness gate | Fewer mid-flight reversals and agent reverts | Upfront refinement time; spikes need an explicit "exploration" waiver |
| Task contracts for agent work | Bounded, verifiable delegation | Writing the contract takes 10–15 minutes per task |
| Non-overlapping parallel splits | No merge conflicts between agents | Some features can't parallelize and run serially |

## Enterprise considerations

- Readiness records with named owners and approvers satisfy the accountability expectations in NIST AI RMF (Govern) and ISO/IEC 42001 clause 5.3 (roles and responsibilities).
- Privacy and residency questions answered at readiness are far cheaper than DPIA findings after build; route personal-data stories to the privacy reviewer here.
- Portfolio metric: percentage of stories reopened for missing requirements. Above 10% means the gate is being waved through.

## Related

- [Definition of Done](./definition-of-done.md)
- [Implementation plan prompt](../prompts/implementation-plan.prompt.md)
- [Planner pattern](../../patterns/planner-pattern/README.md)
- [Parallel agents and worktrees](../../handbook/parallel-agents-and-worktrees.md)

## Changelog

- **1.2 — 2026-11-06:** Added Why, How (task contracts for agent work), parallel-split and task-contract items, Tradeoffs, and Enterprise considerations.
- **1.1 — 2026-07-16:** Initial gate.
