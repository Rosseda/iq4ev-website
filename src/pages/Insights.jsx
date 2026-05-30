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
import { insights } from "../data/insights.js";

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
  const featuredInsight = insights.find((item) => item.featured);
  const regularInsights = insights.filter((item) => !item.featured);

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
            <Button to="/contact">Request a discussion</Button>

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

          <h2>Insights shape public understanding. Briefings support enterprise decisions.</h2>
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

        <div className="insights-grid">
          {featuredInsight && (
            <InsightCard insight={featuredInsight} featured />
          )}

          {regularInsights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </section>

      <section className="insights-coverage">
        <div className="insights-section-head">
          <p className="ti-kicker">Coverage</p>

          <h2>Built around EV infrastructure understanding.</h2>

          <p>
            The insights layer helps the market better understand how EV systems
            actually behave across charging, property, fleet and corridor
            environments.
          </p>
        </div>

        <div className="insights-coverage-grid">
          {insightAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article key={area.title}>
                <span>
                  <Icon size={20} />
                </span>

                <strong>{area.title}</strong>

                <p>{area.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection
        eyebrow="Public intelligence"
        title="Move beyond headlines into infrastructure understanding."
        description="Follow IQ4EV Insights for public EV infrastructure analysis, operational commentary and evidence-led sector thinking."
      />
    </main>
  );
}