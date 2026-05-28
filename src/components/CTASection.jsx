import Button from "./Button.jsx";

export default function CTASection({
  eyebrow = "Strategic briefing",
  title = "See the EV sector as a system, not scattered assets.",
  description = "Request a briefing to understand how IQ4EV can support infrastructure planning, charger visibility, fleet readiness and strategic EV decision-making.",
}) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="rounded-[2rem] bg-slate-950 p-10 text-white md:p-14">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-400">
          {eyebrow}
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-5xl">
          {title}
        </h2>

        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          {description}
        </p>

        <div className="mt-8">
          <Button to="/contact" variant="orange">
            Request briefing
          </Button>
        </div>
      </div>
    </section>
  );
}