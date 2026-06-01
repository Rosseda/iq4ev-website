import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient.js";

export default function Login() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  async function handleSubmit(event) {
  event.preventDefault();

  setMessage("");
  setMessageType("info");

  if (!supabase) {
    setMessage(
      "Supabase is not connected. Check your .env.local file and restart the dev server."
    );
    setMessageType("error");
    return;
  }

  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail) {
    setMessage("Please enter your email address.");
    setMessageType("error");
    return;
  }

  if (mode === "login" && !password) {
    setMessage("Please enter your password.");
    setMessageType("error");
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
          () => reject(new Error("Login timed out. Please refresh and try again.")),
          12000
        )
      );

      const { error } = await Promise.race([loginPromise, timeoutPromise]);

      if (error) {
        setMessage(error.message);
        setMessageType("error");
        setSubmitting(false);
        return;
      }

      setMessage("Login successful. Redirecting...");
      setMessageType("success");

      window.location.href = "/account";
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${window.location.origin}/account`,
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
      setSubmitting(false);
      return;
    }

    setMessage("Password reset email sent. Please check your inbox.");
    setMessageType("success");
    setSubmitting(false);
  } catch (error) {
    setMessage(error.message || "Something went wrong. Please try again.");
    setMessageType("error");
    setSubmitting(false);
  }
  }

  return (
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
              onChange={(event) => setEmail(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
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
                : "Sending reset email..."
              : mode === "login"
                ? "Log in"
                : "Send reset email"}
          </button>
        </form>

        <div className="auth-switch">
          {mode === "login" ? (
            <button
              type="button"
              onClick={() => {
                setMode("reset");
                setMessage("");
              }}
            >
              Forgot password?
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              Back to login
            </button>
          )}

          <Link to="/briefings">Subscribe to briefings</Link>
        </div>
      </section>
    </main>
  );
}