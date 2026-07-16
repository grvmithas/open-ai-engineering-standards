# MCP Integration Standard

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Protocol baseline:** MCP `2025-11-25`

## Purpose
Define the production contract for connecting agents to external systems through Model Context Protocol (MCP). This inventory provides exactly 24 service-specific specifications with implementation, authorization, threat, operations, enterprise, and verification requirements.

## Why
MCP removes client-by-service integration duplication, but protocol compatibility does not make an integration safe. Tool metadata can be poisoned, provider content can inject instructions, broad credentials can create confused deputies, and remote servers introduce OAuth, tenancy, egress, and incident-response obligations. These specifications make those controls explicit and testable.

## How to use this standard
1. Select the service specification from the inventory and confirm its applicability and official implementation status.
2. Enable only tools, resources, and prompts required by the approved use case. The correct number is determined by task need, client context budget, authorization surface, and evaluation evidence—not a universal numeric maximum.
3. Separate reads from mutations. Require policy evaluation and human approval bound to the exact arguments for consequential writes.
4. Implement the authorization profile below for remote servers; keep local `stdio` servers local and single-user.
5. Validate schemas, provider identifiers, destinations, outputs, pagination, and size/cost limits. Treat all retrieved content as untrusted data.
6. Verify contract, integration, authorization, tenant-isolation, adversarial, revocation, and incident tests before production.

## Protocol and capability lifecycle
- Negotiate `protocolVersion` during `initialize`; support MCP `2025-11-25` or fail explicitly.
- Use Streamable HTTP for remote servers. Use `stdio` only for a local child process; never expose it through an unauthenticated network wrapper.
- Advertise only implemented capabilities. Paginate lists and implement cancellation/progress where the operation warrants it.
- Send the applicable `notifications/tools/list_changed`, `notifications/resources/list_changed`, or `notifications/prompts/list_changed` notification after a material catalog or entitlement change. Clients must re-list and review changed metadata before use.
- Prefer official vendor-hosted servers or vendor-maintained packages. Pin local packages/images and verify release provenance; a community server requires an explicit security review and named maintainer.

## Authorization profile for remote MCP servers
MCP `2025-11-25` remote authorization is an OAuth protected-resource flow, not provider-token forwarding:

1. The MCP server publishes OAuth 2.0 Protected Resource Metadata under RFC 9728 and returns a standards-compliant `WWW-Authenticate` challenge.
2. The client discovers an authorization server only through validated protected-resource and authorization-server metadata.
3. Authorization code flow uses PKCE. The client verifies advertised support and uses `S256`; it refuses authorization when required PKCE metadata is absent.
4. The client includes the canonical MCP server URI as the RFC 8707 `resource` value in both authorization and token requests.
5. The MCP server validates token signature, issuer, expiry/not-before, authorized party when applicable, and audience/resource. A token for another resource is rejected.
6. The MCP server never passes the inbound MCP bearer token through to the downstream provider. It uses a server-side exchange or maps the identity to a separate short-lived, tenant-bound provider credential.
7. Consent identifies the service, tenant, enabled capabilities, data classes, and write effects. Step-up authorization cannot silently broaden previous consent.

Local servers that use environment credentials still require least privilege, secret-manager delivery, rotation, process isolation, and provider-side authorization. They must not claim compliance with the remote OAuth profile unless they implement it.

## Tool, resource, and prompt design
- Tool names describe intent; descriptions state when to use the tool, side effects, approval needs, and important limits.
- Inputs use closed JSON Schemas, bounded strings/arrays/time ranges, canonical provider IDs, explicit pagination, and destination allowlists.
- Outputs are typed, bounded, redacted, and labeled as untrusted. Return stable IDs, source references, provider request IDs, and structured errors.
- Resources are read-only, canonical, tenant-scoped, and versioned where the provider permits. Prompts return instructions and resource references; they do not silently execute writes.
- Provider text, code, logs, tickets, messages, pages, traces, database values, and web content cannot authorize another tool call or override system policy.

## Security and privacy controls
| Risk | Required control |
|---|---|
| Prompt injection | Preserve trust boundaries, label external content, isolate instructions from data, and evaluate adversarial content. |
| Tool poisoning | Pin provenance, allowlist tools, diff names/descriptions/schemas after change notifications, and require review before activation. |
| Data exfiltration | Object and tenant allowlists, DLP/redaction, egress policy, response caps, and approval for cross-boundary movement. |
| SSRF | Fixed provider origins, DNS/IP and redirect revalidation, private/link-local denial, and no arbitrary URL-fetch primitive. |
| Confused deputy | User/tenant-bound credentials, provider authorization on every operation, exact-argument approvals, and audience validation. |
| Unsafe mutation | Optimistic concurrency, idempotency where supported, no blind write retry, and rollback or compensation testing. |

## Rate limits, telemetry, and audit
Use each provider's documented response headers, cost model, retry signals, and endpoint/plan limits; do not invent a fixed quota. Apply per-user, per-tenant, and per-tool budgets, bounded exponential backoff with jitter for idempotent reads, circuit breaking, and explicit handling of ambiguous writes.

