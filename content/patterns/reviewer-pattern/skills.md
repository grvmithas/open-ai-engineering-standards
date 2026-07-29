# Reviewer Pattern — Skills

> **Pattern:** Reviewer  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Code review](../../03-skill-engineering/skills/code-review.skill.md) | [`skills/code-review.skill.md`](../../03-skill-engineering/skills/code-review.skill.md) | Severity-calibrated findings humans can own |
| [Security](../../03-skill-engineering/skills/security.skill.md) | [`skills/security.skill.md`](../../03-skill-engineering/skills/security.skill.md) | AuthZ, injection, secrets, tool allowlists |
| [Debug](../../03-skill-engineering/skills/debug.skill.md) | [`skills/debug.skill.md`](../../03-skill-engineering/skills/debug.skill.md) | When findings need repro before Block |

## Related agents

- [Reviewer agent](./agent.md)
- [Security agent](../../04-agent-engineering/agents/security.agent.md)

## Skill activation triggers

Run Code review on every AI-touched PR. Escalate to Security when AuthZ, secrets, injection, or tool allowlists change. Escalate to Debug only when a finding needs a failing repro before severity can be set.

## Verification that skills worked

- Each finding cites path:line a human can open
- Critical/High security findings block merge until owned
- Approve is never issued solely because CI is green

## Changelog

- **1.3 (2026-07-29):** Reviewer skill activation and verification rewritten for this envelope.
