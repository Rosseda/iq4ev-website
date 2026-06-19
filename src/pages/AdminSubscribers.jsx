import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertTriangle,
  RefreshCw,
  Search,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";

const STATUS_OPTIONS = ["inactive", "active", "cancelled", "expired", "past_due"];
const ROLE_OPTIONS = ["subscriber", "admin"];

const STATUS_LABELS = {
  inactive: "Inactive",
  active: "Active",
  cancelled: "Cancelled",
  expired: "Expired",
  past_due: "Payment pending",
};

function getStatusLabel(status) {
  return STATUS_LABELS[status] || status || "Unknown";
}

function getStatusDescription(status) {
  switch (status) {
    case "active":
      return "Subscriber has access to full briefing content.";
    case "inactive":
      return "Account exists, but briefing access is not active.";
    case "cancelled":
      return "Subscription has been cancelled. Access should remain blocked.";
    case "expired":
      return "Subscription has expired and requires renewal.";
    case "past_due":
      return "Payment has not been received. Access may be blocked pending payment.";
    default:
      return "No subscription status available.";
  }
}

export default function AdminSubscribers() {
  const { loading, isAdmin } = useAuth();

  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadProfiles() {
    if (!supabase || !isAdmin) {
      setLoadingProfiles(false);
      return;
    }

    setLoadingProfiles(true);
    setError("");
    setNotice("");

    const { data, error: profilesError } = await supabase
      .from("profiles")
      .select(
        "id, email, full_name, company, position, role, subscription_status, topics_of_interest, payment_provider, payment_reference, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (profilesError) {
      setError(profilesError.message);
      setProfiles([]);
    } else {
      setProfiles(data || []);
    }

    setLoadingProfiles(false);
  }

  useEffect(() => {
    loadProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const filteredProfiles = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return profiles.filter((profile) => {
      const matchesSearch =
        !cleanSearch ||
        profile.email?.toLowerCase().includes(cleanSearch) ||
        profile.full_name?.toLowerCase().includes(cleanSearch) ||
        profile.company?.toLowerCase().includes(cleanSearch) ||
        profile.position?.toLowerCase().includes(cleanSearch);

      const matchesStatus =
        statusFilter === "all" || profile.subscription_status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [profiles, searchTerm, statusFilter]);

  const summary = useMemo(
    () => ({
      total: profiles.length,
      active: profiles.filter(
        (profile) => profile.subscription_status === "active"
      ).length,
      inactive: profiles.filter(
        (profile) => profile.subscription_status === "inactive"
      ).length,
      paymentPending: profiles.filter(
        (profile) => profile.subscription_status === "past_due"
      ).length,
      cancelled: profiles.filter(
        (profile) => profile.subscription_status === "cancelled"
      ).length,
      expired: profiles.filter(
        (profile) => profile.subscription_status === "expired"
      ).length,
      admins: profiles.filter((profile) => profile.role === "admin").length,
    }),
    [profiles]
  );

  async function updateProfile(profileId, updates) {
    if (!supabase) return;

    const currentProfile = profiles.find((profile) => profile.id === profileId);
    const previousStatus = currentProfile?.subscription_status;
    const nextStatus = updates.subscription_status;

    setSavingId(profileId);
    setError("");
    setNotice("");

    const { data, error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", profileId)
      .select(
        "id, email, full_name, company, position, role, subscription_status, topics_of_interest, payment_provider, payment_reference, created_at, updated_at"
      )
      .single();

    setSavingId("");

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setProfiles((current) =>
      current.map((profile) => (profile.id === profileId ? data : profile))
    );

    if (nextStatus && nextStatus !== previousStatus) {
      const emailReminder =
        nextStatus === "cancelled"
          ? "A cancellation confirmation email should later be sent from do-not-reply@iq4ev.co.za."
          : nextStatus === "past_due"
            ? "A payment-not-received notice should later be sent from do-not-reply@iq4ev.co.za."
            : nextStatus === "active"
              ? "An activation or payment-confirmation notice can later be sent from do-not-reply@iq4ev.co.za."
              : "Future automated subscription communication should be tracked through email_events.";

      setNotice(
        `${data.email} status changed to ${getStatusLabel(nextStatus)}. ${emailReminder}`
      );
    } else if (updates.role) {
      setNotice(`${data.email} role updated to ${data.role}.`);
    }
  }

  if (loading || loadingProfiles) {
    return (
        <>
        <SEO {...seoConfig.adminsubscribers} />
      <main className="admin-page">
        <section className="admin-hero">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Loading subscribers…</h1>
        </section>
      </main>
      </>
    );
  }

  if (!isAdmin) {
    return (
        <>
        <SEO {...seoConfig.adminsubscribers} />
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Restricted</p>
          <h1>Admin access required.</h1>
          <p className="auth-lead">
            Subscriber records are only available to authorised IQ4EV
            administrators.
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
        <SEO {...seoConfig.adminsubscribers} />
    <main className="admin-page admin-subscribers-page">
      <section className="admin-hero admin-content-hero">
        <div>
          <p className="auth-kicker">IQ4EV Access Layer</p>
          <h1>Subscribers</h1>
          <p>
            Review briefing access accounts, subscription status and topic
            interests. Nedbank subscription events will update these records
            automatically once payment integration is connected.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-action"
          onClick={loadProfiles}
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </section>

      <section className="admin-phase-note">
        <AlertTriangle size={18} />
        <div>
          <strong>Manual subscription control is temporary</strong>
          <p>
            Until Nedbank integration is available, subscription status changes
            are managed manually here. Later, payment success, payment failure,
            cancellation and renewal notices should be recorded through the
            email_events table and sent from do-not-reply@iq4ev.co.za.
          </p>
        </div>
      </section>

      <section className="subscriber-toolbar">
        <label>
          <Search size={16} />
          <input
            type="search"
            placeholder="Search by name, email, company or role..."
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
              {status === "all" ? "All" : getStatusLabel(status)}
            </button>
          ))}
        </div>
      </section>

      {error && <p className="admin-error-message">{error}</p>}
      {notice && <p className="admin-success-message">{notice}</p>}

      <section className="subscriber-summary-grid">
        <article>
          <span>Total records</span>
          <strong>{summary.total}</strong>
        </article>

        <article>
          <span>Active</span>
          <strong>{summary.active}</strong>
        </article>

        <article>
          <span>Inactive</span>
          <strong>{summary.inactive}</strong>
        </article>

        <article>
          <span>Payment pending</span>
          <strong>{summary.paymentPending}</strong>
        </article>

        <article>
          <span>Cancelled</span>
          <strong>{summary.cancelled}</strong>
        </article>

        <article>
          <span>Expired</span>
          <strong>{summary.expired}</strong>
        </article>

        <article>
          <span>Admins</span>
          <strong>{summary.admins}</strong>
        </article>
      </section>

      <section className="subscriber-list">
        {filteredProfiles.length === 0 ? (
          <article className="subscriber-empty">
            <UserRound size={28} />
            <h2>No subscribers found.</h2>
            <p>Try changing your search term or status filter.</p>
          </article>
        ) : (
          filteredProfiles.map((profile) => (
            <article key={profile.id} className="subscriber-card">
              <div className="subscriber-card-main">
                <div className="subscriber-avatar">
                  {profile.role === "admin" ? (
                    <ShieldCheck size={20} />
                  ) : (
                    <UserRound size={20} />
                  )}
                </div>

                <div>
                  <div className="subscriber-tags">
                    <span>{profile.role}</span>
                    <span>{getStatusLabel(profile.subscription_status)}</span>
                  </div>

                  <h2>{profile.full_name || "Unnamed subscriber"}</h2>

                  <p>{profile.email}</p>

                  <small>
                    {profile.company || "No company"} ·{" "}
                    {profile.position || "No position"}
                  </small>
                </div>
              </div>

              <div className="subscriber-topics">
                <span>Topics of interest</span>

                {profile.topics_of_interest?.length ? (
                  <div>
                    {profile.topics_of_interest.map((topic) => (
                      <small key={topic}>{topic}</small>
                    ))}
                  </div>
                ) : (
                  <p>No topics selected.</p>
                )}
              </div>

              <div className="subscriber-admin-note">
                <strong>{getStatusLabel(profile.subscription_status)}</strong>
                <p>{getStatusDescription(profile.subscription_status)}</p>
              </div>

              <div className="subscriber-controls">
                <label>
                  Subscription
                  <select
                    value={profile.subscription_status || "inactive"}
                    disabled={savingId === profile.id}
                    onChange={(event) =>
                      updateProfile(profile.id, {
                        subscription_status: event.target.value,
                      })
                    }
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {getStatusLabel(status)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Role
                  <select
                    value={profile.role || "subscriber"}
                    disabled={savingId === profile.id}
                    onChange={(event) =>
                      updateProfile(profile.id, {
                        role: event.target.value,
                      })
                    }
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="subscriber-date">
                  <span>Created</span>
                  <strong>{formatContentDate(profile.created_at)}</strong>
                </div>

                {savingId === profile.id && (
                  <p className="subscriber-saving">Saving changes…</p>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
    </>
  );
}