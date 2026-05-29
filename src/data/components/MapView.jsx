import { useEffect, useMemo, useRef, useState } from "react";
import {
  GeoJSON,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  Tooltip,
  useMap
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import southAfricaGeoJsonRaw from "../geojson/south-africa.geojson?raw";
import { EMPIRICAL_PROVINCES, EMPIRICAL_ROUTES } from "../empiricalDatabase";
import { spatialNodes } from "../spatialNodes";
import { baselineChargers } from "../baselineChargers";
import { normalizeAndBindLocation } from "../../utils/boundaryRouter";

const SOUTH_AFRICA_CENTER = [-30.5595, 22.9375];

const DISTRICT_TO_PROVINCE = {
  "City of Johannesburg Metropolitan": "Gauteng",
  "City of Tshwane Metropolitan": "Gauteng",
  "Ekurhuleni Metropolitan": "Gauteng",
  "Sedibeng District": "Gauteng",
  "West Rand District": "Gauteng",
  "City of Cape Town": "Western Cape",
  "Cape Winelands District": "Western Cape",
  "Central Karoo District": "Western Cape",
  "Eden District": "Western Cape",
  "Overberg District": "Western Cape",
  "West Coast District": "Western Cape",
  "eThekwini Metropolitan": "KwaZulu-Natal",
  "Amajuba District": "KwaZulu-Natal",
  "iLembe District": "KwaZulu-Natal",
  "Sisonke District": "KwaZulu-Natal",
  "Ugu District": "KwaZulu-Natal",
  "uMgungundlovu District": "KwaZulu-Natal",
  "Umkhanyakude District": "KwaZulu-Natal",
  "Umzinyathi District": "KwaZulu-Natal",
  "Uthukela District": "KwaZulu-Natal",
  "uThungulu District": "KwaZulu-Natal",
  "Zululand District": "KwaZulu-Natal",
  "Buffalo City Metropolitan": "Eastern Cape",
  "Nelson Mandela Bay Metropolitan": "Eastern Cape",
  "Alfred Nzo District": "Eastern Cape",
  "Amathole District": "Eastern Cape",
  "Chris Hani District": "Eastern Cape",
  "Joe Gqabi District": "Eastern Cape",
  "O.R. Tambo District": "Eastern Cape",
  "Sarah Baartman District": "Eastern Cape",
  "Mangaung Metropolitan": "Free State",
  "Fezile Dabi District": "Free State",
  "Lejweleputswa District": "Free State",
  "Thabo Mofutsanyana District": "Free State",
  "Xhariep District": "Free State",
  "Capricorn District": "Limpopo",
  "Mopani District": "Limpopo",
  "Sekhukhune District": "Limpopo",
  "Vhembe District": "Limpopo",
  "Waterberg District": "Limpopo",
  "Ehlanzeni District": "Mpumalanga",
  "Gert Sibande District": "Mpumalanga",
  "Nkangala District": "Mpumalanga",
  "Bojanana Platinum District": "North West",
  "Bojanala Platinum District": "North West",
  "Dr Kenneth Kaunda District": "North West",
  "Dr Ruth Segomotsi Mompati District": "North West",
  "Ngaka Modiri Molema District": "North West",
  "Frances Baard District": "Northern Cape",
  "John Taolo Gaetsewe District": "Northern Cape",
  "Namakwa District": "Northern Cape",
  "Pixley ka Seme District": "Northern Cape",
  "ZF Mgcawu District": "Northern Cape"
};

function normalizeText(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getRiskColor(zone) {
  if (zone === "green") return "#16a34a";
  if (zone === "red") return "#dc2626";
  return "#ca8a04";
}

function getNodeColor(type) {
  const nodeType = String(type || "").toLowerCase();

  if (nodeType === "economic_node") return "#f97316";
  if (nodeType === "regional_node") return "#fb923c";
  if (nodeType === "demand_cluster") return "#dc2626";
  if (nodeType === "industrial_node") return "#9333ea";
  if (nodeType === "logistics_node") return "#111827";
  if (nodeType === "port" || nodeType === "port_city") return "#ffffff";
  if (nodeType === "corridor_stop") return "#eab308";
  if (nodeType === "energy_node") return "#22c55e";
  if (nodeType === "knowledge_node") return "#ec4899";
  if (nodeType === "border_node" || nodeType === "border_corridor_node") return "#64748b";

  return "#f97316";
}

function getChargerStatusColor(status) {
  const normalizedStatus = String(status || "").toLowerCase();

  if (normalizedStatus === "available") return "#22c55e";
  if (normalizedStatus === "mixed") return "#eab308";
  if (normalizedStatus === "limited") return "#f97316";
  if (normalizedStatus === "offline") return "#dc2626";

  return "#64748b";
}

function getFeatureName(feature) {
  return (
    feature?.properties?.name ||
    feature?.properties?.NAME_1 ||
    feature?.properties?.PROVINCE ||
    feature?.properties?.province ||
    feature?.properties?.MUNICNAME ||
    feature?.properties?.municipality ||
    feature?.properties?.ADM1_EN ||
    feature?.properties?.admin ||
    "Unclassified Region"
  );
}

function getFeatureProvince(feature) {
  const name = getFeatureName(feature);

  return (
    DISTRICT_TO_PROVINCE[name] ||
    feature?.properties?.province ||
    feature?.properties?.PROVINCE ||
    feature?.properties?.NAME_1 ||
    feature?.properties?.ADM1_EN ||
    feature?.properties?.admin ||
    feature?.properties?.PROVINCE_N ||
    feature?.properties?.prov_name ||
    "National Network"
  );
}

function featureMatchesProvince(feature, activeProvince) {
  if (!activeProvince) return true;
  return normalizeText(getFeatureProvince(feature)) === normalizeText(activeProvince);
}

function chargerMatchesProvince(charger, activeProvince) {
  if (!activeProvince) return true;
  return normalizeText(charger.province) === normalizeText(activeProvince);
}

function RecenterMap({
  activeProvince,
  activeRoute,
  selectedZone,
  activeNode,
  activeCharger,
  provinceGeoJson,
  fullGeoJson
}) {
  const map = useMap();

  useEffect(() => {
    if (activeCharger?.coordinates) {
      map.setView([activeCharger.coordinates[1], activeCharger.coordinates[0]], 11);
      return;
    }

    if (activeNode?.coordinates) {
      map.setView([activeNode.coordinates[1], activeNode.coordinates[0]], 8);
      return;
    }

    if (activeRoute && EMPIRICAL_ROUTES[activeRoute]) {
      const route = EMPIRICAL_ROUTES[activeRoute];
      const bounds = L.latLngBounds(route.coordinates);
      map.fitBounds(bounds, { padding: [40, 40] });
      return;
    }

    if (selectedZone) {
      const layer = L.geoJSON(selectedZone);
      const bounds = layer.getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [40, 40] });
        return;
      }
    }

    if (activeProvince && provinceGeoJson?.features?.length > 0) {
      const provinceLayer = L.geoJSON(provinceGeoJson);
      const bounds = provinceLayer.getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [50, 50] });
        return;
      }
    }

    if (fullGeoJson?.features?.length) {
      const fullLayer = L.geoJSON(fullGeoJson);
      const bounds = fullLayer.getBounds();

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [30, 30] });
        return;
      }
    }

    map.setView(SOUTH_AFRICA_CENTER, 5);
  }, [
    activeProvince,
    activeRoute,
    selectedZone,
    activeNode,
    activeCharger,
    provinceGeoJson,
    fullGeoJson,
    map
  ]);

  return null;
}

