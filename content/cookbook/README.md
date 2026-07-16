# AI Cookbook

> **Immediately useful. Zero setup required. Fork and adapt.**

---

## What This Is

The AI Cookbook is a collection of technology-specific AI engineering playbooks. Each entry contains everything you need to use AI tools effectively with that technology stack — prompts, agents, skills, hooks, debug workflows, and architecture patterns.

**Unlike generic AI resources, every cookbook entry is immediately actionable for that specific technology.**

---

## Why a Cookbook

AI engineering patterns don't change across technologies. The problems do:
- React developers hit different failure modes than Python developers
- Kubernetes debugging requires different context than Postgres optimization
- Azure deployments have different patterns than AWS

The cookbook adapts the OAIES standard to each technology context so you don't have to.

---

## Available Cookbooks

| Technology | Status | Contents |
|-----------|--------|---------|
| [react/](./react/README.md) | ✅ Stable | Components, hooks, state management, testing |
| nextjs/ | 📋 Planned | Routing, SSR, RSC, streaming, caching |
| node/ | 📋 Planned | APIs, middleware, async patterns |
| python/ | 📋 Planned | FastAPI, Django, async, type hints |
| java/ | 📋 Planned | Spring Boot, microservices, JPA |
| dotnet/ | 📋 Planned | ASP.NET Core, EF Core, CQRS |
| azure/ | 📋 Planned | Azure AI, Cognitive Services, APIM |
| aws/ | 📋 Planned | Bedrock, Lambda, Step Functions |
| docker/ | 📋 Planned | Dockerfile optimization, compose, multi-stage |
| kubernetes/ | 📋 Planned | Deployments, scaling, debugging |
| postgres/ | 📋 Planned | Query optimization, migrations, pgvector |
| redis/ | 📋 Planned | Caching patterns, sessions, rate limiting |
| mongo/ | 📋 Planned | Schema design, aggregations, indexing |
| graphql/ | 📋 Planned | Schema design, resolvers, federation |
| microfrontends/ | 📋 Planned | Module federation, routing, state sharing |
| react-native/ | 📋 Planned | Navigation, native modules, performance |
| performance/ | 📋 Planned | Web vitals, bundle optimization, profiling |
| accessibility/ | 📋 Planned | WCAG 2.2, ARIA, screen reader testing |
| seo/ | 📋 Planned | Technical SEO, structured data, Core Web Vitals |

---

## Each Cookbook Contains

```
{technology}/
├── README.md               ← Overview, when to use, architecture context
├── prompts/
│   ├── generate.prompt.md  ← Generate new {technology} code
│   ├── review.prompt.md    ← Review {technology} code
│   ├── debug.prompt.md     ← Debug {technology} issues
│   ├── optimize.prompt.md  ← Optimize {technology} performance
│   └── migrate.prompt.md   ← Migrate {technology} patterns
├── agents/
│   ├── {technology}.agent.md         ← Specialist agent
│   └── {technology}-debug.agent.md  ← Debug agent
├── skills/
│   └── {technology}.skill.md        ← Technology skill (extends base skill)
├── hooks/
│   ├── pre-{technology}.hook.sh     ← Pre-task validation
│   └── post-{technology}.hook.sh    ← Post-task verification
├── mcps/
│   └── {related-tool}.mcp.md       ← Relevant MCP integrations
├── debug-workflows/
│   ├── common-errors.md             ← Top 10 errors and solutions
│   └── performance-issues.md        ← Performance debugging playbook
├── architecture/
│   └── patterns.md                  ← Technology-specific architecture patterns
└── checklists/
    ├── code-review.md               ← {Technology}-specific review checklist
    └── deployment.md                ← {Technology}-specific deployment checklist
```

---

## Quick Start

### React Example
```bash
# Install React cookbook skills
cp cookbook/react/skills/react.skill.md .claude/skills/

# Use the React generation prompt
# Paste the contents of cookbook/react/prompts/generate.prompt.md
# Fill in {{COMPONENT_DESCRIPTION}} and run
```

### Kubernetes Example
```bash
# Install Kubernetes debugging skill
cp cookbook/kubernetes/skills/kubernetes.skill.md .claude/skills/

# When you have a pod failing, use:
# cookbook/kubernetes/debug-workflows/common-errors.md
# Find the error pattern and follow the debugging steps
```

---

## Contributing a New Cookbook

New cookbooks must include at minimum:
- README with technology overview and when to use this cookbook
- At least 3 prompts (generate, review, debug)
- 1 skill file
- 1 debug workflow with at least 5 common errors
- Architecture patterns relevant to that technology

Missing any of these = PR rejected.

---

## Anti-Patterns

### ❌ Generic Prompts That Ignore the Technology
A React cookbook prompt must know what hooks are, what state management libraries exist, what patterns are idiomatic. "Write a React component" is not a cookbook entry.

### ❌ Cookbook Entries Without Debug Workflows
The most valuable part of any cookbook is the debugging section. Real practitioners spend more time debugging than generating. If your cookbook doesn't cover debugging, it's incomplete.
