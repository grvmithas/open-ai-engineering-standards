# Legacy Modernization Pattern — Skills

> **Pattern:** Legacy Modernization  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path | Why required |
|-------|------|--------------|
| Strangler / seam design | architecture practice | Coexistence without big-bang |
| Characterization testing | test craft | Parity oracles |
| Migration | [`../migration-pattern/`](../migration-pattern/README.md) | Data moves inside a slice |

## Skill activation triggers

1. **Seam design** — always at slice start  
2. **Characterization** — before any traffic above 0%  
3. **Migration pattern** — when the slice moves data stores or schemas

## Verification that skills worked

- Seam ADR exists  
- Parity report completed and linked before ramp  
- Data moves reference migration-pattern gates
