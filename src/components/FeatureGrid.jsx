export default function FeatureGrid({ items }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
          >
            {Icon && (
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                <Icon size={24} />
              </div>
            )}

            <h3 className="text-xl font-black text-slate-950">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}