import {
  Map,
  Route,
  Zap,
  Layers3,
  MapPinned,
  Radar,
  GitCompare,
  Gauge,
} from "lucide-react";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import UseCaseCard from "../components/UseCaseCard.jsx";
import ProcessStep from "../components/ProcessStep.jsx";
import CTASection from "../components/CTASection.jsx";
import MapPreview from "../components/MapPreview.jsx";

const features = [
  {
    icon: Map,
    title: "Location intelligence",
    description:
      "Assess cities, towns, corridors, properties and municipalities through EV infrastructure planning context.",
  },
  {
    icon: Route,
    title: "Corridor modelling",
    description:
      "Analyse strategic transport routes such as national roads, logistics corridors and long-distance EV travel pathways.",
  },
  {
    icon: Zap,
    title: "Grid context",
    description:
      "Compare charger deployment scenarios against grid stress, infrastructure strength and location-specific constraints.",
  },
  {
    icon: Layers3,
    title: "Existing charger layer",
    description:
      "Use existing charger locations as a baseline layer for scenario comparisons and infrastructure gap analysis.",
  },
  {
    icon: GitCompare,
    title: "Scenario comparison",
    description:
      "Compare potential charger placement scenarios by demand, location, grid, coverage and infrastructure readiness.",
  },
  {
    icon: Gauge,
    title: "Planning readiness scores",
    description:
      "Translate complex spatial and infrastructure signals into clear planning readiness indicators.",
  },
];

const useCases = [
  {
    title: "For municipalities",
    description:
      "Understand where charging infrastructure can support public mobility, economic activity and municipal planning goals.",
  },
  {
    title: "For operators",
    description:
      "Identify locations and corridors where infrastructure expansion may be commercially and operationally viable.",
  },
  {
    title: "For property groups",
    description:
      "Compare sites and understand which properties may be better positioned for future EV infrastructure investment.",
  },
];

const process = [
  {
    number: "01",
    title: "Map the current landscape",
    description:
      "Start with existing chargers, spatial nodes, routes, towns, cities, properties and municipal context.",
  },
  {
    number: "02",
    title: "Layer infrastructure constraints",
    description:
      "Add grid, demand, corridor, traffic, land-use, regional and location-specific intelligence layers.",
  },
  {
    number: "03",
    title: "Compare scenarios",
    description:
      "Evaluate different charger placement options and infrastructure expansion pathways using evidence-led scoring.",
  },
];

export default function TerrainIntel() {
  return (
    <div>
      <PageHeader
        eyebrow="TerrainIntel"
        title="Spatial electrification intelligence."
        description="TerrainIntel helps stakeholders plan EV charging infrastructure by combining maps, routes, grid context, existing charger visibility and scenario comparison."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="What TerrainIntel does"
              title="It turns geography into EV infrastructure strategy."
              description="EV charging infrastructure decisions are deeply spatial. TerrainIntel helps decision-makers understand where infrastructure exists, where gaps may emerge and how deployment scenarios compare."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact">Request TerrainIntel briefing</Button>
              <Button to="/evss" variant="outline">
                View EVSS
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-slate-950">
                    TerrainIntel Scenario View
                  </p>
                  <p className="text-xs text-slate-500">
                    Location, route and grid planning layer
                  </p>
                </div>

                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                  Planning
                </span>
              </div>

              <MapPreview />

              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <MapPinned className="text-orange-600" size={22} />
                  <p className="mt-3 text-sm font-black text-slate-950">
                    Sites
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <Route className="text-orange-600" size={22} />
                  <p className="mt-3 text-sm font-black text-slate-950">
                    Routes
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <Radar className="text-orange-600" size={22} />
                  <p className="mt-3 text-sm font-black text-slate-950">
                    Risk
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <SectionHeader
            eyebrow="Capabilities"
            title="Built for charger placement, corridor planning and infrastructure comparison."
            description="TerrainIntel supports the planning layer of South Africa’s EV transition by making spatial infrastructure decisions more visible."
          />

          <div className="mt-10">
            <FeatureGrid items={features} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Use cases"
          title="Who TerrainIntel is for."
          description="TerrainIntel supports stakeholders who need to understand location readiness, route opportunity and infrastructure gaps."
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
            title="From map layers to infrastructure decisions."
            description="TerrainIntel uses layered spatial reasoning to support more disciplined EV infrastructure planning."
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
        eyebrow="TerrainIntel briefing"
        title="Plan EV infrastructure with spatial evidence, not guesswork."
        description="Request a TerrainIntel briefing to explore charger placement, route planning, existing charger baselines and infrastructure scenario comparison."
      />
    </div>
  );
}