Record enough metadata to reconstruct authorization and operational decisions: timestamp, actor/tenant pseudonym, tool, outcome, latency, bytes, provider request ID, approval reference, policy decision, and rate-limit state. Do not universally log raw inputs or outputs. Capture content only when an approved purpose, classification, minimization rule, access control, retention period, and redaction policy require it. Never log bearer tokens, provider credentials, secrets, or unrestricted payloads.

## Tenancy, revocation, and incident response
Partition credentials, caches, cursors, sessions, telemetry, and audit records by the service's tenant boundary. Re-authorize tenant changes. Revocation must disable the MCP grant immediately, remove provider credentials, terminate active sessions, and evict credential-bound caches.

Incident runbooks must support disabling risky tools, revoking/rotating credentials, preserving tamper-evident evidence, identifying affected tenants/calls/data, containing egress, notifying owners under policy, patching, adversarial retesting, and staged restoration.

## Inventory

### Version Control
- [GitHub](./version-control/github.mcp.md)
- [GitLab](./version-control/gitlab.mcp.md)
- [Azure DevOps](./version-control/azure-devops.mcp.md)
- [Bitbucket Cloud](./version-control/bitbucket-cloud.mcp.md)

### Project Management
- [Jira Cloud](./project-management/jira.mcp.md)
- [Linear](./project-management/linear.mcp.md)
- [Notion](./project-management/notion.mcp.md)
- [Asana](./project-management/asana.mcp.md)
- [monday.com](./project-management/monday.mcp.md)

### Communication
- [Slack](./communication/slack.mcp.md)
- [Microsoft Teams](./communication/microsoft-teams.mcp.md)
- [Discord](./communication/discord.mcp.md)

### Infrastructure and Data
- [Filesystem](./infrastructure-data/filesystem.mcp.md)
- [Docker](./infrastructure-data/docker.mcp.md)
- [Kubernetes](./infrastructure-data/kubernetes.mcp.md)
- [PostgreSQL](./infrastructure-data/postgresql.mcp.md)
- [Redis](./infrastructure-data/redis.mcp.md)
- [Supabase](./infrastructure-data/supabase.mcp.md)

### Observability
- [Sentry](./observability/sentry.mcp.md)
- [Datadog](./observability/datadog.mcp.md)
- [Grafana](./observability/grafana.mcp.md)
- [OpenTelemetry](./observability/opentelemetry.mcp.md)

### Browser and Testing
- [Playwright](./browser-testing/playwright.mcp.md)
- [Chrome DevTools](./browser-testing/chrome-devtools.mcp.md)

## Tradeoffs
MCP standardizes discovery and invocation but adds another authorization and supply-chain boundary. Official hosted servers reduce adapter drift while introducing vendor availability and data-path dependencies. Narrow catalogs and approvals reduce agent autonomy and add latency, but they constrain blast radius and make behavior auditable.

## Anti-patterns
- Forwarding the MCP access token to a provider, accepting a token minted for another audience, or inventing provider scope names.
- Treating every provider endpoint as a tool, enforcing an arbitrary global tool-count limit, or loading catalogs without evaluation.
- Trusting instructions returned by tools/resources, accepting arbitrary destinations, or sharing credentials/cursors across tenants.
- Logging all raw inputs and outputs by default, retrying writes after ambiguous failures, or enabling destructive tools through model confirmation alone.

## Enterprise considerations
Integrate SSO/SCIM, separation of duties, approved-app workflows, DLP, audit export, retention/deletion, legal hold, eDiscovery, accessibility, residency, and incident notification according to each service specification and data classification. Maintain an owner, data-flow record, threat model, vendor review, SBOM/provenance record, upgrade policy, RTO/RPO, credential inventory, and tested decommission path for every deployment.

## Checklist
- [ ] One inventory specification and named owner selected
- [ ] MCP version, transport, capabilities, pagination, cancellation, and change notifications tested
- [ ] RFC 9728 discovery, PKCE S256, RFC 8707 binding, issuer/audience validation, and no token passthrough verified
- [ ] Consent, least privilege, provider authorization, and argument-bound mutation approval tested
- [ ] Input/output validation, injection, exfiltration, SSRF, tool poisoning, and confused-deputy tests pass
- [ ] Provider-aware rate controls and minimized, redacted telemetry are operational
- [ ] Tenant isolation, revocation, incident response, enterprise controls, and decommissioning are tested
- [ ] Package/image provenance, citations, inventory count, and links are current

## Primary references
- [MCP specification `2025-11-25`](https://modelcontextprotocol.io/specification/2025-11-25/)
- [MCP authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [OAuth 2.0 Protected Resource Metadata — RFC 9728](https://www.rfc-editor.org/rfc/rfc9728)
- [Resource Indicators for OAuth 2.0 — RFC 8707](https://www.rfc-editor.org/rfc/rfc8707)
- [Proof Key for Code Exchange — RFC 7636](https://www.rfc-editor.org/rfc/rfc7636)
- [OAuth 2.0 Security Best Current Practice — RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)

## Changelog
- **2.0 — 2026-07-16:** Replaced legacy universal tool-count and payload-logging claims; added the MCP 2025-11-25 authorization profile, capability lifecycle, threat controls, enterprise requirements, citations, and verified 24-file inventory.
- **1.0 — 2026-07-16:** Initial integration inventory.
