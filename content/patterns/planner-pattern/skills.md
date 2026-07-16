# Planner Pattern — Skills

> **Pattern:** Planner  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path | Why required |
|-------|------|--------------|
| Architecture | `03-skill-engineering/skills/` (architecture) | Design options, quality attributes, ADR-quality decisions |
| Planning / decomposition | planning skill | Ordered increments, dependency-respecting sequences |
| Context curation | context skill | Minimal high-signal packages for the planner |

## Skill activation triggers

1. **Architecture skill** — when more than one viable topology exists, or a quality-attribute scenario is at risk  
2. **Planning skill** — always for this pattern; produces the sequence and file map  
3. **Context skill** — when context > model comfort zone or noise is high; curate before planning

## Verification that skills worked

- Architecture: rejected alternatives are named with reasons  
- Planning: sequence has no forward references to undefined steps  
- Context: planner does not request files that should already be in the package
