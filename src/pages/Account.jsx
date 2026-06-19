import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";

function getStatusLabel({ isAdmin, isSubscriber, profile }) {
  if (isAdmin) return "Admin access";
  if (isSubscriber) return "Active subscriber";

  switch (profile?.subscription_status) {
    case "cancelled":
      return "Subscription cancelled";
    case "expired":
      return "Subscription expired";
    case "past_due":
      return "Payment pending";
    case "inactive":
      return "Subscription inactive";
    default:
      return "Access pending";
  }
}

function getStatusMessage({ isAdmin, isSubscriber, profile }) {
  if (isAdmin) {
    return "You can manage IQ4EV content and view restricted briefings.";
  }

  if (isSubscriber) {
    return "You currently have access to IQ4EV Enterprise Briefings.";
  }

  switch (profile?.subscription_status) {
    case "cancelled":
      return "This subscription has been cancelled. Briefing access is no longer active.";
    case "expired":
      return "This subscription has expired. Renew your subscription to restore briefing access.";
    case "past_due":
      return "Payment has not been received. Briefing access may be blocked pending payment.";
    case "inactive":
      return "This email is recognised, but briefing access is not active yet.";
    default:
      return "This account is recognised, but briefing access has not been activated yet.";
  }
}

export default function Account() {
  const navigate = useNavigate();
  const { user, profile, loading, isSubscriber, isAdmin } = useAuth();

  const statusLabel = getStatusLabel({ isAdmin, isSubscriber, profile });
  const statusMessage = getStatusMessage({ isAdmin, isSubscriber, profile });

  async function handleLogout() {
    if (!supabase) return;

    await supabase.auth.signOut();
    navigate("/login");
  }

  if (loading) {
    return (
      <>
      <SEO {...seoConfig.account} />
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">IQ4EV Access</p>
          <h1>Checking access…</h1>
        </section>
      </main>
      </>
    );
  }

  if (!user) {
    return (
      <>
      <SEO {...seoConfig.account} />
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Access required</p>
          <h1>You are not logged in.</h1>
          <p className="auth-lead">
            Log in with the email connected to your briefing subscription.
          </p>
          <Link className="auth-link-button" to="/login">
            Go to login
          </Link>
        </section>
      </main>
      </>
    );
  }

  return (
    <>
    <SEO {...seoConfig.account} />
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">IQ4EV Account</p>

        <h1>Briefing access</h1>

        <div className="account-status-card">
          <span>Status</span>

          <strong>{statusLabel}</strong>

          <p>{statusMessage}</p>
        </div>

        {!isSubscriber && !isAdmin && (
          <div className="account-support-card">
            <strong>Access or payment support</strong>
            <p>
              Subscription-related notices are sent from
              do-not-reply@iq4ev.co.za. For questions, renewal support,
              cancellation concerns or account assistance, contact
              info@iq4ev.co.za.
            </p>
          </div>
        )}

        <div className="account-details">
          <div>
            <span>Email</span>
            <strong>{user.email}</strong>
          </div>

          {profile?.company && (
            <div>
              <span>Company</span>
              <strong>{profile.company}</strong>
            </div>
          )}

          {profile?.position && (
            <div>
              <span>Position</span>
              <strong>{profile.position}</strong>
            </div>
          )}

          {profile?.subscription_status && (
            <div>
              <span>Subscription record</span>
              <strong>{profile.subscription_status}</strong>
            </div>
          )}
        </div>

        <div className="account-actions">
          {isSubscriber || isAdmin ? (
            <Link to="/briefings">View briefings</Link>
          ) : (
            <Link to="/subscribe">Renew or activate subscription</Link>
          )}

          <Link to="/account/settings">Account settings</Link>

          {isAdmin && <Link to="/admin">Admin dashboard</Link>}

          <button type="button" onClick={handleLogout}>
            Log out
          </button>
        </div>

        <p className="auth-support-note">
          Further account, privacy or subscription communication should be
          directed to info@iq4ev.co.za.
        </p>
      </section>
    </main>
    </>
  );
}