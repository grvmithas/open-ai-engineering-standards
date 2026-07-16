# Accessibility Engineering Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Accessibility Engineering semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release.

## Why

A syntactically valid Accessibility Engineering artifact can still fail because of missing or incorrect accessible name/description, focus lost, trapped, obscured, or returned incorrectly, ARIA role/state/value diverges from interaction, contrast, non-text contrast, reflow, text spacing, or target-size failure, dynamic status/error not announced or announced excessively. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions; run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives; use browser accessibility-tree inspection for name/role/state evidence; test at 200% text resize and 400% browser zoom/reflow at the target viewport; execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence. Stop promotion on any failed item.

## Version-aware caution

Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.

## Tradeoffs

The Accessibility Engineering deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] automated accessibility regression passes with no unreviewed serious/critical rule failures.
- [ ] critical flows pass keyboard-only operation including focus visibility, traps, escape, and return.
- [ ] supported NVDA/JAWS/VoiceOver/TalkBack browser matrix completes the scripted smoke path.
- [ ] 200% text resize and 400% zoom/reflow preserve content and operation without two-dimensional scrolling except allowed content.
- [ ] text and non-text contrast, color independence, forced colors, and focus indicators match tokens.
- [ ] prefers-reduced-motion removes non-essential motion and does not remove information.
- [ ] new WCAG mappings, manual evidence, defects, and exceptions update the ACR/VPAT evidence set.
- [ ] production accessibility monitoring samples templates/components and rollback can disable the offending UI.
- [ ] Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Accessibility Engineering evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
