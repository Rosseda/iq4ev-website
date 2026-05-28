export default function UseCaseCard({ title, description }) {
  return (
    <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}