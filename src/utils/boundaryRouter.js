import { INFRASTRUCTURE_PROVINCES } from "../data/empiricalDatabase";
import { spatialNodes } from "../data/spatialNodes";

const NAMING_SYNONYMS = {
  johannesburg: "City of Johannesburg",
  joburg: "City of Johannesburg",
  tshwane: "City of Tshwane",
  pretoria: "City of Tshwane",
  ekurhuleni: "Ekurhuleni",
  "cape town": "City of Cape Town",
  ethekwini: "eThekwini",
  durban: "eThekwini",
  gqeberha: "Nelson Mandela Bay",
  "port elizabeth": "Nelson Mandela Bay",
  bloemfontein: "Mangaung",
  mangaung: "Mangaung"
};

export function cleanString(value = "") {
  return String(value)
    .toLowerCase()
    .replace(/metropolitan municipality/g, "")
    .replace(/district municipality/g, "")
    .replace(/local municipality/g, "")
    .replace(/city of/g, "")
    .replace(/municipality/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function inferRegionalArchetype(zoneName = "") {
  const name = cleanString(zoneName);

  let archetype = "general";
  let infrastructureStrength = "medium";
  let demandLevel = "medium";
  let zoneColor = "yellow";
  let description = "General regional infrastructure zone.";

  if (
    name.includes("johannesburg") ||
    name.includes("sandton") ||
    name.includes("cape town") ||
    name.includes("tshwane") ||
    name.includes("ethekwini")
  ) {
    archetype = "urban_core";
    infrastructureStrength = "strong";
    demandLevel = "very high";
    zoneColor = "green";
    description = "Urban economic core with high EV demand and stronger infrastructure.";
  } else if (
    name.includes("ekurhuleni") ||
    name.includes("emalahleni") ||
    name.includes("rustenburg") ||
    name.includes("secunda")
  ) {
    archetype = "industrial_belt";
    infrastructureStrength = "medium";
    demandLevel = "high";
    zoneColor = "yellow";
    description = "Industrial or mining-linked zone with elevated grid stress.";
  } else if (
    name.includes("soweto") ||
    name.includes("tembisa") ||
    name.includes("umlazi") ||
    name.includes("khayelitsha")
  ) {
    archetype = "demand_cluster";
    infrastructureStrength = "medium";
    demandLevel = "high";
    zoneColor = "red";
    description = "Dense demand cluster with peak-load sensitivity.";
  } else if (
    name.includes("harrismith") ||
    name.includes("colesberg") ||
    name.includes("beaufort west")
  ) {
    archetype = "logistics_corridor";
    infrastructureStrength = "medium";
    demandLevel = "medium";
    zoneColor = "yellow";
    description = "Logistics corridor support node.";
  }

  const scoreMap = {
    strong: 82,
    medium: 60,
    weak: 38
  };

  return {
    archetype,
    infrastructureStrength,
    demandLevel,
    zoneColor,
    description,
    calculatedBaseScore: scoreMap[infrastructureStrength] || 55
  };
}

export function normalizeAndBindLocation(zoneName = "", provinceContext = "") {
  const fallbackProvince = provinceContext || "National Network";

  if (!zoneName) {
    return {
      id: "unknown_node",
      municipality: "Unknown Node",
      name: "Unknown Node",
      province: fallbackProvince,
      gridScore: 50,
      infrastructureStrength: "medium",
      demandLevel: "medium",
      archetype: "general",
      zone: "yellow",
      description: "Fallback regional profile.",
      isKnown: false
    };
  }

  const cleanInput = cleanString(zoneName);
  let resolvedName = zoneName;

  for (const [key, value] of Object.entries(NAMING_SYNONYMS)) {
    if (cleanInput.includes(key)) {
      resolvedName = value;
      break;
    }
  }

  const matchedNode = spatialNodes.find((node) => {
    const nodeName = cleanString(node.name);
    const nodeMunicipality = cleanString(node.municipality);
    return nodeName.includes(cleanInput) || cleanInput.includes(nodeName) || nodeMunicipality.includes(cleanInput);
  });

  if (matchedNode) {
    return {
      id: matchedNode.id,
      matchedSpatialNodeId: matchedNode.id,
      municipality: matchedNode.municipality || matchedNode.name,
      name: matchedNode.name,
      province: matchedNode.province || fallbackProvince,
      gridScore: Math.round((matchedNode.infrastructureQuality || 0.6) * 100),
      infrastructureStrength:
        matchedNode.infrastructureQuality >= 0.8
          ? "strong"
          : matchedNode.infrastructureQuality >= 0.6
          ? "medium"
          : "weak",
      demandLevel:
        matchedNode.demandWeight >= 0.9
          ? "very high"
          : matchedNode.demandWeight >= 0.75
          ? "high"
          : "medium",
      archetype: matchedNode.type,
      zone:
        matchedNode.gridStress >= 0.9
          ? "red"
          : matchedNode.gridStress >= 0.75
          ? "yellow"
          : "green",
      description: `${matchedNode.name} intelligence node.`,
      isKnown: true
    };
  }

  const provinceScore = INFRASTRUCTURE_PROVINCES[fallbackProvince]?.baseScore;
  const inferred = inferRegionalArchetype(resolvedName);

  return {
    id: `node_${cleanInput.replace(/\s+/g, "_")}`,
    matchedSpatialNodeId: null,
    municipality: resolvedName,
    name: resolvedName,
    province: fallbackProvince,
    gridScore: provinceScore || inferred.calculatedBaseScore,
    infrastructureStrength: inferred.infrastructureStrength,
    demandLevel: inferred.demandLevel,
    archetype: inferred.archetype,
    zone: inferred.zoneColor,
    description: inferred.description,
    isKnown: true
  };
}