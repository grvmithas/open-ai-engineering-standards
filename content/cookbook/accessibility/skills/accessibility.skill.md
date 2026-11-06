---
name: accessibility
description: "Execute a repeatable Accessibility Engineering change or diagnosis for a semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Accessibility Engineering can change."
---

# Accessibility Engineering Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable Accessibility Engineering change or diagnosis for a semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Accessibility Engineering can change. Do not activate for a name-only documentation edit.

## Why

Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks. The skill terminates only on Accessibility Engineering evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks and keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior.
2. **Select the boundary.** Name the changed semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover missing or incorrect accessible name/description; focus lost, trapped, obscured, or returned incorrectly; ARIA role/state/value diverges from interaction; contrast, non-text contrast, reflow, text spacing, or target-size failure; dynamic status/error not announced or announced excessively.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: screen-reader transcript across the supported browser/AT matrix; automated scan results plus manual WCAG mapping, zoom/reflow, contrast, reduced-motion, and forced-colors evidence; Accessibility Conformance Report/VPAT claims, defects, exceptions, owner, and retest date.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions
2. run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives
3. use browser accessibility-tree inspection for name/role/state evidence
4. test at 200% text resize and 400% browser zoom/reflow at the target viewport
5. execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence

7. **Apply review gates.**

- [ ] native element is used unless a custom interaction has a documented semantic need.
- [ ] computed name, role, state, value, description, and relationships match visible behavior.
- [ ] all operations work by keyboard with logical order and visible unobscured focus.
- [ ] dialogs, menus, routes, validation, deletion, and async updates define focus movement/return.
- [ ] headings, landmarks, lists, tables, labels, instructions, and errors preserve structure.
- [ ] text/non-text contrast, color independence, target size, text spacing, zoom/reflow, forced colors, and reduced motion are verified.
- [ ] media has captions/transcript/audio-description policy and controls are operable.
- [ ] automated findings are triaged and manual screen-reader results cover the critical path.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.

## Verification

The Accessibility Engineering evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks. For manual semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Accessibility Engineering telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Accessibility Engineering boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the Accessibility Engineering workflow only when native validation, applicable review/deployment gates, and recovery signals for missing or incorrect accessible name/description and focus lost, trapped, obscured, or returned incorrectly pass. Otherwise record a named owner and the exact missing Accessibility Engineering evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.

## Tradeoffs

This skill fingerprints Accessibility Engineering through semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks before editing and retains screen-reader transcript across the supported browser/AT matrix before recovery. The added work is warranted when missing or incorrect accessible name/description could make Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.

## Anti-patterns

- Adding arbitrary ARIA to a non-semantic clickable element creates a role without the keyboard, focus, state, and platform behavior users require.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Accessibility governance owns the WCAG target, supported AT matrix, design-system primitives, exception expiry, user-testing participation, procurement requirements, and ACR/VPAT evidence.

## Official sources

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [WCAG evaluation methodology](https://www.w3.org/TR/WCAG-EM/)

## Checklist

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
