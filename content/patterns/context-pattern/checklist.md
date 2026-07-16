# Context Pattern — Checklist

> **Pattern:** Context  
> **Component:** checklist.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

**Gate:** Downstream planner/coder does not start until the package passes hooks.

## Intake

- [ ] Task intent written
- [ ] Budget set (`MAX_BYTES` / tokens)
- [ ] Seed hints provided or searchable
- [ ] Exclusion rules loaded

## Package quality

- [ ] Manifest with path + why for every excerpt
- [ ] Producers and consumers included when change crosses modules
- [ ] Deliberate exclusions listed
- [ ] Gaps listed (no invented files)
- [ ] Size ≤ budget
- [ ] Secret scrub clean

## Handoff

- [ ] Consuming agent named
- [ ] Package path linked from the task/PR
- [ ] Re-assemble rule understood if agent requests justified gaps
