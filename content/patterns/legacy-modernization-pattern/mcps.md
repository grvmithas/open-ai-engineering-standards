# Legacy Modernization Pattern — MCP recommendations

> **Pattern:** Legacy Modernization  
> **Component:** mcps.md  
> **Version:** 1.1 | **Updated:** 2026-07-29

---

## Purpose

Least-privilege MCP servers for the **Legacy Modernization** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | History and PR evidence |
| [Filesystem](../../mcps/infrastructure-data/filesystem.mcp.md) | Legacy tree reads |

## When to enable for Legacy Modernization

Filesystem reads the legacy tree; GitHub supplies history. No deploy MCP until a strangler slice has characterization coverage.

## Enable rules (this pattern)

1. Legacy modernization MCPs stay read-only during discovery
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Do not enable write MCP across both legacy and modern trees in one session

## Anti-patterns

- Rewriting modules discovered only via unranked MCP search
- Deleting legacy paths through tools without golden-test proof
- Mixing modernization and migration cutover tools in one agent turn

## Checklist

- [ ] Legacy Modernization MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the legacy modernization gate  
- [ ] Injection / tool PEP reviewed if tools can act
