const party = (id, role) => ({ id, name: id, role });
const digest = (character = "a") => `sha256:${character.repeat(64)}`;
const componentRef = "urn:oaies:component:app";
const systemRef = "urn:oaies:system:SYS-ASSURANCE";

function evidenceItem(controlId, index) {
  return {
    id: `EVI-${String(index + 1).padStart(3, "0")}`,
    evidenceClass: "design",
    type: "artifact",
    sourceRef: `urn:oaies:source:${controlId}`,
    sourceIdentity: "assurance-pipeline",
    custodian: "assurance-team",
    uri: `urn:oaies:evidence:${controlId}`,
    mediaType: "application/json",
    digest: digest(((index % 6) + 10).toString(16)),
    collectedAt: "2026-07-10T00:00:00.000Z",
    coveredPeriod: {
      start: "2026-01-01T00:00:00.000Z",
      end: "2026-07-10T00:00:00.000Z",
    },
    scope: {
      systemRef,
      environment: "production",
      componentRefs: [componentRef],
    },
    controlRefs: [controlId],
    integrityMechanism: "cryptographic-digest",
    retentionUntil: "2030-01-01T00:00:00.000Z",
    reproductionProcedure: "Re-run the committed deterministic assurance procedure.",
    includesFailuresAndExceptions: false,
    classification: "internal",
  };
}

function approvalItem(id, identity, controlId, character) {
  return {
    ...evidenceItem(controlId, 0),
    id,
    type: "approval",
    sourceRef: `urn:oaies:identity:${identity}`,
    sourceIdentity: identity,
    uri: `urn:oaies:approval:${id}`,
    digest: digest(character),
  };
}

function structuredApplicability(control) {
  const text = control.applicability.toUpperCase();
  const collect = (prefix, maximum) => {
    const selected = new Set([...text.matchAll(new RegExp(`${prefix}([0-${maximum}])`, "g"))].map((match) => Number(match[1])));
    for (const match of text.matchAll(new RegExp(`${prefix}([0-${maximum}])[–-]${prefix}?([0-${maximum}])`, "g"))) {
      for (let value = Number(match[1]); value <= Number(match[2]); value += 1) selected.add(value);
    }
    return [...selected].sort().map((value) => `${prefix}${value}`);
  };
  return {
    universal: text.includes("UNIVERSAL"),
    workloadProfiles: collect("P", 6),
    autonomyLevels: collect("A", 4),
    impactLevels: collect("I", 3),
    condition: control.applicability.length >= 3 ? control.applicability : `${control.applicability} classification`,
  };
}

