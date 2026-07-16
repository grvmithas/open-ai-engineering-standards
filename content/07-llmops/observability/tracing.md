# OpenTelemetry LLM Tracing

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative OAIES implementation profile

## Purpose
Create vendor-neutral end-to-end traces across gateway, retrieval, model, tools, and approvals.

## Why
Without causal traces, quality, cost, and incidents cannot be reconstructed.

## When
Use on every production request, with privacy-safe sampling.

## How
1. Propagate W3C trace context.
2. Instrument gateway, retrieval, model, tool, guardrail, and human-approval spans.
3. Use OpenTelemetry GenAI semantic conventions where stable; namespace experimental attributes.
4. Record artifact IDs and hashes, not sensitive prompt bodies by default.
5. Export to approved backends and test trace continuity.

## Version-pinning policy
The OpenTelemetry GenAI semantic conventions remain Development-status and moved from the core semantic-conventions repository to the dedicated `open-telemetry/semantic-conventions-genai` repository in 2026. Pin the exact commit or release used by instrumentation and collectors; do not silently adopt `main` or `latest`. As of 2026-07-16 the dedicated repository does not publish a final schema URL; do not invent one. Keep the OAIES telemetry-contract version explicit until an authoritative schema URL is available.

```yaml
telemetry_contract:
  contract_version: oaies-genai-trace/2
  otel_semconv_version: "PINNED_RELEASE"
  schema_url: "PINNED_SCHEMA_URL_IF_PUBLISHED"
  instrumentation_scope: "com.example.ai-gateway"
  instrumentation_version: "3.4.1"
  content_capture: disabled
  trace_context: "W3C traceparent + tracestate"
  baggage_allowlist: ["tenant.region", "risk.tier"]
  custom_attribute_prefix: "oaies."
```

An upgrade requires a fixture trace produced by old and new instrumentation, collector transformation tests, backend query compatibility, dashboard/alert review, redaction tests, and a migration window where both schema versions can be queried. Record custom fields under an organization namespace; never create fields beginning `gen_ai.*`.

## Span topology
```mermaid
flowchart LR
  A["HTTP/server span"] --> B["AI gateway policy span"]
  B --> C["retrieval span"]
  B --> D["gen_ai chat/completion span"]
  D --> E["tool execution client span"]
  E --> F["tool server span"]
  B --> G["guardrail/evaluation span"]
  B --> H["human approval wait/resume spans"]
  B --> I["response validation span"]
```

- Keep the inbound server span as trace root; do not create a second root at the model call.
- Represent retries as separate child model spans with `oaies.retry.attempt`; retain one logical request ID.
- Link asynchronous evaluation, human approval, and incident-analysis traces using OpenTelemetry links. Do not falsify parent/child timing across queues.
- Use producer/consumer messaging spans around durable queues and propagate W3C trace context in signed metadata.
- A tool call has both the model’s proposed tool-call record and the actual downstream client/server spans. Record proposed, policy-approved, attempted, and completed states separately.

## Required attribute contract
Use the exact names and requirements from the pinned OpenTelemetry release. The table identifies the minimum intent; the conformance test resolves version-specific spelling and stability.

| Span | Required attributes | OAIES extension | Prohibited by default |
|---|---|---|---|
| Model operation | `gen_ai.operation.name`, `gen_ai.provider.name`, requested model, response model/ID when returned, input/output token usage, `error.type` | `oaies.prompt.release`, `oaies.policy.release`, `oaies.route.id`, `oaies.risk.tier`, `oaies.data.class` | Raw input/output messages, API keys, full retrieved documents |
| Retrieval | database/search system attributes appropriate to client library, result count, duration | `oaies.retrieval.index_release`, `oaies.retrieval.query_hash`, `oaies.retrieval.document_set_hash` | Query text containing personal data; document bodies |
| Tool | pinned `gen_ai.tool.*` attributes where specified plus normal RPC/HTTP/database conventions | `oaies.tool.policy_decision`, `oaies.tool.side_effect`, `oaies.tool.approval_id` | Tool arguments/results unless field-level policy explicitly permits |
| Guardrail/evaluation | operation name, status, duration | `oaies.control.id`, `oaies.control.release`, `oaies.decision`, `oaies.reason.code` | Free-form hidden reasoning |
| Human approval | workflow and messaging identifiers | `oaies.approval.id`, `oaies.approval.outcome`, `oaies.approver.role` | Approver personal details beyond approved pseudonymous identity |

Every low-cardinality attribute has an owner and allowed-value registry. Never use user ID, session ID, prompt digest, trace ID, document ID, or error message as a metric label.

## Content-capture policy
1. Default to no prompt, completion, retrieved document, tool argument, or tool result content in telemetry.
2. Capture immutable artifact digests and bounded reason codes instead.
3. If content is essential for an approved evaluation sample, send it through a separate data path with purpose, lawful basis, sampling probability, field-level redaction, access, region, retention, deletion, and legal-hold controls.
4. Mark capture on the trace with a boolean and policy version, not the content itself.
5. Test canary secrets, personal-data patterns, indirect prompt injection, binary attachments, and structured tool payloads against redaction. Regex-only redaction is insufficient.

## Sampling and tail decisions
- Head-sample routine low-risk traffic using a documented probability.
- Tail-sample all errors, policy denials, severe evaluator outcomes, tool side effects, human overrides, novel releases, and provider/model changes.
- Preserve the sampling probability and policy version so rate estimation can be weighted.
- Bound tail-sampler memory and decision latency. If the tail sampler is unavailable, degrade to a privacy-safe head policy rather than exporting everything.
- Security audit logging and distributed tracing are separate controls: traces may be sampled; required action/audit records must not disappear with sampling.

