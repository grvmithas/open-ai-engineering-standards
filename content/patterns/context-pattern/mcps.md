# Context Pattern — MCP recommendations

> **Pattern:** Context  
> **Component:** mcps.md  
> **Version:** 1.1 | **Updated:** 2026-07-29

---

## Purpose

Least-privilege MCP servers for the **Context** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [Filesystem](../../mcps/infrastructure-data/filesystem.mcp.md) | Scoped reads only |
| [GitHub](../../mcps/version-control/github.mcp.md) | Optional — prior PR context |

## When to enable for Context

Filesystem MCP is the default for scoped reads. GitHub is optional only when prior PR discussion is part of the evidence package.

## Enable rules (this pattern)

1. Bound filesystem roots to the pack budget before the first read
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Drop remote MCP content that lacks a trust label before packing

## Anti-patterns

- Dumping MCP search hits into the system channel
- Treating issue comments as trusted architecture truth
- Expanding context via MCP to hide an unclear task

## Checklist

- [ ] Context MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the context gate  
- [ ] Injection / tool PEP reviewed if tools can act
