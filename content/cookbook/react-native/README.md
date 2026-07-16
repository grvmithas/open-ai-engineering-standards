# React Native Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a screen, navigation flow, FlatList, native module, platform adapter, or mobile release using React Native's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Domain logic is shared; platform behavior is explicit; native boundaries are typed; JS/UI threads and lists are measured on representative devices. Generic software advice cannot verify that invariant because the decisive evidence lives in `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets; Metro config/resolution, generated native code/autolinking state, and debug/release build settings; JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets
- Metro config/resolution, generated native code/autolinking state, and debug/release build settings
- JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics
- screen-reader tree, focus order, dynamic text, touch target, keyboard, and platform permission behavior

## Native verification

- `npx react-native info` and `npx react-native doctor`
- `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output <path>` for bundle verification
- `cd android && ./gradlew lint test assembleRelease`
- `cd ios && xcodebuild -workspace <app>.xcworkspace -scheme <scheme> -configuration Release test` on approved macOS CI
- `npx react-native log-android` or platform-native logs for the reproduced build

## Version-aware caution

Read React Native, React, navigation, native dependency, Gradle/AGP/Kotlin, Xcode/Swift, deployment-target, and architecture settings. Native APIs, autolinking, Metro, Hermes, and New Architecture compatibility are release-specific.

## Tradeoffs

This cookbook requires deeper React Native evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects screen, navigation flow, FlatList, native module, platform adapter, or mobile release state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
