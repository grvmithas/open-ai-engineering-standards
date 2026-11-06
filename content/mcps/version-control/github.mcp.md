# GitHub MCP Integration

> **Service:** GitHub
> **Category:** Version Control
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Enables AI agents to interact with GitHub: read issues, create PRs, search code, manage labels, and access repository information. The primary use case is agents that assist with the development workflow — reading context from issues, creating branches, and summarizing code changes.

---

## Why use it — and when not to
Use GitHub's hosted server when the agent needs forge context that git alone does not have: issues, PR reviews, Actions logs, code scanning alerts. Start with the read-only endpoint and enable write toolsets per workflow. It replaces the archived reference server and personal access tokens with OAuth and fine-grained permissions.

## How to connect — deployment status (2026-11)

| Field | Current guidance |
|---|---|
| Deployment | Vendor-hosted remote (GitHub MCP Server) |
| Endpoint | `https://api.githubcopilot.com/mcp/` — read-only variant `https://api.githubcopilot.com/mcp/readonly` |
| Auth | OAuth via the client (Copilot, VS Code, Claude Code, Cursor); fine-grained PAT only where OAuth is unavailable |
| Least-privilege setup | Default to `/readonly`; enable write toolsets per task; restrict to named repositories |
| Avoid | Archived `@modelcontextprotocol/server-github`; classic PATs with `repo` scope |
| AIES kit id | `github` (shipped by default, read-only endpoint) |

Trust only MCP Registry entries under a namespace the vendor controls; look-alike listings are third-party code. Endpoint liveness is re-checked weekly by `scripts/check-external.mjs`. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

---

## Security Model

**Authentication:** OAuth through the MCP client (preferred). Fallbacks, in order: GitHub App installation tokens (short-lived, scoped), then fine-grained PATs restricted to specific repositories.

**Required scopes (minimum):**
- `repo:read` — Read repository content and metadata
- `issues:read` — Read issues and comments

**Optional scopes (grant only when needed):**
- `issues:write` — Create and update issues
- `pull_requests:write` — Create and update PRs
- `contents:write` — Create files and commits

**Threat model:**
- Token exfiltration via prompt injection → Mitigate: Use GitHub App tokens (short-lived, scoped)
- Unauthorized repository access → Mitigate: Restrict token to specific repositories
- SSRF via repository URLs → Mitigate: Validate all URLs against allowlist before fetching

---

## Tool Definitions

### Tool: `search_issues`
**Agent description:** Search GitHub issues and PRs to find related work, understand context, or find duplicate issues. Use when starting work on a feature or bug to understand prior context.

**Input schema:**
```json
{
  "query": "string — GitHub search query (e.g., 'is:open label:bug react')",
  "repository": "string (optional) — owner/repo to restrict search",
  "limit": "number (optional, default 10, max 30) — number of results"
}
```

**Output:** Array of issue/PR summaries with: number, title, state, labels, created_at, url

**Rate limits:** 30 requests/minute (PAT), 5,000/hour (GitHub App)

**Errors:**
- 401: Token expired or insufficient scopes
- 422: Invalid search query — check query syntax
- 403: Rate limited — implement exponential backoff

---

### Tool: `get_issue`
**Agent description:** Get the full content of a specific GitHub issue including all comments. Use when you need to understand the complete context of a reported bug or feature request.

**Input schema:**
```json
{
  "repository": "string — owner/repo (e.g., 'microsoft/vscode')",
  "issue_number": "number — issue number"
}
```

**Output:** Issue object with: title, body, state, labels, comments (full), assignees, milestone

---

### Tool: `create_issue`
**Agent description:** Create a new GitHub issue to report a bug, request a feature, or track work. Use when you've identified a problem during a code review or analysis that should be tracked separately from the current task.

**Input schema:**
```json
{
  "repository": "string — owner/repo",
  "title": "string — clear, specific issue title",
  "body": "string — markdown body with context, steps to reproduce, expected/actual behavior",
  "labels": "string[] (optional) — existing label names",
  "assignees": "string[] (optional) — GitHub usernames"
}
```

**Output:** Created issue URL and number

**Security note:** Body is passed to GitHub. Never include secrets, tokens, or PII in issue body.

---

### Tool: `get_pull_request`
**Agent description:** Get the full content of a pull request including diff summary and review comments. Use when reviewing a PR or understanding recent code changes.

