# Changelog — @grvmithas/create-aies-kit

Format: one `## [version] — date` heading per release (the release workflow refuses to publish without it).

## [2.3.0] — 2026-11-06

### Added
- **Definition-of-done gate** (`hooks/aies-done.mjs` + `hooks/aies-done.json`). It is wired to Claude Code `Stop`, Codex `Stop`, Devin `Stop`, Gemini CLI `AfterAgent`, and Cursor `stop` (`followup_message`).
  - When the working tree changed, it runs the detected lint, typecheck, and test commands, and refuses completion with the last 40 lines of failing output.
  - It skips unchanged trees, caches the fingerprint of the last green run, releases after 3 consecutive blocks, and fails open on internal errors.
  - Copilot, Kiro, and opencode have no blocking completion event; the CI gate covers them.
- **Egress self-test** (`hooks/aies-egress-check.mjs` + `hooks/aies-egress.json`) for control AC-06.
  - DNS and TCP probes to non-allowlisted hosts and a raw IP.
  - Wired at session start for `--data-class confidential`. `--require-closed` exits 1 when anything is reachable, and `--json` gives machine-readable output.
- `audit` check `done-gate`. `fix` fills an empty command list from the detected verify commands.
- Guard protects `aies-done.*` and `aies-egress*` files from agent edits and deletion (14 self-test cases).

### Changed
- **`plugin` emits an Agent Plugins 1.0 bundle.** It contains a root `plugin.json` (spec schema), `skills/` (including the commands rendered as skills), and `mcp.json`, which Cursor and Kiro load natively.
  - `.claude-plugin/` carries the Claude manifest, marketplace entry, and hooks (guard plus done gate) at `hooks/claude-hooks.json`.
  - `.codex-plugin/plugin.json` is the Codex manifest.
  - The bundle no longer emits `commands/`.

## [2.2.0] — 2026-11-06

### Fixed
- **`enhance` no longer overwrites your edits.** It previously forced every generated file, silently discarding customized `AGENTS.md`, skills, and agents. Re-running install previously skipped every existing file, so there was no safe upgrade path at all.
- `audit` no longer scores 100 on an unconfigured harness. It now fails on placeholder verify commands, a guard that fails its self-test, a missing eval suite, unwired `hooks/*.hook.sh`, and unmerged `*.aies-new` files.

### Added
- `.aies-kit.json` manifest of SHA-256 hashes for every kit-written file (CRLF-normalized). Upgrades update untouched files, keep edited ones (writing `<file>.aies-new` only when the kit version changed), delete retired files only when untouched, and record the profile so `enhance` no longer parses `AIES.md`.
- Verify-command detection: `package.json` scripts with the right runner (npm/pnpm/yarn/bun), `pyproject.toml`/requirements with uv/poetry/pdm (ruff, flake8, mypy, pyright, pytest), Maven/Gradle wrappers, `.sln`/`.csproj`, `go.mod`, and `Makefile` targets. Detected commands are written into `AGENTS.md`, `AIES_REPO_SCAN.md`, and the CI gate.
- `evals/`: promptfoo harness evals (7 cases: weaken lint, `--no-verify`, push to main, print `.env`, skip the plan, deploy, invent verify commands) with `AGENTS.md` injected as the system prompt and a pinned provider per `--model`; `evals/cases/` for product evals.
- `templates/ci/aies-gates.yml`: merge-blocking jobs for guard self-test + `audit --min-score 100`, the repo's verify commands, and evals when behavior-defining files change.
- `node hooks/aies-guard.mjs --self-test`: 12 fixed deny/allow cases; exits 1 on any mismatch or an invalid rules file.
- `upgrade` alias for `enhance`; `fix` fills detectable verify commands in place.
- Install uses the repo scan for MCP recommendations (previously only `enhance` did).

### Changed
- `mcps/` ships specs only for recommended servers (4–6 instead of 24; ~225 KB → ~40 KB). The full catalog stays online.
- `hooks/*.hook.sh` and `hooks/CONTRACT.md` are no longer installed — no runtime executed them and they depended on `OAIES_*` evidence files nothing produced. Their role moves to the CI gate.
- `AIES.md` and `AIES_REPO_SCAN.md` drop timestamps so re-runs do not churn diffs.

## [2.1.0] — 2026-11-06

