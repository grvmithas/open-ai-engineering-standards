# Reviewer Pattern — Context

> **Pattern:** Reviewer  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Reviewer pattern may start — and when to refuse to start.

## Required before activation

- [ ] PR diff + planned path list (or explicit delta)
- [ ] Data class and AuthZ surfaces touched
- [ ] Test/eval results relevant to the change
- [ ] Prior review comments still open

## Refuse to start when

- No diff available
- Findings requested without repository access
- Merge already performed and review is post-hoc theater

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Reviewer** packs.  
- Keep untrusted retrieval out of the Reviewer system channel.  
- Reviewer MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Reviewer

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Reviewer budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Reviewer steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Reviewer context gates (required/refuse) rewritten for this envelope.
