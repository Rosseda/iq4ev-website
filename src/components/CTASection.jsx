import Button from "./Button.jsx";

export default function CTASection({
  eyebrow = "Strategic briefing",
  title = "See the EV sector as a system, not scattered assets.",
  description = "Request a briefing to understand how IQ4EV can support infrastructure planning, charger visibility, fleet readiness and strategic EV decision-making.",
  buttonLabel = "Request briefing",
  buttonTo = "/briefings",
}) {
  return (
    <section className="iq-cta-section">
      <div className="iq-cta-section-inner">
        <p>{eyebrow}</p>

        <h2>{title}</h2>

        <span>{description}</span>

        <div>
          <Button to={buttonTo} variant="orange">
            {buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}