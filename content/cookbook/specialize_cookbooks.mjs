import fs from "node:fs";
import path from "node:path";

const root = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const date = "2026-07-16";

const data = {
  react: {
    name: "React",
    unit: "component, Hook, context boundary, or route UI",
    invariant: "Rendering stays pure; state has one owner; Effects synchronize only with external systems.",
    version: "Read the installed `react` and `react-dom` versions from the lockfile. Concurrent rendering, form actions, and server integration differ across React and framework releases; never copy an API from current react.dev into an older dependency graph without checking that release's reference.",
    evidence: ["`package.json` plus the lockfile entries for React, renderer, router, state, and test libraries", "`tsconfig.json` and ESLint React/Hook rules", "the nearest component, test, CSS, and Storybook conventions", "React DevTools Profiler commit/flamegraph for the reproduced interaction"],
    commands: ["`npm run lint -- --max-warnings=0`", "`npx tsc --noEmit`", "`npm test -- --runInBand` using the repository test script", "`npm run build` and inspect the emitted bundle report when configured", "React DevTools Profiler: record the exact interaction and compare committed renders"],
    failures: ["Rules of Hooks violations", "stale closures and effect feedback loops", "unstable keys or identity", "hydration divergence", "excessive render or bundle cost"],
    review: ["Hooks are top-level and exhaustive dependency analysis is satisfied without suppression", "derived values are computed during render instead of mirrored through an Effect", "state is colocated with its owner; context values and callbacks avoid accidental identity churn", "list keys represent durable entity identity, never position where order can change", "loading, empty, error, disabled, and interrupted interaction states are represented", "native HTML semantics, focus behavior, accessible names, and keyboard operation are tested", "tests assert user-visible behavior with the project's renderer rather than component internals", "Profiler evidence justifies memoization; `useMemo` and `memo` are not speculative"],
    deploy: ["production build completes with the repository's exact React renderer and bundler versions", "route-level chunks and source-map policy are inspected for unexpected dependency or secret exposure", "SSR or prerendered pages hydrate without console errors under production mode", "critical interactions pass keyboard, focus, screen-reader smoke, and error-boundary tests", "real-user error and Web Vital dashboards are segmented by release", "canary cohort shows no increase in hydration, render, or JavaScript errors", "feature flag can disable the changed interaction without requiring an asset rollback", "rollback restores a compatible server/API contract for cached clients"],
    rollback: "Disable the owning feature flag first; otherwise redeploy the previous immutable client assets while preserving API compatibility for already-cached bundles.",
    diagram: `flowchart LR
  Route[Router boundary] --> Feature[Feature container]
  Feature --> Hook[Custom Hooks]
  Hook --> Store[Server cache or state owner]
  Feature --> View[Pure semantic components]
  View --> DOM[Accessible DOM]
  Boundary[Error and Suspense boundaries] -. contain .-> Feature
  Profiler[React Profiler and RUM] -. observes .-> Feature`,
    archRules: ["Route and feature boundaries own orchestration; leaf components receive typed data and events.", "A custom Hook owns one synchronization concern and exposes no renderer-specific side effects.", "Error and Suspense boundaries are placed at independently recoverable UI regions.", "Server state remains in the data cache; transient interaction state remains local.", "The design system owns semantic primitives and focus behavior."],
    anti: "A page-wide context holding unrelated mutable state causes every consumer to share a render and release boundary.",
    governance: "For React estates, govern design-system packages, browser support, telemetry consent, third-party scripts, and accessibility evidence centrally; product teams retain ownership of feature behavior.",
    sources: [["React Learn", "https://react.dev/learn"], ["Rules of Hooks", "https://react.dev/reference/rules/rules-of-hooks"], ["React DevTools Profiler", "https://react.dev/learn/react-developer-tools"], ["WAI-ARIA APG", "https://www.w3.org/WAI/ARIA/apg/"]],
  },
  nextjs: {
    name: "Next.js",
    unit: "App Router route, layout, Server Component, Client Component, or Route Handler",
    invariant: "Server Components are the default; client boundaries are minimal; cache and dynamic behavior are declared at the data boundary.",
    version: "Use the locally installed Next.js documentation under `node_modules/next/dist/docs/` and the lockfile version. App Router caching, request APIs, middleware/proxy naming, and build output change between releases; latest web docs are not evidence for this repository.",
    evidence: ["`package.json`, lockfile, `next.config.*`, and installed Next.js docs", "route tree including `layout`, `page`, `loading`, `error`, `not-found`, and Route Handlers", "build output showing static, dynamic, and route bundle classification", "response `Cache-Control`, `Vary`, revalidation, and RSC request evidence"],
    commands: ["`npm run lint -- --max-warnings=0` when the repository defines it", "`npx tsc --noEmit`", "`npm test -- --runInBand` using the checked-in test script", "`npm run build` and retain the route classification table", "`npm start` followed by production-mode HTTP and hydration smoke tests"],
    failures: ["Server/Client module boundary violations", "static-to-dynamic build conflicts", "RSC serialization failures", "stale or over-invalidated cache entries", "hydration and streaming boundary failures"],
    review: ["`use client` appears only at the smallest browser-interactive boundary", "Server Components do not import browser-only modules and client props are serializable", "request-time APIs and uncached fetches intentionally opt a route into dynamic work", "cache keys, tags, revalidation, and invalidation ownership are explicit", "Route Handlers validate input, authenticate before mutation, and return stable error contracts", "`loading`, `error`, and `not-found` boundaries match recoverable route regions", "metadata, canonical URL, robots behavior, and structured data match route intent", "images, fonts, scripts, and route chunks use framework facilities with measured impact"],
    deploy: ["`next build` route classification matches the reviewed static/dynamic design", "standalone or platform output includes every required runtime asset and server file", "environment variables are separated into server-only and intentionally public `NEXT_PUBLIC_` values", "cache invalidation is tested against the production cache/CDN topology", "streaming, redirects, rewrites, headers, middleware/proxy, and Route Handlers pass production smoke tests", "RSC and hydration errors remain zero in the canary cohort", "new and old deployments can serve shared cached HTML/RSC payloads during rollout", "rollback includes cache purge or tag invalidation when payload compatibility changed"],
    rollback: "Route traffic to the prior immutable deployment, then invalidate only cache entries whose HTML/RSC or data contract is incompatible; never rely on redeploy alone to remove stale edge content.",
    diagram: `flowchart TB
  Browser[Browser] --> Edge[CDN or platform edge]
  Edge --> Router[App Router layouts and pages]
  Router --> RSC[Server Components]
  Router --> RH[Route Handlers]
  RSC --> Cache[Data and route cache policy]
  RSC --> Island[Minimal Client Components]
  Island --> BrowserAPI[Browser APIs and events]
  Router -. streams .-> Boundary[Suspense and error boundaries]`,
    archRules: ["Layouts own shared shell and metadata, not mutable feature state.", "Server Components fetch close to the data source and pass serializable props to client islands.", "Cache policy is attached to each fetch or route, with an owner for invalidation.", "Route Handlers are external trust boundaries and do not substitute for internal domain services.", "Suspense boundaries align with independent latency and failure regions."],
    anti: "Marking a layout or page `use client` pulls its import graph into the browser and discards the App Router's server-first boundary.",
    governance: "Next.js governance must pin hosting behavior, cache ownership, public environment-variable review, third-party script policy, and framework upgrade tests against installed documentation.",
    sources: [["Next.js App Router", "https://nextjs.org/docs/app"], ["Server and Client Components", "https://nextjs.org/docs/app/getting-started/server-and-client-components"], ["Caching", "https://nextjs.org/docs/app/guides/caching"], ["Production checklist", "https://nextjs.org/docs/app/guides/production-checklist"]],
  },
  node: {
    name: "Node.js",
    unit: "HTTP handler, worker, stream pipeline, package, or process lifecycle",
    invariant: "The event loop remains non-blocking; concurrency is bounded; AbortSignal, errors, and shutdown propagate through every I/O boundary.",
    version: "Read `engines.node`, `.nvmrc`/toolchain files, the lockfile, and the runtime image. APIs and default module, permission, test-runner, and fetch behavior depend on the deployed Node release; validate against that release's API docs.",
    evidence: ["runtime and package-manager pin plus lockfile integrity", "module mode, export map, TypeScript target, and startup command", "event-loop delay, heap, CPU profile, active handles, and request trace", "timeout, retry, pool, body-size, and graceful-shutdown configuration"],
    commands: ["`node --version` and the package manager's immutable install command", "`node --test` or the repository's exact test script", "`node --trace-warnings <entrypoint>` for warning provenance", "`node --prof <entrypoint>` followed by `node --prof-process isolate-*.log`", "`npm audit --omit=dev` with lockfile and exploitability review"],
    failures: ["unhandled promise rejection or uncaught exception", "event-loop blocking and CPU saturation", "listener, handle, or heap retention", "socket reset, timeout, or pool starvation", "partial shutdown with in-flight work"],
    review: ["every promise is awaited, returned, or intentionally supervised", "CPU-heavy or synchronous filesystem/crypto work is absent from request paths", "AbortSignal and deadlines reach outbound HTTP, database, and stream operations", "stream pipelines use backpressure-aware APIs and one error boundary", "HTTP body, header, queue, pool, and concurrency sizes are bounded", "errors preserve cause and classification without leaking secrets", "process handlers stop admission, drain work, close resources, then exit", "package exports and module mode work from a clean immutable install"],
    deploy: ["runtime image and `engines.node` agree on the exact major line", "lockfile install succeeds without lifecycle surprises and production dependency audit is reviewed", "health endpoint distinguishes liveness from dependency readiness", "SIGTERM test proves admission stops and in-flight requests drain before grace expiry", "event-loop delay, heap, active handles, errors, and saturation have dashboards", "load test holds queue and tail latency inside SLO under configured limits", "canary compares socket resets, unhandled errors, memory, and event-loop delay", "rollback preserves message and API compatibility with work produced by the new version"],
    rollback: "Stop new admission, drain workers and keep idempotency records, then route to the previous image; do not kill consumers while acknowledgements or writes are in flight.",
    diagram: `flowchart LR
  Client --> HTTP[HTTP adapter and schema validation]
  HTTP --> UseCase[Application use case]
  UseCase --> Pool[Bounded DB or HTTP pools]
  UseCase --> Queue[Bounded worker queue]
  Queue --> Workers[Worker threads or processes]
  Signal[SIGTERM and AbortSignal] -. cancels .-> HTTP
  Signal -. drains .-> Queue
  Metrics[Event-loop, heap, traces] -. observes .-> UseCase`,
    archRules: ["Transport validates size, shape, identity, and deadline before application work.", "Application code receives explicit clients and AbortSignal; it does not create global connections.", "CPU-bound work uses a bounded worker pool or separate service.", "Stream pipelines preserve backpressure from sink to source.", "Shutdown closes admission first and dependencies last."],
    anti: "Unbounded `Promise.all` over user-controlled input converts one request into connection-pool and memory exhaustion.",
    governance: "Node service governance pins runtime and package-manager lines, reviews install scripts and native addons, retains SBOMs, and tests shutdown against the orchestrator grace period.",
    sources: [["Node.js API", "https://nodejs.org/docs/latest/api/"], ["Don't block the event loop", "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop"], ["Node.js diagnostics", "https://nodejs.org/en/learn/diagnostics"], ["OWASP Node.js security", "https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html"]],
  },
  python: {
    name: "Python",
    unit: "package, FastAPI/Django boundary, asyncio task, worker, or library API",
    invariant: "Public boundaries are typed and validated; environments are reproducible; async code contains no blocking I/O and preserves cancellation.",
    version: "Read `requires-python`, lock/constraint files, environment metadata, and framework pins. Typing syntax, asyncio behavior, packaging metadata, and standard-library APIs differ by Python minor release; use the deployed interpreter's documentation.",
    evidence: ["`pyproject.toml`, lock/constraints, interpreter pin, and installed dependency report", "type-checker, formatter, linter, and test configuration", "async task dump, traceback with chained causes, profile, and open-resource evidence", "ASGI/WSGI server, worker count, timeout, and database-pool settings"],
    commands: ["`python --version` and `python -m pip check`", "`python -m pytest -q` with the repository configuration", "`python -m ruff check .` when Ruff is declared", "`python -m mypy .` when mypy is declared", "`PYTHONASYNCIODEBUG=1 python -m <module>` for asyncio diagnostics"],
    failures: ["environment or import resolution mismatch", "unawaited coroutine or lost cancellation", "blocking work in the event loop", "resource/session leak", "schema or type contract drift"],
    review: ["package imports work after installation, not through `sys.path` mutation", "public functions and data boundaries have useful types without blanket `Any`", "context managers close files, sessions, transactions, and locks on every path", "async functions await async I/O and offload measured blocking work intentionally", "task groups define ownership, cancellation, and exception aggregation", "mutable defaults, import-time side effects, and hidden globals are absent", "validation errors are mapped without weakening domain invariants", "tests cover interpreter/framework integration from a clean environment"],
    deploy: ["artifact is built once and installed into a clean environment with locked dependencies", "deployed Python minor and native-wheel platform match build evidence", "database migrations and worker/application rollout order are backward compatible", "ASGI/WSGI worker, timeout, keepalive, and pool settings are load-tested", "startup imports, health checks, signal handling, and graceful worker drain pass", "tracebacks, task failures, queue depth, pool usage, and memory are observable", "canary checks error classes and latency by worker/process", "rollback retains compatibility with queued task payloads and migrated schema"],
    rollback: "Stop producers before reverting consumers when task schemas changed; deploy the previous wheel/image only after confirming database and serialized payload compatibility.",
    diagram: `flowchart LR
  Request[ASGI or WSGI request] --> Schema[Validated boundary model]
  Schema --> UseCase[Typed application service]
  UseCase --> Protocol[Python Protocol ports]
  Protocol --> DB[Session or async client]
  UseCase --> Tasks[Owned asyncio TaskGroup]
  Lifespan[Application lifespan] -. opens and closes .-> DB
  Telemetry[Logs traces task metrics] -. observes .-> UseCase`,
    archRules: ["Framework models map into typed application inputs at the adapter.", "Protocols describe infrastructure behavior without importing framework classes into the core.", "One request or job owns its session and task group.", "Application lifespan creates and closes pools exactly once.", "Background work crosses a durable queue rather than escaping request task ownership."],
    anti: "Calling `asyncio.create_task` without retained ownership loses exceptions, cancellation, and shutdown guarantees.",
    governance: "Python governance requires approved indexes, hash-locked dependencies, native-wheel provenance, supported interpreter lines, and controls for notebook or dynamic-code execution.",
    sources: [["Python documentation", "https://docs.python.org/3/"], ["asyncio", "https://docs.python.org/3/library/asyncio.html"], ["Packaging User Guide", "https://packaging.python.org/en/latest/"], ["Typing specification", "https://typing.python.org/en/latest/spec/"]],
  },
  java: {
    name: "Java",
    unit: "Spring controller, application service, JPA aggregate, message consumer, or JVM process",
    invariant: "Transactions wrap use cases; transport DTOs do not leak persistence entities; pools are bounded and JVM evidence drives tuning.",
    version: "Read the Maven/Gradle toolchain, wrapper, Spring dependency management, and runtime image. Java language, virtual-thread, Spring Boot, Jakarta namespace, and Hibernate behavior vary by aligned release set; never mix guidance from another baseline.",
    evidence: ["`pom.xml` or Gradle catalogs, wrapper version, toolchain, BOM, and dependency tree", "Spring condition report, bean graph, active profiles, and validated configuration properties", "JFR recording, GC logs, thread dump, heap dump, and connection-pool metrics", "DDL/migration scripts plus generated SQL and transaction traces"],
    commands: ["`./mvnw verify` or `./gradlew check` selected from the checked-in wrapper", "`./mvnw dependency:tree` or `./gradlew dependencies`", "`jcmd <pid> Thread.print` and `jcmd <pid> VM.flags`", "`jcmd <pid> JFR.start name=incident settings=profile duration=60s filename=incident.jfr`", "`jcmd <pid> GC.heap_dump /approved/path/heap.hprof` only under incident policy"],
    failures: ["bean graph or configuration binding failure", "transaction/lazy-loading boundary failure", "thread or connection pool starvation", "deadlock or blocked monitor", "heap, metaspace, direct-memory, or GC pressure"],
    review: ["controllers map validated DTOs and do not expose JPA entities", "public application-service methods own transaction and authorization boundaries", "aggregate invariants are enforced before repository writes", "fetch plans are use-case-specific and avoid open-session-in-view dependence", "executor, HTTP, database, and messaging pools are explicitly bounded", "interrupts and cancellation are not swallowed", "configuration properties are typed and validated at startup", "tests cover transaction rollback, optimistic conflict, serialization, and context wiring"],
    deploy: ["wrapper build and tests run with the same toolchain as the runtime image", "dependency convergence and vulnerable transitive findings are reviewed", "migration ordering supports mixed old/new application instances", "heap/container limits, GC selection, thread pools, and connection pools are load-tested", "readiness does not hide dependency exhaustion and shutdown drains requests/messages", "JFR, GC, pool, transaction, and HTTP metrics are available before rollout", "canary compares pause time, allocation, pool wait, errors, and p99 latency", "rollback is blocked if schema or message contracts cannot be read by the prior release"],
    rollback: "Pause message admission and traffic, drain transactions, then restore the previous JVM artifact only after verifying Flyway/Liquibase and serialized-event backward compatibility.",
    diagram: `flowchart LR
  Controller[Spring MVC or WebFlux adapter] --> DTO[Validated DTO mapping]
  DTO --> Service[Transactional application service]
  Service --> Aggregate[Domain aggregate]
  Service --> Repo[JPA repository port]
  Repo --> Pool[HikariCP and database]
  Service --> Broker[Transactional outbox or broker]
  Actuator[Actuator, Micrometer, JFR] -. observes .-> Service`,
    archRules: ["Controllers terminate HTTP concerns and map DTOs.", "Application services own transaction, authorization, and orchestration.", "Aggregates protect invariants without Spring or JPA behavior dependencies.", "Repositories load an explicit aggregate or projection for one use case.", "Outbox publication follows committed state rather than dual writes."],
    anti: "Returning managed JPA entities from controllers makes serialization trigger queries outside the intended transaction.",
    governance: "Java governance aligns JDK, Spring, Jakarta, Hibernate, and build-plugin baselines; it also controls JFR/heap-dump access because diagnostics may contain regulated data.",
    sources: [["Java documentation", "https://docs.oracle.com/en/java/"], ["Spring Boot reference", "https://docs.spring.io/spring-boot/reference/"], ["Spring transactions", "https://docs.spring.io/spring-framework/reference/data-access/transaction.html"], ["JDK Flight Recorder", "https://docs.oracle.com/javacomponents/jmc-5-5/jfr-runtime-guide/about.htm"]],
  },
  dotnet: {
    name: ".NET",
    unit: "ASP.NET Core endpoint, hosted service, EF Core unit of work, or application slice",
    invariant: "DI lifetimes are valid; CancellationToken reaches I/O; one scoped DbContext owns a unit of work; options fail fast.",
    version: "Read `global.json`, target framework monikers, SDK lock, runtime image, and package graph. ASP.NET Core hosting, minimal APIs, EF Core translation, and C# language features must match the deployed SDK/runtime baseline.",
    evidence: ["solution/project files, `global.json`, lock files, target frameworks, and package graph", "DI registrations, options binding/validation, middleware order, and endpoint metadata", "EF Core generated SQL, query plan, change tracker, and pool metrics", "dotnet-counters, dotnet-trace, dotnet-dump, and distributed traces"],
    commands: ["`dotnet --info`", "`dotnet restore --locked-mode` when lock files are enabled", "`dotnet build --no-restore -warnaserror`", "`dotnet test --no-build`", "`dotnet list package --vulnerable --include-transitive` and review applicability"],
    failures: ["invalid DI lifetime or missing registration", "concurrent or overlong DbContext use", "query translation, N+1, or serialization cycle", "request cancellation versus upstream timeout", "thread-pool, connection-pool, or GC saturation"],
    review: ["singleton services do not capture scoped dependencies", "CancellationToken flows from endpoint through every asynchronous I/O call", "one scoped DbContext handles one unit of work and is never used concurrently", "EF projections select only required columns and generated SQL is inspected", "request/response contracts are separate from tracked entities", "options use typed binding and startup validation", "middleware order preserves exception handling, forwarded headers, authentication, and authorization", "ProblemDetails and logs disclose no secrets or internal stack details"],
    deploy: ["SDK used to publish matches `global.json` and runtime image compatibility", "locked restore, build with warnings as errors, tests, and package vulnerability review pass", "EF migration is scripted/idempotent and compatible with mixed application versions", "Kestrel limits, thread pool, connection pool, and GC/container settings are load-tested", "health checks distinguish process liveness, readiness, and degraded dependencies", "dotnet counters, traces, logs, and exception telemetry are live before canary", "canary compares GC pause, thread-pool queue, dependency duration, and errors", "rollback verifies prior binaries can read schema and queued contracts"],
    rollback: "Stop new background work, drain hosted services within the host shutdown timeout, then redeploy the previous published artifact after checking EF migration compatibility.",
    diagram: `flowchart LR
  Endpoint[ASP.NET Core endpoint] --> Contract[Validated contract]
  Contract --> Handler[Scoped use-case handler]
  Handler --> Domain[Domain model]
  Handler --> Context[Scoped EF Core DbContext]
  Context --> DB[(Database)]
  Host[Generic Host lifecycle] -. cancellation .-> Handler
  OTel[OpenTelemetry and dotnet counters] -. observes .-> Handler`,
    archRules: ["Endpoint metadata declares authentication, authorization, and response contract.", "A scoped handler owns one use case and receives CancellationToken.", "DbContext is a unit of work, not a singleton or generic repository implementation detail.", "Hosted services create a scope per message or iteration.", "Options are immutable inputs validated before the host reports ready."],
    anti: "Registering DbContext or a service that captures it as singleton introduces cross-request concurrency and stale tracking.",
    governance: ".NET governance pins SDK and runtime support lines, controls NuGet sources and package signatures, and treats dumps/traces as sensitive production records.",
    sources: [[".NET documentation", "https://learn.microsoft.com/dotnet/"], ["ASP.NET Core fundamentals", "https://learn.microsoft.com/aspnet/core/fundamentals/"], ["EF Core", "https://learn.microsoft.com/ef/core/"], ["Diagnostics tools", "https://learn.microsoft.com/dotnet/core/diagnostics/"]],
  },
  azure: {
    name: "Azure",
    unit: "subscription workload, Bicep module, managed identity, private endpoint, or release pipeline",
    invariant: "Infrastructure is declarative; identities are credentialless and least-privilege; private connectivity, policy, diagnostics, and cost ownership are explicit.",
    version: "Capture Azure CLI/Bicep versions, resource-provider API versions, and service SKU/region capabilities. ARM API and managed-service features vary by API version, cloud, region, and SKU; a portal screenshot is not a reproducible contract.",
    evidence: ["Bicep/ARM source, parameter provenance, compiled template, and What-If result", "tenant, subscription, resource-group, principal object ID, role assignments, deny assignments, and policy state", "private endpoint, subnet, route, NSG, private DNS zone links, and caller-side DNS resolution", "Activity Log, resource diagnostics, platform metrics, Service Health, quota, and cost data"],
    commands: ["`az version` and `az account show` before evidence collection", "`az bicep build --file main.bicep`", "`az deployment group what-if --resource-group <rg> --template-file main.bicep --parameters @prod.bicepparam`", "`az role assignment list --assignee-object-id <object-id> --all`", "`az monitor activity-log list --resource-group <rg> --offset 2h`"],
    failures: ["management-plane authorization or policy denial", "ARM/Bicep dependency or API-version deployment failure", "managed identity token/role mismatch", "private DNS, route, NSG, or endpoint failure", "throttling, quota, regional capacity, or service degradation"],
    review: ["Bicep uses explicit supported API versions and deterministic names/scopes", "managed identity replaces account keys and role scope is no broader than required", "public network access is disabled or justified with compensating controls", "private DNS zone and VNet links are modeled with endpoint lifecycle", "policy assignments and exemptions have owner, expiry, and evidence", "diagnostic settings route required categories to the governed destination", "resource locks and deletion/recovery semantics match state criticality", "tags, budgets, reservations, and data residency are defined at landing-zone boundaries"],
    deploy: ["Bicep build/lint and ARM What-If are retained and reviewed for deletes/replacements", "target tenant, subscription, region, provider registration, quota, and policy state are preflighted", "deployment identity has temporary least-privilege management-plane access", "data-plane RBAC propagation and managed identity are tested from the workload", "private DNS and endpoint connectivity are tested from every caller network", "Azure Monitor alerts, Activity Log, diagnostics, and Service Health routing are active", "safe-deployment rings use health criteria and stop on platform/user-impact regression", "rollback accounts for non-reversible data-plane changes and resource deletion locks"],
    rollback: "Reapply the last approved Bicep/parameter artifact or route traffic to the prior deployment slot; never delete stateful resources to force convergence, and restore access changes through reviewed RBAC/policy state.",
    diagram: `flowchart TB
  Tenant[Microsoft Entra tenant] --> Sub[Landing-zone subscription]
  Sub --> Policy[Azure Policy and RBAC]
  Sub --> VNet[Hub/spoke VNet]
  VNet --> PE[Private Endpoint and Private DNS]
  PE --> Workload[Managed compute with workload identity]
  Workload --> PaaS[Managed data or AI service]
  Git[Git and Bicep pipeline] --> WhatIf[ARM What-If and approval]
  WhatIf --> Sub
  Monitor[Azure Monitor and Activity Log] -. observes .-> Workload`,
    archRules: ["Landing zones own tenant, subscription, policy, network, logging, and budget controls.", "Workloads receive managed identities and data-plane roles at the narrowest resource scope.", "Private endpoints and DNS links are deployed as one connectivity contract.", "Bicep modules expose stable inputs/outputs and pin explicit API versions.", "Safe deployment uses rings, health signals, and deployment history."],
    anti: "Portal-authored production resources create configuration that cannot be reviewed, reproduced, or safely rolled back.",
    governance: "Azure governance maps management groups to policy initiatives, centralizes Activity Logs and diagnostics, time-bounds exemptions, and records data residency and cost ownership.",
    sources: [["Azure Architecture Center", "https://learn.microsoft.com/azure/architecture/"], ["Azure Well-Architected Framework", "https://learn.microsoft.com/azure/well-architected/"], ["Bicep deployments", "https://learn.microsoft.com/azure/azure-resource-manager/bicep/deploy-cli"], ["Managed identities", "https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview"]],
  },
  aws: {
    name: "AWS",
    unit: "account workload, CloudFormation/CDK stack, IAM role, VPC path, Lambda function, or release",
    invariant: "Accounts and cells bound blast radius; role credentials are short-lived; infrastructure, quotas, retries, and failure isolation are explicit.",
    version: "Capture AWS CLI/CDK/CloudFormation transform versions, partition, region, service API, runtime, and quota. Managed-service behavior and availability vary by region, account, runtime, architecture, and feature release.",
    evidence: ["template/CDK source, synthesized CloudFormation, change set, stack events, and drift status", "caller identity, IAM identity/resource policies, permission boundaries, session policy, SCP, and explicit denies", "VPC route tables, security groups, NACLs, endpoints, DNS, and Flow Logs", "CloudTrail, CloudWatch metrics/logs, X-Ray traces, service quota, and AWS Health events"],
    commands: ["`aws sts get-caller-identity` and `aws configure list`", "`aws cloudformation validate-template --template-body file://template.yaml`", "`aws cloudformation create-change-set ...` then `aws cloudformation describe-change-set ...`", "`aws iam simulate-principal-policy --policy-source-arn <role> --action-names <action>`", "`aws cloudformation detect-stack-drift --stack-name <stack>`"],
    failures: ["policy-chain AccessDenied", "CloudFormation create/update/rollback failure", "Lambda timeout, cold start, or concurrency exhaustion", "service throttling or quota exhaustion", "VPC route, security, endpoint-policy, or DNS failure"],
    review: ["IAM statements constrain action, resource, condition, and principal without wildcard shortcuts", "account, region, partition, and environment are explicit stack inputs", "stateful resources define retention, backup, encryption, and replacement behavior", "VPC ingress/egress and endpoint policies permit only intended paths", "Lambda/compute timeout is below caller budget and concurrency is bounded", "SDK retries honor idempotency, jitter, service semantics, and total deadline", "CloudTrail, service logs, metrics, X-Ray, alarms, and ownership tags are configured", "CloudFormation change/replacement behavior is reviewed from synthesized output"],
    deploy: ["caller identity and target account/region are printed before any mutation", "template validation, lint/tests, synthesized diff, and change set show no unapproved replacement", "service quotas, reserved concurrency, IP capacity, and regional dependencies are preflighted", "IAM Access Analyzer/simulation covers the deployment and workload roles", "alarms and dashboards exist before traffic enters the new cell or function version", "weighted alias, target-group, or cell routing stops on user-impact alarms", "CloudFormation rollback triggers and stack events are monitored to completion", "rollback preserves event/schema compatibility and stateful resource retention"],
    rollback: "Shift weighted traffic or aliases to the prior immutable version/cell, then use CloudFormation rollback for infrastructure; do not delete a failed stack when retained data or forensic events are required.",
    diagram: `flowchart TB
  Org[AWS Organizations and SCPs] --> Account[Workload account]
  Account --> IAM[IAM roles and boundaries]
  Account --> VPC[VPC subnets, routes, endpoints]
  VPC --> Cell[Independent service cell]
  Cell --> Data[Encrypted managed data]
  Git[Git and IaC pipeline] --> Change[CloudFormation change set]
  Change --> Account
  Trail[CloudTrail, CloudWatch, X-Ray] -. observes .-> Cell
  Route[Weighted routing] --> Cell`,
    archRules: ["Organization and account boundaries isolate ownership, billing, policy, and blast radius.", "Workloads assume roles; long-lived IAM user keys are not application credentials.", "Cells own compute, quotas, and dependencies required for independent failure.", "CloudFormation change sets expose replacement and policy changes before execution.", "Traffic shifting is coupled to CloudWatch user-impact alarms."],
    anti: "A single shared production account and VPC turns IAM, quota, network, and deployment failures into organization-wide incidents.",
    governance: "AWS governance enforces organization policies, centralized CloudTrail/configuration evidence, break-glass role controls, region restrictions, data classification, and cost allocation.",
    sources: [["AWS Architecture Center", "https://aws.amazon.com/architecture/"], ["AWS Well-Architected", "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html"], ["IAM best practices", "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"], ["CloudFormation change sets", "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html"]],
  },
  docker: {
    name: "Docker",
    unit: "Dockerfile, BuildKit build, OCI image, Compose service, or container release",
    invariant: "Images are minimal, immutable, reproducible, non-root, secret-free, multi-architecture aware, and terminate correctly.",
    version: "Capture Docker Engine, Buildx/BuildKit, Dockerfile syntax directive, Compose specification, target platforms, and base-image digest. Builder features and Compose keys vary; tags alone do not identify the tested filesystem.",
    evidence: ["Dockerfile, `.dockerignore`, build context list, syntax directive, and BuildKit provenance", "base and final image digests, platform manifest, layer history, SBOM, and vulnerability report", "runtime user, capabilities, seccomp, mounts, ports, environment, healthcheck, and stop signal", "Compose rendered config, network/DNS state, container inspect, events, and resource stats"],
    commands: ["`docker version` and `docker buildx version`", "`docker buildx build --check .` when supported by the pinned builder", "`docker buildx build --platform <platforms> --provenance=true --sbom=true -t <image> .`", "`docker image inspect <image>` and `docker history --no-trunc <image>`", "`docker compose config` before applying a Compose change"],
    failures: ["architecture or entrypoint exec-format mismatch", "runtime file permission or read-only filesystem failure", "image/build-cache/log disk exhaustion", "OOM kill or CPU throttling", "Compose DNS, network, dependency, or health failure"],
    review: ["base image is maintained and pinned by digest with an update mechanism", "multi-stage build leaves compilers, package caches, and credentials outside runtime", "BuildKit secret/SSH mounts are used instead of ARG/ENV for sensitive build input", "`.dockerignore` excludes VCS, local secrets, test output, and irrelevant context", "runtime image has a numeric non-root user and writable paths are explicit", "ENTRYPOINT/CMD preserve signal delivery and use exec form", "HEALTHCHECK tests process capability without mutating dependencies", "labels, SBOM, provenance, platform manifest, and source revision identify the artifact"],
    deploy: ["registry digest—not mutable tag—is promoted between environments", "signature/provenance, SBOM, license, and vulnerability policy pass", "target node architectures are present in the OCI manifest", "container starts with read-only root filesystem, dropped capabilities, and intended user where supported", "memory/CPU limits and writable-volume growth are load-tested", "SIGTERM reaches PID 1 and exits within orchestrator grace period", "health, logs, metrics, and OOM state are visible before rollout", "rollback references the previous digest and preserves volume/schema compatibility"],
    rollback: "Redeploy the previous OCI digest, not a reused tag; preserve volumes and inspect migration compatibility before starting the older image.",
    diagram: `flowchart LR
  Context[Minimal build context] --> Build[BuildKit dependency and build stages]
  Secret[Secret or SSH mounts] -. ephemeral .-> Build
  Build --> Runtime[Minimal non-root runtime stage]
  Runtime --> OCI[OCI image, SBOM, provenance]
  OCI --> Registry[Immutable registry digest]
  Registry --> Host[Hardened container runtime]
  Host --> Volume[Explicit writable volume]
  Host --> Telemetry[stdout, health, stats, events]`,
    archRules: ["Dependency and compile stages consume pinned inputs; runtime receives only required artifacts.", "Secrets use BuildKit mounts and never become layer contents.", "The runtime stage declares non-root identity, stop signal, health behavior, and explicit writable paths.", "Registry promotion is by digest with provenance and SBOM attached.", "Persistent state lives outside the container filesystem."],
    anti: "Installing build tools, package caches, and credentials in the final stage expands attack surface and makes the image irreproducible.",
    governance: "Container governance approves base-image families, enforces digest promotion and signed provenance, applies vulnerability SLAs, and retains SBOMs for every deployed digest.",
    sources: [["Dockerfile reference", "https://docs.docker.com/reference/dockerfile/"], ["Build best practices", "https://docs.docker.com/build/building/best-practices/"], ["Build secrets", "https://docs.docker.com/build/building/secrets/"], ["Docker security", "https://docs.docker.com/engine/security/"]],
  },
  kubernetes: {
    name: "Kubernetes",
    unit: "controller-managed workload, Service, policy, autoscaler, disruption budget, or GitOps release",
    invariant: "Controllers own Pods; workload identity and network policy are least-privilege; probes, resources, topology, disruption, and rollout are explicit desired state.",
    version: "Capture server and kubectl versions, API discovery, node OS/runtime, CNI/CSI, admission policies, and managed-cluster release. API availability, field semantics, sidecar behavior, and feature gates vary by cluster version; validate manifests server-side against the target cluster.",
    evidence: ["rendered manifests plus Git revision, field manager, server-side dry-run, diff, and admission result", "Deployment/StatefulSet status, ReplicaSets, Pod conditions, events, previous logs, and termination state", "Service, EndpointSlice, NetworkPolicy, DNS, routes, and caller-side connectivity", "ServiceAccount/workload identity binding, RBAC `can-i`, Pod security context, and admission policy", "requests/limits, node pressure, HPA signals, PDB, topology spread, and eviction events"],
    commands: ["`kubectl version` and `kubectl api-resources` against the target cluster", "`kubectl apply --server-side --dry-run=server -f <rendered.yaml>`", "`kubectl diff -f <rendered.yaml>`", "`kubectl auth can-i --as=system:serviceaccount:<ns>:<sa> <verb> <resource>`", "`kubectl rollout status deployment/<name> -n <ns> --timeout=<budget>`"],
    failures: ["CrashLoopBackOff, probe failure, or bad configuration", "ImagePullBackOff or architecture/registry identity failure", "Pending due to requests, affinity, taints, topology, or volume", "OOMKilled, throttling, node pressure, or eviction", "Service/EndpointSlice/DNS/NetworkPolicy path failure"],
    review: ["Pods are owned by Deployment, StatefulSet, Job, or another appropriate controller", "ServiceAccount maps to workload identity; automounted tokens and RBAC are minimized", "startup, readiness, and liveness probes test distinct contracts and have realistic timing", "resource requests drive scheduling; limits and HPA signals come from measured behavior", "PDB and rollout strategy permit both maintenance and safe availability", "topology spread/anti-affinity distributes replicas across real failure domains", "NetworkPolicy declares intended ingress and egress with DNS and dependency paths", "securityContext, image digest, read-only filesystem, capabilities, and Pod Security compliance are explicit"],
    deploy: ["rendered manifests are retained and server-side dry-run/admission succeeds on the target cluster", "`kubectl diff` contains no unapproved immutable-field replacement or selector change", "image digest, signature/SBOM policy, ServiceAccount identity, Secret references, and ConfigMap revision are verified", "requests fit node pools and quota; HPA, PDB, topology spread, and surge capacity can coexist", "GitOps controller reports the expected revision and no manual drift", "rollout status, events, probe failures, EndpointSlices, and user-impact SLO are watched together", "canary rollback threshold covers 5xx, latency, restarts, OOM, and unavailable replicas", "rollback uses controller or GitOps revision and accounts for schema/config compatibility"],
    rollback: "Revert the Git revision or use `kubectl rollout undo` only when controller history and schema compatibility are verified; never patch Pods, and pause rollout before collecting failed Pod events and previous logs.",
    diagram: `flowchart TB
  Git[Git desired state] --> GitOps[GitOps reconciler]
  GitOps --> Deploy[Deployment or StatefulSet]
  Deploy --> RS[ReplicaSet or ControllerRevision]
  RS --> Pods[Pods with probes and resources]
  SA[ServiceAccount and workload identity] --> Pods
  NP[NetworkPolicy] --> Pods
  Svc[Service and EndpointSlices] --> Pods
  PDB[PDB and topology spread] -. protects .-> Pods
  HPA[HPA metrics] -. scales .-> Deploy
  Obs[Events, logs, metrics, traces] -. observes .-> Pods`,
    archRules: ["GitOps reconciliation is authoritative; emergency changes are committed back or automatically reverted.", "A controller owns every Pod and exposes rollout state.", "ServiceAccount plus cloud/workload identity grants only the Pod's required external permissions.", "Default-deny NetworkPolicy is extended with explicit caller, dependency, and DNS paths.", "Probes, requests, HPA, PDB, rollout surge, and topology spread are designed as one availability system."],
    anti: "Directly patching a production Pod bypasses controller history, GitOps convergence, rollout safety, and reproducible incident recovery.",
    governance: "Kubernetes platform governance owns admission policy, supported APIs, node/CNI/CSI baselines, namespace tenancy, workload identity, image policy, and audit-log retention.",
    sources: [["Kubernetes workloads", "https://kubernetes.io/docs/concepts/workloads/controllers/"], ["Probes", "https://kubernetes.io/docs/concepts/configuration/liveness-readiness-startup-probes/"], ["NetworkPolicy", "https://kubernetes.io/docs/concepts/services-networking/network-policies/"], ["Pod disruptions", "https://kubernetes.io/docs/concepts/workloads/pods/disruptions/"], ["Security checklist", "https://kubernetes.io/docs/concepts/security/security-checklist/"]],
  },
  postgres: {
    name: "PostgreSQL",
    unit: "schema, migration, query, index, transaction, replication path, or recovery runbook",
    invariant: "Constraints enforce invariants; actual plans justify indexes; transactions are short and consistently ordered; migrations use expand/contract.",
    version: "Capture `server_version`, client version, extensions, parameter settings, managed-service restrictions, and replica versions. SQL syntax, planner behavior, lock semantics, generated columns, replication, and extension features differ by PostgreSQL major release.",
    evidence: ["`\u005cconninfo`, `SELECT version()`, extension inventory, relevant `SHOW` settings, and topology", "`EXPLAIN (ANALYZE, BUFFERS, WAL, SETTINGS, FORMAT JSON)` from a safe representative environment", "`pg_stat_activity`, `pg_locks`, blockers, wait events, transaction age, and statement fingerprints", "schema-only dump, constraints, indexes, statistics, bloat, migration history, and table size", "WAL generation, replication slots, replay lag, backup status, restore evidence, and RPO/RTO"],
    commands: ["`psql \"$DATABASE_URL\" -X -v ON_ERROR_STOP=1`", "`psql ... -c 'SELECT version(), current_setting(''server_version_num'');'`", "`psql ... -c 'SELECT pid, state, wait_event_type, wait_event, xact_start, query FROM pg_stat_activity;'`", "`pg_dump --schema-only --no-owner --no-privileges <database> > schema.sql`", "`pg_isready -d <database>` for reachability only, not correctness"],
    failures: ["deadlock or long lock wait", "connection exhaustion or pool leak", "statement timeout from plan or blocker", "unique/FK/check constraint conflict under concurrency", "WAL, replication slot, replica lag, backup, or storage pressure"],
    review: ["primary keys, foreign keys, unique/check constraints, and nullability encode domain invariants", "migration uses expand/backfill/contract and avoids table-rewrite or long ACCESS EXCLUSIVE surprises", "index column order, predicate, include columns, and write amplification match measured queries", "query review uses representative parameters and actual buffer/WAL evidence, not estimated cost alone", "transactions acquire shared resources in one order and contain no remote calls/user think time", "pool size is budgeted across instances below server connection reserve", "retry handles serialization/deadlock by replaying the whole idempotent transaction", "roles, schema privileges, row-level security, encryption, audit, backup, and retention match data classification"],
    deploy: ["record server major, extensions, parameter constraints, table sizes, replica state, and backup/restore status", "run migration in a production-like clone and measure lock level, duration, WAL, disk, and replica lag", "use lock_timeout and statement_timeout appropriate to the migration; fail instead of blocking critical traffic", "deploy additive schema and compatible application code before backfill or contract removal", "backfill in bounded resumable batches with progress, throttling, and replica-lag guardrails", "monitor locks, connection use, deadlocks, query latency, WAL, storage, and replication during rollout", "verify constraints and statistics after backfill before enabling reads or dropping old shape", "rollback plan distinguishes reversible DDL from restore/forward-fix and protects committed data"],
    rollback: "Stop the migration runner and application feature, release locks, and revert only additive/compatible DDL; for destructive or data-rewriting steps use a tested forward fix or point-in-time recovery, never an improvised down migration.",
    diagram: `flowchart LR
  App[Application instances] --> Pool[Bounded connection pool]
  Pool --> Primary[(PostgreSQL primary)]
  Primary --> WAL[WAL stream]
  WAL --> Replica[(Read replica)]
  Migration[Expand/backfill/contract runner] --> Primary
  Backup[Base backup and WAL archive] -. restores .-> Restore[Tested restore target]
  Stats[pg_stat activity, locks, statements] -. observes .-> Primary`,
    archRules: ["Connection budgets allocate capacity among application pools, migrations, replication, and operator reserve.", "Primary constraints are authoritative for invariants under concurrency.", "Read replicas serve only workloads that tolerate measured lag.", "Migration phases are separately deployable and backfills are resumable.", "Backups are accepted only after restore and consistency verification."],
    anti: "A one-step column rename/drop on a hot table breaks mixed-version application instances and can hold an ACCESS EXCLUSIVE lock.",
    governance: "PostgreSQL governance assigns schema ownership, migration approval, privileged-role controls, extension allowlists, audit/retention policy, and regularly evidenced restore objectives.",
    sources: [["PostgreSQL documentation", "https://www.postgresql.org/docs/current/"], ["EXPLAIN", "https://www.postgresql.org/docs/current/using-explain.html"], ["Explicit locking", "https://www.postgresql.org/docs/current/explicit-locking.html"], ["Monitoring statistics", "https://www.postgresql.org/docs/current/monitoring-stats.html"], ["Backup and restore", "https://www.postgresql.org/docs/current/backup.html"]],
  },
  redis: {
    name: "Redis",
    unit: "keyspace, cache, session store, rate limiter, stream consumer, or Redis topology",
    invariant: "Every keyspace defines type, cardinality, TTL, memory policy, atomicity, durability, topology, and behavior when Redis is unavailable.",
    version: "Capture `redis_version`, mode, persistence, replication/cluster state, client library, and managed-service restrictions. Commands, ACLs, functions, eviction, and cluster behavior depend on server and client versions.",
    evidence: ["`INFO server`, `INFO memory`, `INFO persistence`, `INFO replication`, and `INFO cluster`", "`CONFIG GET` for maxmemory/policy, persistence, timeout, and output-buffer settings under approved access", "`SLOWLOG GET`, `LATENCY DOCTOR`, commandstats, keyspace stats, and sampled `MEMORY USAGE`", "key naming/type/TTL/cardinality specification plus client timeout/retry/pool settings"],
    commands: ["`redis-cli -u <redacted-uri> INFO server`", "`redis-cli -u <redacted-uri> INFO memory`", "`redis-cli -u <redacted-uri> SLOWLOG GET 20`", "`redis-cli -u <redacted-uri> LATENCY DOCTOR`", "`redis-cli -u <redacted-uri> --latency` from the application network"],
    failures: ["maxmemory/OOM or unsafe eviction", "WRONGTYPE or key-schema collision", "MOVED/ASK cluster routing mismatch", "READONLY/failover topology mismatch", "slow command, big key, fork, persistence, or network latency"],
    review: ["key format includes bounded namespace, tenant scope, schema version, and collision-safe identifier", "data type and maximum cardinality are chosen from access pattern, not convenience", "TTL and jitter prevent immortal cache data and synchronized expiry", "Lua/function/MULTI or single-command atomicity protects concurrent invariants", "cache stampede control is bounded and does not convert misses into source overload", "client uses topology-aware discovery, deadlines, bounded pool/queue, and idempotent retries", "maxmemory policy matches whether data is disposable, session-critical, or durable", "SCAN replaces KEYS; large values and O(N) commands are excluded from request paths"],
    deploy: ["record Redis/client versions, cluster topology, memory headroom, fragmentation, persistence, replication, and failover state", "estimate new key count, value size, TTL distribution, command complexity, and network bytes at peak", "load-test eviction, stampede, failover, reconnect, and source fallback behavior", "ACL categories/key patterns grant the application only its required commands and prefixes", "canary monitors used_memory, evictions, hit ratio, latency, blocked clients, replication, and errors", "stream consumer groups, pending entries, and idempotency survive rolling consumer versions", "rollback can read/delete the new key version without `FLUSH*` or broad scans", "persistent uses prove backup/restore and replica promotion according to RPO/RTO"],
    rollback: "Disable writes to the new versioned key prefix and revert clients; let disposable keys expire or delete them with bounded SCAN/UNLINK jobs—never use FLUSHDB on a shared instance.",
    diagram: `flowchart LR
  App[Application clients] --> Client[Topology-aware bounded client]
  Client --> Primary[(Redis primary or cluster slots)]
  Primary --> Replica[(Replica)]
  Sentinel[Sentinel or managed failover] -. promotes .-> Replica
  Source[(System of record)] --> App
  App --> Keys[Versioned keys with TTL and jitter]
  Keys --> Primary
  Obs[INFO, SLOWLOG, latency, memory] -. observes .-> Primary`,
    archRules: ["The system of record remains authoritative unless Redis durability is explicitly designed and tested.", "Clients are cluster/failover aware and bound commands by deadline and queue.", "Key schema versions allow coexistence and rollback.", "TTL jitter and single-flight behavior protect the source during misses.", "Memory, persistence, and eviction policies match the keyspace's data-loss contract."],
    anti: "Using unbounded values or KEYS on a shared production instance blocks Redis's command execution path and destabilizes unrelated tenants.",
    governance: "Redis governance allocates key prefixes, memory budgets, ACL patterns, persistence tiers, and noisy-neighbor controls; destructive commands require break-glass access.",
    sources: [["Redis documentation", "https://redis.io/docs/latest/"], ["Data types", "https://redis.io/docs/latest/develop/data-types/"], ["Eviction", "https://redis.io/docs/latest/develop/reference/eviction/"], ["Latency monitor", "https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/latency-monitor/"]],
  },
  mongo: {
    name: "MongoDB",
    unit: "document model, collection validator, query, aggregation, index, transaction, or shard key",
    invariant: "Documents match atomic access patterns; validators enforce shape; explain evidence drives indexes; shard keys distribute both writes and queries.",
    version: "Capture server/FCV, driver, topology, storage engine, Atlas/managed tier, and feature compatibility. Query operators, retryable writes, transactions, sharding, and index features depend on server, FCV, topology, and driver alignment.",
    evidence: ["`db.version()`, `getParameter featureCompatibilityVersion`, driver version, `hello`, and replica/shard topology", "`getCollectionInfos`, `$jsonSchema` validator, indexes, collection stats, and sampled document-size distribution", "`explain('executionStats')` including examined/returned ratio, sort/spill, and shard targeting", "replication lag, oplog window, chunk distribution, balancer, transaction, and connection-pool metrics"],
    commands: ["`mongosh '<redacted-uri>' --eval 'db.version()'`", "`db.collection.explain('executionStats').find(<representative-filter>).sort(<sort>)`", "`db.collection.getIndexes()` and `db.getCollectionInfos({name:'<collection>'})`", "`db.runCommand({collStats:'<collection>'})`", "`db.adminCommand({replSetGetStatus:1})` where topology and privileges permit"],
    failures: ["E11000 unique-index conflict", "aggregation memory/spill or blocking stage", "transaction/topology incompatibility or transient abort", "shard-key routing or hotspot failure", "server-selection, TLS, DNS, or pool timeout"],
    review: ["embed values updated/read atomically and reference independent or unbounded aggregates", "document growth remains below the BSON limit with explicit array/cardinality bounds", "`$jsonSchema` validation and application models evolve compatibly", "compound index prefix/order supports filter, sort, and projection evidence", "writes handle duplicate key and retryable/transient labels idempotently", "aggregations filter/project early and bound `$lookup`, `$group`, and sort work", "shard key has cardinality, distribution, monotonicity, targeting, and zone evidence", "transactions are reserved for cross-document invariants and remain short"],
    deploy: ["record server, FCV, driver, topology, oplog window, balancer, chunk distribution, and backups", "introduce validator changes with compatible validation level/action before enforcement", "build indexes with capacity and replication-lag monitoring; verify plans before hiding/removing old indexes", "backfill documents in resumable `_id`/shard-key ranges with throttling", "test retryable writes, failover, duplicate-key, transient transaction, and pool behavior", "monitor examined/returned ratio, spills, queues, replication lag, disk, chunks, and p99", "rollback preserves readers for both old/new document shapes and index sets", "shard-key or destructive changes have a vendor-supported migration and restore plan"],
    rollback: "Disable writers for the new schema, restore dual-shape readers, and keep additive indexes/fields until old clients are stable; do not mass-update documents back without a resumable, audited migration.",
    diagram: `flowchart TB
  Driver[Topology-aware driver and pool] --> Router[mongos or replica-set primary]
  Router --> ShardA[(Shard or replica set A)]
  Router --> ShardB[(Shard or replica set B)]
  Config[Config servers and catalog] -. routes .-> Router
  Validator[Collection JSON Schema] -. enforces .-> ShardA
  Index[Query-shaped indexes] -. supports .-> ShardA
  Balancer[Balancer and zones] -. distributes .-> ShardB
  Obs[Profiler, explain, replication metrics] -. observes .-> Router`,
    archRules: ["Driver topology discovery and pools are shared per process and bounded.", "Document aggregate boundaries contain atomic invariants and bounded arrays.", "Collection validators make schema expectations observable during evolution.", "Indexes are derived from measured query shapes and shard targeting.", "Shard zones and balancer policy align data locality and failure domains."],
    anti: "Normalizing every relation into separate collections forces joins or multi-document transactions and discards document-level atomicity.",
    governance: "MongoDB governance owns database/collection naming, validator enforcement, encryption and audit settings, shard-key approval, backup evidence, and access to profiler samples containing data.",
    sources: [["MongoDB manual", "https://www.mongodb.com/docs/manual/"], ["Data modeling", "https://www.mongodb.com/docs/manual/data-modeling/"], ["Query plans", "https://www.mongodb.com/docs/manual/core/query-plans/"], ["Sharding", "https://www.mongodb.com/docs/manual/sharding/"]],
  },
  graphql: {
    name: "GraphQL",
    unit: "schema, resolver, request DataLoader, gateway, persisted operation, or federated subgraph",
    invariant: "Schema exposes domain capabilities; authorization is enforced at trusted resolver/service boundaries; data access is batched per request; operations have resource budgets.",
    version: "Record GraphQL specification assumptions, server/framework, client, federation/directive versions, and schema registry revision. Nullability, incremental delivery, custom directives, and federation composition are implementation/version dependent.",
    evidence: ["canonical SDL, generated schema, registry/composition result, and breaking-change report", "validated operation document, variables, auth context, depth/complexity/cost, and persisted-operation ID", "resolver trace tree, per-field errors, downstream query count, DataLoader batch/cache evidence", "gateway/subgraph routing, ownership, entity representations, and schema rollout matrix"],
    commands: ["run the repository's schema generation and validation script from a clean checkout", "execute the checked-in schema compatibility/composition command against the registry baseline", "run integration tests with query counting and resolver tracing enabled", "send the exact operation with `curl -H 'content-type: application/json' --data @operation.json <endpoint>` using sanitized credentials", "capture introspection only where policy permits; production may intentionally disable ad hoc introspection"],
    failures: ["non-null propagation and partial response", "N+1 resolver fan-out", "client/schema validation drift", "interface/union runtime type resolution", "depth, complexity, alias, batch, or rate budget rejection"],
    review: ["field and type names model domain capabilities rather than database tables", "nullability communicates real absence and error propagation semantics", "schema change is additive/deprecated and validated against registered operations", "authorization is enforced for object/field access, not only at the gateway", "DataLoader is request-scoped and keys include tenant/auth dimensions", "lists require bounded pagination; depth, aliases, batches, and complexity are limited", "resolver errors use stable safe codes while internal causes remain in traces", "federated ownership, keys, entity resolution, and composition are tested across subgraph versions"],
    deploy: ["publish schema candidate and pass breaking/dangerous change plus federation composition checks", "validate persisted/registered client operations against the candidate schema", "deploy producing subgraph/resolver behavior before exposing new fields at the gateway", "load-test representative operation cost, DataLoader batching, downstream calls, and partial failures", "gateway limits depth, aliases, batches, body size, rate, and execution deadline", "resolver traces, per-field errors, operation signatures, and downstream query counts are live", "canary compares operation error/latency and subgraph fan-out by schema revision", "rollback retains schema fields while reverting resolver routing; never remove a field to roll back implementation"],
    rollback: "Route resolvers/subgraphs back to the previous implementation while leaving additive schema visible but safely unavailable/deprecated; remove schema only after registered clients no longer reference it.",
    diagram: `flowchart LR
  Client[Persisted client operation] --> Gateway[Validation, auth, cost budget]
  Gateway --> Schema[Composed schema contract]
  Schema --> Resolver[Domain resolvers]
  Resolver --> Loader[Request-scoped DataLoader]
  Loader --> Service[Domain service or data source]
  Gateway --> Subgraph[Federated subgraph]
  Registry[Schema registry and operation checks] -. gates .-> Schema
  Trace[Operation and resolver traces] -. observes .-> Resolver`,
    archRules: ["Gateway validates operation shape, identity, and cost before execution.", "Schema ownership follows domains and additive evolution.", "Resolvers remain thin authorization/orchestration boundaries.", "DataLoaders batch by datasource and request security context.", "Registry checks schema composition and known client operations before rollout."],
    anti: "Mapping every table and unrestricted relation directly into GraphQL creates authorization gaps, cyclic queries, and unbounded resolver fan-out.",
    governance: "GraphQL governance assigns type/field ownership, schema review, operation registration, cost limits, deprecation windows, and controls introspection and trace payload retention.",
    sources: [["GraphQL specification", "https://spec.graphql.org/"], ["GraphQL Learn", "https://graphql.org/learn/"], ["GraphQL response", "https://graphql.org/learn/response/"], ["OWASP GraphQL", "https://cheatsheetseries.owasp.org/cheatsheets/GraphQL_Cheat_Sheet.html"]],
  },
  microfrontends: {
    name: "Microfrontends",
    unit: "domain slice, shell contract, route, federated remote, shared package, or independent frontend release",
    invariant: "Slices follow durable business domains, integrate through versioned shell contracts, fail locally, and prove independent build and deployment.",
    version: "Capture shell, bundler/module-federation plugin, framework, router, browser targets, and deployed remote manifests. Share-scope and runtime-loading semantics depend on exact host/remote bundler versions and cannot be inferred from source alone.",
    evidence: ["domain ownership, route manifest, shell API/event contracts, and compatibility matrix", "host/remote build metadata, remote entry URL/digest, share scope, singleton/range resolution, and CSP/CORS headers", "independent test/deploy pipeline, asset cache policy, rollback manifest, and fallback behavior", "RUM segmented by shell/slice versions, route, remote-load failure, and duplicate framework/runtime cost"],
    commands: ["run each slice's immutable install, type-check, test, and production build independently", "emit and inspect webpack stats (`webpack --profile --json > stats.json`) when Module Federation is used", "request remote entry and chunks with `curl -I <immutable-asset-url>` to verify cache, CORS, CSP, and content type", "execute shell contract tests against the current and next remote manifests", "measure duplicate dependencies and route Web Vitals in the assembled production build"],
    failures: ["eager shared-module consumption or share-scope initialization", "unsatisfied singleton/range or duplicate framework runtime", "remote entry unavailable, stale, or blocked by CSP/CORS", "shell/slice route collision", "cross-slice event/state contract drift"],
    review: ["slice maps to one durable business capability and accountable team", "shell owns authentication context, navigation, layout, global error boundaries, and observability contract", "route ownership is unique and deep-link behavior is independently testable", "remote assets are immutable; runtime manifest supports health-aware fallback", "shared dependency allowlist and singleton/version policy are explicit", "cross-slice communication uses versioned events/URLs, not imported internal state", "styles, DOM IDs, storage keys, and analytics namespaces cannot collide", "slice can build, test, deploy, disable, and roll back without coordinated release"],
    deploy: ["host and remote compatibility matrix passes for current and candidate versions", "remote entry/chunks are immutable, integrity-aware where supported, and have correct cache/CORS/CSP headers", "route, authentication, navigation, analytics, and accessibility contract tests pass assembled", "failure injection proves an unavailable remote renders a bounded fallback", "RUM identifies shell, remote, and shared-dependency versions", "canary watches remote-load errors, duplicate runtime, route errors, Web Vitals, and business conversion", "manifest/feature flag can remove the slice without redeploying unaffected domains", "rollback selects the previous remote manifest while retaining shell contract compatibility"],
    rollback: "Update the runtime manifest or feature flag to the prior immutable remote asset set; keep the shell contract backward compatible until all cached tabs and remote versions age out.",
    diagram: `flowchart TB
  Browser --> Shell[Application shell]
  Shell --> Identity[Identity and session contract]
  Shell --> Router[Authoritative route manifest]
  Router --> SliceA[Domain slice A]
  Router --> SliceB[Domain slice B]
  Manifest[Versioned remote manifest] --> SliceA
  Contracts[Events, URLs, shell API] <--> SliceA
  Contracts <--> SliceB
  Boundary[Per-slice error boundary] -. contains .-> SliceA
  RUM[Versioned RUM] -. observes .-> Shell`,
    archRules: ["The shell exposes a deliberately small versioned API.", "Each slice owns complete domain UI and data orchestration behind one route boundary.", "Runtime manifests point to immutable assets and support fallback.", "Shared packages are limited to platform contracts and design primitives.", "Errors, styles, storage, events, and telemetry are namespaced by slice."],
    anti: "Splitting page widgets among teams creates chatty runtime coupling without independent domain ownership or deployability.",
    governance: "Microfrontend governance owns shell contracts, route allocation, shared-dependency policy, CSP origins, accessibility baseline, telemetry schema, and decommission windows.",
    sources: [["Module Federation", "https://webpack.js.org/concepts/module-federation/"], ["HTML custom elements", "https://html.spec.whatwg.org/multipage/custom-elements.html"], ["Micro Frontends architecture", "https://martinfowler.com/articles/micro-frontends.html"]],
  },
  "react-native": {
    name: "React Native",
    unit: "screen, navigation flow, FlatList, native module, platform adapter, or mobile release",
    invariant: "Domain logic is shared; platform behavior is explicit; native boundaries are typed; JS/UI threads and lists are measured on representative devices.",
    version: "Read React Native, React, navigation, native dependency, Gradle/AGP/Kotlin, Xcode/Swift, deployment-target, and architecture settings. Native APIs, autolinking, Metro, Hermes, and New Architecture compatibility are release-specific.",
    evidence: ["`package.json`/lockfile, Podfile/lock, Gradle catalogs/wrapper, Xcode project, and platform deployment targets", "Metro config/resolution, generated native code/autolinking state, and debug/release build settings", "JS/UI frame rates, Hermes profile, native Instruments/Perfetto trace, memory, startup, and list metrics", "screen-reader tree, focus order, dynamic text, touch target, keyboard, and platform permission behavior"],
    commands: ["`npx react-native info` and `npx react-native doctor`", "`npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output <path>` for bundle verification", "`cd android && ./gradlew lint test assembleRelease`", "`cd ios && xcodebuild -workspace <app>.xcworkspace -scheme <scheme> -configuration Release test` on approved macOS CI", "`npx react-native log-android` or platform-native logs for the reproduced build"],
    failures: ["native module missing/unlinked or architecture incompatible", "app registration/startup exception", "nested/unbounded VirtualizedList", "Metro module resolution or cache/config mismatch", "JS thread, UI thread, bridge/native boundary, or memory stall"],
    review: ["screen separates shared state from `.ios`/`.android` platform adapters", "navigation params and deep links are typed, validated, and backward compatible", "native module methods define thread, lifetime, error, and cancellation semantics", "FlatList/SectionList uses stable keys, bounded render windows, and measured item layout", "render path avoids synchronous storage, JSON, logging, or bridge-heavy loops", "permissions are requested in context and denied/restricted states are handled", "accessibility label/role/state, focus, dynamic type, touch targets, and reduced motion are tested", "release-only behavior is covered on physical representative iOS and Android devices"],
    deploy: ["React Native/native dependency compatibility and platform toolchains match CI evidence", "signed release builds, symbol/source-map artifacts, privacy manifests, permissions, and store metadata are complete", "cold/warm startup, JS/UI frame rate, memory, crash-free sessions, and bundle size meet budgets", "screen reader, keyboard/switch path, dynamic text, zoom, contrast, and reduced motion pass both platforms", "deep links, push notifications, offline/reconnect, upgrade, and persisted-state migration pass", "phased store rollout and OTA policy prevent incompatible JavaScript/native binary combinations", "crash and performance telemetry map to app, JS bundle, native build, OS, and device", "rollback distinguishes store binary rollback from OTA bundle rollback and persisted-data compatibility"],
    rollback: "Stop phased rollout or select the previous OTA bundle only when its native-module ABI matches installed binaries; otherwise ship a corrective store build and preserve migrated local data.",
    diagram: `flowchart TB
  Screen[React Native screen] --> Hooks[Shared domain Hooks]
  Hooks --> Adapter[Typed platform adapter]
  Adapter --> IOS[iOS native module]
  Adapter --> Android[Android native module]
  Screen --> Nav[Navigation and deep links]
  Screen --> List[Virtualized lists]
  JS[Hermes JS thread] <--> Native[UI and native threads]
  Telemetry[Crash, startup, frame, memory] -. observes .-> JS`,
    archRules: ["Screens compose shared domain hooks and platform-neutral design primitives.", "Platform adapters isolate genuine OS behavior and permissions.", "Native module contracts specify threads, ownership, errors, and ABI/version compatibility.", "Navigation and persisted state have explicit migration contracts.", "Performance is profiled in release mode on physical devices."],
    anti: "Scattering `Platform.OS` branches through domain logic creates two untestable applications hidden in one source tree.",
    governance: "React Native governance aligns JS/native dependency matrices, signing, store roles, OTA policy, privacy declarations, device support, accessibility evidence, and crash-symbol retention.",
    sources: [["React Native documentation", "https://reactnative.dev/docs/getting-started"], ["Performance", "https://reactnative.dev/docs/performance"], ["Native platform", "https://reactnative.dev/docs/native-platform"], ["Accessibility", "https://reactnative.dev/docs/accessibility"]],
  },
  performance: {
    name: "Performance Engineering",
    unit: "SLO, workload model, benchmark, profile, capacity plan, Web Vital budget, or regression gate",
    invariant: "Optimization starts from a reproducible workload and user-impact metric; profiles identify the limiting resource; CI and production enforce budgets.",
    version: "Record hardware, OS/kernel, runtime/browser, build mode, dependency versions, dataset, network shaping, cache state, and measurement tool version. Results from different environments or metric definitions are not comparable.",
    evidence: ["SLI/SLO definition, histogram boundaries, trace sampling, RUM attribution, and business-impact cohort", "workload script, request/data distribution, concurrency/arrival model, warmup, repetitions, and raw results", "CPU, allocation/heap, I/O, lock, network, database, and browser trace aligned to one run", "baseline/candidate confidence, effect size, noise controls, capacity saturation, and cost per operation"],
    commands: ["run the repository's load test with a versioned scenario and export raw results", "`npx lighthouse <url> --output=json --output-path=lighthouse.json` for controlled web lab evidence", "`node --prof` / JFR / `dotnet-trace` / `py-spy` only when matching the measured runtime", "capture Chrome DevTools Performance trace with production build and defined network/CPU conditions", "query production histograms and traces by release/cohort; never average percentiles"],
    failures: ["tail latency hidden by averages", "benchmark/production workload mismatch", "CPU, event-loop, thread-pool, or lock saturation", "heap retention, allocation pressure, or GC pause", "LCP, INP, or CLS field regression"],
    review: ["target metric maps to a named user journey and SLO", "baseline and candidate use identical build, hardware, data, cache, and load conditions", "arrival rate/concurrency and payload distribution come from production evidence", "warmup, repetition, outlier policy, raw samples, and statistical uncertainty are reported", "profile covers the slow interval and attributes work to code/resources", "optimization does not trade correctness, security, accessibility, or another SLI silently", "budgets are enforced at component, route, service, database, and cost boundaries", "production RUM/telemetry confirms the same cohort-level improvement"],
    deploy: ["release artifact is identical to the profiled candidate and source maps/symbols are retained", "CI budgets pass for bundle, startup, query, allocation, throughput, and latency metrics relevant to the change", "capacity model includes peak, failure-mode headroom, autoscaling delay, and downstream quotas", "canary compares histograms—not averaged percentiles—by release and workload cohort", "RUM checks p75 Web Vitals by device, geography, route, and connection where applicable", "saturation, queueing, retries, cache hit, GC, and cost per operation remain inside guardrails", "automatic rollback uses user-impact plus error signals, not one noisy synthetic sample", "post-rollout window covers cache warmup, autoscaling, periodic jobs, and peak traffic"],
    rollback: "Shift traffic or artifact to the measured baseline when user-impact guardrails regress; retain candidate telemetry and profiles so rollback does not erase causal evidence.",
    diagram: `flowchart LR
  Journey[Critical user journey] --> SLI[SLI histogram or Web Vital]
  SLI --> SLO[SLO and error budget]
  Workload[Versioned workload model] --> Baseline[Baseline benchmark]
  Workload --> Candidate[Candidate benchmark]
  Baseline --> Compare[Statistical comparison]
  Candidate --> Compare
  Profile[CPU, memory, I/O, trace] --> Candidate
  Compare --> Gate[CI and canary budget]
  RUM[Production RUM/APM] --> Gate`,
    archRules: ["User journeys define SLIs and budgets before code optimization.", "Workload models are versioned artifacts derived from production distributions.", "Profiles and benchmark samples are captured from the same run.", "CI catches deterministic regressions; canaries catch environment-dependent impact.", "Capacity and cost are first-class outputs alongside latency."],
    anti: "Optimizing a local microbenchmark without production distribution or profile evidence moves code while leaving the system bottleneck unchanged.",
    governance: "Performance governance standardizes metric definitions, benchmark hardware, raw-result retention, RUM privacy, SLO ownership, exception expiry, and capacity-review cadence.",
    sources: [["Web Vitals", "https://web.dev/articles/vitals"], ["Chrome performance", "https://developer.chrome.com/docs/devtools/performance/"], ["OpenTelemetry", "https://opentelemetry.io/docs/"], ["Google SRE monitoring", "https://sre.google/sre-book/monitoring-distributed-systems/"]],
  },
  accessibility: {
    name: "Accessibility Engineering",
    unit: "semantic component, keyboard flow, focus transition, WCAG audit, remediation, or conformance release",
    invariant: "Native semantics come first; every operation is keyboard-complete; focus is deterministic; assistive-technology testing supplements automated WCAG checks.",
    version: "Record the conformance target (for example WCAG 2.2 level), browser/OS/screen-reader matrix, design-system version, and audit-tool version. ARIA support differs by browser and assistive technology; APG examples are patterns, not automatic conformance.",
    evidence: ["semantic DOM and accessibility tree showing computed name, role, value, state, relationships, and landmarks", "keyboard sequence with visible focus, modal entry/escape/return, route focus, and error focus behavior", "screen-reader transcript across the supported browser/AT matrix", "automated scan results plus manual WCAG mapping, zoom/reflow, contrast, reduced-motion, and forced-colors evidence", "Accessibility Conformance Report/VPAT claims, defects, exceptions, owner, and retest date"],
    commands: ["run the repository's accessibility test suite (for example `npx playwright test tests/accessibility`) using the checked-in tool versions", "run the project's configured axe integration and retain rule IDs, target selectors, and reviewed false positives", "use browser accessibility-tree inspection for name/role/state evidence", "test at 200% text resize and 400% browser zoom/reflow at the target viewport", "execute the documented NVDA/JAWS/VoiceOver/TalkBack manual script; no CLI substitutes for this evidence"],
    failures: ["missing or incorrect accessible name/description", "focus lost, trapped, obscured, or returned incorrectly", "ARIA role/state/value diverges from interaction", "contrast, non-text contrast, reflow, text spacing, or target-size failure", "dynamic status/error not announced or announced excessively"],
    review: ["native element is used unless a custom interaction has a documented semantic need", "computed name, role, state, value, description, and relationships match visible behavior", "all operations work by keyboard with logical order and visible unobscured focus", "dialogs, menus, routes, validation, deletion, and async updates define focus movement/return", "headings, landmarks, lists, tables, labels, instructions, and errors preserve structure", "text/non-text contrast, color independence, target size, text spacing, zoom/reflow, forced colors, and reduced motion are verified", "media has captions/transcript/audio-description policy and controls are operable", "automated findings are triaged and manual screen-reader results cover the critical path"],
    deploy: ["automated accessibility regression passes with no unreviewed serious/critical rule failures", "critical flows pass keyboard-only operation including focus visibility, traps, escape, and return", "supported NVDA/JAWS/VoiceOver/TalkBack browser matrix completes the scripted smoke path", "200% text resize and 400% zoom/reflow preserve content and operation without two-dimensional scrolling except allowed content", "text and non-text contrast, color independence, forced colors, and focus indicators match tokens", "prefers-reduced-motion removes non-essential motion and does not remove information", "new WCAG mappings, manual evidence, defects, and exceptions update the ACR/VPAT evidence set", "production accessibility monitoring samples templates/components and rollback can disable the offending UI"],
    rollback: "Disable the changed component or restore the previous accessible implementation through a feature flag; do not roll back content/data changes in a way that removes labels, alternatives, or user progress.",
    diagram: `flowchart TB
  Design[Accessible design tokens and interaction spec] --> Primitive[Semantic design-system primitives]
  Primitive --> Feature[Product flow composition]
  Feature --> DOM[DOM and accessibility tree]
  DOM --> Keyboard[Keyboard, focus, zoom, reflow]
  DOM --> AT[Screen-reader and assistive-tech matrix]
  Auto[Automated WCAG regression] --> Gate[Release evidence gate]
  Keyboard --> Gate
  AT --> Gate
  ACR[ACR or VPAT evidence] <--> Gate`,
    archRules: ["Design tokens encode contrast, focus, target, motion, and forced-color behavior.", "Semantic primitives own name/role/state and complex-widget keyboard models.", "Product flows own focus transitions, errors, status announcements, and reading order.", "Automated checks run continuously; manual AT scripts gate critical journeys.", "Conformance claims link to versioned evidence and open exceptions."],
    anti: "Adding arbitrary ARIA to a non-semantic clickable element creates a role without the keyboard, focus, state, and platform behavior users require.",
    governance: "Accessibility governance owns the WCAG target, supported AT matrix, design-system primitives, exception expiry, user-testing participation, procurement requirements, and ACR/VPAT evidence.",
    sources: [["WCAG 2.2", "https://www.w3.org/TR/WCAG22/"], ["WAI-ARIA APG", "https://www.w3.org/WAI/ARIA/apg/"], ["ARIA 1.2", "https://www.w3.org/TR/wai-aria-1.2/"], ["WCAG evaluation methodology", "https://www.w3.org/TR/WCAG-EM/"]],
  },
};

