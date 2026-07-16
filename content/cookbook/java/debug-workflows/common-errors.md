# Java Common Error Workflow

> Version: 1.1.0 | Updated: 2026-07-16

## Purpose

Diagnose five recurrent Java failure classes without erasing the platform state needed to prove root cause.

## Why

Transactions wrap use cases; transport DTOs do not leak persistence entities; pools are bounded and JVM evidence drives tuning. These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
| 1 | `BeanCurrentlyInCreationException` | Spring beans form a circular dependency. | bean graph or configuration binding failure |
| 2 | `LazyInitializationException` | A lazy association is accessed after its persistence context closes. | transaction/lazy-loading boundary failure |
| 3 | `TransactionRequiredException` | A write runs outside an active transaction. | thread or connection pool starvation |
| 4 | `Connection pool timeout` | Transactions are slow, leaked, or pool sizing mismatches load. | deadlock or blocked monitor |
| 5 | `OutOfMemoryError` | Heap, metaspace, direct memory, or native resources are exhausted. | heap, metaspace, direct-memory, or GC pressure |

### 1. `BeanCurrentlyInCreationException`

**Failure class:** bean graph or configuration binding failure.

**Preserve first:** `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree.

**Discriminate:** Spring condition report. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For bean graph or configuration binding failure, correlate that observation to the exact Java target, revision, request/job, and UTC interval; compare `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree with one healthy peer or baseline.

**Native action:** `./mvnw verify` or `./gradlew check` selected from the checked-in wrapper. Start in the safest Java read-only or dry-run mode available. Before changing the Spring controller, application service, JPA aggregate, message consumer, or JVM process, name which of bean graph or configuration binding failure and transaction/lazy-loading boundary failure the action distinguishes.

**Root-cause direction:** Spring beans form a circular dependency.

**Correction:** Refactor shared behavior behind a lower-level port; do not enable circular references.

**Recovery proof:** Re-run `BeanCurrentlyInCreationException` reproduction, verify the bean graph or configuration binding failure signal cleared in Spring condition report. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Refactor shared behavior behind a lower-level port; do not enable circular references. restored the intended Java behavior through one complete workload or rollout window.

**Rollback boundary:** Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.

### 2. `LazyInitializationException`

**Failure class:** transaction/lazy-loading boundary failure.

**Preserve first:** Spring condition report, bean graph, active profiles, and validated configuration properties.

**Discriminate:** Hibernate SQL logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For transaction/lazy-loading boundary failure, correlate that observation to the exact Java target, revision, request/job, and UTC interval; compare Spring condition report, bean graph, active profiles, and validated configuration properties with one healthy peer or baseline.

**Native action:** `./mvnw dependency:tree` or `./gradlew dependencies`. Start in the safest Java read-only or dry-run mode available. Before changing the Spring controller, application service, JPA aggregate, message consumer, or JVM process, name which of transaction/lazy-loading boundary failure and thread or connection pool starvation the action distinguishes.

**Root-cause direction:** A lazy association is accessed after its persistence context closes.

**Correction:** Fetch the use-case projection inside the transaction.

**Recovery proof:** Re-run `LazyInitializationException` reproduction, verify the transaction/lazy-loading boundary failure signal cleared in Hibernate SQL logs. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Fetch the use-case projection inside the transaction. restored the intended Java behavior through one complete workload or rollout window.

**Rollback boundary:** Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.

### 3. `TransactionRequiredException`

**Failure class:** thread or connection pool starvation.

**Preserve first:** JFR recording, GC logs, thread dump, heap dump, and connection-pool metrics.

**Discriminate:** transaction trace logging. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For thread or connection pool starvation, correlate that observation to the exact Java target, revision, request/job, and UTC interval; compare JFR recording, GC logs, thread dump, heap dump, and connection-pool metrics with one healthy peer or baseline.

