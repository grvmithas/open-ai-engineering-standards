# Changelog

All notable changes to the Open AI Engineering Standard are documented here.

Format: `[Version] — YYYY-MM-DD`
Each entry includes: Added, Changed, Deprecated, Removed, Fixed, Security.

---

## [1.0.0] — 2026-07-16

### Added
- Complete 10-level AI Engineering Maturity Model (L0–L10)
- 12 AI Engineering Patterns with full 13-component specification
- 18-stack AI Cookbook
- 26 reusable agent skills
- 20 production agent definitions
- 19 subagent definitions
- 12 lifecycle hooks
- 24 MCP integration specifications
- Complete AI SDLC with 26 stages
- 15 production-ready SDLC prompts
- Enterprise security, governance, and compliance guides
- Anti-pattern registry across all domains
- Evaluation framework setup guides (RAGAS, DeepEval, Promptfoo)
- GitHub automation templates
- Curated papers and resources

### Standard Decisions (v1.0)
- **Prompt format:** XML-structured (system → user → output_format → constraints)
- **Context placement:** Critical information at top and bottom (anti-"lost in the middle")
- **Agent harness:** Provider-neutral, deterministic wrapper required
- **Evaluation:** DeepEval for CI gates, RAGAS for RAG pipelines
- **Observability:** OpenTelemetry-native with LangSmith/Langfuse integration
- **Prompt management:** Versioned artifacts (Langfuse or Braintrust)
- **Security posture:** Least privilege by default, OAuth 2.1 for MCP
- **Cost control:** Model routing enforced, token budgets mandatory

---

## Versioning Roadmap

| Version | Target | Focus |
|---------|--------|-------|
| v1.0 | Q3 2026 | Foundations + Prompt + Context + Skill Engineering |
| v2.0 | Q4 2026 | Agent + Multi-Agent Engineering |
| v3.0 | Q1 2027 | LLMOps + AI SDLC |
| v4.0 | Q2 2027 | Enterprise AI + AI Org Playbook |
| v5.0 | Q3 2027 | Complete Patterns Library |
| v6.0 | Q4 2027 | Complete Cookbook |
| v7.0 | Q1 2028 | Memory + Knowledge Graphs deep dive |
| v8.0 | Q2 2028 | Advanced Evaluation Frameworks |
| v9.0 | Q3 2028 | AI Governance Standards |
| v10.0 | Q4 2028 | Full living standard — all 10 levels complete |
