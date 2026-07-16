# GitHub MCP Integration

> **Service:** GitHub
> **Category:** Version Control
> **Version:** 1.0

---

## Purpose

Enables AI agents to interact with GitHub: read issues, create PRs, search code, manage labels, and access repository information. The primary use case is agents that assist with the development workflow — reading context from issues, creating branches, and summarizing code changes.

---

## Security Model

**Authentication:** Personal Access Token (PAT) with minimal scopes, or GitHub App with installation tokens.

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

```
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

```json
// .claude/settings.json or mcp config
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

**Environment variable:** Set `GITHUB_TOKEN` in your environment or secret manager. Never commit tokens.

---

## Checklist

- [ ] Token scoped to minimum required permissions
- [ ] Token restricted to specific repositories (not all repositories)
- [ ] Token rotation schedule set (quarterly minimum)
- [ ] Audit logging enabled for tool calls
- [ ] Rate limit handling implemented (exponential backoff)
- [ ] Tested with read-only operations first before enabling write tools