**Input schema:**
```json
{
  "repository": "string — owner/repo",
  "pr_number": "number — pull request number"
}
```

**Output:** PR object with: title, body, state, files_changed (summary), review_comments

---

### Tool: `search_code`
**Agent description:** Search for code patterns across a repository. Use when you need to find how something is implemented, find all usages of a function, or check for anti-patterns.

**Input schema:**
```json
{
  "query": "string — GitHub code search query (e.g., 'useState language:typescript repo:owner/repo')",
  "limit": "number (optional, default 10, max 20)"
}
```

**Output:** Array of code matches with: file path, matched lines, repository, URL

**Rate limits:** 10 requests/minute (code search has stricter limits)

---

## Example Agent Interaction

```text
User: "Look at issue #456 and create a plan to fix it"

Agent uses tools in sequence:
1. get_issue(repository="org/repo", issue_number=456)
   → Gets: "Button click handler throws TypeError when user is not logged in"
   
2. search_code(query="handleButtonClick repo:org/repo language:typescript")
   → Gets: File location of the handler
   
3. search_issues(query="is:open repo:org/repo TypeError login", limit=5)
   → Gets: Related issues — confirms this is new, not duplicate
   
4. [Uses code context to create an implementation plan without additional tools]
```

---

## Anti-Patterns

### ❌ Using search_code for every piece of context
Code search has strict rate limits. Use it only when you need to find a specific pattern across the repo — not as a general file browser. Use `read_file` tools (filesystem MCP) to read specific known files.

### ❌ Creating issues for temporary findings
Don't create GitHub issues for every observation during a code review. Issues are for work that needs tracking. Observations belong in PR comments.

### ❌ Using PAT with full repo access
Personal Access Tokens with `repo` scope can access all your repositories. Create scope-restricted tokens for specific repositories and rotate them quarterly.

---

## Setup

Portable `.mcp.json` (Claude Code, Copilot, Kiro, Continue) — OAuth happens in the client, so no secret lives in the file:

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/readonly"
    }
  }
}
```

Cursor (`.cursor/mcp.json`) uses `{ "mcpServers": { "github": { "url": "…" } } }`; Codex (`.codex/config.toml`) uses `[mcp_servers.github]` with `url = "…"`. `npx @grvmithas/create-aies-kit` writes the correct shape per runtime into `mcps/recommended.json` without enabling it.

Switch to `https://api.githubcopilot.com/mcp/` (read-write) only for the task that needs writes, then switch back. Never commit tokens; if a PAT is unavoidable, reference it from the client's secret store, not the file.

---

## Tradeoffs

| Choice | You gain | You give up |
|---|---|---|
| Vendor-hosted remote server | No server to patch; OAuth and fine-grained permissions | Dependency on GitHub's availability and toolset changes |
| Read-only endpoint by default | Safe to enable for every agent | Write workflows need a deliberate second configuration |
| MCP over `gh` CLI | Structured, typed results and per-tool allowlisting | `gh` is already authenticated in many environments and costs no context for tool schemas — prefer it for simple one-off commands in a terminal-capable agent |

## Enterprise considerations

Enable the GitHub MCP server through organization policy (Copilot settings → MCP servers) so admins control which clients may connect; OAuth grants appear in the organization's authorized-apps audit trail. For GitHub Enterprise Cloud with data residency, use the tenant's own endpoint rather than the public one. Pair with branch protection and required reviews: the agent's write toolsets must never be the control that prevents an unsafe merge.

---

## Checklist

- [ ] Remote server with client OAuth; no archived `server-github`, no secrets in config files
- [ ] `/readonly` endpoint by default; write endpoint enabled per task only
- [ ] Access restricted to specific repositories (not all repositories)
- [ ] Any fallback token is fine-grained, repo-scoped, and rotated (quarterly minimum)
- [ ] Audit logging enabled for tool calls
- [ ] Rate limit handling implemented (exponential backoff)
- [ ] Tested with read-only operations first before enabling write tools

---

## Changelog

- **1.2 — 2026-11-06:** Added Tradeoffs and service-specific "Why use it — and when not to" guidance.
- **1.1 — 2026-11-06:** Moved to the vendor-hosted GitHub MCP server with client OAuth and a read-only default; marked `@modelcontextprotocol/server-github` as archived; added deployment status, enterprise considerations, and Changelog.
- **1.0:** Initial integration spec.
