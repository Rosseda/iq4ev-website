import {
  BarChart3,
  BatteryCharging,
  CloudSun,
  Gauge,
  MapPinned,
  Route,
  Timer,
  TrendingUp,
} from "lucide-react";
import Button from "../components/Button.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import FeatureGrid from "../components/FeatureGrid.jsx";
import UseCaseCard from "../components/UseCaseCard.jsx";
import ProcessStep from "../components/ProcessStep.jsx";
import CTASection from "../components/CTASection.jsx";
import MetricCard from "../components/MetricCard.jsx";

const features = [
  {
    icon: Route,
    title: "Route-based simulation",
    description:
      "Model EV fleet performance against routes, trip distances, duty cycles, traffic and operational patterns.",
  },
  {
    icon: CloudSun,
    title: "Environmental context",
    description:
      "Factor in weather, wind, elevation, gradient, terrain and regional operating conditions.",
  },
  {
    icon: BatteryCharging,
    title: "Charging assumptions",
    description:
      "Test charging availability, charging windows, depot readiness, energy demand and range confidence.",
  },
  {
    icon: Gauge,
    title: "Performance stress testing",
    description:
      "Identify when EV performance may become stressed by terrain, climate, payload, route intensity or charging gaps.",
  },
  {
    icon: BarChart3,
    title: "Fleet readiness scoring",
    description:
      "Convert simulated operational conditions into readiness scores and decision-support indicators.",
  },
  {
    icon: TrendingUp,
    title: "Transition planning",
    description:
      "Support phased electrification planning by comparing ICE-to-EV transition assumptions before investment decisions are made.",
  },
];

const useCases = [
  {
    title: "For fleet operators",
    description:
      "Understand whether EVs are suitable for specific routes, regions, depots and operational patterns before committing capital.",
  },
  {
    title: "For municipalities",
    description:
      "Evaluate public fleet electrification readiness across routes, service areas and depot charging requirements.",
  },
  {
    title: "For OEMs and advisors",
    description:
      "Use simulation intelligence to support customer conversations, vehicle suitability analysis and EV transition planning.",
  },
];

const process = [
  {
    number: "01",
    title: "Define the fleet scenario",
    description:
      "Set vehicle type, route, region, duty cycle, charging assumptions, environmental context and operational constraints.",
  },
  {
    number: "02",
    title: "Run simulated operating conditions",
    description:
      "EVSS models how route behaviour, terrain, weather, traffic and charging access affect fleet performance.",
  },
  {
    number: "03",
    title: "Compare readiness outcomes",
    description:
      "The system outputs readiness indicators, stress points and decision insights for phased EV adoption.",
  },
];

export default function EVSS() {
  return (
    <div>
      <PageHeader
        eyebrow="EVSS"
        title="EV fleet simulation system."
        description="EVSS helps fleets test electrification readiness before deployment by modelling route, terrain, weather, charging and operational conditions."
      />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="What EVSS does"
              title="It shows whether an EV fleet plan can survive real-world conditions."
              description="Fleet electrification is not only about vehicle range. It depends on route behaviour, topography, weather, charging access, traffic and duty-cycle realities. EVSS exists to make those variables visible before decisions are locked in."
            />

            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/contact">Request EVSS briefing</Button>
              <Button to="/terrainintel" variant="outline">
                View TerrainIntel
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-xl shadow-slate-200">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-slate-950">
                  EVSS Scenario View
                </p>
                <p className="text-xs text-slate-500">
                  Route, terrain and battery stress layer
                </p>
              </div>

              <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-pink-700">
                Simulation
              </span>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                      Route readiness
                    </p>
                    <p className="mt-2 text-3xl font-black text-slate-950">
                      78%
                    </p>
                  </div>
                  <Route className="text-orange-600" size={34} />
                </div>

                <div className="mt-5 h-3 rounded-full bg-slate-100">
                  <div className="h-3 w-[78%] rounded-full bg-orange-500" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <MetricCard
                  label="Battery stress"
                  value="Medium"
                  description="Affected by gradient, wind and trip pattern."
                />
                <MetricCard
                  label="Charging gap"
                  value="Low"
                  description="Depot charging assumption appears viable."
                />
                <MetricCard
                  label="Traffic impact"
                  value="+18 min"
                  description="Expected congestion effect on duty cycle."
                />
                <MetricCard
                  label="Elevation factor"
                  value="Active"
                  description="Terrain context included in simulation."
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <Timer className="text-orange-600" size={22} />
                  <p className="text-sm font-black text-slate-950">
                    Scenario output
                  </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  The route appears suitable for controlled EV deployment, with
                  weather and elevation requiring further stress testing before
                  scaling.
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
            title="Built to test EV fleet plans before they become expensive mistakes."
            description="EVSS brings operational reality into fleet electrification planning by modelling what affects EV performance on the road."
          />

          <div className="mt-10">
            <FeatureGrid items={features} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <SectionHeader
          eyebrow="Use cases"
          title="Who EVSS is for."
          description="EVSS supports stakeholders who need to understand fleet electrification feasibility before committing to rollout."
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
            title="From operating assumptions to fleet readiness intelligence."
            description="EVSS helps compare EV transition scenarios before vehicles, chargers and depot plans are finalised."
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
        eyebrow="EVSS briefing"
        title="Test fleet electrification before committing to rollout."
        description="Request an EVSS briefing to explore route readiness, battery stress, charging assumptions, depot suitability and EV fleet transition scenarios."
      />
    </div>
  );
}