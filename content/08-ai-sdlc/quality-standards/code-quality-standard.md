# Code Quality Standard

> **Applies to:** Human- and AI-authored production code  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

AI speed must not lower the bar. Code from agents is held to the **same** standard as human code — often higher on tests and plan conformance.

## Why

In 2026 a large share of merged diffs originate from agents: IDE agents, background/cloud agents that open PRs unattended, and parallel agents in worktrees. Three properties make agent code riskier than its line count suggests:

1. **Plausibility outruns correctness.** Agent code compiles, reads idiomatically, and passes the tests the agent itself wrote. Review fatigue sets in exactly where defects hide.
2. **Volume shifts the bottleneck to review.** When generation is free, the reviewer is the constrained resource; every unnecessary line spends that resource.
3. **Claims are not evidence.** "All tests pass" in a transcript is a model output, not a CI result.

The standard therefore keys on *verifiable* properties — CI results, plan conformance, diff scope — rather than on who typed the code.

## How

Enforce the bar at three layers so no single layer is load-bearing:

| Layer | Mechanism | What it enforces |
|---|---|---|
| Agent runtime | Native hooks (`PreToolUse` / `PostToolUse` or the runtime equivalent) running `aies-guard` | Blocks writes to secrets/protected paths; runs formatter + typecheck after edits; exit code 2 feeds the failure back to the agent |
| Pull request | Required CI checks: lint, typecheck, tests, secret scan, `create-aies-kit audit --min-score` | Every item in the checklist that a machine can verify |
| Human review | CODEOWNERS + plan link in PR template | Design, scope, and plan conformance — the items a machine cannot judge |

Agent-authored commits carry provenance: a `Co-authored-by:` trailer or the runtime's native attribution, plus the plan/task-contract link in the PR body. Background agents open **draft** PRs from an isolated branch or worktree; they never push to protected branches.

## Checklist — minimum bar

### Correctness

- [ ] Matches acceptance criteria and approved plan
- [ ] Error paths handled; no silent swallows of security-relevant failures
- [ ] Null/empty/boundary cases explicit where the type system doesn’t already force them

### Design

- [ ] Functions do one job; names describe behavior
- [ ] No unnecessary duplication of existing helpers
- [ ] Comments explain **why**, not narrate **what**
- [ ] No dead or commented-out code committed

### Safety

- [ ] No secrets in source
- [ ] Parameterized queries / safe HTML / safe shell
- [ ] AuthZ on new endpoints and tool wrappers
- [ ] Untrusted model output not executed as code or SQL

### Tests

- [ ] Unit tests for new logic
- [ ] Integration tests for new boundaries (API, DB, queue)
- [ ] Tests assert behavior, not incidental implementation details
- [ ] Coverage not used as a vanity metric to excuse missing critical paths
- [ ] Agent-written tests were seen failing before the fix (or are reviewed as specification, not trusted as proof)

### Types and tooling

- [ ] No `any` / untyped public APIs without an explicit waiver
- [ ] Lint and typecheck clean for touched packages
- [ ] Formatting matches repo defaults

### Provenance (agent-authored changes)

- [ ] PR links the plan or task contract the agent executed
- [ ] Commits carry agent attribution
- [ ] Background/cloud agent PRs opened as draft from an isolated branch or worktree

## AI-specific rules

1. **Plan conformance** — unexpected files require a plan revision, not a shrug  
2. **No drive-by refactors** — out-of-scope cleanup belongs in its own change  
3. **Cite sources** — when copying patterns from the codebase, match local idioms  
4. **Prove it** — agent claims of “tests pass” must match CI, not chat transcript  
5. **Size the diff for review** — split agent output above roughly 400 changed lines into stacked PRs unless the change is mechanical (codemod, rename) and labelled as such

## Tradeoffs

| Choice | You gain | You give up |
|---|---|---|
| Same bar for human and agent code | One standard, no "AI exemption" debates | Agents can't be used for quick prototypes on protected branches — use a scratch branch |
| Hooks + CI + review (three layers) | No single point of failure; fast feedback inside the agent loop | Hook latency on every edit (keep hooks under ~2 s; push slow suites to CI) |
| Mandatory provenance | Auditable AI contribution, targeted rollback | Slight PR-template friction |
| Diff-size limit | Reviews that actually happen | More PRs to merge for large features |

## Anti-patterns

| Anti-pattern | Why it fails | Do instead |
|---|---|---|
| Rubber-stamping agent PRs because "the tests pass" | The agent wrote the tests; they encode its own misunderstanding | Review tests as specification; require a failing-first run |
| Instructions-only enforcement ("AGENTS.md says don't touch migrations") | Instructions are advisory; models drift under long context | Back every MUST with a hook or CI check |
| Agent force-pushes or merges its own PR | Removes separation of duties | Branch protection + required human approval |
| 3,000-line agent PR "because it was one prompt" | Unreviewable; defects merge by attrition | Stacked PRs per plan step |

## Enterprise considerations

- **Separation of duties (SOX, ISO 27001 A.8.32):** the identity that generated a change cannot approve it. Background agents run under a dedicated workload identity, distinct from any human approver.
- **Audit:** retain PR, plan link, CI results, and agent attribution for the retention period of your change-management policy; agent transcripts are supporting evidence, not the system of record.
- **Licensing and IP:** enable your vendor's public-code-match filter or duplicate detection where available; record the policy decision in the AI usage policy.
- **Metrics:** track change-failure rate and revert rate split by provenance (agent vs human). Rising agent revert rate is a leading indicator to tighten review, not a reason to ban agents.

## Related

- [Coding checklist](../../checklists/README.md#coding-checklist)
- [Coder agent](../../04-agent-engineering/agents/coder.agent.md)
- [Definition of Done](./definition-of-done.md)
- [Native agent hooks](../../handbook/native-agent-hooks.md)
- [Cloud and background agents](../../handbook/cloud-and-background-agents.md)

## Changelog

- **1.2 — 2026-11-06:** Added Why, three-layer enforcement (hooks, CI, review), provenance checklist, diff-size rule, Tradeoffs, Anti-patterns, and Enterprise considerations.
- **1.1 — 2026-07-16:** Initial minimum bar and AI-specific rules.
