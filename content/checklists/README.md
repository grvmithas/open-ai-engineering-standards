# OAIES Quality Checklists

> **Gate every stage. Skip none. These checklists are the standard.**

---

## How to Use Checklists

Checklists are not suggestions. They are gates. A stage is not complete until its checklist passes.

**Rule:** If you cannot check an item, stop. Either fix the issue or explicitly document why the item does not apply (with a named approver).

---

## Checklist Index

| Checklist | When to Use |
|-----------|------------|
| [Planning Checklist](#planning-checklist) | Before implementation begins |
| [Coding Checklist](#coding-checklist) | Before submitting for review |
| [Review Checklist](#review-checklist) | During code/prompt review |
| [Security Checklist](#security-checklist) | Before deployment |
| [Deployment Checklist](#deployment-checklist) | Before releasing |
| [Prompt Checklist](#prompt-checklist) | Before using a prompt in production |
| [Agent Checklist](#agent-checklist) | Before deploying an agent |
| [Context Checklist](#context-checklist) | Before assembling model context |
| [Performance Checklist](#performance-checklist) | Before performance sign-off |
| [Architecture Checklist](#architecture-checklist) | Before architectural decisions |

---

## Planning Checklist

**Gate:** No coding until all planning items pass.

### Story Quality
- [ ] Story has clear "As a [user], I want [action], so that [benefit]" format
- [ ] Acceptance criteria are testable (a QA engineer can write tests from them)
- [ ] At least 3 acceptance criteria (happy path + 2 edge cases)
- [ ] Out-of-scope items explicitly listed
- [ ] Dependencies identified and available

### Technical Planning
- [ ] Implementation plan reviewed and approved (named approver + date)
- [ ] All files to be changed listed by path
- [ ] Data model changes identified (schema, migration, backward compatibility)
- [ ] API contract changes identified (breaking vs. non-breaking)
- [ ] Rollback strategy defined
- [ ] Estimated effort matches story size

### Risk Assessment
- [ ] Top 3 risks identified with mitigations
- [ ] Security risk considered (even for non-security features)
- [ ] Performance impact estimated
- [ ] External dependencies confirmed available

---

## Coding Checklist

**Gate:** Self-review before requesting peer review.

### Correctness
- [ ] Implementation matches acceptance criteria (verify each one)
- [ ] Edge cases from story are handled
- [ ] Error handling is complete (every error path handled, not just happy path)
- [ ] Null/undefined/empty checks present where needed
- [ ] No hardcoded values that should be configurable

### Code Quality
- [ ] No code duplication that should be extracted
- [ ] Functions do one thing (single responsibility)
- [ ] Variable and function names are self-documenting
- [ ] Complex logic has comments explaining WHY (not WHAT)
- [ ] No dead code or commented-out code committed

### Testing
- [ ] Unit tests for all new logic
- [ ] Tests cover happy path, error path, and edge cases
- [ ] Tests are independent (no test depends on another)
- [ ] No assertions against implementation details (test behavior)
- [ ] Coverage percentage not reduced

### Type Safety (TypeScript/Python)
- [ ] No `any` types (TypeScript) or untyped functions (Python)
- [ ] Null cases handled explicitly
- [ ] Return types explicit on all public functions

---

## Security Checklist

**Gate:** Must pass before deployment to production.

### Input Validation
- [ ] All user inputs validated for type, length, and allowed characters
- [ ] Prompt injection patterns checked if user input reaches AI context
- [ ] File uploads validated for type and size
- [ ] URL inputs validated against allowlist if used for outbound requests

### Authorization
- [ ] All protected routes/resources check authorization
- [ ] Horizontal privilege escalation tested (user A cannot access user B's data)
- [ ] Vertical privilege escalation tested (user cannot access admin functions)

### Data Protection
- [ ] No secrets in source code (use environment variables or secret manager)
- [ ] Sensitive data not logged (passwords, tokens, PII, payment data)
- [ ] PII encrypted at rest and in transit
- [ ] Database queries use parameterized statements (no string interpolation)

### AI-Specific
- [ ] User input separated from system instructions in prompts
- [ ] Tool execution respects user permissions (not just model instructions)
- [ ] Multi-tenant context isolation verified at database level
- [ ] Model output validated before acting on it

---

## Prompt Checklist

**Gate:** No prompt deployed to production without passing this checklist.

### Structure
- [ ] Uses XML structure standard (role, context, instructions, output_format, constraints)
- [ ] Role definition is specific with explicit exclusions
- [ ] Context is complete and noise-free (no irrelevant information)
- [ ] Instructions are numbered and imperative
- [ ] Output format is explicit with a concrete example

### Quality
- [ ] At least 3 hard constraints
- [ ] Planning/thinking step included for complex tasks
- [ ] No implicit assumptions (everything is explicit)
- [ ] Tested with at least 5 inputs including 2 adversarial ones

### Operations
- [ ] Prompt is versioned in registry (Langfuse/PromptLayer/Braintrust)
- [ ] Evaluation test cases exist and pass
- [ ] Changelog entry written for this version
- [ ] Rollback version identified

---

## Agent Checklist

**Gate:** No agent deployed without passing this checklist.

### Definition
- [ ] Role is specific with explicit exclusions
- [ ] Tools list matches minimum needed (no over-permissioning)
- [ ] Memory requirements documented
- [ ] Communication protocol defined (who it receives from, who it sends to)

### Reliability
- [ ] Success termination criteria defined
- [ ] Failure termination criteria defined (including max iterations)
- [ ] Retry strategy specified
- [ ] Recovery strategy for each major failure mode

### Safety
- [ ] Tool execution requires harness validation
- [ ] High-impact operations require human approval
- [ ] Agent cannot exceed user's permissions
- [ ] All agent actions are audited

### Testing
- [ ] Tested with 10+ end-to-end scenarios
- [ ] Adversarial inputs tested (prompt injection, unusual edge cases)
- [ ] Failure recovery tested (what happens when a tool fails?)
- [ ] Loop detection verified (agent cannot run infinitely)

---

## Deployment Checklist

**Gate:** No deployment to production without passing this checklist.

### Pre-Deployment
- [ ] All automated tests passing (unit, integration, evaluation)
- [ ] Security review completed and signed off
- [ ] Performance review completed (no regression)
- [ ] Documentation updated
- [ ] CHANGELOG updated with this release
- [ ] Rollback plan documented and tested

### Deployment Execution
- [ ] Deploy to staging first
- [ ] Smoke tests passing in staging
- [ ] Monitoring dashboards ready
- [ ] On-call engineer notified/available

### Post-Deployment
- [ ] Smoke tests passing in production
- [ ] Error rate baseline confirmed (no unexpected increase)
- [ ] Latency baseline confirmed
- [ ] Cost metrics confirmed (no unexpected spike)
- [ ] Deployment marked stable (or rollback initiated within 15 minutes)

---

## Architecture Checklist

**Gate:** No architectural change without passing this checklist.

- [ ] ADR created for this decision
- [ ] At least 3 options considered (documented in ADR)
- [ ] Decision drivers explicitly listed and ranked
- [ ] Tradeoffs documented for chosen option
- [ ] Consequences (positive and negative) documented
- [ ] Security implications reviewed
- [ ] Performance implications estimated
- [ ] Compliance implications reviewed (if enterprise)
- [ ] Reversibility assessed (can this be undone if wrong?)
- [ ] ADR reviewed by at least one peer
- [ ] ADR status set to ACCEPTED by named approver
