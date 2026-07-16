# Enterprise Pattern — Skills

> **Pattern:** Enterprise  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Domain path | Why required |
|-------|-------------|--------------|
| Responsible AI / risk | `09-enterprise-ai/governance/` | Tiering and oversight obligations |
| Least privilege | `09-enterprise-ai/security/least-privilege.md` | Tool and data scope minimization |
| OAuth for MCP | `09-enterprise-ai/security/oauth-for-mcp.md` | Safe tool credentials |
| Prompt-injection defense | `09-enterprise-ai/security/prompt-injection-defense.md` | Untrusted content boundaries |
| Audit logging | `09-enterprise-ai/governance/audit-logging.md` | Evidence and forensics |
| Sandboxing | `09-enterprise-ai/security/sandboxing.md` | Contain tool side effects |

## Skill activation triggers

1. **Risk** — every new use case and every material change  
2. **Least privilege / MCP OAuth** — any tool with side effects  
3. **Injection defense** — any untrusted user or retrieved content in context  
4. **Audit logging** — before pilot enablement  
5. **Sandboxing** — code execution or high-impact tools

## Verification that skills worked

- Risk: tier matches rubric criteria written in the package  
- Privilege: tool allowlist is deny-by-default  
- Logging: redaction rules exist for sensitive fields  
- Kill switch: drill log shows disable without engineering heroics
