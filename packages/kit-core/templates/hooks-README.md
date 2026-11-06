# AIES hooks

> Installed by `create-aies-kit` 2.x. Two layers: **native IDE hooks** that the agent runtime enforces on every tool call, and **CI gates** that block the merge when the harness or the code regresses.

## Purpose

Make the non-negotiables deterministic. Prompt text asks an agent to behave; a hook makes the runtime refuse.

## Layer 1 — native guard (enforced by the IDE)

`hooks/aies-guard.mjs` is one Node script (no dependencies) wired into every supported runtime:

| Runtime | Config file (generated) | Event |
|---------|-------------------------|-------|
| Claude Code | `.claude/settings.json` | `PreToolUse` · `Bash`, `Edit|Write|MultiEdit|NotebookEdit`, `Read` · `onFailure: "block"` |
| Cursor | `.cursor/hooks.json` | `beforeShellExecution`, `preToolUse`, `beforeReadFile` · `failClosed: true` |
| GitHub Copilot (CLI, VS Code, cloud agent) | `.github/hooks/aies-guard.json` | `preToolUse` (bash + powershell entries) |
| Kiro | `.kiro/hooks/aies-guard.json` | `PreToolUse` · matchers `shell`, `write`, `read` |
| Codex | `.codex/hooks.json` | `PreToolUse` · `Bash`, `Edit|Write` — **trust once with `/hooks`** |
| Gemini CLI | `.gemini/settings.json` → `hooks` | `BeforeTool` · shell, write, read tools |
| Devin Desktop | `.devin/hooks.v1.json` | `PreToolUse` |
| opencode | `.opencode/plugins/aies-guard.js` | `tool.execute.before` |

It enforces three policies:

1. **Shell** — denies recursive deletes of root/home/workspace, force pushes, pushes to `main`/`master`/`release/*`, `git reset --hard`, `git clean -fd`, `--no-verify`, curl-pipe-to-shell, destructive SQL, publish/apply/deploy commands, printing `.env`/keys, `sudo`, and commands that tamper with hook files.
2. **Writes** — denies agent edits to its own guardrails: the guard, hook and permission config, MCP config, `.vscode/settings.json`, CI workflows, `CODEOWNERS`.
3. **Reads** — denies reading `.env*` (except examples), private keys, cloud credentials, `.npmrc`/`.pypirc`/`.netrc`.

Any internal error **denies** the action (fail closed).

**Test it without an IDE:**

```bash
node hooks/aies-guard.mjs --self-test     # fixed deny/allow cases; exit 1 on any mismatch
echo '{"command":"git push --force origin main"}' | node hooks/aies-guard.mjs --target cli; echo "exit=$?"
echo '{"tool_name":"Edit","tool_input":{"file_path":".mcp.json"}}' | node hooks/aies-guard.mjs --target cli; echo "exit=$?"
```

**Extend (never weaken)** with `hooks/aies-guard.rules.json`:

```json
{
  "deny": [{ "id": "no-prod-db", "pattern": "prod-db\\.internal", "reason": "Production DB is human-only" }],
  "protect": [{ "id": "no-billing", "pattern": "^src/billing/", "reason": "Billing changes need a human" }]
}
```

Denials append to `hooks/logs/aies-guard.jsonl` (rule id + SHA-256 prefix only; add `hooks/logs/` to `.gitignore`).

## Layer 2 — CI gates (merge blocking)

A hook only protects sessions where it is installed and trusted. CI is the backstop. Copy `templates/ci/aies-gates.yml` to `.github/workflows/aies-gates.yml` (a human change — the guard blocks agents from editing CI) and make its jobs required checks:

| Job | Fails when |
|-----|-----------|
| `harness` | `aies-guard.mjs --self-test` mismatches, or `create-aies-kit audit` scores below 100 (placeholder verify commands, unwired guard, enabled MCP servers with literal tokens) |
| `verify` | This repo's own lint / typecheck / test / build commands fail |
| `evals` | Any harness eval in `evals/` fails — runs only when `AGENTS.md`, skills, agent definitions, or evals change |

Kit 2.1 and earlier also installed `hooks/*.hook.sh` evidence scripts. No runtime executed them, so 2.2 stops installing them; `enhance` deletes untouched copies and leaves edited ones in place. The scripts remain documented in the standard at `04-agent-engineering/hooks/`.

## Typical loop

```text
story → plans/{STORY_ID}-plan.md (approve)
     → [parallel?] node scripts/aies-worktree.mjs new {TASK_ID}  → fill plans/{TASK_ID}-contract.md
     → agent codes; aies-guard blocks unsafe shell, guardrail edits, and secret reads on every call
     → verify (repo lint/typecheck/test) → reviews/{STORY_ID}-code-review.md
     → CI gates (guard self-test, audit, verify, evals) → PR → human merge in dependency order
```

## Anti-patterns

- Relying on "please don't force-push" in `AGENTS.md` — instructions are advisory; hooks are enforcement.
- Disabling the guard to get past a denial — the denial is the signal; a human runs the command.
- Logging raw commands — they carry tokens; log hashes and rule ids.
- Relying on the IDE hook alone — a teammate without the hook installed, or an untrusted Codex hook, bypasses it; the CI gate does not.
- Letting the agent "fix" a denial by editing hook or MCP config — that is exactly the self-configuration attack the write policy blocks.
