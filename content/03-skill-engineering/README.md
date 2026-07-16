# Level 3: Skill Engineering

> **Version:** 2.0  
> **Updated:** 2026-07-16  
> **Delivered:** 26 production-grade skills

## Purpose
This library provides reusable, trigger-driven engineering procedures with objective verification and explicit recovery behavior.

## Why
Skills move recurring procedures out of ad hoc prompts. A fixed contract makes activation, execution, evidence, and failure handling reviewable across agent runtimes.

## How
Install only skills relevant to the runtime, preserve each file unchanged, and route a request only when its trigger matches and no anti-trigger applies. Every skill requires scope, authoritative project context, and direct verification evidence.

## Skills Library
| Skill | Primary trigger |
|---|---|
| [accessibility.skill.md](./skills/accessibility.skill.md) | A web or native user interface is created, changed, or assessed for accessibility. |
| [architecture.skill.md](./skills/architecture.skill.md) | A request changes system boundaries, deployment topology, data ownership, or a cross-team interface. |
| [aws.skill.md](./skills/aws.skill.md) | An AWS IAM, network, compute, data, resilience, or deployment design changes. |
| [azure.skill.md](./skills/azure.skill.md) | An Azure identity, network, compute, data, policy, or deployment design changes. |
| [code-review.skill.md](./skills/code-review.skill.md) | A diff, pull request, patch, or release candidate requires an independent engineering review. |
| [context.skill.md](./skills/context.skill.md) | An agent is missing relevant evidence, overloaded by noise, or vulnerable to stale/untrusted context. |
| [data-engineering.skill.md](./skills/data-engineering.skill.md) | A batch, streaming, transformation, lineage, or data-quality pipeline changes. |
| [debug.skill.md](./skills/debug.skill.md) | A reproducible defect, regression, crash, failed test, or unexplained production symptom needs root-cause analysis. |
| [devops.skill.md](./skills/devops.skill.md) | A build, CI/CD, release pipeline, infrastructure automation, or artifact supply-chain flow changes. |
| [documentation.skill.md](./skills/documentation.skill.md) | An API, system, decision, runbook, or operational task needs durable, implementation-verified documentation. |
| [dotnet.skill.md](./skills/dotnet.skill.md) | A .NET API, worker, library, EF Core model, or asynchronous workflow changes. |
| [evaluation.skill.md](./skills/evaluation.skill.md) | A model, prompt, retrieval, tool, or agent change needs an evidence-based release decision. |
| [java.skill.md](./skills/java.skill.md) | A Java library, JVM service, Spring component, transaction, or concurrency behavior changes. |
| [memory.skill.md](./skills/memory.skill.md) | An agent must retain state across turns, sessions, users, or tasks. |
| [nextjs.skill.md](./skills/nextjs.skill.md) | A Next.js route, rendering boundary, cache policy, middleware, server action, or deployment behavior changes. |
| [node.skill.md](./skills/node.skill.md) | A Node.js service, stream, worker, package, or event-loop behavior changes. |
| [observability.skill.md](./skills/observability.skill.md) | An AI system needs diagnosable traces, metrics, logs, cost, quality signals, or service objectives. |
| [performance.skill.md](./skills/performance.skill.md) | A measured latency, throughput, saturation, memory, CPU, or cost objective is missed. |
| [planning.skill.md](./skills/planning.skill.md) | An approved feature or remediation must be decomposed into executable repository changes. |
| [prompt.skill.md](./skills/prompt.skill.md) | A production model instruction, tool-use policy, or structured-output prompt must be authored or changed. |
| [python.skill.md](./skills/python.skill.md) | A Python package, service, async task, CLI, or data-processing module changes. |
| [rag.skill.md](./skills/rag.skill.md) | A product must ground generation in an external corpus using retrieval. |
| [react.skill.md](./skills/react.skill.md) | React component behavior, state ownership, rendering, hydration, or client accessibility is being changed. |
| [security.skill.md](./skills/security.skill.md) | Code or design crosses a trust boundary, changes identity or authorization, processes untrusted input, or handles sensitive data. |
| [seo.skill.md](./skills/seo.skill.md) | A public web page or site changes crawlability, indexing, canonicalization, metadata, or structured data. |
| [testing.skill.md](./skills/testing.skill.md) | A behavior change, defect, integration boundary, or release risk needs automated evidence. |

**Catalog invariant:** exactly 26 files match `skills/*.skill.md`; every link above resolves to one delivered file.

## Tradeoffs
Strict activation and evidence requirements reduce improvisational speed. They also prevent silent scope expansion, version guessing, and false completion.

## Anti-Patterns
- Triggering a broad skill on keyword overlap without evaluating anti-triggers.
- Copying all 26 skills into every request and degrading context quality.
- Claiming success without retained verification output.

## Enterprise Considerations
Govern installation, versions, approved sources, data handling, and audit retention centrally. Skills do not grant authority: runtime identity and effect approvals remain mandatory.

## Checklist
- [ ] Exactly 26 indexed skill files resolve
- [ ] Runtime loads only relevant skills
- [ ] Trigger and anti-trigger routing is tested
- [ ] Evidence and failure outputs are retained
- [ ] Skill updates pass link and structure validation

## Authoritative Sources
- [Agent Skills specification](https://agentskills.io/specification)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf)

## Changelog
- **2.0 (2026-07-16):** Replaced cloned procedures with 26 domain-specific workflows, artifacts, recovery paths, examples, and sources.
- **1.1:** Delivered the complete catalog.
- **1.0:** Initial catalog claim.
