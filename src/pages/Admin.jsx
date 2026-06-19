import { Link } from "react-router-dom";
import {
  FileText,
  LockKeyhole,
  Mail,
  MessageSquareText,
  UsersRound,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";

export default function Admin() {
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <>
      <SEO {...seoConfig.admin} />
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Checking admin access…</h1>
        </section>
      </main>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
      <SEO {...seoConfig.admin} />
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
      </>
    );
  }

  return (
    <>
    <SEO {...seoConfig.admin} />
    <main className="admin-page">
      <section className="admin-hero">
        <p className="auth-kicker">IQ4EV Admin</p>

        <h1>Operations dashboard</h1>

        <p>
          Manage IQ4EV public intelligence, enterprise briefings, subscriber
          access, consultation enquiries and future system communication events.
        </p>
      </section>

      <section className="admin-grid">
        <article>
          <FileText size={22} />
          <span>Public layer</span>
          <strong>Insights</strong>
          <p>
            Create, edit, publish and archive public IQ4EV insight articles.
          </p>
          <Link to="/admin/content?type=insight">Manage insights</Link>
        </article>

        <article>
          <LockKeyhole size={22} />
          <span>Subscriber layer</span>
          <strong>Briefings</strong>
          <p>
            Create, edit, publish and archive subscriber-only intelligence
            briefings.
          </p>
          <Link to="/admin/content?type=briefing">Manage briefings</Link>
        </article>

        <article>
          <UsersRound size={22} />
          <span>Access layer</span>
          <strong>Subscribers</strong>
          <p>
            Review subscriber status, topic interests and payment-linked access
            records. Nedbank subscription events will connect here later.
          </p>
          <Link to="/admin/subscribers">Manage subscribers</Link>
        </article>

        <article>
          <MessageSquareText size={22} />
          <span>Request layer</span>
          <strong>Access requests</strong>
          <p>
            Review consultation, Pulse360, TerrainIntel, EVSS and general IQ4EV
            access enquiries submitted through the website.
          </p>
          <Link to="/admin/access-requests">Review requests</Link>
        </article>

        <article>
          <Mail size={22} />
          <span>Communication layer</span>
          <strong>Email events</strong>
          <p>
            Prepare and audit system communication such as briefing
            notifications, cancellation confirmations and payment notices.
          </p>
          <Link to="/admin/email-events">View email events</Link>
        </article>
      </section>
    </main>
    </>
  );
}