# Deterministic Evidence Hooks

> **Version:** 2.0  
> **Updated:** 2026-07-16

## Purpose
These 12 POSIX `sh` hooks validate declared lifecycle evidence and effect approvals. They are gates, not task runners, secret scanners, policy engines, or deployment systems.

## Why
Executing command text from environment variables with `sh -c` creates an injection boundary and makes dry-run behavior ambiguous. Version 2.0 removes command execution: orchestration runs approved tools and supplies non-empty evidence records for deterministic validation.

## Contract and Exit Semantics
- Optional `--dry-run` validates declared inputs. Only `pre-commit` changes behavior: dry-run skips Git staged-diff inspection; every other hook performs the same read-only checks.
- Exit `0`: the narrow gate passed.
- Exit `64`: usage or required declaration is missing.
- Exit `65`: evidence is malformed, unreadable, empty, or uses an unknown classification.
- Exit `70`: evidence is valid but the policy condition failed.
- Hooks read regular files, environment declarations, and for non-dry-run `pre-commit`, the staged Git diff. They execute no supplied command text and perform no network or external mutation.

## Inputs
| Hook | Required declarations | What it actually checks |
|---|---|---|
| `pre-planning` | `OAIES_REQUIREMENTS_FILE` | Readable, non-empty, non-whitespace requirements |
| `pre-code` | `OAIES_PLAN_FILE`, `OAIES_APPROVAL_FILE` | Plan exists; approval declares `effect=workspace-write` and a target |
| `post-code` | `OAIES_VERIFY_EVIDENCE` | Evidence declares passed status and artifact |
| `pre-commit` | `OAIES_TEST_EVIDENCE`, `OAIES_SECRET_SCAN_EVIDENCE` | Both declare passed; non-dry-run also blocks a staged private-key header |
| `pre-review` | `OAIES_FORMAT_EVIDENCE`, `OAIES_LINT_EVIDENCE` | Both evidence files declare passed |
| `deployment` | `OAIES_RELEASE_MANIFEST`, `OAIES_APPROVAL_FILE`, `OAIES_RELEASE_EVIDENCE` | Digest/environment, deployment approval, and passed release evidence |
| `knowledge-capture` | `OAIES_KNOWLEDGE_FILE` | Owner, source, and retention fields exist |
| `pre-tool-call` | `OAIES_TOOL_EFFECT`; approval file for high effects | Known effect; high effect approval matches effect and names target |
| `post-tool-call` | `OAIES_TOOL_RESULT_FILE` | Status, effect, and target fields exist |
| `pre-delegation` | `OAIES_DELEGATION_FILE` | Principal, scope, budget profile, and positive remaining depth |
| `post-deployment` | `OAIES_HEALTH_EVIDENCE` | Digest, environment, and healthy status |
| `budget-guard` | `OAIES_BUDGET_PROFILE`, `OAIES_BUDGET_REMAINING` | Named profile and positive integer remaining budget |

## How
```sh
printf '%s\n' 'status=passed' 'artifact=sha256:abc' > verify.evidence
OAIES_VERIFY_EVIDENCE=verify.evidence sh ./post-code.hook.sh

printf '%s\n' 'effect=deployment' 'target=staging' > approval.evidence
OAIES_TOOL_EFFECT=deployment OAIES_APPROVAL_FILE=approval.evidence \
  sh ./pre-tool-call.hook.sh --dry-run
```

## Verification
Run `sh ./tests/hooks.test.sh`. The isolated harness checks all 12 hooks, success and failure paths, dry-run behavior, effect matching, budget exhaustion, and a staged private-key fixture.

## Security and Portability Audit
- No `eval`, `sh -c`, temporary command construction, network call, or external mutation exists.
- Scripts use POSIX `sh`, `case`, `grep`, `sed`, test, and `printf`; `pre-commit` additionally requires Git.
- Evidence files are declarations, not cryptographic attestations. The orchestrator must protect and bind them to task, artifact, environment, and producer identity.
- The private-key-header check is intentionally narrow and high-confidence. It does not claim to detect tokens, passwords, entropy, history leaks, or encoded secrets; use an approved scanner and provide its evidence.

## Unhappy Paths and Recovery
Do not bypass a failing gate. Correct malformed evidence, obtain a target-specific approval, rerun the external verifier, or escalate the exact failed condition. A passed gate proves only the checks listed above.

## Tradeoffs
Evidence gates are safer and more portable than command runners but cannot prove evidence authenticity or freshness alone. Production orchestration should sign evidence or store it in an access-controlled attestation service.

## Anti-Patterns
- Treating `status=passed` text as a trusted attestation without provenance controls.
- Reusing an approval file for another target, effect, artifact, or time window.
- Describing `pre-commit` as a comprehensive secret scanner.

## Enterprise Considerations
Issue signed, immutable evidence with task ID, producer identity, artifact digest, target, timestamps, and policy version. Enforce freshness and replay prevention in the orchestrator.

## Checklist
- [ ] All 12 hooks pass syntax and deterministic behavior tests
- [ ] No command-text execution remains
- [ ] Evidence producer and storage are protected
- [ ] Approval binding is enforced upstream
- [ ] Secret scanning and policy engines run separately

## Authoritative Sources
- [POSIX Shell Command Language](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/V3_chap02.html)
- [OWASP OS Command Injection Defense](https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html)
- [SLSA Provenance](https://slsa.dev/spec/v1.0/provenance)

## Changelog
- **2.0 (2026-07-16):** Removed command execution, narrowed claims, defined evidence and exit contracts, and expanded deterministic tests.
- **1.0:** Initial hook library.
