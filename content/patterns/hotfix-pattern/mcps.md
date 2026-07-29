# Hotfix Pattern — MCP recommendations

> **Pattern:** Hotfix  
> **Component:** mcps.md  
> **Version:** 1.1 | **Updated:** 2026-07-29

---

## Purpose

Least-privilege MCP servers for the **Hotfix** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | Hotfix PR with allowed paths |
| [Sentry](../../mcps/observability/sentry.mcp.md) | Error fingerprint / volume |
| [Slack](../../mcps/communication/slack.mcp.md) | Optional — IC channel (read/write carefully) |
| [Kubernetes](../../mcps/infrastructure-data/kubernetes.mcp.md) | Optional — restart/rollout |

## When to enable for Hotfix

Sentry/Slack/Kubernetes support the IC. Prefer rollback tools over speculative restarts that destroy evidence.

## Enable rules (this pattern)

1. Hotfix MCP write tools require a named IC in the session header
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Narrow GitHub path filters to the approved hotfix paths only

## Anti-patterns

- Mass pod restarts via MCP before capturing logs/fingerprints
- Editing out-of-path files because the agent “saw related code”
- Posting customer data into Slack MCP channels during the SEV

## Checklist

- [ ] Hotfix MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the hotfix gate  
- [ ] Injection / tool PEP reviewed if tools can act
