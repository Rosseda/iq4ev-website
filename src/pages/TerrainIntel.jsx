import { useState } from "react";
import { Link } from "react-router-dom";
import AccessModal from "../components/AccessModal.jsx";

export default function TerrainIntel() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
    <main className="ti-page">
      <section className="ti-hero">
        <div className="ti-hero-copy">
          <p className="ti-kicker">TerrainIntel Enterprise Layer</p>

          <h1>
            Spatial intelligence for EV infrastructure decisions across South
            Africa.
          </h1>

          <p className="ti-lead">
            TerrainIntel helps OEMs, municipalities, charge point operators,
            property groups and fleet stakeholders understand where EV
            infrastructure is viable, constrained, strategically important, or
            commercially under-supported.
          </p>

          <div className="ti-actions">
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request TerrainIntel briefing
            </button>

            <Link to="/">Open public map</Link>
          </div>
        </div>

        <div className="ti-map-card">
          <div className="ti-map-topbar">
            <span />
            <span />
            <span />
          </div>

          <div className="ti-map-grid">
            <div className="ti-zone green">Metro readiness</div>
            <div className="ti-zone yellow">Corridor watch</div>
            <div className="ti-zone red">Constraint zone</div>
            <div className="ti-route route-a" />
            <div className="ti-route route-b" />
            <div className="ti-node node-a" />
            <div className="ti-node node-b" />
            <div className="ti-node node-c" />
          </div>

          <div className="ti-map-caption">
            <span>Public map</span>
            <strong>Limited Green / Yellow / Red zoning</strong>
            <p>
              The homepage map shows public signals only. Enterprise
              TerrainIntel interprets why the signals matter.
            </p>
          </div>
        </div>
      </section>

      <section className="ti-metrics">
        <article>
          <span>01</span>
          <strong>Regions</strong>
          <p>Provincial, municipal and city-level infrastructure signals.</p>
        </article>

        <article>
          <span>02</span>
          <strong>Corridors</strong>
          <p>
            Route-based readiness, gaps, movement logic and deployment risk.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Zoning</strong>
          <p>
            Green, yellow and red classifications with strategic reasoning.
          </p>
        </article>
      </section>

      <section className="ti-decision-layer">
        <div>
          <p className="ti-kicker">Enterprise decision layer</p>
          <h2>
            Designed for planning before infrastructure money is committed.
          </h2>
        </div>

        <div className="ti-stack">
          <article>
            <span>Deployment screening</span>
            <p>
              Identify where public EV infrastructure makes strategic sense
              before progressing to detailed site analysis.
            </p>
          </article>

          <article>
            <span>Corridor interpretation</span>
            <p>
              Compare logistics, tourism, metro access and regional charging
              dependencies across major routes.
            </p>
          </article>

          <article>
            <span>Readiness briefings</span>
            <p>
              Translate infrastructure signals into boardroom-ready planning
              notes, risks and next-step recommendations.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-use-cases">
        <p className="ti-kicker">Who uses TerrainIntel?</p>

        <div className="ti-use-grid">
          <article>
            <h3>Municipalities</h3>
            <p>
              Understand public readiness, corridor dependency and infrastructure
              gaps.
            </p>
          </article>

          <article>
            <h3>OEMs</h3>
            <p>
              Interpret EV market readiness by region, corridor and customer
              geography.
            </p>
          </article>

          <article>
            <h3>CPOs</h3>
            <p>
              Screen deployment zones before committing engineering and capex
              resources.
            </p>
          </article>

          <article>
            <h3>Property groups</h3>
            <p>
              Understand where hosted charging may create strategic property
              value.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-cta">
        <div>
          <p className="ti-kicker">Request a consultation</p>
          <h2>Need deeper regional or corridor intelligence?</h2>
          <p>
            Submit a TerrainIntel request and IQ4EV will follow up manually with
            the appropriate briefing or consultation pathway.
          </p>
        </div>

        <button type="button" onClick={() => setShowAccessModal(true)}>
          Request briefing
        </button>
      </section>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        defaultPlatform="TerrainIntel"
        defaultRequestType="Request TerrainIntel Briefing"
      />
    </main>
  );
}