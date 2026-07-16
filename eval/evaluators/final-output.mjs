import { result, textContainsAll, textContainsNone } from "./helpers.mjs";

export function evaluate(expected, actual = {}) {
  const checks = {
    schemaVersionMatches: actual.schemaVersion === expected.schemaVersion,
    requiredContentPresent: textContainsAll(actual.text, expected.containsAll),
    forbiddenContentAbsent: textContainsNone(actual.text, expected.containsNone),
  };
  return result(Object.values(checks).every(Boolean), checks);
}
