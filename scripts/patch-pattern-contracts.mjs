import fs from "node:fs";
import path from "node:path";

const root = path.resolve("content/patterns");
const patterns = [
  "planner",
  "reviewer",
  "context",
  "debug",
  "migration",
  "legacy-modernization",
  "architecture",
  "optimization",
  "enterprise",
  "release",
  "hotfix",
  "root-cause",
];

const authority = {
  planner: {
    read_only: ["repository", "documentation", "dependency_graph", "adr_store"],
    effect_capable: ["write_plan_record"],
    approvals: ["human plan approval before coding"],
    budgets: ["max 3 revision cycles", "context package size reviewed"],
    recovery: "return to last approved plan revision; invalidate rubber-stamp approvals",
    safe_stop: "missing acceptance criteria, empty context, or blocking questions open",
  },
  reviewer: {
    read_only: ["diff", "tests", "standards", "threat_model"],
    effect_capable: ["write_review_report", "request_changes"],
    approvals: ["human security owner for Critical waivers"],
    budgets: ["one review cycle per revision", "no product rewrites"],
    recovery: "re-open findings if claimed fix lacks verification evidence",
    safe_stop: "diff unavailable or scope exceeds review mandate",
  },
  context: {
    read_only: ["repository", "tickets", "adrs", "schemas"],
    effect_capable: ["write_context_package"],
    approvals: ["planner/human accepts package before use"],
    budgets: ["token budget for package", "exclude secrets"],
    recovery: "rebuild package when noise or missing boundary docs detected",
    safe_stop: "cannot exclude secrets or identify relevant paths",
  },
  debug: {
    read_only: ["logs", "traces", "tests", "repository"],
    effect_capable: ["write_debug_report", "propose_fix_diff"],
    approvals: ["human before production data access or prod writes"],
    budgets: ["max hypothesis experiments agreed with owner", "narrow fix scope"],
    recovery: "revert symptom-only fixes; restart hypothesis table",
    safe_stop: "cannot reproduce in approved environment",
  },
  migration: {
    read_only: ["schemas", "data_dictionary", "traffic_metrics"],
    effect_capable: ["write_migration_plan", "propose_ddl"],
    approvals: ["DBA/platform + service owner for cutover"],
    budgets: ["expand/contract windows", "rollback drill required"],
    recovery: "abort cutover; contract forward; restore from last expand-safe state",
    safe_stop: "no tested return path or dual-write verification missing",
  },
  "legacy-modernization": {
    read_only: ["legacy_code", "characterization_tests", "traffic_shadow"],
    effect_capable: ["write_strangler_plan", "propose_facade"],
    approvals: ["domain owner for behavior freeze exceptions"],
    budgets: ["incremental seams only", "no big-bang cut unless approved"],
    recovery: "route traffic back to legacy seam; keep characterization suite green",
    safe_stop: "behavior parity unproven for the next seam",
  },
  architecture: {
    read_only: ["quality_scenarios", "constraints", "cost_model", "threat_model"],
    effect_capable: ["write_adr"],
    approvals: ["architecture review board / named approver"],
    budgets: ["at least two viable options + baseline when material"],
    recovery: "supersede ADR; disable new topology at seam",
    safe_stop: "hard constraints conflict with all options",
  },
  optimization: {
    read_only: ["profiles", "benchmarks", "slos", "cost_reports"],
    effect_capable: ["write_optimization_plan", "propose_perf_diff"],
    approvals: ["owner for latency/cost budget changes"],
    budgets: ["profile-guided changes only", "guard correctness tests"],
    recovery: "revert optimization; restore prior build",
    safe_stop: "no baseline measurement for the claimed bottleneck",
  },
  enterprise: {
    read_only: ["policy", "tenant_map", "control_catalog", "jurisdictions"],
    effect_capable: ["write_governance_package"],
    approvals: ["risk/compliance owners for exceptions"],
    budgets: ["exception duration risk-derived", "control evidence freshness"],
    recovery: "revoke exception; restore enforced control",
    safe_stop: "missing system boundary or owner register",
  },
  release: {
    read_only: ["pipeline", "registry_digest", "metrics", "feature_flags"],
    effect_capable: ["write_release_decision", "recommend_go_nogo"],
    approvals: ["human GO/NO_GO before progressive exposure"],
    budgets: ["canary stages and abort criteria frozen for window"],
    recovery: "abort canary; rollback to last-known-good digest",
    safe_stop: "digest mismatch or missing rollback owner",
  },
  hotfix: {
    read_only: ["alerts", "service_map", "recent_changes", "runbooks"],
    effect_capable: ["write_incident_action_package", "propose_minimal_patch"],
    approvals: ["incident commander for containment actions"],
    budgets: ["smallest reversible change", "no refactors in hotfix"],
    recovery: "revert hotfix; restore LKG; preserve evidence",
    safe_stop: "IC undefined or containment would expand blast radius without approval",
  },
  "root-cause": {
    read_only: ["timeline", "changes", "telemetry", "runbooks"],
    effect_capable: ["write_rca_report"],
    approvals: ["incident owner accepts RCA; control owners accept actions"],
    budgets: ["evidence-bound claims only", "action items with owners/dates"],
    recovery: "reopen RCA when counter-evidence appears; update actions",
    safe_stop: "timeline incomplete or blame without evidence",
  },
};

