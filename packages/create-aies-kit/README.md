# @grvmithas/create-aies-kit

Scaffold the AIES harness into your repository in the **native formats each agent runtime actually loads** — `AGENTS.md`, open-standard skills, subagents, commands, enforcing hooks, MCP config, and a parallel-worktree helper. No `.aies/` folder.

```bash
npx @grvmithas/create-aies-kit@latest \
  --stack nextjs --ide claude-code --role fullstack \
  --maturity intermediate --goal new-product \
  --model claude --data-class internal --yes
```

Install reads your repository first: `AGENTS.md` gets your real lint / typecheck / test / build commands (from `package.json` scripts with the right package manager, `pyproject.toml` with uv/poetry/pdm, Maven/Gradle wrappers, `.sln`/`.csproj`, `go.mod`, or `Makefile` targets), and `mcps/` gets specs only for the servers your stack needs.

Later, upgrade and rescan:

```bash
npx @grvmithas/create-aies-kit@latest enhance     # alias: upgrade — refreshes the harness, keeps your edits
```

…and run the `enhance-repo` command in your agent for conventions a scan cannot infer (`/enhance-repo` in Cursor, Claude Code, Copilot, opencode; `/aies:enhance-repo` in Gemini CLI).

## Your edits are safe

`.aies-kit.json` records a hash of every file the kit wrote. Re-running install or `enhance`:

| Your file is… | The kit… |
|---|---|
| Untouched | Updates it to the new kit version |
| Edited, kit version unchanged | Leaves it alone |
| Edited, kit version changed | Leaves it alone; writes the new version to `<file>.aies-new` for you to merge |
| Retired by the new kit version, untouched | Deletes it |
| Retired, edited | Leaves it in place and tells you |

`--force` replaces edited files with the kit version. Commit `.aies-kit.json`; add `*.aies-new` and `hooks/logs/` to `.gitignore`.

## Runtimes

| `--ide` | Instructions | Skills | Subagents | Commands | Native hook | MCP config |
|---|---|---|---|---|---|---|
| `cursor` | `AGENTS.md` + `.cursor/rules/aies.mdc` | `.agents/skills` | `.cursor/agents/*.md` | `.cursor/commands` | `.cursor/hooks.json` | `.cursor/mcp.json` |
| `claude-code` | `CLAUDE.md` → `@AGENTS.md` | `.agents/skills` + `.claude/skills` | `.claude/agents/*.md` | `.claude/commands` | `.claude/settings.json` | `.mcp.json` |
| `copilot` | `AGENTS.md` + `.github/copilot-instructions.md` | `.agents/skills` | `.github/agents/*.agent.md` | `.github/prompts` | `.github/hooks/aies-guard.json` | `.mcp.json` |
| `codex` | `AGENTS.md` | `.agents/skills` | `.codex/agents/*.toml` | `prompts/` | `.codex/hooks.json` (trust via `/hooks`) | `.codex/config.toml` |
| `gemini-cli` | `AGENTS.md` via `.gemini/settings.json` | `.agents/skills` | `.gemini/agents/*.md` | `.gemini/commands/aies/*.toml` | `hooks.BeforeTool` in `.gemini/settings.json` | `.gemini/settings.json` |
| `kiro` | `AGENTS.md` + `.kiro/steering` | `.agents/skills` + `.kiro/skills` | — | `.kiro/steering/aies-*.md` (manual) | `.kiro/hooks/aies-guard.json` | `.kiro/settings/mcp.json` |
| `windsurf` (Devin Desktop) | `AGENTS.md` + `.devin/rules` | `.agents/skills` | — | `.devin/skills/<name>/SKILL.md` | `.devin/hooks.v1.json` | `.devin/mcp_config.json` |
| `opencode` | `AGENTS.md` | `.agents/skills` | `.opencode/agents/*.md` | `.opencode/commands` | `.opencode/plugins/aies-guard.js` | `opencode.json` |
| `continue` | `AGENTS.md` + `.continue/rules` | `.agents/skills` | — | `.continue/prompts` | — | `.continue/mcpServers/aies.json` |

Aliases: `vscode`→`copilot`, `claude`→`claude-code`, `gemini`→`gemini-cli`, `devin`→`windsurf`.

## What every install gets

