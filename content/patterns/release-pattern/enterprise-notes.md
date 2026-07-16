# Release Pattern — Enterprise Notes

> **Pattern:** Release  
> **Component:** enterprise-notes.md  
> **Version:** 1.1 | **Updated:** 2026-07-16

---

## Separation of duties

For medium/high risk, go/no-go approver should not be the sole author of the change. The agent drafts; humans approve; CD executes.

## Evidence retention

Keep digest, gate matrix, decision package, canary stage logs, and abort/rollback records with the change ticket for the retention period your regulators or customers already require — do not invent a universal day count here.

## Supply chain

Provenance and SBOM policy checks are operational gates. Passing them is not a public “secure software” certification claim.

## AI / model releases

Treat model, prompt, and tool-bundle versions as artifacts with digests/versions subject to the same progressive exposure and abort rules as container images when they change user-visible behavior.

## Anti-claim

A successful canary does not certify legal compliance, accessibility conformance, or security assurance beyond the gates you actually ran.
