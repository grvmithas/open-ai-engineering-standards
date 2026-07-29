# Enterprise Pattern — Skills

> **Pattern:** Enterprise  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Security](../../03-skill-engineering/skills/security.skill.md) | [`skills/security.skill.md`](../../03-skill-engineering/skills/security.skill.md) | Least privilege, injection, tool PEP |
| [Evaluation](../../03-skill-engineering/skills/evaluation.skill.md) | [`skills/evaluation.skill.md`](../../03-skill-engineering/skills/evaluation.skill.md) | Org-wide quality gates |
| [DevOps](../../03-skill-engineering/skills/devops.skill.md) | [`skills/devops.skill.md`](../../03-skill-engineering/skills/devops.skill.md) | Promotion controls and evidence |
| [Context](../../03-skill-engineering/skills/context.skill.md) | [`skills/context.skill.md`](../../03-skill-engineering/skills/context.skill.md) | Tenant isolation in retrieval |

## Related agents

- [Security agent](../../04-agent-engineering/agents/security.agent.md)
- [Release agent](../../04-agent-engineering/agents/release.agent.md)

## Skill activation triggers

Run Security before enabling org-wide tools or write MCP. Run Evaluation for release-blocking quality gates. Run DevOps for promotion evidence. Run Context whenever retrieval can cross tenants.

## Verification that skills worked

- SoA / MODEL_POLICY records tool allowlists and data class
- Write MCP tools are off by default until HITL approval
- Tenant isolation is tested, not assumed, for retrieval paths

## Changelog

- **1.3 (2026-07-29):** Enterprise skill activation and verification rewritten for this envelope.
