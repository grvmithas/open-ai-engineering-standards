# Architecture Pattern — Subagents

> **Pattern:** Architecture  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Alternatives Generator | Forces ≥2 viable designs | After drivers clear | Options table |
| Failure Walker | Dependency-down and partial-failure scenarios | Before review | Scenario → mitigation table |
| Threat Boundary Mapper | Identity, data, tenancy, tool edges | Before review | Trust-boundary notes |

## Alternatives Generator contract

- Options must be implementable under stated constraints
- No “do nothing” strawman unless it is genuinely viable
- Each option names primary trade relative to QA scenarios

## Failure Walker contract

- Cover: dependency unavailable, timeout/retry storm, poison message, clock skew, region loss (if multi-region)
- Each scenario needs detection signal + mitigation

## Threat Boundary Mapper contract

- Mark where untrusted input enters
- Mark tenancy enforcement points
- Mark AI tool allowlists if tools exist
- Escalate unresolved Critical boundaries — do not approve around them
