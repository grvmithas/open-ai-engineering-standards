# Enhance Repo to Match Conventions

> **AIDLC prompt** · Run after `create-aies-kit` install · Makes the harness production-ready for *this* repository  
> **Version:** 2.1 | **Updated:** 2026-11-06

---

## How to invoke

The kit installs this prompt as a native command for your runtime:

| Runtime | Invoke |
|-----|------------------------|
| **Cursor** | `/enhance-repo` (from `.cursor/commands/enhance-repo.md`) |
| **Claude Code** | `/enhance-repo` (from `.claude/commands/enhance-repo.md`) |
| **GitHub Copilot** | `/enhance-repo` (from `.github/prompts/enhance-repo.prompt.md`) |
| **Gemini CLI** | `/aies:enhance-repo` (from `.gemini/commands/aies/enhance-repo.toml`) |
| **opencode** | `/enhance-repo` (from `.opencode/commands/enhance-repo.md`) |
| **Devin Desktop (Windsurf)** | `/enhance-repo` skill (from `.devin/skills/enhance-repo/SKILL.md`) |
| **Kiro** | `#aies-enhance-repo` steering (from `.kiro/steering/aies-enhance-repo.md`) |
| **Codex / Continue** | Attach `prompts/enhance-repo.md` (Codex) or `.continue/prompts/enhance-repo.prompt` and say "execute this against the repository" |

CLI prep (refresh MCP recommendations from signals):

```bash
npx @grvmithas/create-aies-kit enhance
```

Then run the chat invocation above.

---

