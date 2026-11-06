# GitLab MCP Integration

> **Version:** 1.3 | **Updated:** 2026-11-06 | **Category:** Version Control

## Purpose and applicability
Provide agent-safe access to projects, merge requests, issues, pipelines. Use this integration only when those capabilities are required and a named owner accepts the data and write risk. The implementation baseline is GitLab's official remote MCP service or GitLab-maintained server.

## Why use it — and when not to
Use GitLab's server when GitLab hosts the code and the agent needs merge requests, pipelines, and issues as context or must post review comments. OAuth with project-scoped access keeps it within the user's permissions. Pipeline triggers and merges remain human actions governed by protected branches.

## How to connect — deployment status (2026-11)
| Field | Current guidance |
|---|---|
| Deployment | Vendor-hosted remote |
| Endpoint / package | `https://gitlab.com/api/v4/mcp` (self-managed: `https://<host>/api/v4/mcp`) |
| Auth | GitLab OAuth |
| Least-privilege setup | Project-scoped consent; MR writes approval-gated |
| Avoid | Personal access tokens with `api` scope in client config |
| AIES kit id | `gitlab` |

Trust only MCP Registry entries under a reverse-DNS namespace the vendor controls (for example `com.monday/*`); aggregator and look-alike listings are third-party code. Remote endpoint liveness is re-checked weekly by `scripts/check-external.mjs`. See [MCP: remote servers & OAuth](../../handbook/mcp-remote-servers-and-auth.md).

## Protocol, transport, and capability lifecycle
Implement MCP `2026-07-28` (current stable: stateless Streamable HTTP, no session affinity required); keep `2025-11-25` negotiation only while clients migrate. Negotiate `protocolVersion` in `initialize`; reject unsupported versions. Prefer Streamable HTTP for remote service and `stdio` only for a local, single-user process; do not expose `stdio` through a network shim. Advertise only implemented `tools`, `resources`, `prompts`, and `logging`. Paginate lists, use progress/cancellation where supported, and send the corresponding `list_changed` notification after authorization or configuration changes. Clients re-list and review metadata changes before use.

## Tool, resource, and prompt design
- **Tools:** bounded list/get/search operations over projects, merge requests, issues, pipelines; mutations are separate, disabled by default, idempotency-aware, and approval-gated.
- **Resources:** canonical read-only URIs scoped to project/namespace; stable IDs and versions replace display names where possible.
- **Prompts:** vendor-specific triage/review prompts return instructions and resource links only; prompts never silently invoke tools.
- **Validation:** closed JSON Schemas; normalize and authorize project path and numeric IDs; cap arrays, strings, time ranges, rows, bytes, and pagination. Return typed, size-bounded results with opaque cursors and structured errors. Label all provider content untrusted and redact credentials, secrets, personal data, and internal URLs.

## Authorization, consent, and least privilege
Remote deployments publish RFC 9728 Protected Resource Metadata and standards-compliant `WWW-Authenticate`. Discover the authorization server from metadata, require authorization code flow with PKCE `S256`, verify advertised PKCE support, and include the canonical MCP URI as RFC 8707 `resource` in authorization and token requests. Clients register with Client ID Metadata Documents (CIMD) where the authorization server supports them; Dynamic Client Registration is a fallback, not the default. Validate token signature, issuer, expiry/not-before, authorized party when applicable, and audience/resource for this server.

Never pass an inbound MCP bearer token to the provider. Exchange/map it server-side to a short-lived, tenant-bound provider credential. Consent names the provider, tenant, enabled tools, data classes, and write effects. Use GitLab project membership and protected-branch policy; rely on the provider's current permission catalog and consent screen—never invent scope names. Step-up authorization cannot silently broaden prior consent.

## Threat controls
| Risk | Mandatory control |
|---|---|
| Prompt injection | Treat provider/web/database text as data; instructions in results cannot authorize calls or alter policy. |
| Tool poisoning | Pin package/image and provenance; allowlist tools; diff descriptions/schemas on change before activation. |
| Exfiltration | Enforce tenant/object allowlists, DLP/redaction, egress policy, response caps, and approval for cross-boundary transfer. |
| SSRF | Fixed provider origins, DNS/IP checks, redirect revalidation, private/link-local denial, and no arbitrary URL fetch tool. |
| Unsafe writes | Policy plus provider authorization, exact-argument approval, concurrency checks, idempotency key where supported, and no blind retry. |

