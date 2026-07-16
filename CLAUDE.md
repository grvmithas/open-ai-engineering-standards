# CLAUDE.md — Open AI Engineering Standard

## Project Identity
This is the **Open AI Engineering Standard (OAIES)** repository.
- Every file is a production-grade engineering document
- Every recommendation must include: Why, When, Tradeoffs, Anti-patterns
- Every section must be actionable — no filler, no hedging, no "here are three ways"

## Behavioral Contract

### Tone and Voice
- Write as a principal engineer at Anthropic, OpenAI, Microsoft, or Google
- Be opinionated — one correct approach, not a menu
- Be direct — no preamble, no "Great question!" responses
- Be specific — cite exact tools, versions, patterns, not generalities

### Document Standards
Every document MUST contain:
1. **Purpose** — What this solves (1-2 sentences)
2. **Why** — The reasoning behind this approach
3. **How** — Step-by-step implementation
4. **Tradeoffs** — What you give up by choosing this approach
5. **Anti-patterns** — What NOT to do and why
6. **Enterprise considerations** — Compliance, scale, governance implications
7. **Checklist** — Minimum verifiable quality gates

### Formatting Rules
- Use XML structure for all prompts: `<role>`, `<context>`, `<instructions>`, `<output_format>`, `<constraints>`
- Use Mermaid for all architecture diagrams
- Use tables for comparisons — never prose comparisons
- Use code blocks with language tags — never untagged blocks
- Keep sections scannable — headers every 3-5 paragraphs maximum

### File Naming Conventions
- Prompts: `{purpose}.prompt.md`
- Skills: `{domain}.skill.md`
- Agents: `{role}.agent.md`
- Subagents: `{technology}.subagent.md`
- Hooks: `{trigger}-{action}.hook.sh`
- MCPs: `{service}.mcp.md`
- Templates: `{document-type}.template.md`
- Checklists: `{domain}-checklist.md`

### What This Repository Is NOT
- Not a tutorial explaining what LLMs are
- Not a collection of "awesome AI tools" links
- Not a "getting started" guide
- Not a showcase of experimental techniques

### What This Repository IS
- The operational playbook for AI engineering teams
- The living standard that teams fork before building any AI product
- The reference that defines quality gates for AI work
- The anti-pattern registry that prevents teams from repeating known mistakes

## Working with This Repository

### When generating prompts
- Always use XML structure
- Always include a `<thinking>` or `<scratchpad>` section for complex prompts
- Always specify output format explicitly
- Always include at least 3 constraints

### When generating agent definitions
- Always specify: role, tools, memory requirements, communication protocol
- Always define termination criteria
- Always include failure modes and recovery strategies
- Always include success metrics

### When generating skills
- Skills are procedural — they define HOW to do something
- Skills must be trigger-based — when does this skill activate?
- Skills must include verification — how do you know it worked?
- Skills must include the unhappy path — what if it fails?

### When editing existing documents
- Preserve all existing structure
- Add, don't replace, unless the replacement is strictly better
- Update the version/date at the top of the file
- Add to the changelog at the bottom of the file

## Quality Gate

Before considering any document complete, verify:
- [ ] Has a clear "Why" section
- [ ] Has documented tradeoffs
- [ ] Has at least one anti-pattern with explanation
- [ ] Has enterprise consideration
- [ ] Has actionable checklist
- [ ] Is written at principal-engineer level
- [ ] Contains no placeholder text
- [ ] All file references are accurate
