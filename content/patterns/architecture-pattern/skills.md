# Architecture Pattern — Skills

> **Pattern:** Architecture  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path | Why required |
|-------|------|--------------|
| ADR / architecture design | skill-engineering architecture | Decision structure |
| Architecture review | [`../../08-ai-sdlc/prompts/architecture-review.prompt.md`](../../08-ai-sdlc/prompts/architecture-review.prompt.md) | Independent challenge |
| Security boundaries | security skill | Trust-edge analysis |

## Skill activation triggers

1. **ADR skill** — always  
2. **Architecture review** — Medium/High risk or new trust boundary  
3. **Security** — external, multi-tenant, PII, payments, or AI tools

## Verification that skills worked

- ADR has Context / Decision / Consequences  
- Review outputs APPROVE / CONDITIONS / REJECT  
- Trust findings have owners or block approval
