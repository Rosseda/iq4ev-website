import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, RefreshCw, Search } from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";
import { getEmailBodyText, getEmailTemplate } from "../lib/emailTemplates.js";

const STATUS_OPTIONS = ["pending", "sent", "failed", "cancelled"];

const EVENT_LABELS = {
  subscription_confirmation: "Subscription confirmation",
  briefing_published: "Briefing published",
  subscription_cancelled: "Subscription cancelled",
  payment_not_received: "Payment not received",
  payment_success: "Payment success",
  payment_failed: "Payment failed",
  access_blocked_pending_payment: "Access blocked",
  access_request_received: "Access request received",
  consultation_request_received: "Consultation request received",
};

function getEventLabel(eventType) {
  return EVENT_LABELS[eventType] || eventType || "Email event";
}

export default function AdminEmailEvents() {
  const { loading, isAdmin } = useAuth();

  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedEventId, setExpandedEventId] = useState("");
  const [error, setError] = useState("");

  async function loadEvents() {
    if (!supabase || !isAdmin) {
      setLoadingEvents(false);
      return;
    }

    setLoadingEvents(true);
    setError("");

    const { data, error: eventsError } = await supabase
      .from("email_events")
      .select(
        "id, event_type, recipient_email, recipient_name, subject, sender_email, status, related_profile_id, related_content_id, related_access_request_id, metadata, sent_at, created_at, error_message"
      )
      .order("created_at", { ascending: false });

    if (eventsError) {
      setError(eventsError.message);
      setEvents([]);
    } else {
      setEvents(data || []);
    }

    setLoadingEvents(false);
  }

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const filteredEvents = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return events.filter((event) => {
      const template = getEmailTemplate(event);

      const matchesSearch =
        !cleanSearch ||
        event.recipient_email?.toLowerCase().includes(cleanSearch) ||
        event.recipient_name?.toLowerCase().includes(cleanSearch) ||
        event.subject?.toLowerCase().includes(cleanSearch) ||
        event.event_type?.toLowerCase().includes(cleanSearch) ||
        template.preview?.toLowerCase().includes(cleanSearch);

      const matchesStatus =
        statusFilter === "all" || event.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [events, searchTerm, statusFilter]);

  const summary = useMemo(
    () => ({
      total: events.length,
      pending: events.filter((event) => event.status === "pending").length,
      sent: events.filter((event) => event.status === "sent").length,
      failed: events.filter((event) => event.status === "failed").length,
      cancelled: events.filter((event) => event.status === "cancelled").length,
    }),
    [events]
  );

  function toggleExpanded(eventId) {
    setExpandedEventId((current) => (current === eventId ? "" : eventId));
  }

  if (loading || loadingEvents) {
    return (
      <main className="admin-page">
        <section className="admin-hero">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Loading email events…</h1>
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
            Email event records are only available to authorised IQ4EV
            administrators.
          </p>
          <Link className="auth-link-button" to="/login">
            Go to login
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page admin-subscribers-page">
      <section className="admin-hero admin-content-hero">
        <div>
          <p className="auth-kicker">IQ4EV Communication Layer</p>
          <h1>Email events</h1>
          <p>
            Review planned and historical system communication for subscription
            confirmations, new briefing notifications, cancellation notices and
            payment-related emails.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-action"
          onClick={loadEvents}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </section>

      <section className="admin-phase-note">
        <Mail size={18} />
        <div>
          <strong>Email sending is not connected yet</strong>
          <p>
            This page reads from the email_events table and previews IQ4EV email
            templates. Production email sending should later be handled through a
            secure server-side function using do-not-reply@iq4ev.co.za as the
            sender. Private email provider keys must not be placed in React
            frontend code.
          </p>
        </div>
      </section>

      <section className="subscriber-toolbar">
        <label>
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by recipient, subject, event type or preview..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <div className="subscriber-status-tabs">
          {["all", ...STATUS_OPTIONS].map((status) => (
            <button
              key={status}
              type="button"
              className={statusFilter === status ? "active" : ""}
              onClick={() => setStatusFilter(status)}
            >
              {status === "all" ? "All" : status}
            </button>
          ))}
        </div>
      </section>

      {error && <p className="admin-error-message">{error}</p>}

      <section className="subscriber-summary-grid">
        <article>
          <span>Total events</span>
          <strong>{summary.total}</strong>
        </article>

        <article>
          <span>Pending</span>
          <strong>{summary.pending}</strong>
        </article>

        <article>
          <span>Sent</span>
          <strong>{summary.sent}</strong>
        </article>

        <article>
          <span>Failed</span>
          <strong>{summary.failed}</strong>
        </article>

        <article>
          <span>Cancelled</span>
          <strong>{summary.cancelled}</strong>
        </article>
      </section>

      <section className="subscriber-list">
        {filteredEvents.length === 0 ? (
          <article className="subscriber-empty">
            <Mail size={28} />
            <h2>No email events found.</h2>
            <p>
              Email event records will appear here once publishing,
              subscription, cancellation or payment workflows create them.
            </p>
          </article>
        ) : (
          filteredEvents.map((event) => {
            const template = getEmailTemplate(event);
            const bodyText = getEmailBodyText(template);
            const expanded = expandedEventId === event.id;

            return (
              <article
                key={event.id}
                className="subscriber-card email-event-card"
              >
                <div className="subscriber-card-main">
                  <div className="subscriber-avatar">
                    <Mail size={20} />
                  </div>

                  <div>
                    <div className="subscriber-tags">
                      <span>{getEventLabel(event.event_type)}</span>
                      <span>{event.status}</span>
                    </div>

                    <h2>{template.subject}</h2>

                    <p>{event.recipient_email}</p>

                    <small>
                      From {event.sender_email || "do-not-reply@iq4ev.co.za"}
                    </small>
                  </div>
                </div>

                <div className="subscriber-admin-note">
                  <strong>Email preview</strong>
                  <p>{template.preview}</p>
                </div>

                <div className="email-template-summary">
                  <div>
                    <span>Heading</span>
                    <strong>{template.heading}</strong>
                  </div>

                  {template.ctaLabel && (
                    <div>
                      <span>CTA</span>
                      <strong>{template.ctaLabel}</strong>
                    </div>
                  )}

                  <div>
                    <span>Support contact</span>
                    <strong>{template.supportEmail}</strong>
                  </div>
                </div>

                {expanded && (
                  <div className="email-template-preview">
                    <span>Prepared email body</span>
                    <pre>{bodyText}</pre>
                  </div>
                )}

                {event.error_message && (
                  <p className="admin-error-message">{event.error_message}</p>
                )}

                <div className="subscriber-controls">
                  <button
                    type="button"
                    className="email-preview-button"
                    onClick={() => toggleExpanded(event.id)}
                  >
                    {expanded ? "Hide template preview" : "Preview template"}
                  </button>

                  <div className="subscriber-date">
                    <span>Created</span>
                    <strong>{formatContentDate(event.created_at)}</strong>
                  </div>

                  <div className="subscriber-date">
                    <span>Sent</span>
                    <strong>
                      {event.sent_at
                        ? formatContentDate(event.sent_at)
                        : "Not sent"}
                    </strong>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}