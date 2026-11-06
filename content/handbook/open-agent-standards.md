# Open Agent Standards and the Cross-Tool File Matrix

> **Handbook:** Configure once for every agent runtime your teams use  
> **Repo anchors:** [Agent Skills standard](./agent-skills-standard.md) · [IDE-native subagents](./ide-native-subagents.md) · [Native agent hooks](./native-agent-hooks.md)  
> **Version:** 1.0 | **Updated:** 2026-11-06

---

## Purpose

Name the open standards AIES builds on — AGENTS.md, the Agent Skills format, and the Model Context Protocol — and give the authoritative file matrix for each supported runtime, so a repository is correctly configured for mixed-tool teams.

## Why

Engineering orgs rarely standardize on one agent. A typical team in late 2026 has Cursor and Claude Code users locally, Copilot or Codex cloud agents on PRs, and a few Gemini CLI or Kiro users. Without a shared baseline each tool gets its own instruction file, its own skill copies, and its own MCP config — and they disagree within weeks.

Three artifacts are now governed as vendor-neutral standards under the **Agentic AI Foundation** (Linux Foundation):

| Standard | Solves | AIES rule |
|----------|--------|-----------|
| **AGENTS.md** | Project instructions every agent reads | Canonical; tool-specific files contain deltas only |
| **Agent Skills** (`SKILL.md` folders) | Reusable procedures with progressive disclosure | `.agents/skills/` canonical; mirrors generated |
| **Model Context Protocol** | Tool and data access | Remote Streamable HTTP + OAuth first; config empty until approved |

## How

### The matrix (project scope)

| Runtime | Instructions | Skills | Subagents | Commands | Hooks | MCP config |
|---------|--------------|--------|-----------|----------|-------|------------|
| Claude Code | `CLAUDE.md` (`@AGENTS.md` import) | `.claude/skills/` | `.claude/agents/*.md` | `.claude/commands/*.md` | `.claude/settings.json` | `.mcp.json` |
| Cursor | `AGENTS.md` + `.cursor/rules/*.mdc` | `.agents/skills/` | `.cursor/agents/*.md` | `.cursor/commands/*.md` | `.cursor/hooks.json` | `.cursor/mcp.json` |
| GitHub Copilot | `AGENTS.md` + `.github/copilot-instructions.md` | `.agents/skills/` | `.github/agents/*.agent.md` | `.github/prompts/*.prompt.md` | `.github/hooks/*.json` | `.mcp.json` |
| Codex | `AGENTS.md` | `.agents/skills/` | `.codex/agents/*.toml` | (user-level only) | `.codex/hooks.json` (trust via `/hooks`) | `.codex/config.toml` |
| Gemini CLI | `AGENTS.md` via `context.fileName` | `.agents/skills/` | `.gemini/agents/*.md` | `.gemini/commands/**/*.toml` | `hooks` in `.gemini/settings.json` | `.gemini/settings.json` |
| Kiro | `AGENTS.md` + `.kiro/steering/*.md` | `.kiro/skills/` (no `.agents` alias) | `.kiro/agents/` | manual steering files | `.kiro/hooks/*.json` | `.kiro/settings/mcp.json` |
| Devin Desktop (Windsurf) | `AGENTS.md` + `.devin/rules/*.md` | `.devin/skills/` or `.agents/skills/` | `.devin/agents/` | skills (workflows are deprecated) | `.devin/hooks.v1.json` | `.devin/mcp_config.json` |
| opencode | `AGENTS.md` | `.agents/skills/` | `.opencode/agents/*.md` | `.opencode/commands/*.md` | `.opencode/plugins/*.js` (`tool.execute.before`) | `opencode.json` |

`npx @grvmithas/create-aies-kit@latest --ide <runtime>` writes exactly this layout for the chosen runtime and the shared canon for everyone else.

### Instruction precedence pitfalls

| Pitfall | Effect | Fix |
|---------|--------|-----|
| Claude Code finds `CLAUDE.md` | It does not also read `AGENTS.md` | Put `@AGENTS.md` on the first line of `CLAUDE.md` |
| Duplicated content in tool files | Contradictions after the first edit | Tool files hold deltas only |
| Legacy `.windsurfrules`, `.cursorrules` | Still read, silently override intent | Delete after migrating into `AGENTS.md` / `.devin/rules` / `.cursor/rules` |
| Nested `AGENTS.md` | Scoped to that directory | Use for monorepo packages; keep root file short |

## Tradeoffs

| Choice | Gain | Cost |
|--------|------|------|
| AGENTS.md canonical | One source for 8+ tools | Lowest-common-denominator Markdown; tool features live in delta files |
| Generated per-tool files | No drift | Requires the generator in the workflow (`enhance`) |
| Support many runtimes | Teams choose tools freely | More config surface to review; CODEOWNERS on each tool folder |

## Anti-patterns

- **Five full copies of the same instructions** (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `copilot-instructions.md`, `GEMINI.md`). They diverge on the first edit.
- **Configuring a path the runtime does not read** (e.g., `.claude/prompts/`). Files that load nowhere create false confidence.
- **Assuming user-level config is shared.** Commands and MCP servers in `~/.codex` or `~/.config/devin` are invisible to teammates; commit project-level equivalents or document them.

## Enterprise considerations

- Pin the matrix in your platform docs and re-verify quarterly; vendors move paths (Windsurf → Devin Desktop moved `.windsurf/` to `.devin/` in 2026).
- Prefer standards-based artifacts in procurement criteria: tools that read AGENTS.md, Agent Skills, and MCP reduce lock-in.
- Managed/enterprise settings (policy hooks, managed MCP allowlists) override project files — document which layer owns which control.

## Checklist

- [ ] `AGENTS.md` is canonical and short; tool files contain deltas only
- [ ] `CLAUDE.md` imports `@AGENTS.md`
- [ ] Skills only in `.agents/skills/` (+ generated mirrors)
- [ ] No legacy instruction files left behind
- [ ] Every configured path appears in the matrix above
- [ ] Quarterly vendor-path review scheduled

## Changelog

- **2026-11-06:** Matrix updated for 2026-11: Kiro skills at `.kiro/skills`, Devin skills/hooks/MCP paths (workflows deprecated), Codex/Gemini/opencode hook locations.
- 2026-11-06: Initial chapter — AAIF standards, eight-runtime file matrix, precedence pitfalls.
