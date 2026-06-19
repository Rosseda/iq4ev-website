import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AccessModal from "../components/AccessModal.jsx";
import SEO from "../components/SEO.jsx";
import MapView from "../data/components/MapView.jsx";
import seoConfig from "../data/seoConfig.js";
import {
  organizationSchema,
  websiteSchema,
  professionalServiceSchema,
  homeFaqSchema,
} from "../data/structuredData.js";

const HOME_NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/terrainintel", label: "TerrainIntel" },
  { to: "/pulse360", label: "Pulse360" },
  { to: "/evss", label: "EVSS" },
  { to: "/insights", label: "Insights" },
  { to: "/briefings", label: "Briefings" },
  { to: "/consulting", label: "Consulting" },
];

export default function Home() {
  const [selectedZone, setSelectedZone] = useState(null);
  const [activeProvince, setActiveProvince] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const [activeNode, setActiveNode] = useState(null);
  const [activeCharger, setActiveCharger] = useState(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [intelPanelOpen, setIntelPanelOpen] = useState(true);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 760px)");

    const applyInitialPanelState = () => {
      setIntelPanelOpen(!mobileQuery.matches);
    };

    applyInitialPanelState();

    mobileQuery.addEventListener("change", applyInitialPanelState);

    return () => {
      mobileQuery.removeEventListener("change", applyInitialPanelState);
    };
  }, []);

  const selectedIntel = useMemo(() => {
    const selected =
      activeNode ||
      activeProvince ||
      activeRoute ||
      selectedZone ||
      activeCharger ||
      null;

    const name =
      selected?.name ||
      selected?.municipality ||
      selected?.city ||
      selected?.label ||
      "Select a region, corridor or node";

    const province =
      selected?.province ||
      selected?.region ||
      selected?.corridor ||
      "South Africa";

    const risk = String(
      selected?.risk ||
        selected?.zone ||
        selected?.readiness ||
        selected?.status ||
        "YELLOW"
    ).toUpperCase();

    let reason =
      selected?.reason ||
      selected?.summary ||
      selected?.description ||
      selected?.note ||
      "";

    if (!reason) {
      if (risk === "GREEN") {
        reason =
          "This area shows stronger public readiness signals, including existing infrastructure activity, strategic demand indicators and better regional accessibility.";
      } else if (risk === "RED") {
        reason =
          "This area shows constrained public readiness signals. Deployment should be treated carefully until grid context, utilisation assumptions and site-level conditions are assessed.";
      } else {
        reason =
          "This area shows mixed public readiness signals. There may be deployment opportunity, but deeper grid, site and demand analysis is required before strategic decisions are made.";
      }
    }

    return {
      name,
      province,
      risk,
      reason,
      isDefault: !selected,
    };
  }, [activeNode, activeProvince, activeRoute, selectedZone, activeCharger]);

  const zoneClass =
    selectedIntel.risk === "GREEN"
      ? "iq4ev-zone-green"
      : selectedIntel.risk === "RED"
        ? "iq4ev-zone-red"
        : "iq4ev-zone-yellow";

  function handleProvinceSelect(province) {
    setActiveProvince(province);
    setActiveRoute(null);
    setSelectedZone(null);
    setActiveNode(null);
    setActiveCharger(null);
    setIntelPanelOpen(true);
  }

  function handleRouteSelect(route) {
    setActiveRoute(route);
    setActiveProvince(null);
    setSelectedZone(null);
    setActiveNode(null);
    setActiveCharger(null);
    setIntelPanelOpen(true);
  }

  function handleZoneSelect(zone) {
    setSelectedZone(zone);
    setActiveRoute(null);
    setActiveNode(null);
    setActiveCharger(null);
    setIntelPanelOpen(true);
  }

  function handleNodeSelect(node) {
    setActiveNode(node);
    setActiveRoute(null);
    setActiveProvince(null);
    setSelectedZone(null);
    setActiveCharger(null);
    setIntelPanelOpen(true);
  }

  function handleChargerSelect(charger) {
    setActiveCharger(charger);
    setActiveRoute(null);
    setActiveNode(null);
    setSelectedZone(null);
    setIntelPanelOpen(true);
  }

  function handleResetMap() {
    setSelectedZone(null);
    setActiveProvince(null);
    setActiveRoute(null);
    setActiveNode(null);
    setActiveCharger(null);
    setResetSignal((current) => current + 1);
    setIntelPanelOpen(false);
  }

  function openAccessModal() {
    setMobileMenuOpen(false);
    setShowAccessModal(true);
  }

  return (
    <>
      <SEO
        {...seoConfig.home}
        schema={[
          organizationSchema,
          websiteSchema,
          professionalServiceSchema,
          homeFaqSchema,
        ]}
      />

      <main className="iq4ev-intel-home">
        <header className="iq4ev-command-nav">
          <Link
            to="/"
          className="iq4ev-command-logo"
          aria-label="IQ4EV home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <img src="/iq4ev-logo.png" alt="IQ4EV" />
        </Link>

        <nav className="iq4ev-command-links" aria-label="Main navigation">
          {HOME_NAV_LINKS.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="iq4ev-command-actions">
          <button
            type="button"
            className="iq4ev-command-reset"
            onClick={handleResetMap}
          >
            Reset
          </button>

          <button
            type="button"
            className="iq4ev-command-access"
            onClick={openAccessModal}
          >
            Request Access
          </button>

          <button
            type="button"
            className="iq4ev-command-menu-btn"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav
          className={`iq4ev-command-mobile-menu ${
            mobileMenuOpen ? "is-open" : ""
          }`}
          aria-label="Mobile navigation"
          aria-hidden={!mobileMenuOpen}
        >
          {HOME_NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <button type="button" onClick={handleResetMap}>
            Reset map
          </button>

          <button type="button" onClick={openAccessModal}>
            Request Access
          </button>
        </nav>
      </header>

      <section className="iq4ev-map-stage" aria-label="TerrainIntel public map">
        <MapView
          selectedZone={selectedZone}
          activeProvince={activeProvince}
          activeRoute={activeRoute}
          activeNode={activeNode}
          activeCharger={activeCharger}
          resetSignal={resetSignal}
          onProvinceSelect={handleProvinceSelect}
          onSelectZone={handleZoneSelect}
          onRouteSelect={handleRouteSelect}
          onNodeSelect={handleNodeSelect}
          onChargerSelect={handleChargerSelect}
          onResetSelection={handleResetMap}
        />
      </section>

      <button
        type="button"
        className="iq4ev-mobile-intel-toggle"
        onClick={() => setIntelPanelOpen((current) => !current)}
      >
        {intelPanelOpen ? "Hide Signal" : "Show Signal"}
      </button>

      <aside
        className={`iq4ev-public-intel-card ${
          intelPanelOpen ? "is-open" : "is-collapsed"
        }`}
      >
        <div className="iq4ev-intel-card-handle" aria-hidden="true" />

        <div className="iq4ev-intel-eyebrow">Public zoning signal</div>

        <h2>{selectedIntel.name}</h2>

        <p className="iq4ev-intel-location">{selectedIntel.province}</p>

        <div className="iq4ev-zone-row">
          <span className={`iq4ev-zone-dot ${zoneClass}`} />
          <strong>{selectedIntel.risk}</strong>
        </div>

        <p>{selectedIntel.reason}</p>

        <div className="iq4ev-intel-note">
          Public layer only. Strategic deployment decisions require deeper
          IQ4EV assessment.
        </div>

        <Link to="/briefings" className="iq4ev-intel-card-cta">
          Request deeper briefing
        </Link>
      </aside>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        defaultRequestType="Request IQ4EV Access"
      />
    </main>
  </>
  );
}