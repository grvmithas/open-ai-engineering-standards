# Enterprise Pattern — Problem

> **Pattern:** Enterprise  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

AI capabilities reach production without a durable inventory record, risk tier, runtime-enforced policy bundle, or proven disable path. When auditors, regulators, or incident commanders ask basic questions, teams scramble through Slack history instead of systems of record.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Inventory gap | Cannot list all prod models/prompts/tools for a BU in one business day |
| Paper controls | “Governance” exists only as PDFs; gateway has no matching policy version |
| Kill-switch fiction | On-call cannot disable a use case in <15 minutes |
| Tool sprawl | Production traces show tools not on the approved allowlist |
| Evidence rot | Model/vendor eval older than the change that altered data flow |

## Root cause

Organizations treat AI governance as a documentation and vendor-assurance exercise instead of as **enforceable runtime controls** with owners, SLOs, and incident obligations.

## Non-goals of this pattern

- Not a substitute for legal advice or external certification
- Not a full privacy program (it consumes classification and DPIA outputs)
- Not model-training governance for research labs with no product exposure
- Not a way to bypass existing high-risk change boards

## Related failure modes

See [failures.md](./failures.md).
