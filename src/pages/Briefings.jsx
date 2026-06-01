import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, ArrowRight } from "lucide-react";

import AccessModal from "../components/AccessModal.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { supabase } from "../lib/supabaseClient.js";
import { formatContentDate } from "../lib/contentHelpers.js";

export default function Briefings() {
  const { isSubscriber, isAdmin } = useAuth();

  const [showAccessModal, setShowAccessModal] = useState(false);
  const [briefings, setBriefings] = useState([]);
  const [loadingBriefings, setLoadingBriefings] = useState(true);
  const [error, setError] = useState("");

  const canViewFullBriefings = isSubscriber || isAdmin;

  useEffect(() => {
    async function loadBriefings() {
      if (!supabase) {
        setLoadingBriefings(false);
        return;
      }

      setLoadingBriefings(true);
      setError("");

      const { data, error: briefingsError } = await supabase
        .from("content_items")
        .select(
          "id, title, slug, excerpt, content_type, access_level, status, category, series, read_time, published_at"
        )
        .eq("content_type", "briefing")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (briefingsError) {
        setError(briefingsError.message);
        setBriefings([]);
      } else {
        setBriefings(data || []);
      }

      setLoadingBriefings(false);
    }

    loadBriefings();
  }, []);

  const featuredBriefing = useMemo(() => briefings[0], [briefings]);
  const remainingBriefings = useMemo(() => briefings.slice(1), [briefings]);

  return (
    <main className="ti-page briefings-page">
      <section className="brief-hero">
        <div className="brief-copy">
          <p className="pulse-kicker">Enterprise Briefings</p>

          <h1>
            Strategic EV intelligence interpreted for decisions, not inbox
            clutter.
          </h1>

          <p className="pulse-lead">
            IQ4EV briefings help organisations understand what EV infrastructure
            signals, policy changes, market movement and operational risks mean
            for investment, planning and strategy in South Africa.
          </p>

          <div className="pulse-actions">
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request briefing access
            </button>

            <a href="#latest-briefings">View latest briefings</a>
          </div>
        </div>

        <div className="brief-visual">
          <div className="brief-document main">
            <span>Weekly Intelligence</span>
            <strong>Infrastructure signals</strong>
            <p>
              Corridor shifts, public charging activity, policy movement and
              commercial implications.
            </p>
          </div>

          <div className="brief-document small one">
            <span>Risk note</span>
            <strong>Grid readiness</strong>
          </div>

          <div className="brief-document small two">
            <span>Opportunity</span>
            <strong>Property hosts</strong>
          </div>

          <div className="brief-line" />
          <div className="brief-dot dot-a" />
          <div className="brief-dot dot-b" />
        </div>
      </section>

      <section id="latest-briefings" className="briefing-database-section">
        <div className="briefing-database-head">
          <div>
            <p className="ti-kicker">Latest enterprise intelligence</p>
            <h2>Published briefings.</h2>
            <p>
              Public previews are visible to all visitors. Full briefing content
              opens for active subscribers and IQ4EV administrators.
            </p>
          </div>

          {!canViewFullBriefings && (
            <button type="button" onClick={() => setShowAccessModal(true)}>
              Request access · R300/month
            </button>
          )}
        </div>

        {loadingBriefings && (
          <article className="briefing-empty-card">
            <h3>Loading briefings…</h3>
          </article>
        )}

        {error && (
          <article className="briefing-empty-card">
            <h3>Unable to load briefings.</h3>
            <p>{error}</p>
          </article>
        )}

        {!loadingBriefings && !error && briefings.length === 0 && (
          <article className="briefing-empty-card">
            <h3>No published briefings yet.</h3>
            <p>
              Drafts and archived items stay hidden until they are published
              from the admin content manager.
            </p>
          </article>
        )}

        {!loadingBriefings && !error && featuredBriefing && (
          <div className="briefing-feature-card">
            <div>
              <div className="briefing-tags">
                <span>{featuredBriefing.series || "Enterprise Briefing"}</span>
                <span>{featuredBriefing.read_time || "Briefing"}</span>
                {!canViewFullBriefings && (
                  <span>
                    <Lock size={12} />
                    Subscriber
                  </span>
                )}
              </div>

              <h3>{featuredBriefing.title}</h3>

              <p>{featuredBriefing.excerpt}</p>

              <small>{formatContentDate(featuredBriefing.published_at)}</small>
            </div>

            <Link to={`/briefings/${featuredBriefing.slug}`}>
              {canViewFullBriefings ? "Read full briefing" : "View preview"}
              <ArrowRight size={17} />
            </Link>
          </div>
        )}

        {!loadingBriefings && !error && remainingBriefings.length > 0 && (
          <div className="briefing-list-grid">
            {remainingBriefings.map((briefing) => (
              <article key={briefing.id} className="briefing-list-card">
                <div className="briefing-tags">
                  <span>{briefing.series || briefing.category || "Briefing"}</span>
                  {!canViewFullBriefings && (
                    <span>
                      <Lock size={12} />
                      Subscriber
                    </span>
                  )}
                </div>

                <h3>{briefing.title}</h3>

                <p>{briefing.excerpt}</p>

                <div className="briefing-card-footer">
                  <small>{formatContentDate(briefing.published_at)}</small>

                  <Link to={`/briefings/${briefing.slug}`}>
                    Open
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="ti-metrics">
        <article>
          <span>01</span>
          <strong>Infrastructure briefings</strong>
          <p>
            Interpretation of charging infrastructure, corridors, regions,
            deployment signals and operational readiness.
          </p>
        </article>

        <article>
          <span>02</span>
          <strong>Market intelligence</strong>
          <p>
            Strategic commentary on OEM activity, fleet movement, policy
            changes, investment signals and sector direction.
          </p>
        </article>

        <article>
          <span>03</span>
          <strong>Executive interpretation</strong>
          <p>
            Concise decision-focused summaries that explain what developments
            mean for your organisation.
          </p>
        </article>
      </section>

      <section className="ti-decision-layer">
        <div>
          <p className="ti-kicker">Not a newsletter</p>
          <h2>
            Briefings are designed to help leadership understand what matters,
            why it matters and what to watch next.
          </h2>
        </div>

        <div className="ti-stack">
          <article>
            <span>Commercial meaning</span>
            <p>
              Translate public EV sector activity into implications for
              investment, infrastructure, partnerships and positioning.
            </p>
          </article>

          <article>
            <span>Risk interpretation</span>
            <p>
              Understand where policy, infrastructure, grid, uptime or adoption
              risk may affect planning decisions.
            </p>
          </article>

          <article>
            <span>Strategic timing</span>
            <p>
              Identify when a development is simply news and when it signals a
              shift your organisation should prepare for.
            </p>
          </article>
        </div>
      </section>

      <section className="ti-cta">
        <div>
          <p className="ti-kicker">Request briefing access</p>
          <h2>Need EV intelligence interpreted for your organisation?</h2>
          <p>
            Subscribe for access to IQ4EV Enterprise Briefings and receive
            strategic interpretation of EV infrastructure, market and operational
            signals.
          </p>
        </div>

        <button type="button" onClick={() => setShowAccessModal(true)}>
          Request briefing access
        </button>
      </section>

      <AccessModal
        open={showAccessModal}
        onClose={() => setShowAccessModal(false)}
        mode="briefing"
      />
    </main>
  );
}