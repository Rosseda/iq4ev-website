import { useEffect, useMemo, useRef, useState } from "react";

import {
  EMPIRICAL_PROVINCES,
  EMPIRICAL_ROUTES,
  INFRASTRUCTURE_PROVINCES
} from "../empiricalDatabase";

import { baselineChargers } from "../baselineChargers";
import { normalizeAndBindLocation } from "../../utils/boundaryRouter";
import { executeAssetStressTest } from "../../utils/stressTestingEngine";
import { generateComplianceReport } from "../../utils/complianceReporter";
import { injectLiveTelemetryNoise } from "../../utils/telemetrySimulator";

function normalizeText(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getZoneFromScore(score) {
  if (score >= 70) return "green";
  if (score >= 45) return "yellow";
  return "red";
}

function getZoneColor(zone) {
  if (zone === "green") return "#16a34a";
  if (zone === "yellow") return "#ca8a04";
  return "#dc2626";
}

function getImpactLabel(delta) {
  if (delta >= 5) return "Improves readiness";
  if (delta >= -4) return "Manageable impact";
  if (delta >= -12) return "Moderate grid pressure";
  return "High grid pressure";
}

function getFeatureName(selectedZone) {
  if (!selectedZone) return null;

  return (
    selectedZone.properties?.name ||
    selectedZone.properties?.NAME_1 ||
    selectedZone.properties?.PROVINCE ||
    selectedZone.properties?.province ||
    selectedZone.properties?.MUNICNAME ||
    selectedZone.properties?.municipality ||
    "Selected Region"
  );
}

function getFeatureProvince(selectedZone) {
  if (!selectedZone) return null;

  return (
    selectedZone.properties?.province ||
    selectedZone.properties?.PROVINCE ||
    selectedZone.properties?.NAME_1 ||
    "National Network"
  );
}

function chargerBelongsToSelection(charger, selection) {
  if (!selection || selection.type === "national") return true;

  const chargerProvince = normalizeText(charger.province);
  const chargerMunicipality = normalizeText(charger.municipality);
  const chargerName = normalizeText(charger.name);

  const selectionProvince = normalizeText(selection.province);
  const selectionMunicipality = normalizeText(selection.municipality);
  const selectionName = normalizeText(selection.name);

  if (selection.type === "province") {
    return chargerProvince === selectionProvince;
  }

  if (selection.type === "node") {
    return (
      chargerProvince === selectionProvince &&
      (chargerMunicipality === selectionMunicipality ||
        chargerName.includes(selectionName) ||
        selectionName.includes(chargerMunicipality))
    );
  }

  if (selection.type === "region") {
    return (
      chargerProvince === selectionProvince ||
      chargerMunicipality === selectionMunicipality ||
      chargerName.includes(selectionName)
    );
  }

  return false;
}

function generateOperationalInsight(context = {}, scenario = {}) {
  const archetype = context.archetype || "general";

  if (scenario.gridPressureScore >= 85) {
    return {
      profile: "High-pressure deployment zone",
      recommendation:
        "Proceed only with staged deployment, smart charging, demand scheduling and energy buffering.",
      constraint:
        "The simulated charger load creates high additional pressure relative to existing infrastructure readiness."
    };
  }

  if (archetype.includes("industrial")) {
    return {
      profile: "Industrial / heavy-load zone",
      recommendation:
        "Suitable for freight and industrial fleet charging, but transformer loading and BESS integration should be evaluated carefully.",
      constraint:
        "Industrial clustering may create simultaneous peak-load stress during operational charging windows."
    };
  }

  if (archetype.includes("port") || archetype.includes("logistics")) {
    return {
      profile: "Logistics and corridor gateway",
      recommendation:
        "Strong candidate for logistics electrification, depot charging and corridor support infrastructure.",
      constraint:
        "Freight concentration may create charging congestion during logistics peaks."
    };
  }

  if (scenario.futureScore >= 70) {
    return {
      profile: "High-readiness infrastructure zone",
      recommendation:
        "Suitable for scaled EV deployment, fleet charging and strategic infrastructure expansion.",
      constraint:
        "Long-term scaling should still monitor transformer headroom and corridor demand growth."
    };
  }

  if (scenario.futureScore >= 45) {
    return {
      profile: "Moderate-readiness transition zone",
      recommendation:
        "Suitable for phased EV rollout with smart charging, scheduling and selective infrastructure reinforcement.",
      constraint:
        "Simultaneous charging demand and corridor growth could degrade performance over time."
    };
  }

  return {
    profile: "Infrastructure-constrained zone",
    recommendation:
      "Deployment should remain limited until infrastructure strengthening or energy mitigation is introduced.",
    constraint:
      "Grid fragility, weak infrastructure or long-distance charging exposure increase deployment risk."
  };
}

export default function InfoPanel({
  selectedZone,
  onProvinceSelect,
  onRouteSelect,
  activeProvince,
  activeRoute,
  activeNode,
  onClearSelection
}) {
  const [viewMode, setViewMode] = useState("regions");
  const [chargerCount, setChargerCount] = useState(15);
  const [kwPerCharger, setKwPerCharger] = useState(50);
  const [loadShedding, setLoadShedding] = useState(0);
  const [fleetType, setFleetType] = useState("heavy_freight");
  const [liveTelemetryScore, setLiveTelemetryScore] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const streamRef = useRef(null);

  const selectedName = useMemo(() => {
    if (activeNode) return activeNode.name;
    if (selectedZone) return getFeatureName(selectedZone);

    if (activeRoute && EMPIRICAL_ROUTES[activeRoute]) {
      return EMPIRICAL_ROUTES[activeRoute].name;
    }

    if (activeProvince) return activeProvince;

    return "National Network";
  }, [activeNode, selectedZone, activeRoute, activeProvince]);

  const selectedProvince = useMemo(() => {
    if (activeNode) return activeNode.province || "National Network";
    if (selectedZone) return getFeatureProvince(selectedZone);
    if (activeProvince) return activeProvince;
    return "National Network";
  }, [activeNode, selectedZone, activeProvince]);

  const currentSelection = useMemo(() => {
    if (activeNode) {
      return {
        type: "node",
        name: activeNode.name,
        province: activeNode.province,
        municipality: activeNode.municipality
      };
    }

    if (activeProvince) {
      return {
        type: "province",
        name: activeProvince,
        province: activeProvince,
        municipality: null
      };
    }

    if (selectedZone) {
      return {
        type: "region",
        name: getFeatureName(selectedZone),
        province: getFeatureProvince(selectedZone),
        municipality: getFeatureName(selectedZone)
      };
    }

    return {
      type: "national",
      name: "National Network",
      province: "National Network",
      municipality: null
    };
  }, [activeNode, activeProvince, selectedZone]);

  const chargerBaseline = useMemo(() => {
    const matchedChargers = baselineChargers.filter((charger) =>
      chargerBelongsToSelection(charger, currentSelection)
    );

    const totalChargers = matchedChargers.reduce(
      (sum, charger) => sum + Number(charger.chargerCount || 0),
      0
    );

    const totalKw = matchedChargers.reduce(
      (sum, charger) =>
        sum + Number(charger.chargerCount || 0) * Number(charger.maxKw || 0),
      0
    );

    const connectorMix = Array.from(
      new Set(matchedChargers.flatMap((charger) => charger.connectorTypes || []))
    );

    const availableSites = matchedChargers.filter(
      (charger) => charger.status === "available"
    ).length;

    return {
      sites: matchedChargers,
      siteCount: matchedChargers.length,
      totalChargers,
      totalKw,
      connectorMix,
      availableSites
    };
  }, [currentSelection]);

  const simulationContext = useMemo(() => {
    if (activeNode) {
      const infrastructureQuality = activeNode.infrastructureQuality || 0.6;
      const demandWeight = activeNode.demandWeight || 0.5;
      const gridStress = activeNode.gridStress || 0.5;

      return {
        id: activeNode.id,
        name: activeNode.name,
        municipality: activeNode.municipality || activeNode.name,
        province: activeNode.province || "National Network",
        gridScore: Math.round(infrastructureQuality * 100),
        infrastructureStrength:
          infrastructureQuality >= 0.8
            ? "strong"
            : infrastructureQuality >= 0.6
            ? "medium"
            : "weak",
        demandLevel:
          demandWeight >= 0.9
            ? "very high"
            : demandWeight >= 0.75
            ? "high"
            : "medium",
        archetype: activeNode.type || "general",
        zone:
          gridStress >= 0.9 ? "red" : gridStress >= 0.75 ? "yellow" : "green",
        description: `${activeNode.name} intelligence node within ${activeNode.province}.`,
        isKnown: true
      };
    }

    if (activeRoute && EMPIRICAL_ROUTES[activeRoute]) {
      const route = EMPIRICAL_ROUTES[activeRoute];

      return {
        id: route.id,
        name: route.name,
        municipality: route.name,
        province: "National Corridor Network",
        gridScore: route.baseCapacity,
        infrastructureStrength:
          route.baseCapacity >= 80
            ? "strong"
            : route.baseCapacity >= 60
            ? "medium"
            : "weak",
        demandLevel: route.riskProfile === "high" ? "high" : "medium",
        archetype: "logistics_corridor",
        zone: route.riskProfile === "high" ? "yellow" : "green",
        description: route.description || "National logistics corridor profile.",
        isKnown: true
      };
    }

    if (activeProvince && INFRASTRUCTURE_PROVINCES[activeProvince]) {
      const province = INFRASTRUCTURE_PROVINCES[activeProvince];

      return {
        id: province.id,
        name: province.name,
        municipality: province.name,
        province: province.name,
        gridScore: province.baseScore,
        infrastructureStrength: province.infrastructureStrength,
        demandLevel: province.demandLevel,
        archetype: province.archetype,
        zone: province.zone,
        description: province.description,
        isKnown: true
      };
    }

    return normalizeAndBindLocation(selectedName, selectedProvince);
  }, [activeNode, selectedName, selectedProvince, activeRoute, activeProvince]);

  const scenario = useMemo(() => {
    const infrastructureScore = Number(simulationContext.gridScore || 55);

    const baselineSupport = Math.min(chargerBaseline.totalChargers * 0.4, 8);
    const unavailablePenalty =
      chargerBaseline.siteCount > 0
        ? Math.max(0, chargerBaseline.siteCount - chargerBaseline.availableSites) * 1.5
        : 0;

    const baselineScore = Math.max(
      0,
      Math.min(100, Math.round(infrastructureScore + baselineSupport - unavailablePenalty))
    );

    const newLoadKw = chargerCount * kwPerCharger;
    const baselineLoadKw = chargerBaseline.totalKw;
    const futureLoadKw = baselineLoadKw + newLoadKw;

    const demandPressure =
      simulationContext.demandLevel === "very high"
        ? 1.25
        : simulationContext.demandLevel === "high"
        ? 1.1
        : 0.95;

    const gridStrengthBuffer =
      simulationContext.infrastructureStrength === "strong"
        ? 1.2
        : simulationContext.infrastructureStrength === "medium"
        ? 1
        : 0.75;

    const loadPressure = (newLoadKw / 1000) * demandPressure;
    const loadSheddingPenalty = loadShedding * 2.2;
    const pressurePenalty = Math.round((loadPressure / gridStrengthBuffer) * 6);

    const baselineCredit = Math.min(chargerBaseline.totalChargers * 0.15, 4);

    const futureScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(baselineScore - pressurePenalty - loadSheddingPenalty + baselineCredit)
      )
    );

    const gridPressureScore = Math.max(
      0,
      Math.min(100, Math.round(pressurePenalty * 4 + loadSheddingPenalty * 5))
    );

    return {
      baselineScore,
      futureScore,
      delta: futureScore - baselineScore,
      baselineLoadKw,
      newLoadKw,
      futureLoadKw,
      gridPressureScore,
      impactLabel: getImpactLabel(futureScore - baselineScore),
      futureZone: getZoneFromScore(futureScore)
    };
  }, [
    simulationContext,
    chargerBaseline,
    chargerCount,
    kwPerCharger,
    loadShedding
  ]);

  const adjustedSimulationContext = useMemo(() => {
    return {
      ...simulationContext,
      gridScore: scenario.baselineScore
    };
  }, [simulationContext, scenario.baselineScore]);

  const stressResult = useMemo(() => {
    const result = executeAssetStressTest(
      adjustedSimulationContext,
      chargerCount,
      kwPerCharger,
      loadShedding,
      150
    );

    return {
      ...result,
      postSimulationScore: scenario.futureScore,
      riskZone: scenario.futureZone
    };
  }, [
    adjustedSimulationContext,
    chargerCount,
    kwPerCharger,
    loadShedding,
    scenario.futureScore,
    scenario.futureZone
  ]);

  const operationalInsight = useMemo(() => {
    return generateOperationalInsight(adjustedSimulationContext, scenario);
  }, [adjustedSimulationContext, scenario]);

  const report = useMemo(() => {
    return generateComplianceReport(
      {
        ...adjustedSimulationContext,
        selectedNodeName: selectedName,
        fleetType,
        chargersAdded: chargerCount,
        kwPerUnit: kwPerCharger,
        loadSheddingStage: loadShedding,
        existingBaselineSites: chargerBaseline.siteCount,
        existingBaselineChargers: chargerBaseline.totalChargers,
        existingBaselineKw: chargerBaseline.totalKw,
        scenarioNewKw: scenario.newLoadKw,
        scenarioFutureKw: scenario.futureLoadKw,
        scenarioDelta: scenario.delta
      },
      stressResult
    );
  }, [
    adjustedSimulationContext,
    selectedName,
    fleetType,
    chargerCount,
    kwPerCharger,
    loadShedding,
    chargerBaseline,
    scenario,
    stressResult
  ]);

  useEffect(() => {
    if (!isStreaming) {
      clearInterval(streamRef.current);
      streamRef.current = null;
      return;
    }

    streamRef.current = setInterval(() => {
      setLiveTelemetryScore(injectLiveTelemetryNoise(stressResult.postSimulationScore));
    }, 900);

    return () => clearInterval(streamRef.current);
  }, [isStreaming, stressResult.postSimulationScore]);

  const riskColor = getZoneColor(stressResult.riskZone);

  return (
    <aside className="info-panel">
      <div className="panel-header">
        <div>
          <p className="eyebrow">IQ4EV</p>
          <h2>TerrainIntel</h2>
        </div>

        <button className="ghost-button" onClick={onClearSelection}>
          Reset
        </button>
      </div>

      <div className="mode-toggle">
        <button
          className={viewMode === "regions" ? "active" : ""}
          onClick={() => {
            setViewMode("regions");
            onClearSelection();
          }}
        >
          Regions
        </button>

        <button
          className={viewMode === "corridors" ? "active" : ""}
          onClick={() => {
            setViewMode("corridors");
            onClearSelection();
          }}
        >
          Corridors
        </button>
      </div>

      {viewMode === "regions" && (
        <div className="control-block">
          <label>Province focus</label>
          <select
            value={activeProvince || ""}
            onChange={(event) => onProvinceSelect(event.target.value || null)}
          >
            <option value="">National Network</option>
            {Object.values(EMPIRICAL_PROVINCES).map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </select>
        </div>
      )}

      {viewMode === "corridors" && (
        <div className="control-block">
          <label>Corridor focus</label>
          <select
            value={activeRoute || ""}
            onChange={(event) => onRouteSelect(event.target.value || null)}
          >
            <option value="">Select corridor</option>
            {Object.keys(EMPIRICAL_ROUTES).map((routeKey) => (
              <option key={routeKey} value={routeKey}>
                {EMPIRICAL_ROUTES[routeKey].name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="result-card" style={{ borderLeftColor: riskColor }}>
        <p className="eyebrow">Selected intelligence node</p>
        <h3>{selectedName}</h3>
        <p>{adjustedSimulationContext.description}</p>

        <div className="metric-grid">
          <div>
            <span>Future score</span>
            <strong>{stressResult.postSimulationScore}/100</strong>
          </div>

          <div>
            <span>Risk</span>
            <strong style={{ color: riskColor }}>
              {stressResult.riskZone.toUpperCase()}
            </strong>
          </div>

          <div>
            <span>Grid</span>
            <strong>{adjustedSimulationContext.infrastructureStrength}</strong>
          </div>

          <div>
            <span>Impact</span>
            <strong>{scenario.impactLabel}</strong>
          </div>
        </div>

        {liveTelemetryScore !== null && (
          <div className="live-strip">
            Live telemetry score: <strong>{liveTelemetryScore}/100</strong>
          </div>
        )}

        <p className="directive">{stressResult.directive}</p>
      </div>

      <div className="baseline-card">
        <div>
          <p className="eyebrow">Existing charger baseline</p>
          <h3>{chargerBaseline.totalChargers} existing chargers detected</h3>
        </div>

        <div className="baseline-grid">
          <div>
            <span>Sites</span>
            <strong>{chargerBaseline.siteCount}</strong>
          </div>

          <div>
            <span>Baseline load</span>
            <strong>{scenario.baselineLoadKw} kW</strong>
          </div>

          <div>
            <span>Available sites</span>
            <strong>{chargerBaseline.availableSites}</strong>
          </div>

          <div>
            <span>Connector mix</span>
            <strong>
              {chargerBaseline.connectorMix.length > 0
                ? chargerBaseline.connectorMix.join(", ")
                : "No baseline"}
            </strong>
          </div>
        </div>
      </div>

      <div className="scenario-card">
        <div>
          <p className="eyebrow">Scenario logic</p>
          <h3>Existing baseline + new deployment</h3>
        </div>

        <div className="scenario-grid">
          <div>
            <span>Baseline readiness</span>
            <strong>{scenario.baselineScore}/100</strong>
          </div>

          <div>
            <span>Future readiness</span>
            <strong>{scenario.futureScore}/100</strong>
          </div>

          <div>
            <span>New load added</span>
            <strong>{scenario.newLoadKw} kW</strong>
          </div>

          <div>
            <span>Total future load</span>
            <strong>{scenario.futureLoadKw} kW</strong>
          </div>
        </div>

        <div className="scenario-bar">
          <div
            className="scenario-fill baseline"
            style={{ width: `${Math.min(scenario.baselineScore, 100)}%` }}
          />
        </div>

        <div className="scenario-bar">
          <div
            className={`scenario-fill ${scenario.futureZone}`}
            style={{ width: `${Math.min(scenario.futureScore, 100)}%` }}
          />
        </div>

        <p className={scenario.delta >= 0 ? "delta-positive" : "delta-negative"}>
          {scenario.delta >= 0 ? "+" : ""}
          {scenario.delta} point change after adding {chargerCount} chargers at{" "}
          {kwPerCharger} kW each.
        </p>
      </div>

      <div className="insight-card">
        <div className="insight-section">
          <span className="insight-label">Infrastructure profile</span>
          <strong>{operationalInsight.profile}</strong>
        </div>

        <div className="insight-section">
          <span className="insight-label">Deployment recommendation</span>
          <p>{operationalInsight.recommendation}</p>
        </div>

        <div className="insight-section">
          <span className="insight-label">Primary constraint</span>
          <p>{operationalInsight.constraint}</p>
        </div>
      </div>

      <div className="disclaimer-card">
        <strong>Planning Intelligence Notice</strong>
        <p>
          TerrainIntel currently operates as an empirical infrastructure and
          electrification planning model using simulated, placeholder and
          intelligence-derived readiness assumptions. It is not live Eskom,
          municipal or ChargePocket telemetry.
        </p>
      </div>

      <div className="control-block">
        <label>Fleet profile</label>
        <select
          value={fleetType}
          onChange={(event) => setFleetType(event.target.value)}
        >
          <option value="light_commercial">Light commercial</option>
          <option value="public_transit">Public transit</option>
          <option value="heavy_freight">Heavy freight</option>
        </select>
      </div>

      <div className="control-block">
        <label>New chargers added: {chargerCount}</label>
        <input
          type="range"
          min="1"
          max="150"
          value={chargerCount}
          onChange={(event) => setChargerCount(Number(event.target.value))}
        />
      </div>

      <div className="control-block">
        <label>kW per new charger: {kwPerCharger}</label>
        <input
          type="range"
          min="7"
          max="350"
          step="1"
          value={kwPerCharger}
          onChange={(event) => setKwPerCharger(Number(event.target.value))}
        />
      </div>

      <div className="control-block">
        <label>Load shedding stage: {loadShedding}</label>
        <input
          type="range"
          min="0"
          max="8"
          value={loadShedding}
          onChange={(event) => setLoadShedding(Number(event.target.value))}
        />
      </div>

      <div className="action-row">
        <button onClick={() => setIsStreaming((value) => !value)}>
          {isStreaming ? "Stop telemetry" : "Start telemetry"}
        </button>

        <button onClick={() => setShowReportModal(true)}>
          Compliance report
        </button>
      </div>

      {showReportModal && (
        <div className="modal-backdrop">
          <div className="report-modal">
            <div className="modal-header">
              <h3>Compliance Report</h3>
              <button onClick={() => setShowReportModal(false)}>Close</button>
            </div>

            <pre>{report}</pre>
          </div>
        </div>
      )}
    </aside>
  );
}