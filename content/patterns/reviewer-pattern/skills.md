# Reviewer Pattern — Skills

> **Pattern:** Reviewer  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path | Why required |
|-------|------|--------------|
| Code review | [`../../03-skill-engineering/skills/code-review.skill.md`](../../03-skill-engineering/skills/code-review.skill.md) | Five-pass procedure and verdict format |
| Security | `03-skill-engineering/skills/security.skill.md` | Trust-boundary and injection review |
| Debug | [`../../03-skill-engineering/skills/debug.skill.md`](../../03-skill-engineering/skills/debug.skill.md) | Reproduce suspected defects before blocking |

## Skill activation triggers

1. **Code review skill** — always for this pattern  
2. **Security skill** — PII, payments, public internet, auth changes, or `IS_AI=yes`  
3. **Debug skill** — when a suspected defect needs reproduction before a Block verdict

## Verification that skills worked

- Code review: all five passes addressed or explicitly scoped out  
- Security: every entry point traced or marked N/A with reason  
- Debug: blocking claims include reproduction steps or “could not reproduce” + residual risk
