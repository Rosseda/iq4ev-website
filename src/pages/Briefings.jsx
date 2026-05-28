import {
  AlertTriangle,
  BriefcaseBusiness,
  FileBarChart,
  Globe2,
  Landmark,
  LineChart,
} from "lucide-react";

import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import UseCaseCard from "../components/UseCaseCard.jsx";
import ProcessStep from "../components/ProcessStep.jsx";
import CTASection from "../components/CTASection.jsx";

const briefingAreas = [
  {
    icon: Globe2,
    title: "Market movement",
    description:
      "Track EV infrastructure developments, sector activity, public announcements and commercial signals.",
  },
  {
    icon: Landmark,
    title: "Policy and regulation",
    description:
      "Interpret regulatory shifts, municipal activity, public-sector decisions and policy developments affecting EV transition.",
  },
  {
    icon: AlertTriangle,
    title: "Risk signals",
    description:
      "Identify operational, infrastructure, grid, property and market risks that may affect EV planning.",
  },
  {
    icon: LineChart,
    title: "Commercial implications",
    description:
      "Translate market activity into strategic implications for operators, OEMs, fleets, properties and investors.",
  },
  {
    icon: FileBarChart,
    title: "Infrastructure intelligence",
    description:
      "Analyse charger deployment, network expansion, corridor coverage and infrastructure readiness signals.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Executive summaries",
    description:
      "Deliver concise, decision-ready briefing notes that help leadership understand what matters and why.",
  },
];

const audiences = [
  {
    title: "Executives and decision-makers",
    description:
      "For leaders who need the commercial meaning behind EV infrastructure developments, not just news headlines.",
  },
  {
    title: "Operators and infrastructure teams",
    description:
      "For teams monitoring rollout, site strategy, charger performance and sector movements.",
  },
  {
    title: "Property and fleet stakeholders",
    description:
      "For organizations evaluating how EV transition affects property value, fleet operations and infrastructure participation.",
  },
];

const process = [
  {
    number: "01",
    title: "Monitor signals",
    description:
      "IQ4EV tracks EV infrastructure, policy, market, operator, fleet and property-related developments.",
  },
  {
    number: "02",
    title: "Interpret impact",
    description:
      "The briefing layer explains what changed, why it matters and who may be affected.",
  },
  {
    number: "03",
    title: "Deliver decision intelligence",
    description:
      "Insights are presented in a concise format for commercial, operational and strategic decision-making.",
  },
];

export default function Briefings() {
  return (
    <div>
      <PageHeader
        eyebrow="Enterprise Briefings"
        title="Weekly EV intelligence for decision-makers."
        description="IQ4EV briefings translate EV sector movement, infrastructure signals, policy changes and operational risks into clear strategic intelligence."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="What briefings do"
              title="They explain what EV developments mean for business, infrastructure and operations."
              description="Public news tells you what happened. IQ4EV briefings focus on what it means, who it affects and what decisions may need to follow."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact">Request briefing access</Button>

              <Button to="/insights" variant="outline">
                View public insights
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-orange-600">
              Briefing structure
            </p>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-lg font-black text-slate-950">
                  1. What happened
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Key EV infrastructure, market and policy developments.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-lg font-black text-slate-950">
                  2. Why it matters
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Strategic interpretation for stakeholders.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-lg font-black text-slate-950">
                  3. What to watch
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Risks, opportunities and next signals to monitor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Briefing coverage"
            title="From public developments to enterprise-level interpretation."
            description="The briefing layer is designed for stakeholders who need concise intelligence rather than scattered information."
          />

          <div className="mt-10">
            <FeatureGrid items={briefingAreas} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Audience"
          title="Who the briefings are for."
          description="IQ4EV briefings are designed for organizations that need to understand EV sector movement without building an internal research unit."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {audiences.map((item) => (
            <UseCaseCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="How it works"
            title="From signal monitoring to decision intelligence."
            description="The enterprise briefing layer is designed to help organizations understand not just the news, but the implication of the news."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {process.map((step) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Enterprise intelligence"
        title="Move from EV news to EV decision intelligence."
        description="Request access to IQ4EV enterprise briefings for structured EV market, infrastructure, risk and policy intelligence."
      />
    </div>
  );
}