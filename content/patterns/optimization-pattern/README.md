# Optimization Pattern

> **Version:** 2.0 | **Updated:** 2026-07-16 | **Status:** Stable

## Purpose

Improve a profiled bottleneck while protecting correctness and downstream guardrails.

## Applicability

- an SLO or unit-cost target is missed
- profiling identifies a dominant resource
- expected growth exhausts capacity

## Evidence

- representative workload
- profiles and traces
- latency/throughput/cost baseline
- correctness oracle
- capacity and saturation signals

## Components

Optimization README components gate 1 is accepted only when "approved effect size reached with confidence interval" is source-verifiable; otherwise, disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.

README is component thirteen.

## Outcome measures

- approved effect size reached with confidence interval
- correctness oracle has zero regression
- p99 and saturation guardrails remain within SLO
- unit cost is measured end-to-end

## Rollback

Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark.

## Tradeoffs

Optimization README deliberately spends additional review time to protect "approved effect size reached with confidence interval"; evidence weakness triggers "Disable the optimization flag, restore baseline configuration, and compare recovery to the original benchmark".

## Anti-patterns

Optimization README rejects shortcuts around "Define target metric, guardrails, workload, and minimum useful effect." because they sever the evidence chain required for "approved effect size reached with confidence interval".

## Citations

- [Google SRE monitoring](https://sre.google/sre-book/monitoring-distributed-systems/)
- [Linux perf wiki](https://perf.wiki.kernel.org/index.php/Main_Page)
- [OpenJDK JMH](https://openjdk.org/projects/code-tools/jmh/)

## Changelog

- 2026-07-16: Replaced generic scaffolding with domain-specific production guidance.
