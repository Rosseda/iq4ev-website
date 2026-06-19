import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import {
  ACCESS_LEVELS,
  BRIEFING_SERIES,
  CONTENT_STATUSES,
  CONTENT_TYPES,
  createSlug,
} from "../lib/contentHelpers.js";
import SEO from "../components/SEO.jsx";
import seoConfig from "../data/seoConfig.js";

const initialForm = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  content_type: "insight",
  access_level: "public",
  status: "draft",
  category: "",
  series: "",
  read_time: "",
  featured: false,
};

function shouldNotifySubscriber(profile, briefingSeries) {
  const topics = profile?.topics_of_interest || [];

  if (!briefingSeries) return true;
  if (topics.includes("All briefings")) return true;
  if (topics.includes(briefingSeries)) return true;

  return false;
}

export default function AdminContentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, isAdmin, user } = useAuth();

  const isEditing = Boolean(id);

  const [form, setForm] = useState(initialForm);
  const [originalItem, setOriginalItem] = useState(null);
  const [loadingItem, setLoadingItem] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("info");

  const pageTitle = isEditing ? "Edit content" : "New content";
  const isBriefing = form.content_type === "briefing";

  const suggestedAccessLevel = useMemo(() => {
    return form.content_type === "briefing" ? "subscriber" : "public";
  }, [form.content_type]);

  useEffect(() => {
    async function loadItem() {
      if (!supabase || !isAdmin || !isEditing) {
        setLoadingItem(false);
        return;
      }

      const { data, error } = await supabase
        .from("content_items")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        showMessage(error.message, "error");
      } else if (data) {
        setOriginalItem(data);

        setForm({
          title: data.title || "",
          slug: data.slug || "",
          excerpt: data.excerpt || "",
          body: data.body || "",
          content_type: data.content_type || "insight",
          access_level: data.access_level || "public",
          status: data.status || "draft",
          category: data.category || "",
          series: data.series || "",
          read_time: data.read_time || "",
          featured: Boolean(data.featured),
        });
      }

      setLoadingItem(false);
    }

    loadItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAdmin, isEditing]);

  function showMessage(text, type = "info") {
    setMessage(text);
    setMessageType(type);
  }

  function clearMessage() {
    setMessage("");
    setMessageType("info");
  }

  function updateField(field, value) {
    clearMessage();

    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleTitleChange(value) {
    clearMessage();

    setForm((current) => ({
      ...current,
      title: value,
      slug: current.slug ? current.slug : createSlug(value),
    }));
  }

  function handleContentTypeChange(value) {
    clearMessage();

    setForm((current) => ({
      ...current,
      content_type: value,
      access_level: value === "briefing" ? "subscriber" : "public",
      series: value === "briefing" ? current.series : "",
    }));
  }

  async function createBriefingEmailEvents(savedContent) {
    if (!supabase || !savedContent?.id) return { created: 0, error: null };

    const wasAlreadyPublished =
      isEditing && originalItem?.status === "published";

    const isNewlyPublishedBriefing =
      savedContent.content_type === "briefing" &&
      savedContent.status === "published" &&
      !wasAlreadyPublished;

    if (!isNewlyPublishedBriefing) {
      return { created: 0, error: null };
    }

    const { data: subscribers, error: subscriberError } = await supabase
      .from("profiles")
      .select("id, email, full_name, topics_of_interest, subscription_status")
      .eq("role", "subscriber")
      .eq("subscription_status", "active");

    if (subscriberError) {
      return { created: 0, error: subscriberError };
    }

    const matchedSubscribers = (subscribers || []).filter((profile) =>
      shouldNotifySubscriber(profile, savedContent.series)
    );

    if (matchedSubscribers.length === 0) {
      return { created: 0, error: null };
    }

    const briefingUrl = `${window.location.origin}/briefings/${savedContent.slug}`;

    const emailEvents = matchedSubscribers.map((subscriber) => ({
      event_type: "briefing_published",
      recipient_email: subscriber.email,
      recipient_name: subscriber.full_name || "",
      subject: `New IQ4EV briefing: ${savedContent.title}`,
      sender_email: "do-not-reply@iq4ev.co.za",
      status: "pending",
      related_profile_id: subscriber.id,
      related_content_id: savedContent.id,
      metadata: {
        briefing_title: savedContent.title,
        briefing_slug: savedContent.slug,
        briefing_url: briefingUrl,
        briefing_series: savedContent.series || "",
        briefing_excerpt: savedContent.excerpt || "",
        message_intent:
          "We think this may spark your interest. Include the direct briefing link for easy accessibility.",
        support_email: "info@iq4ev.co.za",
      },
    }));

    const { error: eventError } = await supabase
      .from("email_events")
      .insert(emailEvents);

    if (eventError) {
      return { created: 0, error: eventError };
    }

    return { created: emailEvents.length, error: null };
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!supabase) {
      showMessage("Supabase is not connected.", "error");
      return;
    }

    if (!isAdmin) {
      showMessage("Admin access required.", "error");
      return;
    }

    if (!form.title.trim() || !form.slug.trim()) {
      showMessage("Title and slug are required.", "error");
      return;
    }

    setSaving(true);
    clearMessage();

    const now = new Date().toISOString();
    const cleanSlug = createSlug(form.slug);

    const existingPublishedAt = originalItem?.published_at || null;

    const payload = {
      title: form.title.trim(),
      slug: cleanSlug,
      excerpt: form.excerpt.trim(),
      body: form.body.trim(),
      content_type: form.content_type,
      access_level: form.access_level,
      status: form.status,
      category: form.category.trim(),
      series: form.series.trim(),
      read_time: form.read_time.trim(),
      featured: form.featured,
      published_at:
        form.status === "published" ? existingPublishedAt || now : null,
    };

    if (!isEditing) {
      payload.created_by = user?.id ?? null;
    }

    const { data, error } = isEditing
      ? await supabase
          .from("content_items")
          .update(payload)
          .eq("id", id)
          .select("*")
          .single()
      : await supabase.from("content_items").insert(payload).select("*").single();

    if (error) {
      setSaving(false);
      showMessage(error.message, "error");
      return;
    }

    const emailResult = await createBriefingEmailEvents(data);

    setSaving(false);
    setOriginalItem(data);

    if (emailResult.error) {
      showMessage(
        `Content saved, but briefing email events could not be prepared: ${emailResult.error.message}`,
        "error"
      );

      if (!isEditing) {
        navigate(`/admin/content/${data.id}/edit`);
      }

      return;
    }

    if (
      data.content_type === "briefing" &&
      data.status === "published" &&
      emailResult.created > 0
    ) {
      showMessage(
        `Briefing published. ${emailResult.created} pending briefing notification email event(s) were prepared.`,
        "success"
      );
    } else if (
      data.content_type === "briefing" &&
      data.status === "published"
    ) {
      showMessage(
        "Briefing published. No matching active subscribers were found for notification preparation.",
        "success"
      );
    } else {
      showMessage("Content saved successfully.", "success");
    }

    if (!isEditing) {
      navigate(`/admin/content/${data.id}/edit`);
    }
  }

  async function handleDelete() {
    if (!isEditing) return;

    const confirmed = window.confirm(
      "Delete this content item permanently? This cannot be undone."
    );

    if (!confirmed) return;

    const { error } = await supabase.from("content_items").delete().eq("id", id);

    if (error) {
      showMessage(error.message, "error");
      return;
    }

    navigate("/admin/content");
  }

  if (loading || loadingItem) {
    return (
        <>
        <SEO {...seoConfig.admincontenteditor} />
      <main className="admin-page">
        <section className="admin-hero">
          <p className="auth-kicker">IQ4EV Admin</p>
          <h1>Loading editor…</h1>
        </section>
      </main>
      </>
    );
  }

  if (!isAdmin) {
    return (
        <>
        <SEO {...seoConfig.admincontenteditor} />
      <main className="auth-page">
        <section className="auth-card">
          <p className="auth-kicker">Restricted</p>
          <h1>Admin access required.</h1>
          <p className="auth-lead">
            This editor is only available to authorised IQ4EV administrators.
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
      <SEO {...seoConfig.admincontenteditor} />
    <main className="admin-page admin-editor-page">
      <section className="admin-hero admin-editor-hero">
        <div>
          <p className="auth-kicker">IQ4EV Admin Editor</p>
          <h1>{pageTitle}</h1>
          <p>
            Write public insights and subscriber-only enterprise briefings from
            one clean intelligence content system.
          </p>
        </div>

        <Link className="admin-secondary-action" to="/admin/content">
          Back to content
        </Link>
      </section>

      <form className="admin-editor-form" onSubmit={handleSubmit}>
        <section className="admin-editor-panel">
          <div className="admin-form-grid two">
            <label>
              Content type
              <select
                value={form.content_type}
                onChange={(event) => handleContentTypeChange(event.target.value)}
              >
                {CONTENT_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Access level
              <select
                value={form.access_level || suggestedAccessLevel}
                onChange={(event) =>
                  updateField("access_level", event.target.value)
                }
              >
                {ACCESS_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Title
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="e.g. Corridor Watch: Charging pressure along the N3"
              required
            />
          </label>

          <label>
            Slug
            <input
              type="text"
              value={form.slug}
              onChange={(event) =>
                updateField("slug", createSlug(event.target.value))
              }
              placeholder="corridor-watch-charging-pressure-n3"
              required
            />
          </label>

          <label>
            Excerpt / preview
            <textarea
              value={form.excerpt}
              onChange={(event) => updateField("excerpt", event.target.value)}
              placeholder="Short public preview or summary..."
              rows={4}
            />
          </label>

          <label>
            Body
            <textarea
              value={form.body}
              onChange={(event) => updateField("body", event.target.value)}
              placeholder="Write the full insight or briefing content here..."
              rows={14}
            />
          </label>
        </section>

        <aside className="admin-editor-panel admin-editor-side">
          <label>
            Status
            <select
              value={form.status}
              onChange={(event) => updateField("status", event.target.value)}
            >
              {CONTENT_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </label>

          <label>
            Category
            <input
              type="text"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
              placeholder="Infrastructure, Operations, Policy..."
            />
          </label>

          {isBriefing && (
            <label>
              Briefing series
              <select
                value={form.series}
                onChange={(event) => updateField("series", event.target.value)}
              >
                <option value="">Select series</option>
                {BRIEFING_SERIES.map((series) => (
                  <option key={series} value={series}>
                    {series}
                  </option>
                ))}
              </select>
            </label>
          )}

          <label>
            Read time
            <input
              type="text"
              value={form.read_time}
              onChange={(event) => updateField("read_time", event.target.value)}
              placeholder="5 min read"
            />
          </label>

          <label className="admin-checkbox-label">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) => updateField("featured", event.target.checked)}
            />
            Mark as featured
          </label>

          {isBriefing && form.status === "published" && (
            <div className="admin-publish-note">
              <strong>Briefing notification preparation</strong>
              <p>
                When this briefing is published for the first time, IQ4EV will
                prepare pending email event records for matching active
                subscribers. Emails are not sent from the frontend.
              </p>
            </div>
          )}

          {message && (
            <p className={`admin-form-message ${messageType}`}>{message}</p>
          )}

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save content"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="admin-danger-button"
              onClick={handleDelete}
            >
              Delete permanently
            </button>
          )}
        </aside>
      </form>
    </main>
    </>
  );
}