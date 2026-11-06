# Native Agent Hooks

> **Handbook:** Enforce policy inside the agent runtime, before a tool call executes  
> **Repo anchors:** [Hooks in practice](./hooks-in-practice.md) (CI evidence gates) · kit `hooks/aies-guard.mjs`  
> **Version:** 1.1 | **Updated:** 2026-11-06

---

## Purpose

Use each runtime's native hook system to deny unsafe agent actions deterministically — force pushes, destructive deletes, deploys, secret reads — with one shared policy script wired into Claude Code, Cursor, GitHub Copilot, Kiro, Codex, Gemini CLI, Devin Desktop, and opencode. The guard enforces three policies: unsafe shell commands, edits to the agent's own guardrails, and reads of secrets.

## Why

Instructions in `AGENTS.md` are advisory: a model under pressure, or a prompt-injected model, can ignore them. Native hooks run **outside the model**, in the runtime, before the tool executes. A denial is not a suggestion; the command never runs. AIES therefore uses two layers:

| Layer | Runs where | Guarantees |
|-------|-----------|------------|
| Native guard (`hooks/aies-guard.mjs`) | Inside the agent runtime, every tool call | Unsafe commands never execute, guardrail files are not editable by the agent, secrets never enter context — even from injected instructions |
| Evidence gates (`hooks/*.hook.sh`) | CI / git hooks | Plans, approvals, test evidence exist before merge/deploy |

## How

### Event and I/O matrix

| Runtime | Config | Event | Input (stdin JSON) | Deny |
|---------|--------|-------|--------------------|------|
| Claude Code | `.claude/settings.json` | `PreToolUse`, matcher `Bash` | `tool_name`, `tool_input.command` | stdout `hookSpecificOutput.permissionDecision: "deny"` (or exit 2 + stderr) |
| Cursor | `.cursor/hooks.json` (`version: 1`) | `beforeShellExecution`, `preToolUse`, `beforeReadFile` (all `failClosed: true`) | `command` · `tool_name`/`tool_input` · `file_path` | stdout `{"permission":"deny", "user_message", "agent_message"}` (exit 2 also blocks) |
| GitHub Copilot | `.github/hooks/*.json` (`version: 1`) | `preToolUse` | `toolName`, `toolArgs` (JSON **string**) | stdout `{"permissionDecision":"deny"}`; provide `bash` and `powershell` entries (cloud agent runs `bash` only) |
| Kiro | `.kiro/hooks/*.json` (`version: "v1"`) | `PreToolUse`, matchers `shell` · `write` · `read` | session JSON | exit 2 + stderr |
| Codex | `.codex/hooks.json` | `PreToolUse`, matchers `Bash` · `Edit\|Write` (covers `apply_patch`) | `tool_name`, `tool_input` | exit 2 + stderr. **New or changed hooks are skipped until trusted with `/hooks`** |
| Gemini CLI | `hooks` in `.gemini/settings.json` | `BeforeTool`, matchers `run_shell_command` · `write_file\|replace` · `read_file` | `tool_name`, `tool_input` | exit 2 + stderr; timeouts are **milliseconds** |
| Devin Desktop | `.devin/hooks.v1.json` (the whole file is the event map) | `PreToolUse` | `tool_name`, `tool_input` | exit 2 + stderr. Hooks are off in Restricted Mode |
| opencode | `.opencode/plugins/aies-guard.js` | `tool.execute.before` (in-process plugin) | `input.tool`, `output.args` | plugin throws when the guard exits non-zero or cannot run |

The AIES guard accepts `--target claude|cursor|copilot|kiro|codex|gemini|devin|opencode|cli` and answers in that runtime's shape, so policy lives in one file. `--event shell|write|read` pins the action class when the hook only fires for one class (Cursor `beforeReadFile`, Kiro and Gemini matchers); otherwise the guard classifies by tool name.

**Double execution.** Devin Desktop also loads `.claude/settings*.json` hooks, and several runtimes read Claude-format config. If a repo ships both, the guard runs twice per call. That is safe — the policy is idempotent and either run can deny — but it doubles audit-log lines; dedupe on `ts` + `subjectSha256`.

