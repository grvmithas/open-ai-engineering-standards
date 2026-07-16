import { result } from "./helpers.mjs";

export function evaluate(expected, actual = {}) {
  const checks = { decisionMatches: actual.decision === expected.decision };
  return result(checks.decisionMatches, checks);
}
