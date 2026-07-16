# The Harness Principle

> **The LLM is one component. The harness is the product.**
> **Version:** 1.2.0  
> **Last updated:** 2026-07-16

---

## Purpose

Production systems need deterministic controls wherever model output crosses a correctness, data, authorization, financial, or side-effect boundary. This wrapper—the **harness**—validates and authorizes model proposals and records evidence proportionate to risk.

---

## Why

LLMs are probabilistic. They produce the statistically likely next token, not the guaranteed correct action. Without a harness:
- Invalid outputs reach users
- Unauthorized operations execute
- Failures produce no audit trail
- Cost spirals without enforcement
- Security boundaries exist only as model instructions rather than enforceable controls

The harness implements enforceable invariants in code rather than relying on probabilistic model compliance.

## How

Implement the request path below as independently testable control points. Default-deny authorization and tool policy, validate every transition, and preserve enough evidence to replay each decision.

---

## The Standard Harness Architecture

```mermaid
graph TD
    A[User Request] --> B[Input Validation]
    B --> C[Authorization Check]
    C --> D[Context Assembly]
    D --> E[LLM API Call]
    E --> F[Output Schema Validation]
    F --> G[Safety Filter]
    G --> H[Tool Execution Gate]
    H --> I[Action Execution]
    I --> J[Audit Logging]
    J --> K[Response Formatting]
    K --> L[User Response]
    
    B -->|Invalid| M[Reject + Log]
    C -->|Unauthorized| N[Deny + Log]
    F -->|Invalid schema| O[Retry / Fallback]
    G -->|Unsafe| P[Block + Alert]
    H -->|Denied tool| Q[Refuse + Explain]
```

---

## The Seven Harness Components

### 1. Input Validation
Treat all user and retrieved input as untrusted. Validate types, lengths, encoding, and business bounds. Do not assume prompt-injection text can be completely detected or sanitized.

**What to validate:**
- Input length (prevent context stuffing attacks)
- Allowed characters and encoding
- Business logic bounds (user can only query their own data)
- Source provenance and trust classification

### 2. Authorization Check
The model cannot enforce authorization — it doesn't know who the user is. The harness does.

**Pattern:** Resolve user identity and permissions before context assembly. Never pass authorization decisions to the model.

### 3. Context Assembly
Deterministically construct the context window. The model receives only what it's authorized to see.

**Pattern:** Pull context from structured sources (databases, vector stores) with explicit permission filtering — never from raw user input alone.

### 4. Output Schema Validation
Enforce a strict schema on model output. Use Pydantic (Python), Zod (TypeScript), or structured output APIs.

```python
# Correct: Enforce schema
from typing import Literal
from pydantic import BaseModel
class AgentAction(BaseModel):
    action: Literal["search", "create", "update", "delete"]
    target: str
    parameters: dict[str, str]

response = client.beta.chat.completions.parse(
    model="gpt-4o",
    response_format=AgentAction,
    messages=[...]
)
```

```python
# Wrong: Trust model output as-is
raw_output = response.choices[0].message.content
eval(raw_output)  # ← Never do this
```

### 5. Safety Filter
Apply deterministic policy checks on validated output. Model-based moderation may complement these checks, but must not authorize access or side effects.

**Pattern:** Allowlist permitted operations and targets by actor and resource. Apply explicit deny rules and content policy before execution.

### 6. Tool Execution Gate
For agentic systems, require explicit approval for high-impact operations. Never let the model directly execute writes, deletions, or external calls without a gate.

**Tiered approach:**
- **Tier 1 (auto-approve):** Read-only operations
- **Tier 2 (log + execute):** Reversible writes
- **Tier 3 (human approval):** Irreversible or high-impact operations

### 7. Audit Logging
Log harness decisions required for incident reconstruction, security monitoring, financial attribution, and applicable controls. Minimize sensitive payloads and define retention.

**Minimum log payload:**
```json
{
  "timestamp": "ISO8601",
  "session_id": "uuid",
  "user_id": "string",
  "input_hash": "sha256",
  "model": "provider/model-version",
  "tokens_used": { "input": 0, "output": 0, "cost_usd": 0.0 },
  "action_proposed": "string",
  "action_approved": true,
  "execution_result": "string",
  "latency_ms": 0
}
```

---

## Tradeoffs

| Benefit | Cost |
|---------|------|
| Reliability and predictability | Additional latency (validation layers) |
| Auditability and compliance | Engineering complexity |
| Security enforcement | More code to maintain |
| Cost control | Upfront design time |

Controls are selected from failure impact and system boundaries. A read-only drafting aid and a payment agent require different harness depth, but neither may delegate enforceable policy to model instructions.

## When

Use the full control path whenever model output can influence data access, external communication, money, workflow state, or tool execution. Read-only drafting may use fewer execution controls, but still requires data authorization, validation, and audit proportionate to risk.

---

## Anti-Patterns

### ❌ Security through system prompt
```text
# Wrong
system: "Never access files outside /data directory"

# Right
harness: validate_path(tool_input.path, allowed_prefix="/data")
```
System prompts are instructions to a probabilistic model. They are not access controls.

### ❌ Trusting structured output because you asked for JSON
The model can return invalid JSON, valid JSON with wrong schema, or valid JSON with harmful content. Validate all three.

### ❌ The "smart model" exception
"This model is too smart to need controls" confuses benchmark capability with enforceable reliability. Model versions can produce unsupported outputs and follow adversarial content; design controls for those observed failure modes.

---

## Enterprise Considerations

- **EU AI Act Article 9:** High-risk systems require an ongoing risk-management system; harness controls can provide part of the implementation evidence, subject to legal classification and review.
- **SOC 2 / ISO 27001:** Audit logging commonly supports relevant controls; scope, retention, and integrity requirements depend on the organization's control design.
- **Financial services:** Map approval tiers to applicable regulation, internal authority matrices, and transaction risk.
- **Healthcare (HIPAA):** Input validation must prevent PHI from entering model context unless explicitly authorized and logged.

---

## Checklist

- [ ] Input validation enforces type, size, encoding, and business bounds
- [ ] Authorization resolved before context assembly
- [ ] Context filtered by user permissions
- [ ] Output validated against strict schema
- [ ] Safety filter applied before execution
- [ ] Tool execution gate enforced by tier
- [ ] Required harness decisions are logged with data-minimized evidence
- [ ] Logs are immutable and retained per compliance requirement
- [ ] Adversarial content cannot increase privileges or bypass tool policy

## Changelog

- 1.2.0 (2026-07-16): Scoped harness depth and logging to explicit system boundaries and risk.
- 1.1.0 (2026-07-16): Replaced injection phrase blocking with deterministic authorization and isolation controls.
