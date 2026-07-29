# Migration Pattern — Skills

> **Pattern:** Migration  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Planning](../../03-skill-engineering/skills/planning.skill.md) | [`skills/planning.skill.md`](../../03-skill-engineering/skills/planning.skill.md) | Phased cutover with rollback |
| [DevOps](../../03-skill-engineering/skills/devops.skill.md) | [`skills/devops.skill.md`](../../03-skill-engineering/skills/devops.skill.md) | Promotion, digests, canaries |
| [Testing](../../03-skill-engineering/skills/testing.skill.md) | [`skills/testing.skill.md`](../../03-skill-engineering/skills/testing.skill.md) | Parity and data integrity checks |
| [Security](../../03-skill-engineering/skills/security.skill.md) | [`skills/security.skill.md`](../../03-skill-engineering/skills/security.skill.md) | Data class and access during move |

## Related agents

- [Migration agent](../../04-agent-engineering/agents/migration.agent.md)
- [Planner pattern agent](../planner-pattern/agent.md)

## Skill activation triggers

Run Planning to freeze phases and return paths. Run DevOps for digest-pinned promotion and canaries. Run Testing for parity/integrity windows. Run Security whenever data class or access paths change mid-move.

## Verification that skills worked

- Each phase has an explicit rollback owner and command
- Dual-write or verify window evidence exists before irreversible drops
- Secrets never appear in migration scripts committed to git

## Changelog

- **1.3 (2026-07-29):** Migration skill activation and verification rewritten for this envelope.