## Collector pipeline
```yaml
receivers:
  otlp:
    protocols: {grpc: {}, http: {}}
processors:
  memory_limiter: {}
  transform/redact:
    error_mode: propagate
  attributes/allowlist: {}
  tail_sampling: {}
  batch: {}
exporters:
  otlp/approved_region: {}
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [memory_limiter, transform/redact, attributes/allowlist, tail_sampling, batch]
      exporters: [otlp/approved_region]
```

Pin the collector image digest and configuration digest. Run a denylist scan after the allowlist, and fail deployment when a fixture secret reaches the exporter. Keep bounded encrypted disk buffering only where the threat model and regional policy permit it.

## Conformance tests
| Test | Pass condition |
|---|---|
| Trace continuity | Server → gateway → model → tool trace IDs and async links reconstruct one request |
| Schema | Every required stable attribute has correct type; experimental attributes match pinned version |
| Cardinality | Attribute cardinality budget holds under randomized users, prompts, and errors |
| Redaction | Canary secrets and personal data never reach exporter payloads |
| Failure | Timeout, rate limit, malformed output, tool denial, cancellation, and fallback set bounded reason/error codes |
| Sampling | Declared inclusion probability matches observed routine sampling; all declared tail triggers retained |
| Region/access | Collector and backend endpoints, roles, and retention match data classification |
| Load | Instrumentation overhead remains within the service latency and CPU budget |

## Evidence contract
The decision record is the **telemetry contract and conformance capture**. It records OTel semconv version; span names; attribute allowlist; redaction tests; sampling; trace continuity; backend region. The observability platform owner owns completeness; the evidence is invalid when collector or semantic-convention upgrades alter field meaning. Persist schema, instrumentation, collector, query, dashboard, and alert revisions so operational conclusions remain reproducible.

## Failure response and recovery
**Trigger:** trace continuity, redaction, or export durability SLO fails.

**Immediate response:** disable unsafe attributes, spool locally within quota, and restore the pinned collector pipeline. Preserve the telemetry contract and conformance capture, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to opentelemetry llm tracing.

### Telemetry incident runbook
1. Classify the event as confidentiality leakage, integrity/schema corruption, availability loss, cardinality exhaustion, or regional-routing failure.
2. For leakage, stop the exporter or offending processor, revoke backend access as needed, preserve minimal hashes/configuration, and invoke privacy/security breach assessment.
3. For integrity failure, annotate the invalid time range and stop release or SLO automation that depends on affected fields.
4. For availability loss, use bounded local buffering or privacy-safe dropping according to risk; consequential actions continue only if their separate audit log is healthy.
5. Restore the last pinned collector image/configuration and replay only data authorized for replay.
6. Verify fixture traces, dashboards, alerts, and deletion; add the failure to collector conformance CI.

## Decision authority
The **observability platform owner** accepts the operational decision. The **privacy and security telemetry reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Telemetry can trigger declared alerts or rollback; service and incident owners judge impact, restoration, and invalid measurement windows.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Rich traces | Fast diagnosis | Privacy and storage cost |
| Minimal traces | Lower exposure | Poor causality |

## Anti-patterns
- Logging raw prompts by default.
- Treating experimental semantic conventions as stable.

## Enterprise considerations
- Apply regional collectors and least privilege.
- Document sampling bias.

## Framework relationship
**OpenTelemetry LLM Tracing** defines informative diagnosability evidence. Sampling and mutable operational telemetry do not replace required action or records-management logs.

| Source | Relationship for OpenTelemetry LLM Tracing | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.8; MANAGE 4.1 | Evaluate monitoring coverage against known failure modes and sampling limitations. |
| ISO/IEC 42001 | 42001 clauses 8.1 and 9.1 | Performance-evaluation evidence remains subject to data quality, access, retention, and internal-audit scope. |
| Domain threat/control source | Sensitive Information Disclosure in telemetry | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] OpenTelemetry semantic-convention and collector versions are pinned.
- [ ] Span topology covers retrieval, model retries, tools, guardrails, approvals, and async links.
- [ ] Stable and Development attributes are distinguished in the telemetry contract.
- [ ] Content capture is off by default and uses a separate governed path when enabled.
- [ ] Attribute types, allowed values, and metric-cardinality budgets pass CI.
- [ ] Tail-sampling triggers and inclusion probabilities are tested.
- [ ] Audit records remain complete when traces are sampled or unavailable.
- [ ] Leakage, integrity, availability, and regional-failure runbooks are exercised.

## References
- OpenTelemetry, [dedicated GenAI semantic conventions repository](https://github.com/open-telemetry/semantic-conventions-genai) (accessed 2026-07-16); Development status and schema publication must be checked at the pinned commit.
- OpenTelemetry, [semantic conventions v1.42.0 migration note](https://github.com/open-telemetry/semantic-conventions/releases/tag/v1.42.0) (accessed 2026-07-16).
- OpenTelemetry, [former Generative AI semantic-conventions location](https://opentelemetry.io/docs/specs/semconv/gen-ai/) (accessed 2026-07-16); retained only as a migration pointer.
- W3C, [Trace Context Level 2](https://www.w3.org/TR/trace-context-2/) (accessed 2026-07-16).
- OpenTelemetry, [Collector configuration](https://opentelemetry.io/docs/collector/configuration/) (accessed 2026-07-16).
- OpenTelemetry, [Trace semantic conventions](https://opentelemetry.io/docs/specs/semconv/general/trace/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Added pinned semantic-convention contract, trace topology, attribute/content policy, collector configuration, tail sampling, conformance tests, and telemetry incident runbook. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
