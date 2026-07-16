# Debug Skill

> **Skill ID:** `debug`
> **Version:** 1.0
> **Install:** `.claude/skills/debug.skill.md`

---

## Trigger Conditions

Activate this skill when:
- User reports a bug, error, or unexpected behavior
- Stack trace or error message is provided
- Output says "it's not working" with any technical artifact
- Debugging is explicitly requested
- Tests are failing without obvious cause

---

## Purpose

Systematically diagnose and resolve bugs using a structured, hypothesis-driven approach. Produce a root cause analysis, not just a fix.

---

## Prerequisites

Before starting:
- [ ] Reproduce the bug (if not already confirmed)
- [ ] Access to relevant code, logs, or error output
- [ ] Understanding of expected vs. actual behavior

---

## Procedure

### Step 1: Characterize the Bug
Inside `<thinking>` tags, answer:
1. What is the exact error? (Copy verbatim, do not paraphrase)
2. What is the expected behavior?
3. What is the actual behavior?
4. When did this start? (After what change?)
5. Is it reproducible? (Always / sometimes / only in specific conditions)
6. What environment? (dev / staging / prod, OS, version)

### Step 2: Generate Hypotheses (Top-Down)
Generate at least 3 hypotheses, ordered by likelihood:
```
Hypothesis 1: [Most likely cause] — Evidence: [What suggests this]
Hypothesis 2: [Second likely cause] — Evidence: [What suggests this]
Hypothesis 3: [Third likely cause] — Evidence: [What suggests this]
```

Do NOT jump to a fix before generating hypotheses.

### Step 3: Design Tests for Each Hypothesis
For each hypothesis, identify:
- What would confirm it?
- What would rule it out?
- What's the fastest way to test it?

### Step 4: Test Hypotheses (Highest ROI First)
Test the hypothesis that:
- Is most likely AND
- Is cheapest to test

Document results of each test.

### Step 5: Identify Root Cause
Once a hypothesis is confirmed:
- State the root cause precisely
- Distinguish between immediate cause and contributing factors
- Identify if this failure mode can occur elsewhere

### Step 6: Implement Fix
- Fix the root cause, not the symptom
- Add a test that would have caught this bug
- Check for similar patterns in adjacent code

### Step 7: Verify Fix
- Confirm the original bug is resolved
- Run the full test suite
- Check adjacent functionality for regression
- If in production: confirm with metrics, not just manual testing

---

## Output Format

```markdown
## Bug Analysis

**Root Cause:** [One sentence — the precise cause]
**Category:** [Type 1-10 from failure mode taxonomy]

## Hypothesis Testing
| # | Hypothesis | Test | Result |
|---|-----------|------|--------|
| 1 | ... | ... | Confirmed / Ruled out |

## Fix Applied
[Code change or configuration change]

## Prevention
[What test or guard would have caught this]

## Similar Risks
[Other places in the codebase where this pattern exists]
```

---

## Verification

The debug skill succeeded when:
- [ ] Root cause is identified (not just "we fixed it")
- [ ] Fix addresses root cause, not symptom
- [ ] A new test covers this failure scenario
- [ ] Similar patterns checked in adjacent code
- [ ] Fix verified in the affected environment

---

## Common Failures

### Symptom → Fix (Wrong) vs. Root Cause → Fix (Right)
**Wrong:** "The button was broken. I fixed the button."
**Right:** "The button was broken because the event handler was not bound due to missing `.bind(this)` in the constructor. Fixed the binding pattern and added a test for event handler registration."

### Skipping Hypothesis Generation
Jumping directly to "I think it's X" without generating alternatives leads to tunnel vision and missed root causes. Always generate at least 3 hypotheses.

### Not Checking for Similar Patterns
The same bug in one place is usually in 3 places. After fixing, always search for the same anti-pattern.

---

## Examples

### Example 1: API returning 500 intermittently
```
Characterization:
- Error: HTTP 500, "Internal Server Error", no stack trace in response
- Expected: 200 with user data
- Actual: 500, occurring ~5% of requests
- Started: After the Redis caching PR last Tuesday

Hypotheses:
1. Race condition in Redis cache write (most likely — timing suggests this)
2. Unhandled edge case in user data transformation
3. Database connection pool exhaustion under load

Test H1: Add logging around Redis operations, reproduce under load
Result: Confirmed — cache write and read happening concurrently, read returns null

Root Cause: Cache write is async but read is not awaiting write completion.
Cache miss causes null pointer in transformation layer.

Fix: Ensure cache write completes before returning from cache layer.
Added: Unit test for concurrent cache read/write scenario.
```

---

## Do Not Use This Skill When

- The "bug" is actually a feature request or specification change
- The error is clearly a typo or syntax error (just fix it)
- The issue is in a third-party library and not your code (report upstream, add workaround)
