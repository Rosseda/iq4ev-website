import { useState } from "react";
import AccessModal from "../components/AccessModal.jsx";

export default function EVSS() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
    <main className="ti-page evss-page">
      <section className="evss-hero">
        <div className="evss-copy">
          <p className="pulse-kicker">EVSS Simulation Layer</p>

          <h1>
            EV fleet simulation and operational readiness before deployment.
          </h1>

          <p className="pulse-lead">
            EVSS helps fleet operators, OEMs, municipalities and logistics
            stakeholders test whether electrification assumptions hold up under
            real-world operating conditions such as routes, terrain, charging
            access, weather and duty-cycle pressure.
          </p>

          <div className="pulse-actions">
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request EVSS consultation
            </button>
            <a href="#evss-capabilities">Explore simulation areas</a>
          </div>

          <div className="pulse-mini-metrics">
            <div>
              <strong>Route stress</strong>
              <span>Terrain and distance pressure</span>
            </div>

            <div>
              <strong>Charging assumptions</strong>
              <span>Depot and public charging scenarios</span>
            </div>

            <div>
              <strong>Fleet readiness</strong>
              <span>Operational viability before rollout</span>
            </div>
          </div>
        </div>

        <div className="evss-visual">
          <div className="evss-orbit">
            <span className="evss-core">EVSS</span>
            <span className="evss-node route">Route</span>
            <span className="evss-node terrain">Terrain</span>
            <span className="evss-node charging">Charging</span>
            <span className="evss-node weather">Weather</span>
            <span className="evss-node depot">Depot</span>
          </div>

          <div className="evss-sim-card">
            <small>Simulation result</small>
            <strong>Conditional readiness</strong>
            <p>
              Fleet electrification appears viable under controlled charging and
              route planning assumptions.
            </p>
          </div>
        </div>
      </section>

      <section id="evss-capabilities" className="ti-metrics">
        <article>
          <span>01</span>
          <strong>Route behaviour</strong>
          <p>
            Simulate how routes, distance, terrain and operating patterns affect
            EV suitability.
          </p>
        </article>

        <article>
          <span>02</span>
          <strong>Charging strategy</strong>
          <p>
            Compare depot charging, public charging reliance and operational
            charging windows.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Stress testing</strong>
          <p>
            Identify where assumptions fail under weather, load, scheduling or
            infrastructure constraints.
          </p>
        </article>
      </section>

      <section className="ti-decision-layer">
        <div>
          <p className="ti-kicker">Why EVSS exists</p>
          <h2>
            EV transition fails when planning assumes vehicles behave the same
            under every route, load and charging condition.
          </h2>
        </div>

        <div className="ti-stack">
          <article>
            <span>For fleet operators</span>
            <p>
              Test operational readiness before committing vehicles, depots and
              charging infrastructure.
            </p>
          </article>

          <article>
            <span>For municipalities</span>
            <p>
              Understand fleet electrification pathways across service routes,
              depot constraints and public infrastructure gaps.
            </p>
          </article>

          <article>
            <span>For OEMs</span>
            <p>
              Support customer readiness by interpreting where EVs fit, where
              support is needed and where assumptions may fail.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-use-cases">
        <p className="ti-kicker">Simulation dimensions</p>

        <div className="ti-use-grid">
          <article>
            <h3>Terrain</h3>
            <p>
              Analyse how elevation, route profile and geography affect energy
              assumptions.
            </p>
          </article>

          <article>
            <h3>Weather</h3>
            <p>
              Account for environmental conditions that may affect range and
              operational reliability.
            </p>
          </article>

          <article>
            <h3>Depot readiness</h3>
            <p>
              Understand whether charging windows and depot assumptions support
              actual operations.
            </p>
          </article>

          <article>
            <h3>Scenario planning</h3>
            <p>
              Compare different fleet, charger, route and utilisation
              assumptions before rollout.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-cta">
        <div>
          <p className="ti-kicker">Request a simulation consultation</p>
          <h2>Need to test an EV fleet transition scenario?</h2>
          <p>
            Submit an EVSS request and IQ4EV will follow up manually to
            understand your fleet, routes, charging assumptions and readiness
            questions.
          </p>
        </div>

        <button type="button" onClick={() => setShowAccessModal(true)}>
          Request EVSS consultation
        </button>
      </section>

      <AccessModal
       open={showAccessModal}
       onClose={() => setShowAccessModal(false)}
       mode="evss"
       defaultPlatform="EVSS"
       defaultRequestType="Request EVSS Consultation"
    />
    </main>
  );
}