export function buildFixture(normativeControls, { withException = true } = {}) {
  const exceptionControlId = "AIES-DAT-010";
  const catalog = {
    schemaVersion: "1.0.0",
    id: "oaies:normative-control-catalog",
    name: "AIES normative control catalog",
    version: "1.0.1",
    status: "approved",
    owner: "AIES maintainers",
    controls: normativeControls.map((control) => ({
      id: control.id,
      title: control.id,
      objective: control.requirement,
      category: {
        GOV: "governance",
        RSK: "risk",
        DAT: "data",
        MOD: "model",
        AGT: "agent",
        SEC: "security",
        OPS: "operations",
        ASR: "assurance",
      }[control.id.split("-")[1]],
      priority: "mandatory",
      applicability: structuredApplicability(control),
      implementation: `Implement and operate ${control.id} within the assessed boundary.`,
      verification: control.objectiveEvidence,
      evidenceRequirements: [{ evidenceClass: "design", description: "Approved design evidence." }],
      failureAction: "block-release",
    })),
    publishedAt: "2026-07-01T00:00:00.000Z",
  };

  const manifest = {
    schemaVersion: "1.0.0",
    id: "SYS-ASSURANCE",
    name: "Assurance fixture system",
    version: "1.2.3",
    lifecycleStatus: "production",
    purpose: "Exercise the AIES conformance engine with canonical records.",
    systemOwner: party("system-owner", "System Owner"),
    businessOwner: party("business-owner", "Business Owner"),
    boundaryRef: "urn:oaies:boundary:SYS-ASSURANCE",
    workloadProfiles: ["P1", "P2"],
    autonomyLevel: "A2",
    impactLevel: "I2",
    classificationRationale: "The system processes restricted retrieval content with material privacy impact.",
    classificationApprovedBy: party("risk-owner", "Independent Risk Owner"),
    classificationApprovedAt: "2026-06-01T00:00:00.000Z",
    dataClassification: "restricted",
    components: [{
      id: "application",
      type: "application",
      ref: componentRef,
      version: "1.2.3",
      supplier: "AIES fixture",
      insideBoundary: true,
    }],
    intendedUses: ["Evaluate canonical conformance records"],
    foreseeableMisuse: ["Attempt to forge exception approvals"],
    prohibitedUses: ["Production decision making"],
    affectedParties: ["Assessment operators"],
    environments: ["production"],
    materialChangeTriggers: ["System version, boundary, or risk classification changes"],
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-06-01T00:00:00.000Z",
  };

  const items = catalog.controls.map((control, index) => evidenceItem(control.id, index));
  const independentApproval = approvalItem("EVI-APPROVAL-RISK", "risk-owner", exceptionControlId, "d");
  const businessApproval = approvalItem("EVI-APPROVAL-BUSINESS", "business-owner", exceptionControlId, "e");
  items.push(independentApproval, businessApproval);
  const decisions = catalog.controls.map((control) => ({
    controlId: control.id,
    controlVersion: catalog.version,
    disposition: withException && control.id === exceptionControlId ? "applicable-exception" : "applicable-conforming",
    applicabilityRationale: "The control is conservatively included in the assessed baseline.",
    implementationSummary: "Implemented and assessed.",
    controlOwner: "control-owner",
    evidenceRefs: [`urn:oaies:evidence:${control.id}`],
    ...(withException && control.id === exceptionControlId ? { exceptionRef: "EXC-DAT-010" } : {}),
    lastTestedAt: "2026-07-10T00:00:00.000Z",
    nextReviewAt: "2026-12-31T00:00:00.000Z",
  }));
  const soa = {
    schemaVersion: "1.0.0",
    id: "SOA-ASSURANCE",
    version: "1.0.0",
    status: "approved",
    oaiesVersion: catalog.version,
    systemRef,
    systemVersion: manifest.version,
    systemOwner: "system-owner",
    boundaryRef: manifest.boundaryRef,
    scope: "The complete fixture system and production environment.",
    environments: ["production"],
    assessmentPeriod: {
      start: "2026-01-01T00:00:00.000Z",
      end: "2026-12-31T00:00:00.000Z",
    },
    catalogRef: "urn:oaies:catalog:normative",
    catalogVersion: catalog.version,
    workloadProfiles: manifest.workloadProfiles,
    autonomyLevel: manifest.autonomyLevel,
    impactLevel: manifest.impactLevel,
    classificationEvidenceRef: "urn:oaies:evidence:classification",
    materialChangeTriggers: manifest.materialChangeTriggers,
    decisions,
    reconciliation: {
      catalogControlCount: catalog.controls.length,
      distinctDecisionCount: catalog.controls.length,
      missingControlIds: [],
      duplicateControlIds: [],
      validationEvidenceRef: "urn:oaies:evidence:reconciliation",
    },
    approvals: [{
      role: "system-owner",
      identity: "system-owner",
      decision: "approve",
      decidedAt: "2026-07-12T00:00:00.000Z",
      recordRef: "urn:oaies:approval:soa",
    }],
    createdAt: "2026-07-11T00:00:00.000Z",
    approvedAt: "2026-07-12T00:00:00.000Z",
    nextReviewAt: "2026-12-31T00:00:00.000Z",
  };
  const evidence = {
    schemaVersion: "1.0.0",
    id: "EVD-ASSURANCE",
    systemRef,
    systemVersion: manifest.version,
    purpose: "control-verification",
    scope: "Evidence for the complete fixture control catalog.",
    assessmentPeriod: structuredClone(soa.assessmentPeriod),
    producer: { id: "fixture", name: "AIES fixture", type: "pipeline", version: "1.0.0" },
    items,
    manifestDigest: digest("f"),
    createdAt: "2026-07-15T00:00:00.000Z",
    retentionUntil: "2030-01-01T00:00:00.000Z",
    recordsScheduleRef: "urn:oaies:records:standard",
    dataClassification: "internal",
  };
  const exceptionRecord = {
    schemaVersion: "1.0.0",
    id: "EXC-DAT-010",
    status: "active",
    systemRef,
    systemVersion: manifest.version,
    soaRef: soa.id,
    controlId: exceptionControlId,
    controlVersion: catalog.version,
    exactUnmetRequirement: "Query-time source authorization lacks one planned policy assertion.",
    currentImplementation: "Source authorization is enforced by the retrieval service.",
    missingImplementation: "One defense-in-depth policy assertion remains incomplete.",
    rootCause: "The policy migration requires a bounded compatibility window.",
    timeBoundJustification: "A tested compensating deny policy covers the same retrieval risk.",
    detectedAt: "2026-06-15T00:00:00.000Z",
    exposure: {
      start: "2026-06-15T00:00:00.000Z",
      end: "2026-09-01T00:00:00.000Z",
      population: "Restricted retrieval queries in the production environment.",
      environments: ["production"],
      scenarios: ["A caller requests a source outside its authorized collection."],
    },
    affectedParties: ["Authorized retrieval users"],
    affectedAssets: ["Restricted retrieval collection"],
    inherentLikelihood: "possible",
    inherentImpact: "I2",
    riskRef: "urn:oaies:risk:DAT-010",
    compensatingControls: [{
      description: "A default-deny collection ACL blocks unauthorized source retrieval.",
      owner: "retrieval-owner",
      sameRiskRationale: "The ACL prevents the same unauthorized document exposure risk.",
      testProcedure: "Run positive and negative principal-to-collection access tests.",
      testResult: "pass",
      evidenceRefs: [`urn:oaies:evidence:${exceptionControlId}`],
      testedAt: "2026-06-25T00:00:00.000Z",
      testedBy: "independent-tester",
      operatingFrequency: "Every retrieval request",
    }],
    residualLikelihood: "unlikely",
    residualImpact: "I2",
    residualRiskDisposition: "within-tolerance",
    riskTolerancePolicyRef: "urn:oaies:policy:risk-tolerance",
    remediation: {
      action: "Complete and deploy the remaining policy assertion.",
      owner: "retrieval-owner",
      dueAt: "2026-09-01T00:00:00.000Z",
      expectedEvidence: "Policy deployment and denied-access test results.",
      validationOwner: "independent-tester",
      validationMethod: "Reperform negative query-time authorization tests.",
    },
    durationPolicyRef: "urn:oaies:policy:exception-duration:I2",
    maximumPermittedDuration: "P62D",
    durationRationale: "The duration is bounded by the approved migration and remediation horizon.",
    remainingClaimPeriodEnd: soa.assessmentPeriod.end,
    approvals: [
      {
        role: "independent-risk-owner",
        identity: "risk-owner",
        decision: "approve",
        rationale: "Residual risk is within the approved I2 tolerance.",
        decidedAt: "2026-06-30T00:00:00.000Z",
        recordRef: independentApproval.uri,
      },
      {
        role: "business-owner",
        identity: "business-owner",
        decision: "approve",
        rationale: "The bounded exposure and remediation plan are accepted.",
        decidedAt: "2026-06-30T00:00:00.000Z",
        recordRef: businessApproval.uri,
      },
    ],
    materialChangeInvalidates: true,
    materialChangeTriggers: ["System version, boundary, or authorization policy changes"],
    effectiveAt: "2026-07-01T00:00:00.000Z",
    expiresAt: "2026-09-01T00:00:00.000Z",
    suspensionConditions: ["Compensating ACL test failure or material system change"],
    createdAt: "2026-06-20T00:00:00.000Z",
  };
  return {
    manifest,
    soa,
    catalog,
    evidence,
    exceptions: withException ? [exceptionRecord] : [],
  };
}