```xml
<role>
You are a principal AI engineer adapting an AIES harness to an existing product repository.
You invent nothing that contradicts repo conventions. You enhance installed artifacts so a developer can start AI-assisted delivery immediately — frontend and backend.
</role>

<context>
An AIES kit was installed (no `.aies/` folder).
Root has: `AIES.md`, `AGENTS.md` (canonical instructions), the runtime rules file (`CLAUDE.md` importing `@AGENTS.md`, `.cursor/rules/aies.mdc`, `.github/copilot-instructions.md`, …), `implementation_plan.md` (ephemeral-plan index), `MODEL_POLICY.md`, `.agents/skills/`, `plans/` (incl. `_TASK_CONTRACT.md`), `reviews/`, `hooks/aies-guard.mjs`, `scripts/aies-worktree.mjs`, `cookbook/`, `guides/`, `mcps/`, `templates/`.
Runtime folders hold native commands, subagents, hook config, and an empty MCP config.
Your job: extract *this* repo's real guardrails, then rewrite/extend harness artifacts to match — including good practices to keep and bad practices to ban.
</context>

<scratchpad>
List before editing:
1. Package managers, lockfiles, runtimes, frameworks (FE + BE)
2. Exact lint/format/typecheck/test/build commands from package.json / Makefile / pyproject / pom / build.gradle / Directory.Build.props
3. Config files found: eslint, prettier, biome, oxlint, stylelint, editorconfig, tsconfig, ruff, black, flake8, mypy, pylint, checkstyle, spotbugs, editorconfig, .editorconfig, style guides under docs/
4. CI workflows and required checks
5. Auth, data stores, API style (REST/GraphQL/gRPC), migration tools
6. Existing AI rules and conflicts with AIES install
7. Candidate good practices (keep) vs anti-patterns (ban in CLAUDE.md / AGENTS.md)
</scratchpad>

<instructions>
1. **Scan first** (read-only — do not edit yet). Collect concrete paths and command strings:
   ### Toolchain
   - Lockfiles: package-lock.json, pnpm-lock.yaml, yarn.lock, poetry.lock, Pipfile.lock, go.sum, Cargo.lock, packages.lock.json
   - Manifests: package.json scripts, pyproject.toml, requirements*.txt, go.mod, pom.xml, build.gradle*, *.csproj, Makefile, Taskfile
   - Runtime: Node/Python/Java/.NET versions from engines, .nvmrc, .python-version, runtime.txt, Docker base images

   ### Guardrails (must respect — never weaken)
   - Lint/format: eslint*, prettier*, biome.json, .oxlintrc*, stylelint*, .editorconfig, ruff.toml, .flake8, setup.cfg, mypy.ini, checkstyle.xml, .editorconfig
   - Types: tsconfig*.json, jsconfig.json, pyrightconfig.json
   - Tests: jest/vitest/pytest/junit config; coverage thresholds if present
   - CI: .github/workflows/*, azure-pipelines*, .gitlab-ci.yml, Jenkinsfile — note required jobs
   - Security: CODEOWNERS, dependabot, secret scanning configs, SAST settings
   - Style guides: CONTRIBUTING.md, docs/style*, ADR folders, architecture decision records

   ### Architecture signals
   - App layout (app/, src/, packages/, services/, apps/, backend/, api/, libs/)
   - API contracts (OpenAPI, GraphQL schema, proto)
   - Data: prisma, drizzle, typeorm, sqlalchemy, flyway, liquibase, ef migrations
   - Infra: Dockerfile*, compose*, helm/, terraform/, pulumi/
   - Frontend specifics: Next/React Router, state libs, CSS system
   - Backend specifics: Nest/Express/FastAPI/Spring/.NET controllers, auth middleware, validation libs

   ### AI harness already present
   - `AGENTS.md`, `CLAUDE.md`, `.cursor/rules`, `.github/copilot-instructions.md`, `.github/instructions/`, `GEMINI.md`, `.kiro/steering`, `.devin/rules` / `.windsurf/rules`, `.continue/rules`
   - Conflicting instructions to reconcile (prefer stricter + repo-native commands)

2. **Classify practices** into two lists with file evidence:
   - **Keep (good):** naming, folder boundaries, lint as CI gate, typed APIs, migration discipline, test layout
   - **Ban (bad):** bypassing lint, committing secrets, editing generated code, silent plan expansion, write MCP by default, weakening tsconfig strictness, skipping migrations

3. **Write or update** (create files only when needed):
   - `AIES.md` — repo-specific commands, enhance invoke line for this IDE, ephemeral plan naming, hooks paths
   - `AGENTS.md` — inject Keep/Ban lists + exact verify commands from this repo (single source; keep under 300 lines)
   - Runtime rules file (`CLAUDE.md`, `.cursor/rules/aies.mdc`, `.github/copilot-instructions.md`, …) — tool-specific deltas only; never duplicate `AGENTS.md`
   - `hooks/aies-guard.rules.json` — add deny rules for this repo's destructive commands (prod deploy scripts, DB reset tasks)
   - `MODEL_POLICY.md` — align data class with detected secrets/PII handling
   - `plans/README.md` + ensure template exists — reinforce ephemeral story_id naming
   - `reviews/README.md` — code review report naming `{STORY_ID}-code-review.md`
   - `hooks/` — ensure agent hooks are documented; wire evidence env vars to this repo's verify commands in `hooks/README.md` operator notes
   - MCP: refresh `_aiesRecommended` for detected Docker/Postgres/Playwright/etc.; keep `mcpServers` empty
   - Stack cookbook under `cookbook/{stack}/` — add a short `REPO_NOTES.md` pointing at real paths/commands in *this* repo (do not duplicate the whole cookbook)
   - Add missing skills/prompts/agents only via create-* prompts when a clear gap exists

4. **Ephemeral work artifacts**
   - Do **not** turn root `implementation_plan.md` into a permanent living document.
   - Teach: active work uses `plans/{STORY_ID}-plan.md` and `reviews/{STORY_ID}-code-review.md`; attach to PR; delete/archive after merge.
   - Optionally add gitignore suggestions for `plans/*-plan.md` and `reviews/*-code-review.md` if the team wants local-only drafts (keep README.md tracked).

5. **Evidence**: PR-ready summary of every file changed and why.

6. **Stop conditions**: do not enable write MCP; do not commit secrets; do not rewrite application business logic unless asked; do not relax lint/typecheck rules.
</instructions>

<output_format>
1. Scan report — toolchain, guardrail files (paths), CI gates, FE/BE layout
2. Keep vs Ban table (with evidence paths)
3. File change list
4. Patched files (full content for small files; unified diffs for large)
5. Exact human next steps:
   - enhance already done → create `plans/{STORY_ID}-plan.md`
   - invoke coding prompt with plan attached
   - run repo verify commands
   - write `reviews/{STORY_ID}-code-review.md` before merge
</output_format>

<constraints>
- Prefer editing installed AIES artifacts over inventing parallel dialects
- Match existing formatter/linter/test/typecheck commands **exactly** (copy from manifests)
- Never recommend `eslint --fix` / format as a way to hide review findings without human intent
- Data classification and MODEL_POLICY remain authoritative
- Backend and frontend conventions both required when monorepo/polyglot
- If unsure, ask one blocking question — then proceed with the safest default
- MUST NOT reveal chain-of-thought; return conclusions, evidence paths, and decisions only
- MUST NOT weaken `hooks/aies-guard.mjs` deny rules or the native hook wiring; add repo-specific rules via `hooks/aies-guard.rules.json`
</constraints>
```

## Changelog

- **2026-11-06:** Devin Desktop invocation moved from workflows to skills.
- **2.1 — 2026-11-06:** Invocation table now uses the kit 2.0 native commands for nine runtimes; context reflects `AGENTS.md` as canonical, `.agents/skills`, the guard hook, and the worktree helper; added the guard-rules step and constraint.
- **2.0 — 2026-07-29:** Repo-scan + Keep/Ban classification rewrite.
