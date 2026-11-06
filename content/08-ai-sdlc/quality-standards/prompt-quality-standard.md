# Prompt Quality Standard

> **Applies to:** Every production prompt in this repository and in adopting systems  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Set the minimum bar so prompts are reviewable, testable, and safe to run under a harness.

## Why

A production prompt is code that executes on a non-deterministic interpreter whose version changes under you. Model upgrades, reasoning-effort settings, and context size all shift behavior without a diff in your repository. The only defenses are structure (so reviewers can see intent), evaluation (so regressions are measured, not noticed), and versioning (so you can roll back). Reasoning models also change what a good prompt looks like: they need goals, constraints, and success criteria — not step-by-step "think carefully" scaffolding they already perform internally.

## Authoring convention (AIES repo)

Production prompts in this repository use XML sections:

`<role>`, `<context>`, `<instructions>`, `<output_format>`, `<constraints>`

This is an **authoring convention for AIES artifacts**, not a claim that every industry system must emit XML at runtime. Adopters may compile to their platform’s prompt format if the semantic sections survive.

## How

1. **Draft** with the [system prompt template](../../01-prompt-engineering/templates/system-prompt.template.md); put stable content (role, constraints, tool docs) first and variable content last so provider prompt caching hits.
2. **Constrain output** with the provider's structured-output / JSON-schema mode when a program consumes the result; prose format instructions are a fallback, not a contract.
3. **Evaluate** against a golden set (minimum 20 cases for user-visible prompts) in CI with Promptfoo or DeepEval before merge.
4. **Version** the prompt with the change; record model id and reasoning-effort setting alongside it.
5. **Re-run evals on every model change**, including provider-side alias updates.

## Checklist — minimum bar

### Structure

- [ ] Role states expertise **and** exclusions (what the model must not do)
- [ ] Context is complete for the task and free of irrelevant dumps
- [ ] Instructions are numbered and imperative
- [ ] Output format is explicit; schema-enforced when machine-consumed, otherwise a concrete skeleton or example
- [ ] Constraints include at least three hard MUST / MUST NOT rules
- [ ] Stable sections precede variable sections (cache-friendly ordering)

### Safety

- [ ] Untrusted input is clearly delimited from instructions
- [ ] Tool / side-effect authority is not granted by retrieved text
- [ ] Secrets are never requested into the prompt
- [ ] High-impact actions require human approval language when applicable

### Operations

- [ ] Prompt is versioned (semver or content hash) in the change that ships it
- [ ] Model id (pinned snapshot, not a floating alias) and reasoning-effort recorded
- [ ] At least one evaluation case exists for user-visible prompts
- [ ] Rollback version identified
- [ ] Owner named

### Risk-based extras

| Risk | Extra requirement |
|------|-------------------|
| Multi-file coding | Planning step or link to Planner Pattern |
| Security-sensitive | Explicit threat considerations in output |
| Regulated content | Citation / evidence rules in output format |

## Tradeoffs

| Choice | You gain | You give up |
|---|---|---|
| XML sections | Reviewable intent; reliable section boundaries | Slightly more tokens than terse prose |
| Schema-enforced output | Parse failures become impossible rather than rare | Some providers restrict schema features; refusals must be handled as a separate path |
| Pinned model snapshots | Reproducible behavior | You must schedule upgrades and re-evaluate before snapshot retirement |
| Golden-set CI gate | Regressions caught before users see them | Eval maintenance cost; flaky LLM-judge scores need thresholds, not exact matches |

## Anti-patterns

See [prompt anti-patterns](../../01-prompt-engineering/anti-patterns/prompt-anti-patterns.md). The three that most often survive review:

| Anti-pattern | Why it fails |
|---|---|
| "Think step by step" bolted onto a reasoning model | Redundant with native reasoning; costs tokens and can degrade output |
| Floating model alias in production (`latest`) | Behavior changes with no diff and no eval run |
| Timestamps or request IDs at the top of the system prompt | Breaks prefix caching on every call |

## Enterprise considerations

- **Registry:** production prompts live in version control or a prompt registry with owner, version, model binding, and eval results — the prompt record is audit evidence for ISO/IEC 42001 and NIST AI RMF "Measure" functions.
- **Data handling:** prompts that embed customer data inherit that data's classification; logs and eval datasets follow the same retention and residency rules.
- **Change management:** a prompt change to a user-facing system is a production change; it goes through the same approval path as code.

## Related

- [XML structured pattern](../../01-prompt-engineering/patterns/xml-structured.md)
- [System prompt template](../../01-prompt-engineering/templates/system-prompt.template.md)
- [Implementation plan prompt](../prompts/implementation-plan.prompt.md)
- [Evaluation framework selection](../../07-llmops/evaluation/framework-selection.md)

## Changelog

- **1.2 — 2026-11-06:** Added Why, How (cache ordering, structured outputs, eval gate, model pinning), reasoning-model guidance, Tradeoffs, inline anti-patterns, and Enterprise considerations.
- **1.1 — 2026-07-16:** Initial minimum bar.
