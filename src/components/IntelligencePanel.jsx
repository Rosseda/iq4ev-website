import MetricCard from "./MetricCard.jsx";
import MapPreview from "./MapPreview.jsx";

const signals = [
  { label: "Infrastructure", value: "Mapped" },
  { label: "Grid Context", value: "Modelled" },
  { label: "Fleet Layer", value: "Simulated" },
  { label: "Risk View", value: "Active" },
];

export default function IntelligencePanel() {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200">
      <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-sm font-black text-slate-950">
              IQ4EV Intelligence View
            </p>
            <p className="text-xs text-slate-500">
              Infrastructure, fleet and risk signals
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            Operational
          </span>
        </div>

        <MapPreview />

        <div className="mt-4 grid grid-cols-2 gap-3">
          {signals.map((item) => (
            <MetricCard key={item.label} label={item.label} value={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}