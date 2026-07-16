# Enterprise Pattern — Example: Multi-region support copilot

> **Pattern:** Enterprise  
> **Component:** examples/example.md  
> **Version:** 1.1 | **Updated:** 2026-07-16  
> **Scenario:** Customer-support copilot with ticket-update tool, EU + US regions

---

## Use-case brief

Assist human agents drafting replies and proposing ticket field updates. AI never auto-sends email without human confirm. Tools: `tickets.get`, `tickets.propose_update` (requires human apply).

## Inventory record (inline)

| Field | Value |
|-------|-------|
| Inventory ID | `AI-SYS-1042` |
| Purpose | Support reply assist + proposed ticket updates |
| Users | Internal support agents (Okta group `support-agents`) |
| Data classes | Customer messages (personal data), account IDs, free-text |
| Regions | `eu-west-1` (EU tenants), `us-east-1` (US tenants) |
| Models | `vendorX-chat-2026-06` via AI gateway only |
| Tools | `tickets.get`, `tickets.propose_update` |
| Owners | Biz: N. Patel · Tech: R. Alvarez |

## Risk tier

**Tier:** Medium (personal data + external system side effects, human-in-loop for send/apply)  

Mandatory controls from rubric: SSO, audit log, tool allowlist, residency routing, kill switch, prompt-injection untrusted-content boundary, DPA on file for vendorX.

## Control map (inline)

| Control | Enforcement | Evidence |
|---------|-------------|----------|
| SSO only | IdP → gateway JWT | Okta app `ai-support-copilot` |
| Tool allowlist | Gateway deny-by-default | Policy `pol-1042-v3` tools list |
| Residency | Gateway route by tenant region | Route table in `pol-1042-v3` |
| Audit log | SIEM topic `ai.audit.support` | Redaction rules v2 |
| Kill switch | Gateway feature `use_case:AI-SYS-1042=deny` | Drill 2026-07-10 |

## Policy bundle excerpt

```yaml
inventory_id: AI-SYS-1042
version: pol-1042-v3
models_allow: [vendorX-chat-2026-06]
prompt_versions_pin: [support-copilot@7]
tools_allow: [tickets.get, tickets.propose_update]
residency:
  EU: eu-west-1
  US: us-east-1
kill_switch: use_case:AI-SYS-1042
```

## Kill-switch drill (inline log)

```text
2026-07-10T15:02Z IC: R. Alvarez sets gateway use_case:AI-SYS-1042=deny
2026-07-10T15:04Z Synthetic probe returns 403 UseCaseDisabled
2026-07-10T15:05Z SIEM shows deny events; ticket tool calls stop
Result: PASS (3 minutes)
```

## Enablement stages

| Stage | Scope | Exit |
|-------|-------|------|
| Pilot | 2 EU tenants | 7 days, injection eval pass, no shadow tools |
| Limited | All EU | Cost < $0.04/ticket assist |
| US | US tenants after EU soak | Same controls + US DPA endpoint |

## Human approval

```text
Risk approver: L. Cho  Date: 2026-07-11
Privacy: M. Berg  Date: 2026-07-11
Recommendation enacted: ENABLE_PILOT
```

This example is the artifact shape — not a claim of live certification.