function escapeXml(text) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function bullets(values) {
  return values.map((value) => `- ${value}`).join("\n");
}

function checks(values) {
  return values.map((value) => `- [ ] ${value}.`).join("\n");
}

function numbered(values) {
  return values.map((value, index) => `${index + 1}. ${value}`).join("\n");
}

function official(t) {
  return t.sources.map(([label, url]) => `- [${label}](${url})`).join("\n");
}

function standard(t, tradeoff, anti = t.anti) {
  return `## Tradeoffs

${tradeoff}

## Anti-patterns

- ${anti}
- Do not remove a native warning, validator, policy, or safety limit merely to make generated output pass.
- Do not claim a successful result without preserving the command, target, artifact/revision, and observed output.

## Enterprise considerations

${t.governance}

## Official sources

${official(t)}
`;
}

function version(t) {
  return `## Version-aware caution

${t.version}
`;
}

function readExistingErrors(slug) {
  const file = path.join(root, slug, "debug-workflows", "common-errors.md");
  const text = fs.readFileSync(file, "utf8");
  const rows = [...text.matchAll(/^\| `([^`]+)` \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gm)];
  if (rows.length !== 5) throw new Error(`${slug}: expected five existing error rows, found ${rows.length}`);
  return rows.map((match) => ({ symptom: match[1].trim(), cause: match[2].trim(), repair: match[3].trim(), evidence: match[4].trim() }));
}

function readme(slug, t) {
  return `# ${t.name} Cookbook

> Version: 1.1.0 | Updated: ${date}

## Purpose

Operate AI-assisted changes to a ${t.unit} using ${t.name}'s native contracts, commands, failure evidence, architecture, and rollback mechanisms.

## Why

${t.invariant} Generic software advice cannot verify that invariant because the decisive evidence lives in ${t.evidence.slice(0, 3).join("; ")}.

## How

1. Supply the evidence below to the matching XML prompt.
2. Execute the skill's native workflow rather than accepting prose-only output.
3. Use the error workflow to classify observed failure before changing state.
4. Preserve architecture boundaries in \`architecture/patterns.md\`.
5. Block review or release on any unchecked technology gate.

## Required evidence

${bullets(t.evidence)}

## Native verification

${bullets(t.commands)}

${version(t)}
${standard(t, `This cookbook requires deeper ${t.name} evidence and specialist review than a generic template. The additional work buys reproducible diagnostics and a rollback that respects ${t.unit} state.`)}
## Checklist

${checks([
  "Installed/deployed version and target environment are recorded",
  "Native commands are selected from repository and platform evidence",
  "Failure classes and rollback boundary are explicit",
  "Official sources are checked for the recorded version",
  "No prompt variable remains unresolved",
])}

## Changelog

- 1.1.0 (${date}): Replaced cloned guidance with technology-native evidence, commands, architecture, and rollback.
- 1.0.0 (${date}): Added initial cookbook.
`;
}

