# Enterprise Pattern — Subagents

> **Pattern:** Enterprise  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Inventory Registrar | Creates or updates the AI system record | Start / material change | `AI-SYS-####` + field set |
| Data Flow Mapper | Charts data classes, stores, processors, regions | After registration | Data-flow table + residency constraints |
| Control Mapper | Maps tier-mandatory controls to enforcement points | After tier assigned | Control map with evidence IDs |
| Gateway Binder | Translates package to gateway policy and verifies version | Before enablement | Bound bundle hash + drill script |

## Inventory Registrar contract

- One inventory ID per use case; no silent duplicates
- Required fields blocked empty: owners, purpose, data classes, regions, models, tools
- Material changes bump a revision, not a side conversation

## Data Flow Mapper contract

- Label each hop: class, encryption in transit/rest expectation, processor
- Cross-border hops called out explicitly
- “We don’t store prompts” must be verified against logging config

## Control Mapper contract

- Every mandatory control → enforcement point (gateway, IdP, runtime, SIEM)
- Documents may support evidence but cannot be the sole enforcement for musts
- Exceptions need owner, scope, expiry

## Gateway Binder contract

- Emit machine-readable allowlists (models, prompts, tools, routes)
- Verify active version hash matches approved package
- Provide disable procedure that on-call can execute without the author
