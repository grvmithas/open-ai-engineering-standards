# Architecture Pattern — Context

> **Pattern:** Architecture  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Architectural drivers written (problem, forces, constraints)
- [ ] Quality-attribute scenarios listed (e.g. “p99 < 200ms on checkout”)
- [ ] Current-state systems and constraints known
- [ ] Risk level assigned (Low / Medium / High)
- [ ] For High: independent reviewer identified

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- New service, data store, or trust boundary
- Conflicting quality attributes require an explicit trade
- Cross-team or external contracts change
- Decision is hard to reverse within six months
- AI/tool-calling boundary introduced

## Do not apply when

- Local refactor, no new boundary
- Pure bugfix or dependency bump with same topology
- UI-only or docs-only
- Choice among equivalent libraries with identical architecture

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Drivers | Product + eng | Problem, forces, non-goals |
| QA scenarios | SRE / product | Measurable |
| Constraints | Compliance / cost / legacy | Hard limits |
| Current ADRs | Repo | Avoid contradictions |

## Authority boundary

The architect agent drafts ADRs and diagrams. **High-risk approval** requires an independent human reviewer. The agent does not implement feature code or self-approve High-risk decisions.
