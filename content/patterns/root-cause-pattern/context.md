# Root Cause Pattern — Context

> **Pattern:** Root Cause  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Root Cause pattern may start — and when to refuse to start.

## Required before activation

- [ ] Containment complete (or explicitly parallel)
- [ ] Timeline evidence (commits, alerts, traces)
- [ ] Pre-fix signal definition
- [ ] Authority to assign follow-ups

## Refuse to start when

- RCA requested as blame memo
- Write tools that alter historical incident records
- Close without regression test/detector plan

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Root Cause** packs.  
- Keep untrusted retrieval out of the Root Cause system channel.  
- Root Cause MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Root Cause

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Root Cause budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Root Cause steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Root Cause context gates (required/refuse) rewritten for this envelope.
