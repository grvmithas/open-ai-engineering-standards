# Optimization Pattern — Skills

> **Pattern:** Optimization  
> **Component:** skills.md  
> **Version:** 1.3 | **Updated:** 2026-07-29

---

| Skill | Path | Why required |
|-------|------|--------------|
| [Performance](../../03-skill-engineering/skills/performance.skill.md) | [`skills/performance.skill.md`](../../03-skill-engineering/skills/performance.skill.md) | Profile-guided changes |
| [Testing](../../03-skill-engineering/skills/testing.skill.md) | [`skills/testing.skill.md`](../../03-skill-engineering/skills/testing.skill.md) | Correctness oracle while optimizing |
| [Observability](../../03-skill-engineering/skills/observability.skill.md) | [`skills/observability.skill.md`](../../03-skill-engineering/skills/observability.skill.md) | Baselines and guardrail metrics |
| [Evaluation](../../03-skill-engineering/skills/evaluation.skill.md) | [`skills/evaluation.skill.md`](../../03-skill-engineering/skills/evaluation.skill.md) | When the optimized path is model-facing |

## Related agents

- [Observability agent](../../04-agent-engineering/agents/observability.agent.md)

## Skill activation triggers

Run Performance only after a measured baseline exists. Keep Testing as the correctness oracle while changing hot paths. Use Observability for guardrail metrics. Use Evaluation when the optimized path is model-facing or prompt/tool related.

## Verification that skills worked

- Baseline metric and method are recorded before the first change
- Correctness oracle still passes after the optimization
- p99 or cost guardrails were reviewed if contractual

## Changelog

- **1.3 (2026-07-29):** Optimization skill activation and verification rewritten for this envelope.
