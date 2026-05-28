import {
  BookOpenText,
  Building2,
  Cable,
  FileBarChart,
  Map,
  Newspaper,
} from "lucide-react";

import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import CTASection from "../components/CTASection.jsx";
import InsightCard from "../components/InsightCard.jsx";
import { insights } from "../data/insights.js";

const insightAreas = [
  {
    icon: Cable,
    title: "Infrastructure analysis",
    description:
      "Operational commentary and intelligence around EV charging infrastructure and deployment.",
  },
  {
    icon: Building2,
    title: "Property participation",
    description:
      "Analysis of the growing role property stakeholders play in EV infrastructure ecosystems.",
  },
  {
    icon: Map,
    title: "Spatial intelligence",
    description:
      "Discussion around charger placement, corridor development and regional infrastructure patterns.",
  },
  {
    icon: FileBarChart,
    title: "Operational insight",
    description:
      "Thought leadership around charger uptime, infrastructure visibility and EV operational realities.",
  },
  {
    icon: Newspaper,
    title: "Sector commentary",
    description:
      "Public intelligence notes interpreting EV sector movement and strategic implications.",
  },
  {
    icon: BookOpenText,
    title: "Educational content",
    description:
      "Clear explanations helping stakeholders better understand EV transition complexity.",
  },
];

export default function Insights() {
  const featuredInsight = insights.find((item) => item.featured);
  const regularInsights = insights.filter((item) => !item.featured);

  return (
    <div>
      <PageHeader
        eyebrow="Insights"
        title="Public EV intelligence and sector commentary."
        description="IQ4EV insights translate EV infrastructure, fleet transition and operational realities into accessible public intelligence."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="What insights are"
              title="Public-facing EV intelligence built around real infrastructure realities."
              description="IQ4EV insights are designed to explain the operational, spatial and strategic realities shaping South Africa’s EV transition."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact">Request a discussion</Button>

              <Button to="/briefings" variant="outline">
                View enterprise briefings
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Content themes
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                Infrastructure intelligence
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                Fleet transition realities
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                Property-host participation
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                EV operational systems thinking
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Latest insights"
            title="Public intelligence notes."
            description="Structured commentary on EV infrastructure, fleet readiness, property participation and operational intelligence."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featuredInsight && (
              <InsightCard insight={featuredInsight} featured />
            )}

            {regularInsights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Coverage"
          title="Built around EV infrastructure understanding."
          description="The insights layer focuses on helping the market better understand how EV systems actually behave."
        />

        <div className="mt-10">
          <FeatureGrid items={insightAreas} />
        </div>
      </section>

      <CTASection
        eyebrow="Public intelligence"
        title="Move beyond headlines into infrastructure understanding."
        description="Follow IQ4EV insights for operational commentary, EV infrastructure analysis and evidence-led sector thinking."
      />
    </div>
  );
}