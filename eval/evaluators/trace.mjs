import { result, setContainsAll } from "./helpers.mjs";

export function evaluate(expected, actual = {}) {
  const spans = actual.spans ?? [];
  const names = spans.map((span) => span.name);
  const authorizationIndex = names.indexOf("authorization.check");
  const retrievalIndex = names.indexOf("retrieval.search");
  const checks = {
    requiredSpansPresent: setContainsAll(names, expected.requiredSpans),
    authorizationBeforeRetrieval:
      !expected.authorizationBeforeRetrieval ||
      retrievalIndex === -1 ||
      (authorizationIndex !== -1 && authorizationIndex < retrievalIndex),
    identifiersValid: spans.every(
      (span) => /^[a-f0-9]{32}$/.test(span.traceId ?? "") && /^[a-f0-9]{16}$/.test(span.spanId ?? ""),
    ),
  };
  return result(Object.values(checks).every(Boolean), checks);
}
