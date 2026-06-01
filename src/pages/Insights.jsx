import { useEffect, useMemo, useState } from "react";
import {
  BookOpenText,
  Building2,
  Cable,
  FileBarChart,
  Map,
  Newspaper,
} from "lucide-react";

import Button from "../components/Button.jsx";
import CTASection from "../components/CTASection.jsx";
import InsightCard from "../components/InsightCard.jsx";
import { supabase } from "../lib/supabaseClient.js";

const insightAreas = [
  {
    icon: Cable,
    title: "Infrastructure analysis",
    description:
      "Operational commentary around charging deployment, uptime, site readiness and infrastructure performance.",
  },
  {
    icon: Building2,
    title: "Property participation",
    description:
      "Analysis of the role retail centres, hotels, estates and mixed-use properties play in EV infrastructure.",
  },
  {
    icon: Map,
    title: "Spatial intelligence",
    description:
      "Public commentary around charger placement, corridor development and regional EV infrastructure patterns.",
  },
  {
    icon: FileBarChart,
    title: "Operational insight",
    description:
      "Clear explanations of charger reliability, site-level risk, infrastructure visibility and EV transition realities.",
  },
  {
    icon: Newspaper,
    title: "Sector commentary",
    description:
      "Public market intelligence interpreting EV sector movement, strategic signals and infrastructure implications.",
  },
  {
    icon: BookOpenText,
    title: "Educational intelligence",
    description:
      "Accessible articles helping stakeholders understand the systems behind South Africa’s EV transition.",
  },
];

export default function Insights() {
  const [insights, setInsights] = useState([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInsights() {
      if (!supabase) {
        setLoadingInsights(false);
        return;
      }

      setLoadingInsights(true);
      setError("");

      const { data, error: insightsError } = await supabase
        .from("content_items")
        .select(
          "id, title, slug, excerpt, category, read_time, featured, published_at"
        )
        .eq("content_type", "insight")
        .eq("status", "published")
        .eq("access_level", "public")
        .order("published_at", { ascending: false });

      if (insightsError) {
        setError(insightsError.message);
        setInsights([]);
      } else {
        const formatted = (data || []).map((item) => ({
          slug: item.slug,
          category: item.category || "Insight",
          readTime: item.read_time || "Insight",
          title: item.title,
          excerpt: item.excerpt,
          date: item.published_at
            ? new Intl.DateTimeFormat("en-ZA", {
                year: "numeric",
                month: "short",
                day: "numeric",
              }).format(new Date(item.published_at))
            : "Unpublished",
          featured: item.featured,
        }));

        setInsights(formatted);
      }

      setLoadingInsights(false);
    }

    loadInsights();
  }, []);

  const featuredInsight = useMemo(
    () => insights.find((item) => item.featured) || insights[0],
    [insights]
  );

  const regularInsights = useMemo(
    () =>
      featuredInsight
        ? insights.filter((item) => item.slug !== featuredInsight.slug)
        : insights,
    [insights, featuredInsight]
  );

  return (
    <main className="insights-page">
      <section className="insights-hero">
        <div className="insights-copy">
          <p className="ti-kicker">IQ4EV Insights</p>

          <h1>Public EV intelligence for infrastructure decision-makers.</h1>

          <p className="insights-lead">
            IQ4EV Insights translate South Africa’s EV infrastructure, fleet
            transition, property-host and operational realities into accessible
            public intelligence.
          </p>

          <div className="insights-actions">
            <Button to="/briefings">Request a briefing</Button>

            <Button to="/briefings" variant="outline">
              View enterprise briefings
            </Button>
          </div>
        </div>

        <div className="insights-visual">
          <div className="insights-visual-glow one" />
          <div className="insights-visual-glow two" />

          <div className="insights-terminal">
            <div className="insights-terminal-top">
              <span />
              <span />
              <span />
            </div>

            <div className="insights-signal-card primary">
              <span>Public intelligence layer</span>
              <strong>Insights</strong>
              <p>
                Open market commentary designed to explain infrastructure
                behaviour, sector signals and EV transition realities.
              </p>
            </div>

            <div className="insights-signal-grid">
              <article>
                <span>01</span>
                <strong>Infrastructure</strong>
                <p>Charging networks, uptime and site-level visibility.</p>
              </article>

              <article>
                <span>02</span>
                <strong>Fleets</strong>
                <p>Operational readiness, routes and transition sequencing.</p>
              </article>

              <article>
                <span>03</span>
                <strong>Property</strong>
                <p>Property hosts as critical infrastructure partners.</p>
              </article>

              <article>
                <span>04</span>
                <strong>Markets</strong>
                <p>Sector movement, strategy and public intelligence signals.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="insights-definition">
        <div>
          <p className="ti-kicker">Insights vs Briefings</p>

          <h2>
            Insights shape public understanding. Briefings support enterprise
            decisions.
          </h2>
        </div>

        <div className="insights-definition-grid">
          <article>
            <span>Public Layer</span>
            <strong>Insights</strong>
            <p>
              Public-facing articles, thought leadership and market intelligence
              designed to help the broader sector understand EV infrastructure
              realities.
            </p>
          </article>

          <article>
            <span>Enterprise Layer</span>
            <strong>Briefings</strong>
            <p>
              Subscriber-grade intelligence reports focused on strategic risk,
              commercial implications, scenario analysis and operational
              decision-making.
            </p>
          </article>
        </div>
      </section>

      <section className="insights-latest">
        <div className="insights-section-head">
          <p className="ti-kicker">Latest insights</p>

          <h2>Public intelligence notes.</h2>

          <p>
            Structured commentary on EV infrastructure, fleet readiness,
            property participation and operational intelligence.
          </p>
        </div>

        {loadingInsights && (
          <article className="insights-empty-state">
            <h3>Loading insights…</h3>
          </article>
        )}

        {error && (
          <article className="insights-empty-state">
            <h3>Unable to load insights.</h3>
            <p>{error}</p>
          </article>
        )}

        {!loadingInsights && !error && insights.length === 0 && (
          <article className="insights-empty-state">
            <h3>No published insights yet.</h3>
            <p>
              Create a public insight from the admin content manager and set its
              status to published.
            </p>
          </article>
        )}

        {!loadingInsights && !error && insights.length > 0 && (
          <div className="insights-grid">
            {featuredInsight && (
              <InsightCard insight={featuredInsight} featured />
            )}

            {regularInsights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        )}
      </section>

      <section className="insights-areas">
        <div className="insights-section-head">
          <p className="ti-kicker">Coverage areas</p>

          <h2>What IQ4EV Insights focus on.</h2>

          <p>
            Public analysis is designed to educate the sector while building the
            evidence base for deeper enterprise intelligence.
          </p>
        </div>

        <div className="insights-area-grid">
          {insightAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article key={area.title}>
                <Icon size={22} />
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection
        eyebrow="Enterprise intelligence"
        title="Need the deeper decision layer?"
        description="IQ4EV Enterprise Briefings extend public insights into risk interpretation, commercial implications, scenario analysis and strategic decision support."
        buttonLabel="View enterprise briefings"
        buttonTo="/briefings"
      />
    </main>
  );
}