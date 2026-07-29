# OWASP LLM and Agentic Security Crosswalk

**Version:** 1.0.1  
**Date:** 2026-07-16  
**Status:** Informative

## Purpose

Map AIES prevention, detection, and response artifacts to the OWASP Top 10 for LLM Applications 2025 and OWASP Top 10 for Agentic Applications 2026.

## Why

LLM risks focus on model-integrated applications; agentic risks add delegated identity, tools, memory, inter-agent communication, and cascading autonomous actions. Prompt instructions are not security boundaries for either threat model.

## OWASP LLM Top 10 crosswalk

| OWASP 2025 risk | AIES controls and evidence | Relationship |
|---|---|---|
| LLM01 Prompt Injection | Context Manifest trust levels, instruction isolation, sanitization; Prompt Release adversarial review; Tool Contract authorization | `evidence-supports` |
| LLM02 Sensitive Information Disclosure | Data classification, source authorization, redaction policy, output contract, evidence access controls | `evidence-supports` |
| LLM03 Supply Chain | Model Record source/license/digest; prompt/tool versions; Evidence Bundle integrity | `evidence-supports` |
| LLM04 Data and Model Poisoning | Context provenance/integrity; model and dataset digests; evaluation regression gates | `evidence-supports` |
| LLM05 Improper Output Handling | Structured output schema, consumer-side validation, encoding, least-privilege tool contract | `partial` |
| LLM06 Excessive Agency | Agent authority limits, prohibited actions, approval gates, termination criteria, tool side-effect class | `evidence-supports` |
| LLM07 System Prompt Leakage | Prompt artifact access controls, secret prohibition, assume-prompt-public design | `partial` |
| LLM08 Vector and Embedding Weaknesses | Context source authorization, tenant isolation, provenance, retrieval evaluation | `partial` |
| LLM09 Misinformation | Factuality/groundedness evaluation, source provenance, human verification, incident response | `evidence-supports` |
| LLM10 Unbounded Consumption | Token budget, timeouts, rate limits, retry caps, cost and saturation telemetry | `evidence-supports` |

## OWASP Agentic Top 10 crosswalk

| OWASP 2026 risk | AIES controls and evidence | Relationship |
|---|---|---|
| ASI01 Agent Goal Hijack | Immutable role/prompt refs, context trust hierarchy, conflict rule, prohibited actions | `evidence-supports` |
| ASI02 Tool Misuse and Exploitation | Tool schemas, side-effect class, least privilege, approval gates, audit and safe-state behavior | `evidence-supports` |
| ASI03 Identity and Privilege Abuse | Per-agent workload identity, user delegation, audience validation, scoped authorization | `evidence-supports` |
| ASI04 Agentic Supply Chain Vulnerabilities | Versioned agents/models/prompts/tools/MCP servers, integrity digests, supplier evidence | `evidence-supports` |
| ASI05 Unexpected Code Execution | Sandboxed tools, strict input/output schemas, irreversible-action gates, code execution prohibition where unnecessary | `partial` |
| ASI06 Memory and Context Poisoning | Context provenance, memory mode/retention, tenant isolation, integrity checks, poisoned-memory incident response | `evidence-supports` |
| ASI07 Insecure Inter-Agent Communication | A2A message schema, authenticated peers, task authorization, artifact validation, trace correlation | `partial` |
| ASI08 Cascading Failures | Retry limits, timeouts, circuit breaking, termination criteria, safe state, incident escalation | `evidence-supports` |
| ASI09 Human-Agent Trust Exploitation | Human-oversight mode, explicit uncertainty/provenance, confirmation policy, UX testing | `partial` |
| ASI10 Rogue Agents | Agent inventory, owner/status, bounded authority, identity revocation, kill switch, behavior monitoring | `evidence-supports` |

## How

1. Threat-model the whole data and action path, including retrieved content, memory, tools, agents, users, and downstream interpreters.
2. Reject unregistered component versions and unknown schema fields.
3. Assign a dedicated identity and minimum scopes to each agent and tool invocation.
4. Treat all external content as data, never as executable instruction.
5. Require human confirmation for high-impact, irreversible, external-communication, and financial actions.
6. Test each applicable OWASP risk before release and continuously in production; link results to the exact artifact digests.
7. Revoke identities, quarantine context, and disable tools on policy breach.

## Verification minimum

| Layer | Required test |
|---|---|
| Prompt/context | Direct, indirect, encoded, multilingual, and multi-turn injection |
| Tool | Schema abuse, confused deputy, scope escalation, replay, timeout, idempotency |
| Agent | Goal drift, retry loops, authority crossing, termination, human override |
| Multi-agent | Spoofing, task tampering, artifact poisoning, trust transitivity, cascade containment |
| Supply chain | Digest verification, provenance, dependency review, rollback |

## Equivalence limits

OWASP Top 10 documents are awareness and risk-prioritization resources, not complete security standards or certification schemes. Coverage of a row does not prove exploit resistance. Risk names and identifiers are version-specific; freeze the cited editions during assessment.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Threats map directly to testable component contracts | Adversarial testing must evolve with attacks |
| Bounded authority limits blast radius | More confirmation gates reduce autonomy and throughput |
| Context provenance aids investigation | Provenance infrastructure adds latency and storage |

## Anti-patterns

- **Prompt-only defense:** asking the model to ignore attacks without isolation and authorization.
- **Shared super-token:** giving all agents one broad credential.
- **Transitive trust:** trusting an artifact because another agent produced it.
- **Leakage fixation:** protecting prompt text while embedding credentials or relying on secrecy for safety.
- **Top-10 completeness:** assuming risks outside the published ten do not matter.

## Enterprise considerations

Integrate these tests with application security, IAM, data loss prevention, software supply-chain, fraud, and incident response. Red teams must test production-equivalent identities and tools without exposing regulated data. Record accepted findings as expiring exceptions.

## Authoritative sources

- [OWASP Top 10 for Large Language Model Applications](https://genai.owasp.org/llm-top-10/)
- [OWASP Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [OWASP GenAI Security Project](https://genai.owasp.org/)

Sources accessed 2026-07-16.

## Checklist

- [ ] Both LLM and agentic threat sets are assessed where agents are used
- [ ] Every agent and tool has a dedicated least-privilege identity
- [ ] Untrusted context cannot become privileged instruction
- [ ] High-impact actions require an independent authorization gate
- [ ] Adversarial results reference exact component versions and digests
- [ ] Top-10 coverage is not represented as certification

## Changelog

### 1.0.1 — 2026-07-16

- Recast mappings as evidence support rather than external-control satisfaction.

### 1.0.0 — 2026-07-16

- Added OWASP LLM 2025 and Agentic 2026 risk mappings.
