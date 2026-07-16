# Accessibility Engineering Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Accessibility Engineering semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release.

## Why

Accessibility Engineering correctness depends on source plus semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks; keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior; screen-reader transcript across the supported browser/AT matrix. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions; run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives; use browser accessibility-tree inspection for name/role/state evidence; test at 200% text resize and 400% browser zoom/reflow at the target viewport; execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence. Findings must identify the violated Accessibility Engineering invariant.

## Version-aware caution

Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.

## Tradeoffs

Review must prove "native element is used unless a custom interaction has a documented semantic need" using semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks. That Accessibility Engineering evidence costs more than diff inspection but exposes missing or incorrect accessible name/description before merge.

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

- [ ] native element is used unless a custom interaction has a documented semantic need.
- [ ] computed name, role, state, value, description, and relationships match visible behavior.
- [ ] all operations work by keyboard with logical order and visible unobscured focus.
- [ ] dialogs, menus, routes, validation, deletion, and async updates define focus movement/return.
- [ ] headings, landmarks, lists, tables, labels, instructions, and errors preserve structure.
- [ ] text/non-text contrast, color independence, target size, text spacing, zoom/reflow, forced colors, and reduced motion are verified.
- [ ] media has captions/transcript/audio-description policy and controls are operable.
- [ ] automated findings are triaged and manual screen-reader results cover the critical path.
- [ ] Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Accessibility Engineering evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
