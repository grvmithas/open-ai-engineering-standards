# Accessibility Engineering Generate Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Generate a production-ready semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release from repository and runtime evidence.

## Why

Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks. This prompt requires native Accessibility Engineering artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use `{{NOT_AVAILABLE: reason}}` only when the missing artifact is explicitly returned as a blocker.

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
  <step index="1">Extract the installed/deployed version and state how it constrains the design: Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.</step>
  <step index="2">Preserve this Accessibility Engineering invariant: Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks.</step>
  <step index="3">Design against these failure classes: missing or incorrect accessible name/description; focus lost, trapped, obscured, or returned incorrectly; ARIA role/state/value diverges from interaction; contrast, non-text contrast, reflow, text spacing, or target-size failure; dynamic status/error not announced or announced excessively.</step>
  <step index="4">Produce configuration and tests that satisfy these review gates: native element is used unless a custom interaction has a documented semantic need; computed name, role, state, value, description, and relationships match visible behavior; all operations work by keyboard with logical order and visible unobscured focus; dialogs, menus, routes, validation, deletion, and async updates define focus movement/return; headings, landmarks, lists, tables, labels, instructions, and errors preserve structure; text/non-text contrast, color independence, target size, text spacing, zoom/reflow, forced colors, and reduced motion are verified; media has captions/transcript/audio-description policy and controls are operable; automated findings are triaged and manual screen-reader results cover the critical path.</step>
  <step index="5">Use only commands proven available by repository/platform evidence; propose this native sequence: run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions; run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives; use browser accessibility-tree inspection for name/role/state evidence; test at 200% text resize and 400% browser zoom/reflow at the target viewport; execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence.</step>
  <step index="6">Define rollout and rollback exactly: Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.</step>
</instructions>
<output_format>
Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.
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

The prompt rejects fast code generation when Accessibility Engineering version, configuration, or target evidence is absent. That delay prevents plausible output from crossing an unsupported semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release boundary.

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

- 1.1.0 (2026-07-16): Rebuilt as a Accessibility Engineering-specific generate prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
