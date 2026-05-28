export default function ProcessStep({ number, title, description }) {
  return (
    <div className="relative rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
        {number}
      </div>

      <h3 className="text-xl font-black text-slate-950">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}