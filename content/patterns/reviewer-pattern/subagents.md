# Reviewer Pattern — Subagents

> **Pattern:** Reviewer  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Diff Mapper | Inventories changed paths and behavioral deltas | Start of review | Path table + “behavior changed?” flags |
| Security Scanner | Entry points, authZ, injection, secrets, AI tool misuse | Pass 2 | Security findings with severity |
| Test Adequacy Checker | Maps each AC to tests; flags untested paths | Pass 4 | AC→test matrix + gaps |

## Diff Mapper contract

- List every modified/added/deleted path
- Flag contract surfaces: OpenAPI, proto, SQL migrations, auth middleware
- Exclude generated noise unless generation rules changed

## Security Scanner contract

- Trace untrusted input to use sites
- Require authZ check near every tenancy-scoped query
- Fail closed on hardcoded secrets or disabled TLS verification
- If `IS_AI=yes`, check tool allowlists and prompt/data separation

## Test Adequacy Checker contract

- One row per acceptance criterion
- “Covered” only if a named test asserts the behavior
- Happy-path-only coverage on High-risk changes → Medium finding minimum
