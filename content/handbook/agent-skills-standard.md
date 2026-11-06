# The Agent Skills Standard

> **Handbook:** Author skills once, load them in every agent runtime  
> **Repo anchors:** [`03-skill-engineering/skills/`](../03-skill-engineering/README.md) · [Skills vs prompts vs agents](./skills-vs-prompts-vs-agents.md)  
> **Version:** 1.0 | **Updated:** 2026-11-06

---

## Purpose

Specify how AIES skills conform to the open Agent Skills format (`SKILL.md` folders under `.agents/skills/`) so one skill library works across Codex, Cursor, GitHub Copilot, Gemini CLI, opencode, and — via a mirror — Claude Code and Devin Desktop.

## Why

Skills are the procedural layer: *how* to do a task well, loaded only when relevant. Until 2026 every vendor had its own location and format, so teams kept per-tool copies that drifted. The Agent Skills format, now stewarded alongside AGENTS.md and MCP under the Agentic AI Foundation, fixed three things:

1. **One location** — `.agents/skills/<name>/SKILL.md` is read natively by most runtimes.
2. **Progressive disclosure** — runtimes index only `name` + `description` at startup, load the body when the task matches, and open `references/` or run `scripts/` only when the body says so. A 40-skill library costs a few hundred tokens until used.
3. **Validation** — names and descriptions have hard limits, so a linter can reject a malformed skill before it silently fails to load.

## How

### Folder layout

```text
.agents/skills/
  code-review/
    SKILL.md            # required: frontmatter + procedure (< 500 lines)
    references/         # optional: long checklists, API notes — loaded on demand
    scripts/            # optional: deterministic helpers the procedure runs
    assets/             # optional: templates, schemas
```

### Frontmatter rules

| Field | Rule |
|-------|------|
| `name` | 1–64 chars, lowercase letters/digits/single hyphens, **must equal the folder name** |
| `description` | 1–1024 chars; what the skill does **and when to use it** — this is the only text the router sees |
| `license`, `compatibility`, `metadata` | Optional; unknown fields are ignored by compliant runtimes |

```yaml
---
name: code-review
description: "Severity-calibrated code review with file:line findings and a verdict a human can own. Use when a PR or diff is ready for review or a fix claims to resolve an earlier finding."
---
```

### Runtime discovery matrix

| Runtime | Reads `.agents/skills` | Native alternative |
|---------|------------------------|--------------------|
| Codex | Yes (primary) | — |
| Cursor | Yes | `.cursor/skills` |
| GitHub Copilot | Yes | `.github/skills` |
| Gemini CLI | Yes (alias) | `.gemini/skills` |
| opencode | Yes | `.opencode/skills` |
| Claude Code | Mirror required | `.claude/skills` |
| Devin Desktop | Mirror required | `.devin/skills` |

The AIES kit writes the canonical copy to `.agents/skills/` and mirrors only where a runtime requires it. Edit the canonical copy; `create-aies-kit enhance` re-syncs mirrors.

### Writing the body

1. **Trigger conditions** — concrete signals (file types, error shapes, request phrasing).
2. **Procedure** — numbered, imperative, repo-agnostic; reference the repo's own commands via `AGENTS.md` instead of hard-coding them.
3. **Verification** — how the agent proves the procedure worked.
4. **Unhappy path** — what to do when verification fails or inputs are missing.
5. Move anything over ~500 lines into `references/` and link it from the step that needs it.

## Tradeoffs

| Choice | Gain | Cost |
|--------|------|------|
| `.agents/skills` canonical | One library for every runtime | Claude Code/Devin need generated mirrors |
| Short descriptions | Cheap routing; fewer false activations | Must be written carefully — vague text means the skill never fires |
| `scripts/` in skills | Deterministic steps, fewer tokens | Scripts are code: review, pin dependencies, run in sandbox |

## Anti-patterns

- **Description that only names the topic** ("React skill"). The router cannot decide *when*; write "Use when React component state, rendering, or hydration changes."
- **2,000-line SKILL.md.** Defeats progressive disclosure; the whole body loads every time. Split into `references/`.
- **Folder name ≠ `name`.** Strict runtimes skip the skill silently.
- **Hand-edited mirrors.** The `.claude/skills` copy drifts from `.agents/skills`; generate mirrors, never edit them.
- **Secrets or environment-specific hostnames in skills.** Skills are shared across repos and tools; keep them portable.

## Enterprise considerations

- Distribute org-wide skills through plugins/marketplaces or a shared `~/.agents/skills` provisioned by device management; keep repo skills for repo-specific procedure.
- Review `scripts/` with the same supply-chain controls as any executable in the repo.
- Version skills (changelog in the body) so incident reviews can identify which procedure an agent followed.

## Checklist

- [ ] Every skill lives at `.agents/skills/<name>/SKILL.md`
- [ ] `name` matches folder; `description` ≤ 1024 chars and states when to use
- [ ] Body < 500 lines; long material in `references/`
- [ ] Trigger, procedure, verification, unhappy path present
- [ ] Mirrors generated, not edited
- [ ] `npm run kit:check` passes (validates generated skills)

## Changelog

- 2026-11-06: Initial chapter — `.agents/skills` canonical layout, frontmatter limits, discovery matrix.
