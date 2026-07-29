# Hotfix Pattern — Skills

> **Pattern:** Hotfix  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Debug](../../03-skill-engineering/skills/debug.skill.md) | [`skills/debug.skill.md`](../../03-skill-engineering/skills/debug.skill.md) | Fast characterization under pressure |
| [DevOps](../../03-skill-engineering/skills/devops.skill.md) | [`skills/devops.skill.md`](../../03-skill-engineering/skills/devops.skill.md) | Rollback / LKG / flags |
| [Security](../../03-skill-engineering/skills/security.skill.md) | [`skills/security.skill.md`](../../03-skill-engineering/skills/security.skill.md) | When incident is security-class |
| [Observability](../../03-skill-engineering/skills/observability.skill.md) | [`skills/observability.skill.md`](../../03-skill-engineering/skills/observability.skill.md) | Blast-radius signals |

## Related agents

- [Incident response agent](../../04-agent-engineering/agents/incident-response.agent.md)

## Skill activation triggers

Name an IC first. Run Debug for fast characterization without destroying evidence. Prefer DevOps rollback/LKG/flags before speculative patches. Escalate Security when the SEV is security-class. Watch Observability for blast-radius expansion.

## Verification that skills worked

- IC and allowed paths are recorded before the hotfix PR
- Containment or rollback was evaluated before net-new code
- Evidence needed for RCA was preserved (not wiped by restarts)

## Changelog

- **1.3 (2026-07-29):** Hotfix skill activation and verification rewritten for this envelope.
