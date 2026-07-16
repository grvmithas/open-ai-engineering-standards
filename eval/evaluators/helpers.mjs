export function result(passed, checks) {
  return { passed, score: passed ? 1 : 0, checks };
}

export function setContainsAll(actual = [], expected = []) {
  const set = new Set(actual);
  return expected.every((item) => set.has(item));
}

export function hasNone(actual = [], forbidden = []) {
  const set = new Set(actual);
  return forbidden.every((item) => !set.has(item));
}

export function textContainsAll(text = "", values = []) {
  const normalized = text.toLocaleLowerCase("en-US");
  return values.every((value) => normalized.includes(value.toLocaleLowerCase("en-US")));
}

export function textContainsNone(text = "", values = []) {
  const normalized = text.toLocaleLowerCase("en-US");
  return values.every((value) => !normalized.includes(value.toLocaleLowerCase("en-US")));
}
