# Optimization Pattern — MCP recommendations

> **Pattern:** Optimization  
> **Component:** mcps.md  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Least-privilege MCP servers for the **Optimization** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [Datadog](../../mcps/observability/datadog.mcp.md) | Latency/error baselines |
| [Grafana](../../mcps/observability/grafana.mcp.md) | Optional dashboards |
| [Sentry](../../mcps/observability/sentry.mcp.md) | Error regression watch |

## When to enable for Optimization

Datadog/Grafana/Sentry provide baselines and regression watch. Enable them before changing hot paths; keep write/deploy tools off.

## Enable rules (this pattern)

Connect through the vendor-hosted endpoint and client OAuth listed in each spec's **Deployment status (2026-11)** table; use read-only endpoints (`/readonly`, `read_only=true`) unless this pattern's gate authorizes writes. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

1. Optimization MCPs are measurement planes — never auto-tune production
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Freeze dashboard queries that define the baseline so they cannot silently change mid-run

## Anti-patterns

- Optimizing against a dashboard that was edited during the experiment
- Shipping a hot-path change because p50 improved while p99 was ignored
- Using MCP to mutate feature flags without a correctness oracle

## Checklist

- [ ] Optimization MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the optimization gate  
- [ ] Injection / tool PEP reviewed if tools can act

## Changelog

- **1.2 — 2026-11-06:** Pointed enable rules at vendor-hosted, read-only-first endpoints and client OAuth.
