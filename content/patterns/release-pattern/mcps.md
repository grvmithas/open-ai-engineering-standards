# Release Pattern — MCP recommendations

> **Pattern:** Release  
> **Component:** mcps.md  
> **Version:** 1.2 | **Updated:** 2026-11-06

---

## Purpose

Least-privilege MCP servers for the **Release** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | Release PRs / tags |
| [Kubernetes](../../mcps/infrastructure-data/kubernetes.mcp.md) | Optional — rollout status |
| [Docker](../../mcps/infrastructure-data/docker.mcp.md) | Optional — image digests |
| [Sentry](../../mcps/observability/sentry.mcp.md) | Post-release error watch |

## When to enable for Release

GitHub/Docker for digests and tags; Kubernetes for rollout status; Sentry for post-release watch. Promote remains a human decision.

## Enable rules (this pattern)

Connect through the vendor-hosted endpoint and client OAuth listed in each spec's **Deployment status (2026-11)** table; use read-only endpoints (`/readonly`, `read_only=true`) unless this pattern's gate authorizes writes. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

1. Release MCPs report status — they do not own the abort call
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Disable cluster mutate tools after canary starts unless abort is invoked

## Anti-patterns

- Promoting because MCP said the rollout “succeeded” without eval evidence
- Unpinning digests to “just get it out”
- Skipping abort-owner assignment when using Kubernetes MCP

## Checklist

- [ ] Release MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the release gate  
- [ ] Injection / tool PEP reviewed if tools can act

## Changelog

- **1.2 — 2026-11-06:** Pointed enable rules at vendor-hosted, read-only-first endpoints and client OAuth.