### Security
- `aies-guard.mjs` enforces three policies instead of one: shell commands, **writes to the agent's own guardrails** (hook, permission, MCP, editor auto-approve, CI, CODEOWNERS files — the CVE-2025-53773 / MCPoison class), and **reads of secrets** (`.env*`, keys, cloud credentials, registry tokens).
- Fail closed: any guard error denies. Claude Code hooks set `onFailure: "block"`; Cursor hooks set `failClosed: true`.
- Codex `apply_patch` bodies are parsed so every patched file is checked.
- Custom rules gain `"protect"` path patterns alongside `"deny"` command patterns.

### Added
- Hook wiring for Codex (`.codex/hooks.json`), Gemini CLI (`hooks.BeforeTool` in `.gemini/settings.json`), Devin Desktop (`.devin/hooks.v1.json`), and opencode (`.opencode/plugins/aies-guard.js`). All 9 targets except Continue now have native enforcement.
- Claude Code guard covers `Edit|Write|MultiEdit|NotebookEdit` and `Read`; Cursor adds `preToolUse` and `beforeReadFile`; Kiro adds `write` and `read` matchers.
- Kiro skill mirror at `.kiro/skills/` (Kiro does not read `.agents/skills`).
- Devin Desktop MCP config `.devin/mcp_config.json` (empty by default).
- Codex `.codex/config.toml` sets project `sandbox_mode = "workspace-write"` and `approval_policy = "on-request"`.

### Changed
- Devin Desktop commands are emitted as skills (`.devin/skills/<name>/SKILL.md`); workflows are deprecated upstream. The `.devin/skills` skill mirror is dropped because Devin reads `.agents/skills`.
- Codex agent TOML no longer emits `sandbox_mode` (agent files cannot override it; it was silently ignored). Read-only roles carry an explicit read-only instruction; enforcement comes from the parent session's sandbox.

## [2.0.0] — 2026-11-06

### Breaking
- `AGENTS.md` is canonical. Root `copilot-instructions.md` and `aies-hooks.json` are no longer written; `CLAUDE.md` imports `@AGENTS.md`.
- Skills move to `.agents/skills/<name>/SKILL.md` (open Agent Skills standard), mirrored to `.claude/skills` / `.devin/skills` only where required.
- Commands move to native folders (`.cursor/commands`, `.claude/commands`, `.github/prompts`, `.gemini/commands`, `.opencode/commands`, `.devin/workflows`, `.kiro/steering`). `.cursor/prompts` and `.claude/prompts` are gone — runtimes never loaded them.
- `windsurf` now targets Devin Desktop paths (`.devin/rules`, `.devin/workflows`, `.devin/skills`).
- Node ≥ 20.

### Added
- Targets: `codex`, `gemini-cli`, `kiro`, `opencode` (plus aliases `vscode`, `claude`, `gemini`, `devin`).
- Native subagents with enforced privileges: `readonly` (Cursor), tool lists (Claude, Copilot, Gemini), `sandbox_mode` (Codex), `permission` maps (opencode). Ships planner, coder, reviewer, security, testing, prompt-engineer, parallel-implementer.
- `hooks/aies-guard.mjs` wired into Claude Code `PreToolUse`, Cursor `beforeShellExecution`, Copilot `preToolUse`, and Kiro `PreToolUse`; hashed audit log; fail-closed custom rules.
- `scripts/aies-worktree.mjs` + `plans/_TASK_CONTRACT.md` for parallel agents.
- Remote MCP catalog (GitHub, GitLab, Sentry, Linear, Notion, Atlassian, Asana, Supabase) rendered per runtime; empty config by default.
- `plugin` command (Claude Code plugin + marketplace manifest).
- Cloud agent setup: `copilot-setup-steps.yml`, `.cursor/environment.json`.
- `audit --min-score` and `--format json`; audit checks skills, native hooks, task contracts, MCP hygiene; `fix` never overwrites.
- `MODEL_POLICY.md` routes by task class.

### Verification
- Conformance suite (`npm run kit:check`): 9 runtimes × 4 stacks, frontmatter/TOML/JSON validity, guard behavior per hook protocol, layout snapshot.

## [1.3.0]
- Ephemeral `plans/{STORY_ID}-plan.md` + `reviews/{STORY_ID}-code-review.md`; agent hooks shipped; enhance-repo v2.

## [1.2.0]
- Layout fix: cookbook/guides/mcps/templates at repo root.

## [1.1.0]
- Self-contained package (embedded corpus + generator).

## [1.0.0]
- Initial publish (incomplete; do not use).
