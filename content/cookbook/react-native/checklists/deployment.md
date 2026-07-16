# React Native Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a React Native screen, navigation flow, FlatList, native module, platform adapter, or mobile release.

## Why

A syntactically valid React Native artifact can still fail because of native module missing/unlinked or architecture incompatible, app registration/startup exception, nested/unbounded VirtualizedList, Metro module resolution or cache/config mismatch, JS thread, UI thread, bridge/native boundary, or memory stall. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `npx react-native info` and `npx react-native doctor`; `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output <path>` for bundle verification; `cd android && ./gradlew lint test assembleRelease`; `cd ios && xcodebuild -workspace <app>.xcworkspace -scheme <scheme> -configuration Release test` on approved macOS CI; `npx react-native log-android` or platform-native logs for the reproduced build. Stop promotion on any failed item.

## Version-aware caution

Read React Native, React, navigation, native dependency, Gradle/AGP/Kotlin, Xcode/Swift, deployment-target, and architecture settings. Native APIs, autolinking, Metro, Hermes, and New Architecture compatibility are release-specific.

## Tradeoffs

The React Native deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.

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

- [ ] React Native/native dependency compatibility and platform toolchains match CI evidence.
- [ ] signed release builds, symbol/source-map artifacts, privacy manifests, permissions, and store metadata are complete.
- [ ] cold/warm startup, JS/UI frame rate, memory, crash-free sessions, and bundle size meet budgets.
- [ ] screen reader, keyboard/switch path, dynamic text, zoom, contrast, and reduced motion pass both platforms.
- [ ] deep links, push notifications, offline/reconnect, upgrade, and persisted-state migration pass.
- [ ] phased store rollout and OTA policy prevent incompatible JavaScript/native binary combinations.
- [ ] crash and performance telemetry map to app, JS bundle, native build, OS, and device.
- [ ] rollback distinguishes store binary rollback from OTA bundle rollback and persisted-data compatibility.
- [ ] Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native React Native evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
