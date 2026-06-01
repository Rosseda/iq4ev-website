import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Admin() {
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Checking admin access…</h1>
        </section>
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Restricted</p>
          <h1>Admin access required.</h1>
          <p className="auth-lead">
            This area is only available to authorised IQ4EV administrators.
          </p>
          <Link className="auth-link-button" to="/login">
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <p className="auth-kicker">IQ4EV Admin</p>

        <h1>Content management dashboard</h1>

        <p>
          Manage public insights, enterprise briefings, drafts and published
          intelligence content.
        </p>
      </section>

      <section className="admin-grid">
        <article>
          <span>Public layer</span>
          <strong>Insights</strong>
          <p>Create, edit, publish and archive public IQ4EV insight articles.</p>
          <Link to="/admin/content?type=insight">Manage insights</Link>
        </article>

        <article>
          <span>Subscriber layer</span>
          <strong>Briefings</strong>
          <p>Create, edit, publish and archive subscriber-only briefings.</p>
          <Link to="/admin/content?type=briefing">Manage briefings</Link>
        </article>

        <article>
         <span>Access layer</span>
         <strong>Subscribers</strong>
          <p>
         Review subscriber status, topic interests and payment-linked access records.
         This will connect to Nedbank subscription events later.
         </p>
         <Link to="/admin/subscribers">Manage subscribers</Link>
       </article>
      </section>
    </main>
  );
}