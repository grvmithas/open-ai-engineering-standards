# Ephemeral code review reports

> Reports are **per story**. Correlate with `plans/{STORY_ID}-plan.md`. Do not maintain a forever-growing review doc.

## Naming

`reviews/{STORY_ID}-code-review.md`

## Lifecycle

1. After implementation (or on PR open), run the **code-review** skill / Reviewer pattern.
2. Write findings into `reviews/{STORY_ID}-code-review.md` (copy `_TEMPLATE.md`).
3. Attach to the PR.
4. After merge: freeze — do not keep editing as a living backlog (file issues instead).

## Template

Copy [`_TEMPLATE.md`](./_TEMPLATE.md).
