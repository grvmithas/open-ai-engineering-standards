# MCP, A2A, and GenAI Observability Crosswalk

**Version:** 1.0.0  
**Date:** 2026-07-16  
**Status:** Informative

## Purpose

Define how OAIES contracts record security and telemetry evidence for Model Context Protocol authorization, Agent2Agent interoperability, and OpenTelemetry Generative AI semantic conventions.

## Why

Protocol compatibility does not establish authorization, trustworthy delegation, or operational assurance. OAIES records the policy boundary and evidence references around protocol-native messages and telemetry without redefining those protocols.

## MCP authorization crosswalk

| MCP authorization concern | OAIES evidence | Relationship |
|---|---|---|
| Protected-resource metadata and authorization-server discovery | MCP Server Record `authorization.resourceMetadata` and `authorizationServer` | `evidence-supports` |
| OAuth authorization-code flow with PKCE for user-delegated access | MCP authorization mode/scopes and evidence reference | `partial` |
| Resource Indicators and token audience validation | `audienceValidated`; security-review evidence | `evidence-supports` |
| No token passthrough to downstream services | `tokenForwardingProhibited: true` | `evidence-supports` |
| Least-privilege and incremental consent | Scope inventory; Tool Contract delegation and least-privilege review | `partial` |
| Client registration and identity trust | Security-review evidence | `partial` |
| Local `stdio` trust boundary | Deployment transport, local-process mode, trust-boundary statement | `partial` |

MCP servers must validate that tokens were issued for that server. A token received from an MCP client must not be forwarded as the server’s credential to another resource.

## A2A crosswalk

| A2A concern | OAIES evidence | Relationship |
|---|---|---|
| Agent discovery and Agent Card | Agent Definition identity, role, communication protocol, capabilities through tool refs | `partial` |
| Authentication scheme declaration | Agent communication `authentication`; deployment security evidence | `evidence-supports` |
| Task lifecycle and terminal states | Agent termination criteria, failure policy, safe state | `partial` |
| Messages, parts, and artifacts | Versioned `messageSchema`; Evidence Bundle digests for durable artifacts | `partial` |
| Streaming and asynchronous operations | Runtime telemetry and failure/timeout evidence | `no-mapping` |
| Per-task authorization and delegation | Agent authority, allowed/prohibited actions, approval gates, delegated user context | `partial` |
| Cross-agent trust | Workload identity, signed messages where required, artifact validation, no transitive trust | `partial` |

A2A interoperability does not mean one agent may exercise another agent’s privileges. The receiving agent must re-authorize each requested operation against local policy.

## OpenTelemetry GenAI crosswalk

| GenAI semantic-convention signal | OAIES correlation | Required handling |
|---|---|---|
| Model/provider operation spans | Model Record ID/version and AI System Manifest component ref | Record stable registry IDs in addition to provider attributes |
| Agent spans | Agent Definition ID/version | Correlate delegated tasks without treating trace context as authorization |
| Tool execution spans | Tool Contract ID/version, side-effect and risk class | Record outcome and policy decision; redact arguments/results |
| MCP operation spans | MCP Server Record ID/protocol version | Capture transport, server identity, error class, and latency |
| Token usage and duration metrics | Evaluation/operational evidence | Apply cardinality budgets; preserve billing-source reconciliation |
| Input/output content attributes and events | Context/Prompt classification | Disabled by default; opt in only after privacy and retention approval |
| Error attributes | Incident correlation | Use stable error taxonomy; never put secrets or raw prompts in status text |

OpenTelemetry semantic conventions can be marked stable, experimental, or development independently by signal and version. Pin the semantic-convention version in telemetry configuration and Evidence Bundles; do not copy an unstable attribute into a permanent compliance contract without an adapter.

## How

1. Pin MCP, A2A, and OpenTelemetry semantic-convention versions per deployment.
2. Register each server and agent before connectivity is enabled.
3. Bind protocol capabilities to explicit Tool Contracts and agent authority.
4. Use OAuth resource/audience restrictions, workload identity, or mTLS according to the protocol and deployment; never infer authorization from discovery metadata.
5. Propagate trace context only as correlation data. Re-authenticate and re-authorize every trust-boundary crossing.
6. Emit metadata by default; capture prompt, completion, tool arguments, or artifacts only under an approved data policy.
7. Preserve redacted traces, configuration, schema versions, and test results in a digest-addressed Evidence Bundle.

## Equivalence limits

OAIES does not certify MCP or A2A protocol conformance and does not redefine their wire formats. OpenTelemetry-compatible telemetry does not prove control effectiveness, complete trace coverage, or correct authorization. Protocol projects and OpenTelemetry do not endorse this crosswalk.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Protocol records make trust boundaries auditable | Version churn requires adapters and migration tests |
| Common telemetry correlates model, agent, and tool activity | High-cardinality and content capture create cost/privacy risk |
| Local re-authorization limits privilege propagation | Additional checks increase latency |

## Anti-patterns

- **Discovery equals trust:** accepting an Agent Card or MCP metadata document without authenticated origin and policy review.
- **Trace context equals identity:** using trace headers as credentials or authorization evidence.
- **Token passthrough:** forwarding a client bearer token to a downstream API.
- **Telemetry data lake:** recording raw prompts, completions, memory, or tool payloads by default.
- **Semantic-version drift:** changing attribute names in-place without pinning and translation.

## Enterprise considerations

Use centralized IAM policy with resource-specific audiences, managed workload identities, key rotation, and revocation. Apply regional data routing, tenant isolation, retention, legal hold, and subject-rights handling to telemetry. High-impact inter-agent actions require attributable user delegation or an approved service authority.

## Authoritative sources

- [Model Context Protocol — Authorization](https://modelcontextprotocol.io/specification/latest/basic/authorization)
- [Model Context Protocol — Security best practices](https://modelcontextprotocol.io/specification/latest/basic/security_best_practices)
- [Agent2Agent Protocol specification](https://a2a-protocol.org/latest/specification/)
- [OpenTelemetry GenAI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/)
- [OpenTelemetry semantic-convention stability](https://opentelemetry.io/docs/specs/semconv/general/semantic-convention-stability/)

Sources accessed 2026-07-16. The deployment record must pin the exact protocol and semantic-convention versions actually implemented.

## Checklist

- [ ] MCP resource metadata, scopes, audience validation, and no-passthrough rule are verified
- [ ] A2A peers are authenticated and every task is locally authorized
- [ ] Protocol versions and message schemas are pinned
- [ ] Trace context is used only for correlation
- [ ] Content telemetry is disabled by default and explicitly approved
- [ ] No protocol-conformance or endorsement claim is inferred from OAIES validation

## Changelog

### 1.0.0 — 2026-07-16

- Added MCP authorization, A2A, and OpenTelemetry GenAI mappings.
