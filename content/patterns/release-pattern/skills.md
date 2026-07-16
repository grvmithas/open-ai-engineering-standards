# Release Pattern — Skills

> **Pattern:** Release  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Why required |
|-------|--------------|
| Progressive delivery / canarying | Bounded exposure with holds |
| Feature flags | Fast kill switch without full redeploy |
| Expand/contract migrations | Rollback-safe schema changes |
| Observability abort signals | Error budget, latency, business probes |
| Supply-chain verification | Digests, provenance, SBOM policy |

## Skill activation triggers

1. **Canarying** — every customer-facing runtime change  
2. **Flags** — when behavior can be gated without redeploy  
3. **Expand/contract** — any schema/data shape change  
4. **Abort signals** — before GO; wire dashboards to criteria  
5. **Supply chain** — every artifact promotion

## Verification that skills worked

- Canary: stages and holds appear in the decision package  
- Flags: named flag with disable owner  
- Migrations: expand listed before app; contract deferred  
- Abort: numeric thresholds present before stage 1  
- Supply chain: digests in the change ticket match runtime
