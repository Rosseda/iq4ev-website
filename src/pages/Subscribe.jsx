import { Link } from "react-router-dom";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";

export default function Subscribe() {
  const { loading, user, profile, isSubscriber, isAdmin } = useAuth();

  if (loading) {
    return (
      <main className="subscribe-page">
        <section className="subscribe-card">
          <p className="auth-kicker">IQ4EV Enterprise Briefings</p>
          <h1>Checking access…</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="subscribe-page">
      <section className="subscribe-card">
        <div className="subscribe-icon">
          <CreditCard size={24} />
        </div>

        <p className="auth-kicker">IQ4EV Enterprise Briefings</p>

        <h1>Subscribe for strategic EV intelligence.</h1>

        <p className="subscribe-lead">
          Access subscriber-only IQ4EV Enterprise Briefings for infrastructure,
          fleet, property, policy, grid and charging behaviour intelligence.
        </p>

        <div className="subscribe-price-card">
          <span>Monthly access</span>
          <strong>R300</strong>
          <p>per month · billed through the secure Nedbank payment gateway</p>
        </div>

        <div className="subscribe-benefits">
          <article>
            <Lock size={18} />
            <div>
              <strong>Subscriber-only briefings</strong>
              <p>
                Full briefing content opens only for active subscribers and
                IQ4EV administrators.
              </p>
            </div>
          </article>

          <article>
            <ShieldCheck size={18} />
            <div>
              <strong>Access linked to your email</strong>
              <p>
                Your briefing access is controlled by the email used during
                subscription.
              </p>
            </div>
          </article>
        </div>

        {user ? (
          <div className="subscribe-status-box">
            <span>Current account</span>
            <strong>{user.email}</strong>
            <p>
              Status:{" "}
              {isAdmin
                ? "Admin access"
                : isSubscriber
                  ? "Active subscriber"
                  : profile?.subscription_status || "Inactive"}
            </p>
          </div>
        ) : (
          <div className="subscribe-status-box">
            <span>No account detected</span>
            <strong>Create access first</strong>
            <p>
              Please request briefing access first so your subscription can be
              linked to your email address.
            </p>
          </div>
        )}

        {isSubscriber || isAdmin ? (
          <Link className="subscribe-primary-button" to="/briefings">
            View enterprise briefings
          </Link>
        ) : user ? (
          <button
            type="button"
            className="subscribe-primary-button"
            onClick={() =>
              alert(
                "Nedbank payment gateway integration will connect here. For now, activate this subscriber manually from Admin → Subscribers."
              )
            }
          >
            Continue to Nedbank payment
          </button>
        ) : (
          <Link className="subscribe-primary-button" to="/briefings">
            Request briefing access
          </Link>
        )}

        <small>
          Once Nedbank confirms payment, IQ4EV will update the subscription
          status to active and unlock full briefing access.
        </small>
      </section>
    </main>
  );
}