# Enterprise Pattern — MCP recommendations

> **Pattern:** Enterprise  
> **Component:** mcps.md  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Least-privilege MCP servers for the **Enterprise** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | Change evidence |
| [Slack / Teams](../../mcps/communication/slack.mcp.md) | Optional — incident/comms (allowlist) |
| [Jira / Linear](../../mcps/project-management/jira.mcp.md) | Optional — control tickets |
| [OpenTelemetry](../../mcps/observability/opentelemetry.mcp.md) | Optional — tenant-aware traces |

## When to enable for Enterprise

Enable org MCPs only after SoA rows exist. Slack/Jira stay optional; OpenTelemetry is for tenant-aware traces, not chat ops.

## Enable rules (this pattern)

Connect through the vendor-hosted endpoint and client OAuth listed in each spec's **Deployment status (2026-11)** table; use read-only endpoints (`/readonly`, `read_only=true`) unless this pattern's gate authorizes writes. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

1. Enterprise MCP defaults to deny; each server needs an allowlist owner
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Strip write tools from any server that can touch confidential tenants

## Anti-patterns

- Org-wide MCP enablement without a Statement of Applicability row
- Claiming ISO/NIST progress because a logo MCP connector exists
- Cross-tenant retrieval through a shared filesystem MCP root

## Checklist

- [ ] Enterprise MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the enterprise gate  
- [ ] Injection / tool PEP reviewed if tools can act

## Changelog

- **1.2 — 2026-11-06:** Pointed enable rules at vendor-hosted, read-only-first endpoints and client OAuth.
