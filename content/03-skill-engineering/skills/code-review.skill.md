# Code Review Skill

> **Skill ID:** `code-review`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A diff, pull request, patch, or release candidate requires an independent engineering review.

## Why
A prioritized review report with file/line evidence, impact, reproduction or reasoning, remediation, and a merge verdict is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A diff, pull request, patch, or release candidate requires an independent engineering review.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A prioritized review report with file/line evidence
- impact
- reproduction or reasoning
- remediation
- a merge verdict.

## Procedure
1. Read the change intent, acceptance criteria, risk classification, and test evidence before the diff.
2. Trace changed data and control flow through callers, persistence, concurrency, and failure paths.
3. Inspect authorization, validation, secrets, dependencies, performance, compatibility, and operability where touched.
4. Run or reason through focused tests and construct counterexamples for risky branches.
5. Report only actionable findings with severity, evidence, fix direction, and missing-review scope.

## Verification
Every blocking finding must be reproducible or supported by a concrete execution path; verify the proposed fix would close that path.

## Unhappy Paths and Recovery
If intent is missing, withhold verdict. If generated files dominate, review the generator and reproducibility. If tests cannot run, state the exact unverified risk rather than approving.

## Concrete Example
Review a pagination change by proving an unstable sort can duplicate rows, citing the query line, and prescribing a deterministic tie-breaker test.

## Do Not Use This Skill When
Do not use as a penetration test, architecture approval, or style-only formatting pass.

## Tradeoffs
The required domain artifacts and verification cost more than a generic implementation pass, but they expose assumptions, safety gates, and operational limits before release.

## Anti-Patterns
- Substituting a generic checklist for the domain procedure above.
- Claiming a gate passed without retaining the exact command, inspected artifact, or observed signal.
- Expanding scope or executing an external effect without target-specific approval.

## Enterprise Considerations
Apply repository ownership, separation of duties, data residency and retention, audit evidence, and approved-tool policies to every produced artifact. Redact secrets and regulated data from examples and logs.

## Checklist
- [ ] Trigger and anti-trigger evaluated
- [ ] Required inputs and domain artifacts complete
- [ ] Procedure followed in order
- [ ] Verification evidence retained
- [ ] Recovery, rollback, owner, and residual risk recorded

## Authoritative Sources
- [Google Code Review Standard](https://google.github.io/eng-practices/review/reviewer/standard.html)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