## Operations, tenancy, and incidents
Rate-limit against GitLab rate-limit headers. Do not claim a fixed limit where the provider makes limits endpoint-, plan-, or tenant-dependent. Apply budgets per user/tenant/tool, bounded jittered backoff for idempotent reads, circuit breaking, and surfaced retry times.

Emit OpenTelemetry metrics/spans for tool, tenant hash, status, latency, bytes, pagination, approval ID, provider request ID, and rate-limit state; never record tokens or raw content. Partition credentials, caches, cursors, browser/database sessions, telemetry, and audit records by project/namespace. Re-authorize on tenant change.

Revocation disables the grant immediately, removes provider credentials, terminates sessions, and evicts credential-bound caches. Incident response: disable risky tools, revoke/rotate credentials, preserve tamper-evident audit evidence, identify tenants/calls/data, contain egress, notify owners under policy, patch and adversarially retest before staged restoration.

## Verification
- Contract-test initialization/version failure, capability declarations/change, schemas, pagination, cancellation, errors, and output caps.
- Test RFC 9728 discovery, PKCE downgrade refusal, RFC 8707 resource binding, issuer/audience/expiry rejection, no token passthrough, consent, revocation, and tenant isolation.
- Attack-test injected content, poisoned tool metadata, DNS rebinding/redirect SSRF, oversized/secret output, confused deputy, approval replay, cross-tenant cursors, and rate-limit exhaustion.
- Test read and write paths in a disposable tenant; prove provider authorization and rollback/compensation behavior.

## Tradeoffs
Hosted integration reduces maintenance but couples availability to GitLab. Least-privilege tool selection reduces agent flexibility and requires ongoing permission and schema maintenance.

## Anti-patterns
- Broad administrator credentials, undocumented scopes/quotas, shared cross-tenant sessions, or secrets in config/logs.
- Exposing the provider API one-for-one, enabling all tools, trusting returned instructions, or treating model confirmation as durable approval.
- Retrying writes after ambiguous failure, accepting arbitrary URLs/queries/paths, or logging complete payloads.

## Enterprise considerations
Enforce GitLab group SAML/SCIM, protected branches, push rules, compliance pipelines, audit-event export, project classification, and namespace residency controls. Enforce separation of duties, legal hold and accessibility requirements where applicable; pin releases, verify provenance/SBOMs, stage upgrades, and document RTO/RPO plus outage behavior.

## Checklist
- [ ] Implementation and transports approved; MCP negotiation and capability change tested
- [ ] Tools/resources/prompts bounded; input/output validation and write approvals enforced
- [ ] RFC 9728, PKCE S256, RFC 8707, issuer/audience validation, consent, and least privilege verified
- [ ] No token passthrough; injection, exfiltration, SSRF, and tool-poisoning defenses tested
- [ ] Provider-aware limits, redacted telemetry, tenancy, revocation, and incident runbook operational
- [ ] Tradeoffs, enterprise controls, contract/integration/adversarial tests accepted

## Primary references
- [GitLab implementation/API](https://docs.gitlab.com/user/gitlab_duo/model_context_protocol/mcp_server/)
- [GitLab limits/security](https://docs.gitlab.com/ee/api/rest/#rate-limits)
- [MCP specification `2026-07-28`](https://modelcontextprotocol.io/specification/2026-07-28/)
- [MCP authorization](https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)

## Changelog
- **1.3 — 2026-11-06:** Added service-specific "Why use it — and when not to" guidance.
- **1.2 — 2026-11-06:** Added 2026-11 deployment status (vendor-hosted endpoint, auth, least-privilege setup, registry trust rule); moved the protocol baseline to MCP `2026-07-28`; added CIMD client registration.
- **1.1 — 2026-07-16:** Replaced a template marker with concrete service-specific enterprise controls.
- **1.0 — 2026-07-16:** Initial production specification.
