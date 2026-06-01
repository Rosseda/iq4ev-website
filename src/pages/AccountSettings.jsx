import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";

export default function AccountSettings() {
  const { loading, user, profile, isSubscriber, isAdmin } = useAuth();

  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  function showMessage(text, type = "info") {
    setMessage(text);
    setMessageType(type);
  }

  async function updateEmail(event) {
    event.preventDefault();

    if (!supabase || !user) return;

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    setSavingEmail(true);
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      email: cleanEmail,
    });

    setSavingEmail(false);

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    showMessage(
      "Email update requested. Please check the new email address for confirmation.",
      "success"
    );
  }

  async function updatePassword(event) {
    event.preventDefault();

    if (!supabase || !user) return;

    if (password.length < 8) {
      showMessage("Password must be at least 8 characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }

    setSavingPassword(true);
    setMessage("");

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

          <strong>
            {isAdmin
              ? "Admin access"
              : isSubscriber
                ? "Active subscriber"
                : "Subscription inactive"}
          </strong>

          <p>
            {profile?.company
              ? `${profile.company} · ${profile.position || "No role listed"}`
              : "Your subscription access is linked to this account."}
          </p>
        </div>

        {message && <p className={`auth-message ${messageType}`}>{message}</p>}

        <form className="auth-form settings-form" onSubmit={updateEmail}>
          <h2>Email address</h2>

          <label>
            Current / new email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.co.za"
              required
            />
          </label>

          <button type="submit" disabled={savingEmail}>
            {savingEmail ? "Updating email..." : "Update email"}
          </button>

          <small>
            Email changes may require confirmation before they become active.
          </small>
        </form>

        <form className="auth-form settings-form" onSubmit={updatePassword}>
          <h2>Password</h2>

          <label>
            New password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repeat new password"
              minLength={8}
              required
            />
          </label>

          <button type="submit" disabled={savingPassword}>
            {savingPassword ? "Updating password..." : "Update password"}
          </button>
        </form>

        <div className="account-actions">
          <Link to="/account">Back to account</Link>
          <Link to="/briefings">View briefings</Link>
        </div>
      </section>
    </main>
  );
}