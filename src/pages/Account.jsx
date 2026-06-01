import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";

export default function Account() {
  const { user, profile, loading, isSubscriber, isAdmin } = useAuth();

  async function handleLogout() {
    if (!supabase) return;

    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  if (loading) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">IQ4EV Access</p>
          <h1>Checking access…</h1>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
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
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">IQ4EV Account</p>

        <h1>Briefing access</h1>

        <div className="account-status-card">
          <span>Status</span>

          <strong>
            {isAdmin
              ? "Admin access"
              : isSubscriber
                ? "Active subscriber"
                : "Subscription inactive"}
          </strong>

          <p>
            {isAdmin
              ? "You can manage IQ4EV content and view restricted briefings."
              : isSubscriber
                ? "You currently have access to IQ4EV Enterprise Briefings."
                : "This email is recognised, but briefing access is not active."}
          </p>
        </div>

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
        </div>

        <div className="account-actions">
         {isSubscriber || isAdmin ? (
         <Link to="/briefings">View briefings</Link>
           ) : (
          <Link to="/subscribe">Renew subscription</Link>
         )}

         <Link to="/account/settings">Account settings</Link>

         {isAdmin && <Link to="/admin">Admin dashboard</Link>}

         <button type="button" onClick={handleLogout}>
         Log out
         </button>
     </div>
      </section>
    </main>
  );
}