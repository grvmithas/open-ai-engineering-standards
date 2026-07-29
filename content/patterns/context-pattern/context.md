# Context Pattern — Context

> **Pattern:** Context  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Context pattern may start — and when to refuse to start.

## Required before activation

- [ ] Explicit task and AC
- [ ] Ranked sources with trust labels
- [ ] Size budget and prune list
- [ ] Separation of system instructions vs retrieved data

## Refuse to start when

- Task is unclear and pack is used to compensate
- Untrusted web/issue text requested in system role
- Secrets or credentials present in candidate sources

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Context** packs.  
- Keep untrusted retrieval out of the Context system channel.  
- Context MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Context

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Context budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Context steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Context context gates (required/refuse) rewritten for this envelope.
