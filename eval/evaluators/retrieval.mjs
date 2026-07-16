import { hasNone, result, setContainsAll } from "./helpers.mjs";

export function evaluate(expected, actual = {}) {
  const retrievedIds = actual.retrievedIds ?? [];
  const checks = {
    requiredDocumentsPresent: setContainsAll(retrievedIds, expected.requiredIds),
    forbiddenDocumentsAbsent: hasNone(retrievedIds, expected.forbiddenIds),
  };
  return result(Object.values(checks).every(Boolean), checks);
}
