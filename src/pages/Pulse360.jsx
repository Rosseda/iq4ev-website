import {
  Activity,
  AlertTriangle,
  Building2,
  FileBarChart,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import UseCaseCard from "../components/UseCaseCard.jsx";
import ProcessStep from "../components/ProcessStep.jsx";
import CTASection from "../components/CTASection.jsx";

const features = [
  {
    icon: Activity,
    title: "Charger health visibility",
    description:
      "Track charger status, uptime behaviour, availability signals and operational condition across sites.",
  },
  {
    icon: AlertTriangle,
    title: "Risk intelligence",
    description:
      "Identify infrastructure risk, downtime patterns, site stress, repeat faults and operational weak points.",
  },
  {
    icon: Building2,
    title: "Property-host reporting",
    description:
      "Give landlords, retail centres, hotels, estates and other host properties clear visibility into the assets on their sites.",
  },
  {
    icon: Gauge,
    title: "Performance context",
    description:
      "Understand charger performance against site realities, usage behaviour, location context and operating conditions.",
  },
  {
    icon: FileBarChart,
    title: "Executive reporting",
    description:
      "Translate technical charger data into boardroom-ready summaries, property reports and infrastructure intelligence.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential intelligence layer",
    description:
      "Support sensitive conversations between operators, hosts and decision-makers without exposing unnecessary client data.",
  },
];

const useCases = [
  {
    title: "For property hosts",
    description:
      "Understand whether chargers on your property are reliable, visible, well-maintained and contributing to the value of the site.",
  },
  {
    title: "For operators",
    description:
      "Use intelligence reporting to improve service visibility, infrastructure conversations and performance accountability.",
  },
  {
    title: "For investors and decision-makers",
    description:
      "View charger infrastructure as an operational asset class, not just hardware installed in the ground.",
  },
];

const process = [
  {
    number: "01",
    title: "Ingest infrastructure signals",
    description:
      "Pulse360 receives charger and site-level data through secure ingestion methods designed for operational intelligence.",
  },
  {
    number: "02",
    title: "Analyse risk and performance",
    description:
      "The platform converts raw infrastructure signals into uptime, condition, site and operational risk intelligence.",
  },
  {
    number: "03",
    title: "Report for decisions",
    description:
      "IQ4EV translates the intelligence into dashboards, reports and strategic recommendations for stakeholders.",
  },
];

export default function Pulse360() {
  return (
    <div>
      <PageHeader
        eyebrow="Pulse360"
        title="Charger and property intelligence."
        description="Pulse360 is IQ4EV’s flagship intelligence layer for EV charging infrastructure, helping stakeholders understand charger health, uptime, site risk and infrastructure value."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="What Pulse360 does"
              title="It turns charger data into infrastructure intelligence."
              description="EV chargers are no longer just technical assets. They sit inside properties, retail networks, fleet operations and public infrastructure systems. Pulse360 helps make their condition and performance visible."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact">Request Pulse360 briefing</Button>
              <Button to="/terrainintel" variant="outline">
                View TerrainIntel
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Layer
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  Charger health
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Output
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  Risk reports
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Users
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  Hosts & operators
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Positioning
                </p>
                <p className="mt-2 text-2xl font-black text-slate-950">
                  Neutral visibility
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Capabilities"
            title="Designed for visibility, reporting and operational accountability."
            description="Pulse360 focuses on the intelligence gap between charger hardware, property hosts, operators and strategic decision-makers."
          />

          <div className="mt-10">
            <FeatureGrid items={features} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Use cases"
          title="Who Pulse360 is for."
          description="The platform is designed for stakeholders who need clarity without becoming charger technicians."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {useCases.map((item) => (
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
            title="From infrastructure signals to decision-ready intelligence."
            description="Pulse360 is built to translate technical charger information into clear operational and strategic insight."
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
        eyebrow="Pulse360 briefing"
        title="Turn charger infrastructure into a visible operational asset."
        description="Request a Pulse360 briefing to explore charger visibility, property-host intelligence, operational risk reporting and stakeholder dashboards."
      />
    </div>
  );
}