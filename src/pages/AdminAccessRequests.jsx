import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Inbox,
  RefreshCw,
  Search,
  MessageSquareText,
  Building2,
} from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";

const STATUS_OPTIONS = ["new", "reviewed", "contacted", "closed"];

const REQUEST_LABELS = {
  general: "General access",
  consulting: "Consulting",
  pulse360: "Pulse360",
  terrainintel: "TerrainIntel",
  evss: "EVSS",
};

function getRequestLabel(type) {
  return REQUEST_LABELS[type] || type || "Request";
}

export default function AdminAccessRequests() {
  const { loading, isAdmin } = useAuth();

  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [savingId, setSavingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function loadRequests() {
    if (!supabase || !isAdmin) {
      setLoadingRequests(false);
      return;
    }

    setLoadingRequests(true);
    setError("");
    setNotice("");

    const { data, error: requestError } = await supabase
      .from("access_requests")
      .select(
        "id, request_type, full_name, email, company, role, organisation_type, area_of_support, timeline, region_of_interest, message, source_page, status, metadata, created_at, updated_at"
      )
      .order("created_at", { ascending: false });

    if (requestError) {
      setError(requestError.message);
      setRequests([]);
    } else {
      setRequests(data || []);
    }

    setLoadingRequests(false);
  }

  useEffect(() => {
    loadRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const filteredRequests = useMemo(() => {
    const cleanSearch = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !cleanSearch ||
        request.full_name?.toLowerCase().includes(cleanSearch) ||
        request.email?.toLowerCase().includes(cleanSearch) ||
        request.company?.toLowerCase().includes(cleanSearch) ||
        request.role?.toLowerCase().includes(cleanSearch) ||
        request.message?.toLowerCase().includes(cleanSearch);

      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;

      const matchesType =
        typeFilter === "all" || request.request_type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [requests, searchTerm, statusFilter, typeFilter]);

  const summary = useMemo(
    () => ({
      total: requests.length,
      new: requests.filter((request) => request.status === "new").length,
      reviewed: requests.filter((request) => request.status === "reviewed")
        .length,
      contacted: requests.filter((request) => request.status === "contacted")
        .length,
      closed: requests.filter((request) => request.status === "closed").length,
    }),
    [requests]
  );

  async function updateRequestStatus(requestId, status) {
    if (!supabase) return;

    setSavingId(requestId);
    setError("");
    setNotice("");

    const { data, error: updateError } = await supabase
      .from("access_requests")
      .update({ status })
      .eq("id", requestId)
      .select(
        "id, request_type, full_name, email, company, role, organisation_type, area_of_support, timeline, region_of_interest, message, source_page, status, metadata, created_at, updated_at"
      )
      .single();

    setSavingId("");

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setRequests((current) =>
      current.map((request) => (request.id === requestId ? data : request))
    );

    setNotice(`${data.full_name || data.email} marked as ${status}.`);
  }

  if (loading || loadingRequests) {
    return (
        <>
        <SEO {...seoConfig.adminaccessrequests} />
      <main className="admin-page">
        <section className="admin-hero">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Loading access requests…</h1>
        </section>
      </main>
      </>
    );
  }

  if (!isAdmin) {
    return (
        <>
        <SEO {...seoConfig.adminaccessrequests} />
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Restricted</p>
          <h1>Admin access required.</h1>
          <p className="auth-lead">
            Access requests are only available to authorised IQ4EV
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
    <SEO {...seoConfig.adminaccessrequests} />
    <main className="admin-page admin-subscribers-page">
      <section className="admin-hero admin-content-hero">
        <div>
          <p className="auth-kicker">IQ4EV Request Layer</p>
          <h1>Access requests</h1>
          <p>
            Review consultation, Pulse360, TerrainIntel, EVSS and general IQ4EV
            enquiries submitted through the website.
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-action"
          onClick={loadRequests}
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
            placeholder="Search by name, email, company, role or message..."
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

      <section className="subscriber-toolbar compact-toolbar">
        <div className="subscriber-status-tabs">
          {["all", "general", "consulting", "pulse360", "terrainintel", "evss"].map(
            (type) => (
              <button
                key={type}
                type="button"
                className={typeFilter === type ? "active" : ""}
                onClick={() => setTypeFilter(type)}
              >
                {type === "all" ? "All types" : getRequestLabel(type)}
              </button>
            )
          )}
        </div>
      </section>

      {error && <p className="admin-error-message">{error}</p>}
      {notice && <p className="admin-success-message">{notice}</p>}

      <section className="subscriber-summary-grid">
        <article>
          <span>Total requests</span>
          <strong>{summary.total}</strong>
        </article>

        <article>
          <span>New</span>
          <strong>{summary.new}</strong>
        </article>

        <article>
          <span>Reviewed</span>
          <strong>{summary.reviewed}</strong>
        </article>

        <article>
          <span>Contacted</span>
          <strong>{summary.contacted}</strong>
        </article>

        <article>
          <span>Closed</span>
          <strong>{summary.closed}</strong>
        </article>
      </section>

      <section className="subscriber-list">
        {filteredRequests.length === 0 ? (
          <article className="subscriber-empty">
            <Inbox size={28} />
            <h2>No access requests found.</h2>
            <p>Try changing your search term, status filter or request type.</p>
          </article>
        ) : (
          filteredRequests.map((request) => (
            <article key={request.id} className="subscriber-card request-card">
              <div className="subscriber-card-main">
                <div className="subscriber-avatar">
                  <MessageSquareText size={20} />
                </div>

                <div>
                  <div className="subscriber-tags">
                    <span>{getRequestLabel(request.request_type)}</span>
                    <span>{request.status}</span>
                  </div>

                  <h2>{request.full_name || "Unnamed request"}</h2>

                  <p>{request.email}</p>

                  <small>
                    {request.company || "No company"} ·{" "}
                    {request.role || "No role listed"}
                  </small>
                </div>
              </div>

              <div className="subscriber-admin-note">
                <strong>Organisation context</strong>
                <p>
                  {request.organisation_type || "No organisation type listed"}
                  {request.region_of_interest
                    ? ` · ${request.region_of_interest}`
                    : ""}
                  {request.timeline ? ` · ${request.timeline}` : ""}
                </p>
              </div>

              <div className="subscriber-topics">
                <span>Area of support</span>

                {request.area_of_support?.length ? (
                  <div>
                    {request.area_of_support.map((area) => (
                      <small key={area}>{area}</small>
                    ))}
                  </div>
                ) : (
                  <p>No support areas selected.</p>
                )}
              </div>

              {request.message && (
                <div className="request-message">
                  <Building2 size={16} />
                  <p>{request.message}</p>
                </div>
              )}

              <div className="subscriber-controls">
                <label>
                  Request status
                  <select
                    value={request.status || "new"}
                    disabled={savingId === request.id}
                    onChange={(event) =>
                      updateRequestStatus(request.id, event.target.value)
                    }
                  >
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="subscriber-date">
                  <span>Submitted</span>
                  <strong>{formatContentDate(request.created_at)}</strong>
                </div>

                {savingId === request.id && (
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