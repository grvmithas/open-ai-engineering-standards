# Agent Tool Sandboxing

> **Version:** 1.1.0
> **Last updated:** 2026-07-16
> **Status:** Informative AIES implementation profile

## Purpose
Isolate code and tool execution from hosts, networks, credentials, and tenants.

## Why
Generated commands and dependencies are untrusted workloads.

## When
Use for code execution, browsing, file processing, and extensible tools.

## How
1. Use ephemeral non-root workloads with read-only base images.
2. Deny network by default and allowlist destinations.
3. Mount only required files and inject short-lived scoped credentials.
4. Enforce CPU, memory, time, process, and output limits.
5. Destroy environment and preserve security telemetry.

## Evidence contract
The decision record is the **sandbox policy and escape-test report**. It records image digest; runtime; UID; mounts; seccomp; capabilities; egress; resources; credentials; destruction evidence. The compute isolation owner owns completeness; the evidence is invalid when runtime, base image, kernel, or isolation policy changes. Security evidence contains target digest, threat assumptions, exact test steps, exploit preconditions, observed result, remediation, and independent retest.

## Failure response and recovery
**Trigger:** escape, cross-tenant read, or unauthorized egress is observed.

**Immediate response:** terminate the pool, revoke credentials, quarantine artifacts, and rotate clean workers. Preserve the sandbox policy and escape-test report, affected trace IDs, timestamps, and decision logs before mutation. Open an incident when users, data, money, authorization, or a release decision may have been affected; closure requires a regression case and verified control change specific to agent tool sandboxing.

## Decision authority
The **compute isolation owner** accepts the operational decision. The **offensive security reviewer** provides independent challenge for high-risk scope, failed gates, or exceptions. Preventive controls may block requests and revoke capability; security and service owners command containment, disclosure, and restoration.

## Tradeoffs
| Choice | Benefit | Cost |
|---|---|---|
| Strong isolation | Reduced blast radius | Operational overhead |

## Anti-patterns
- Running generated code on the application host.
- Sharing writable volumes across tenants.

## Enterprise considerations
- Use hardened runtime for hostile code.
- Patch base images and scan dependencies.

## Framework relationship
The **Agent Tool Sandboxing** guidance is bounded by its threat model and target release. Successful verification demonstrates tested controls, not the absence of undiscovered attack paths.

| Source | Relationship for Agent Tool Sandboxing | Boundary |
|---|---|---|
| NIST AI RMF | MANAGE 2.2 | Map only applicable NIST outcomes to the tested architecture and threat scenario. |
| ISO/IEC 42001 | 42001 clause 8.1 | Management-system evidence cannot substitute for technical verification of this control. |
| Domain threat/control source | LLM05 Improper Output Handling and LLM06 | Test only the threats applicable to the documented system and release |

## Checklist
- [ ] Default-deny egress.
- [ ] No long-lived secrets.
- [ ] Escape tests scheduled.

## References
- OWASP, [Top 10 for LLM Applications 2025](https://genai.owasp.org/llm-top-10/) (accessed 2026-07-16).
- NIST, [Cybersecurity Framework 2.0](https://doi.org/10.6028/NIST.CSWP.29) (accessed 2026-07-16).

## Changelog
| Version | Date | Change |
|---|---|---|
| 1.1.0 | 2026-07-16 | Replaced generic assurance text with the sandbox policy and escape-test report, failure trigger, accountable decision, and scoped framework relationships for agent tool sandboxing. |
| 1.0.0 | 2026-07-16 | Initial complete profile. |
