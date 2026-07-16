# React Native Review Prompt

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Review a React Native change using native configuration, failure, and operational evidence.

## Why

Domain logic is shared; platform behavior is explicit; native boundaries are typed; JS/UI threads and lists are measured on representative devices. The review decision is accepted only when Metro config/resolution, generated native code/autolinking state, and debug/release build settings supports it; generic review advice cannot establish that React Native state.

## How

Resolve every XML variable with sanitized React Native evidence for the screen, navigation flow, FlatList, native module, platform adapter, or mobile release. Apply the invariant "Domain logic is shared; platform behavior is explicit; native boundaries are typed; JS/UI threads and lists are measured on representative devices." before accepting output. Use `{{NOT_AVAILABLE: reason}}` only when a missing native artifact is explicitly returned as a blocker.

```xml
<role>
You are the accountable principal React Native engineer for a screen, navigation flow, FlatList, native module, platform adapter, or mobile release. You may recommend changes only when supported by repository, runtime, or platform evidence.
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
  Privately compare the evidence with React Native invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  <step index="1">Reconstruct the exact version, target, changed resources/contracts, and rollback boundary from evidence.</step>
  <step index="2">Check every technology gate: screen separates shared state from `.ios`/`.android` platform adapters; navigation params and deep links are typed, validated, and backward compatible; native module methods define thread, lifetime, error, and cancellation semantics; FlatList/SectionList uses stable keys, bounded render windows, and measured item layout; render path avoids synchronous storage, JSON, logging, or bridge-heavy loops; permissions are requested in context and denied/restricted states are handled; accessibility label/role/state, focus, dynamic type, touch targets, and reduced motion are tested; release-only behavior is covered on physical representative iOS and Android devices.</step>
  <step index="3">Inspect these failure classes explicitly: native module missing/unlinked or architecture incompatible; app registration/startup exception; nested/unbounded VirtualizedList; Metro module resolution or cache/config mismatch; JS thread, UI thread, bridge/native boundary, or memory stall.</step>
  <step index="4">Require relevant native outputs from: `npx react-native info` and `npx react-native doctor`; `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output &lt;path&gt;` for bundle verification; `cd android &amp;&amp; ./gradlew lint test assembleRelease`; `cd ios &amp;&amp; xcodebuild -workspace &lt;app&gt;.xcworkspace -scheme &lt;scheme&gt; -configuration Release test` on approved macOS CI; `npx react-native log-android` or platform-native logs for the reproduced build.</step>
  <step index="5">Report only findings with file/resource location, violated invariant, production impact, and a deterministic verification.</step>
  <step index="6">Block release when rollback is not credible: Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.</step>
</instructions>
<output_format>
Return severity-ordered findings with location, native evidence, impact, required correction, and verification command. Then return version cautions, missing evidence, rollback assessment, and SHIP/BLOCK.
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress React Native validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
```

## Version-aware caution

Read React Native, React, navigation, native dependency, Gradle/AGP/Kotlin, Xcode/Swift, deployment-target, and architecture settings. Native APIs, autolinking, Metro, Hermes, and New Architecture compatibility are release-specific.

## Tradeoffs

React Native review correlates source with Metro config/resolution, generated native code/autolinking state, and debug/release build settings and JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics. The cost is a deeper review; the benefit is direct evidence for "screen separates shared state from `.ios`/`.android` platform adapters" and "navigation params and deep links are typed, validated, and backward compatible" instead of generic style findings.

## Anti-patterns

- Scattering `Platform.OS` branches through domain logic creates two untestable applications hidden in one source tree.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

React Native governance aligns JS/native dependency matrices, signing, store roles, OTA policy, privacy declarations, device support, accessibility evidence, and crash-symbol retention.

## Official sources

- [React Native documentation](https://reactnative.dev/docs/getting-started)
- [Performance](https://reactnative.dev/docs/performance)
- [Native platform](https://reactnative.dev/docs/native-platform)
- [Accessibility](https://reactnative.dev/docs/accessibility)

## Checklist

- [ ] React Native version and topology are explicit.
- [ ] Native configuration and command output are attached.
- [ ] All 5 named failure classes were considered.
- [ ] Rollback preserves state and mixed-version compatibility.
- [ ] Output maps decisions to official sources.

## Changelog

- 1.1.0 (2026-07-16): Rebuilt as a React Native-specific review prompt.
- 1.0.0 (2026-07-16): Added initial prompt.
