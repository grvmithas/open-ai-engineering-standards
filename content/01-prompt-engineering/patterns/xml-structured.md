# XML-Structured Prompting — The AIES Standard

> **This is the only prompt format the AIES standard uses.**  
> **Version:** 1.1 | **Updated:** 2026-11-06

---

## Purpose

Establish a single, unambiguous prompt format that works across all frontier models, produces consistent outputs, and is parseable by both humans and code.

---

## Why XML

Three reasons that override all personal preferences:

1. **Model training alignment.** The Claude, GPT, and Gemini model families are all trained on structured data with XML-like markup. XML section boundaries produce more reliable instruction-following than markdown headers or prose.

2. **"Lost in the middle" resistance.** XML tags mark section boundaries explicitly. Models can locate the `<constraints>` section even in long prompts without losing context of other sections.

3. **Programmatic parseability.** Your harness layer can extract `<output_format>` sections, validate compliance, and strip metadata automatically. Markdown headers cannot be parsed as reliably.

---

## The Complete Template

```xml
<role>
You are a [specific professional role] with deep expertise in [domain].
You [primary function — what you do].
You do NOT [explicit exclusions — what you don't do].
Your outputs are [quality bar — how good they must be].
</role>

<context>
<project>
[Project name, purpose, and relevant technical stack]
</project>

<current_state>
[What exists now — relevant code, docs, or state the model needs]
</current_state>

<objective>
[What we're trying to achieve with this prompt]
</objective>
</context>

<instructions>
[Non-reasoning models only:] Think step by step inside <thinking></thinking> tags before responding.

1. [First action — specific, imperative]
2. [Second action — specific, imperative]
3. [Third action — specific, imperative]
4. [Verify your output against the constraints before responding]
</instructions>

<output_format>
[Exact format. Use an example for non-obvious formats.]

Example:
[Concrete example of expected output]
</output_format>

<constraints>
MUST:
- [Required action or property]
- [Required action or property]

MUST NOT:
- [Forbidden action]
- [Forbidden content or pattern]

QUALITY:
- [Minimum quality threshold]
</constraints>
```

---

## Thinking / Scratchpad

For complex tasks, always require explicit thinking before output:

```xml
<instructions>
First, reason through the problem inside <thinking></thinking> tags.
In your thinking:
- Identify all inputs and their types
- Enumerate edge cases
- Consider failure modes
- Outline your approach

Then provide your final response outside the thinking tags.
</instructions>
```

**Why:** Reasoning before committing to an answer measurably improves accuracy on multi-step tasks. The `<thinking>` block is also a debugging surface — you can see exactly why the model produced a given output.

**Reasoning models:** When the target model has native reasoning enabled (extended/adaptive thinking, reasoning effort), drop the `<thinking>` instruction. The model already reasons internally; control depth with the API's reasoning-effort or thinking-budget parameter and spend prompt tokens on goals, constraints, and success criteria instead. Keep an explicit scratchpad only when you need the reasoning persisted as an audit artifact.

---

## How to adopt

1. Start every new prompt from the [system prompt template](../templates/system-prompt.template.md).
2. Order sections stable → volatile: `<role>`, `<constraints>`, tool docs, then `<context>`, then the user's input — this maximizes provider prompt-cache hits.
3. When a program consumes the output, keep `<output_format>` for humans but enforce the shape with the provider's structured-output / JSON-schema mode.
4. Add the prompt to the eval suite and version it with the change ([Prompt quality standard](../../08-ai-sdlc/quality-standards/prompt-quality-standard.md)).

---

## Constraint Types

Not all constraints are equal. Classify them:

### Hard constraints (MUST / MUST NOT)
Non-negotiable requirements. Violation = invalid output.
```xml
MUST NOT: Include any personally identifiable information in the output.
MUST: Return exactly one JSON object matching the schema.
```

### Soft constraints (PREFER / AVOID)
Quality preferences. Violation = lower quality, not rejection.
```xml
PREFER: Concise responses under 500 words when detail is not required.
AVOID: Using passive voice in user-facing content.
```

### Quality thresholds
Minimum acceptable quality bar.
```xml
QUALITY: Every code example must be complete and runnable without modification.
```

---

## Few-Shot Examples in XML

When consistency is critical, embed examples directly:

````xml
<examples>
<example id="1">
<input>Create a button component</input>
<output>
```typescript
export const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => (
  <button className={styles[variant]} onClick={onClick}>
    {label}
  </button>
);
```
</output>
</example>

<example id="2">
<input>Create an input component</input>
<output>
[Second example]
</output>
</example>
</examples>
````

**Rule:** Use 2-3 examples. More than 5 dilutes attention. Less than 2 is insufficient for complex format requirements.

---

## Anti-Patterns

### ❌ Prose instructions
```xml
# Wrong
"Please analyze the code and let me know if there are any issues, 
focusing on security and performance if possible."

# Correct
<instructions>
1. Analyze the code for security vulnerabilities (OWASP Top 10)
2. Identify performance bottlenecks (algorithmic complexity, N+1 queries)
3. Output findings as a prioritized list with severity (Critical/High/Medium/Low)
</instructions>
```

### ❌ Implicit output format
```xml
# Wrong — what format? length? structure?
"Tell me about the architecture"

# Correct
<output_format>
Return an architecture assessment as:
## Summary (2-3 sentences)
## Strengths (bullet list, max 5)
## Concerns (bullet list with severity)
## Recommendations (numbered, prioritized)
</output_format>
```

### ❌ Role description that describes the user, not the model
```xml
# Wrong — this describes what the USER wants, not who the MODEL is
<role>You are helping a developer who wants to improve their code</role>

# Correct
<role>
You are a principal software engineer specializing in code review.
You identify correctness issues, security vulnerabilities, and performance problems.
You do NOT rewrite code unprompted — you identify issues and explain fixes.
</role>
```

---

## Tradeoffs

| Choice | You gain | You give up |
|---|---|---|
| XML sections everywhere | Reviewable, parseable, cross-model structure | 5–10% more tokens than terse prose |
| One format for all prompts | No per-team style debates; tooling can lint it | Some vendor docs show markdown-style prompts you must translate |
| Explicit `<thinking>` (non-reasoning models) | Auditable reasoning, better multi-step accuracy | Latency and output tokens |

## Enterprise considerations

- XML sections make prompts machine-lintable: CI can verify every production prompt has `<constraints>` with at least three rules and an `<output_format>`, turning the standard into an enforced gate.
- Extracted sections (`<role>`, `<constraints>`) feed the AI system inventory and model cards without manual copy-paste.
- Keep secrets and customer data out of all sections; prompts are logged by most observability stacks.

## Checklist

- [ ] Role is specific, professional, with explicit exclusions
- [ ] Context is complete and noise-free
- [ ] Instructions are numbered and imperative (not suggestions)
- [ ] Output format is explicit with a concrete example
- [ ] At least 3 hard constraints specified
- [ ] Thinking/planning step included for complex tasks on non-reasoning models; reasoning effort set via API for reasoning models
- [ ] Sections ordered stable → volatile for cache hits
- [ ] Prompt tested with adversarial input
- [ ] Prompt versioned with changelog entry

## Changelog

- **1.1 — 2026-11-06:** Repaired broken nested code fences that swallowed the Anti-Patterns section; added reasoning-model guidance, How-to-adopt (cache ordering, structured outputs), Tradeoffs, and Enterprise considerations.
- **1.0:** Initial standard.
