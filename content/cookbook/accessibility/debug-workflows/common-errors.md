# Accessibility Engineering Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Accessibility Engineering failure classes without erasing the platform state needed to prove root cause.

## Why

Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `Interactive control has no accessible name` | Visible styling is not programmatically associated with the control. | missing or incorrect accessible name/description |
| 2 | `Keyboard focus is trapped or lost` | Focus management ignores open/close, route, or disabled-state transitions. | focus lost, trapped, obscured, or returned incorrectly |
| 3 | `ARIA state differs from visual state` | Custom widget does not update its semantic state. | ARIA role/state/value diverges from interaction |
| 4 | `Insufficient color contrast` | Foreground/background combination fails the required contrast criterion. | contrast, non-text contrast, reflow, text spacing, or target-size failure |
| 5 | `Dynamic update is not announced` | Important asynchronous content lacks suitable status semantics or focus strategy. | dynamic status/error not announced or announced excessively |

### 1. `Interactive control has no accessible name`

**Failure class:** missing or incorrect accessible name/description.

**Preserve first:** semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks.

**Discriminate:** accessibility tree. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Visible styling is not programmatically associated with the control.

**Correction:** Use native label association or an accurate aria-labelledby relationship.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.

### 2. `Keyboard focus is trapped or lost`

**Failure class:** focus lost, trapped, obscured, or returned incorrectly.

**Preserve first:** keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior.

**Discriminate:** keyboard-only test. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Focus management ignores open/close, route, or disabled-state transitions.

**Correction:** Define entry, cycle, escape, and return-focus behavior.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.

### 3. `ARIA state differs from visual state`

**Failure class:** ARIA role/state/value diverges from interaction.

**Preserve first:** screen-reader transcript across the supported browser/AT matrix.

**Discriminate:** screen reader and accessibility tree. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** use browser accessibility-tree inspection for name/role/state evidence. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Custom widget does not update its semantic state.

**Correction:** Prefer native control or update state atomically with UI behavior.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.

### 4. `Insufficient color contrast`

**Failure class:** contrast, non-text contrast, reflow, text spacing, or target-size failure.

**Preserve first:** automated scan results plus manual WCAG mapping, zoom/reflow, contrast, reduced-motion, and forced-colors evidence.

**Discriminate:** contrast analyzer. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** test at 200% text resize and 400% browser zoom/reflow at the target viewport. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Foreground/background combination fails the required contrast criterion.

**Correction:** Change design tokens and test all states, including focus and disabled.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.

### 5. `Dynamic update is not announced`

**Failure class:** dynamic status/error not announced or announced excessively.

**Preserve first:** Accessibility Conformance Report/VPAT claims, defects, exceptions, owner, and retest date.

**Discriminate:** screen-reader test. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Important asynchronous content lacks suitable status semantics or focus strategy.

**Correction:** Use restrained live regions or move focus when context truly changes.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.

## Version-aware caution

Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes missing or incorrect accessible name/description, focus lost, trapped, obscured, or returned incorrectly, ARIA role/state/value diverges from interaction, contrast, non-text contrast, reflow, text spacing, or target-size failure, dynamic status/error not announced or announced excessively and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
