# AI Cookbook

> Version: 1.0.0 | Updated: 2026-07-16

## Purpose

The AI Cookbook provides 18 production playbooks that constrain AI-assisted engineering with technology-specific invariants, diagnostics, architecture, and release gates.

## Why

Generic prompts miss runtime-specific failure modes. These cookbooks tie generation and review to official guidance, repository evidence, deterministic validation, and production ownership.

## How

1. Select the cookbook matching the system boundary being changed.
2. Supply repository and runtime evidence to one of its three XML prompts.
3. Execute the procedural skill and native validators.
4. Diagnose observed failures through the evidence-led error workflow.
5. Block merge and deployment until the corresponding checklists pass.

## Complete cookbooks

| Technology | Production scope |
|---|---|
| [React](./react/README.md) | Components, Hooks, state, accessibility, rendering |
| [Next.js](./nextjs/README.md) | App Router, server/client boundaries, caching, streaming |
| [Node.js](./node/README.md) | APIs, async control flow, process lifecycle, observability |
| [Python](./python/README.md) | Typed services, async boundaries, packaging, diagnostics |
| [Java](./java/README.md) | Spring, transactions, persistence, JVM operations |
| [.NET](./dotnet/README.md) | ASP.NET Core, DI, EF Core, cancellation |
| [Azure](./azure/README.md) | Identity, networking, IaC, policy, reliability |
| [AWS](./aws/README.md) | IAM, accounts, IaC, reliability, quotas |
| [Docker](./docker/README.md) | Reproducible images, least privilege, supply chain |
| [Kubernetes](./kubernetes/README.md) | Controllers, probes, resources, policy, rollouts |
| [PostgreSQL](./postgres/README.md) | Schemas, plans, transactions, migrations, recovery |
| [Redis](./redis/README.md) | Cache semantics, data structures, memory, clustering |
| [MongoDB](./mongo/README.md) | Document models, indexes, aggregation, sharding |
| [GraphQL](./graphql/README.md) | Schema contracts, resolvers, authorization, budgets |
| [Microfrontends](./microfrontends/README.md) | Domain ownership, composition, contracts, isolation |
| [React Native](./react-native/README.md) | Native boundaries, navigation, lists, accessibility |
| [Performance Engineering](./performance/README.md) | SLOs, profiling, budgets, capacity, regression gates |
| [Accessibility Engineering](./accessibility/README.md) | WCAG, semantics, keyboard, focus, assistive technology |

## Count reconciliation

The previous table contained 19 rows while the repository claimed 18 technology stacks. The 18 directories above are the committed cookbook scope. **SEO remains useful scope but is not counted as a technology cookbook:** it is a cross-cutting discipline that depends on performance, accessibility, content, and framework rendering guidance. A future SEO guide must be added deliberately and the repository-wide count changed to 19; it must not be represented as an incomplete nineteenth cookbook.

## Required directory contract

```text
{technology}/
├── README.md
├── prompts/
│   ├── generate.prompt.md
│   ├── review.prompt.md
│   └── debug.prompt.md
├── skills/
│   └── {technology}.skill.md
├── debug-workflows/
│   └── common-errors.md
├── architecture/
│   └── patterns.md
└── checklists/
    ├── code-review.md
    └── deployment.md
```

Every prompt uses `<role>`, `<context>`, `<instructions>`, `<output_format>`, and `<constraints>`. Every cookbook includes at least five concrete errors and links to official technology guidance.

## Tradeoffs

The fixed contract creates repeated structure and requires more maintenance than a loose article collection. It provides predictable discovery, auditable quality gates, and complete operational coverage.

## Anti-patterns

- Do not count a roadmap row as a complete cookbook.
- Do not publish generic prompts with only the technology name changed.
- Do not cite unofficial summaries when primary specifications or vendor guidance exist.
- Do not claim support for a version that was not verified from repository or deployment evidence.

## Enterprise considerations

Teams must apply their data-classification, model-use, retention, and audit policies before sending source or telemetry to an AI system. Cookbook checklists do not replace risk acceptance, separation of duties, or production change controls.

## Checklist

- [ ] Exactly 18 linked cookbook directories exist.
- [ ] Every cookbook contains all nine required files.
- [ ] Every cookbook has three production XML prompts.
- [ ] Every debug workflow contains at least five errors.
- [ ] Every architecture document contains a Mermaid diagram.
- [ ] Every cookbook cites official guidance.
- [ ] No roadmap item is represented as complete.

## Changelog

- 1.0.0 (2026-07-16): Completed 18 cookbooks and reconciled the prior 19-row index inconsistency.
