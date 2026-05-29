function cleanLabel(value = "") {
  return String(value).replace(/_/g, " ").toUpperCase();
}

function getRiskStatus(riskZone = "green") {
  const risk = String(riskZone).toLowerCase();

  if (risk === "green") {
    return {
      status: "LOW RISK / SUITABLE FOR PHASED DEPLOYMENT",
      decision: "PROCEED",
      interpretation:
        "The selected area appears suitable for controlled EV infrastructure expansion under the current planning assumptions."
    };
  }

  if (risk === "yellow") {
    return {
      status: "MODERATE RISK / CONDITIONAL DEPLOYMENT",
      decision: "PROCEED WITH CONTROLS",
      interpretation:
        "Deployment may proceed, but only with load management, phased rollout, utilisation monitoring and grid-headroom review."
    };
  }

  return {
    status: "HIGH RISK / DEPLOYMENT CONSTRAINT",
    decision: "DEFER OR MITIGATE FIRST",
    interpretation:
      "The simulated deployment creates material infrastructure pressure. Grid reinforcement, BESS, smart charging or reduced charger rollout should be considered first."
  };
}

function getRecommendation(score = 50, riskZone = "green") {
  const risk = String(riskZone).toLowerCase();

  if (risk === "red" || score < 45) {
    return [
      "Reduce the number of chargers or lower the charger power rating.",
      "Prioritise staged deployment instead of full immediate rollout.",
      "Assess local transformer headroom before procurement or installation.",
      "Consider battery energy storage, solar support or smart charging controls.",
      "Avoid peak-time simultaneous charging until infrastructure limits are known."
    ];
  }

  if (risk === "yellow" || score < 70) {
    return [
      "Proceed with a controlled pilot or phased deployment.",
      "Use smart charging schedules to reduce peak-time pressure.",
      "Monitor utilisation before adding additional charger capacity.",
      "Prioritise sites with strong grid access and existing charger demand.",
      "Review connector mix to match expected fleet and public charging needs."
    ];
  }

  return [
    "Proceed with deployment planning.",
    "Monitor utilisation and availability as adoption grows.",
    "Maintain room for future charger expansion.",
    "Use the site as a candidate for fleet, public or corridor charging expansion.",
    "Continue tracking grid, demand and charger uptime indicators."
  ];
}

export function generateComplianceReport(contextData = {}, simulationResults = {}) {
  const currentTimestamp = new Date().toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg"
  });

  const targetName =
    contextData.selectedNodeName ||
    contextData.name ||
    contextData.municipality ||
    "National Network";

  const regionContext =
    contextData.province ||
    contextData.region ||
    "South Africa";

  const fleetProfile = cleanLabel(contextData.fleetType || "heavy_freight");

  const riskZone = String(
    simulationResults.riskZone ||
      contextData.riskZone ||
      "green"
  ).toLowerCase();

  const futureScore =
    simulationResults.postSimulationScore ??
    contextData.postSimulationScore ??
    contextData.scenarioFutureScore ??
    50;

  const baselineScore =
    simulationResults.originalScore ??
    contextData.scenarioBaselineScore ??
    contextData.gridScore ??
    50;

  const chargersAdded = Number(contextData.chargersAdded || 0);
  const kwPerUnit = Number(contextData.kwPerUnit || 0);
  const newLoadKw =
    Number(contextData.scenarioNewKw) || chargersAdded * kwPerUnit;

  const futureLoadKw =
    Number(contextData.scenarioFutureKw) ||
    Number(contextData.existingBaselineKw || 0) + newLoadKw;

  const existingSites = Number(contextData.existingBaselineSites || 0);
  const existingChargers = Number(contextData.existingBaselineChargers || 0);
  const existingKw = Number(contextData.existingBaselineKw || 0);

  const loadSheddingStage = Number(contextData.loadSheddingStage || 0);
  const scenarioDelta =
    contextData.scenarioDelta !== undefined
      ? Number(contextData.scenarioDelta)
      : futureScore - baselineScore;

  const riskStatus = getRiskStatus(riskZone);
  const recommendations = getRecommendation(futureScore, riskZone);

  const directive =
    simulationResults.directive ||
    simulationResults.operationalDirective ||
    contextData.operationalDirective ||
    riskStatus.interpretation;

  return `
========================================================================
                  IQ4EV TERRAININTEL™ PLANNING BRIEF
========================================================================

Generated:                         ${currentTimestamp}
Assessment Area:                   ${targetName}
Region:                            ${regionContext}
Fleet Profile:                     ${fleetProfile}
Assessment Type:                   EV infrastructure planning simulation

------------------------------------------------------------------------
1. EXECUTIVE SUMMARY
------------------------------------------------------------------------

TerrainIntel assessed the selected area using an empirical planning model
combining infrastructure readiness, existing charger baseline assumptions,
new charger deployment assumptions, simulated load pressure and operational
risk indicators.

Planning Decision:                 ${riskStatus.decision}
Risk Status:                       ${riskStatus.status}
Future Readiness Score:            ${futureScore}/100
Scenario Movement:                 ${scenarioDelta >= 0 ? "+" : ""}${scenarioDelta} points

Interpretation:
${riskStatus.interpretation}

------------------------------------------------------------------------
2. EXISTING CHARGER BASELINE
------------------------------------------------------------------------

Existing Baseline Sites:           ${existingSites}
Existing Baseline Chargers:        ${existingChargers}
Estimated Existing Charger Load:   ${existingKw} kW

Note:
This baseline is currently a placeholder dataset structured for future
integration with verified charger sources such as CPO datasets, ChargePocket,
Google Places API, Open Charge Map, or manually imported infrastructure data.

------------------------------------------------------------------------
3. SIMULATED DEPLOYMENT SCENARIO
------------------------------------------------------------------------

New Chargers Added:                ${chargersAdded}
Power Per New Charger:             ${kwPerUnit} kW
New Simulated Load:                ${newLoadKw} kW
Total Future Charger Load:         ${futureLoadKw} kW
Load Shedding Stage Assumption:    Stage ${loadSheddingStage}

Baseline Readiness Score:          ${baselineScore}/100
Future Readiness Score:            ${futureScore}/100
Risk Classification:               ${riskZone.toUpperCase()}

------------------------------------------------------------------------
4. OPERATIONAL DIRECTIVE
------------------------------------------------------------------------

${directive}

------------------------------------------------------------------------
5. IQ4EV RECOMMENDATIONS
------------------------------------------------------------------------

${recommendations.map((item, index) => `${index + 1}. ${item}`).join("\n")}

------------------------------------------------------------------------
6. DATA AND MODEL LIMITATIONS
------------------------------------------------------------------------

- This report is generated from a planning model, not live Eskom telemetry.
- Charger baseline values are placeholders unless replaced with verified data.
- Results should be treated as decision-support intelligence, not final
  engineering approval.
- Site-level deployment still requires grid studies, landowner approval,
  electrical design, safety checks and commercial validation.

========================================================================
IQ4EV (Pty) Ltd · Strategic EV Data & Consulting · info@iq4ev.co.za
========================================================================
`;
}