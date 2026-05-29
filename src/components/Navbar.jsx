import { useState } from "react";
import { Link } from "react-router-dom";
import AccessModal from "./AccessModal";

export default function Navbar() {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
    <>
      <header className="iq-navbar">
        <div className="iq-navbar-inner">
          <Link to="/" className="iq-logo-wrap">
            <img src="/iq4ev-logo.png" alt="IQ4EV" className="iq-logo" />
          </Link>

          <nav className="iq-nav-links">
            <Link to="/about">About</Link>
            <Link to="/terrainintel">TerrainIntel</Link>
            <Link to="/pulse360">Pulse360</Link>
            <Link to="/evss">EVSS</Link>
            <Link to="/briefings">Briefings</Link>
            <Link to="/consulting">Consulting</Link>
          </nav>

          <button
            type="button"
            className="iq-access-btn"
            onClick={() => setShowAccessModal(true)}
          >
            Request Access
          </button>
        </div>
      </header>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        defaultRequestType="Request IQ4EV Access"
      />
    </>
  );
}