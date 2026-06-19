import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";
import { supabase } from "../lib/supabaseClient.js";


export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  function resetMessage() {
    setMessage("");
    setMessageType("info");
  }

  function showMessage(type, text) {
    setMessage(text);
    setMessageType(type);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    resetMessage();

    if (!supabase) {
      showMessage(
        "error",
        "Supabase is not connected. Please check your .env.local file and restart the development server."
      );
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      showMessage("error", "Please enter your email address.");
      return;
    }

    if (mode === "login" && !password) {
      showMessage("error", "Please enter your password.");
      return;
    }

    setSubmitting(true);

    try {
      if (mode === "login") {
        const loginPromise = supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () =>
              reject(
                new Error(
                  "Login timed out. Please refresh the page and try again."
                )
              ),
            12000
          )
        );

        const { error } = await Promise.race([loginPromise, timeoutPromise]);

        if (error) {
          showMessage("error", error.message);
          setSubmitting(false);
          return;
        }

        showMessage("success", "Login successful. Opening your account…");

        setTimeout(() => {
          navigate("/account");
        }, 500);

        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/account`,
      });

      if (error) {
        showMessage("error", error.message);
        setSubmitting(false);
        return;
      }

      showMessage(
        "success",
        "Password reset instructions have been sent. Please check the inbox linked to your IQ4EV briefing access account."
      );
      setSubmitting(false);
    } catch (error) {
      showMessage(
        "error",
        error.message ||
          "The request could not be completed. Please try again or contact info@iq4ev.co.za."
      );
      setSubmitting(false);
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode);
    setPassword("");
    resetMessage();
  }

  return (
    <>
    <SEO {...seoConfig.login} />
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-kicker">IQ4EV Access</p>

        <h1>{mode === "login" ? "Subscriber login" : "Reset password"}</h1>

        <p className="auth-lead">
          Access IQ4EV Enterprise Briefings using the email linked to your
          active subscription.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email address
            <input
              type="email"
              placeholder="name@company.co.za"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                resetMessage();
              }}
              autoComplete="email"
              required
            />
          </label>

          {mode === "login" && (
            <label>
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  resetMessage();
                }}
                autoComplete="current-password"
                required
              />
            </label>
          )}

          {message && (
            <p className={`auth-message ${messageType}`}>{message}</p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting
              ? mode === "login"
                ? "Logging in..."
                : "Sending reset instructions..."
              : mode === "login"
                ? "Log in"
                : "Send reset instructions"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login" ? (
            <button type="button" onClick={() => switchMode("reset")}>
              Forgot password?
            </button>
          ) : (
            <button type="button" onClick={() => switchMode("login")}>
              Back to login
            </button>
          )}

          <Link to="/briefings">Subscribe to briefings</Link>
        </div>

        <p className="auth-support-note">
          For subscription, account or access support, contact
          info@iq4ev.co.za.
        </p>
      </section>
    </main>
    </>
  );
}