# Migration Pattern — Skills

> **Pattern:** Migration  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path | Why required |
|-------|------|--------------|
| Migration planning | [`../../08-ai-sdlc/prompts/migration.prompt.md`](../../08-ai-sdlc/prompts/migration.prompt.md) | Expand/dual/cutover/contract |
| Observability | llmops/observability or SRE practice | Gate on lag/error/latency |
| Data validation | recon query design | Prove equivalence before cutover |

## Skill activation triggers

1. **Migration planning** — always  
2. **Observability** — before dual and cutover  
3. **Data validation** — before cutover approval

## Verification that skills worked

- Plan has all five phase types or an explicit justified skip  
- Gates cite metrics and thresholds  
- Recon output attached to the approval record
