# Release Pattern — Skills

> **Pattern:** Release  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [DevOps](../../03-skill-engineering/skills/devops.skill.md) | [`skills/devops.skill.md`](../../03-skill-engineering/skills/devops.skill.md) | Progressive delivery and abort |
| [Evaluation](../../03-skill-engineering/skills/evaluation.skill.md) | [`skills/evaluation.skill.md`](../../03-skill-engineering/skills/evaluation.skill.md) | Release-blocking eval gates |
| [Observability](../../03-skill-engineering/skills/observability.skill.md) | [`skills/observability.skill.md`](../../03-skill-engineering/skills/observability.skill.md) | Canary signals |
| [Security](../../03-skill-engineering/skills/security.skill.md) | [`skills/security.skill.md`](../../03-skill-engineering/skills/security.skill.md) | Pre-prod threat pass when AI-touched |

## Related agents

- [Release agent](../../04-agent-engineering/agents/release.agent.md)

## Skill activation triggers

Run Evaluation as a release-blocking gate for AI-touched paths. Run DevOps for progressive delivery and abort criteria. Run Observability for canary signals. Run Security for a pre-prod threat pass when prompts, tools, or AuthZ changed.

## Verification that skills worked

- Abort owner and criteria are named before promote
- Image/prompt digests are pinned in the release record
- Eval gate failure blocks candidate promotion

## Changelog

- **1.3 (2026-07-29):** Release skill activation and verification rewritten for this envelope.
