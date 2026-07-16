# Accessibility Engineering Review Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Review a Accessibility Engineering change using native configuration, failure, and operational evidence.

## Why

Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks. The review decision is accepted only when keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior supports it; generic review advice cannot establish that Accessibility Engineering state.

## How

Resolve every XML variable with sanitized Accessibility Engineering evidence for the semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release. Apply the invariant "Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal Accessibility Engineering engineer for a semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with Accessibility Engineering invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Reconstruct the exact version, target, changed resources/contracts, and rollback boundary from evidence.</step>
  <step index="2">Check every technology gate: native element is used unless a custom interaction has a documented semantic need; computed name, role, state, value, description, and relationships match visible behavior; all operations work by keyboard with logical order and visible unobscured focus; dialogs, menus, routes, validation, deletion, and async updates define focus movement/return; headings, landmarks, lists, tables, labels, instructions, and errors preserve structure; text/non-text contrast, color independence, target size, text spacing, zoom/reflow, forced colors, and reduced motion are verified; media has captions/transcript/audio-description policy and controls are operable; automated findings are triaged and manual screen-reader results cover the critical path.</step>
  <step index="3">Inspect these failure classes explicitly: missing or incorrect accessible name/description; focus lost, trapped, obscured, or returned incorrectly; ARIA role/state/value diverges from interaction; contrast, non-text contrast, reflow, text spacing, or target-size failure; dynamic status/error not announced or announced excessively.</step>
  <step index="4">Require relevant native outputs from: run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions; run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives; use browser accessibility-tree inspection for name/role/state evidence; test at 200% text resize and 400% browser zoom/reflow at the target viewport; execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence.</step>
  <step index="5">Report only findings with file/resource location, violated invariant, production impact, and a deterministic verification.</step>
  <step index="6">Block release when rollback is not credible: Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.</step>
</instructions>
<output_format>
Return severity-ordered findings with location, native evidence, impact, required correction, and verification command. Then return version cautions, missing evidence, rollback assessment, and SHIP/BLOCK.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress Accessibility Engineering validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.

## Tradeoffs

Accessibility Engineering review correlates source with keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior and screen-reader transcript across the supported browser/AT matrix. The cost is a deeper review; the benefit is direct evidence for "native element is used unless a custom interaction has a documented semantic need" and "computed name, role, state, value, description, and relationships match visible behavior" instead of generic style findings.

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

- [ ] Accessibility Engineering version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a Accessibility Engineering-specific review prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