function promptDoc(slug, t, kind) {
  const specifics = {
    generate: {
      purpose: `Generate a production-ready ${t.unit} from repository and runtime evidence.`,
      instructions: [
        `Extract the installed/deployed version and state how it constrains the design: ${t.version}`,
        `Preserve this ${t.name} invariant: ${t.invariant}`,
        `Design against these failure classes: ${t.failures.join("; ")}.`,
        `Produce configuration and tests that satisfy these review gates: ${t.review.join("; ")}.`,
        `Use only commands proven available by repository/platform evidence; propose this native sequence: ${t.commands.join("; ")}.`,
        `Define rollout and rollback exactly: ${t.rollback}`,
      ],
      output: "Return sections: Version evidence; Design and native configuration; Complete changed files; Tests; Native command plan with expected signals; Failure handling; Rollout; Rollback; Official-source mapping; Blockers.",
      tradeoff: `The prompt rejects fast code generation when ${t.name} version, configuration, or target evidence is absent. That delay prevents plausible output from crossing an unsupported ${t.unit} boundary.`,
    },
    review: {
      purpose: `Review a ${t.name} change using native configuration, failure, and operational evidence.`,
      instructions: [
        "Reconstruct the exact version, target, changed resources/contracts, and rollback boundary from evidence.",
        `Check every technology gate: ${t.review.join("; ")}.`,
        `Inspect these failure classes explicitly: ${t.failures.join("; ")}.`,
        `Require relevant native outputs from: ${t.commands.join("; ")}.`,
        "Report only findings with file/resource location, violated invariant, production impact, and a deterministic verification.",
        `Block release when rollback is not credible: ${t.rollback}`,
      ],
      output: "Return severity-ordered findings with location, native evidence, impact, required correction, and verification command. Then return version cautions, missing evidence, rollback assessment, and SHIP/BLOCK.",
      tradeoff: `${t.name} review takes longer because configuration and runtime state must be correlated with source. It eliminates generic style findings and prioritizes defects that can change production behavior.`,
    },
    debug: {
      purpose: `Diagnose a ${t.name} incident by testing platform-specific failure classes before mutation.`,
      instructions: [
        `Classify the symptom into: ${t.failures.join("; ")}.`,
        `Capture these artifacts before restart, failover, cache clear, or rollback: ${t.evidence.join("; ")}.`,
        `Select minimally invasive diagnostics from: ${t.commands.join("; ")}.`,
        "For each hypothesis, name the exact observation that would confirm and falsify it.",
        "Separate immediate containment from root-cause correction and do not destroy forensic state.",
        `Use this rollback boundary: ${t.rollback}`,
      ],
      output: "Return: Platform/version state; Failure-class decision tree; Evidence table; Ranked hypotheses with confirm/falsify tests; Native commands; Root cause; Containment; Permanent correction; Rollback; Recovery signals; Prevention.",
      tradeoff: `Evidence capture can extend time to first intervention, but it prevents a restart or rollback from erasing the ${t.name} state needed to distinguish ${t.failures.slice(0, 3).join(", ")}.`,
    },
  }[kind];
  return `# ${t.name} ${kind[0].toUpperCase()}${kind.slice(1)} Prompt

> Version: 1.1.0 | Updated: ${date}

## Purpose

${specifics.purpose}

## Why

${t.invariant} This prompt requires native ${t.name} artifacts instead of substituting a generic incident or code-generation checklist.

## How

Resolve every XML variable with sanitized evidence. Use \`{{NOT_AVAILABLE: reason}}\` only when the missing artifact is explicitly returned as a blocker.

\`\`\`xml
<role>
You are the accountable principal ${escapeXml(t.name)} engineer for a ${escapeXml(t.unit)}. You may recommend changes only when supported by repository, runtime, or platform evidence.
</role>
<context>
  <installed_and_target_versions>{{INSTALLED_AND_TARGET_VERSIONS}}</installed_and_target_versions>
  <native_configuration>{{NATIVE_CONFIGURATION}}</native_configuration>
  <change_or_symptom>{{CHANGE_OR_SYMPTOM}}</change_or_symptom>
  <relevant_source_and_manifests>{{RELEVANT_SOURCE_AND_MANIFESTS}}</relevant_source_and_manifests>
  <native_command_output>{{NATIVE_COMMAND_OUTPUT}}</native_command_output>
  <runtime_logs_metrics_traces>{{RUNTIME_LOGS_METRICS_TRACES}}</runtime_logs_metrics_traces>
  <topology_data_classification_slo>{{TOPOLOGY_DATA_CLASSIFICATION_SLO}}</topology_data_classification_slo>
  <rollout_and_rollback_constraints>{{ROLLOUT_AND_ROLLBACK_CONSTRAINTS}}</rollout_and_rollback_constraints>
</context>
<instructions>
  <scratchpad>
  Privately compare the evidence with ${escapeXml(t.name)} invariants, failure classes, version constraints, and rollback semantics. Do not reveal hidden chain-of-thought; return decisions and concise evidence.
  </scratchpad>
  ${specifics.instructions.map((line, index) => `<step index="${index + 1}">${escapeXml(line)}</step>`).join("\n  ")}
</instructions>
<output_format>
${escapeXml(specifics.output)}
</output_format>
<constraints>
  <constraint>Do not invent a version, API, command, resource state, test result, or official citation.</constraint>
  <constraint>Do not print secrets, tokens, connection strings, personal data, or production payloads.</constraint>
  <constraint>Do not suppress ${escapeXml(t.name)} validators, policy, type checks, health signals, or safety limits.</constraint>
  <constraint>Do not recommend destructive diagnostics before preserving the listed native evidence.</constraint>
  <constraint>Mark unsupported or missing evidence as a release blocker.</constraint>
</constraints>
\`\`\`

${version(t)}
${standard(t, specifics.tradeoff)}
## Checklist

${checks([
  `${t.name} version and topology are explicit`,
  "Native configuration and command output are attached",
  `All ${t.failures.length} named failure classes were considered`,
  "Rollback preserves state and mixed-version compatibility",
  "Output maps decisions to official sources",
])}

## Changelog

- 1.1.0 (${date}): Rebuilt as a ${t.name}-specific ${kind} prompt.
- 1.0.0 (${date}): Added initial prompt.
`;
}

