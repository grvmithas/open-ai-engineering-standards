# AIES hooks

> Installed by `create-aies-kit` 2.x. Two layers: **native IDE hooks** that the agent runtime enforces on every tool call and at completion, and **CI gates** that block the merge when the harness or the code regresses.

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

## Layer 1b — definition-of-done gate (enforced at completion)

`hooks/aies-done.mjs` runs the commands in `hooks/aies-done.json` when the agent tries to finish, and refuses completion while any of them fails. The kit fills the file from the detected lint, typecheck, and test commands; build stays in CI.

| Runtime | Event | How it refuses |
|---------|-------|----------------|
| Claude Code | `Stop` | exit 2 — the reason goes back to the agent, which keeps working |
| Codex | `Stop` | exit 2 |
| Gemini CLI | `AfterAgent` | exit 2 — forces a retry |
| Devin Desktop | `Stop` | exit 2 |
| Cursor | `stop` | `followup_message` — the agent receives the failure as its next instruction |
| Copilot, Kiro, opencode | — | no blocking completion event with a documented contract; the CI `verify` job is the gate |

Behavior:

- Runs only when the agent changed something (dirty working tree, or HEAD moved since the last run). Pure Q&A turns are never gated.
- Caches a fingerprint of the last green state, so a second "done" on unchanged code returns instantly.
- After `maxConsecutiveBlocks` (default 3) refusals in a row it lets the agent stop and report — a gate that loops forever wastes tokens and hides the problem.
- Fails **open** on internal errors: a crashed quality gate must not trap the agent. The guard is the security control; this is a quality control.
- The guard denies agent edits to `aies-done.mjs` and `aies-done.json`, so the agent cannot remove the commands that block it.
- Humans can bypass it for one session with `AIES_DONE_SKIP=1` in the runtime's environment.

```bash
node hooks/aies-done.mjs --target cli; echo "exit=$?"   # 0 = done allowed, 2 = refused (reason on stderr)
```

## Layer 1c — egress self-test (control AC-06)

`hooks/aies-egress-check.mjs` proves the sandbox blocks the network: a DNS lookup and TCP connections to hosts outside the allowlist (including a raw IP, which catches DNS-only blocking) must all fail. Configure probes and allowlisted hosts in `hooks/aies-egress.json`.

- **Confidential data class:** wired at session start (Claude Code, Codex, Gemini CLI, Devin). The agent receives one line of context — `closed`, or `OPEN` with an instruction to avoid untrusted code and tell the human.
- **Every data class:** run it in the agent's environment setup (cloud-agent image, dev container) with `--require-closed`, which exits 1 when egress is open.

```bash
node hooks/aies-egress-check.mjs                    # table of probes; exit 0
node hooks/aies-egress-check.mjs --require-closed   # exit 1 when any probe leaks
```

On a developer laptop without a sandbox the result is `OPEN` — that is the correct answer, not a bug. The fix is a sandbox (Claude Code sandbox in strict mode, Codex `workspace-write`, a dev container with an egress proxy), not a different probe.

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
     → agent says "done"; aies-done runs lint/typecheck/test and refuses until they pass
     → reviews/{STORY_ID}-code-review.md
     → CI gates (guard self-test, audit, verify, evals) → PR → human merge in dependency order
```

## Anti-patterns

- Relying on "please don't force-push" in `AGENTS.md` — instructions are advisory; hooks are enforcement.
- Disabling the guard to get past a denial — the denial is the signal; a human runs the command.
- Logging raw commands — they carry tokens; log hashes and rule ids.
- Relying on the IDE hook alone — a teammate without the hook installed, or an untrusted Codex hook, bypasses it; the CI gate does not.
- Letting the agent "fix" a denial by editing hook or MCP config — that is exactly the self-configuration attack the write policy blocks.
- Putting the full build or e2e suite in `aies-done.json` — a 20-minute gate on every "done" teaches people to set `AIES_DONE_SKIP`. Gate on fast checks; leave the slow ones to CI.
- Treating a blocked egress probe on one host as proof of isolation — probe DNS and a raw IP too, or a DNS-only block passes the test while TCP egress stays open.
