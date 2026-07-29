# Legacy Modernization Pattern — Skills

> **Pattern:** Legacy Modernization  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Architecture](../../03-skill-engineering/skills/architecture.skill.md) | [`skills/architecture.skill.md`](../../03-skill-engineering/skills/architecture.skill.md) | Strangler seams and boundaries |
| [Planning](../../03-skill-engineering/skills/planning.skill.md) | [`skills/planning.skill.md`](../../03-skill-engineering/skills/planning.skill.md) | Incremental slices with behavior preservation |
| [Testing](../../03-skill-engineering/skills/testing.skill.md) | [`skills/testing.skill.md`](../../03-skill-engineering/skills/testing.skill.md) | Characterization and golden tests |
| [Context](../../03-skill-engineering/skills/context.skill.md) | [`skills/context.skill.md`](../../03-skill-engineering/skills/context.skill.md) | Legacy doc packs without noise |

## Related agents

- [Architect agent](../../04-agent-engineering/agents/architect.agent.md)
- [Migration agent](../../04-agent-engineering/agents/migration.agent.md)

## Skill activation triggers

Run Architecture to own the strangler boundary before slicing. Run Characterization Testing before behavior-preserving moves. Run Planning for incremental ownership cuts. Run Context to pack legacy docs without drowning the model.

## Verification that skills worked

- Characterization or golden tests cover the seam before rewrite slices
- Each slice names the strangler boundary owner
- Rewrite work never starts without a behavior-preservation gate

## Changelog

- **1.3 (2026-07-29):** Legacy Modernization skill activation and verification rewritten for this envelope.
