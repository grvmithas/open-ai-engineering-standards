# Migration Pattern — Context

> **Pattern:** Migration  
> **Component:** context.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Preconditions (must be true before activation)

- [ ] Source state and target state written (schema/API/store)
- [ ] Consumer inventory started (services, jobs, reports, partners)
- [ ] Data volume, retention, and SLO constraints known
- [ ] Backup/restore path identified and rehearsable
- [ ] Named human for cutover / point-of-no-return approval

## Trigger conditions (apply the pattern)

Apply when **any** of the following hold:

- Live data shape or storage system changes
- Existing API consumers must keep working across the change
- Dual-write, dual-read, or shadow traffic is needed
- Rollback after rewrite would require data repair

## Do not apply when

- Expand-only additive change with no cutover and no old-path removal
- Code-only refactor with identical external contracts
- Throwaway test databases
- Pure flag flip for containment (schedule real migration after)

## Required inputs

| Input | Source | Minimum quality |
|-------|--------|-----------------|
| Source/target | ADR or ticket | Explicit before/after |
| Consumers | Search + owners | Named readers/writers |
| Data profile | Metrics / DBA | Volume, hot keys, null rates |
| SLOs | SRE | Error/latency budgets for cutover |

## Authority boundary

The migration agent designs phases and gates. **Destructive contraction** and **point-of-no-return cutover** require named human approval. The agent must not drop production columns unattended.
