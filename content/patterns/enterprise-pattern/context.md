# Enterprise Pattern — Context

> **Pattern:** Enterprise  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Enterprise pattern may start — and when to refuse to start.

## Required before activation

- [ ] Data class and tenant model
- [ ] MODEL_POLICY / SoA draft rows
- [ ] Eval gates for user-visible behavior
- [ ] Named owners for allowlists

## Refuse to start when

- Org-wide write tools without SoA
- Shared filesystem roots across tenants
- Compliance claims requested as marketing copy

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Enterprise** packs.  
- Keep untrusted retrieval out of the Enterprise system channel.  
- Enterprise MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Enterprise

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Enterprise budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Enterprise steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Enterprise context gates (required/refuse) rewritten for this envelope.
