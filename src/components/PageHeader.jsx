export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
          {eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
          {title}
        </h1>

        {description && (
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}