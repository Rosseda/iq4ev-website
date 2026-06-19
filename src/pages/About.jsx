import { useState } from "react";
import AccessModal from "../components/AccessModal.jsx";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";

export default function About() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
  <>
    <SEO {...seoConfig.about} />

    <main className="ti-page about-page">
      <section className="about-hero">
        <div className="about-copy">
          <p className="pulse-kicker">About IQ4EV</p>

          <h1>
            EV intelligence infrastructure for South Africa’s transition era.
          </h1>

          <p className="pulse-lead">
            IQ4EV is an EV intelligence and infrastructure consulting ecosystem
            focused on helping organisations move from assumptions to
            evidence-led EV infrastructure and operational decisions.
          </p>

          <div className="pulse-actions">
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request consultation
            </button>

            <a href="/">Open public intelligence map</a>
          </div>
        </div>

        <div className="about-visual">
          <div className="about-layer terrain">
            <span>TerrainIntel</span>
            <strong>Spatial intelligence</strong>
          </div>

          <div className="about-layer pulse">
            <span>Pulse360</span>
            <strong>Operational visibility</strong>
          </div>

          <div className="about-layer evss">
            <span>EVSS</span>
            <strong>Fleet simulation</strong>
          </div>

          <div className="about-core">
            <small>IQ4EV</small>
            <strong>Infrastructure intelligence ecosystem</strong>
          </div>
        </div>
      </section>

      <section className="ti-metrics">
        <article>
          <span>01</span>
          <strong>Infrastructure intelligence</strong>
          <p>
            Understand charging infrastructure, deployment readiness, corridors
            and operational infrastructure conditions.
          </p>
        </article>

        <article>
          <span>02</span>
          <strong>Operational interpretation</strong>
          <p>
            Translate infrastructure signals into strategic, operational and
            commercial meaning for organisations.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Consultation-led access</strong>
          <p>
            IQ4EV follows an enterprise onboarding approach rather than instant
            self-service platform access.
          </p>
        </article>
      </section>

      <section className="ti-decision-layer">
        <div>
          <p className="ti-kicker">The IQ4EV approach</p>

          <h2>
            EV transition is not only about vehicles. It is about systems,
            infrastructure, operations and readiness.
          </h2>
        </div>

        <div className="ti-stack">
          <article>
            <span>TerrainIntel</span>
            <p>
              Spatial deployment intelligence focused on corridors, readiness,
              zoning and regional infrastructure interpretation.
            </p>
          </article>

          <article>
            <span>Pulse360</span>
            <p>
              Charger and property intelligence focused on operational
              visibility, uptime awareness and infrastructure reporting.
            </p>
          </article>

          <article>
            <span>EVSS</span>
            <p>
              Fleet simulation and operational readiness focused on terrain,
              charging assumptions, routes and stress testing.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-use-cases">
        <p className="ti-kicker">Who IQ4EV supports</p>

        <div className="ti-use-grid">
          <article>
            <h3>OEMs</h3>
            <p>
              EV infrastructure intelligence, readiness interpretation and
              strategic market insight.
            </p>
          </article>

          <article>
            <h3>Municipalities</h3>
            <p>
              EV readiness, infrastructure planning and strategic transition
              support.
            </p>
          </article>

          <article>
            <h3>Operators</h3>
            <p>
              Charging infrastructure visibility, operational interpretation and
              deployment intelligence.
            </p>
          </article>

          <article>
            <h3>Fleet stakeholders</h3>
            <p>
              Electrification readiness, simulation support and operational
              planning intelligence.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-cta">
        <div>
          <p className="ti-kicker">Strategic support</p>

          <h2>Need EV infrastructure intelligence or consulting support?</h2>

          <p>
            Submit a consultation request and IQ4EV will follow up manually to
            understand your infrastructure, operational or strategic needs.
          </p>
        </div>

        <button type="button" onClick={() => setShowAccessModal(true)}>
          Request consultation
        </button>
      </section>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        defaultRequestType="Request IQ4EV Consultation"
      />
     </main>
  </>
);
}