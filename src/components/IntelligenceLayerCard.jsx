export default function IntelligenceLayerCard({ number, title, description }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
        {number}
      </div>

      <h3 className="mt-6 text-2xl font-black text-slate-950">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}