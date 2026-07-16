# Debug Pattern — Skills

> **Pattern:** Debug  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path | Why required |
|-------|------|--------------|
| Debug | [`../../03-skill-engineering/skills/debug.skill.md`](../../03-skill-engineering/skills/debug.skill.md) | Characterization → hypotheses → fix → verify |
| RCA | [`../../08-ai-sdlc/prompts/root-cause-analysis.prompt.md`](../../08-ai-sdlc/prompts/root-cause-analysis.prompt.md) | Production incidents needing blameless RCA |
| Code search | harness | Similar-pattern scan |

## Skill activation triggers

1. **Debug skill** — always for this pattern  
2. **RCA prompt** — customer impact, SEV labeling, or post-incident requirement  
3. **Code search** — after root cause is known

## Verification that skills worked

- Debug: ≥3 hypotheses and a regression test  
- RCA: one root cause + owners/due dates on actions (when used)  
- Search: similar-risks table present (even if empty with “none found”)
