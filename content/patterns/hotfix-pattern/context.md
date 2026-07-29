# Hotfix Pattern — Context

> **Pattern:** Hotfix  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Hotfix pattern may start — and when to refuse to start.

## Required before activation

- [ ] Named IC
- [ ] Symptom + blast-radius signals
- [ ] Allowed path list for the hotfix
- [ ] Containment options (rollback/LKG/flag) evaluated

## Refuse to start when

- Write tools without IC
- Out-of-path edits “while we are here”
- Unredacted customer payloads into model/MCP

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Hotfix** packs.  
- Keep untrusted retrieval out of the Hotfix system channel.  
- Hotfix MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Hotfix

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Hotfix budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Hotfix steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Hotfix context gates (required/refuse) rewritten for this envelope.
