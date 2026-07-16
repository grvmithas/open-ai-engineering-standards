# XML-Structured Prompting — The OAIES Standard

> **This is the only prompt format the OAIES standard uses.**

---

## Purpose

Establish a single, unambiguous prompt format that works across all frontier models, produces consistent outputs, and is parseable by both humans and code.

---

## Why XML

Three reasons that override all personal preferences:

1. **Model training alignment.** Claude, GPT-4, and Gemini are all trained on structured data with XML-like markup. XML section boundaries produce more reliable instruction-following than markdown headers or prose.

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
Think step by step inside <thinking></thinking> tags before responding.

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

```xml
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
```

**Rule:** Use 2-3 examples. More than 5 dilutes attention. Less than 2 is insufficient for complex format requirements.

---

## Anti-Patterns

### ❌ Prose instructions
```
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
```
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
```
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

## Checklist

- [ ] Role is specific, professional, with explicit exclusions
- [ ] Context is complete and noise-free
- [ ] Instructions are numbered and imperative (not suggestions)
- [ ] Output format is explicit with a concrete example
- [ ] At least 3 hard constraints specified
- [ ] Thinking/planning step included for complex tasks
- [ ] Prompt tested with adversarial input
- [ ] Prompt versioned with changelog entry
