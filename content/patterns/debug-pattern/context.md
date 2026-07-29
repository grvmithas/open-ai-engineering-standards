# Debug Pattern — Context

> **Pattern:** Debug  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Debug pattern may start — and when to refuse to start.

## Required before activation

- [ ] Repro notes or production-shaped signal
- [ ] Relevant logs/traces/metrics (redacted)
- [ ] Recent changes timeline
- [ ] Owner who can verify in the failing environment

## Refuse to start when

- No symptom definition (“it feels slow”)
- Write access requested before hypotheses ranked
- PII-bearing dumps without redaction plan

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Debug** packs.  
- Keep untrusted retrieval out of the Debug system channel.  
- Debug MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Debug

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Debug budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Debug steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Debug context gates (required/refuse) rewritten for this envelope.