function skill(slug, t) {
  return `# ${t.name} Production Skill

> Version: 1.1.0 | Updated: ${date}

## Purpose

Execute a repeatable ${t.name} change or diagnosis for a ${t.unit}, including native evidence, validation, rollout, and rollback.

## Trigger

Activate when source, manifests, runtime configuration, topology, data contracts, or operating behavior for ${t.name} can change. Do not activate for a name-only documentation edit.

## Why

${t.invariant} The skill terminates only on ${t.name} evidence, not an agent's confidence.

## How

1. **Fingerprint the target.** Capture ${t.evidence.slice(0, 2).join(" and ")}.
2. **Select the boundary.** Name the changed ${t.unit}, its owner, trust/data boundary, SLO, and mixed-version window.
3. **Establish failure hypotheses.** Cover ${t.failures.join("; ")}.
4. **Preserve evidence.** Collect the remaining artifacts before any destructive action: ${t.evidence.slice(2).join("; ")}.
5. **Apply the smallest coherent change.** Satisfy the architecture rules and keep rollback compatible.
6. **Run native verification in repository order.**

${numbered(t.commands)}

7. **Apply review gates.**

${checks(t.review)}

8. **Roll out and observe.** Use the deployment checklist and stop on its native health thresholds.
9. **Rollback when required.** ${t.rollback}

## Verification

The evidence packet must identify command, target, UTC time, artifact/revision, exit status, and observed signal. For manual checks, record environment, operator, exact steps, and result.

## Failure recovery

- A missing version or target fingerprint blocks mutation.
- A native validator failure is corrected at its causal source; it is not disabled.
- An unreproducible symptom triggers better ${t.name} telemetry before speculative repair.
- A destructive operation requires backup/restore or state-recovery evidence appropriate to the platform.
- A rollback incompatibility changes the plan to containment and forward fix.

## Communication protocol

Report the ${t.name} boundary, facts, hypotheses, commands actually run, changed artifacts, rollout state, rollback readiness, and residual risk. Never present a proposed command as executed.

## Termination criteria

Finish when native validation, all applicable review/deployment gates, and recovery signals pass, or when a named owner accepts a documented blocker through the repository's risk process.

${version(t)}
${standard(t, `This skill spends time fingerprinting ${t.name} and collecting native evidence before editing. It reduces throughput for trivial changes but prevents incorrect commands, unsupported APIs, and state-destructive rollback.`)}
## Checklist

${checks([
  "Trigger and owned boundary are identified",
  "Version, topology, and native configuration are captured",
  "Commands and manual checks retain evidence",
  "Rollout health and rollback threshold are explicit",
  "No validator or policy was bypassed",
])}

## Changelog

- 1.1.0 (${date}): Added platform-native procedure, commands, evidence, and rollback.
- 1.0.0 (${date}): Added initial skill.
`;
}

