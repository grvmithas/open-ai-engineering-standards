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

**Discriminate:** native build and module registry. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `npx react-native info` and `npx react-native doctor`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Native dependency is absent, unlinked, or unavailable in the current runtime.

**Correction:** Verify platform installation and rebuild the native application.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 2. `Application has not been registered`

**Failure class:** app registration/startup exception.

**Preserve first:** Metro config/resolution, generated native code/autolinking state, and debug/release build settings.

**Discriminate:** Metro logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output <path>` for bundle verification. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Entry registration failed or an earlier module exception aborted startup.

**Correction:** Find the first bundler/runtime error and verify the registered app key.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 3. `VirtualizedLists should never be nested`

**Failure class:** nested/unbounded VirtualizedList.

**Preserve first:** JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics.

**Discriminate:** React Native warning. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `cd android && ./gradlew lint test assembleRelease`. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** A virtualized list is inside a same-axis ScrollView.

**Correction:** Use one virtualized parent and model surrounding content as header/footer.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 4. `Unable to resolve module`

**Failure class:** Metro module resolution or cache/config mismatch.

**Preserve first:** screen-reader tree, focus order, dynamic text, touch target, keyboard, and platform permission behavior.

**Discriminate:** Metro resolver output. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `cd ios && xcodebuild -workspace <app>.xcworkspace -scheme <scheme> -configuration Release test` on approved macOS CI. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** Metro resolution, alias, case, or dependency graph is inconsistent.

**Correction:** Correct the canonical import and reset cache only after fixing configuration.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.

### 5. `UI freezes during interaction`

**Failure class:** JS thread, UI thread, bridge/native boundary, or memory stall.

**Preserve first:** `package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets.

**Discriminate:** React Native performance monitor. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** `npx react-native log-android` or platform-native logs for the reproduced build. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** JavaScript or native main thread performs excessive synchronous work.

**Correction:** Profile both threads and defer, batch, or move the measured bottleneck.

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

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
