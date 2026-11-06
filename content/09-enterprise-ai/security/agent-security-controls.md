# Agent Security Controls

> **Version:** 1.0.0
> **Last updated:** 2026-11-06
> **Status:** Normative AIES control set for agentic systems and AI coding agents

## Purpose

Define six blocking controls for agentic systems. Each one closes a class of attack that hit production agents between 2025 and 2026, and none of them depends on the model obeying its instructions.

## Why

Most major agent compromises of 2025–2026 succeeded without a model jailbreak. They abused the **capabilities around the model**:

| Incident | What actually failed | Control |
|---|---|---|
| Copilot CVE-2025-53773; Cursor MCPoison CVE-2025-54136 | Injected text made the agent edit its **own configuration** (`chat.tools.autoApprove`, `mcp.json`) to gain code execution | AC-02 |
| Clinejection (Feb 2026) | A GitHub **issue title** injected a CI triage agent with Bash; it poisoned the Actions cache, stole publish tokens, and shipped a malicious release to about 4,000 machines | AC-03 |
| Amazon Q extension CVE-2025-8217 | An over-scoped CI token let a wiper prompt ship in a release | AC-03 |
| ClawHavoc / ToxicSkills (Feb 2026) | 800+ malicious skills on a public registry delivered a stealer through fake "prerequisites" in `SKILL.md` | AC-04 |
| mcp-remote CVE-2025-6514; 2026 MCP command-injection CVEs | Untrusted text reached `exec` through an MCP server or its OAuth flow | AC-04 |
| Slopsquatting | Models hallucinate package names at 4–6%; attackers register them | AC-05 |
| EchoLeak and the "lethal trifecta" exfiltration class | One agent held private data, untrusted content, and an outbound channel at the same time | AC-01 |
| Claude Code DNS exfiltration CVE-2025-55284 | Data left as a DNS lookup from an auto-approved command | AC-06 |

Prompt-level defenses (classifiers, "ignore malicious instructions") reduce noise but are bypassed routinely. These controls are **structural**: they hold even when the model is fully compromised.

## When

Apply all six controls to any agent that has tools. AC-03 applies to every agent that runs in CI. AC-02, AC-05 and AC-06 apply to every coding agent, including IDE agents on developer machines.

## How

### AC-01 Capability-composition gate (Rule of Two)

An agent session may hold **at most two** of these properties without supervision:

1. Processes **untrusted input** (web pages, emails, issues, PR comments, retrieved documents, tool output from third-party servers)
2. Has access to **sensitive data or systems** (private repos, customer data, secrets, production)
3. Can **change state or communicate externally** (write tools, HTTP egress, email, commits, comments)

If a design needs all three, it must use one of these:

- a human approval step before every external or state-changing action;
- a deterministic policy check that runs outside the model.

**Record the design pattern** in the agent definition. Choose one of the six patterns from *Design Patterns for Securing LLM Agents against Prompt Injections* (2025):

| Pattern | Use when |
|---|---|
| Action-selector | Agent picks from a fixed menu of actions; no free-form tool arguments from untrusted data |
| Plan-then-execute | Plan is fixed before reading untrusted content; content cannot add steps |
| Map-reduce | Untrusted items processed in isolated sub-calls whose outputs are constrained (e.g., booleans, enums) |
| Dual LLM | A privileged model plans; a quarantined model reads untrusted data and returns only symbolic references |
| Code-then-execute (CaMeL) | Plan compiled to code with capability tags on data; policy enforced by the interpreter |
| Context minimization | Untrusted content is removed from context before privileged actions |

Default for agents that read untrusted content: **plan-then-execute** or **dual LLM**. High-risk agents: CaMeL-style capability tagging.

**Release gate.** Design review blocks any agent with all three properties that has no recorded pattern and no approval step.

### AC-02 Agent self-configuration integrity

An agent must not be able to modify the files that grant it capabilities or enforce policy on it. The protected set:

- hook config;
- permission and settings files;
- MCP config;
- editor auto-approve settings;
- rules files that enable tools;
- CI workflows;
- `CODEOWNERS`.

- **Enforce** with a pre-tool hook that denies edits to those paths. The AIES kit guard does this for nine runtimes; see [Native agent hooks](../../handbook/native-agent-hooks.md).
- **Re-approve by content, not name.** MCPoison worked because approval was keyed to a server's name; the attacker changed the command behind an approved name. Tie approval to a hash of the full entry and re-prompt on any change.
- **Review in PRs.** Changes to these files require CODEOWNERS review by a human, never by an agent.

### AC-03 CI agent safety

| Rule | Why |
|---|---|
| No agent with write, shell, or secret access on triggers that untrusted users control (`issues`, `issue_comment`, `pull_request_target`, fork PRs) | Clinejection: any GitHub user could trigger the triage agent |
| Never interpolate untrusted fields (issue titles, PR bodies, commit messages, branch names) into the agent prompt or a shell line | Classic Actions injection, now with an LLM in the middle |
| Read-only agents for triage and review; comments are the only output | Limits blast radius to text |
| Isolate caches per trust level; untrusted jobs never write caches that release jobs read | Clinejection pivoted through the shared Actions cache |
| Publish with OIDC trusted publishing; no long-lived publish tokens in the same workflow as an agent | Stolen tokens were the payload |
| Pin third-party actions to commit SHAs | Supply-chain hygiene for the runner itself |

### AC-04 Tool, skill, and MCP server supply chain

Treat skills, MCP servers, agent plugins, and rules files as **code that runs with the agent's privileges**:

