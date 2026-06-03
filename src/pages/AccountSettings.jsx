import { useState } from "react";
import { Link } from "react-router-dom";

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
    return "Administrative access is active for this account.";
  }

  if (isSubscriber) {
    return "This account currently has access to IQ4EV Enterprise Briefings.";
  }

  switch (profile?.subscription_status) {
    case "cancelled":
      return "This briefing subscription has been cancelled. Access to subscriber-only briefings is no longer active.";
    case "expired":
      return "This briefing subscription has expired. Renewal is required to restore subscriber-only briefing access.";
    case "past_due":
      return "Payment has not been received. Briefing access may be blocked pending payment.";
    case "inactive":
      return "This account exists, but briefing access has not been activated yet.";
    default:
      return "This account is recognised, but briefing access has not been activated yet.";
  }
}

export default function AccountSettings() {
  const { loading, user, profile, isSubscriber, isAdmin } = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const statusLabel = getStatusLabel({ isAdmin, isSubscriber, profile });
  const statusMessage = getStatusMessage({ isAdmin, isSubscriber, profile });

  function showMessage(text, type = "info") {
    setMessage(text);
    setMessageType(type);
  }

  function clearMessage() {
    setMessage("");
    setMessageType("info");
  }

  async function updateEmail(event) {
    event.preventDefault();

    if (!supabase || !user) {
      showMessage(
        "Account service is not available. Please try again later or contact info@iq4ev.co.za.",
        "error"
      );
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    setSavingEmail(true);
    clearMessage();

    const { error } = await supabase.auth.updateUser({
      email: cleanEmail,
    });

    setSavingEmail(false);

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    showMessage(
      "Email update requested. Please check the new email address for confirmation instructions.",
      "success"
    );
  }

  async function updatePassword(event) {
    event.preventDefault();

    if (!supabase || !user) {
      showMessage(
        "Account service is not available. Please try again later or contact info@iq4ev.co.za.",
        "error"
      );
      return;
    }

    if (password.length < 8) {
      showMessage("Password must be at least 8 characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    setSavingPassword(true);
    clearMessage();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setSavingPassword(false);

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    setPassword("");
    setConfirmPassword("");
    showMessage("Password updated successfully.", "success");
  }

  if (loading) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">IQ4EV Account</p>
          <h1>Loading settings…</h1>
        </section>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Access required</p>
          <h1>Please log in first.</h1>
          <p className="auth-lead">
            Account settings are only available to logged-in users.
          </p>
          <Link className="auth-link-button" to="/login">
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page account-settings-page">
      <section className="auth-card account-settings-card">
        <p className="auth-kicker">IQ4EV Account</p>

        <h1>Account settings</h1>

        <p className="auth-lead">
          Manage the email and password linked to your IQ4EV briefing access.
        </p>

        <div className="account-status-card">
          <span>Status</span>
          <strong>{statusLabel}</strong>
          <p>{statusMessage}</p>
        </div>

        {message && <p className={`auth-message ${messageType}`}>{message}</p>}

        <form className="auth-form settings-form" onSubmit={updateEmail}>
          <h2>Email address</h2>

          <label>
            Current / new email
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearMessage();
              }}
              placeholder="name@company.co.za"
              required
            />
          </label>

          <button type="submit" disabled={savingEmail}>
            {savingEmail ? "Updating email..." : "Update email"}
          </button>

          <small>
            Email changes may require confirmation before they become active.
            Subscription-related communication is sent from
            do-not-reply@iq4ev.co.za.
          </small>
        </form>

        <form className="auth-form settings-form" onSubmit={updatePassword}>
          <h2>Password</h2>

          <label>
            New password
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearMessage();
              }}
              placeholder="New secure password"
              minLength={8}
              required
            />
          </label>

          <label>
            Confirm new password
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                clearMessage();
              }}
              placeholder="Repeat new password"
              minLength={8}
              required
            />
          </label>

          <button type="submit" disabled={savingPassword}>
            {savingPassword ? "Updating password..." : "Update password"}
          </button>
        </form>

        <div className="account-management-note">
          <strong>Subscription management</strong>
          <p>
            Automated cancellation, renewal and payment-status handling will be
            connected once the Nedbank payment integration is available. Until
            then, subscription changes are managed manually by IQ4EV.
          </p>
          <p>
            If you wish to cancel, renew, query payment status, or raise a
            privacy/account concern, contact info@iq4ev.co.za.
          </p>
        </div>

        <div className="account-actions">
          <Link to="/account">Back to account</Link>
          <Link to="/briefings">View briefings</Link>

          {!isSubscriber && !isAdmin && (
            <Link to="/subscribe">Renew or activate subscription</Link>
          )}
        </div>
      </section>
    </main>
  );
}