# MCP in 2026: Remote Servers, Stateless Transport, and OAuth

> **Handbook:** Connect agents to tools through vendor-hosted MCP servers without long-lived tokens  
> **Repo anchors:** [MCP when and how](./mcp-when-and-how.md) · [`content/mcps/`](../mcps/README.md)  
> **Version:** 1.0 | **Updated:** 2026-11-06

---

## Purpose

Update MCP practice for the 2026-07-28 specification era: prefer vendor-hosted Streamable HTTP servers with OAuth 2.1 over local stdio packages and pasted tokens, configure them correctly per client, and treat every server as an untrusted input channel.

## Why

The first wave of MCP adoption ran `npx some-server` locally with a personal access token in an environment variable. That model has three structural problems: every developer holds a long-lived credential, servers run with the developer's full local privileges, and many community packages (including several original reference servers, now archived) receive no security maintenance.

The protocol and ecosystem moved:

| Then (2024–early 2025) | Now (2026-07-28 spec era) |
|------------------------|---------------------------|
| stdio subprocess per developer | Vendor-hosted remote servers over **Streamable HTTP** |
| SSE + stateful sessions | **Stateless** HTTP: single POST endpoint, no protocol sessions, `MCP-Protocol-Version` header |
| PATs in `env` | **OAuth 2.1** with Protected Resource Metadata; **Client ID Metadata Documents** replace Dynamic Client Registration |
| Ad-hoc discovery | **MCP Registry** entries with `remotes` of type `streamable-http` |
| Interactive follow-ups needed sessions | **Multi Round-Trip Requests** carry elicitation/sampling without server-side session state |

## How

### 1. Choose the server

1. Vendor-hosted remote endpoint (GitHub, Sentry, Linear, Notion, Atlassian, Supabase, GitLab, …).
2. Vendor-published local server (e.g., Playwright, Chrome DevTools) when the tool must touch the local machine.
3. Community server only after code review, pinned version, and an owner.

Prefer **read-only endpoints or scopes first** (e.g., GitHub `/readonly`, Linear `/mcp/readonly`, Supabase `read_only=true`).

### 2. Configure per client

| Client | File | Remote entry shape |
|--------|------|--------------------|
| Claude Code, Copilot (portable) | `.mcp.json` | `{"mcpServers":{"x":{"type":"http","url":"…"}}}` — `type` is required |
| VS Code legacy | `.vscode/mcp.json` | `{"servers":{"x":{"type":"http","url":"…"}}}` |
| Cursor, Kiro | `.cursor/mcp.json`, `.kiro/settings/mcp.json` | `{"mcpServers":{"x":{"url":"…"}}}` |
| Gemini CLI | `.gemini/settings.json` | `{"mcpServers":{"x":{"httpUrl":"…"}}}` |
| Codex | `.codex/config.toml` | `[mcp_servers.x]` + `url = "…"` |
| opencode | `opencode.json` | `{"mcp":{"x":{"type":"remote","url":"…"}}}` |

The AIES kit writes an **empty** config in the right shape plus `mcps/recommended.json` with ready-to-paste entries for your client. A human moves entries over after review.

### 3. Authenticate with OAuth, not tokens

Remote servers advertise their authorization server through Protected Resource Metadata. The client runs the OAuth flow on first use; tokens are short-lived and held by the client, not committed or exported. Use static headers only for CI and only with a secret reference (`${env:NAME}`, `${NAME}`), never a literal.

### 4. Treat tool output as untrusted input

MCP results flow straight into model context. Issue bodies, web pages, and log lines can carry prompt injection. Pair MCP with: least-privilege scopes, the native guard hook (blocks the dangerous follow-up action), and human approval for any write-capable tool.

## Tradeoffs

| Choice | Gain | Cost |
|--------|------|------|
| Remote vendor server | No local install, vendor-maintained, OAuth | Data leaves through the vendor's endpoint; depends on vendor uptime |
| Local stdio server | Works offline; touches local resources | Runs with developer privileges; you own patching |
| Read-only scope first | Limits blast radius of injection | Agents need a second, approved config for write operations |
| Empty config by default | Nothing connects without review | One manual step per server |

## Anti-patterns

- **Archived reference servers in production configs** (`@modelcontextprotocol/server-github`, `server-postgres`, …). Migrate to vendor servers.
- **Literal tokens in committed MCP files.** Use OAuth or environment references.
- **Every server enabled "just in case".** Tool lists cost context on every turn and widen the injection surface.
- **SSE endpoints when Streamable HTTP exists.** SSE is the deprecated fallback.
- **Trusting tool descriptions.** A malicious server can describe a tool misleadingly; allowlist servers, not tools named by servers.

## Enterprise considerations

- Maintain an org MCP allowlist (registry IDs + endpoints); enforce with managed client policy where supported.
- Route remote MCP traffic through egress controls; log server, tool, and caller identity — not payloads with customer data.
- Map each server to a data class; confidential repos start with zero servers.
- Re-verify endpoints quarterly; vendors version paths (e.g., Atlassian `/v2/mcp`).

## Checklist

- [ ] Each enabled server is vendor-hosted or reviewed, pinned, and owned
- [ ] OAuth used for interactive clients; no literal tokens in the repo
- [ ] Read-only scopes/endpoints first; write scopes separately approved
- [ ] Client config shape matches the table above
- [ ] Guard hook enabled to stop dangerous follow-up actions
- [ ] Allowlist reviewed quarterly

## Changelog

- 2026-11-06: Initial chapter — 2026-07-28 transport/auth changes, per-client config shapes, remote-first policy.
