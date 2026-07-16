import { result } from "./helpers.mjs";

export function evaluate(expected, actual = {}) {
  const checks = { allowedRouteSelected: expected.allowed.includes(actual.route) };
  return result(checks.allowedRouteSelected, checks);
}
