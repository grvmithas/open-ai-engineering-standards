# OpenTelemetry LLM Tracing

> **Version:** 1.0.0
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

## Evidence contract
The decision record is the **telemetry contract and conformance capture**. It records OTel semconv version; span names; attribute allowlist; redaction tests; sampling; trace continuity; backend region. The observability platform owner owns completeness; the evidence is invalid when collector or semantic-convention upgrades alter field meaning. Evidence must reference immutable source, release, dataset, policy, and provider identifiers rather than screenshots alone.

## Failure response and recovery
**Trigger:** trace continuity, redaction, or export durability SLO fails.

**Immediate response:** disable unsafe attributes, spool locally within quota, and restore the pinned collector pipeline. Preserve the telemetry contract and conformance capture, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to opentelemetry llm tracing.

## Decision authority
The **observability platform owner** accepts the operational decision. The **privacy and security telemetry reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Automation may calculate or enforce a declared rule, but it cannot accept residual risk or approve its own bypass.

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
This profile is informative. It helps implement the following relationships and creates no certification, conformity, or regulator-approval claim.

| Source | Relationship for OpenTelemetry LLM Tracing | Boundary |
|---|---|---|
| NIST AI RMF | MEASURE 2.8; MANAGE 4.1 | Use the cited outcomes as governance questions; NIST does not approve implementations |
| ISO/IEC 42001 | 42001 clauses 8.1 and 9.1 | Evidence may support an organization’s management system; certification requires an accredited, scoped assessment |
| Domain threat/control source | Sensitive Information Disclosure in telemetry | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] No secrets in attributes.
- [ ] Trace links span async work.
- [ ] Schema version recorded.

## References
- OpenTelemetry, [Generative AI semantic conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/) (accessed 2026-07-16); pin the convention version because portions remain Development.
- OpenTelemetry, [Trace semantic conventions](https://opentelemetry.io/docs/specs/semconv/general/trace/) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the telemetry contract and conformance capture, failure trigger, accountable decision, and scoped framework relationships for opentelemetry llm tracing. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
