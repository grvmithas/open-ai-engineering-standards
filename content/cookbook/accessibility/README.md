# Accessibility Engineering Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release using Accessibility Engineering's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks. Generic software advice cannot verify that invariant because the decisive evidence lives in semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks; keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior; screen-reader transcript across the supported browser/AT matrix.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks
- keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior
- screen-reader transcript across the supported browser/AT matrix
- automated scan results plus manual WCAG mapping, zoom/reflow, contrast, reduced-motion, and forced-colors evidence
- Accessibility Conformance Report/VPAT claims, defects, exceptions, owner, and retest date

## Native verification

- run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions
- run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives
- use browser accessibility-tree inspection for name/role/state evidence
- test at 200% text resize and 400% browser zoom/reflow at the target viewport
- execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence

## Version-aware caution

Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.

## Tradeoffs

This cookbook requires deeper Accessibility Engineering evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
