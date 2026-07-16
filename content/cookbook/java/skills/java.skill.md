# Java Production Skill

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Execute a repeatable Java change or diagnosis for a Spring controller, application service, JPA aggregate, message consumer, or JVM process, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for Java can change. Do not activate for a name-only documentation edit.

## Why

Transactions wrap use cases; transport DTOs do not leak persistence entities; pools are bounded and JVM evidence drives tuning. The skill terminates only on Java evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree and Spring condition report, bean graph, active profiles, and validated configuration properties.
2. **Select the boundary.** Name the changed Spring controller, application service, JPA aggregate, message consumer, or JVM process, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover bean graph or configuration binding failure; transaction/lazy-loading boundary failure; thread or connection pool starvation; deadlock or blocked monitor; heap, metaspace, direct-memory, or GC pressure.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: JFR recording, GC logs, thread dump, heap dump, and connection-pool metrics; DDL/migration scripts plus generated SQL and transaction traces.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

1. `./mvnw verify` or `./gradlew check` selected from the checked-in wrapper
2. `./mvnw dependency:tree` or `./gradlew dependencies`
3. `jcmd <pid> Thread.print` and `jcmd <pid> VM.flags`
4. `jcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr`
5. `jcmd <pid> GC.heap_dump /approved/path/heap.hprof` only under incident policy

7. **Apply review gates.**

- [ ] controllers map validated DTOs and do not expose JPA entities.
- [ ] public application-service methods own transaction and authorization boundaries.
- [ ] aggregate invariants are enforced before repository writes.
- [ ] fetch plans are use-case-specific and avoid open-session-in-view dependence.
- [ ] executor, HTTP, database, and messaging pools are explicitly bounded.
- [ ] interrupts and cancellation are not swallowed.
- [ ] configuration properties are typed and validated at startup.
- [ ] tests cover transaction rollback, optimistic conflict, serialization, and context wiring.

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.

## Verification

The evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. For manual checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better Java telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the Java boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish when native validation, all applicable review/deployment gates, and recovery signals pass, or when a named owner accepts a documented blocker through the repository's risk process.

## Version-aware caution

Read the Maven/Gradle toolchain, wrapper, Spring dependency management, and runtime image. Java language, virtual-thread, Spring Boot, Jakarta namespace, and Hibernate behavior vary by aligned release set; never mix guidance from another baseline.

## Tradeoffs

This skill spends time fingerprinting Java and collecting native evidence before editing. It reduces throughput for trivial changes but prevents incorrect commands, unsupported APIs, and state-destructive rollback.

## Anti-patterns

- Returning managed JPA entities from controllers makes serialization trigger queries outside the intended transaction.
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

Java governance aligns JDK, Spring, Jakarta, Hibernate, and build-plugin baselines; it also controls JFR/heap-dump access because diagnostics may contain regulated data.

## Official sources

- [Java documentation](https://docs.oracle.com/en/java/)
- [Spring Boot reference](https://docs.spring.io/spring-boot/reference/)
- [Spring transactions](https://docs.spring.io/spring-framework/reference/data-access/transaction.html)
- [JDK Flight Recorder](https://docs.oracle.com/javacomponents/jmc-5-5/jfr-runtime-guide/about.htm)

## Checklist

- [ ] Trigger and owned boundary are identified.
- [ ] Version, topology, and native configuration are captured.
- [ ] Commands and manual checks retain evidence.
- [ ] Rollout health and rollback threshold are explicit.
- [ ] No validator or policy was bypassed.

## Changelog

- 1.1.0 (2026-07-16): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (2026-07-16): Added initial skill.
