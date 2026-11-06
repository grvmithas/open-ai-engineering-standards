# OWASP LLM and Agentic Security Crosswalk

**Version:** 1.1.0  
**Date:** 2026-11-06  
**Status:** Informative

## Purpose

Map AIES prevention, detection, and response artifacts to the OWASP Top 10 for LLM Applications 2026, the OWASP Top 10 for Agentic Applications 2026, and the OWASP MCP Top 10 (beta).

## Why

LLM risks focus on model-integrated applications; agentic risks add delegated identity, tools, memory, inter-agent communication, and cascading autonomous actions. Prompt instructions are not security boundaries for either threat model.

## OWASP LLM Top 10 crosswalk

OWASP published the **LLM Top 10 2026** edition in August 2026. Risk names are mostly stable but the numbering moved, so assessments keyed to 2025 IDs must be re-keyed. Both IDs are listed; cite the 2026 ID in new evidence.

| OWASP 2026 risk | 2025 ID | AIES controls and evidence | Relationship |
|---|---|---|---|
| LLM01:2026 Prompt Injection (incl. cross-modal) | LLM01 | Context Manifest trust levels, instruction isolation, sanitization; Prompt Release adversarial review; Tool Contract authorization; image/audio inputs treated as untrusted context | `evidence-supports` |
| LLM02:2026 Sensitive Information Disclosure | LLM02 | Data classification, source authorization, redaction policy, output contract, evidence access controls; guard secret-read policy for coding agents | `evidence-supports` |
| LLM03:2026 Excessive Agency | LLM06 | Agent authority limits, prohibited actions, approval gates, termination criteria, tool side-effect class, capability-composition gate | `evidence-supports` |
| LLM04:2026 Supply Chain | LLM03 | Model Record source/license/digest; prompt/tool/skill/MCP versions; Evidence Bundle integrity; dependency existence checks | `evidence-supports` |
| LLM05:2026 Data and Model Poisoning (incl. fine-tuning subversion) | LLM04 | Context provenance/integrity; model and dataset digests; evaluation regression gates | `evidence-supports` |
| LLM06:2026 Unbounded Consumption | LLM10 | Token budget, timeouts, rate limits, retry caps, cost and saturation telemetry | `evidence-supports` |
| LLM07:2026 Misinformation | LLM09 | Factuality/groundedness evaluation, source provenance, human verification, incident response | `evidence-supports` |
| LLM08:2026 Hidden Context Exposure (was System Prompt Leakage) | LLM07 | Prompt and context artifact access controls, secret prohibition, assume-context-public design, retrieval scoping per user | `partial` |
| LLM09:2026 Vector and Embedding Weaknesses | LLM08 | Context source authorization, tenant isolation, provenance, retrieval evaluation | `partial` |
| LLM10:2026 Improper Output Handling (incl. insecure generated code) | LLM05 | Structured output schema, consumer-side validation, encoding, least-privilege tool contract; SAST and review gates on AI-generated code | `partial` |

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

## OWASP MCP Top 10 crosswalk

The OWASP MCP Top 10 (beta, MCP01–MCP10) covers risks specific to Model Context Protocol servers and clients. Use it alongside the agentic list whenever an agent reaches tools through MCP. The beta IDs may change; freeze the edition you assess against.

