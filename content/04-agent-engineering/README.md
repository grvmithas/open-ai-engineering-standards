# Level 4: Agent Engineering

> **Version:** 2.0  
> **Updated:** 2026-07-16  
> **Delivered:** 20 agents, 19 subagents, 12 deterministic hooks

## Purpose
This library defines bounded agents and deterministic hooks for reliable, auditable engineering automation.

## Why
Models cannot safely police their own authority. The contracts define identity, delegation, budgets, retries, termination, recovery, and verification; hooks enforce selected gates outside model reasoning.

## How
1. Issue a task envelope with principal, scope, acceptance criteria, budget, and existing approvals.
2. Select one agent and delegate only narrower work to a subagent.
3. Evaluate approval from the concrete effect, never from the tool name.
4. Install hooks at lifecycle boundaries and pass documented environment inputs.
5. Accept completion only with independent evidence and a terminal result envelope.

## Agent Library — 20
| Agent | Role |
|---|---|
| [architect.agent.md](./agents/architect.agent.md) | Own system-boundary decisions and architecture records for declared quality attributes. |
| [backend.agent.md](./agents/backend.agent.md) | Implement secure service/domain behavior with explicit contracts, transactions, and operational failure handling. |
| [coder.agent.md](./agents/coder.agent.md) | Implement an approved file-bounded plan and its tests without changing architecture or release state. |
| [context-engineer.agent.md](./agents/context-engineer.agent.md) | Assemble minimal, authoritative, provenance-aware context for a defined agent decision. |
| [database.agent.md](./agents/database.agent.md) | Design schemas, queries, and migrations while preserving integrity, availability, and recoverability. |
| [devops.agent.md](./agents/devops.agent.md) | Build reproducible CI/CD and infrastructure delivery paths with artifact integrity and rollback. |
| [documentation.agent.md](./agents/documentation.agent.md) | Create task-oriented technical documentation verified against source and executable behavior. |
| [frontend.agent.md](./agents/frontend.agent.md) | Implement accessible, resilient browser UI and its client-side integration contracts. |
| [incident-response.agent.md](./agents/incident-response.agent.md) | Coordinate containment, evidence preservation, recovery, and communication for an active incident. |
| [knowledge.agent.md](./agents/knowledge.agent.md) | Curate governed organizational knowledge with provenance, ownership, lifecycle, and retrieval semantics. |
| [migration.agent.md](./agents/migration.agent.md) | Plan and coordinate reversible application, platform, or data migrations with compatibility windows. |
| [observability.agent.md](./agents/observability.agent.md) | Define and verify telemetry, service objectives, dashboards, and diagnostic workflows. |
| [planner.agent.md](./agents/planner.agent.md) | Convert approved outcomes into dependency-ordered, file-specific plans without implementing them. |
| [prompt-engineer.agent.md](./agents/prompt-engineer.agent.md) | Author and evaluate versioned production prompts and structured-output contracts. |
| [rag.agent.md](./agents/rag.agent.md) | Design, implement, and evaluate permission-aware retrieval-augmented generation. |
| [release.agent.md](./agents/release.agent.md) | Assemble release evidence and control promotion of an immutable approved artifact. |
| [research.agent.md](./agents/research.agent.md) | Produce source-ranked evidence for a bounded technical decision without presenting inference as fact. |
| [reviewer.agent.md](./agents/reviewer.agent.md) | Independently inspect changes for correctness, maintainability, compatibility, and operational risk. |
| [security.agent.md](./agents/security.agent.md) | Threat-model and assess application security without modifying the workspace or exploiting production. |
| [testing.agent.md](./agents/testing.agent.md) | Design and implement risk-based automated tests at the cheapest truthful layer. |

## Subagent Library — 19
| Subagent | Technology | Scope |
|---|---|---|
| [accessibility.subagent.md](./subagents/accessibility.subagent.md) | Accessibility | Perform a bounded WCAG 2.2 AA implementation or audit with manual assistive checks. |
| [aws.subagent.md](./subagents/aws.subagent.md) | Aws | Design scoped AWS IaC and IAM changes with organization controls and recovery evidence. |
| [azure.subagent.md](./subagents/azure.subagent.md) | Azure | Design scoped Azure IaC, identity, policy, and networking changes with recovery evidence. |
| [docker.subagent.md](./subagents/docker.subagent.md) | Docker | Create minimal, reproducible, non-root container images and Compose definitions. |
| [dotnet.subagent.md](./subagents/dotnet.subagent.md) | Dotnet | Implement .NET services with nullable safety, DI lifetime correctness, async I/O, and publish validation. |
| [github-actions.subagent.md](./subagents/github-actions.subagent.md) | Github Actions | Build least-privilege GitHub Actions workflows with pinned dependencies and OIDC. |
| [kafka.subagent.md](./subagents/kafka.subagent.md) | Kafka | Design Kafka topics, schemas, producers, and consumers with explicit delivery and recovery semantics. |
| [kubernetes.subagent.md](./subagents/kubernetes.subagent.md) | Kubernetes | Author and diagnose Kubernetes workloads with policy, rollout, and resource safety. |
| [nextjs-routing.subagent.md](./subagents/nextjs-routing.subagent.md) | Nextjs Routing | Implement Next.js routes, middleware, cache behavior, and server/client boundaries against installed docs. |
| [openai-api.subagent.md](./subagents/openai-api.subagent.md) | Openai Api | Integrate OpenAI APIs with structured outputs, bounded tools, retries, and eval evidence. |
| [playwright.subagent.md](./subagents/playwright.subagent.md) | Playwright | Implement deterministic browser journeys with isolated fixtures, traces, and accessibility checks. |
| [postgres.subagent.md](./subagents/postgres.subagent.md) | Postgres | Optimize PostgreSQL queries and produce safe, reversible schema migrations. |
| [python.subagent.md](./subagents/python.subagent.md) | Python | Implement typed Python packages/services with reliable async, packaging, and test behavior. |
| [react.subagent.md](./subagents/react.subagent.md) | React | Implement isolated React component/state work using repository-pinned React APIs. |
| [redis.subagent.md](./subagents/redis.subagent.md) | Redis | Design Redis keys and operations with memory, expiry, atomicity, and failure semantics. |
| [spring.subagent.md](./subagents/spring.subagent.md) | Spring | Implement Spring services with explicit transactions, security, configuration, and context tests. |
| [terraform.subagent.md](./subagents/terraform.subagent.md) | Terraform | Create state-safe Terraform modules and plans without applying infrastructure. |
| [typescript.subagent.md](./subagents/typescript.subagent.md) | Typescript | Implement strict TypeScript APIs and migrations without weakening compiler guarantees. |
| [vector-database.subagent.md](./subagents/vector-database.subagent.md) | Vector Database | Design vector indexes and retrieval filters with tenant isolation and measured recall. |

