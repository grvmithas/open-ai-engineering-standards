# Level 10: AI Organization Playbook

> **Prerequisites:** Levels 0-9
> **Goal:** Build and operate an AI-first engineering organization

---

## What This Level Is

Levels 0-9 cover the technical standards. Level 10 covers the organizational infrastructure that makes those standards work at scale:
- How to hire AI engineers
- How to structure AI teams
- How to build an AI-first engineering culture
- How to define AI engineering roles and career ladders
- How to run an AI engineering operating model

**This level is written for engineering leaders and senior ICs who are building or scaling AI-first teams.**

---

## AI Engineering Roles (OAIES Definitions)

The industry has not standardized these roles. This is the OAIES standard.

### AI Engineer
**Core competency:** Building production AI systems (Levels 0-6)
**Not:** A data scientist. Not an ML researcher. An engineer who builds systems powered by AI.
**Skills:** Software engineering + prompt engineering + context engineering + agent engineering
**Career path:** AI Engineer → Senior AI Engineer → Staff AI Engineer → Principal AI Engineer

### Prompt Engineer
**Core competency:** Designing, testing, and optimizing prompts at scale (Levels 1-2)
**Not:** Someone who "talks to ChatGPT." A specialist who treats prompts as production artifacts.
**Skills:** Evaluation, A/B testing, prompt versioning, linguistic analysis
**Career path:** Typically a specialization of AI Engineer, not a separate track

### Context Engineer
**Core competency:** Information pipeline design (Level 2)
**Not:** A data engineer. An engineer who designs how information flows to and from models.
**Skills:** RAG, knowledge graphs, context compression, retrieval optimization
**Career path:** Specialization of AI Engineer or Data Engineer

### LLMOps Engineer
**Core competency:** Operating LLMs in production (Level 7)
**Not:** A DevOps engineer who touched an LLM once. A specialist in LLM-specific operational concerns.
**Skills:** Evaluation, cost optimization, observability, prompt versioning, PromptOps
**Career path:** Senior AI Engineer or Senior DevOps Engineer → LLMOps → Staff LLMOps

### AI Architect
**Core competency:** System design for AI-powered products (Levels 5-9)
**Not:** A solution architect who knows about LLMs. Someone who designs production AI systems.
**Skills:** All of the above + enterprise architecture + governance + security
**Career path:** Principal Engineer or Senior Architect → AI Architect

---

## Team Operating Models

### Model 1: Centralized AI Team
```
CTO
├── Engineering Teams (traditional)
└── AI Platform Team
    ├── AI Engineers
    ├── LLMOps Engineers
    └── AI Architects
         ↓ provides shared infrastructure
    All Engineering Teams
```

**When to use:** Early stage. Limited AI talent. Need standardization fast.
**Tradeoffs:** Bottleneck risk. Domain expertise gap (AI team doesn't know product deeply).

### Model 2: Federated (Embedded)
```
CTO
├── Product Team A
│   ├── Engineers
│   └── AI Engineer (embedded)
├── Product Team B
│   ├── Engineers
│   └── AI Engineer (embedded)
└── AI Guild (virtual, cross-team)
    └── Standards, shared patterns, peer review
```

**When to use:** Multiple product teams with AI needs. Strong existing engineering culture.
**Tradeoffs:** Standards drift risk without strong guild governance. Harder to share infrastructure.

### Model 3: Hybrid (OAIES Recommended for Scale)
```
CTO
├── AI Platform Team (centralized)
│   ├── Shared infrastructure (eval, LLMOps, observability)
│   ├── Standards and OAIES compliance
│   └── AI Architects
└── Product Teams (federated)
    ├── AI Engineers (embedded in product)
    └── Consumers of AI Platform infrastructure
```

**When to use:** >20 engineers working with AI. Multiple product lines.
**Tradeoffs:** Two-team coordination overhead. Requires clear platform contract.

---

## Hiring Criteria for AI Engineers

Traditional software engineers cannot self-select into AI engineering by reading about it. Evaluate on:

### Technical Screen (What to Test)
1. **Context engineering problem:** Given a system that's returning poor quality outputs, diagnose the context assembly issue. (Tests systems thinking, not just prompt knowledge)
2. **Failure mode identification:** Given this production trace, identify what type of failure occurred and how to prevent it. (Tests depth of understanding)
3. **Agent design:** Design an agent that safely performs X. Include harness, termination criteria, and failure handling. (Tests architecture thinking)
4. **Evaluation challenge:** How would you measure whether this prompt change improved or degraded the system? (Tests PromptOps maturity)

### What Not to Screen On
- "Write a system prompt for X" — too easy, doesn't test systems thinking
- "Name 5 LLM providers" — knowledge test, not engineering test
- "What is RAG?" — definition recall, not application skill

---

## Culture Principles for AI-First Teams

### 1. Evaluation Culture
AI work without evaluation is not engineering — it's vibes. Teams that don't evaluate systematically cannot improve systematically.

**Cultural practice:** Every AI change ships with an evaluation. No exceptions. Evaluation is not QA's job — it's the engineer's job.

### 2. Failure Honesty
AI systems fail in novel ways. Hiding failures creates the conditions for larger failures. Blameless postmortems and transparent incident reporting are non-negotiable.

**Cultural practice:** Share postmortems publicly within the engineering org. Failures that are hidden repeat.

### 3. Human Oversight
AI capabilities are advancing faster than trust is established. The default should always be human oversight — remove it only when confidence is demonstrated, not assumed.

**Cultural practice:** Human approval gates are celebrated, not resented. They are how trust is built.

### 4. Standards Discipline
The OAIES standard works when followed consistently. Teams that apply it selectively ("just this once") erode the standard for everyone.

**Cultural practice:** Code review includes OAIES checklist compliance. Non-compliance is a review comment, not a personal judgment.

---

## The Technology Radar

Quarterly review of emerging technologies, techniques, and practices. Every team operating at Level 10 runs a technology radar.

**Format:** Adopt / Trial / Assess / Hold (same as ThoughtWorks Technology Radar)

See [radar/technology-radar.md](./radar/technology-radar.md) for the current OAIES radar.

**Cadence:** Quarterly update, with emergency additions for breakthrough developments.

---

## Anti-Patterns at Organizational Level

### ❌ "AI will 10x our productivity overnight"
AI tools improve engineering productivity — measurably. But the improvement requires: training, standard workflows, evaluation infrastructure, and iterative refinement. Teams that expect overnight productivity gains create unrealistic expectations and abandon good tools too early.

### ❌ "We'll hire one AI expert to handle everything"
AI engineering is a team discipline, not a single-expert domain. One "AI expert" surrounded by engineers who don't understand AI creates a bottleneck, a single point of failure, and a skills gap that grows.

### ❌ "We don't need standards — we're a startup"
Startups that don't establish AI standards early spend months refactoring inconsistent implementations, debugging undocumented AI behavior, and repeating mistakes. Standards reduce waste — at every company size.

### ❌ "The AI will replace engineers, so we don't need to hire"
AI tools amplify engineers. Teams that shrink engineering capacity while increasing AI tool usage end up with less throughput — because AI tools require engineering judgment to use well. The ratio changes; the need for human engineering judgment does not disappear.
