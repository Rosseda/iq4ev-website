import {
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  FileSearch,
  LineChart,
  ShieldCheck,
} from "lucide-react";

import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import UseCaseCard from "../components/UseCaseCard.jsx";
import CTASection from "../components/CTASection.jsx";

const services = [
  {
    icon: Building2,
    title: "Infrastructure strategy",
    description:
      "Support EV infrastructure planning, rollout sequencing, charger positioning and operational visibility discussions.",
  },
  {
    icon: LineChart,
    title: "Market intelligence",
    description:
      "Research-driven insight into EV infrastructure trends, operational signals and sector movement.",
  },
  {
    icon: ClipboardCheck,
    title: "Operational readiness",
    description:
      "Assess whether organizations, fleets, properties or projects are operationally prepared for EV transition.",
  },
  {
    icon: FileSearch,
    title: "Research & analysis",
    description:
      "Produce analytical reports, intelligence summaries and strategic EV sector documentation.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential advisory",
    description:
      "Support sensitive infrastructure conversations while protecting stakeholder confidentiality.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Decision support",
    description:
      "Translate technical EV infrastructure realities into executive-level decision intelligence.",
  },
];

const clients = [
  {
    title: "Property stakeholders",
    description:
      "Support landlords, mixed-use developments, retail centres and estates navigating charger infrastructure discussions.",
  },
  {
    title: "Fleet stakeholders",
    description:
      "Help organizations evaluate fleet electrification readiness and operational implications.",
  },
  {
    title: "Infrastructure stakeholders",
    description:
      "Support charger operators, infrastructure groups and ecosystem participants with evidence-led insight.",
  },
];

export default function Consulting() {
  return (
    <div>
      <PageHeader
        eyebrow="Consulting"
        title="Strategic EV advisory and intelligence."
        description="IQ4EV supports organizations navigating EV infrastructure, operational readiness, fleet transition and strategic electrification decisions."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="What IQ4EV consulting is"
              title="Independent EV intelligence for real-world infrastructure decisions."
              description="IQ4EV operates as an intelligence quality company for the EV sector, helping organizations move beyond assumptions toward evidence-led infrastructure and operational thinking."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact">Request consultation</Button>

              <Button to="/briefings" variant="outline">
                View briefings
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Focus
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  Infrastructure intelligence
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Approach
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  Evidence-led
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Coverage
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  Fleet + infrastructure
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  Position
                </p>

                <p className="mt-2 text-2xl font-black text-slate-950">
                  Infrastructure-neutral
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
            title="Built around strategic EV infrastructure understanding."
            description="IQ4EV consulting combines operational awareness, spatial intelligence and EV sector analysis."
          />

          <div className="mt-10">
            <FeatureGrid items={services} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Stakeholders"
          title="Who IQ4EV supports."
          description="IQ4EV consulting is designed for organizations navigating the realities of electrification transition."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {clients.map((item) => (
            <UseCaseCard
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Consulting engagement"
        title="Bring EV infrastructure conversations into operational reality."
        description="Request a consultation with IQ4EV to explore infrastructure intelligence, fleet transition planning, reporting strategy and EV operational readiness."
      />
    </div>
  );
}