## Hooks Library — 12
| Hook | Required input | Purpose |
|---|---|---|
| [pre-planning.hook.sh](./hooks/pre-planning.hook.sh) | `OAIES_REQUIREMENTS_FILE` | Validate non-empty requirements |
| [pre-code.hook.sh](./hooks/pre-code.hook.sh) | `OAIES_PLAN_FILE`, `OAIES_APPROVAL_FILE` | Validate a plan and matching workspace-write declaration |
| [post-code.hook.sh](./hooks/post-code.hook.sh) | `OAIES_VERIFY_EVIDENCE` | Validate passed artifact verification evidence |
| [pre-commit.hook.sh](./hooks/pre-commit.hook.sh) | Test and secret-scan evidence | Validate evidence and block staged private-key headers |
| [pre-review.hook.sh](./hooks/pre-review.hook.sh) | Format and lint evidence | Validate both evidence declarations |
| [deployment.hook.sh](./hooks/deployment.hook.sh) | Manifest, approval, release evidence | Validate deployment gate declarations; does not deploy |
| [knowledge-capture.hook.sh](./hooks/knowledge-capture.hook.sh) | `OAIES_KNOWLEDGE_FILE` | Validate owner, source, and retention fields |
| [pre-tool-call.hook.sh](./hooks/pre-tool-call.hook.sh) | Effect; approval for high effects | Validate effect classification and matching declaration |
| [post-tool-call.hook.sh](./hooks/post-tool-call.hook.sh) | `OAIES_TOOL_RESULT_FILE` | Validate status, effect, and target fields |
| [pre-delegation.hook.sh](./hooks/pre-delegation.hook.sh) | `OAIES_DELEGATION_FILE` | Validate principal, scope, budget profile, and depth |
| [post-deployment.hook.sh](./hooks/post-deployment.hook.sh) | `OAIES_HEALTH_EVIDENCE` | Validate artifact, environment, and healthy status |
| [budget-guard.hook.sh](./hooks/budget-guard.hook.sh) | Budget profile and remaining value | Require positive caller-profile budget |

Hook interface, exit semantics, dry-run behavior, examples, and tests are documented in [hooks/README.md](./hooks/README.md).

**Catalog invariant:** exactly 20 files match `agents/*.agent.md`, 19 match `subagents/*.subagent.md`, and 12 match `hooks/*.hook.sh`.

## Tradeoffs
Explicit envelopes and approvals add coordination latency. Bounded autonomy is the correct default because an agent that moves faster by obscuring identity, effect, or evidence is not production-safe.

## Anti-Patterns
- Granting blanket shell approval when only one named deployment is authorized.
- Allowing a subagent to broaden scope or delegate again.
- Treating retry as an unlimited substitute for diagnosis.
- Counting a model's self-report as independent verification.

## Enterprise Considerations
Bind agent instances to workload identity, use tamper-evident audit storage, apply tenant and regional boundaries, cap cost centrally, and separate requester, approver, and operator for production effects.

## Checklist
- [ ] Exact catalog counts and links validated
- [ ] Identity and delegation chain are immutable
- [ ] Effect-based approvals enforced
- [ ] Retry, time, tool-call, cost, and delegation budgets enforced
- [ ] Hooks tested with success, failure, and dry-run cases
- [ ] Verification evidence retained with terminal status

## Authoritative Sources
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [OWASP GenAI Security Project](https://genai.owasp.org/)
- [Google SRE Workbook](https://sre.google/workbook/table-of-contents/)

## Changelog
- **2.0 (2026-07-16):** Replaced structural clones with domain-specific contracts and caller/profile budgets.
- **1.1:** Delivered the complete catalog.
- **1.0:** Initial partial catalog claim.
