# Release Pattern — Context

> **Pattern:** Release  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Release pattern may start — and when to refuse to start.

## Required before activation

- [ ] Pinned digests (image/prompt/config)
- [ ] Abort criteria and owner
- [ ] Eval gate results
- [ ] Canary/monitor plan

## Refuse to start when

- Promote with failing eval on AI paths
- No abort owner
- Unpinned artifacts in the release record

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Release** packs.  
- Keep untrusted retrieval out of the Release system channel.  
- Release MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Release

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Release budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Release steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Release context gates (required/refuse) rewritten for this envelope.
