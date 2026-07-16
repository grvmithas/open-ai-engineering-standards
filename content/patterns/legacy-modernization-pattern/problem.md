# Legacy Modernization Pattern — Problem

> **Pattern:** Legacy Modernization  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

Legacy replacement programs fail when teams fund a parallel rewrite without strangler seams, characterization/parity evidence, incremental traffic shift, or retirement criteria. The legacy system remains on the critical path while cost doubles.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Schedule blowout | Modernization >2× original estimate; legacy still critical |
| Parity gaps | Production edge cases only in legacy |
| Dual-run tax | Two stacks serving same capability indefinitely |
| Big-bang attempt | Single cutover weekend for entire monolith |
| SME bottleneck | Only one person understands batch rules; no tests |

## Root cause

Modernization is framed as “build the new system” instead of “shift traffic and retire the old path capability by capability.” Without seams and parity gates, cutover risk stays binary and teams delay forever.

## Non-goals of this pattern

- Not greenfield product design
- Not a single schema migration (use migration-pattern inside a slice)
- Not dependency housekeeping on an already-modern service
- Not an excuse to rewrite working code for taste

## Related failure modes

See [failures.md](./failures.md).
