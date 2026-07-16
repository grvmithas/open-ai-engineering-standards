# Curated Resources

> **These are the resources that matter. Not a list — a curated library.**
> Every resource here was selected because it changed how experts think about AI engineering.

---

## Foundational Papers

### Context Engineering
| Paper | Authors | Why It Matters |
|-------|---------|---------------|
| Attention Is All You Need | Vaswani et al. (2017) | The transformer architecture that underlies everything |
| Lost in the Middle: How Language Models Use Long Contexts | Liu et al. (2023) | The evidence behind the "critical info at top/bottom" rule |
| REALM: Retrieval-Augmented Language Model Pre-Training | Guu et al. (2020) | Foundational RAG paper |
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | Lewis et al. (2020) | The canonical RAG paper |

### Agent Engineering
| Paper | Authors | Why It Matters |
|-------|---------|---------------|
| ReAct: Synergizing Reasoning and Acting | Yao et al. (2022) | The ReAct pattern for tool-using agents |
| Tree of Thoughts | Yao et al. (2023) | Multi-path reasoning for complex problems |
| Chain of Thought Prompting Elicits Reasoning | Wei et al. (2022) | Evidence for explicit reasoning steps |
| Reflexion: Language Agents with Verbal Reinforcement Learning | Shinn et al. (2023) | Reflection and self-critique patterns |
| Plan-and-Solve Prompting | Wang et al. (2023) | Plan before execute for complex tasks |

### Evaluation
| Paper | Authors | Why It Matters |
|-------|---------|---------------|
| RAGAS: Automated Evaluation of Retrieval Augmented Generation | Es et al. (2023) | Foundation for RAG evaluation |
| Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena | Zheng et al. (2023) | LLM-as-judge biases and calibration |
| Large Language Models are not Fair Evaluators | Wang et al. (2023) | Position bias in LLM evaluation |

### Security
| Paper | Authors | Why It Matters |
|-------|---------|---------------|
| Prompt Injection Attacks Against LLM-Integrated Applications | Greshake et al. (2023) | The first systematic study of prompt injection |
| Not What You've Signed Up For: Compromising Real-World LLM-Integrated Applications | Greshake et al. (2023) | Indirect prompt injection via tool outputs |

---

## Books

| Book | Authors | Why Read It |
|------|---------|------------|
| **Designing Machine Learning Systems** | Chip Huyen | Systems thinking for ML in production |
| **Building LLM Apps** | Various | Practical LLM application patterns |
| **The Pragmatic Programmer** | Hunt & Thomas | Still the best engineering mindset book |
| **Release It!** | Michael Nygard | Stability patterns for production systems |
| **Accelerate** | Forsgren, Humble, Kim | Evidence-based DevOps — applies directly to AI DevOps |

---

## Essential GitHub Repositories

| Repository | What It Is | Why Follow It |
|-----------|-----------|--------------|
| [anthropics/anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook) | Claude usage examples | Official Anthropic patterns |
| [openai/openai-cookbook](https://github.com/openai/openai-cookbook) | OpenAI usage examples | Official OpenAI patterns |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | LLM application framework | Most widely used LLM framework |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Stateful agent graphs | Production agent orchestration |
| [deepeval-ai/deepeval](https://github.com/confident-ai/deepeval) | LLM evaluation framework | CI/CD evaluation gates |
| [explodinggradients/ragas](https://github.com/explodinggradients/ragas) | RAG evaluation | RAG quality measurement |
| [promptfoo/promptfoo](https://github.com/promptfoo/promptfoo) | Prompt testing | Security and comparison testing |
| [microsoft/autogen](https://github.com/microsoft/autogen) | Multi-agent framework | Microsoft's agent orchestration |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | MCP server library | Reference MCP implementations |

---

## Industry Blogs Worth Following

| Blog | Organization | Focus |
|------|-------------|-------|
| [Anthropic Research](https://www.anthropic.com/research) | Anthropic | Safety, alignment, Claude capabilities |
| [OpenAI Blog](https://openai.com/blog) | OpenAI | GPT, agents, DALL-E, safety |
| [Google DeepMind Blog](https://deepmind.google/blog/) | Google DeepMind | Gemini, research breakthroughs |
| [The Batch](https://www.deeplearning.ai/the-batch/) | DeepLearning.AI | Weekly AI news digest |
| [Chip Huyen's Blog](https://huyenchip.com) | Chip Huyen | Practical ML engineering |
| [Lil'Log](https://lilianweng.github.io) | Lilian Weng (OpenAI) | Deep technical explanations |
| [Eugene Yan's Blog](https://eugeneyan.com) | Eugene Yan | Applied ML and LLM systems |
| [Simon Willison's Blog](https://simonwillison.net) | Simon Willison | LLM security, tools, agents |

---

## Standards and Specifications

| Standard | Organization | Relevance |
|---------|-------------|----------|
| [EU AI Act](https://artificialintelligenceact.eu) | European Union | Mandatory compliance for EU deployments |
| [NIST AI Risk Management Framework](https://www.nist.gov/system/files/documents/2023/01/26/AI%20RMF%201.0.pdf) | NIST | US AI risk framework |
| [Model Context Protocol Spec](https://modelcontextprotocol.io) | Anthropic | MCP implementation standard |
| [OpenTelemetry Specification](https://opentelemetry.io/docs/) | CNCF | Observability standard |
| [Semantic Versioning](https://semver.org) | Community | Version management for prompts and agents |

---

## Courses

| Course | Platform | Who It's For |
|--------|---------|-------------|
| [Short Courses by DeepLearning.AI](https://www.deeplearning.ai/short-courses/) | DeepLearning.AI | Practical AI engineering, updated frequently |
| [Building Systems with the ChatGPT API](https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/) | DeepLearning.AI | Production LLM systems |
| [LangChain for LLM Application Development](https://www.deeplearning.ai/short-courses/langchain-for-llm-application-development/) | DeepLearning.AI | LangChain fundamentals |
| [Building and Evaluating Advanced RAG](https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/) | DeepLearning.AI | Production RAG systems |

---

## Technology Radar

> Updated quarterly. Last updated: Q3 2026.

### Adopt (Use in production now)
- **LangGraph** — Stateful agent orchestration
- **DeepEval** — LLM evaluation in CI/CD
- **RAGAS** — RAG evaluation
- **Langfuse** — LLM observability
- **MCP** — Agent-to-tool integration standard
- **PydanticAI** — Type-safe LLM interactions

### Trial (Evaluate for your use case)
- **OpenAI Agents SDK** — Native agent orchestration
- **Google A2A Protocol** — Agent-to-agent communication
- **Braintrust** — Prompt management and evaluation

### Assess (Watch, not yet ready for production)
- **Knowledge Graphs + LLMs** — GraphRAG patterns maturing
- **Mixture of Agents** — Multiple models collaborating
- **Long context models** — 1M+ token windows with reliable recall

### Hold (Do not adopt)
- **Autonomous agents without human-in-loop for high-stakes tasks** — Not ready for production
- **LLMs for real-time decisions in regulated industries without human review** — Compliance risk
