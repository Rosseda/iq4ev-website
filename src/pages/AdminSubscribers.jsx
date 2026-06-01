import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, Search, ShieldCheck, UserRound } from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";

const STATUS_OPTIONS = ["inactive", "active", "cancelled", "expired", "past_due"];
const ROLE_OPTIONS = ["subscriber", "admin"];

export default function AdminSubscribers() {
  const { loading, isAdmin } = useAuth();

  const [profiles, setProfiles] = useState([]);
  const [loadingProfiles, setLoadingProfiles] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");

  async function loadProfiles() {
    if (!supabase || !isAdmin) {
      setLoadingProfiles(false);
      return;
    }

    setLoadingProfiles(true);
    setError("");

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

  async function updateProfile(profileId, updates) {
    if (!supabase) return;

    setSavingId(profileId);
    setError("");

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
  }

  if (loading || loadingProfiles) {
    return (
      <main className="admin-page">
        <section className="admin-hero">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Loading subscribers…</h1>
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
            Subscriber records are only available to authorised IQ4EV
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
          <p className="auth-kicker">IQ4EV Access Layer</p>
          <h1>Subscribers</h1>
          <p>
            Review briefing access accounts, subscription status and topic
            interests. Nedbank subscription events will update these records
            automatically later.
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
              {status}
            </button>
          ))}
        </div>
      </section>

      {error && <p className="admin-error-message">{error}</p>}

      <section className="subscriber-summary-grid">
        <article>
          <span>Total records</span>
          <strong>{profiles.length}</strong>
        </article>

        <article>
          <span>Active</span>
          <strong>
            {
              profiles.filter(
                (profile) => profile.subscription_status === "active"
              ).length
            }
          </strong>
        </article>

        <article>
          <span>Inactive</span>
          <strong>
            {
              profiles.filter(
                (profile) => profile.subscription_status === "inactive"
              ).length
            }
          </strong>
        </article>

        <article>
          <span>Admins</span>
          <strong>
            {profiles.filter((profile) => profile.role === "admin").length}
          </strong>
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
                    <span>{profile.subscription_status}</span>
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

              <div className="subscriber-controls">
                <label>
                  Subscription
                  <select
                    value={profile.subscription_status}
                    disabled={savingId === profile.id}
                    onChange={(event) =>
                      updateProfile(profile.id, {
                        subscription_status: event.target.value,
                      })
                    }
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Role
                  <select
                    value={profile.role}
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
  );
}