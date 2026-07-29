# Planner Pattern — Context

> **Pattern:** Planner  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Planner pattern may start — and when to refuse to start.

## Required before activation

- [ ] Locked acceptance criteria (testable)
- [ ] Context pack with trust labels and size budget
- [ ] Existing topology / ADR pointers for touched services
- [ ] Hard constraints: perf, security, compliance, data class
- [ ] Named human who can approve or reject the plan

## Refuse to start when

- AC still negotiable or contradictory
- Empty or untrusted context pack
- No owner for irreversible steps (schema, cutover, public API)

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Planner** packs.  
- Keep untrusted retrieval out of the Planner system channel.  
- Planner MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Planner

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Planner budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Planner steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Planner context gates (required/refuse) rewritten for this envelope.
