# Optimization Pattern — Subagents

> **Pattern:** Optimization  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Workload Curator | Freezes traffic mix, fixtures, concurrency, regions | Before baseline | Versioned workload ID + definition file |
| Profiler | Attributes CPU, IO, alloc, lock, network, token cost | After baseline | Dominant cost + flame/span excerpt |
| Benchmark Runner | Runs control vs candidate with warm-up and CI | After candidate build | Distribution table + raw artifact |
| Canary Observer | Watches abort metrics during progressive exposure | During canary | Hold/abort recommendation with timestamps |

## Workload Curator contract

- Workload ID must be immutable for the duration of an evaluation
- Must document how the mix maps to production (or why staging proxy is accepted)
- Exclude synthetic paths that never appear in the critical user journey

## Profiler contract

- Attribute on the **same** workload ID as the baseline
- Name the dominant cost with path/span and percent of critical path
- Flag if no single cost ≥30% — trigger stop/expand before coding

## Benchmark Runner contract

- Identical warm-up and sample count for control and candidate
- Report p50/p95/p99, error rate, and unit cost when applicable
- Run oracle after each candidate batch; fail closed

## Canary Observer contract

- Pre-load abort thresholds; do not renegotiate mid-canary
- Emit timestamped decision: continue / hold / abort
- On abort: recommend immediate flag disable and baseline compare
