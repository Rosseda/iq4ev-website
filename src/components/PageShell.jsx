export default function PageShell({ eyebrow, title, description }) {
  return (
    <section className="min-h-[70vh] border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
          {eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
          {title}
        </h1>

        <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
          {description}
        </p>

        <div className="mt-12 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
            Page under development
          </p>
          <p className="mt-3 text-lg font-bold text-slate-950">
            This section will be expanded in the next build phase.
          </p>
        </div>
      </div>
    </section>
  );
}