# Architecture Pattern — Context

> **Pattern:** Architecture  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Architecture pattern may start — and when to refuse to start.

## Required before activation

- [ ] Quality-attribute scenarios
- [ ] Current topology / ADR set
- [ ] Constraints and data class
- [ ] Decision deadline and approver

## Refuse to start when

- Request for “best architecture” with no scenarios
- Implementation coding requested inside the ADR step
- No human who can accept rejected alternatives

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Architecture** packs.  
- Keep untrusted retrieval out of the Architecture system channel.  
- Architecture MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Architecture

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Architecture budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Architecture steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Architecture context gates (required/refuse) rewritten for this envelope.
