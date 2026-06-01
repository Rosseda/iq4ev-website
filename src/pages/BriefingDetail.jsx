import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Lock, Share2 } from "lucide-react";

import AccessModal from "../components/AccessModal.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";

export default function BriefingDetail() {
  const { slug } = useParams();
  const { loading, isSubscriber, isAdmin } = useAuth();

  const [briefing, setBriefing] = useState(null);
  const [loadingBriefing, setLoadingBriefing] = useState(true);
  const [error, setError] = useState("");
  const [showAccessModal, setShowAccessModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const canViewFullBriefing = isAdmin || isSubscriber;

  useEffect(() => {
    async function loadBriefing() {
      if (!supabase || !slug) {
        setLoadingBriefing(false);
        return;
      }

      setLoadingBriefing(true);
      setError("");

      const { data, error: briefingError } = await supabase
        .from("content_items")
        .select(
          "id, title, slug, excerpt, body, content_type, access_level, status, category, series, read_time, published_at"
        )
        .eq("slug", slug)
        .eq("content_type", "briefing")
        .eq("status", "published")
        .maybeSingle();

      if (briefingError) {
        setError(briefingError.message);
        setBriefing(null);
      } else {
        setBriefing(data);
      }

      setLoadingBriefing(false);
    }

    loadBriefing();
  }, [slug]);

  async function handleShare() {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
      alert("Unable to copy link. Please copy it from the browser address bar.");
    }
  }

  if (loading || loadingBriefing) {
    return (
      <main className="briefing-detail-page">
        <section className="briefing-detail-card">
          <p className="ti-kicker">Enterprise Briefing</p>
          <h1>Loading briefing…</h1>
        </section>
      </main>
    );
  }

  if (error || !briefing) {
    return (
      <main className="briefing-detail-page">
        <section className="briefing-detail-card">
          <p className="ti-kicker">Briefing not found</p>
          <h1>This briefing is not available.</h1>
          <p>
            It may still be in draft, archived, or restricted by subscriber
            access.
          </p>

          <Link to="/briefings" className="briefing-back-link">
            <ArrowLeft size={16} />
            Back to briefings
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="briefing-detail-page">
      <article className="briefing-detail-article">
        <Link to="/briefings" className="briefing-back-link">
          <ArrowLeft size={16} />
          Back to briefings
        </Link>

        <div className="briefing-detail-meta">
          <span>{briefing.series || briefing.category || "Enterprise Briefing"}</span>
          {briefing.read_time && <small>{briefing.read_time}</small>}
          <small>{formatContentDate(briefing.published_at)}</small>
        </div>

        <h1>{briefing.title}</h1>

        {briefing.excerpt && (
          <p className="briefing-detail-excerpt">{briefing.excerpt}</p>
        )}

        <div className="briefing-share-row">
          <button type="button" onClick={handleShare}>
            <Share2 size={16} />
            {copied ? "Link copied" : "Share link"}
          </button>

          {!canViewFullBriefing && (
            <span>
              <Lock size={15} />
              Subscriber access required
            </span>
          )}
        </div>

        {canViewFullBriefing ? (
          <div className="briefing-detail-body">
            {briefing.body
              ?.split("\n")
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={`${briefing.id}-${index}`}>{paragraph}</p>
              ))}
          </div>
        ) : (
          <section className="briefing-gate-card">
            <div>
              <p className="ti-kicker">Subscriber briefing</p>
              <h2>Continue reading with IQ4EV Enterprise Briefings.</h2>
              <p>
                Full briefing content is available to active subscribers. Access
                is linked to your subscription email.
              </p>
            </div>

            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request briefing access
            </button>

            <Link to="/login">Already subscribed? Log in</Link>
          </section>
        )}
      </article>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        mode="briefing"
      />
    </main>
  );
}