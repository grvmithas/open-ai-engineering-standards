# Accessibility Skill

> **Skill ID:** `accessibility`  
> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
Activate this skill when A web or native user interface is created, changed, or assessed for accessibility.

## Why
An accessibility acceptance matrix, semantic implementation, automated results, keyboard and screen-reader evidence, and documented exceptions is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- A web or native user interface is created, changed, or assessed for accessibility.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- An accessibility acceptance matrix
- semantic implementation
- automated results
- keyboard and screen-reader evidence
- documented exceptions.

## Procedure
1. Identify user flows and apply WCAG 2.2 AA success criteria, platform semantics, and target assistive technologies.
2. Implement native elements first; define names, roles, values, landmarks, headings, labels, errors, and live announcements.
3. Design keyboard order, visible focus, focus restoration, pointer alternatives, zoom/reflow, contrast, motion, and timeout behavior.
4. Run automated checks, keyboard-only walkthroughs, zoom/reflow, forced-colors, and screen-reader tests on critical flows.
5. Record criterion-level evidence, defects, severity, owner, remediation, and any formally approved exception.

## Verification
Verify no keyboard trap, logical focus order, programmatic labels/errors, 200% zoom and reflow, contrast, reduced motion, and critical-flow screen-reader completion.

## Unhappy Paths and Recovery
Automated tools cannot prove conformance. If custom widgets fail expected interaction, replace with native controls or implement the relevant APG pattern fully.

## Concrete Example
Validate a modal: dialog semantics, labelled title, initial focus, tab containment, Escape behavior, focus return, background inertness, and screen-reader announcement.

## Do Not Use This Skill When
Do not claim WCAG conformance from an automated scanner alone.

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
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Changelog
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
