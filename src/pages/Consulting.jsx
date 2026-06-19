import { useState } from "react";
import AccessModal from "../components/AccessModal.jsx";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";

export default function Consulting() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
    <>
      <SEO {...seoConfig.consulting} />
    <main className="ti-page consulting-page">
      <section className="consult-hero">
        <div className="consult-copy">
          <p className="pulse-kicker">IQ4EV Consulting</p>

          <h1>
            Strategic EV infrastructure consulting grounded in operational
            intelligence.
          </h1>

          <p className="pulse-lead">
            IQ4EV supports organisations navigating EV infrastructure,
            electrification strategy, charging deployment, fleet transition,
            operational readiness and infrastructure intelligence in South
            Africa.
          </p>

          <div className="pulse-actions">
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request consultation
            </button>

            <a href="#consulting-areas">Explore consulting areas</a>
          </div>
        </div>

        <div className="consult-visual">
          <div className="consult-grid">
            <div className="consult-box large">
              <small>Infrastructure strategy</small>
              <strong>Deployment intelligence</strong>
            </div>

            <div className="consult-box">
              <small>Fleet readiness</small>
              <strong>EVSS</strong>
            </div>

            <div className="consult-box">
              <small>Charging visibility</small>
              <strong>Pulse360</strong>
            </div>

            <div className="consult-box">
              <small>Spatial analysis</small>
              <strong>TerrainIntel</strong>
            </div>
          </div>

          <div className="consult-overlay">
            <span>Strategic support</span>
            <strong>Infrastructure + operational intelligence</strong>
          </div>
        </div>
      </section>

      <section id="consulting-areas" className="ti-metrics">
        <article>
          <span>01</span>
          <strong>Infrastructure planning</strong>
          <p>
            Support infrastructure strategy, charging deployment planning and
            readiness interpretation.
          </p>
        </article>

        <article>
          <span>02</span>
          <strong>Fleet transition</strong>
          <p>
            Assist organisations evaluating EV fleet pathways, operational
            readiness and simulation-led planning.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Strategic interpretation</strong>
          <p>
            Translate EV infrastructure and operational signals into executive
            decision support.
          </p>
        </article>
      </section>

      <section className="ti-decision-layer">
        <div>
          <p className="ti-kicker">Consulting approach</p>

          <h2>
            IQ4EV approaches EV transition as an infrastructure systems problem,
            not only a vehicle problem.
          </h2>
        </div>

        <div className="ti-stack">
          <article>
            <span>Evidence-led planning</span>
            <p>
              Infrastructure decisions should be informed by operational,
              spatial and deployment intelligence — not assumptions alone.
            </p>
          </article>

          <article>
            <span>Cross-platform intelligence</span>
            <p>
              IQ4EV combines TerrainIntel, Pulse360 and EVSS perspectives to
              interpret infrastructure, operational and readiness conditions.
            </p>
          </article>

          <article>
            <span>Strategic interpretation</span>
            <p>
              The goal is not only analytics. The goal is helping organisations
              understand what actions make sense operationally and commercially.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-use-cases">
        <p className="ti-kicker">Consulting audiences</p>

        <div className="ti-use-grid">
          <article>
            <h3>Municipalities</h3>
            <p>
              EV readiness interpretation, infrastructure strategy and regional
              planning support.
            </p>
          </article>

          <article>
            <h3>OEMs</h3>
            <p>
              Market readiness, infrastructure visibility and customer support
              interpretation.
            </p>
          </article>

          <article>
            <h3>Fleet operators</h3>
            <p>
              Fleet transition readiness, route analysis and charging strategy
              interpretation.
            </p>
          </article>

          <article>
            <h3>Property groups</h3>
            <p>
              Charging infrastructure opportunity and operational visibility for
              hosted assets.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-cta">
        <div>
          <p className="ti-kicker">Request strategic support</p>

          <h2>Need EV infrastructure or operational consulting?</h2>

          <p>
            Submit a consultation request and IQ4EV will follow up manually to
            understand your organisation, objectives and support requirements.
          </p>
        </div>

        <button type="button" onClick={() => setShowAccessModal(true)}>
          Request consultation
        </button>
      </section>

      <AccessModal
       open={showAccessModal}
       onClose={() => setShowAccessModal(false)}
       mode="consulting"
       defaultPlatform="Strategic Consulting"
       defaultRequestType="Request IQ4EV Consulting"
    />
    </main>
    </>
  );
}