| Path | Purpose |
|------|---------|
| `AGENTS.md` | Canonical instructions (every runtime reads it or imports it) |
| `AIES.md` | Operator guide: profile, plans, commands, skills, hooks, MCP, worktrees |
| `MODEL_POLICY.md` | Model routing by task class + data-class rules |
| `.agents/skills/<name>/SKILL.md` | Open Agent Skills standard (`name` = folder, trigger-style `description`) |
| `hooks/aies-guard.mjs` | Dependency-free guard: denies force pushes, pushes to protected branches, `reset --hard`, pipe-to-shell, destructive SQL, publishes/deploys, edits to its own guardrails, secret reads. Fails closed. `--self-test` proves it in CI. Extend via `hooks/aies-guard.rules.json` |
| `hooks/aies-done.mjs` · `hooks/aies-done.json` | Definition-of-done gate on the runtime's completion event (Claude Code, Codex, Devin `Stop`; Gemini `AfterAgent`; Cursor `stop`): when the working tree changed, runs your verify commands and sends the agent back with the failing output. Skips Q&A turns, caches green results, releases after 3 consecutive blocks, fails open. `AIES_DONE_SKIP=1` bypasses it |
| `hooks/aies-egress-check.mjs` · `hooks/aies-egress.json` | Network-isolation self-test (control AC-06): DNS and TCP probes to non-allowlisted hosts and a raw IP. Wired at session start for `--data-class confidential`; `--require-closed` exits 1 when anything is reachable |
| `evals/` | promptfoo harness evals: seven cases that check the `AGENTS.md` non-negotiables hold under pressure (weaken lint, `--no-verify`, push to main, print `.env`, skip the plan, deploy, invent verify commands). Add product evals under `evals/cases/` |
| `templates/ci/aies-gates.yml` | Merge-blocking CI: guard self-test + `audit --min-score 100`, your repo's verify commands, and evals when behavior-defining files change. Copy to `.github/workflows/` |
| `scripts/aies-worktree.mjs` | `new` / `list` / `check` / `overlap` / `remove` for one-task-one-worktree parallel agents (max 4), with per-slot ports and DB schema |
| `plans/_TEMPLATE.md` · `plans/_TASK_CONTRACT.md` | Ephemeral per-story plans and per-task contracts (allowed/prohibited paths, acceptance, stop conditions) |
| `reviews/` | `{STORY_ID}-code-review.md` reports |
| `mcps/recommended.json` · `mcps/<spec>.mcp.md` | Vendor-hosted remote MCP servers (OAuth, read-only first) rendered for your runtime, plus specs for the recommended servers only — **nothing is enabled by default** |
| `cookbook/{stack}/` · `guides/` · `templates/` | Reference material at repo root |
| Cloud setup | `.github/workflows/copilot-setup-steps.yml` (Copilot) or `.cursor/environment.json` (Cursor) |

## Commands

```bash
npx @grvmithas/create-aies-kit@latest audit                    # score the harness (0–100)
npx @grvmithas/create-aies-kit@latest audit --min-score 100    # CI gate: exit 1 below threshold
npx @grvmithas/create-aies-kit@latest audit --format json
npx @grvmithas/create-aies-kit@latest fix                      # create missing files, fill detectable verify commands; never overwrites
node hooks/aies-guard.mjs --self-test                          # prove the guard denies and allows what it should
node hooks/aies-done.mjs                                       # run the definition-of-done gate by hand
node hooks/aies-egress-check.mjs --require-closed              # CI/sandbox: exit 1 if egress is open
npx @grvmithas/create-aies-kit@latest plugin --out ./aies-plugin   # Agent Plugins 1.0 bundle
```

The plugin bundle follows [Agent Plugins 1.0](https://agent-plugins.org/specification): root `plugin.json`, `skills/`, and `mcp.json`, which Cursor and Kiro load natively, plus `.claude-plugin/` (with the guard and done-gate hooks) and `.codex-plugin/` manifests.

## Parallel agents

```bash
node scripts/aies-worktree.mjs new JIRA-123        # ../<repo>.worktrees/JIRA-123 on agent/JIRA-123
# fill plans/JIRA-123-contract.md, run the agent in that worktree
node scripts/aies-worktree.mjs check JIRA-123      # changed files vs contract allowed/prohibited paths
node scripts/aies-worktree.mjs overlap             # files touched by more than one active task
node scripts/aies-worktree.mjs remove JIRA-123
```

## What the audit checks

`audit` measures whether the harness *works*, not just whether files exist: verify commands are real (no `(fill in)` placeholders), the guard passes its self-test and is wired into the runtime's hook config, the definition-of-done gate lists commands and is wired where the runtime supports it, MCP config has no literal tokens, an eval suite exists, and no `*.aies-new` updates are waiting to be merged.

## Upgrading from 1.x or 2.0–2.1

1. Commit, then run `npx @grvmithas/create-aies-kit@latest enhance`. Installs before 2.2 have no `.aies-kit.json`, so any file that differs from the new kit version is treated as yours: it is kept and the new version lands in `<file>.aies-new`. Merge or delete those, or re-run with `--force` to take every kit version.
2. 2.2 stops installing the unwired `hooks/*.hook.sh` scripts and the MCP specs your stack does not use; `enhance` deletes copies identical to what the kit shipped and leaves edited ones.
3. Delete dead 1.x paths the runtime never loaded: root `copilot-instructions.md`, `.cursor/prompts/`, `.claude/prompts/`, `aies-hooks.json`, IDE-folder `*.skill.md`.
4. Run `audit --min-score 100`.

Docs: https://www.ai-standards.dev/quickstart · Changelog: [CHANGELOG.md](./CHANGELOG.md)
