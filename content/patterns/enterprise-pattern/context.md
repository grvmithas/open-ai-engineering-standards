# Enterprise Pattern — Context

> **Pattern:** Enterprise  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Named business owner and technical owner for the use case
- [ ] Data classes in scope identified (and “none / synthetic only” is explicit if true)
- [ ] Jurisdictions / residency constraints known
- [ ] Risk-tier rubric exists (or this engagement adopts the org standard)
- [ ] There is a policy enforcement point (API gateway, AI gateway, agent runtime allowlist)
- [ ] Logging destination capable of retaining prompts/tool calls per retention policy (redaction rules included)

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Production or production-like data will be processed
- AI output influences access, money, health, safety, employment, or legal rights
- Multi-tenant or multi-region shared platform
- Agents/tools can mutate external systems
- Executive or risk asks for a go-live gate with evidence

## Do not apply when

- Throwaway prototype on synthetic data, no production path planned
- Offline analysis with no automated action and no customer exposure
- Use case already has a current inventory entry — **update** it via this pattern’s workflow rather than creating a duplicate system
- SEV containment in progress — disable first, govern after

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Use-case description | Product / eng | Users, actions, success metric |
| Data flow | Security / privacy | Classes, stores, processors, regions |
| Model/vendor list | Platform | Versions, regions, DPA status |
| Tool/MCP catalog | Platform | Allowlist + auth mode |
| Risk rubric | Risk / AI governance | Tier definitions + required controls |
| Incident contacts | On-call roster | 24×7 path for high tier |

## Authority boundary

The governance agent **drafts the go-live package**. Risk/privacy/security humans assign tier acceptance. Platform humans bind the gateway. Nobody “self-certifies” high-risk enablement from a markdown file alone.
