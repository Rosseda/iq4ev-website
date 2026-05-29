import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="iq-footer">
      <div className="iq-footer-main">
        <div className="iq-footer-brand">
          <img src="/iq4ev-logo.png" alt="IQ4EV" />

          <div>
            <h2>IQ4EV</h2>
            <p>
              Strategic EV intelligence, infrastructure interpretation and
              operational readiness support for South Africa’s transition era.
            </p>
          </div>
        </div>

        <div className="iq-footer-columns">
          <div>
            <h3>Platforms</h3>
            <Link to="/terrainintel">TerrainIntel</Link>
            <Link to="/pulse360">Pulse360</Link>
            <Link to="/evss">EVSS</Link>
          </div>

          <div>
            <h3>Intelligence</h3>
            <Link to="/briefings">Enterprise Briefings</Link>
            <Link to="/consulting">Consulting</Link>
            <Link to="/insights">Insights</Link>
          </div>

          <div>
            <h3>Company</h3>
            <Link to="/about">About IQ4EV</Link>
            <Link to="/contact">Request Access</Link>
          </div>
        </div>
      </div>

      <div className="iq-footer-bottom">
        <span>
          IQ4EV (Pty) Ltd · Strategic EV Data & Consulting · info@iq4ev.co.za
        </span>

        <span>Public intelligence layer · Enterprise onboarding by request</span>
      </div>
    </footer>
  );
}