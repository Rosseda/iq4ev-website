import { ShieldCheck } from "lucide-react";
import Button from "../components/Button.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import ProductCard from "../components/ProductCard.jsx";
import IntelligencePanel from "../components/IntelligencePanel.jsx";
import CTASection from "../components/CTASection.jsx";
import MetricCard from "../components/MetricCard.jsx";
import IntelligenceLayerCard from "../components/IntelligenceLayerCard.jsx";
import { products } from "../data/products.js";
import { homepageMetrics } from "../data/metrics.js";

const intelligenceLayers = [
  {
    number: "01",
    title: "Operational visibility",
    description:
      "Understand charger condition, uptime, site-level performance, infrastructure risk and reporting needs through Pulse360.",
  },
  {
    number: "02",
    title: "Spatial intelligence",
    description:
      "Compare locations, routes, corridors, grid context and existing charger layers through TerrainIntel.",
  },
  {
    number: "03",
    title: "Fleet simulation",
    description:
      "Test EV fleet readiness against terrain, environmental conditions, route behaviour and charging assumptions through EVSS.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,102,0,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,45,85,0.14),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-orange-700">
              South African EV Intelligence
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight tracking-tight text-slate-950 md:text-7xl">
              The intelligence layer for South Africa’s EV transition.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              IQ4EV helps operators, property hosts, fleets, municipalities and
              decision-makers move from assumptions to evidence-led EV
              infrastructure decisions.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Button to="/contact">Request a briefing</Button>
              <Button to="/pulse360" variant="outline">
                Explore platforms
              </Button>
            </div>
          </div>

          <IntelligencePanel />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Why IQ4EV"
          title="EV infrastructure is not one problem. It is a system of connected decisions."
          description="Charging infrastructure, fleet readiness, property participation, grid constraints and location realities all affect one another. IQ4EV exists to make those relationships visible."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {intelligenceLayers.map((layer) => (
            <IntelligenceLayerCard
              key={layer.number}
              number={layer.number}
              title={layer.title}
              description={layer.description}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="IQ4EV Platforms"
            title="One intelligence company. Multiple EV decision systems."
            description="IQ4EV brings together charger intelligence, spatial infrastructure planning, fleet simulation and strategic advisory into one EV intelligence ecosystem."
          />

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => {
              const Icon = product.icon;

              return (
                <ProductCard
                  key={product.title}
                  icon={<Icon />}
                  title={product.title}
                  status={product.status}
                  description={product.description}
                  to={product.path}
                />
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-4">
          {homepageMetrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              description={metric.description}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
              <ShieldCheck size={30} />
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
              Built for sensitive infrastructure conversations.
            </h2>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-lg leading-8 text-slate-600">
              IQ4EV is designed around confidential, evidence-led EV
              intelligence. The company does not need to own chargers, fleets or
              sites to create value. It creates the visibility layer between
              infrastructure, operators, hosts and decision-makers.
            </p>

            <div className="mt-6 grid gap-3 text-sm font-semibold text-slate-700 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                Client-sensitive analysis
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                Non-operator positioning
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                Infrastructure-neutral insight
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                Decision support, not guesswork
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}