| OWASP MCP risk | AIES controls and evidence | Relationship |
|---|---|---|
| MCP01 Token Mismanagement & Secret Exposure | Per-server scoped tokens from a secret manager, never in repo MCP config; guard denies agent reads of `.env`/credential files | `evidence-supports` |
| MCP02 Privilege Escalation via Scope Creep | MCP spec "Why use it — and when not to" per server; read-only default; scope review on every server upgrade | `evidence-supports` |
| MCP03 Tool Poisoning | Pinned server versions, tool-description diff review on upgrade, tool output treated as untrusted context | `partial` |
| MCP04 Software Supply Chain Attacks & Dependency Tampering | Allowlisted servers only, version pins and digests, provenance for local servers, skill/tool supply-chain review | `evidence-supports` |
| MCP05 Command Injection & Execution | Sandboxed local servers, schema validation on tool arguments, guard shell policy, regression test for auth-URL injection (CVE-2025-6514 class) | `partial` |
| MCP06 Prompt Injection via Contextual Payloads | Context trust hierarchy; untrusted tool results never escalate to instructions; capability-composition gate | `evidence-supports` |
| MCP07 Insufficient Authentication & Authorization | Remote servers over OAuth 2.1 per MCP 2026-07-28 (issuer validation per RFC 9207, Client ID Metadata Documents), audience-bound tokens | `evidence-supports` |
| MCP08 Lack of Audit and Telemetry | Tool-call tracing with server, tool, argument hash, decision; guard audit log; SIEM forwarding | `evidence-supports` |
| MCP09 Shadow MCP Servers | MCP config files are human-only (guard write policy); inventory of approved servers in `mcps/recommended.json`; managed allowlists | `evidence-supports` |
| MCP10 Context Injection & Over-Sharing | Minimum-necessary context per tool call, tenant scoping, redaction before tool egress | `partial` |

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
| MCP | Tool-description change detection, token scope audit, unapproved-server detection, auth-flow injection regression |

## Equivalence limits

OWASP Top 10 documents are awareness and risk-prioritization resources, not complete security standards or certification schemes. Coverage of a row does not prove exploit resistance. Risk names and identifiers are version-specific; freeze the cited editions during assessment.

## Tradeoffs

| Benefit | Cost |
|---|---|
| Threats map directly to testable component contracts | Adversarial testing must evolve with attacks |
| Bounded authority limits blast radius | More confirmation gates reduce autonomy and throughput |
| Context provenance aids investigation | Provenance infrastructure adds latency and storage |
| Tracking three OWASP lists | Each list catches risks the others miss (agent autonomy, MCP auth, model I/O) | Three editions to re-key when OWASP renumbers |

## Anti-patterns

- **Prompt-only defense:** asking the model to ignore attacks without isolation and authorization.
- **Shared super-token:** giving all agents one broad credential.
- **Transitive trust:** trusting an artifact because another agent produced it.
- **Leakage fixation:** protecting prompt text while embedding credentials or relying on secrecy for safety.
- **Top-10 completeness:** assuming risks outside the published ten do not matter.
- **Stale IDs:** citing `LLM06` as Excessive Agency in 2026 evidence. It is now Unbounded Consumption; re-key or state the edition.

## Enterprise considerations

Integrate these tests with application security, IAM, data loss prevention, software supply-chain, fraud, and incident response. Red teams must test production-equivalent identities and tools without exposing regulated data. Record accepted findings as expiring exceptions.

## Authoritative sources

- [OWASP Top 10 for Large Language Model Applications](https://genai.owasp.org/llm-top-10/)
- [OWASP Top 10 for Agentic Applications](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [OWASP MCP Top 10](https://owasp.org/www-project-mcp-top-10/)

Sources accessed 2026-11-06.

## Checklist

- [ ] Both LLM and agentic threat sets are assessed where agents are used
- [ ] Evidence cites LLM Top 10 **2026** IDs (or states the edition)
- [ ] MCP Top 10 assessed for every MCP server in use
- [ ] Every agent and tool has a dedicated least-privilege identity
- [ ] Untrusted context cannot become privileged instruction
- [ ] High-impact actions require an independent authorization gate
- [ ] Adversarial results reference exact component versions and digests
- [ ] Top-10 coverage is not represented as certification

## Changelog

### 1.1.0 — 2026-11-06

- Re-keyed the LLM table to the OWASP LLM Top 10 2026 edition, keeping 2025 IDs for traceability.
- Added the OWASP MCP Top 10 (beta) crosswalk and MCP verification row.

### 1.0.1 — 2026-07-16

- Recast mappings as evidence support rather than external-control satisfaction.

### 1.0.0 — 2026-07-16

- Added OWASP LLM 2025 and Agentic 2026 risk mappings.
