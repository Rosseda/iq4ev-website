export const EMPIRICAL_PROVINCES = {
  gauteng: "Gauteng",
  western_cape: "Western Cape",
  kwazulu_natal: "KwaZulu-Natal",
  eastern_cape: "Eastern Cape",
  free_state: "Free State",
  limpopo: "Limpopo",
  mpumalanga: "Mpumalanga",
  north_west: "North West",
  northern_cape: "Northern Cape"
};

export const INFRASTRUCTURE_PROVINCES = {
  Gauteng: {
    id: "province_gauteng",
    name: "Gauteng",
    baseScore: 78,
    infrastructureStrength: "strong",
    demandLevel: "very high",
    archetype: "urban_economic_core",
    zone: "green",
    description:
      "South Africa’s densest economic and mobility demand province, with strong infrastructure but high peak-load exposure."
  },

  "Western Cape": {
    id: "province_western_cape",
    name: "Western Cape",
    baseScore: 82,
    infrastructureStrength: "strong",
    demandLevel: "high",
    archetype: "coastal_economic_core",
    zone: "green",
    description:
      "High-readiness coastal economy with strong municipal capability, tourism demand, and strategic port-linked mobility corridors."
  },

  "KwaZulu-Natal": {
    id: "province_kwazulu_natal",
    name: "KwaZulu-Natal",
    baseScore: 70,
    infrastructureStrength: "medium",
    demandLevel: "high",
    archetype: "port_logistics_region",
    zone: "yellow",
    description:
      "Strategic port and freight province anchored by Durban, with strong logistics demand and corridor stress exposure."
  },

  "Eastern Cape": {
    id: "province_eastern_cape",
    name: "Eastern Cape",
    baseScore: 62,
    infrastructureStrength: "medium",
    demandLevel: "medium",
    archetype: "automotive_and_coastal_region",
    zone: "yellow",
    description:
      "Automotive manufacturing and coastal logistics region with uneven municipal capacity and selective EV readiness."
  },

  "Free State": {
    id: "province_free_state",
    name: "Free State",
    baseScore: 58,
    infrastructureStrength: "medium",
    demandLevel: "medium",
    archetype: "central_corridor_region",
    zone: "yellow",
    description:
      "Central inland connector province with important freight pass-through routes and moderate infrastructure readiness."
  },

  Limpopo: {
    id: "province_limpopo",
    name: "Limpopo",
    baseScore: 52,
    infrastructureStrength: "weak",
    demandLevel: "medium",
    archetype: "border_and_resource_region",
    zone: "red",
    description:
      "Resource, border and long-distance movement province with weaker distributed infrastructure and grid-edge exposure."
  },

  Mpumalanga: {
    id: "province_mpumalanga",
    name: "Mpumalanga",
    baseScore: 60,
    infrastructureStrength: "medium",
    demandLevel: "high",
    archetype: "energy_industrial_region",
    zone: "yellow",
    description:
      "Energy and mining-linked province with industrial load pressure, strategic N4 movement, and grid transition relevance."
  },

  "North West": {
    id: "province_north_west",
    name: "North West",
    baseScore: 55,
    infrastructureStrength: "medium",
    demandLevel: "medium",
    archetype: "mining_and_agricultural_region",
    zone: "yellow",
    description:
      "Mining and agricultural province with moderate infrastructure readiness and concentrated industrial demand pockets."
  },

  "Northern Cape": {
    id: "province_northern_cape",
    name: "Northern Cape",
    baseScore: 50,
    infrastructureStrength: "weak",
    demandLevel: "low",
    archetype: "long_distance_sparse_region",
    zone: "red",
    description:
      "Large sparse-distance province with solar potential, low density, long route distances, and limited distributed charging readiness."
  }
};