### Wiring examples

```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/hooks/aies-guard.mjs\" --target claude", "timeout": 15, "onFailure": "block" }] },
      { "matcher": "Edit|Write|MultiEdit|NotebookEdit",
        "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/hooks/aies-guard.mjs\" --target claude", "timeout": 15, "onFailure": "block" }] },
      { "matcher": "Read",
        "hooks": [{ "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/hooks/aies-guard.mjs\" --target claude", "timeout": 15, "onFailure": "block" }] }
    ]
  }
}
```

```json
{
  "version": 1,
  "hooks": {
    "preToolUse": [
      { "type": "command",
        "bash": "node hooks/aies-guard.mjs --target copilot",
        "powershell": "node hooks/aies-guard.mjs --target copilot",
        "timeoutSec": 15 }
    ]
  }
}
```

### Default deny policy — shell commands

| Rule | Why it is human-only |
|------|---------------------|
| `rm -rf /`, `~`, `.`, `*`; `Remove-Item -Recurse -Force` on drives/home | Irreversible data loss |
| `git push --force` (not `--force-with-lease`); push to `main`/`master`/`release/*` | Rewrites or bypasses reviewed history |
| `git reset --hard`, `git clean -fd` | Destroys uncommitted work, including other agents' |
| `--no-verify` | Bypasses the repo's own gates |
| `curl … \| sh`, `irm … \| iex` | Executes unreviewed remote code |
| `DROP TABLE/DATABASE/SCHEMA`, `TRUNCATE TABLE` | Needs a reviewed migration |
| `npm publish`, `terraform apply/destroy`, `kubectl apply/delete`, `helm install/upgrade`, `docker push` | External effect |
| `cat .env`, private keys, `credentials.json` | Leaks secrets into transcripts and model context |
| `sudo` | Privilege escalation |

| `rm`/`mv`/redirect/`sed -i` targeting hook config or the guard | Agents may not disable their own guardrails |

### Default deny policy — writes (self-configuration integrity)

An agent that can edit the files that configure it can grant itself new capabilities: auto-approve all tools, add an attacker's MCP server, or delete the guard. CVE-2025-53773 (Copilot writing `"chat.tools.autoApprove": true` into `.vscode/settings.json`) and the MCPoison class of attacks both work this way. The guard denies agent edits to:

| Path class | Examples |
|------------|----------|
| Guard and rules | `hooks/aies-guard.mjs`, `hooks/aies-guard.rules.json` |
| Hook and permission config | `.claude/settings*.json`, `.cursor/hooks.json`, `.github/hooks/*.json`, `.codex/hooks.json`, `.devin/hooks.v1.json`, `.kiro/hooks/*.json`, `.opencode/plugins/*`, `.gemini/settings.json` |
| MCP and editor auto-approve config | `.mcp.json`, `.cursor/mcp.json`, `.kiro/settings/mcp.json`, `.codex/config.toml`, `.devin/mcp_config*.json`, `opencode.json`, `.vscode/settings.json`, `.vscode/mcp.json` |
| CI and review routing | `.github/workflows/*.yml`, `.gitlab-ci.yml`, `CODEOWNERS` |

Paths are matched after normalizing to repo-relative form, and Codex `apply_patch` bodies are parsed so every `*** Update File:` target is checked. Add project paths with `"protect"` entries in the rules file.

### Default deny policy — reads

`.env` and `.env.*` (except `.example`, `.sample`, `.template`), `*.pem`, `*.key`, `id_rsa`, `id_ed25519`, `credentials.json`, `.aws/credentials`, `.npmrc`, `.pypirc`, `.netrc`. A secret read into context is a secret in the transcript, the provider's logs, and every later tool call the model makes.

### Fail closed

Extend with `hooks/aies-guard.rules.json`; an invalid rules file fails closed. The guard wraps its whole decision in a handler that **denies on any internal error**, and the hook configs ask the runtime to block when the hook itself fails (`onFailure: "block"` in Claude Code, `failClosed: true` in Cursor, a throwing adapter in opencode). A guard that crashes open is a guard an attacker only needs to crash.

