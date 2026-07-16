# Context Pattern — Subagents

> **Pattern:** Context  
> **Component:** subagents.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

| Subagent | Role | When invoked | Output |
|----------|------|--------------|--------|
| Path Seeder | Maps intent keywords/symbols to paths | Start | Seed path list |
| Call-site Expander | Follows imports, routes, schema refs | After seed | Expanded path set |
| Secret Scrubber | Greps dangerous patterns before emit | Pre-handoff | Clean certificate or hit report |

## Path Seeder contract

- Use task nouns (e.g. `reports`, `orgId`) and error stacks as anchors
- Prefer existing module roots over random matches
- Cap seeds at 10 before expansion

## Call-site Expander contract

- Include both producers (impl) and consumers (routes, UI, jobs)
- Include schema/migration when data shape is in scope
- Stop expansion at package boundaries unless the task crosses them

## Secret Scrubber contract

- Fail the package on matches for: `API_KEY`, `BEGIN PRIVATE KEY`, `aws_secret`, password assignments in `.env`
- Redaction is allowed only if human policy says so; default is exclude entire file
