import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AccessModal from "./AccessModal";
import { useAuth } from "../contexts/AuthContext.jsx";

const BASE_NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/terrainintel", label: "TerrainIntel" },
  { to: "/pulse360", label: "Pulse360" },
  { to: "/evss", label: "EVSS" },
  { to: "/insights", label: "Insights" },
  { to: "/briefings", label: "Briefings" },
  { to: "/consulting", label: "Consulting" },
];

export default function Navbar() {
  const { isLoggedIn, isAdmin } = useAuth();

  const [showAccessModal, setShowAccessModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    ...BASE_NAV_LINKS,
    ...(isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
    { to: isLoggedIn ? "/account" : "/login", label: isLoggedIn ? "Account" : "Login" },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openAccessModal = () => {
    setMobileMenuOpen(false);
    setShowAccessModal(true);
  };

  const isActiveLink = (path) => {
    if (path === "/insights") {
      return (
        location.pathname === "/insights" ||
        location.pathname.startsWith("/insights/")
      );
    }

    if (path === "/briefings") {
      return (
        location.pathname === "/briefings" ||
        location.pathname.startsWith("/briefings/")
      );
    }

    if (path === "/admin") {
      return location.pathname === "/admin" || location.pathname.startsWith("/admin/");
    }

    if (path === "/account") {
      return (
        location.pathname === "/account" ||
        location.pathname.startsWith("/account/")
      );
    }

    return location.pathname === path;
  };

  return (
    <>
      <header className="iq-navbar">
        <div className="iq-navbar-inner">
          <Link to="/" className="iq-logo-wrap" onClick={closeMobileMenu}>
            <img src="/iq4ev-logo.png" alt="IQ4EV" className="iq-logo" />
          </Link>

          <nav className="iq-nav-links" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={isActiveLink(item.to) ? "is-active" : ""}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="iq-navbar-actions">
            {!isLoggedIn && (
              <button
                type="button"
                className="iq-access-btn"
                onClick={openAccessModal}
              >
                Request Access
              </button>
            )}

            <button
              type="button"
              className="iq-mobile-menu-btn"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div
          className={`iq-mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}
          aria-hidden={!mobileMenuOpen}
        >
          <nav aria-label="Mobile navigation">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={isActiveLink(item.to) ? "is-active" : ""}
                onClick={closeMobileMenu}
              >
                {item.label}
              </Link>
            ))}

            {!isLoggedIn && (
              <button type="button" onClick={openAccessModal}>
                Request Access
              </button>
            )}
          </nav>
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