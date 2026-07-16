# React Native Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent React Native failure classes without erasing the platform state needed to prove root cause.

## Why

Domain logic is shared; platform behavior is explicit; native boundaries are typed; JS/UI threads and lists are measured on representative devices. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `Invariant Violation: native module cannot be null` | Native dependency is absent, unlinked, or unavailable in the current runtime. | native module missing/unlinked or architecture incompatible |
| 2 | `Application has not been registered` | Entry registration failed or an earlier module exception aborted startup. | app registration/startup exception |
| 3 | `VirtualizedLists should never be nested` | A virtualized list is inside a same-axis ScrollView. | nested/unbounded VirtualizedList |
| 4 | `Unable to resolve module` | Metro resolution, alias, case, or dependency graph is inconsistent. | Metro module resolution or cache/config mismatch |
| 5 | `UI freezes during interaction` | JavaScript or native main thread performs excessive synchronous work. | JS thread, UI thread, bridge/native boundary, or memory stall |

### 1. `Invariant Violation: native module cannot be null`

**Failure class:** native module missing/unlinked or architecture incompatible.

**Preserve first:** `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets.

**Discriminate:** native build and module registry. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For native module missing/unlinked or architecture incompatible, correlate that observation to the exact React Native target, revision, request/job, and UTC interval; compare `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets with one healthy peer or baseline.

**Native action:** `npx react-native info` and `npx react-native doctor`. Start in the safest React Native read-only or dry-run mode available. Before changing the screen, navigation flow, FlatList, native module, platform adapter, or mobile release, name which of native module missing/unlinked or architecture incompatible and app registration/startup exception the action distinguishes.

**Root-cause direction:** Native dependency is absent, unlinked, or unavailable in the current runtime.

**Correction:** Verify platform installation and rebuild the native application.

**Recovery proof:** Re-run `Invariant Violation: native module cannot be null` reproduction, verify the native module missing/unlinked or architecture incompatible signal cleared in native build and module registry. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Verify platform installation and rebuild the native application. restored the intended React Native behavior through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 2. `Application has not been registered`

**Failure class:** app registration/startup exception.

**Preserve first:** Metro config/resolution, generated native code/autolinking state, and debug/release build settings.

**Discriminate:** Metro logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For app registration/startup exception, correlate that observation to the exact React Native target, revision, request/job, and UTC interval; compare Metro config/resolution, generated native code/autolinking state, and debug/release build settings with one healthy peer or baseline.

**Native action:** `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output <path>` for bundle verification. Start in the safest React Native read-only or dry-run mode available. Before changing the screen, navigation flow, FlatList, native module, platform adapter, or mobile release, name which of app registration/startup exception and nested/unbounded VirtualizedList the action distinguishes.

**Root-cause direction:** Entry registration failed or an earlier module exception aborted startup.

**Correction:** Find the first bundler/runtime error and verify the registered app key.

**Recovery proof:** Re-run `Application has not been registered` reproduction, verify the app registration/startup exception signal cleared in Metro logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Find the first bundler/runtime error and verify the registered app key. restored the intended React Native behavior through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 3. `VirtualizedLists should never be nested`

**Failure class:** nested/unbounded VirtualizedList.

**Preserve first:** JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics.

**Discriminate:** React Native warning. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For nested/unbounded VirtualizedList, correlate that observation to the exact React Native target, revision, request/job, and UTC interval; compare JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics with one healthy peer or baseline.

**Native action:** `cd android && ./gradlew lint test assembleRelease`. Start in the safest React Native read-only or dry-run mode available. Before changing the screen, navigation flow, FlatList, native module, platform adapter, or mobile release, name which of nested/unbounded VirtualizedList and Metro module resolution or cache/config mismatch the action distinguishes.

**Root-cause direction:** A virtualized list is inside a same-axis ScrollView.

**Correction:** Use one virtualized parent and model surrounding content as header/footer.

**Recovery proof:** Re-run `VirtualizedLists should never be nested` reproduction, verify the nested/unbounded VirtualizedList signal cleared in React Native warning. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Use one virtualized parent and model surrounding content as header/footer. restored the intended React Native behavior through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 4. `Unable to resolve module`

**Failure class:** Metro module resolution or cache/config mismatch.

**Preserve first:** screen-reader tree, focus order, dynamic text, touch target, keyboard, and platform permission behavior.

**Discriminate:** Metro resolver output. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For Metro module resolution or cache/config mismatch, correlate that observation to the exact React Native target, revision, request/job, and UTC interval; compare screen-reader tree, focus order, dynamic text, touch target, keyboard, and platform permission behavior with one healthy peer or baseline.

**Native action:** `cd ios && xcodebuild -workspace <app>.xcworkspace -scheme <scheme> -configuration Release test` on approved macOS CI. Start in the safest React Native read-only or dry-run mode available. Before changing the screen, navigation flow, FlatList, native module, platform adapter, or mobile release, name which of Metro module resolution or cache/config mismatch and JS thread, UI thread, bridge/native boundary, or memory stall the action distinguishes.

**Root-cause direction:** Metro resolution, alias, case, or dependency graph is inconsistent.

**Correction:** Correct the canonical import and reset cache only after fixing configuration.

**Recovery proof:** Re-run `Unable to resolve module` reproduction, verify the Metro module resolution or cache/config mismatch signal cleared in Metro resolver output. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Correct the canonical import and reset cache only after fixing configuration. restored the intended React Native behavior through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 5. `UI freezes during interaction`

**Failure class:** JS thread, UI thread, bridge/native boundary, or memory stall.

**Preserve first:** `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets.

**Discriminate:** React Native performance monitor. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For JS thread, UI thread, bridge/native boundary, or memory stall, correlate that observation to the exact React Native target, revision, request/job, and UTC interval; compare `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets with one healthy peer or baseline.

**Native action:** `npx react-native log-android` or platform-native logs for the reproduced build. Start in the safest React Native read-only or dry-run mode available. Before changing the screen, navigation flow, FlatList, native module, platform adapter, or mobile release, name which of JS thread, UI thread, bridge/native boundary, or memory stall and native module missing/unlinked or architecture incompatible the action distinguishes.

**Root-cause direction:** JavaScript or native main thread performs excessive synchronous work.

**Correction:** Profile both threads and defer, batch, or move the measured bottleneck.

**Recovery proof:** Re-run `UI freezes during interaction` reproduction, verify the JS thread, UI thread, bridge/native boundary, or memory stall signal cleared in React Native performance monitor. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Profile both threads and defer, batch, or move the measured bottleneck. restored the intended React Native behavior through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

## Version-aware caution

Read React Native, React, navigation, native dependency, Gradle/AGP/Kotlin, Xcode/Swift, deployment-target, and architecture settings. Native APIs, autolinking, Metro, Hermes, and New Architecture compatibility are release-specific.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes native module missing/unlinked or architecture incompatible, app registration/startup exception, nested/unbounded VirtualizedList, Metro module resolution or cache/config mismatch, JS thread, UI thread, bridge/native boundary, or memory stall and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
