export const FLEET_PROFILES = {
  light_commercial: {
    name: "Light Delivery Fleet",
    demandMultiplier: 1,
    peakFactor: 1.1,
    baseKW: 22
  },
  public_transit: {
    name: "Public Transit / Bus Fleet",
    demandMultiplier: 2.2,
    peakFactor: 1.2,
    baseKW: 50
  },
  heavy_freight: {
    name: "Heavy Freight Fleet",
    demandMultiplier: 3.5,
    peakFactor: 1.4,
    baseKW: 150
  }
};

export function simulateDeployment(zone = {}, chargersToAdd = 1, options = {}) {
  const fleetType = options.fleetType || "light_commercial";
  const loadSheddingStage = Number(options.loadSheddingStage || 0);

  const profile = FLEET_PROFILES[fleetType] || FLEET_PROFILES.light_commercial;

  const baselineScore = Number(zone.gridScore || zone.score || 50);

  const totalLoadKW =
    chargersToAdd *
    profile.baseKW *
    profile.demandMultiplier;

  const scaleFriction =
    chargersToAdd > 30 ? 1.35 :
    chargersToAdd > 10 ? 1.15 :
    1;

  const loadImpact = (totalLoadKW / 250) * scaleFriction * profile.peakFactor;
  const sheddingImpact = loadSheddingStage * 7.5;

  const scoreAfter = Math.max(
    0,
    Math.min(100, Math.round(baselineScore - loadImpact - sheddingImpact))
  );

  let riskTier = "green";
  if (scoreAfter < 35) riskTier = "red";
  else if (scoreAfter < 70) riskTier = "yellow";

  return {
    zoneName: zone.municipality || zone.name || "Unknown Node",
    scoreBefore: baselineScore,
    scoreAfter,
    loadKW: Math.round(totalLoadKW),
    fleetProfile: profile.name,
    chargers: chargersToAdd,
    riskTier,
    recommendation: getPredictiveAdvisory(riskTier, loadSheddingStage),
    confidence: zone.gridScore ? 0.9 : 0.65,
    metadata: {
      fleetType,
      loadSheddingStage,
      scaleFriction
    }
  };
}

export function simulateBatchDeployment(zone = {}, chargerArray = [], options = {}) {
  if (!Array.isArray(chargerArray)) return [];
  return chargerArray.map((count) => simulateDeployment(zone, count, options));
}

function getPredictiveAdvisory(riskTier, stage) {
  if (stage >= 4) {
    return "Critical load-shedding exposure. Deployment should use BESS, scheduling, or islanded microgrid support.";
  }

  if (riskTier === "green") {
    return "Deployment viable. Smart charging controls recommended.";
  }

  if (riskTier === "yellow") {
    return "Caution. Peak stress expected. Load balancing or BESS recommended.";
  }

  if (riskTier === "red") {
    return "Deployment blocked. Infrastructure overload risk exceeds safe simulated threshold.";
  }

  return "Insufficient data for advisory generation.";
}