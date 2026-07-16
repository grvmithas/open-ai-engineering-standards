# Security Skill

> **Skill ID:** `security`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when Code or design crosses a trust boundary, changes identity or authorization, processes untrusted input, or handles sensitive data.

## Why
A threat model, trust-boundary diagram, abuse cases, ASVS control mapping, evidence-backed findings, and remediation tests is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- Code or design crosses a trust boundary, changes identity or authorization, processes untrusted input, or handles sensitive data.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A threat model
- trust-boundary diagram
- abuse cases
- ASVS control mapping
- evidence-backed findings
- remediation tests.

## Procedure
1. Classify assets, actors, data, entry points, privileges, and trust boundaries.
2. Model spoofing, tampering, repudiation, disclosure, denial, elevation, and business-logic abuse.
3. Trace authentication, authorization, validation, cryptography, secret handling, logging, and dependency controls.
4. Prove findings with safe test cases or exact data/control paths; score likelihood and impact.
5. Specify least-privilege remediation, regression tests, residual risk, and required owner approval.

## Verification
Verify horizontal and vertical authorization tests, injection cases, secret scanning, dependency advisories, and security logging without sensitive data.

## Unhappy Paths and Recovery
Do not exploit production. If testing could affect data or availability, use a disposable environment or stop for authorization. Treat scanner output as leads, not confirmed findings.

## Concrete Example
Review an object endpoint by demonstrating cross-tenant ID access in a test fixture and requiring subject-resource authorization before merge.

## Do Not Use This Skill When
Do not use as a substitute for an authorized penetration test, incident response, or network assessment.

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
- [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/)
- [NIST SSDF](https://csrc.nist.gov/Projects/ssdf)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
