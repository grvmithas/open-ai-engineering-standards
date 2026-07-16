# Optimization Pattern — Skills

> **Pattern:** Optimization  
> **Component:** skills.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Skill | Path / domain | Why required |
|-------|---------------|--------------|
| Profiling & tracing | Performance skill | Attribute dominant cost before coding |
| Benchmark design | Perf / LLMOps cost skills | Fair A/B, warm-up, confidence intervals |
| Feature flags | Release / platform skill | Kill-switch and progressive exposure |
| Correctness oracles | Testing skill | Fail closed when faster ≠ correct |

## Skill activation triggers

1. **Profiling** — always before a hypothesis; re-run after candidate if bottleneck may have shifted  
2. **Benchmark design** — whenever baseline or candidate results are produced  
3. **Feature flags** — before any production-facing change lands  
4. **Oracles** — every candidate evaluation; not optional for caching/concurrency changes

## Verification that skills worked

- Profiling: dominant cost named with ≥30% share or explicit “no dominant cost” stop  
- Benchmark: control and candidate share workload ID and warm-up policy  
- Flags: report names the flag and disable procedure  
- Oracle: zero failures, or recommendation is forced KILL
