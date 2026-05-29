const STATE_SCHEMA_VERSION = "IQ4EV_TELEMETRY_STATE_v1";

function seededNoise(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function injectLiveTelemetryNoise(computedScore, options = {}) {
  const score = Number(computedScore);

  if (Number.isNaN(score)) return 50;
  if (score <= 0 || score >= 100) return score;

  const seed = options.seed || Date.now();
  const volatility = score < 40 ? 5 : score < 70 ? 4 : 2;
  const rawNoise = seededNoise(seed) * volatility * 2 - volatility;
  const delta = options.deterministic ? 0 : rawNoise;

  return Math.max(0, Math.min(100, Math.round(score + delta)));
}

export function serializeWorkspaceState(stateObject) {
  return JSON.stringify(
    {
      version: STATE_SCHEMA_VERSION,
      state: stateObject,
      exportedAt: new Date().toISOString()
    },
    null,
    2
  );
}

export function deserializeWorkspaceState(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!parsed.version || !parsed.state) return null;

    return {
      ...parsed.state,
      _meta: {
        version: parsed.version,
        importedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("Invalid TerrainIntel workspace state:", error);
    return null;
  }
}