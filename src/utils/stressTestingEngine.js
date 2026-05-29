const POLICY_VERSION = "IQ4EV_TERRAININTEL_PHASE1_POLICY_v1";

const ARCHETYPE_POLICY = {
  urban_core: {
    maxKwPerCharger: 150,
    fragilityMultiplier: 0.9,
    requiresBESS: false
  },
  industrial_belt: {
    maxKwPerCharger: 350,
    fragilityMultiplier: 1.25,
    requiresBESS: true
  },
  demand_cluster: {
    maxKwPerCharger: 80,
    fragilityMultiplier: 1.35,
    requiresBESS: true
  },
  logistics_corridor: {
    maxKwPerCharger: 350,
    fragilityMultiplier: 1.15,
    requiresBESS: true
  },
  general: {
    maxKwPerCharger: 150,
    fragilityMultiplier: 1,
    requiresBESS: false
  }
};

export function executeAssetStressTest(
  context = {},
  chargerCount = 0,
  kwPerCharger = 50,
  loadSheddingStage = 0,
  activeLiveLoadKW = 0
) {
  const baseScore = Number(context.gridScore || context.score || 50);
  const archetype = context.archetype || "general";
  const policy = ARCHETYPE_POLICY[archetype] || ARCHETYPE_POLICY.general;

  const totalLoadKW = chargerCount * kwPerCharger + activeLiveLoadKW;
  const totalLoadMW = totalLoadKW / 1000;

  const policyViolation = kwPerCharger > policy.maxKwPerCharger;

  const loadStress = Math.pow(totalLoadMW * 6, 1.08) * policy.fragilityMultiplier;
  const loadSheddingPenalty = loadSheddingStage * 6 * policy.fragilityMultiplier;

  const postSimulationScore = Math.max(
    0,
    Math.min(100, Math.round(baseScore - loadStress - loadSheddingPenalty))
  );

  let riskZone = "green";

  if (policyViolation || postSimulationScore < 35) {
    riskZone = "red";
  } else if (postSimulationScore < 70 || policy.requiresBESS) {
    riskZone = "yellow";
  }

  const directive =
    riskZone === "red"
      ? "DEPLOYMENT BLOCKED: Infrastructure or policy threshold exceeded."
      : riskZone === "yellow"
      ? "CONDITIONAL DEPLOYMENT: Mitigation required through BESS, scheduling, or load balancing."
      : "DEPLOYMENT APPROVED: Within safe operating limits.";

  return {
    originalScore: baseScore,
    postSimulationScore,
    newScore: postSimulationScore,
    riskZone,
    directive,
    policyVersion: POLICY_VERSION,
    violation: policyViolation,
    metadata: {
      archetype,
      chargerCount,
      kwPerCharger,
      totalLoadKW,
      totalLoadMW,
      loadSheddingStage,
      requiresBESS: policy.requiresBESS
    }
  };
}

export function calculateAdvancedStress(
  baseScore,
  chargerCount,
  fleetType = "heavy_freight",
  loadSheddingStage = 0,
  infrastructureStrength = "medium"
) {
  const kwMap = {
    light_commercial: 22,
    public_transit: 50,
    heavy_freight: 150
  };

  return executeAssetStressTest(
    {
      gridScore: baseScore,
      infrastructureStrength,
      archetype: "general"
    },
    chargerCount,
    kwMap[fleetType] || 50,
    loadSheddingStage,
    0
  );
}