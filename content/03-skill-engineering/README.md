# Level 3: Skill Engineering

> **Prerequisites:** Level 2: Context Engineering
> **Goal:** Build reusable, discoverable procedural knowledge that agents can invoke

---

## Why Skills Exist

Skills solve a fundamental problem: **how do you give an agent repeatable, high-quality procedures without rebuilding them from scratch in every prompt?**

A skill is a document that encodes HOW to do something — not what to do, not why to do it, but the exact step-by-step procedure for completing a specific type of task reliably.

In Claude Code, skills live in `.claude/skills/` and are automatically discovered. In other systems, they are injected as context when relevant tasks are detected.

---

## Skills vs. Prompts vs. Agents

| Concept | What It Is | When to Use |
|---------|-----------|-------------|
| **Prompt** | A structured instruction for one task | One-off tasks |
| **Skill** | A reusable procedure for a task category | Repeated task types |
| **Agent** | An autonomous actor that uses skills | Complex, multi-step goals |

**Rule:** If you write the same prompt more than twice, extract it as a skill.

---

## Skill Structure (The OAIES Standard)

Every skill file follows this exact structure:

```markdown
# [Skill Name] Skill

## Trigger Conditions
[When this skill should activate — specific patterns, keywords, or task types]

## Purpose
[One sentence: what this skill does]

## Prerequisites
[What must be true before this skill can execute]

## Procedure
[Numbered, imperative steps]

## Verification
[How to confirm the skill executed correctly]

## Common Failures
[What goes wrong and how to recover]

## Examples
[1-2 concrete examples of this skill in action]

## Do Not Use This Skill When
[Anti-trigger conditions]
```

### Compatibility with Open AI Skills Specs (openaiskills.io)
The OAIES skill structure is designed to be fully compatible with emerging open standards for developer assistant skills:
- **openaiskills.io specification:** Standardized, portable markdown format for AI agent skills across the developer ecosystem.
- **Claude Code (.claude/skills):** Built directly to match Claude Code's auto-discovery skill scanner schema.
- **Aider / Roo Code / Cline custom instructions:** Readily consumable by modern coding agents as background runtime knowledge.

---

## Skills Library

### Core Skills
| Skill | Trigger | Purpose |
|-------|---------|---------|
| [architecture.skill.md](./skills/architecture.skill.md) | System design request | Design robust architectures |
| [planning.skill.md](./skills/planning.skill.md) | Feature or task kickoff | Create implementation plans |
| [debug.skill.md](./skills/debug.skill.md) | Bug report or error | Systematic debugging |
| [code-review.skill.md](./skills/code-review.skill.md) | Review request | Comprehensive code review |
| [documentation.skill.md](./skills/documentation.skill.md) | Doc generation request | Generate technical docs |
| [security.skill.md](./skills/security.skill.md) | Security review request | Security audit |
| [performance.skill.md](./skills/performance.skill.md) | Performance concern | Performance analysis and fix |
| [testing.skill.md](./skills/testing.skill.md) | Test generation request | Generate comprehensive tests |

### Language / Framework Skills
| Skill | Trigger |
|-------|---------|
| [react.skill.md](./skills/react.skill.md) | React component work |
| [nextjs.skill.md](./skills/nextjs.skill.md) | Next.js routing, SSR, RSC |
| [node.skill.md](./skills/node.skill.md) | Node.js API development |
| [python.skill.md](./skills/python.skill.md) | Python development |
| [java.skill.md](./skills/java.skill.md) | Java/Spring development |
| [dotnet.skill.md](./skills/dotnet.skill.md) | .NET/C# development |

### Platform Skills
| Skill | Trigger |
|-------|---------|
| [azure.skill.md](./skills/azure.skill.md) | Azure cloud tasks |
| [aws.skill.md](./skills/aws.skill.md) | AWS cloud tasks |
| [devops.skill.md](./skills/devops.skill.md) | CI/CD, infrastructure |

### AI-Specific Skills
| Skill | Trigger |
|-------|---------|
| [prompt.skill.md](./skills/prompt.skill.md) | Prompt writing or review |
| [context.skill.md](./skills/context.skill.md) | Context engineering |
| [rag.skill.md](./skills/rag.skill.md) | RAG system tasks |
| [evaluation.skill.md](./skills/evaluation.skill.md) | AI system evaluation |
| [memory.skill.md](./skills/memory.skill.md) | Memory system design |
| [observability.skill.md](./skills/observability.skill.md) | AI observability setup |

### Quality Skills
| Skill | Trigger |
|-------|---------|
| [accessibility.skill.md](./skills/accessibility.skill.md) | Accessibility review/fix |
| [seo.skill.md](./skills/seo.skill.md) | SEO review/fix |
| [data-engineering.skill.md](./skills/data-engineering.skill.md) | Data pipeline tasks |

---

## Installing Skills (Claude Code)

```bash
# From OAIES
mkdir -p .claude/skills
cp oaies/skills/*.skill.md .claude/skills/

# Verify skills are discovered
# Claude Code reads .claude/skills/ automatically
```

---

## Naming Conventions

```
{domain}.skill.md          # Core skills
{technology}.skill.md      # Technology-specific skills
{platform}.skill.md        # Platform skills
{domain}-{specialization}.skill.md  # Specialized variants
```

---

## Writing a New Skill

1. Identify the task pattern — it must recur at least 3x before warranting a skill
2. Use the standard structure (above)
3. Test with at least 2 different inputs
4. Document trigger conditions precisely — vague triggers cause wrong skill selection
5. Add to the skills index in this README
6. Version with a changelog at the bottom of the file

---

## Anti-Patterns

### ❌ Skill That's Too Broad
```
# Wrong — "development skill" triggers on everything
Trigger Conditions: Any development task

# Correct — specific triggers
Trigger Conditions: 
- "create component", "build component", "new component"
- Request to implement a UI element
- React component generation tasks
```

### ❌ Skill Without Verification Step
If you cannot verify the skill succeeded, you cannot trust its output. Every skill must have a concrete verification procedure.

### ❌ Skill That Encodes One Team's Preferences
Skills become institutional knowledge. Write them to work for any team following OAIES — not for your specific team's idiosyncrasies.

---

## Readiness Gate

Before proceeding to Level 4, verify:
- [ ] At least 5 skills installed for your primary technology stack
- [ ] All skills follow the standard structure
- [ ] Skills have specific, non-overlapping trigger conditions
- [ ] Skills are version-controlled
- [ ] At least one skill has been verified to improve output consistency
