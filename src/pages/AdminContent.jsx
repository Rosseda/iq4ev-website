import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Plus, Pencil, Archive, FileText } from "lucide-react";

import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";

export default function AdminContent() {
  const { loading, isAdmin } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [error, setError] = useState("");

  const activeType = searchParams.get("type") || "all";
  const activeStatus = searchParams.get("status") || "all";

  useEffect(() => {
    async function loadContent() {
      if (!supabase || !isAdmin) {
        setLoadingItems(false);
        return;
      }

      setLoadingItems(true);
      setError("");

      const { data, error: contentError } = await supabase
        .from("content_items")
        .select(
          "id, title, slug, excerpt, content_type, access_level, status, category, series, read_time, featured, published_at, updated_at"
        )
        .order("updated_at", { ascending: false });

      if (contentError) {
        setError(contentError.message);
        setItems([]);
      } else {
        setItems(data || []);
      }

      setLoadingItems(false);
    }

    loadContent();
  }, [isAdmin]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const typeMatches =
        activeType === "all" || item.content_type === activeType;

      const statusMatches =
        activeStatus === "all" || item.status === activeStatus;

      return typeMatches && statusMatches;
    });
  }, [items, activeType, activeStatus]);

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);

    if (value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next);
  }

  async function archiveItem(item) {
    const confirmArchive = window.confirm(
      `Archive "${item.title}"? It will no longer appear as published content.`
    );

    if (!confirmArchive) return;

    const { error: archiveError } = await supabase
      .from("content_items")
      .update({ status: "archived" })
      .eq("id", item.id);

    if (archiveError) {
      alert(archiveError.message);
      return;
    }

    setItems((current) =>
      current.map((currentItem) =>
        currentItem.id === item.id
          ? { ...currentItem, status: "archived" }
          : currentItem
      )
    );
  }

  if (loading || loadingItems) {
    return (
      <main className="admin-page">
        <section className="admin-hero">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Loading content…</h1>
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
            This content manager is only available to authorised IQ4EV
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
    <main className="admin-page admin-content-page">
      <section className="admin-hero admin-content-hero">
        <div>
          <p className="auth-kicker">IQ4EV Intelligence CMS</p>
          <h1>Content manager</h1>
          <p>
            Create, edit, publish and archive IQ4EV public insights and
            enterprise subscriber briefings.
          </p>
        </div>

        <Link className="admin-primary-action" to="/admin/content/new">
          <Plus size={18} />
          New content
        </Link>
      </section>

      <section className="admin-filter-panel">
        <div>
          <span>Content type</span>

          <div className="admin-filter-buttons">
            <button
              type="button"
              className={activeType === "all" ? "active" : ""}
              onClick={() => updateFilter("type", "all")}
            >
              All
            </button>
            <button
              type="button"
              className={activeType === "insight" ? "active" : ""}
              onClick={() => updateFilter("type", "insight")}
            >
              Insights
            </button>
            <button
              type="button"
              className={activeType === "briefing" ? "active" : ""}
              onClick={() => updateFilter("type", "briefing")}
            >
              Briefings
            </button>
          </div>
        </div>

        <div>
          <span>Status</span>

          <div className="admin-filter-buttons">
            <button
              type="button"
              className={activeStatus === "all" ? "active" : ""}
              onClick={() => updateFilter("status", "all")}
            >
              All
            </button>
            <button
              type="button"
              className={activeStatus === "draft" ? "active" : ""}
              onClick={() => updateFilter("status", "draft")}
            >
              Draft
            </button>
            <button
              type="button"
              className={activeStatus === "published" ? "active" : ""}
              onClick={() => updateFilter("status", "published")}
            >
              Published
            </button>
            <button
              type="button"
              className={activeStatus === "archived" ? "active" : ""}
              onClick={() => updateFilter("status", "archived")}
            >
              Archived
            </button>
          </div>
        </div>
      </section>

      {error && <p className="admin-error-message">{error}</p>}

      <section className="admin-content-list">
        {filteredItems.length === 0 ? (
          <article className="admin-empty-state">
            <FileText size={28} />
            <h2>No content yet.</h2>
            <p>
              Start by creating your first public insight or enterprise
              briefing.
            </p>
            <Link to="/admin/content/new">Create first item</Link>
          </article>
        ) : (
          filteredItems.map((item) => (
            <article key={item.id} className="admin-content-row">
              <div className="admin-content-icon">
                {item.content_type === "briefing" ? "B" : "I"}
              </div>

              <div className="admin-content-main">
                <div className="admin-content-tags">
                  <span>{item.content_type}</span>
                  <span>{item.access_level}</span>
                  <span>{item.status}</span>
                  {item.featured && <span>featured</span>}
                </div>

                <h2>{item.title}</h2>

                <p>{item.excerpt || "No excerpt added yet."}</p>

                <small>
                  {item.category || item.series || "Uncategorised"} ·{" "}
                  {formatContentDate(item.published_at)}
                </small>
              </div>

              <div className="admin-content-actions">
                <Link to={`/admin/content/${item.id}/edit`}>
                  <Pencil size={16} />
                  Edit
                </Link>

                {item.status !== "archived" && (
                  <button type="button" onClick={() => archiveItem(item)}>
                    <Archive size={16} />
                    Archive
                  </button>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}