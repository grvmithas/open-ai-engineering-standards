---
name: prompt
description: "Prompt procedure with verification and rollback evidence. Use when a production model instruction, tool-use policy, or structured-output prompt must be authored or changed."
---

# Prompt Skill

> **Skill ID:** `prompt`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when a production model instruction, tool-use policy, or structured-output prompt must be authored or changed.

## Why
A versioned XML prompt, input/output schema, adversarial cases, eval dataset, and release threshold is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A production model instruction, tool-use policy, or structured-output prompt must be authored or changed.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A versioned XML prompt
- input/output schema
- adversarial cases
- eval dataset
- release threshold.

## Procedure
1. Specify task, audience, model/runtime, trusted and untrusted inputs, prohibited behavior, and success metrics.
2. Structure role, context, instructions, output_format, constraints, and scratchpad policy with clear instruction precedence.
3. Use schemas and examples for ambiguous output; separate retrieved/user content from authoritative instructions.
4. Build eval cases for normal, boundary, injection, refusal, ambiguity, and formatting behavior.
5. Compare candidate and baseline on quality, safety, latency, and cost; version and roll back by identifier.

## Verification
Require schema-valid outputs, no instruction leakage, target pass rates by slice, and no safety regression on adversarial cases.

## Unhappy Paths and Recovery
If requirements are underspecified, ask for the decision rather than adding vague language. If one prompt fix harms another slice, revise the contract or route tasks instead of overfitting.

## Concrete Example
Create a support-triage prompt with XML boundaries, JSON schema, prompt-injection cases, abstention policy, and baseline comparison.

## Do Not Use This Skill When
Do not use to encode deterministic validation or authorization that belongs in code.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [OpenAI Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt Engineering](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
