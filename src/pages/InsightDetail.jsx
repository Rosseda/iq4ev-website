import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Share2 } from "lucide-react";

import CTASection from "../components/CTASection.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";

export default function InsightDetail() {
  const { slug } = useParams();

  const [insight, setInsight] = useState(null);
  const [loadingInsight, setLoadingInsight] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadInsight() {
      if (!supabase || !slug) {
        setLoadingInsight(false);
        return;
      }

      setLoadingInsight(true);
      setError("");

      const { data, error: insightError } = await supabase
        .from("content_items")
        .select(
          "id, title, slug, excerpt, body, category, read_time, published_at"
        )
        .eq("slug", slug)
        .eq("content_type", "insight")
        .eq("status", "published")
        .eq("access_level", "public")
        .maybeSingle();

      if (insightError) {
        setError(insightError.message);
        setInsight(null);
      } else {
        setInsight(data);
      }

      setLoadingInsight(false);
    }

    loadInsight();
  }, [slug]);

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      alert("Unable to copy link. Please copy it from your browser bar.");
    }
  }

  if (loadingInsight) {
    return (
      <main className="insight-detail-page">
        <section className="insight-detail-card">
          <p className="ti-kicker">IQ4EV Insight</p>
          <h1>Loading insight…</h1>
        </section>
      </main>
    );
  }

  if (error || !insight) {
    return (
      <main className="insight-detail-page">
        <section className="insight-detail-card">
          <p className="ti-kicker">Insight not found</p>

          <h1>This article does not exist.</h1>

          <p>
            It may still be in draft, archived, or not yet published from the
            admin content manager.
          </p>

          <Link to="/insights" className="insight-back-link">
            <ArrowLeft size={16} />
            Back to insights
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="insight-detail-page">
      <article className="insight-detail-article">
        <Link to="/insights" className="insight-back-link">
          <ArrowLeft size={16} />
          Back to insights
        </Link>

        <div className="insight-detail-meta">
          <span>{insight.category || "Insight"}</span>
          {insight.read_time && <small>{insight.read_time}</small>}
          <small>{formatContentDate(insight.published_at)}</small>
        </div>

        <h1>{insight.title}</h1>

        {insight.excerpt && (
          <p className="insight-detail-excerpt">{insight.excerpt}</p>
        )}

        <div className="briefing-share-row">
          <button type="button" onClick={handleShare}>
            <Share2 size={16} />
            {copied ? "Link copied" : "Share link"}
          </button>
        </div>

        <div className="insight-detail-body">
          {insight.body
            ?.split("\n")
            .filter((paragraph) => paragraph.trim())
            .map((paragraph, index) => (
              <section key={`${insight.id}-${index}`}>
                <p>{paragraph}</p>
              </section>
            ))}
        </div>
      </article>

      <CTASection
        eyebrow="Enterprise briefing"
        title="Need deeper strategic interpretation?"
        description="IQ4EV Enterprise Briefings extend public insights into risk, commercial implications and decision-ready intelligence."
        buttonLabel="View enterprise briefings"
        buttonTo="/briefings"
      />
    </main>
  );
}