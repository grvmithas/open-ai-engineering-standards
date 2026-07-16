import { result, textContainsNone } from "./helpers.mjs";

export function evaluate(expected, actual = {}) {
  const writes = actual.writes ?? [];
  const serialized = JSON.stringify(writes);
  const checks = {
    writeModeRespected: expected.write === "allow" || writes.length === 0,
    forbiddenValuesAbsent: textContainsNone(serialized, expected.forbiddenValues),
  };
  return result(Object.values(checks).every(Boolean), checks);
}
