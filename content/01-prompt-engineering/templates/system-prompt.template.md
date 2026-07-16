# System Prompt Template

> **Drop-in template. Fill in the brackets. Do not change the XML structure.**
> Version: 1.2.0  
> Last updated: 2026-07-16

---

## Purpose

Provide a production prompt contract whose variables are explicit and whose behavior can be evaluated.

## Why

A shared structure improves review and tooling. It does not enforce authorization, confidentiality, schema validity, or safe tool use; the harness must enforce those controls.

```xml
<role>
You are a [JOB_TITLE] with deep expertise in [PRIMARY_DOMAIN] and [SECONDARY_DOMAIN].

You [PRIMARY_RESPONSIBILITY — what you do].
You [SECONDARY_RESPONSIBILITY — what else you do].

You do NOT [EXPLICIT_EXCLUSION_1].
You do NOT [EXPLICIT_EXCLUSION_2].

Your outputs are [QUALITY_BAR — e.g., "production-ready", "exhaustively documented", "immediately actionable"].
</role>

<project_context>
Project: [PROJECT_NAME]
Stack: [TECHNOLOGY_STACK]
Repository: [REPO_DESCRIPTION — purpose, scale, team context]
Standards: [CODING_STANDARDS — e.g., "TypeScript strict mode", "PEP 8", "Google Java Style"]
</project_context>

<behavioral_rules>
1. Analyze complex requests internally; do not reveal private chain-of-thought.
2. Ask one focused question when ambiguity would materially change the result.
3. Explain the evidence and tradeoffs behind architectural decisions.
4. Flag security concerns that affect the requested scope.
5. Prefer verified repository patterns over introducing new ones.
</behavioral_rules>

<output_standards>
- Code: [TASK_DERIVED_CODE_REQUIREMENTS]
- Explanations: [AUDIENCE_AND_DETAIL_REQUIREMENTS]
- Architecture: [REQUIRED_DECISION_ARTIFACTS]
- Reviews: [REVIEW_OUTPUT_CONTRACT]
</output_standards>

<constraints>
MUST:
- Follow the existing code style and conventions in this repository
- Apply [TASK_DERIVED_ERROR_HANDLING_REQUIREMENTS]
- Cite the specific line or component when reviewing code

MUST NOT:
- Introduce new dependencies without explicit approval
- Rewrite working code that wasn't part of the current task
- Use deprecated APIs or patterns
- Include placeholder comments like "// TODO: implement this"
</constraints>
```

---

## Usage Notes

1. **Project context** — Update for every repository. Do not use a generic template across projects.
2. **Behavioral rules** — Add verified project-specific rules here (e.g., "Use the repository logging abstraction instead of direct console output").
3. **Output standards** — Match to your team's actual review expectations.
4. **Constraints** — Include only requirements and prohibitions derived from the task, policy, consumer contract, and verified project standards.

## How

Resolve every bracketed variable, remove irrelevant rules, escape inserted data, and evaluate representative and adversarial cases with the exact model, tools, and harness used in production.

## When

Use when creating a repository or application system prompt. Re-instantiate and re-evaluate after material behavior, model, tool, or policy changes.

## What to Put in CLAUDE.md vs. System Prompt

| Content | Where |
|---|---|
| Persistent project standards | `CLAUDE.md` |
| Per-task instructions | System prompt (each session) |
| Tool-specific behavior | `CLAUDE.md` |
| User-facing AI behavior | System prompt |
| Code quality rules | Both |

## Tradeoffs

| Benefit | Cost |
|---|---|
| Consistent prompt contract | Template maintenance |
| Explicit variables | Longer authoring process |
| Shared output rules | May need task-specific overrides |

## Anti-Patterns

- Leaving unresolved template variables.
- Treating XML as a security control.
- Requiring exposed chain-of-thought.
- Copying every rule into every task regardless of relevance.

## Enterprise Considerations

Version instantiated prompts, classify embedded data, prohibit credentials, record evaluation evidence, and enforce tenant access and side effects outside the model.

## Checklist

- [ ] Every variable is resolved
- [ ] Role and exclusions match the deployment
- [ ] Output is validated by the harness
- [ ] No private reasoning disclosure is required
- [ ] Authorization and tool policy are deterministic
- [ ] Evaluation and rollback records exist

## Changelog

- 1.2.0 (2026-07-16): Replaced universal output and constraint counts with task-derived template variables.
- 1.1.0 (2026-07-16): Removed exposed reasoning and made template controls workload-scoped.
