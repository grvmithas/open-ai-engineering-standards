# Planner Pattern — MCP recommendations

> **Pattern:** Planner  
> **Component:** mcps.md  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Least-privilege MCP servers for the **Planner** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | Issues/PRs for plan evidence |
| [Filesystem](../../mcps/infrastructure-data/filesystem.mcp.md) | Read scoped roots for context packs |
| [Linear / Jira](../../mcps/project-management/linear.mcp.md) | Optional — ticket linkage (enable after allowlist) |

## When to enable for Planner

Turn on GitHub/Filesystem only when ticket history or scoped tree reads are required to finish the plan. Ticket MCPs stay off until allowlisted.

## Enable rules (this pattern)

Connect through the vendor-hosted endpoint and client OAuth listed in each spec's **Deployment status (2026-11)** table; use read-only endpoints (`/readonly`, `read_only=true`) unless this pattern's gate authorizes writes. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

1. Keep planning MCPs read-only until the human approval footer is signed
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Disable ticket write tools before any coder agent starts

## Anti-patterns

- Using MCP issue text as a substitute for locked acceptance criteria
- Leaving Linear/Jira write scopes enabled after the plan gate
- Pulling confidential ticket attachments into the planner context without data-class review

## Checklist

- [ ] Planner MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the planner gate  
- [ ] Injection / tool PEP reviewed if tools can act

## Changelog

- **1.2 — 2026-11-06:** Pointed enable rules at vendor-hosted, read-only-first endpoints and client OAuth.
