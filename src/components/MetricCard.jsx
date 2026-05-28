export default function MetricCard({ label, value, description }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black text-slate-950">{value}</p>

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      )}
    </div>
  );
}