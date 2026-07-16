# GitHub MCP Integration

> **Version:** 2.1 | **Updated:** 2026-07-16 | **Owner:** Platform Engineering

## Purpose
Connect agents to GitHub repositories, issues, pull requests, Actions, and security findings through GitHub's official MCP server. Use it for bounded software-delivery workflows; do not use it as an unrestricted GitHub API proxy.

## Applicability
Use the hosted server for GitHub.com and the official local server for GitHub Enterprise Server, private-network access, or controlled toolsets. Separate read-only analysis from write workflows and require approval before merge, workflow dispatch, settings, or content mutation.

## Protocol, implementation, transports, and capability lifecycle
- Baseline MCP `2025-11-25`; negotiate `protocolVersion` during `initialize` and reject unsupported revisions.
- Prefer GitHub's hosted Streamable HTTP service. The official [`github/github-mcp-server`](https://github.com/github/github-mcp-server) supports local `stdio` and containers.
- Enable only required toolsets; advertise `tools`, `resources`, `prompts`, and `logging` only when implemented. Emit `notifications/tools/list_changed` after an entitlement or configuration change.

## Tool, resource, and prompt design
| Primitive | Contract |
|---|---|
| Tools | `search_repositories`, `get_file_contents`, `list_issues`, `get_pull_request`, `create_issue`, `add_issue_comment`; mutation tools are separately enabled and approval-gated. |
| Resources | Canonical, read-only URIs such as `github://acme/payments/issues/123` and `github://acme/payments/contents/src/main.ts?ref=4f3c2b1`; immutable SHA references are preferred. |
| Prompts | `triage_issue` and `review_pull_request` return instructions and bounded resource references, never execute writes. |

Inputs use closed JSON Schemas, normalized `owner/repo`, bounded result counts, SHA/ref validation, and repository allowlists. Outputs are size-bounded typed summaries with opaque pagination cursors; untrusted Markdown, diffs, comments, and logs are labeled as data and secrets are redacted.

## Authorization and consent
Hosted deployments MUST publish RFC 9728 Protected Resource Metadata at the well-known URI and return a standards-compliant `WWW-Authenticate` challenge. Discover the authorization server from that metadata; use authorization code flow with PKCE `S256`, verify advertised PKCE support, and send the canonical MCP URI as RFC 8707 `resource` in both authorization and token requests.

Validate signature, issuer, expiry, not-before, authorized party where applicable, and audience/resource against this MCP server. Never accept a GitHub token minted for another audience and never pass the inbound MCP bearer token through to GitHub. Exchange or map it server-side to a short-lived GitHub App installation token. Show repository/tool permissions and write impact at consent; request only permissions shown by GitHub for the selected toolsets. Do not invent or hard-code OAuth scope names. Keep per-user, per-installation credentials isolated and encrypted.

## Security controls
| Risk | Required control |
|---|---|
| Prompt injection/tool poisoning | Treat repository text as untrusted; pin the official image/package; sign deployment manifests; diff tool metadata before accepting `list_changed`. |
| Data exfiltration | Repository/organization allowlists, output DLP, response-size limits, and approval for cross-repository transfer. |
| SSRF | Call only configured GitHub API/upload hosts; reject user-supplied absolute URLs, redirects to other origins, and private-address resolution. |
| Destructive writes | Branch protection remains authoritative; bind approval to exact tool arguments and expire it after one call. |

## Operations
Honor GitHub's primary and secondary rate-limit headers and GraphQL cost data; do not publish a fixed quota. Use bounded exponential backoff with jitter for idempotent reads, never blindly retry writes, and expose remaining-budget telemetry without tokens. Record OpenTelemetry spans with tool, hashed installation/repository, status, latency, pagination, rate-limit state, and approval ID; redact source, issue bodies, authorization headers, and tokens.

Tenant keys are organization plus GitHub App installation; prevent cache, cursor, token, and audit-log crossover. Revoke by suspending/uninstalling the GitHub App, deleting server-side grants, invalidating sessions, and clearing credential-bound caches. Incident response: disable write toolsets, revoke installations/tokens, preserve tamper-evident audit records, identify affected repositories and calls, rotate secrets, notify owners, and re-enable after tested containment.

## Verification
- Contract-test initialize/version negotiation, pagination, schemas, errors, and `list_changed`.
- Verify RFC 9728 discovery, PKCE downgrade refusal, RFC 8707 binding, issuer/audience rejection, expiry, revocation, and tenant isolation.
- Adversarially test malicious issue text, poisoned tool descriptions, redirect/DNS SSRF, secret-bearing diffs, oversized output, replayed approvals, and rate-limit recovery.
- Run write tests only in an isolated GitHub organization with branch protection and assert no token passthrough.

## Tradeoffs
The official server tracks GitHub features and reduces adapter drift, but its broad catalog increases context and authorization surface. Toolset allowlisting sacrifices coverage for predictable behavior. GitHub App installation tokens require administration but provide stronger repository isolation than personal access tokens.

## Anti-patterns
- Using classic broad personal access tokens or copying MCP bearer tokens into GitHub API calls.
- Loading every toolset, allowing model-selected repositories, or auto-merging after a text-only confirmation.
- Logging diffs, comments, headers, or raw GraphQL responses as telemetry.

## Enterprise considerations
Enforce GitHub Enterprise policies, SSO, IP allowlists, branch/rulesets, data residency, retention, legal hold, and audit export independently of the MCP server. Pin releases and images, generate an SBOM, verify provenance, stage upgrades, and assign organization-level owners for grants and incident response.

## Checklist
- [ ] Official server pinned; tools and repositories allowlisted
- [ ] MCP negotiation, change notifications, and schemas tested
- [ ] RFC 9728, PKCE S256, RFC 8707, issuer/audience validation enforced
- [ ] No token passthrough; short-lived GitHub App credentials used
- [ ] Consent, least privilege, approval, DLP, SSRF, and injection controls verified
- [ ] Rate-limit telemetry, tenant isolation, revocation, incidents, and adversarial tests operational

## Primary references
- [GitHub MCP Server](https://github.com/github/github-mcp-server)
- [GitHub Apps authentication](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app)
- [GitHub REST rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- [MCP authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

## Changelog
- **2.1 — 2026-07-16:** Replaced template-style URI markers with concrete canonical examples.
- **2.0 — 2026-07-16:** Replaced the legacy PAT-oriented draft with a production hosted/local, OAuth, threat, operations, and verification specification.
