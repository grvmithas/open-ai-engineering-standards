# Level 1: Prompt Engineering

> **Prerequisites:** Level 0: AI Foundations
> **Goal:** Write prompts that are reliable, structured, and production-ready

---

## Why This Level Exists

Prompt engineering is not about "asking nicely." It is a **software design discipline** — structuring instructions so that they produce consistent, parseable, auditable outputs across thousands of invocations.

This level establishes the **OAIES prompt standard:** XML-structured, role-defined, constraint-driven. One format. Not three.

---

## The OAIES Prompt Format

This is the standard. Not a suggestion.

```xml
<role>
You are a [specific role with expertise].
You [what you do]. You do NOT [what you don't do].
</role>

<context>
[Everything the model needs to know to complete this task.
Structured. No noise. No repeated information.]
</context>

<instructions>
[Numbered, imperative steps. Not prose. Not suggestions.]
1. [First, do X]
2. [Then, do Y]
3. [Finally, verify Z]
</instructions>

<output_format>
[Exact format specification. Include examples for non-obvious formats.]
</output_format>

<constraints>
- [Hard constraint 1 — what the model MUST do]
- [Hard constraint 2 — what the model MUST NOT do]
- [Hard constraint 3 — quality threshold]
</constraints>
```

**Why XML?** Claude and all frontier models are trained with XML-like structure. It creates unambiguous section boundaries that survive long contexts. It is parseable by both humans and code. It is the only format the OAIES standard uses.

---

## Contents

| File | What It Covers |
|------|---------------|
| [patterns/xml-structured.md](./patterns/xml-structured.md) | The XML standard in depth |
| [patterns/chain-of-thought.md](./patterns/chain-of-thought.md) | CoT prompting for reasoning tasks |
| [patterns/few-shot.md](./patterns/few-shot.md) | Few-shot examples for consistency |
| [patterns/role-prompting.md](./patterns/role-prompting.md) | Role definition that works |
| [patterns/instruction-hierarchy.md](./patterns/instruction-hierarchy.md) | System → User → Tool ordering |
| [patterns/constraint-driven.md](./patterns/constraint-driven.md) | Constraints as engineering primitives |
| [patterns/react-pattern.md](./patterns/react-pattern.md) | Reason + Act loops |
| [patterns/reflection.md](./patterns/reflection.md) | Self-critique patterns |
| [patterns/tree-of-thoughts.md](./patterns/tree-of-thoughts.md) | Multi-path reasoning |
| [patterns/planning-first.md](./patterns/planning-first.md) | Plan before executing — always |
| [anti-patterns/](./anti-patterns/) | What NOT to do with evidence |
| [checklists/prompt-quality-checklist.md](./checklists/prompt-quality-checklist.md) | Quality gate for every prompt |
| [templates/system-prompt.template.md](./templates/system-prompt.template.md) | Drop-in system prompt template |

---

## The Instruction Hierarchy

Order matters. Models process instructions in sequence and later instructions can override earlier ones.

**Standard ordering:**
1. **Role definition** (who you are)
2. **Context** (what you know)
3. **Instructions** (what to do)
4. **Output format** (how to respond)
5. **Constraints** (what you must and must not do)
6. **Examples** (what good looks like)

The role and constraints should also appear at the **end** of long system prompts to counter the "lost in the middle" effect.

---

## Planning First

**The most impactful prompt engineering change:** Instruct the model to plan before acting.

```xml
<instructions>
1. Before writing any code, output a detailed plan inside <thinking></thinking> tags
2. In the plan, identify: inputs, expected outputs, edge cases, risks
3. Get explicit approval for the plan (say "Ready to implement. Proceed?")
4. Only after approval, write the implementation
</instructions>
```

This single instruction reduces errors by 40-60% on complex tasks. Apply it universally.

---

## Anti-Patterns

See [anti-patterns/](./anti-patterns/) for full documentation. Summary:

| Anti-Pattern | Symptom | Fix |
|---|---|---|
| Vague instructions | Inconsistent outputs | Use numbered, imperative steps |
| Missing output format | Unparseable responses | Always specify format with example |
| Implicit assumptions | Model makes wrong assumptions | Make everything explicit |
| No constraints | Model goes off-script | Add at least 3 hard constraints |
| Prompt injection surface | User input in system prompt | Sanitize inputs, use XML tags |
| Giant monolithic prompt | Performance degrades over context | Break into structured sections |

---

## Prompt Versioning (Even at Level 1)

Prompts are code. Version them from day one.

```
prompts/
├── story-kickoff.prompt.md        ← v1.0
├── story-kickoff.prompt.v2.md     ← v2.0 (in testing)
└── CHANGELOG.md                   ← Tracks what changed and why
```

When a prompt changes, document: what changed, why, what metric it improved, what regression test covers it.

---

## Readiness Gate

Before proceeding to Level 2, verify:
- [ ] All prompts follow the XML structure standard
- [ ] Every prompt has an output format specification
- [ ] Every prompt has at least 3 constraints
- [ ] Every prompt has a planning step for complex tasks
- [ ] At least one prompt has been tested with adversarial inputs
- [ ] All prompts are version-controlled with changelogs
