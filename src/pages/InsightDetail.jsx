import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { insights } from "../data/insights.js";
import CTASection from "../components/CTASection.jsx";

const articleBodies = {
  "invisible-frontliners": [
    {
      heading: "EV infrastructure depends on more than operators and drivers.",
      text: "When people talk about EV charging infrastructure, the conversation usually focuses on the charging network operators building and managing the stations, and the EV drivers using them. But between these two sits a third group that quietly enables much of the infrastructure we see today: property hosts.",
    },
    {
      heading: "Property hosts are infrastructure partners.",
      text: "Retail centres, hotels, office parks, fuel stations, residential estates and mixed-use developments provide the physical space where charging stations are installed. Without these locations, most public charging infrastructure would have nowhere to operate.",
    },
    {
      heading: "Visibility creates better infrastructure conversations.",
      text: "As EV infrastructure expands, property hosts need clearer visibility into how chargers perform, what risks exist on their sites and how charging assets contribute to the broader value of the property.",
    },
  ],

  "charger-downtime": [
    {
      heading: "Downtime is not only a technical event.",
      text: "A charger that is unavailable affects more than a single charging session. It influences driver confidence, site reputation, operator credibility and the perceived reliability of the wider EV ecosystem.",
    },
    {
      heading: "Every failed session creates a trust problem.",
      text: "For drivers, downtime can turn a planned charging stop into uncertainty. For property hosts, it can affect the customer experience. For operators, repeated downtime can weaken confidence in network quality.",
    },
    {
      heading: "Infrastructure needs operational visibility.",
      text: "The sector needs better visibility into uptime, fault patterns, maintenance signals and site-level risk so that infrastructure performance can be understood before it becomes reputational damage.",
    },
  ],

  "ev-transition-systems": [
    {
      heading: "EV transition is not just vehicle replacement.",
      text: "Electrification requires more than replacing internal combustion vehicles with electric alternatives. It requires infrastructure readiness, charging behaviour, depot planning, route suitability, grid awareness and operational sequencing.",
    },
    {
      heading: "Systems thinking reduces implementation risk.",
      text: "A fleet may appear ready on paper, but real-world conditions such as terrain, weather, traffic, payload, charging windows and route intensity can change the outcome significantly.",
    },
    {
      heading: "Operational intelligence supports better rollout.",
      text: "A systems approach allows organizations to test assumptions, compare scenarios and understand the practical realities of EV transition before committing capital.",
    },
  ],

  "property-hosts": [
    {
      heading: "Property hosts are not passive locations.",
      text: "The properties where chargers are installed form a critical part of the EV infrastructure ecosystem. These sites shape access, convenience, visibility and the commercial experience of public charging.",
    },
    {
      heading: "Chargers can influence property value and experience.",
      text: "For retail centres, hotels, estates and mixed-use developments, charging infrastructure can support customer attraction, tenant value, sustainability positioning and future mobility relevance.",
    },
    {
      heading: "Hosts need better reporting.",
      text: "To participate effectively, property hosts need clear reporting on charger performance, reliability, usage context and site-level risks without needing to become technical charger specialists.",
    },
  ],
};

export default function InsightDetail() {
  const { slug } = useParams();

  const insight = insights.find((item) => item.slug === slug);
  const article = articleBodies[slug];

  if (!insight || !article) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
          Insight not found
        </p>

        <h1 className="mt-5 text-5xl font-black tracking-tight text-slate-950">
          This article does not exist.
        </h1>

        <Link
          to="/insights"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600"
        >
          <ArrowLeft size={18} />
          Back to insights
        </Link>
      </section>
    );
  }

  return (
    <div>
      <article className="mx-auto max-w-4xl px-6 py-24">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-sm font-bold text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to insights
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
            {insight.category}
          </span>

          <span className="text-xs font-semibold text-slate-500">
            {insight.readTime}
          </span>

          <span className="text-xs font-semibold text-slate-400">
            {insight.date}
          </span>
        </div>

        <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
          {insight.title}
        </h1>

        <p className="mt-7 text-xl leading-9 text-slate-600">
          {insight.excerpt}
        </p>

        <div className="mt-14 space-y-12 border-t border-slate-200 pt-12">
          {article.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-black tracking-tight text-slate-950">
                {section.heading}
              </h2>

              <p className="mt-4 text-lg leading-8 text-slate-600">
                {section.text}
              </p>
            </section>
          ))}
        </div>
      </article>

      <CTASection
        eyebrow="IQ4EV insights"
        title="Turn EV sector signals into infrastructure understanding."
        description="Explore IQ4EV briefings and consulting support for deeper EV infrastructure, fleet and operational intelligence."
      />
    </div>
  );
}