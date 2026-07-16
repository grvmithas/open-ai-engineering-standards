# Context Pattern — Skills

> **Pattern:** Context  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path | Why required |
|-------|------|--------------|
| Context curation | context skill in skill-engineering | Rank, trim, label packages |
| Codebase search | harness search tools | Find call sites and schemas |
| Security hygiene | security skill (exclusion subset) | Keep secrets/PII out |

## Skill activation triggers

1. **Curation** — always  
2. **Search** — when seeds are thin or last package had gaps  
3. **Security hygiene** — always before handoff

## Verification that skills worked

- Manifest lists why for every path  
- Exclusions section is non-empty for large repos  
- Scrubber reports clean  
- Consuming agent proceeds without immediate “missing file” thrash
