# Migration Pattern — Context

> **Pattern:** Migration  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Migration pattern may start — and when to refuse to start.

## Required before activation

- [ ] Phased plan with rollback owners
- [ ] Data class and access paths
- [ ] Parity/integrity checks defined
- [ ] Digest-pinned jobs and environments

## Refuse to start when

- Irreversible drop scheduled without verify evidence
- No dual-write or shadow-read window when required by data class
- Write DB MCP enabled without SELECT-only start

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Migration** packs.  
- Keep untrusted retrieval out of the Migration system channel.  
- Migration MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Migration

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Migration budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Migration steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Migration context gates (required/refuse) rewritten for this envelope.
