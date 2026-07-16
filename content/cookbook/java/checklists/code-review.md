# Java Code Review Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate correctness, security, operability, and maintainability of a Java Spring controller, application service, JPA aggregate, message consumer, or JVM process.

## Why

Java correctness depends on source plus `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree; Spring condition report, bean graph, active profiles, and validated configuration properties; JFR recording, GC logs, thread dump, heap dump, and connection-pool metrics. Diff-only review is insufficient.

## How

Review the change with its target/version fingerprint, then execute applicable native commands: `./mvnw verify` or `./gradlew check` selected from the checked-in wrapper; `./mvnw dependency:tree` or `./gradlew dependencies`; `jcmd <pid> Thread.print` and `jcmd <pid> VM.flags`; `jcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr`; `jcmd <pid> GC.heap_dump /approved/path/heap.hprof` only under incident policy. Findings must identify the violated Java invariant.

## Version-aware caution

Read the Maven/Gradle toolchain, wrapper, Spring dependency management, and runtime image. Java language, virtual-thread, Spring Boot, Jakarta namespace, and Hibernate behavior vary by aligned release set; never mix guidance from another baseline.

## Tradeoffs

The Java review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.

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

- [ ] controllers map validated DTOs and do not expose JPA entities.
- [ ] public application-service methods own transaction and authorization boundaries.
- [ ] aggregate invariants are enforced before repository writes.
- [ ] fetch plans are use-case-specific and avoid open-session-in-view dependence.
- [ ] executor, HTTP, database, and messaging pools are explicitly bounded.
- [ ] interrupts and cancellation are not swallowed.
- [ ] configuration properties are typed and validated at startup.
- [ ] tests cover transaction rollback, optimistic conflict, serialization, and context wiring.
- [ ] Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Java evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
