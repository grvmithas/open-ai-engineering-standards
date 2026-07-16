# Hotfix Pattern — Skills

> **Pattern:** Hotfix  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Why required |
|-------|--------------|
| Incident command | Roles, cadence, decision log |
| Kill switch / feature flags | Fastest containment |
| Rollback / LKG redeploy | Known-good restore |
| Evidence preservation | Digests, traces, flag audit for RCA |
| Emergency communications | Status without speculation |

## Skill activation triggers

1. **Incident command** — every SEV declare  
2. **Flags / rollback** — before any code hotfix  
3. **Evidence** — before restarting pods or rotating logs aggressively  
4. **Comms** — on SEV1/SEV2 and any customer-visible event  

## Verification that skills worked

- Topic header shows IC + SEV + cadence  
- First mitigating action is containment-class  
- Digests/flag states captured in the timeline  
- Hotfix PR description lists allowed paths only
