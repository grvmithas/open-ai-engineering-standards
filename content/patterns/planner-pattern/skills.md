# Planner Pattern — Skills

> **Pattern:** Planner  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Architecture](../../03-skill-engineering/skills/architecture.skill.md) | [`skills/architecture.skill.md`](../../03-skill-engineering/skills/architecture.skill.md) | Topology options, quality attributes, ADR-quality decisions |
| [Planning](../../03-skill-engineering/skills/planning.skill.md) | [`skills/planning.skill.md`](../../03-skill-engineering/skills/planning.skill.md) | Ordered increments, dependencies, verification, rollback |
| [Context](../../03-skill-engineering/skills/context.skill.md) | [`skills/context.skill.md`](../../03-skill-engineering/skills/context.skill.md) | Minimal high-signal packages before planning |

## Related agents

- [Planner agent](./agent.md)
- [Architect agent](../../04-agent-engineering/agents/architect.agent.md)

## Skill activation triggers

Run Architecture while topology or quality attributes are open. Run Planning only after acceptance criteria are locked and the change spans more than one ownership boundary. Run Context when the working pack exceeds budget or lacks trust labels.

## Verification that skills worked

- Every plan row names files, owner, verification command, and rollback
- Coding agents were not started before the plan gate
- Open architecture questions produced ADR-quality options, not a task dump

## Changelog

- **1.3 (2026-07-29):** Planner skill activation and verification rewritten for this envelope.
