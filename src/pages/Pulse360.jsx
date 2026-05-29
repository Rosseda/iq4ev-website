import { useState } from "react";
import AccessModal from "../components/AccessModal.jsx";

export default function Pulse360() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
    <main className="ti-page">
      <section className="pulse-hero">
        <div className="pulse-copy">
          <p className="pulse-kicker">Pulse360 Infrastructure Layer</p>

          <h1>
            Charger and property intelligence for operational EV infrastructure
            visibility.
          </h1>

          <p className="pulse-lead">
            Pulse360 helps operators, OEMs and property stakeholders move beyond
            charger installation into infrastructure visibility, uptime
            awareness, reporting intelligence and operational trust.
          </p>

          <div className="pulse-actions">
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request Pulse360 consultation
            </button>

            <a href="#pulse360-capabilities">Explore capabilities</a>
          </div>

          <div className="pulse-mini-metrics">
            <div>
              <strong>Uptime visibility</strong>
              <span>Operational monitoring layer</span>
            </div>

            <div>
              <strong>Property intelligence</strong>
              <span>Host-facing reporting visibility</span>
            </div>

            <div>
              <strong>Infrastructure trust</strong>
              <span>Experience + reliability interpretation</span>
            </div>
          </div>
        </div>

        <div className="pulse-visual">
          <div className="pulse-glow pulse-glow-1" />
          <div className="pulse-glow pulse-glow-2" />

          <div className="pulse-monitor">
            <div className="pulse-monitor-top">
              <span />
              <span />
              <span />
            </div>

            <div className="pulse-monitor-grid">
              <div className="pulse-panel large">
                <small>Network status</small>
                <strong>87%</strong>
                <span>stable infrastructure visibility</span>
              </div>

              <div className="pulse-panel">
                <small>Site risk</small>
                <strong>YELLOW</strong>
              </div>

              <div className="pulse-panel">
                <small>Properties</small>
                <strong>124</strong>
              </div>

              <div className="pulse-panel">
                <small>Nodes monitored</small>
                <strong>418</strong>
              </div>
            </div>

            <div className="pulse-chart">
              <div className="pulse-chart-line" />
            </div>
          </div>
        </div>
      </section>

      <section id="pulse360-capabilities" className="ti-metrics">
        <article>
          <span>01</span>
          <strong>Uptime visibility</strong>
          <p>
            Monitor charger status patterns and identify when infrastructure
            performance may be affecting user experience.
          </p>
        </article>

        <article>
          <span>02</span>
          <strong>Property-host reporting</strong>
          <p>
            Translate technical charger data into usable reporting for retail
            centres, offices, hospitality sites and property portfolios.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Operational risk</strong>
          <p>
            Track sites that may require intervention due to outages, poor
            utilisation, unreliable visibility or reporting gaps.
          </p>
        </article>
      </section>

      <section className="ti-decision-layer">
        <div>
          <p className="ti-kicker">Why Pulse360 exists</p>
          <h2>
            Charging infrastructure is not only a hardware issue. It is a
            property, uptime and trust issue.
          </h2>
        </div>

        <div className="ti-stack">
          <article>
            <span>For property hosts</span>
            <p>
              Understand whether chargers on your property are available,
              visible, reliable and adding value to the location.
            </p>
          </article>

          <article>
            <span>For charge point operators</span>
            <p>
              Improve host reporting, site-level visibility and operational
              intelligence across distributed charging assets.
            </p>
          </article>

          <article>
            <span>For OEMs and partners</span>
            <p>
              Understand infrastructure quality signals that may affect driver
              confidence, customer experience and EV adoption readiness.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-use-cases">
        <p className="ti-kicker">Core intelligence areas</p>

        <div className="ti-use-grid">
          <article>
            <h3>Charger status</h3>
            <p>
              Site-level visibility into whether chargers are available,
              offline, constrained or unknown.
            </p>
          </article>

          <article>
            <h3>Site risk</h3>
            <p>
              Identify properties where infrastructure visibility or uptime may
              create operational exposure.
            </p>
          </article>

          <article>
            <h3>Host reporting</h3>
            <p>
              Create clearer communication between property owners, operators
              and infrastructure partners.
            </p>
          </article>

          <article>
            <h3>Infrastructure confidence</h3>
            <p>
              Support EV market confidence by improving the intelligence layer
              around charging reliability.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-cta">
        <div>
          <p className="ti-kicker">Request a consultation</p>
          <h2>Need charger or property intelligence support?</h2>
          <p>
            Submit a Pulse360 request and IQ4EV will follow up manually to
            understand your infrastructure, sites, reporting needs and
            onboarding pathway.
          </p>
        </div>

        <button type="button" onClick={() => setShowAccessModal(true)}>
          Request consultation
        </button>
      </section>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        defaultPlatform="Pulse360"
        defaultRequestType="Request Pulse360 Consultation"
      />
    </main>
  );
}