**Native action:** `jcmd <pid> Thread.print` and `jcmd <pid> VM.flags`. Start in the safest Java read-only or dry-run mode available. Before changing the Spring controller, application service, JPA aggregate, message consumer, or JVM process, name which of thread or connection pool starvation and deadlock or blocked monitor the action distinguishes.

**Root-cause direction:** A write runs outside an active transaction.

**Correction:** Place the transaction on the public use-case method.

**Recovery proof:** Re-run `TransactionRequiredException` reproduction, verify the thread or connection pool starvation signal cleared in transaction trace logging. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Place the transaction on the public use-case method. restored the intended Java behavior through one complete workload or rollout window.

**Rollback boundary:** Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.

### 4. `Connection pool timeout`

**Failure class:** deadlock or blocked monitor.

**Preserve first:** DDL/migration scripts plus generated SQL and transaction traces.

**Discriminate:** JFR and pool metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For deadlock or blocked monitor, correlate that observation to the exact Java target, revision, request/job, and UTC interval; compare DDL/migration scripts plus generated SQL and transaction traces with one healthy peer or baseline.

**Native action:** `jcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr`. Start in the safest Java read-only or dry-run mode available. Before changing the Spring controller, application service, JPA aggregate, message consumer, or JVM process, name which of deadlock or blocked monitor and heap, metaspace, direct-memory, or GC pressure the action distinguishes.

**Root-cause direction:** Transactions are slow, leaked, or pool sizing mismatches load.

**Correction:** Measure hold time, close resources, and bound concurrency.

**Recovery proof:** Re-run `Connection pool timeout` reproduction, verify the deadlock or blocked monitor signal cleared in JFR and pool metrics. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Measure hold time, close resources, and bound concurrency. restored the intended Java behavior through one complete workload or rollout window.

**Rollback boundary:** Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.

### 5. `OutOfMemoryError`

**Failure class:** heap, metaspace, direct-memory, or GC pressure.

**Preserve first:** `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree.

**Discriminate:** JFR and heap dump. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.. For heap, metaspace, direct-memory, or GC pressure, correlate that observation to the exact Java target, revision, request/job, and UTC interval; compare `pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree with one healthy peer or baseline.

**Native action:** `jcmd <pid> GC.heap_dump /approved/path/heap.hprof` only under incident policy. Start in the safest Java read-only or dry-run mode available. Before changing the Spring controller, application service, JPA aggregate, message consumer, or JVM process, name which of heap, metaspace, direct-memory, or GC pressure and bean graph or configuration binding failure the action distinguishes.

**Root-cause direction:** Heap, metaspace, direct memory, or native resources are exhausted.

**Correction:** Capture the correct dump and fix retention before changing limits.

**Recovery proof:** Re-run `OutOfMemoryError` reproduction, verify the heap, metaspace, direct-memory, or GC pressure signal cleared in JFR and heap dump. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline., and prove Capture the correct dump and fix retention before changing limits. restored the intended Java behavior through one complete workload or rollout window.

**Rollback boundary:** Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.

## Version-aware caution

Read the Maven/Gradle toolchain, wrapper, Spring dependency management, and runtime image. Java language, virtual-thread, Spring Boot, Jakarta namespace, and Hibernate behavior vary by aligned release set; never mix guidance from another baseline.

## Tradeoffs

Native evidence collection may delay a quick restart, but it distinguishes bean graph or configuration binding failure, transaction/lazy-loading boundary failure, thread or connection pool starvation, deadlock or blocked monitor, heap, metaspace, direct-memory, or GC pressure and prevents recurring incidents hidden by state reset.

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

- [ ] Target fingerprint and incident interval are recorded.
- [ ] Pre-mutation evidence is preserved.
- [ ] One failure class is supported by confirm/falsify observations.
- [ ] Correction addresses the causal native signal.
- [ ] Recovery and rollback evidence are attached.

## Changelog

- 1.1.0 (2026-07-16): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (2026-07-16): Added initial workflow.
