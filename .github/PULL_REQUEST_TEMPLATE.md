## Pull Request

### Summary
<!-- Describe what this PR does in 2-3 sentences. -->

### Type of Change
- [ ] New prompt
- [ ] Modified prompt
- [ ] New skill
- [ ] New agent definition
- [ ] New MCP integration
- [ ] New pattern
- [ ] Documentation update
- [ ] Bug fix
- [ ] Other: _______________

### AIES Checklist

#### For Prompts
- [ ] Follows XML structure standard (see `content/01-prompt-engineering/patterns/xml-structured.md`)
- [ ] Has role definition with explicit exclusions
- [ ] Has output format specification with example
- [ ] Has at least 3 hard constraints
- [ ] Has a planning/thinking step for complex tasks
- [ ] Tested with at least 2 inputs (including one adversarial input)
- [ ] Evaluation gate passing

#### For Skills
- [ ] Follows standard skill structure (Trigger → Purpose → Prerequisites → Procedure → Verification → Failures → Examples)
- [ ] Has specific, non-overlapping trigger conditions
- [ ] Has verification step
- [ ] Has common failures section

#### For Agents
- [ ] Has role, tools, memory requirements, communication protocol
- [ ] Has termination criteria (success AND failure)
- [ ] Has failure modes and recovery strategies

#### For All Documents
- [ ] Has "Why" section explaining the rationale
- [ ] Has at least one anti-pattern
- [ ] Has enterprise consideration
- [ ] No placeholder text or TODOs
- [ ] Written at principal-engineer level
- [ ] All internal links verified

### Testing
<!-- How did you test this change? -->
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm test`
- [ ] `npm run build`

### Related Issues
<!-- Link to any related issues: Closes #XXX -->

---
*Submitted for review under the AIES standard. Not meeting the checklist above will result in PR feedback requesting updates.*
