# Architecture Pattern — MCP recommendations

> **Pattern:** Architecture  
> **Component:** mcps.md  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Least-privilege MCP servers for the **Architecture** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | ADR PRs |
| [Filesystem](../../mcps/infrastructure-data/filesystem.mcp.md) | Read existing topology docs |

## When to enable for Architecture

Filesystem loads existing ADRs/topology docs; GitHub opens the ADR PR. Architecture work does not need cluster write tools.

## Enable rules (this pattern)

Connect through the vendor-hosted endpoint and client OAuth listed in each spec's **Deployment status (2026-11)** table; use read-only endpoints (`/readonly`, `read_only=true`) unless this pattern's gate authorizes writes. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

1. Architecture MCP is documentation and history — not infrastructure mutation
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Close filesystem roots once the ADR draft cites its sources

## Anti-patterns

- Inventing topology because MCP could not find the current diagram
- Merging ADRs via tool without the architecture review gate
- Skipping rejected alternatives because search returned one popular blog

## Checklist

- [ ] Architecture MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the architecture gate  
- [ ] Injection / tool PEP reviewed if tools can act

## Changelog

- **1.2 — 2026-11-06:** Pointed enable rules at vendor-hosted, read-only-first endpoints and client OAuth.
