# Java Cookbook

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Operate AI-assisted changes to a Spring controller, application service, JPA aggregate, message consumer, or JVM process using Java's native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

Transactions wrap use cases; transport DTOs do not leak persistence entities; pools are bounded and JVM evidence drives tuning. Generic software advice cannot verify that invariant because the decisive evidence lives in `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree; Spring condition report, bean graph, active profiles, and validated configuration properties; JFR recording, GC logs, thread dump, heap dump, and connection-pool metrics.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in `architecture/patterns.md`.
5. Block review or release on any unchecked technology gate.

## Required evidence

- `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree
- Spring condition report, bean graph, active profiles, and validated configuration properties
- JFR recording, GC logs, thread dump, heap dump, and connection-pool metrics
- DDL/migration scripts plus generated SQL and transaction traces

## Native verification

- `./mvnw verify` or `./gradlew check` selected from the checked-in wrapper
- `./mvnw dependency:tree` or `./gradlew dependencies`
- `jcmd <pid> Thread.print` and `jcmd <pid> VM.flags`
- `jcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr`
- `jcmd <pid> GC.heap_dump /approved/path/heap.hprof` only under incident policy

## Version-aware caution

Read the Maven/Gradle toolchain, wrapper, Spring dependency management, and runtime image. Java language, virtual-thread, Spring Boot, Jakarta namespace, and Hibernate behavior vary by aligned release set; never mix guidance from another baseline.

## Tradeoffs

This cookbook requires deeper Java evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects Spring controller, application service, JPA aggregate, message consumer, or JVM process state.

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

- [ ] Installed/deployed version and target environment are recorded.
- [ ] Native commands are selected from repository and platform evidence.
- [ ] Failure classes and rollback boundary are explicit.
- [ ] Official sources are checked for the recorded version.
- [ ] No prompt variable remains unresolved.

## Changelog

- 1.1.0 (2026-07-16): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (2026-07-16): Added initial cookbook.
