# Migration Pattern — MCP recommendations

> **Pattern:** Migration  
> **Component:** mcps.md  
> **Version:** 1.1 | **Updated:** 2026-07-29

---

## Purpose

Least-privilege MCP servers for the **Migration** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | PR/plan evidence |
| [PostgreSQL](../../mcps/infrastructure-data/postgresql.mcp.md) | Schema/data checks (read-only first) |
| [Docker](../../mcps/infrastructure-data/docker.mcp.md) | Optional — local migrate jobs |
| [Kubernetes](../../mcps/infrastructure-data/kubernetes.mcp.md) | Optional — cutover workloads |

## When to enable for Migration

PostgreSQL/Docker/Kubernetes MCPs are for read-only parity checks and rollout status — never for irreversible drops without a signed phase gate.

## Enable rules (this pattern)

1. Database MCP starts SELECT-only; DDL requires an approved phase ticket
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Revoke cluster write tools before the verify window ends

## Anti-patterns

- Running DROP via MCP because the dual-write “looked fine”
- Embedding connection strings in MCP config committed to git
- Skipping digest pins because the local migrate job succeeded

## Checklist

- [ ] Migration MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the migration gate  
- [ ] Injection / tool PEP reviewed if tools can act