export default function MapView({
  selectedZone,
  activeProvince,
  activeRoute,
  activeNode,
  activeCharger,
  onProvinceSelect,
  onSelectZone,
  onRouteSelect,
  onNodeSelect,
  onChargerSelect,
  onResetSelection,
  resetSignal
}) {
  const geoJsonRef = useRef(null);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredRoute, setHoveredRoute] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [layers, setLayers] = useState({
    regions: true,
    corridors: true,
    nodes: true,
    existingChargers: true
  });

  function handleResetMap() {
    setSearchTerm("");
    setShowLegend(false);
    setHoveredFeature(null);
    setHoveredRoute(null);
    setLayers({
      regions: true,
      corridors: true,
      nodes: true,
      existingChargers: true
    });

    if (typeof onResetSelection === "function") {
      onResetSelection();
    }
  }

  useEffect(() => {
    setSearchTerm("");
    setLayers({
      regions: true,
      corridors: true,
      nodes: true,
      existingChargers: true
    });
  }, [resetSignal]);

  const parsedGeoJson = useMemo(() => {
    try {
      return JSON.parse(southAfricaGeoJsonRaw);
    } catch (error) {
      console.error("Invalid GeoJSON file:", error);

      return {
        type: "FeatureCollection",
        features: []
      };
    }
  }, []);

  const provinceGeoJson = useMemo(() => {
    if (!activeProvince) return null;

    return {
      ...parsedGeoJson,
      features: parsedGeoJson.features.filter((feature) =>
        featureMatchesProvince(feature, activeProvince)
      )
    };
  }, [activeProvince, parsedGeoJson]);

  const displayedGeoJson = provinceGeoJson || parsedGeoJson;

  const displayedBaselineChargers = useMemo(() => {
    return baselineChargers.filter((charger) =>
      chargerMatchesProvince(charger, activeProvince)
    );
  }, [activeProvince]);

  const searchResults = useMemo(() => {
    const query = normalizeText(searchTerm);

    if (query.length < 2) return [];

    const provinces = Object.values(EMPIRICAL_PROVINCES)
      .filter((province) => normalizeText(province).includes(query))
      .map((province) => ({
        id: `province_${province}`,
        type: "province",
        label: province,
        subtitle: "Province focus",
        value: province
      }));

    const routes = Object.entries(EMPIRICAL_ROUTES)
      .filter(([routeKey, route]) => {
        return (
          normalizeText(routeKey).includes(query) ||
          normalizeText(route.name).includes(query)
        );
      })
      .map(([routeKey, route]) => ({
        id: `route_${routeKey}`,
        type: "route",
        label: route.name,
        subtitle: routeKey,
        value: routeKey
      }));

    const nodes = spatialNodes
      .filter((node) => {
        return (
          normalizeText(node.name).includes(query) ||
          normalizeText(node.province).includes(query) ||
          normalizeText(node.municipality).includes(query) ||
          normalizeText(node.type).includes(query)
        );
      })
      .map((node) => ({
        id: `node_${node.id}`,
        type: "node",
        label: node.name,
        subtitle: `${node.province} · ${String(node.type).replace(/_/g, " ")}`,
        value: node
      }));

    const chargers = baselineChargers
      .filter((charger) => {
        return (
          normalizeText(charger.name).includes(query) ||
          normalizeText(charger.province).includes(query) ||
          normalizeText(charger.municipality).includes(query) ||
          normalizeText(charger.status).includes(query)
        );
      })
      .map((charger) => ({
        id: `charger_${charger.id}`,
        type: "charger",
        label: charger.name,
        subtitle: `${charger.province} · ${charger.chargerCount} chargers`,
        value: charger
      }));

    return [...provinces, ...routes, ...nodes, ...chargers].slice(0, 8);
  }, [searchTerm]);

  function handleSearchSelect(result) {
    setSearchTerm("");

    if (result.type === "province") onProvinceSelect(result.value);
    if (result.type === "route") onRouteSelect(result.value);
    if (result.type === "node") onNodeSelect(result.value);
    if (result.type === "charger") onChargerSelect(result.value);
  }

  function toggleLayer(layerName) {
    setLayers((current) => ({
      ...current,
      [layerName]: !current[layerName]
    }));
  }

  function styleFeature(feature) {
    const name = getFeatureName(feature);
    const province = getFeatureProvince(feature);
    const context = normalizeAndBindLocation(name, province);

    const selectedName = selectedZone ? getFeatureName(selectedZone) : null;
    const isSelected = selectedName === name;
    const isProvinceActive =
      activeProvince && featureMatchesProvince(feature, activeProvince);

    return {
      color: isSelected || isProvinceActive ? "#111827" : getRiskColor(context.zone),
      weight: isSelected || isProvinceActive ? 3 : 1.5,
      fillColor: getRiskColor(context.zone),
      fillOpacity: isSelected || isProvinceActive ? 0.4 : 0.22,
      opacity: 0.9
    };
  }

  function onEachFeature(feature, layer) {
    const name = getFeatureName(feature);
    const province = getFeatureProvince(feature);
    const context = normalizeAndBindLocation(name, province);

    layer.bindTooltip(
      `<strong>${name}</strong><br/>${province}<br/>Risk: ${context.zone.toUpperCase()}`,
      { sticky: true }
    );

    layer.on({
      click: () => onSelectZone(feature),

      mouseover: () => {
        setHoveredFeature({
          name,
          province,
          risk: context.zone,
          description: context.description
        });

        layer.setStyle({
          weight: 3,
          fillOpacity: 0.42
        });
      },

      mouseout: () => {
        setHoveredFeature(null);

        if (geoJsonRef.current) {
          geoJsonRef.current.resetStyle(layer);
        }
      }
    });
  }

  return (
    <div className="map-view">
      <MapContainer
        center={SOUTH_AFRICA_CENTER}
        zoom={5}
        minZoom={4}
        maxZoom={12}
        scrollWheelZoom
        className="leaflet-map"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {layers.regions && (
          <GeoJSON
            key={`${activeProvince || "national"}-${
              selectedZone ? getFeatureName(selectedZone) : "none"
            }`}
            ref={geoJsonRef}
            data={displayedGeoJson}
            style={styleFeature}
            onEachFeature={onEachFeature}
          />
        )}

        {layers.corridors &&
          Object.entries(EMPIRICAL_ROUTES).map(([routeKey, route]) => {
            const isActive = activeRoute === routeKey;
            const isHovered = hoveredRoute === routeKey;

            return (
              <Polyline
                key={routeKey}
                positions={route.coordinates}
                pathOptions={{
                  color: isActive ? "#111827" : isHovered ? "#f97316" : "#2563eb",
                  weight: isActive ? 7 : isHovered ? 5 : 2.5,
                  opacity: isActive ? 1 : isHovered ? 0.95 : 0.48,
                  dashArray: isActive ? null : "8 8"
                }}
                eventHandlers={{
                  click: () => onRouteSelect(routeKey),
                  mouseover: () => setHoveredRoute(routeKey),
                  mouseout: () => setHoveredRoute(null)
                }}
              >
                <Tooltip sticky>
                  <strong>{route.name}</strong>
                  <br />
                  Click to inspect corridor
                </Tooltip>
              </Polyline>
            );
          })}

        {layers.existingChargers &&
          displayedBaselineChargers.map((charger) => {
            const statusColor = getChargerStatusColor(charger.status);
            const isActiveCharger = activeCharger?.id === charger.id;

            return (
              <Marker
                key={charger.id}
                position={[charger.coordinates[1], charger.coordinates[0]]}
                eventHandlers={{
                  click: () => onChargerSelect(charger)
                }}
                icon={L.divIcon({
                  className: "existing-charger-marker",
                  html: `<div style="
                    background:${statusColor};
                    width:${isActiveCharger ? "22px" : "18px"};
                    height:${isActiveCharger ? "22px" : "18px"};
                    border-radius:5px;
                    border:3px solid #ffffff;
                    box-shadow:0 0 0 ${isActiveCharger ? "4px" : "2px"} #111827, 0 8px 14px rgba(0,0,0,0.28);
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    color:#111827;
                    font-size:10px;
                    font-weight:900;
                  ">⚡</div>`,
                  iconSize: [24, 24],
                  iconAnchor: [12, 12]
                })}
              >
                <Popup>
                  <strong>{charger.name}</strong>
                  <br />
                  Existing charger baseline
                  <br />
                  Status: {charger.status}
                  <br />
                  Chargers: {charger.chargerCount}
                  <br />
                  Max kW: {charger.maxKw}
                  <br />
                  Connectors: {charger.connectorTypes.join(", ")}
                </Popup>
              </Marker>
            );
          })}

        {layers.nodes &&
          spatialNodes.map((node) => {
            const isActiveNode = activeNode?.id === node.id;
            const markerColor = getNodeColor(node.type);

            return (
              <Marker
                key={node.id}
                position={[node.coordinates[1], node.coordinates[0]]}
                eventHandlers={{
                  click: () => onNodeSelect(node)
                }}
                icon={L.divIcon({
                  className: "custom-node-marker",
                  html: `<div style="
                    background:${markerColor};
                    width:${isActiveNode ? "18px" : "14px"};
                    height:${isActiveNode ? "18px" : "14px"};
                    border-radius:999px;
                    border:3px solid white;
                    box-shadow:0 0 0 ${isActiveNode ? "4px" : "2px"} #111827, 0 6px 12px rgba(0,0,0,0.25);
                  "></div>`,
                  iconSize: [20, 20],
                  iconAnchor: [10, 10]
                })}
              >
                <Popup>
                  <strong>{node.name}</strong>
                  <br />
                  {String(node.type).replace(/_/g, " ")}
                  <br />
                  {node.province}
                </Popup>
              </Marker>
            );
          })}

        <RecenterMap
          activeProvince={activeProvince}
          activeRoute={activeRoute}
          selectedZone={selectedZone}
          activeNode={activeNode}
          activeCharger={activeCharger}
          provinceGeoJson={provinceGeoJson}
          fullGeoJson={parsedGeoJson}
        />
      </MapContainer>

      <div className="map-floating-card">
        <strong>TerrainIntel</strong>
        <span>Public EV infrastructure intelligence layer</span>
      </div>

      <div className="map-search-card">
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search province, route, node or charger..."
        />

        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <button key={result.id} onClick={() => handleSearchSelect(result)}>
                <strong>{result.label}</strong>
                <span>{result.subtitle}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button className="map-reset-button" onClick={handleResetMap}>
        Reset Map
      </button>

      <div className="map-layer-control">
        <strong>Map Layers</strong>

        <label>
          <input
            type="checkbox"
            checked={layers.regions}
            onChange={() => toggleLayer("regions")}
          />
          Regions
        </label>

        <label>
          <input
            type="checkbox"
            checked={layers.corridors}
            onChange={() => toggleLayer("corridors")}
          />
          Corridors
        </label>

        <label>
          <input
            type="checkbox"
            checked={layers.nodes}
            onChange={() => toggleLayer("nodes")}
          />
          Intelligence Nodes
        </label>

        <label>
          <input
            type="checkbox"
            checked={layers.existingChargers}
            onChange={() => toggleLayer("existingChargers")}
          />
          Existing Chargers
        </label>
      </div>

      <div className="legend-toggle-wrap">
        <button
          className="legend-toggle-button"
          onClick={() => setShowLegend((current) => !current)}
        >
          {showLegend ? "Hide Legend" : "Show Legend"}
        </button>

        {showLegend && (
          <div className="map-legend">
            <div className="legend-header">
              <strong>Legend</strong>
              <button onClick={() => setShowLegend(false)}>×</button>
            </div>

            <div>
              <span className="legend-dot green"></span>
              Low risk / available charger
            </div>

            <div>
              <span className="legend-dot yellow"></span>
              Moderate risk / mixed charger status
            </div>

            <div>
              <span className="legend-dot red"></span>
              High risk / offline or constrained
            </div>

            <div>
              <span className="legend-line"></span>
              National corridor
            </div>

            <div>
              <span className="legend-charger"></span>
              Existing charger baseline
            </div>

            <div>
              <span className="legend-dot orange"></span>
              Economic / regional node
            </div>

            <div>
              <span className="legend-dot black"></span>
              Logistics node
            </div>

            <div>
              <span className="legend-dot white"></span>
              Port / coastal node
            </div>

            <div>
              <span className="legend-dot purple"></span>
              Industrial node
            </div>

            <div>
              <span className="legend-dot pink"></span>
              Knowledge node
            </div>

            <div>
              <span className="legend-dot grey"></span>
              Border node
            </div>
          </div>
        )}
      </div>

      {hoveredFeature && (
        <div className="map-hover-card">
          <strong>{hoveredFeature.name}</strong>
          <span>{hoveredFeature.province}</span>
          <span>Risk: {hoveredFeature.risk.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}