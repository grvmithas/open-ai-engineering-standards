# Legacy Modernization Pattern — Context

> **Pattern:** Legacy Modernization  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Legacy Modernization pattern may start — and when to refuse to start.

## Required before activation

- [ ] Strangler boundary diagram and owner
- [ ] Characterization/golden test baseline
- [ ] Slice plan with behavior-preservation gates
- [ ] Legacy pack with trust labels (not a dump)

## Refuse to start when

- Rewrite start with zero characterization coverage
- No named seam owner
- Write tools spanning legacy and modern trees in one session

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Legacy Modernization** packs.  
- Keep untrusted retrieval out of the Legacy Modernization system channel.  
- Legacy Modernization MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Legacy Modernization

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Legacy Modernization budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Legacy Modernization steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Legacy Modernization context gates (required/refuse) rewritten for this envelope.
