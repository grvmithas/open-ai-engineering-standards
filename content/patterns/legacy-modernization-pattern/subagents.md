# Legacy Modernization Pattern — Subagents

> **Pattern:** Legacy Modernization  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Legacy Behavior Mapper | Extracts golden behaviors from code/jobs/SME | Start of slice | Behavior catalog + fixtures |
| Parity Harness Builder | Compares legacy vs new outputs | Before / during shadow | Pass/fail report |
| Traffic Shift Controller | Defines ramp and abort | After parity green | Shift runbook |

## Behavior Mapper contract

- Prefer executable oracles (batch outputs, API recordings) over anecdotes
- Include edge cases: nulls, leap days, max cart, denied auth
- Mark unknown rules explicitly — do not invent

## Parity Harness contract

- Same inputs to legacy and new whenever shadow is possible
- Tolerances explicit (e.g. money rounding 0.01)
- Failures block traffic increase

## Traffic Shift Controller contract

- Steps include abort KPIs (error rate, conversion, latency)
- Always include immediate rollback to legacy path
- 100% requires business + eng acknowledgment
