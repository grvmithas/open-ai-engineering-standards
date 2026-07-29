# Root Cause Pattern — Skills

> **Pattern:** Root Cause  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Debug](../../03-skill-engineering/skills/debug.skill.md) | [`skills/debug.skill.md`](../../03-skill-engineering/skills/debug.skill.md) | Evidence-bound causal chain |
| [Documentation](../../03-skill-engineering/skills/documentation.skill.md) | [`skills/documentation.skill.md`](../../03-skill-engineering/skills/documentation.skill.md) | RCA retention |
| [Testing](../../03-skill-engineering/skills/testing.skill.md) | [`skills/testing.skill.md`](../../03-skill-engineering/skills/testing.skill.md) | Regression that would have caught it |
| [Observability](../../03-skill-engineering/skills/observability.skill.md) | [`skills/observability.skill.md`](../../03-skill-engineering/skills/observability.skill.md) | Signal → cause linkage |

## Related agents

- [Knowledge agent](../../04-agent-engineering/agents/knowledge.agent.md)

## Skill activation triggers

Run after containment. Use Debug to bind cause to evidence. Use Observability to connect signals to that cause. Use Testing for the regression that would have caught it. Use Documentation so the RCA survives the next on-call rotation.

## Verification that skills worked

- Causal chain cites timeline evidence, not blame
- Follow-up owners and due dates exist before RCA close
- A regression test or detector would fail on the pre-fix defect

## Changelog

- **1.3 (2026-07-29):** Root Cause skill activation and verification rewritten for this envelope.
