---
name: code-review
description: "Severity-calibrated code review with file:line findings, remediations, and a verdict a human can own; verifies claimed fixes and never merges. Use when a PR or diff is ready for review, AI-generated code needs a second pass, or a fix claims to resolve an earlier finding."
---

# Code Review Skill

> **Skill ID:** `code-review`  
> **Version:** 1.3 | **Updated:** 2026-11-06  
> **Install:** `.agents/skills/code-review/SKILL.md`  
> **Handbook:** [`handbook/pr-review-with-ai.md`](../../handbook/pr-review-with-ai.md)  
> **Pattern:** [`patterns/reviewer-pattern/README.md`](../../patterns/reviewer-pattern/README.md)

---

## Trigger

Activate when any of these are true:

- A human asks for a PR / diff review
- A coder agent claims “ready for review”
- CI attached a diff and acceptance criteria
- A security or plan-conformance check is requested before merge

Do **not** activate for “rewrite this feature” — that is coding, not review.

---

## Purpose

Produce a **severity-calibrated** review: concrete file:line findings, remediations, and a verdict a human can own. Verify claimed fixes. Do not merge.

## Why

Agent-generated changes arrive faster than humans can read them line by line, and they fail in characteristic ways: plausible code that ignores the plan, tests weakened to pass, and security shortcuts. An unstructured "LGTM" review misses all three. A fixed multi-pass procedure with severity calibration finds those failures, keeps reviewers from drowning in nits, and leaves a verdict a human can sign.

---

## Inputs required

| Input | Why |
|-------|-----|
| Diff or PR URL | What changed |
| Acceptance criteria / story | Intent |
| Approved plan (if multi-file) | Plan conformance |
| Test commands + results | Evidence, not vibes |
| Risk profile | Depth of security/perf passes |

Missing AC → stop and request it. Missing plan on a multi-service change → escalate.

---

## Procedure

```mermaid
flowchart TD
  A[Load AC + plan + diff] --> B[Pass 1: Intent & plan conformance]
  B --> C[Pass 2: Correctness & edge cases]
  C --> D[Pass 3: Security & authz]
  D --> E[Pass 4: Performance & cost]
  E --> F[Pass 5: Tests & observability]
  F --> G[Severity + verdict]
  G --> H{Critical/High open?}
  H -->|Yes| I[Request changes]
  H -->|No| J[Approve or approve-with-nits]
```

### Pass 1 — Intent and plan conformance

- Does the diff match the approved plan paths? Unexpected files → finding (Major+) unless plan revision linked.
- Does each AC have evidence (test or explicit manual protocol)?
- Drive-by refactors outside scope → Major (process debt).

### Pass 2 — Correctness

- Happy path and failure paths
- Null/empty/boundary behavior
- Error handling that does not swallow security-relevant failures
- UI: loading/error/empty states; a11y for new interactive controls

### Pass 3 — Security (invoke [`security.skill.md`](./security.skill.md) for deep pass)

- AuthZ on new/changed routes and tools
- Injection (SQL, XSS, prompt injection into tools)
- Secrets / PII in logs or client bundles
- SSRF / unsafe URL fetch from user input

### Pass 4 — Performance and cost

- N+1, unbounded lists, sync work on request path
- For AI features: token fan-out, unbounded tool loops, missing budgets

### Pass 5 — Tests and operability

- Behavior tests exist for new logic
- Eval cases for user-visible model behavior (link to [`evals handbook`](../../handbook/evals-as-quality-gates.md) when present)
- Metrics/logs sufficient to detect the failure modes in the plan

---

## Output format

```markdown
## Code Review

**PR / change:** <id or paths>
**Summary:** <1–2 sentences>
**Verdict:** Approve | Approve with nits | Request changes | Block
**Plan conformance:** Yes | Delta <link> | N/A (single-file)

### Critical (must fix)
- **path:line** — Issue — Fix — Evidence

### High
- ...

### Medium
- ...

### Low / nit
- ...

### Verified claims
- Claim: "tests pass" → Evidence: <CI URL or command output summary>

### Positive
- <specific good practice>
```

---

## Verification (skill succeeded when)

- [ ] All five passes considered (or explicitly N/A with reason)
- [ ] Every Critical/High has path + fix
- [ ] At least one positive note when the change is non-trivial
- [ ] Verdict matches open severity (no Approve with open Critical)
- [ ] Claimed test/eval results are checked, not trusted from chat

---

## Unhappy path

| Failure | Recovery |
|---------|----------|
| Diff too large to review well | Demand split or plan slices; Block |
| Author “fixed” without showing evidence | Re-open High; require command output |
| Model invented a finding | Delete finding; never bluff file:line |
| Security Critical | Escalate to security owner; Block |

---

## Tradeoffs
Five-pass severity-calibrated review is slower than a vibe check, but produces file:line findings a human can own and forbids Approve with open Critical/High. Oversized diffs force split or Block rather than shallow review—merge throughput drops; undetected AuthZ and plan-conformance defects drop more.

## Anti-Patterns
- Approving because “tests pass” without verifying CI evidence against acceptance criteria.
- Nitpicking style while missing AuthZ gaps, injection, or secrets on new routes and agent tools.
- Inventing `path:line` findings that cannot be cited from the loaded diff.
- Implying merge authority from the review skill—reviewers advise; owners merge.
- Rubber-stamping Approve-with-nits while Critical or High findings remain open.

## Enterprise Considerations
Auth, payments, PII, and agent-tool surfaces require a named security or domain reviewer before merge. Retain verdict, severity list, and claim-verification evidence on the PR for audit. Separation of duties: the author cannot be the sole approver on Critical-path changes.

## Changelog
- **1.3 — 2026-11-06:** Added Why section.
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **1.2 (2026-07-29):** Added Tradeoffs, Anti-Patterns, and Enterprise Considerations with code-review-domain content (severity calibration, claim verification, SoD).

---

## Related repo files

- Reviewer pattern: [`content/patterns/reviewer-pattern/`](../../patterns/reviewer-pattern/README.md)
- Security skill: [`security.skill.md`](./security.skill.md)
- React review checklist: [`content/cookbook/react/checklists/code-review.md`](../../cookbook/react/checklists/code-review.md)
- Definition of Done: [`content/08-ai-sdlc/quality-standards/definition-of-done.md`](../../08-ai-sdlc/quality-standards/definition-of-done.md)
