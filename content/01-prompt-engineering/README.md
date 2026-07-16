# Level 1: Prompt Engineering

> **Prerequisites:** Level 0: AI Foundations
> **Goal:** Write prompts that are reliable, structured, and production-ready
> **Version:** 1.2.0  
> **Last updated:** 2026-07-16

---

## Why This Level Exists

Prompt engineering is not about "asking nicely." It is a **software design discipline** — structuring instructions so that they produce consistent, parseable, auditable outputs across thousands of invocations.

This level establishes the **OAIES repository authoring convention:** prompt artifacts committed to this repository use XML sections so contributors and tooling share one representation. Systems adopting OAIES conform to the normative behavior below; they may use tested equivalent delimiters or provider-native structured APIs.

## Purpose

Define a consistent prompt contract and the evaluation controls required to release it safely.

## How

Use the OAIES XML structure as a repository convention, then validate its behavior on the deployed model and workload. Delimiters improve organization; schemas, authorization, isolation, and execution gates provide enforceable guarantees.

## When

Apply the normative kernel to production prompt contracts and re-run relevant gates after prompt, model, schema, tool, retrieval, or policy changes. Use XML for prompt artifacts authored in this repository.

---

## Authoring Convention and Normative Kernel

OAIES repository prompt files use XML for consistent review and tooling. Adopter systems may use XML, tested equivalent delimiters, separate message fields, or provider-native structured-output APIs.

System conformance requires:

1. Trusted instructions are distinguishable from untrusted data.
2. Task requirements and applicable constraints are explicit.
3. Machine-consumed output is validated against a schema or equivalent contract.
4. Authorization, data isolation, and side-effect policy are enforced outside the model.
5. Representative and adversarial evaluations pass defined workload thresholds.
6. Prompt, model, schema, tool, and retrieval dependencies are versioned sufficiently for rollback.

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
- [Each task-derived requirement or prohibition]
</constraints>
```

**Why XML here?** XML gives this repository one human-readable, machine-parseable convention with explicit section boundaries. It is not inherently secure, is not a universal conformance requirement, and is not guaranteed to outperform alternatives; evaluate the deployed representation on the target workload.

---

## Contents

| File | What It Covers |
|------|---------------|
| [patterns/xml-structured.md](./patterns/xml-structured.md) | OAIES authoring convention and equivalent runtime representations |
| [patterns/chain-of-thought.md](./patterns/chain-of-thought.md) | Verifiable reasoning without exposed chain-of-thought |
| [patterns/few-shot.md](./patterns/few-shot.md) | Few-shot examples for consistency |
| [patterns/role-prompting.md](./patterns/role-prompting.md) | Role definition that works |
| [patterns/instruction-hierarchy.md](./patterns/instruction-hierarchy.md) | System → User → Tool ordering |
| [patterns/constraint-driven.md](./patterns/constraint-driven.md) | Constraints as engineering primitives |
| [patterns/react-pattern.md](./patterns/react-pattern.md) | Reason + Act loops |
| [patterns/reflection.md](./patterns/reflection.md) | Self-critique patterns |
| [patterns/tree-of-thoughts.md](./patterns/tree-of-thoughts.md) | Multi-path reasoning |
| [patterns/planning-first.md](./patterns/planning-first.md) | Risk-based planning before material execution |
| [anti-patterns/prompt-anti-patterns.md](./anti-patterns/prompt-anti-patterns.md) | What NOT to do with evidence |
| [checklists/prompt-quality-checklist.md](./checklists/prompt-quality-checklist.md) | Risk-based prompt quality gate |
| [templates/system-prompt.template.md](./templates/system-prompt.template.md) | Drop-in system prompt template |

---

## The Instruction Hierarchy

Instruction authority is determined by the provider's message hierarchy, not by a universal “later wins” rule. Within a message, clear structure and conflict-free instructions improve interpretation but do not create a security boundary.

**Standard ordering:**
1. **Role definition** (who you are)
2. **Context** (what you know)
3. **Instructions** (what to do)
4. **Output format** (how to respond)
5. **Constraints** (what you must and must not do)
6. **Examples** (what good looks like)

For long prompts, test placement on representative tasks. A concise final task reminder may help some workloads; duplicating policy is not a substitute for deterministic controls.

---

## Planning First

Require a visible plan before ambiguous, expensive, destructive, or high-impact execution. Do not add an approval round trip to trivial reversible work.

```xml
<instructions>
1. Before writing code, return a concise implementation plan
2. Identify inputs, expected outputs, edge cases, risks, and verification
3. Get explicit approval for the plan (say "Ready to implement. Proceed?")
4. Only after approval, write the implementation
</instructions>
```

Measure planning effects on your task distribution. Do not require or retain private chain-of-thought; plans are deliberate, reviewable work products.

---

## Anti-Patterns

See [prompt anti-patterns](./anti-patterns/prompt-anti-patterns.md) for full documentation. Summary:

| Anti-Pattern | Symptom | Fix |
|---|---|---|
| Vague instructions | Inconsistent outputs | Use numbered, imperative steps |
| Missing output contract | Unreliable downstream handling | Specify and validate the format required by the consumer |
| Implicit assumptions | Model makes wrong assumptions | Make everything explicit |
| Missing task constraints | Model violates acceptance criteria | Derive constraints from task, policy, and consumer requirements |
| Prompt injection impact | Untrusted content reaches privileged tools | Isolate content; authorize every action |
| Giant monolithic prompt | Performance degrades over context | Break into structured sections |

---

## Prompt Versioning (Even at Level 1)

Prompts are code. Version them from day one.

```text
prompts/
├── story-kickoff.prompt.md        ← v1.0
├── story-kickoff.prompt.v2.md     ← v2.0 (in testing)
└── CHANGELOG.md                   ← Tracks what changed and why
```

When a prompt changes, document: what changed, why, what metric it improved, what regression test covers it.

## Tradeoffs

| Decision | Benefit | Cost |
|---|---|---|
| One XML convention | Consistent review and tooling | Requires migration and evaluation |
| Explicit schema | Predictable integration | Validator maintenance |
| Risk-based planning | Alignment for material changes | Additional latency |

## Enterprise Considerations

Version prompts with model, tool, schema, and retrieval dependencies. Store evaluation evidence, apply data classification to examples, and enforce permissions outside the model.

---

## Readiness Gate

Before proceeding to Level 2, verify:
- [ ] OAIES repository prompt artifacts use the XML authoring convention
- [ ] Runtime prompt representations preserve trusted-instruction and untrusted-data boundaries
- [ ] Machine-consumed outputs have a validated schema or equivalent contract
- [ ] Constraints are derived from task, policy, and consumer requirements
- [ ] Planning and approval are required only by defined risk triggers
- [ ] Representative and adversarial evaluations meet workload thresholds
- [ ] Authorization, isolation, and side-effect controls are enforced outside the model
- [ ] Prompt dependencies are versioned and rollback is tested

## Changelog

- 1.2.0 (2026-07-16): Distinguished the XML authoring convention from system conformance and aligned gates to the normative kernel.
- 1.1.0 (2026-07-16): Completed corpus, scoped planning claims, and made authorization/isolation deterministic.
