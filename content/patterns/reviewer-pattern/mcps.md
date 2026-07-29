# Reviewer Pattern — MCP recommendations

> **Pattern:** Reviewer  
> **Component:** mcps.md  
> **Version:** 1.1 | **Updated:** 2026-07-29

---

## Purpose

Least-privilege MCP servers for the **Reviewer** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | Diff/PR context |
| [Filesystem](../../mcps/infrastructure-data/filesystem.mcp.md) | Read files cited in findings |

## When to enable for Reviewer

Enable GitHub for the PR diff under review. Enable Filesystem only to open paths cited in findings — not to browse the whole monorepo.

## Enable rules (this pattern)

1. Reviewer MCPs stay read-only; never merge or comment via tool without HITL
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Revoke filesystem roots that are outside the PR file list

## Anti-patterns

- Approving because an MCP “summary” looked clean
- Letting the reviewer agent post merge comments autonomously
- Expanding filesystem roots beyond the changed paths

## Checklist

- [ ] Reviewer MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the reviewer gate  
- [ ] Injection / tool PEP reviewed if tools can act
