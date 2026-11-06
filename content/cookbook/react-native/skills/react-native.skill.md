---
name: react-native
description: "Execute a repeatable React Native change or diagnosis for a screen, navigation flow, FlatList, native module, platform adapter, or mobile release, including native evidence, validation, rollout, and rollback. Use when source, manifests, runtime configuration, topology, data contracts, or operating behavior for React Native can change."
---

# React Native Production Skill

> Version: 1.1.0 | Updated: 2026-11-06

## Purpose

Execute a repeatable React Native change or diagnosis for a screen, navigation flow, FlatList, native module, platform adapter, or mobile release, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for React Native can change. Do not activate for a name-only documentation edit.

## Why

Domain logic is shared; platform behavior is explicit; native boundaries are typed; JS/UI threads and lists are measured on representative devices. The skill terminates only on React Native evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets and Metro config/resolution, generated native code/autolinking state, and debug/release build settings.
2. **Select the boundary.** Name the changed screen, navigation flow, FlatList, native module, platform adapter, or mobile release, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover native module missing/unlinked or architecture incompatible; app registration/startup exception; nested/unbounded VirtualizedList; Metro module resolution or cache/config mismatch; JS thread, UI thread, bridge/native boundary, or memory stall.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics; screen-reader tree, focus order, dynamic text, touch target, keyboard, and platform permission behavior.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `npx react-native info` and `npx react-native doctor`
2. `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output <path>` for bundle verification
3. `cd android && ./gradlew lint test assembleRelease`
4. `cd ios && xcodebuild -workspace <app>.xcworkspace -scheme <scheme> -configuration Release test` on approved macOS CI
5. `npx react-native log-android` or platform-native logs for the reproduced build

7. **Apply review gates.**

- [ ] screen separates shared state from `.ios`/`.android` platform adapters.
- [ ] navigation params and deep links are typed, validated, and backward compatible.
- [ ] native module methods define thread, lifetime, error, and cancellation semantics.
- [ ] FlatList/SectionList uses stable keys, bounded render windows, and measured item layout.
- [ ] render path avoids synchronous storage, JSON, logging, or bridge-heavy loops.
- [ ] permissions are requested in context and denied/restricted states are handled.
- [ ] accessibility label/role/state, focus, dynamic type, touch targets, and reduced motion are tested.
- [ ] release-only behavior is covered on physical representative iOS and Android devices.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

## Verification

The React Native evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. It must also retain `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets. For manual screen, navigation flow, FlatList, native module, platform adapter, or mobile release checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better React Native telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the React Native boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish the React Native workflow only when native validation, applicable review/deployment gates, and recovery signals for native module missing/unlinked or architecture incompatible and app registration/startup exception pass. Otherwise record a named owner and the exact missing React Native evidence; risk acceptance does not convert a failed native check into a pass.

## Version-aware caution

Read React Native, React, navigation, native dependency, Gradle/AGP/Kotlin, Xcode/Swift, deployment-target, and architecture settings. Native APIs, autolinking, Metro, Hermes, and New Architecture compatibility are release-specific.

## Tradeoffs

This skill fingerprints React Native through `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets before editing and retains JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics before recovery. The added work is warranted when native module missing/unlinked or architecture incompatible could make Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

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

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- **2026-11-06:** Added Agent Skills frontmatter (`name`, `description`) for `.agents/skills` discovery; normalized trigger casing.
- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
