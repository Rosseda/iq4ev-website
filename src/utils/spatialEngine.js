import { spatialNodes } from "../data/spatialNodes";

function calculateHaversineDistance(coords1, coords2) {
  const [lon1, lat1] = coords1;
  const [lon2, lat2] = coords2;

  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDistanceToCorridor(point, coords = []) {
  let minDistance = Infinity;

  for (const coord of coords) {
    const distance = calculateHaversineDistance(point, coord);
    if (distance < minDistance) minDistance = distance;
  }

  return minDistance;
}

export function calculateSpatialInfluence(targetCentroid, options = {}) {
  if (!Array.isArray(targetCentroid) || targetCentroid.length !== 2) {
    return {
      influenceScore: 0,
      confidence: 0.3,
      nodeCount: 0
    };
  }

  const zoneType = options.zoneType || "mixed";

  const radiusMap = {
    urban: 40,
    industrial: 60,
    corridor: 90,
    rural: 120,
    mixed: 65
  };

  const radiusKm = radiusMap[zoneType] || 65;

  let cumulativePressure = 0;
  let nodeCount = 0;

  for (const node of spatialNodes) {
    let distance = Infinity;

    if (node.geometryType === "Point") {
      distance = calculateHaversineDistance(targetCentroid, node.coordinates);
    }

    if (node.geometryType === "LineString") {
      distance = getDistanceToCorridor(targetCentroid, node.coordinates);
    }

    if (distance <= radiusKm) {
      const decay = Math.pow(1 - distance / radiusKm, 2);

      const basePressure =
        (node.demandWeight || 0.5) *
        (node.gridStress || 0.5) *
        10;

      cumulativePressure += basePressure * decay;
      nodeCount++;
    }
  }

  const normalizedPressure = nodeCount > 0 ? cumulativePressure / nodeCount : 0;

  const confidence =
    nodeCount > 8 ? 0.95 :
    nodeCount > 4 ? 0.8 :
    nodeCount > 0 ? 0.6 :
    0.3;

  return {
    influenceScore: Math.min(40, Number(normalizedPressure.toFixed(2))),
    confidence,
    nodeCount
  };
}