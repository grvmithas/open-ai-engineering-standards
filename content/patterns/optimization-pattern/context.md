# Optimization Pattern — Context

> **Pattern:** Optimization  
> **Component:** context.md  
> **Version:** 1.2 | **Updated:** 2026-07-29

---

## Purpose

Define the **minimum evidence package** required before the Optimization pattern may start — and when to refuse to start.

## Required before activation

- [ ] Baseline metric, method, and window
- [ ] Correctness oracle (tests/evals)
- [ ] Hotspot evidence (profile/trace)
- [ ] Guardrails (p99, error rate, cost)

## Refuse to start when

- Optimize request with no baseline
- Production mutate tools before measurement freeze
- Model-facing path change without evaluation skill

## Trust and data class

- Label segments as trusted, internal, or untrusted for **Optimization** packs.  
- Keep untrusted retrieval out of the Optimization system channel.  
- Optimization MCP enablement follows data class in [mcps.md](./mcps.md).

## Pack shape for Optimization

1. Trigger / AC (human-owned)  
2. Ranked evidence inside the Optimization budget  
3. Constraints and non-goals for this activation  
4. Open questions (empty before irreversible Optimization steps)

## Related

- [Context pattern](../context-pattern/README.md) when packing is itself the hard problem  
- [Prompt](./prompt.md) variable bindings  
- [Skills](./skills.md) activation triggers  

## Changelog

- **1.2 (2026-07-29):** Optimization context gates (required/refuse) rewritten for this envelope.
