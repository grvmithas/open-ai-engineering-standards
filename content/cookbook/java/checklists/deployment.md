# Java Deployment Checklist

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Gate promotion and rollback of a Java Spring controller, application service, JPA aggregate, message consumer, or JVM process.

## Why

A syntactically valid Java artifact can still fail because of bean graph or configuration binding failure, transaction/lazy-loading boundary failure, thread or connection pool starvation, deadlock or blocked monitor, heap, metaspace, direct-memory, or GC pressure. Promotion therefore requires target-state and rollback evidence.

## How

Run against the exact target and immutable candidate. Preserve outputs from `./mvnw verify` or `./gradlew check` selected from the checked-in wrapper; `./mvnw dependency:tree` or `./gradlew dependencies`; `jcmd <pid> Thread.print` and `jcmd <pid> VM.flags`; `jcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr`; `jcmd <pid> GC.heap_dump /approved/path/heap.hprof` only under incident policy. Stop promotion on any failed item.

## Version-aware caution

Read the Maven/Gradle toolchain, wrapper, Spring dependency management, and runtime image. Java language, virtual-thread, Spring Boot, Jakarta namespace, and Hibernate behavior vary by aligned release set; never mix guidance from another baseline.

## Tradeoffs

Promotion waits for "wrapper build and tests run with the same toolchain as the runtime image" and "dependency convergence and vulnerable transitive findings are reviewed". Those Java target checks slow release but directly bound bean graph or configuration binding failure and make this rollback executable: Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.

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

- [ ] wrapper build and tests run with the same toolchain as the runtime image.
- [ ] dependency convergence and vulnerable transitive findings are reviewed.
- [ ] migration ordering supports mixed old/new application instances.
- [ ] heap/container limits, GC selection, thread pools, and connection pools are load-tested.
- [ ] readiness does not hide dependency exhaustion and shutdown drains requests/messages.
- [ ] JFR, GC, pool, transaction, and HTTP metrics are available before rollout.
- [ ] canary compares pause time, allocation, pool wait, errors, and p99 latency.
- [ ] rollback is blocked if schema or message contracts cannot be read by the prior release.
- [ ] Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (2026-07-16): Replaced generic gates with native Java evidence and failure controls.
- 1.0.0 (2026-07-16): Added initial checklist.