- Allowlist approved servers and skills (`mcps/recommended.json` in the kit); anything else is a shadow server.
- Pin versions and record digests; diff tool descriptions on every upgrade. A tool description is a prompt, so a "rug-pull" that changes the description changes the agent's behavior.
- Review `SKILL.md` and any scripts it references before install; reject skills that require running downloaded binaries or `curl | sh` "prerequisites".
- Run local MCP servers sandboxed, with no ambient credentials.
- Regression-test the OAuth authorization-URL handling of MCP clients against command injection (the CVE-2025-6514 class).

### AC-05 Agent dependency hygiene

- Before installing any package an agent proposes, check that it exists in the registry and is more than 30 days old, and compare its maintainer and download counts with what was expected. Slopsquatted names are registered fresh.
- Enforce lockfiles in CI (`npm ci`, `pip install --require-hashes`, `uv sync --locked`); agents may not run `npm install <new-package>` without a human-approved diff to the manifest.
- Disable install scripts by default (`npm config set ignore-scripts true`, pnpm's `onlyBuiltDependencies` allowlist).
- Route installs through an internal registry proxy with malware scanning and a minimum-age policy.

### AC-06 Sandbox and default-deny egress

The guard hook is defense in depth. The boundary is the sandbox:

- Run coding agents with write access in an OS sandbox or container, such as Claude Code's sandbox, the Codex `workspace-write` sandbox, a dev container, or a cloud agent VM.
- Network egress is deny-by-default with an allowlist (package registry proxy, git host, model API). **Include DNS** — DNS lookups are an exfiltration channel.
- Run an egress self-test at session start: an attempt to reach a non-allowlisted host must fail.
- Native Windows Claude Code has no OS sandbox. Use WSL2 or a dev container for agents with write access.

## Tradeoffs

| Choice | Benefit | Cost |
|---|---|---|
| Rule of Two as a release gate | Removes the exfiltration class by construction | Some "do everything" agent designs are rejected or need approval steps |
| Self-config integrity | Closes the highest-impact coding-agent CVE class | Humans must make every MCP/hook/CI change |
| Read-only CI agents on untrusted triggers | No repeat of Clinejection | Triage agents cannot auto-label, auto-fix, or auto-close |
| Supply-chain allowlists | No shadow servers or malicious skills | Slower adoption of new tools; allowlist maintenance |
| Default-deny egress including DNS | Blocks exfiltration even after compromise | Allowlist upkeep; some tools break until added |

## Anti-patterns

- **Classifier as the control.** Prompt-injection classifiers are a signal; EchoLeak bypassed vendor classifiers. Structure is the control.
- **"The agent is read-only, so untrusted input is fine."** A read-only agent with private data and the ability to post a comment still exfiltrates (properties 1 + 2 + 3).
- **Approving MCP servers by name.** Approval must bind to the command, arguments, and URL — the full content.
- **Agent-authored hook or CI changes merged by another agent.** Self-configuration with an extra step.
- **Installing marketplace skills like browser extensions.** They run with your shell.
- **Trusting the guard hook as the sandbox.** Regex policy is evadable; the sandbox and egress policy are the boundary.

## Enterprise considerations

- Map these controls to OWASP Agentic Top 10 (ASI01 goal hijack, ASI02 tool misuse, ASI04 supply chain, ASI05 code execution) and the OWASP MCP Top 10 in the [OWASP crosswalk](../../standard/crosswalks/owasp-ai-security.md).
- Deliver AC-02 and AC-06 through managed policy, not per repo: Claude managed settings, Codex `requirements.toml` with `allow_managed_hooks_only`, Cursor enterprise hooks, Copilot policy hooks, and MDM-managed egress.
- Maintain an inventory of agents with their Rule-of-Two profile and design pattern; review it quarterly and on every new tool grant.
- AI-accelerated vulnerability discovery has increased disclosure volume. Tighten patch SLAs for agent runtimes, MCP servers, and skills accordingly.
- Incident response: on suspected agent compromise, revoke the agent's tokens, freeze its config files, preserve hook audit logs and traces, and rotate any secret it could reach.

## Checklist

- [ ] Every agent's Rule-of-Two profile and design pattern are recorded; agents with all three properties have an approval step or deterministic policy
- [ ] Pre-tool hooks deny agent edits to hook, permission, MCP, auto-approve, CI, and CODEOWNERS files
- [ ] MCP and tool approvals bind to content hashes, not names
- [ ] No CI agent with write/shell/secret access runs on untrusted triggers; no untrusted field is interpolated into prompts
- [ ] Publishing uses OIDC trusted publishing; caches are isolated by trust level
- [ ] Skills, MCP servers, and plugins are allowlisted, pinned, and diff-reviewed on upgrade
- [ ] Agent-proposed dependencies pass existence, age, and lockfile checks; install scripts are off by default
- [ ] Coding agents with write access run sandboxed with default-deny egress including DNS, verified by a self-test

## References

- Beurer-Kellner et al., [Design Patterns for Securing LLM Agents against Prompt Injections](https://arxiv.org/abs/2506.08837) (2025)
- Meta, [Agents Rule of Two](https://ai.meta.com/blog/practical-ai-agent-security/) (2025)
- Simon Willison, [The lethal trifecta](https://simonwillison.net/series/prompt-injection/)
- [Copilot CVE-2025-53773 write-up](https://embracethered.com/blog/posts/2025/github-copilot-remote-code-execution-via-prompt-injection/) · [Cursor MCPoison advisory](https://github.com/cursor/cursor/security/advisories/GHSA-4cxx-hrm3-49rm)
- [Clinejection analysis](https://adnanthekhan.com/posts/clinejection/) · [CSA research note](https://labs.cloudsecurityalliance.org/research/csa-research-note-clinejection-prompt-injection-cicd-cache-p/)
- [ToxicSkills (Snyk)](https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/)

Sources accessed 2026-11-06.

## Changelog

- **1.0.0 — 2026-11-06:** Initial control set AC-01 to AC-06.
