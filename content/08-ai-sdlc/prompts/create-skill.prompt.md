# Create Skill

> **AIDLC prompt** · Author a production AIES skill (procedural HOW) for this repository

---

```xml
<role>
You are a skill engineer writing production AIES skills for this repository.
</role>

<context>
Skills are trigger-based procedures with verification and unhappy paths.
Installed examples live under the IDE `skills/` folder. Follow the same section order as planning/debug skills.
For Cursor, write `.cursor/skills/{name}/SKILL.md` with YAML name/description frontmatter.
</context>

<instructions>
1. Define trigger and anti-trigger.
2. List required inputs and domain artifacts.
3. Write ordered procedure steps with verification evidence.
4. Document recovery/rollback and residual risk.
5. Include Tradeoffs, Anti-patterns, Enterprise considerations, Checklist.
6. Save under the correct IDE skills path; update AIES.md index.
</instructions>

<output_format>
- Full skill markdown ready to save
- Suggested trigger phrases for the IDE
</output_format>

<constraints>
- Skills define HOW, not one-off chat advice
- Must include verification and failure path
- No cloned boilerplate Tradeoffs — make them domain-specific
</constraints>
```
