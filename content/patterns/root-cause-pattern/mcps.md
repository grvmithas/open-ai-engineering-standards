# Root Cause Pattern — MCP recommendations

> **Pattern:** Root Cause  
> **Component:** mcps.md  
> **Version:** 1.1 | **Updated:** 2026-07-29

---

## Purpose

Least-privilege MCP servers for the **Root Cause** pattern. Keep `mcpServers: {}` until a human enables stubs after [MCP when and how](../../handbook/mcp-when-and-how.md).

## Recommended MCPs

| MCP | Why for this pattern |
|-----|----------------------|
| [GitHub](../../mcps/version-control/github.mcp.md) | Timeline commits/PRs |
| [Sentry](../../mcps/observability/sentry.mcp.md) | Error chronology |
| [Datadog](../../mcps/observability/datadog.mcp.md) | Optional — metric inflection |

## When to enable for Root Cause

GitHub/Sentry/Datadog reconstruct the timeline after containment. RCA MCPs stay read-only; documentation is a human-owned artifact.

## Enable rules (this pattern)

1. Root-cause MCP is chronology — not automatic ticket closure
2. Never commit tokens; map secrets outside git  
3. Record allowlist + data class in MODEL_POLICY / SoA before write tools  
4. Do not enable write tools that can alter historical incident records

## Anti-patterns

- Closing the RCA because MCP “summarized” the outage
- Editing production monitors mid-RCA and losing the pre-fix signal
- Skipping follow-up owners because the fingerprint volume returned to baseline

## Checklist

- [ ] Root Cause MCPs mapped to env secrets outside git  
- [ ] Unused servers remain disabled after the root cause gate  
- [ ] Injection / tool PEP reviewed if tools can act