export const EMPIRICAL_ROUTES = {
  N1: {
    id: "N1",
    name: "N1 Cape Town–Musina Corridor",
    baseCapacity: 82,
    riskProfile: "medium",
    description:
      "Primary north–south national corridor connecting Cape Town, Bloemfontein, Gauteng, Polokwane and Musina.",
    coordinates: [
      [-33.9249, 18.4241],
      [-32.9642, 20.8313],
      [-30.6511, 24.7314],
      [-29.1181, 26.2235],
      [-26.2041, 28.0473],
      [-25.7479, 28.2293],
      [-23.9045, 29.4533],
      [-22.3415, 30.0417]
    ]
  },

  N2: {
    id: "N2",
    name: "N2 Coastal Logistics Corridor",
    baseCapacity: 78,
    riskProfile: "medium",
    description:
      "Coastal corridor linking Cape Town, Garden Route, Gqeberha, East London, Durban and Richards Bay.",
    coordinates: [
      [-33.9249, 18.4241],
      [-33.9614, 22.4575],
      [-33.9608, 25.6022],
      [-33.0153, 27.9116],
      [-29.8587, 31.0218],
      [-28.7807, 32.0381]
    ]
  },

  N3: {
    id: "N3",
    name: "N3 Durban–Gauteng Freight Corridor",
    baseCapacity: 74,
    riskProfile: "high",
    description:
      "Critical freight artery linking Durban Port to the Gauteng industrial and consumer economy.",
    coordinates: [
      [-29.8587, 31.0218],
      [-29.6006, 30.3794],
      [-29.0084, 29.8739],
      [-28.2514, 29.6142],
      [-27.2411, 29.1245],
      [-26.2041, 28.0473]
    ]
  },

  N4: {
    id: "N4",
    name: "N4 Maputo–Gauteng Trade Corridor",
    baseCapacity: 70,
    riskProfile: "medium",
    description:
      "Regional trade route connecting Gauteng, Mpumalanga and Maputo through high-value freight and industrial movement.",
    coordinates: [
      [-25.9692, 32.5732],
      [-25.4413, 30.9811],
      [-25.7479, 28.2293],
      [-25.6544, 27.2421]
    ]
  },

  N5: {
    id: "N5",
    name: "N5 Bethlehem–Harrismith Connector",
    baseCapacity: 60,
    riskProfile: "medium",
    description:
      "Free State connector linking Bethlehem and Harrismith into the N3 logistics corridor.",
    coordinates: [
      [-28.2308, 28.3071],
      [-28.2323, 29.1062],
      [-28.2726, 29.1296]
    ]
  },

  N6: {
    id: "N6",
    name: "N6 East London–Bloemfontein Corridor",
    baseCapacity: 62,
    riskProfile: "medium",
    description:
      "Interior corridor connecting East London, Queenstown and Bloemfontein.",
    coordinates: [
      [-33.0153, 27.9116],
      [-31.8976, 26.8755],
      [-30.6937, 26.7114],
      [-29.1181, 26.2235]
    ]
  },

  N7: {
    id: "N7",
    name: "N7 Cape Town–Namibia West Coast Corridor",
    baseCapacity: 58,
    riskProfile: "medium",
    description:
      "West coast corridor connecting Cape Town, the Northern Cape west coast and the Namibian border.",
    coordinates: [
      [-33.9249, 18.4241],
      [-32.5333, 18.7167],
      [-31.6167, 18.7333],
      [-29.6667, 17.8833],
      [-28.6170, 16.5030]
    ]
  },

  N8: {
    id: "N8",
    name: "N8 Kimberley–Bloemfontein–Maseru Corridor",
    baseCapacity: 60,
    riskProfile: "medium",
    description:
      "Central corridor linking Kimberley, Bloemfontein, Botshabelo and Maseru.",
    coordinates: [
      [-28.7282, 24.7525],
      [-29.1181, 26.2235],
      [-29.2676, 26.7250],
      [-29.3158, 27.4869]
    ]
  },

  N9: {
    id: "N9",
    name: "N9 Colesberg–George Corridor",
    baseCapacity: 55,
    riskProfile: "medium",
    description:
      "Interior-to-coast corridor linking Colesberg, Graaff-Reinet, the Karoo and George.",
    coordinates: [
      [-30.7200, 25.0970],
      [-32.2522, 24.5308],
      [-33.3042, 23.4895],
      [-33.9614, 22.4575]
    ]
  },

  N10: {
    id: "N10",
    name: "N10 Gqeberha–Upington–Namibia Corridor",
    baseCapacity: 56,
    riskProfile: "medium",
    description:
      "Long-distance corridor from Gqeberha through Cradock, Middelburg, De Aar and Upington toward Namibia.",
    coordinates: [
      [-33.9608, 25.6022],
      [-32.1642, 25.6192],
      [-31.4920, 25.0063],
      [-30.6497, 24.0123],
      [-28.4478, 21.2561]
    ]
  },

  N11: {
    id: "N11",
    name: "N11 Ladysmith–Newcastle–Mokopane Corridor",
    baseCapacity: 58,
    riskProfile: "medium",
    description:
      "North-eastern inland corridor connecting KwaZulu-Natal, Mpumalanga and Limpopo industrial towns.",
    coordinates: [
      [-28.5607, 29.7807],
      [-27.7574, 29.9323],
      [-26.5333, 29.9833],
      [-25.4052, 28.9670],
      [-24.1944, 29.0097]
    ]
  },

  N12: {
    id: "N12",
    name: "N12 Industrial Corridor",
    baseCapacity: 68,
    riskProfile: "high",
    description:
      "Industrial and mining-linked corridor connecting the Northern Cape, North West, Gauteng and Mpumalanga.",
    coordinates: [
      [-28.7282, 24.7525],
      [-26.9911, 26.8642],
      [-26.8514, 27.0014],
      [-26.2041, 28.0473],
      [-25.8714, 29.2415],
      [-25.4711, 30.4714]
    ]
  },

  N14: {
    id: "N14",
    name: "N14 Springbok–Upington–Gauteng Corridor",
    baseCapacity: 54,
    riskProfile: "medium",
    description:
      "Sparse-distance corridor linking the Northern Cape, Upington, Kuruman, Vryburg and Gauteng.",
    coordinates: [
      [-29.6667, 17.8833],
      [-28.4478, 21.2561],
      [-27.4526, 23.4325],
      [-26.9566, 24.7284],
      [-25.7479, 28.2293]
    ]
  },

  N17: {
    id: "N17",
    name: "N17 Gauteng–Mpumalanga Industrial Route",
    baseCapacity: 64,
    riskProfile: "high",
    description:
      "Industrial corridor connecting Gauteng with Secunda, Bethal, Ermelo and Eswatini-linked movement.",
    coordinates: [
      [-26.2041, 28.0473],
      [-26.2491, 28.4686],
      [-26.5132, 29.1845],
      [-26.5333, 29.9833],
      [-26.3167, 30.8833]
    ]
  },

  N18: {
    id: "N18",
    name: "N18 Warrenton–Mahikeng–Botswana Corridor",
    baseCapacity: 52,
    riskProfile: "medium",
    description:
      "North West corridor connecting Warrenton, Vryburg, Mahikeng and Botswana border movement.",
    coordinates: [
      [-28.1136, 24.8472],
      [-26.9566, 24.7284],
      [-25.8652, 25.6442],
      [-25.7960, 25.5480]
    ]
  }
};

export const INFRASTRUCTURE_CORRIDORS = EMPIRICAL_ROUTES;