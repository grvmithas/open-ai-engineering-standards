# Prompt Quality Standard

> **Applies to:** Every production prompt in this repository and in adopting systems  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Purpose

Set the minimum bar so prompts are reviewable, testable, and safe to run under a harness.

## Authoring convention (OAIES repo)

Production prompts in this repository use XML sections:

`<role>`, `<context>`, `<instructions>`, `<output_format>`, `<constraints>`

This is an **authoring convention for OAIES artifacts**, not a claim that every industry system must emit XML at runtime. Adopters may compile to their platform’s prompt format if the semantic sections survive.

## Minimum bar

### Structure

- [ ] Role states expertise **and** exclusions (what the model must not do)
- [ ] Context is complete for the task and free of irrelevant dumps
- [ ] Instructions are numbered and imperative
- [ ] Output format is explicit; include a concrete skeleton or example
- [ ] Constraints include at least three hard MUST / MUST NOT rules

### Safety

- [ ] Untrusted input is clearly delimited from instructions
- [ ] Tool / side-effect authority is not granted by retrieved text
- [ ] Secrets are never requested into the prompt
- [ ] High-impact actions require human approval language when applicable

### Operations

- [ ] Prompt is versioned (semver or content hash) in the change that ships it
- [ ] At least one evaluation case exists for user-visible prompts
- [ ] Rollback version identified
- [ ] Owner named

### Risk-based extras

| Risk | Extra requirement |
|------|-------------------|
| Multi-file coding | Planning step or link to Planner Pattern |
| Security-sensitive | Explicit threat considerations in output |
| Regulated content | Citation / evidence rules in output format |

## Anti-patterns

See [prompt anti-patterns](../../01-prompt-engineering/anti-patterns/prompt-anti-patterns.md).

## Related

- [XML structured pattern](../../01-prompt-engineering/patterns/xml-structured.md)
- [System prompt template](../../01-prompt-engineering/templates/system-prompt.template.md)
- [Implementation plan prompt](../prompts/implementation-plan.prompt.md)