function debugWorkflow(slug, t, errors) {
  const rows = errors.map((e, index) => `| ${index + 1} | \`${e.symptom}\` | ${e.cause} | ${t.failures[index]} |`).join("\n");
  const details = errors.map((e, index) => `### ${index + 1}. \`${e.symptom}\`

**Failure class:** ${t.failures[index]}.

**Preserve first:** ${t.evidence[index % t.evidence.length]}.

**Discriminate:** ${e.evidence}. Correlate the observation to the exact target, revision, request/job, and UTC interval; compare with one healthy peer or baseline.

**Native action:** ${t.commands[index % t.commands.length]}. Start read-only or dry-run. Narrow scope before any operation that changes process, topology, cache, schema, traffic, or data.

**Root-cause direction:** ${e.cause}

**Correction:** ${e.repair}

**Recovery proof:** Re-run the failed operation, verify the causal native signal cleared, verify the intended result, and observe the relevant error/saturation metric through one complete workload or rollout window.

**Rollback boundary:** ${t.rollback}
`).join("\n");
  return `# ${t.name} Common Error Workflow

> Version: 1.1.0 | Updated: ${date}

## Purpose

Diagnose five recurrent ${t.name} failure classes without erasing the platform state needed to prove root cause.

## Why

${t.invariant} These errors often share surface symptoms, so the workflow requires native evidence and a discriminating test before repair.

## How

1. Fingerprint version, target, topology, revision, and UTC incident interval.
2. Preserve the named evidence before restart, failover, eviction, cache clear, redeploy, or rollback.
3. Use the table to select one failure class; do not run every command indiscriminately.
4. Test the smallest read-only hypothesis, then contain user impact.
5. Correct the causal configuration/code and retain recovery evidence.

| # | Symptom | Most likely cause | Failure class |
|---:|---|---|---|
${rows}

${details}
${version(t)}
${standard(t, `Native evidence collection may delay a quick restart, but it distinguishes ${t.failures.join(", ")} and prevents recurring incidents hidden by state reset.`)}
## Checklist

${checks([
  "Target fingerprint and incident interval are recorded",
  "Pre-mutation evidence is preserved",
  "One failure class is supported by confirm/falsify observations",
  "Correction addresses the causal native signal",
  "Recovery and rollback evidence are attached",
])}

## Changelog

- 1.1.0 (${date}): Added native commands, version cautions, discriminating evidence, and per-error rollback.
- 1.0.0 (${date}): Added initial workflow.
`;
}

