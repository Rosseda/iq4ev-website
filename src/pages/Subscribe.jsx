import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  AlertCircle,
  Mail,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";

export default function Subscribe() {
  const { loading, user, profile, isSubscriber, isAdmin } = useAuth();
  const [paymentNoticeVisible, setPaymentNoticeVisible] = useState(false);

  const subscriptionStatus = isAdmin
    ? "Admin access"
    : isSubscriber
      ? "Active subscriber"
      : profile?.subscription_status || "Inactive";

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

          <article>
            <Mail size={18} />
            <div>
              <strong>Formal subscription communication</strong>
              <p>
                Subscription-related notices are sent from
                do-not-reply@iq4ev.co.za. Further communication should be
                directed to info@iq4ev.co.za.
              </p>
            </div>
          </article>
        </div>

        {user ? (
          <div className="subscribe-status-box">
            <span>Current account</span>
            <strong>{user.email}</strong>
            <p>Status: {subscriptionStatus}</p>
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

        {paymentNoticeVisible && (
          <div className="subscribe-notice">
            <AlertCircle size={18} />
            <div>
              <strong>Nedbank payment integration pending</strong>
              <p>
                Secure subscription payment is not connected yet. For now,
                briefing access must be activated manually from Admin →
                Subscribers after the account has been created.
              </p>
              <p>
                Once Nedbank integration is available, this button will continue
                to the secure payment page and subscription status will update
                after payment confirmation.
              </p>
            </div>
          </div>
        )}

        {isSubscriber || isAdmin ? (
          <>
            <div className="subscribe-notice success">
              <CheckCircle2 size={18} />
              <div>
                <strong>Briefing access available</strong>
                <p>
                  Your account can access subscriber briefing content. You may
                  continue to the enterprise briefings library.
                </p>
              </div>
            </div>

            <Link className="subscribe-primary-button" to="/briefings">
              View enterprise briefings
            </Link>
          </>
        ) : user ? (
          <button
            type="button"
            className="subscribe-primary-button"
            onClick={() => setPaymentNoticeVisible(true)}
          >
            Continue to Nedbank payment
          </button>
        ) : (
          <Link className="subscribe-primary-button" to="/briefings">
            Request briefing access
          </Link>
        )}

        <small>
          Once payment confirmation is received, IQ4EV will update the
          subscription status to active and unlock full briefing access. If a
          payment is not received or renewal fails, access may be blocked pending
          payment. For support, contact info@iq4ev.co.za.
        </small>
      </section>
    </main>
  );
}