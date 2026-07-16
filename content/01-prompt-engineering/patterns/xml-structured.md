# XML-Structured Prompting — OAIES Authoring Convention

> **OAIES repository prompt artifacts use this convention; adopter runtimes may use tested equivalent structures.**
> **Version:** 1.2.0  
> **Last updated:** 2026-07-16

---

## Purpose

Establish a single convention for prompt artifacts authored in the OAIES repository while defining how equivalent runtime representations can preserve the same semantics.

---

## Why XML

OAIES uses XML in repository-authored prompt files for three operational reasons:

1. **Repository consistency.** One structure reduces review ambiguity and enables shared tooling. It does not guarantee better performance than every other format.

2. **Explicit boundaries.** Tags distinguish sections for readers and parsers. They do not eliminate long-context degradation or prompt injection.

3. **Programmatic parseability.** Repository tooling can extract known sections with a standard XML parser. Other delimiters and provider-native structured APIs are conformant when tests show that they preserve the same boundaries and output contract.

---

## How

Use the complete template below for OAIES-authored prompt artifacts, remove irrelevant optional content, resolve every variable, and validate the instantiated XML before evaluation. At runtime, map these sections to the provider's supported message and structured-output primitives when that representation performs at least as well on the workload gate.

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
Analyze the task internally before responding. Do not reveal private chain-of-thought.

1. [Task-derived action — specific and imperative]
2. [Additional action when required]
3. [Verification required by the acceptance criteria]
</instructions>

<output_format>
[Exact format. Use an example for non-obvious formats.]

Example:
[Concrete example of expected output]
</output_format>

<constraints>
MUST:
- [Each required action or property derived from task or policy]

MUST NOT:
- [Each prohibited action or property derived from task or policy]

QUALITY:
- [Minimum quality threshold]
</constraints>
```

---

## Planning and Verification

When ambiguity, irreversibility, blast radius, cost, or decision authority crosses a defined risk threshold, request a concise plan or verification artifact without requesting private reasoning:

```xml
<instructions>
1. Return a concise plan listing inputs, edge cases, risks, and verification.
2. Analyze privately; do not expose chain-of-thought.
3. Return the final result with evidence and verification outcomes.
</instructions>
```

**Why:** A visible plan is an intentional work product that can be reviewed. Private reasoning is not a stable or complete debugging surface.

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
QUALITY: Code examples must satisfy [TASK_DERIVED_EXECUTABILITY_REQUIREMENTS].
```

---

## Few-Shot Examples in XML

When consistency is critical, embed examples directly:

```xml
<examples>
<example id="1">
<input>Create a button component</input>
<output>
export const Button = ({ label, onClick }: ButtonProps) =&gt; (
  &lt;button onClick={onClick}&gt;{label}&lt;/button&gt;
);
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

**Rule:** Use the smallest evaluated example set that covers representative and boundary cases. No universal example count applies.

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
## Summary
## Strengths relevant to the decision
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

## When

Use XML for OAIES repository prompt artifacts. Runtime integrations may use tested equivalent delimiters, separate message fields, or provider-native structured APIs. Escape or encode inserted values correctly, and treat all inserted untrusted content as data.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Consistent prompt review | More verbose than compact formats |
| Programmatic parsing | Requires correct escaping |
| Explicit section ownership | Does not enforce model behavior |

## Enterprise Considerations

Version prompt schemas, prohibit secrets in templates, classify examples, and validate that XML parsers disable unsafe external entity behavior. Authorization and data isolation remain harness responsibilities.

---

## Checklist

- [ ] Role is specific, professional, with explicit exclusions
- [ ] Context is complete and noise-free
- [ ] Instructions are numbered and imperative (not suggestions)
- [ ] Output format is explicit with a concrete example
- [ ] Applicable constraints are derived from task, policy, and consumer requirements
- [ ] Plan or approval is included only when a defined risk trigger applies
- [ ] Prompt tested with adversarial input
- [ ] Prompt versioned with changelog entry
- [ ] Equivalent runtime representation passes the same workload gate

## Changelog

- 1.2.0 (2026-07-16): Scoped XML to repository authoring, allowed tested equivalent runtime structures, and removed arbitrary counts.
- 1.1.0 (2026-07-16): Removed exposed reasoning requirements and unsupported universal XML claims.