### Testing a hook without the IDE

```bash
echo '{"tool_input":{"command":"git push --force origin main"}}' | node hooks/aies-guard.mjs --target claude
echo '{"toolName":"bash","toolArgs":"{\"command\":\"npm publish\"}"}' | node hooks/aies-guard.mjs --target copilot
echo '{"tool_name":"Edit","tool_input":{"file_path":".cursor/mcp.json"}}' | node hooks/aies-guard.mjs --target claude
echo '{"file_path":".env"}' | node hooks/aies-guard.mjs --target cursor --event read
```

## Tradeoffs

| Choice | Gain | Cost |
|--------|------|------|
| Deterministic regex policy | Fast, auditable, no model in the loop | Pattern evasion is possible (aliases, scripts); keep branch protection and CI as backstops |
| Node script, no dependencies | Same behavior on Windows, macOS, Linux, cloud runners | Requires Node on the agent host |
| Deny over ask | No approval fatigue for clearly unsafe actions | A human must run legitimately needed commands manually |
| Hash-only audit log | No secrets in logs | Cannot replay exact commands from the log |
| Protecting agent config from agent edits | Closes the self-configuration attack class | Legitimate config changes (new MCP server, CI tweak) must be made by a human |
| Fail closed on guard errors | A crash or bad rules file cannot disable policy | A broken Node install blocks the agent until fixed |

## Anti-patterns

- **Policy only in prose.** "Never force push" in `AGENTS.md` without a hook is a hope.
- **Prompt hooks for security decisions.** Letting a model judge "is this command safe?" is non-deterministic and injectable; use command hooks for enforcement, prompt hooks only for advisory checks.
- **Fail-open on a broken policy file.** A syntax error must not silently disable custom rules.
- **Logging raw commands.** They contain tokens and connection strings.
- **Hook as the only control.** Hooks run on the agent host; keep server-side branch protection, required reviews, and CI gates.
- **Shell-only guarding.** A guard that inspects `Bash` but not `Edit`/`Write` lets the agent rewrite `.claude/settings.json` with the edit tool and remove the guard on the next turn.
- **Trusting hooks you did not review.** Codex requires `/hooks` trust approval for a reason: a cloned repo's hooks run arbitrary commands on your machine. Review hook config in PRs like code.

## Enterprise considerations

- Distribute the guard through managed policy locations where runtimes support them (Copilot policy hook directories, managed Claude Code settings) so developers cannot remove it per repo.
- Centralize `aies-guard.jsonl` into your SIEM; alert on repeated denials in one session (possible prompt injection).
- Version the rules file; changes go through CODEOWNERS like any security policy.
- Prefer policy-tier delivery where offered: Claude managed settings, Copilot `policy.d`, Codex `requirements.toml` with `allow_managed_hooks_only`, Cursor enterprise hooks. Project hooks are a floor; managed hooks are the control.
- Native Windows Claude Code runs without an OS sandbox; on Windows the guard and permission denies are the only pre-execution controls — use WSL2 or a dev container for agents with write access.

## Checklist

- [ ] Guard wired for every runtime your team uses (Claude Code, Cursor, Copilot, Kiro, Codex, Gemini CLI, Devin Desktop, opencode)
- [ ] Guard covers writes (self-configuration integrity) and secret reads, not only shell
- [ ] Hooks configured to fail closed (`onFailure: "block"`, `failClosed: true`)
- [ ] Codex hooks trusted via `/hooks` after install
- [ ] Copilot hook has both `bash` and `powershell` entries
- [ ] Pipe tests pass for each target (`npm run kit:check` runs them)
- [ ] Custom rules extend, never weaken, the default policy
- [ ] Denials logged as rule id + hash; logs gitignored
- [ ] Branch protection and CI gates remain enabled as backstops

## Changelog

- 2026-11-06 (v1.1): Write and read policies (self-configuration integrity, secret reads), fail-closed guard, wiring for Codex, Gemini CLI, Devin Desktop, opencode; double-execution note.
- 2026-11-06: Initial chapter — cross-runtime event/I-O matrix, default deny policy, single guard script.
