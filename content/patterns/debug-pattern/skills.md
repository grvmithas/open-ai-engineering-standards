# Debug Pattern — Skills

> **Pattern:** Debug  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Debug](../../03-skill-engineering/skills/debug.skill.md) | [`skills/debug.skill.md`](../../03-skill-engineering/skills/debug.skill.md) | Hypothesis-driven isolation |
| [Testing](../../03-skill-engineering/skills/testing.skill.md) | [`skills/testing.skill.md`](../../03-skill-engineering/skills/testing.skill.md) | Regression tests that prove the fix |
| [Observability](../../03-skill-engineering/skills/observability.skill.md) | [`skills/observability.skill.md`](../../03-skill-engineering/skills/observability.skill.md) | Metrics/traces for prod repro |

## Related agents

- [Coder agent (debug mode)](../../04-agent-engineering/agents/coder.agent.md)

## Skill activation triggers

Run Debug before any patch when the failure is unexplained. Run Observability when the only reliable repro is production-shaped. Run Testing as soon as a hypothesis is confirmed so the fix cannot regress silently.

## Verification that skills worked

- At least two ranked hypotheses existed before the first patch
- Fix is verified in the failing environment, not only locally
- A regression test or monitor would fail on the pre-fix behavior

## Changelog

- **1.3 (2026-07-29):** Debug skill activation and verification rewritten for this envelope.
