import {
  BarChart3,
  Building2,
  Map,
  ShieldCheck,
} from "lucide-react";

import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import CTASection from "../components/CTASection.jsx";

const pillars = [
  {
    icon: BarChart3,
    title: "Operational intelligence",
    description:
      "Understanding charger infrastructure, fleet transition and operational realities through evidence-led analysis.",
  },
  {
    icon: Map,
    title: "Spatial infrastructure thinking",
    description:
      "Viewing EV transition through location, route, corridor and infrastructure context.",
  },
  {
    icon: Building2,
    title: "Infrastructure participation",
    description:
      "Recognising the role property hosts, operators, municipalities and stakeholders play in EV ecosystems.",
  },
  {
    icon: ShieldCheck,
    title: "Confidential decision support",
    description:
      "Supporting sensitive infrastructure conversations through neutral intelligence positioning.",
  },
];

export default function About() {
  return (
    <div>
      <PageHeader
        eyebrow="About IQ4EV"
        title="An intelligence quality company for the EV sector."
        description="IQ4EV exists to help South Africa’s EV ecosystem move from assumptions toward evidence-led infrastructure and operational understanding."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Why IQ4EV exists"
          title="EV transition is bigger than vehicles."
          description="The EV sector is not only about cars and chargers. It is also about property, operations, grid realities, infrastructure visibility, route behaviour and strategic coordination."
        />

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <p className="max-w-4xl text-lg leading-8 text-slate-700">
            IQ4EV was created to help organizations understand those
            relationships through operational intelligence, spatial analysis,
            fleet simulation and strategic EV insight.
          </p>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Core pillars"
            title="Built around intelligence, not hype."
            description="IQ4EV focuses on practical EV infrastructure understanding rather than trend-driven positioning."
          />

          <div className="mt-10">
            <FeatureGrid items={pillars} />
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="About IQ4EV"
        title="Support EV transition with evidence-led infrastructure thinking."
        description="Connect with IQ4EV to explore infrastructure intelligence, fleet transition understanding and strategic EV analysis."
      />
    </div>
  );
}