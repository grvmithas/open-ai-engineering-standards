# Legacy Modernization Pattern — Context

> **Pattern:** Legacy Modernization  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Capability slice chosen (verb + noun, e.g. “price quote”), not “entire monolith”
- [ ] Legacy entry points for that slice identified
- [ ] Business owner who can judge behavioral parity
- [ ] Dual-run / flagging mechanism available
- [ ] Retirement is an explicit goal for the slice

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Production legacy must keep running during replacement
- Rewrite temptation is “stop the world and rebuild”
- Prior modernization stalled at partial parity
- Undocumented rules live in batch/monolith/stored procs

## Do not apply when

- No production predecessor (greenfield)
- Change is a normal feature on a modern service
- Fixing one bug in legacy without replacement intent
- UI-only restyle with same contracts

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Capability map | Product + architecture | Sliced backlog |
| Legacy surface | SME + code/job inventory | Entry points + data stores |
| Parity fixtures | Golden outputs from legacy | Representative + edge cases |
| Risk / regulatory | Compliance | What must not regress |

## Authority boundary

The modernization agent plans seams, parity, and shift. **Business owner** accepts parity. **Traffic 100% and legacy deletion** require named approvals. Agents do not silently retire production systems.