const reasoningLine =
  "MUST NOT reveal chain-of-thought or private reasoning; return conclusions, evidence, and decisions only.";

for (const name of patterns) {
  const dir = path.join(root, `${name}-pattern`);
  const agentPath = path.join(dir, "agent.md");
  const promptPath = path.join(dir, "prompt.md");
  let agent = fs.readFileSync(agentPath, "utf8");
  let prompt = fs.readFileSync(promptPath, "utf8");
  const a = authority[name];

  const block = [
    "tools:",
    "  read_only:",
    ...a.read_only.map((x) => `    - ${x}`),
    "  effect_capable:",
    ...a.effect_capable.map((x) => `    - ${x}`),
    "approvals:",
    `  - ${a.approvals[0]}`,
    "budgets:",
    ...a.budgets.map((x) => `  - ${x}`),
    "recovery: |",
    `  ${a.recovery}`,
    "termination:",
    "  safe_stop: |",
    `    ${a.safe_stop}`,
  ].join("\n");

  const needed = [
    "read_only:",
    "effect_capable:",
    "approvals:",
    "budgets:",
    "recovery:",
    "safe_stop:",
  ];
  if (needed.some((k) => !agent.includes(k))) {
    agent = `${agent.trimEnd()}\n\n## Authority Contract\n\n\`\`\`yaml\n${block}\n\`\`\`\n`;
    fs.writeFileSync(agentPath, agent);
  }

  const tags = ["role", "context", "instructions", "output_format", "constraints"];
  const missingTags = tags.filter(
    (t) => !prompt.includes(`<${t}>`) || !prompt.includes(`</${t}>`),
  );
  if (missingTags.length) {
    prompt = `${prompt.trimEnd()}

## Complete executable prompt

\`\`\`xml
<role>
You are the ${name} pattern practitioner. Produce the pattern's required artifacts only.
</role>
<context>
{{STORY_OR_TRIGGER}}
{{EVIDENCE_PACKAGE}}
{{CONSTRAINTS}}
</context>
<instructions>
1. Confirm applicability triggers from this pattern's context.md.
2. Follow workflow.md steps in order.
3. Emit the artifacts required by output_format.
4. Stop and escalate when safe_stop conditions apply.
</instructions>
<output_format>
Return: applicability decision, evidence used, domain artifacts, verification results, residual risk, and explicit approvals required.
</output_format>
<constraints>
MUST follow this pattern's checklist.md before claiming completion.
MUST cite concrete paths, metrics, or owners for material claims.
MUST NOT invent evidence, approvals, or command results.
MUST NOT reveal chain-of-thought or private reasoning; return conclusions, evidence, and decisions only.
</constraints>
\`\`\`
`;
  }

  const reasoningRe =
    /(?:do not|never|must not)\s+(?:provide|reveal|expose|return|request)?[^.\n<]{0,100}(?:chain-of-thought|private (?:hidden )?reasoning)/i;
  if (!reasoningRe.test(prompt)) {
    if (prompt.includes("</constraints>")) {
      prompt = prompt.replace("</constraints>", `${reasoningLine}\n</constraints>`);
    } else {
      prompt += `\n\n## Constraints\n\n- ${reasoningLine}\n`;
    }
  }

  prompt = prompt.replace(
    /Analyze inside <thinking><\/thinking>:[\s\S]*?(?=\nProduce |\nThen |\n<\/instructions>)/i,
    "Work privately, then:\n\n",
  );

  fs.writeFileSync(promptPath, prompt);
  console.log("patched", name);
}
