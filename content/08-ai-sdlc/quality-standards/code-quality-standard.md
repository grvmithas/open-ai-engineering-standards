# Code Quality Standard

> **Applies to:** Human- and AI-authored production code  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Purpose

AI speed must not lower the bar. Code from agents is held to the **same** standard as human code — often higher on tests and plan conformance.

## Minimum bar

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

### Types and tooling

- [ ] No `any` / untyped public APIs without an explicit waiver
- [ ] Lint and typecheck clean for touched packages
- [ ] Formatting matches repo defaults

## AI-specific rules

1. **Plan conformance** — unexpected files require a plan revision, not a shrug  
2. **No drive-by refactors** — out-of-scope cleanup belongs in its own change  
3. **Cite sources** — when copying patterns from the codebase, match local idioms  
4. **Prove it** — agent claims of “tests pass” must match CI, not chat transcript  

## Related

- [Coding checklist](../../checklists/README.md#coding-checklist)
- [Coder agent](../../04-agent-engineering/agents/coder.agent.md)
- [Definition of Done](./definition-of-done.md)
