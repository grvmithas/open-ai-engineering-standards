# Architecture Pattern — Skills

> **Pattern:** Architecture  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Architecture](../../03-skill-engineering/skills/architecture.skill.md) | [`skills/architecture.skill.md`](../../03-skill-engineering/skills/architecture.skill.md) | Scenario-governed design |
| [Security](../../03-skill-engineering/skills/security.skill.md) | [`skills/security.skill.md`](../../03-skill-engineering/skills/security.skill.md) | Trust boundaries and threat notes |
| [Planning](../../03-skill-engineering/skills/planning.skill.md) | [`skills/planning.skill.md`](../../03-skill-engineering/skills/planning.skill.md) | When design must become an executable plan |

## Related agents

- [Architect agent](../../04-agent-engineering/agents/architect.agent.md)

## Skill activation triggers

Run Architecture when topology or quality-attribute scenarios are undecided. Run Security when trust boundaries or threat notes are missing. Hand off to Planning only after the ADR rejects alternatives explicitly.

## Verification that skills worked

- ADR records at least one rejected alternative with rationale
- Quality-attribute scenarios are named, not implied
- Trust boundaries appear before implementation planning

## Changelog

- **1.3 (2026-07-29):** Architecture skill activation and verification rewritten for this envelope.
