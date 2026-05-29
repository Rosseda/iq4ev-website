import { useState } from "react";
import AccessModal from "../components/AccessModal.jsx";

export default function Briefings() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
    <main className="ti-page briefings-page">
      <section className="brief-hero">
        <div className="brief-copy">
          <p className="pulse-kicker">Enterprise Briefings</p>

          <h1>
            Strategic EV intelligence interpreted for decisions, not inbox
            clutter.
          </h1>

          <p className="pulse-lead">
            IQ4EV briefings help organisations understand what EV infrastructure
            signals, policy changes, market movement and operational risks mean
            for investment, planning and strategy in South Africa.
          </p>

          <div className="pulse-actions">
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request briefing access
            </button>
            <a href="#briefing-types">View briefing types</a>
          </div>
        </div>

        <div className="brief-visual">
          <div className="brief-document main">
            <span>Weekly Intelligence</span>
            <strong>Infrastructure signals</strong>
            <p>
              Corridor shifts, public charging activity, policy movement and
              commercial implications.
            </p>
          </div>

          <div className="brief-document small one">
            <span>Risk note</span>
            <strong>Grid readiness</strong>
          </div>

          <div className="brief-document small two">
            <span>Opportunity</span>
            <strong>Property hosts</strong>
          </div>

          <div className="brief-line" />
          <div className="brief-dot dot-a" />
          <div className="brief-dot dot-b" />
        </div>
      </section>

      <section id="briefing-types" className="ti-metrics">
        <article>
          <span>01</span>
          <strong>Infrastructure briefings</strong>
          <p>
            Interpretation of charging infrastructure, corridors, regions,
            deployment signals and operational readiness.
          </p>
        </article>

        <article>
          <span>02</span>
          <strong>Market intelligence</strong>
          <p>
            Strategic commentary on OEM activity, fleet movement, policy
            changes, investment signals and sector direction.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Executive interpretation</strong>
          <p>
            Concise decision-focused summaries that explain what developments
            mean for your organisation.
          </p>
        </article>
      </section>

      <section className="ti-decision-layer">
        <div>
          <p className="ti-kicker">Not a newsletter</p>
          <h2>
            Briefings are designed to help leadership understand what matters,
            why it matters and what to watch next.
          </h2>
        </div>

        <div className="ti-stack">
          <article>
            <span>Commercial meaning</span>
            <p>
              Translate public EV sector activity into implications for
              investment, infrastructure, partnerships and positioning.
            </p>
          </article>

          <article>
            <span>Risk interpretation</span>
            <p>
              Understand where policy, infrastructure, grid, uptime or adoption
              risk may affect planning decisions.
            </p>
          </article>

          <article>
            <span>Strategic timing</span>
            <p>
              Identify when a development is simply news and when it signals a
              shift your organisation should prepare for.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-use-cases">
        <p className="ti-kicker">Briefing audiences</p>

        <div className="ti-use-grid">
          <article>
            <h3>Executives</h3>
            <p>
              Decision-ready summaries for leadership teams and strategic
              planning discussions.
            </p>
          </article>

          <article>
            <h3>OEM teams</h3>
            <p>
              Infrastructure, adoption and customer-readiness signals for EV
              market positioning.
            </p>
          </article>

          <article>
            <h3>Municipalities</h3>
            <p>
              Interpretation of infrastructure readiness, corridors and local EV
              development signals.
            </p>
          </article>

          <article>
            <h3>Operators</h3>
            <p>
              Commentary on charger networks, uptime, deployment opportunity and
              infrastructure risk.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-cta">
        <div>
          <p className="ti-kicker">Request briefing access</p>
          <h2>Need EV intelligence interpreted for your organisation?</h2>
          <p>
            Submit a briefing request and IQ4EV will follow up manually to
            understand your intelligence needs, audience and subscription or
            consultation pathway.
          </p>
        </div>

        <button type="button" onClick={() => setShowAccessModal(true)}>
          Request briefing
        </button>
      </section>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        defaultPlatform="Enterprise Briefings"
        defaultRequestType="Request Enterprise Briefing Access"
      />
    </main>
  );
}