function architecture(slug, t) {
  return `# ${t.name} Architecture Patterns

> Version: 1.1.0 | Updated: ${date}

## Purpose

Define the production components, control paths, state boundaries, and failure containment for ${t.unit}.

## Why

${t.invariant} The diagram models actual ${t.name} platform elements so reviewers can identify ownership and unsafe coupling.

## How

\`\`\`mermaid
${t.diagram}
\`\`\`

### Required boundaries

${numbered(t.archRules)}

### Operational evidence

${bullets(t.evidence)}

### Rollback path

${t.rollback}

${version(t)}
${standard(t, `The architecture introduces explicit ${t.name} boundaries and operational artifacts that require ownership. In return, failures in ${t.failures.join(", ")} become observable and containable.`)}
## Checklist

${checks([
  ...t.archRules,
  "Diagram matches deployed topology rather than an aspirational target",
  "Rollback path preserves state and mixed-version contracts",
])}

## Changelog

- 1.1.0 (${date}): Replaced generic adapter diagram with native ${t.name} architecture.
- 1.0.0 (${date}): Added initial pattern.
`;
}

function checklistDoc(slug, t, deploy) {
  const title = deploy ? "Deployment Checklist" : "Code Review Checklist";
  const items = deploy ? t.deploy : t.review;
  const why = deploy
    ? `A syntactically valid ${t.name} artifact can still fail because of ${t.failures.join(", ")}. Promotion therefore requires target-state and rollback evidence.`
    : `${t.name} correctness depends on source plus ${t.evidence.slice(0, 3).join("; ")}. Diff-only review is insufficient.`;
  const how = deploy
    ? `Run against the exact target and immutable candidate. Preserve outputs from ${t.commands.join("; ")}. Stop promotion on any failed item.`
    : `Review the change with its target/version fingerprint, then execute applicable native commands: ${t.commands.join("; ")}. Findings must identify the violated ${t.name} invariant.`;
  return `# ${t.name} ${title}

> Version: 1.1.0 | Updated: ${date}

## Purpose

${deploy ? `Gate promotion and rollback of a ${t.name} ${t.unit}.` : `Gate correctness, security, operability, and maintainability of a ${t.name} ${t.unit}.`}

## Why

${why}

## How

${how}

${version(t)}
${standard(t, deploy
    ? `The ${t.name} deployment gate adds manual and target-environment checks that slow promotion. It reduces the chance that version, topology, state, or rollback assumptions reach production.`
    : `The ${t.name} review gate requires runtime/configuration evidence beyond a source diff. It increases reviewer effort but catches defects static style review cannot observe.`)}
## Checklist

${checks(items)}
- [ ] ${t.rollback}
- [ ] Evidence identifies version, target, artifact/revision, command or manual method, UTC time, and result.

## Changelog

- 1.1.0 (${date}): Replaced generic gates with native ${t.name} evidence and failure controls.
- 1.0.0 (${date}): Added initial checklist.
`;
}

for (const [slug, t] of Object.entries(data)) {
  const errors = readExistingErrors(slug);
  const files = {
    "README.md": readme(slug, t),
    "prompts/generate.prompt.md": promptDoc(slug, t, "generate"),
    "prompts/review.prompt.md": promptDoc(slug, t, "review"),
    "prompts/debug.prompt.md": promptDoc(slug, t, "debug"),
    [`skills/${slug}.skill.md`]: skill(slug, t),
    "debug-workflows/common-errors.md": debugWorkflow(slug, t, errors),
    "architecture/patterns.md": architecture(slug, t),
    "checklists/code-review.md": checklistDoc(slug, t, false),
    "checklists/deployment.md": checklistDoc(slug, t, true),
  };
  for (const [relative, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(root, slug, relative), content.trim() + "\n", "utf8");
  }
}
