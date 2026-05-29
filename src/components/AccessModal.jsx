import { useMemo, useState } from "react";

const ORG_TYPES = [
  "Fleet Operator",
  "Property Host",
  "Charge Point Operator",
  "Municipality",
  "OEM",
  "Consultant",
  "Investor / Research",
  "Other",
];

const PLATFORMS = [
  "TerrainIntel",
  "Pulse360",
  "EVSS",
  "Enterprise Briefings",
  "Strategic Consulting",
];

export default function AccessModal({
  open,
  onClose,
  defaultPlatform = "",
  defaultRequestType = "Request Access",
}) {
  const [organisationType, setOrganisationType] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    defaultPlatform ? [defaultPlatform] : []
  );

  const dynamicQuestions = useMemo(() => {
    switch (organisationType) {
      case "Fleet Operator":
        return ["Fleet size", "Route type", "Depot availability", "EV transition stage"];
      case "Property Host":
        return ["Site type", "Number of locations", "Existing chargers?", "Reporting issues"];
      case "Charge Point Operator":
        return ["Network size", "OCPP/data availability", "Host reporting needs", "Operational pain points"];
      case "Municipality":
        return ["Province", "Infrastructure goals", "Fleet electrification plans", "Corridor concerns"];
      case "OEM":
        return ["EV programme focus", "Infrastructure concerns", "Customer readiness needs", "Market intelligence needs"];
      case "Consultant":
        return ["Client sector", "Project scope", "Data/intelligence needs", "Timeline"];
      case "Investor / Research":
        return ["Research focus", "Region of interest", "Investment/intelligence needs", "Decision timeline"];
      default:
        return ["Organisation focus", "Main challenge", "Support required", "Timeline"];
    }
  }, [organisationType]);

  if (!open) return null;

  function togglePlatform(platform) {
    setSelectedPlatforms((current) =>
      current.includes(platform)
        ? current.filter((item) => item !== platform)
        : [...current, platform]
    );
  }

  return (
    <div className="access-backdrop">
      <section className="access-modal">
        <button className="access-close" type="button" onClick={onClose}>
          ×
        </button>

        <div className="access-header">
          <p>IQ4EV Enterprise Onboarding</p>
          <h2>{defaultRequestType}</h2>
          <span>
            Access is consultation-led. Submissions are reviewed manually before
            platform onboarding.
          </span>
        </div>

        <div className="access-section">
          <h3>What best describes your organisation?</h3>

          <div className="access-card-grid">
            {ORG_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className={organisationType === type ? "active" : ""}
                onClick={() => setOrganisationType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <form className="access-form">
          <div className="access-two-col">
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>

            <label>
              Work email
              <input type="email" placeholder="name@organisation.co.za" />
            </label>
          </div>

          <label>
            Organisation
            <input type="text" placeholder="Company / municipality / entity" />
          </label>

          <div className="access-section compact">
            <h3>Which IQ4EV systems are you interested in?</h3>

            <div className="access-check-grid">
              {PLATFORMS.map((platform) => (
                <label key={platform}>
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform)}
                    onChange={() => togglePlatform(platform)}
                  />
                  {platform}
                </label>
              ))}
            </div>
          </div>

          <div className="access-two-col">
            {dynamicQuestions.map((question) => (
              <label key={question}>
                {question}
                <input type="text" placeholder={question} />
              </label>
            ))}
          </div>

          <label>
            Tell us what you need help with
            <textarea placeholder="Describe your infrastructure, fleet, charging, property, corridor, briefing or consulting requirement..." />
          </label>

          <button type="submit" className="access-submit">
            Submit for review
          </button>

          <small>
            Automated confirmation emails should be sent from
            do-not-reply@iq4ev.co.za once backend email handling is connected.
          </small>
        </form>
      </section>
    </div>
  );
}