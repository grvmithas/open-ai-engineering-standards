# React Native Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a React Native screen, navigation flow, FlatList, native module, platform adapter, or mobile release.

## Why

React Native correctness depends on source plus `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets; Metro config/resolution, generated native code/autolinking state, and debug/release build settings; JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `npx react-native info` and `npx react-native doctor`; `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output <path>` for bundle verification; `cd android && ./gradlew lint test assembleRelease`; `cd ios && xcodebuild -workspace <app>.xcworkspace -scheme <scheme> -configuration Release test` on approved macOS CI; `npx react-native log-android` or platform-native logs for the reproduced build. Findings must identify the violated React Native invariant.

## Version-aware caution

Read React Native, React, navigation, native dependency, Gradle/AGP/Kotlin, Xcode/Swift, deployment-target, and architecture settings. Native APIs, autolinking, Metro, Hermes, and New Architecture compatibility are release-specific.

## Tradeoffs

Review must prove "screen separates shared state from `.ios`/`.android` platform adapters" using `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets. That React Native evidence costs more than diff inspection but exposes native module missing/unlinked or architecture incompatible before merge.

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

- [ ] screen separates shared state from `.ios`/`.android` platform adapters.
- [ ] navigation params and deep links are typed, validated, and backward compatible.
- [ ] native module methods define thread, lifetime, error, and cancellation semantics.
- [ ] FlatList/SectionList uses stable keys, bounded render windows, and measured item layout.
- [ ] render path avoids synchronous storage, JSON, logging, or bridge-heavy loops.
- [ ] permissions are requested in context and denied/restricted states are handled.
- [ ] accessibility label/role/state, focus, dynamic type, touch targets, and reduced motion are tested.
- [ ] release-only behavior is covered on physical representative iOS and Android devices.
- [ ] Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native React Native evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
