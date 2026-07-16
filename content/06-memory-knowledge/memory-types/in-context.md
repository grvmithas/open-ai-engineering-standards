# In-Context Working Memory

> **Version:** 1.0.0 | **Last updated:** 2026-07-16

## Purpose

Manage ephemeral task context and compaction without making the model context authoritative state.

## Why

Context is bounded, order-sensitive, and exposed to untrusted retrieved content. Summarization can silently remove constraints, negation, and provenance.

## How

Assemble context from authenticated instructions, immutable task state, authorized evidence, and recent interactions with explicit delimiters and provenance. Reserve capacity using measured model/task behavior. Compact at evaluation-derived thresholds into a structured summary containing objectives, decisions, constraints, entities, quantities, unresolved items, permissions, source pointers, and summary lineage; retain authoritative originals outside the prompt. Run compaction-loss tests before replacing context.

## Tradeoffs

More verbatim context preserves detail but increases cost and distraction. Structured compaction saves tokens but requires validation and reversible source references.

## Anti-patterns

- Fixed universal token or “last N messages” rules.
- Destructive summary replacement without replay tests.
- Mixing retrieved data into the instruction channel.

## Enterprise Considerations

Apply classification, redaction, tenant boundaries, and no-log rules before prompt assembly. Provider retention settings do not replace application governance.

## Checklist

- [ ] Context sources are authorized and attributable.
- [ ] Durable state remains external.
- [ ] Compaction is structured, reversible, and evaluated.
- [ ] Prompt logs follow retention and tenant policy.

## References

- [OWASP Prompt Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html)
- [Lost in the Middle](https://arxiv.org/abs/2307.03172) *(research evidence; measure on selected models)*

## Changelog

- **1.0.0 — 2026-07-16:** Initial production standard.
