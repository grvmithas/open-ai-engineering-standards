# Debug Pattern — MCP recommendations

> **Pattern:** Debug  
> **Component:** mcps.md  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Least-privilege MCP servers for the **Debug** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | Issue/repro links |
| [Sentry](../../mcps/observability/sentry.mcp.md) | Error fingerprints (read-only first) |
| [Datadog](../../mcps/observability/datadog.mcp.md) | Optional — latency/error signals |

## When to enable for Debug

Sentry/Datadog stay read-only until hypotheses are ranked. GitHub links the issue/repro; do not patch via MCP.

## Enable rules (this pattern)

Connect through the vendor-hosted endpoint and client OAuth listed in each spec's **Deployment status (2026-11)** table; use read-only endpoints (`/readonly`, `read_only=true`) unless this pattern's gate authorizes writes. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

1. Observability MCPs are evidence sources, not auto-remediation
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Disable any write/restart tool until containment is an explicit IC decision

## Anti-patterns

- Restarting pods through MCP to “clear” an intermittent bug
- Pasting full PII-bearing stack traces into the model without redaction
- Declaring fixed because the error fingerprint volume dipped once

## Checklist

- [ ] Debug MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the debug gate  
- [ ] Injection / tool PEP reviewed if tools can act

## Changelog

- **1.2 — 2026-11-06:** Pointed enable rules at vendor-hosted, read-only-first endpoints and client OAuth.
