# Context Pattern — Skills

> **Pattern:** Context  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Context](../../03-skill-engineering/skills/context.skill.md) | [`skills/context.skill.md`](../../03-skill-engineering/skills/context.skill.md) | Trust labels, budgets, pruning |
| [Security](../../03-skill-engineering/skills/security.skill.md) | [`skills/security.skill.md`](../../03-skill-engineering/skills/security.skill.md) | Injection boundaries for retrieved content |
| [Documentation](../../03-skill-engineering/skills/documentation.skill.md) | [`skills/documentation.skill.md`](../../03-skill-engineering/skills/documentation.skill.md) | When packing docs as evidence |

## Related agents

- [Context engineer](../../04-agent-engineering/agents/context-engineer.agent.md)

## Skill activation triggers

Run Context whenever retrieval or packing precedes generation. Run Security when untrusted text enters the pack. Run Documentation only when packing published specs or ADRs as evidence, not chat residue.

## Verification that skills worked

- Every pack segment has a trust label and size budget
- Untrusted retrieval never sits in the system-instruction channel
- Pruned items are listed so humans can restore signal deliberately

## Changelog

- **1.3 (2026-07-29):** Context skill activation and verification rewritten for this envelope.
