# Hotfix Pattern — Problem

> **Pattern:** Hotfix  
> **Component:** problem.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Statement

During production harm, teams that skip incident command and containment ship oversized “hotfixes,” conflict with each other, and extend customer impact — often creating a second incident during recovery.

## Measurable symptoms

| Symptom | How you detect it |
|---------|-------------------|
| Slow containment | Time from declare → harm reduced misses SEV target |
| Scope bloat | Hotfix diff touches unrelated paths or deps |
| Dual deploy | Two “fixes” land without IC authorization |
| Evidence loss | Logs rotated / pods deleted before capture |
| Comms chaos | Customers hear conflicting status |

## Root cause

Organizations reward “finding root cause live” over stopping impact with a known-good state. Emergency process without roles and abort criteria becomes freestyle engineering.

## Non-goals of this pattern

- Not the durable architectural fix (schedule after containment)
- Not the RCA document (use [root-cause-pattern](../root-cause-pattern/README.md))
- Not a bypass for criminal/security forensics holds when those apply
- Not performance optimization theater under a SEV label

## Related failure modes

See [failures.md](./failures.md).
