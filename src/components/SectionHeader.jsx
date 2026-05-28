export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment}`}>
      {eyebrow && (
        <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-600">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-slate-600">{description}</p>
      )}
    </div>
  );
}