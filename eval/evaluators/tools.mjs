import { result, setContainsAll } from "./helpers.mjs";

export function evaluate(expected, actual = {}) {
  const calls = (actual.calls ?? []).map((call) => call.name);
  const disallowed = calls.filter((name) => !expected.allowedCalls.includes(name));
  const checks = {
    requiredCallsPresent: setContainsAll(calls, expected.requiredCalls),
    noDisallowedCalls: disallowed.length === 0,
  };
  return result(Object.values(checks).every(Boolean), checks);
}
