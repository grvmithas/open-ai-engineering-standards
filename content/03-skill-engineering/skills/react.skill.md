---
name: react
description: "React procedure with verification and rollback evidence. Use when React component behavior, state ownership, rendering, hydration, or client accessibility is being changed."
---

# React Skill

> **Skill ID:** `react`  
> **Version:** 2.0  
> **Updated:** 2026-11-06

## Purpose
Activate this skill when React component behavior, state ownership, rendering, hydration, or client accessibility is being changed.

## Why
A component contract, state model, accessible implementation, focused tests, and render/performance evidence is the minimum reviewable deliverable for this domain. A generic "inspect, change, test" loop omits the domain decisions and failure evidence needed for production use.

## Trigger Conditions
- React component behavior, state ownership, rendering, hydration, or client accessibility is being changed.
- The requester expects an implementation, design, audit, or release decision in this domain.

## Required Inputs
- The exact target and acceptance criteria.
- Repository-pinned versions, environment constraints, and available evidence.
- Data classification, effect permissions, and owner where the procedure can affect external systems.

## Produced Artifacts
- A component contract
- state model
- accessible implementation
- focused tests
- render/performance evidence.

## Procedure
1. Separate server data, URL state, form state, and ephemeral UI state; assign one owner to each.
2. Design semantic markup, keyboard flow, focus behavior, loading, empty, error, and reduced-motion states.
3. Implement pure rendering and effects only for external synchronization; avoid derived-state effects.
4. Test user-observable behavior with accessible queries and simulate async cancellation and rerenders.
5. Inspect hydration warnings, render frequency, bundle impact, and React Profiler evidence for hot paths.

## Verification
Run component tests, accessibility checks, type checks, and a production build; verify no hydration mismatch and stable focus after updates.

## Unhappy Paths and Recovery
If an effect loops, remove redundant state or stabilize dependencies based on data ownership. If hydration differs, isolate browser-only behavior after mount without hiding genuine markup divergence.

## Concrete Example
Build an async combobox with ARIA relationships, keyboard navigation, request cancellation, stale-response protection, and user-event tests.

## Do Not Use This Skill When
Do not use for framework routing, backend rendering policy, or non-React web components.

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
- [React Learn](https://react.dev/learn)
- [WAI-ARIA Authoring Practices Combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)

## Changelog
- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- **2.0 (2026-07-16):** Replaced the cloned generic procedure with domain-specific artifacts, workflow, recovery, examples, and sources.
- **1.1:** Initial standardized structure.
