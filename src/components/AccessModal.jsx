import { useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

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

const BRIEFING_TOPICS = [
  "Corridor Watch",
  "Infrastructure Economics",
  "Fleet Transition",
  "Municipal Readiness",
  "Property Strategy",
  "Grid Exposure",
  "Policy & Regulatory",
  "Charging Behaviour",
  "All briefings",
];

const CONSULTING_AREAS = [
  "Infrastructure planning",
  "Fleet transition",
  "Charging strategy",
  "Property-host strategy",
  "Municipal readiness",
  "OEM market support",
  "TerrainIntel analysis",
  "Pulse360 evaluation",
  "EVSS simulation",
  "General strategic support",
];

export default function AccessModal({
  open,
  onClose,
  mode = "general",
  defaultPlatform = "",
  defaultRequestType = "Request Access",
}) {
  const [organisationType, setOrganisationType] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(
    defaultPlatform ? [defaultPlatform] : []
  );
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedConsultingAreas, setSelectedConsultingAreas] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const dynamicQuestions = useMemo(() => {
    switch (organisationType) {
      case "Fleet Operator":
        return [
          "Fleet size",
          "Route type",
          "Depot availability",
          "EV transition stage",
        ];
      case "Property Host":
        return [
          "Site type",
          "Number of locations",
          "Existing chargers?",
          "Reporting issues",
        ];
      case "Charge Point Operator":
        return [
          "Network size",
          "OCPP/data availability",
          "Host reporting needs",
          "Operational pain points",
        ];
      case "Municipality":
        return [
          "Province",
          "Infrastructure goals",
          "Fleet electrification plans",
          "Corridor concerns",
        ];
      case "OEM":
        return [
          "EV programme focus",
          "Infrastructure concerns",
          "Customer readiness needs",
          "Market intelligence needs",
        ];
      case "Consultant":
        return [
          "Client sector",
          "Project scope",
          "Data/intelligence needs",
          "Timeline",
        ];
      case "Investor / Research":
        return [
          "Research focus",
          "Region of interest",
          "Investment/intelligence needs",
          "Decision timeline",
        ];
      default:
        return [
          "Organisation focus",
          "Main challenge",
          "Support required",
          "Timeline",
        ];
    }
  }, [organisationType]);

  if (!open) return null;

  function toggleItem(value, setter) {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  function togglePlatform(platform) {
    toggleItem(platform, setSelectedPlatforms);
  }

  function toggleTopic(topic) {
    toggleItem(topic, setSelectedTopics);
  }

  function toggleConsultingArea(area) {
    toggleItem(area, setSelectedConsultingAreas);
  }

  async function handleBriefingSubmit(event) {
    event.preventDefault();

    if (!supabase) {
      alert(
        "Supabase is not connected yet. Please check your .env.local values and restart the dev server."
      );
      return;
    }

    if (selectedTopics.length === 0) {
      alert("Please select at least one briefing topic.");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const fullName = formData.get("fullName")?.toString().trim();
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();
    const company = formData.get("company")?.toString().trim();
    const position = formData.get("position")?.toString().trim();

    if (!fullName || !email || !password || !company || !position) {
      alert("Please complete all required fields.");
      return;
    }

    setSubmitting(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company,
          position,
          topics_of_interest: selectedTopics,
          requested_product: "Enterprise Briefings",
        },
      },
    });

    setSubmitting(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(
  "Your briefing access account has been created. Please confirm your email, then continue to the subscription payment page."
);

onClose();
window.location.href = "/subscribe";
  }

  function handleConsultingSubmit(event) {
    event.preventDefault();

    alert(
      "Consultation request captured. Next step: connect this form to IQ4EV email/backend handling."
    );

    onClose();
  }

  function handleGeneralSubmit(event) {
    event.preventDefault();

    alert(
      "Access request captured. Next step: connect this form to IQ4EV email/backend handling."
    );

    onClose();
  }

  const modalTitle =
    mode === "briefing"
      ? "Request Briefing Access"
      : mode === "consulting"
        ? "Request IQ4EV Consultation"
        : defaultRequestType;

  const modalEyebrow =
    mode === "briefing"
      ? "IQ4EV Enterprise Briefings"
      : mode === "consulting"
        ? "IQ4EV Strategic Consulting"
        : "IQ4EV Enterprise Onboarding";

  const modalDescription =
    mode === "briefing"
      ? "Create your briefing access account, select your intelligence interests, then continue to the secure monthly subscription step."
      : mode === "consulting"
        ? "Tell us what kind of EV infrastructure, fleet, property or strategic support your organisation needs."
        : "Access is consultation-led. Submissions are reviewed manually before platform onboarding.";

  return (
    <div className="access-backdrop" role="dialog" aria-modal="true">
      <section className="access-modal">
        <button
          className="access-close"
          type="button"
          onClick={onClose}
          aria-label="Close access form"
        >
          ×
        </button>

        <div className="access-header">
          <p>{modalEyebrow}</p>
          <h2>{modalTitle}</h2>
          <span>{modalDescription}</span>
        </div>

        {mode === "briefing" && (
          <form className="access-form" onSubmit={handleBriefingSubmit}>
            <div className="access-two-col">
              <label>
                Full name
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.co.za"
                  required
                />
              </label>
            </div>

            <label>
              Create password
              <input
                type="password"
                name="password"
                placeholder="Create a secure password"
                minLength={8}
                required
              />
            </label>

            <div className="access-two-col">
              <label>
                Company / organisation
                <input
                  type="text"
                  name="company"
                  placeholder="Company / municipality / entity"
                  required
                />
              </label>

              <label>
                Position / role
                <input
                  type="text"
                  name="position"
                  placeholder="e.g. Strategy lead, executive, analyst"
                  required
                />
              </label>
            </div>

            <div className="access-section compact">
              <h3>Which briefing topics are you most interested in?</h3>

              <div className="access-check-grid">
                {BRIEFING_TOPICS.map((topic) => (
                  <label key={topic}>
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic)}
                      onChange={() => toggleTopic(topic)}
                    />
                    {topic}
                  </label>
                ))}
              </div>
            </div>

            <div className="access-section compact access-price-card">
              <h3>Enterprise Briefings Access</h3>
              <p>
                R300 per month for subscriber access to IQ4EV Enterprise
                Briefings. Full briefing content is available only to active
                subscribers.
              </p>
            </div>

            <button
              type="submit"
              className="access-submit"
              disabled={submitting}
            >
              {submitting ? "Creating access..." : "Continue to secure payment"}
            </button>

            <small>
              This creates the briefing access account first. Nedbank payment
              integration will activate the subscription once the monthly
              payment is confirmed.
            </small>
          </form>
        )}

        {mode === "consulting" && (
          <form className="access-form" onSubmit={handleConsultingSubmit}>
            <div className="access-two-col">
              <label>
                Full name
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your full name"
                  required
                />
              </label>

              <label>
                Work email
                <input
                  type="email"
                  name="email"
                  placeholder="name@organisation.co.za"
                  required
                />
              </label>
            </div>

            <div className="access-two-col">
              <label>
                Company / organisation
                <input
                  type="text"
                  name="company"
                  placeholder="Company / municipality / entity"
                  required
                />
              </label>

              <label>
                Position / role
                <input type="text" name="position" placeholder="Your role" />
              </label>
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

            <div className="access-section compact">
              <h3>What support are you looking for?</h3>

              <div className="access-check-grid">
                {CONSULTING_AREAS.map((area) => (
                  <label key={area}>
                    <input
                      type="checkbox"
                      checked={selectedConsultingAreas.includes(area)}
                      onChange={() => toggleConsultingArea(area)}
                    />
                    {area}
                  </label>
                ))}
              </div>
            </div>

            <div className="access-two-col">
              <label>
                Timeline
                <input
                  type="text"
                  name="timeline"
                  placeholder="Immediate / 1–3 months / exploratory"
                />
              </label>

              <label>
                Region of interest
                <input
                  type="text"
                  name="region"
                  placeholder="Province, city, corridor or national"
                />
              </label>
            </div>

            <label>
              Tell us what you need help with
              <textarea
                name="message"
                placeholder="Describe your infrastructure, fleet, charging, property, corridor or strategic support requirement."
                required
              />
            </label>

            <button type="submit" className="access-submit">
              Submit consultation request
            </button>

            <small>
              This is a consultation request, not a subscription payment flow.
              IQ4EV will follow up manually once backend email handling is
              connected.
            </small>
          </form>
        )}

        {mode === "general" && (
          <>
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

            <form className="access-form" onSubmit={handleGeneralSubmit}>
              <div className="access-two-col">
                <label>
                  Name
                  <input type="text" placeholder="Your name" required />
                </label>

                <label>
                  Work email
                  <input
                    type="email"
                    placeholder="name@organisation.co.za"
                    required
                  />
                </label>
              </div>

              <label>
                Organisation
                <input
                  type="text"
                  placeholder="Company / municipality / entity"
                  required
                />
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
                <textarea placeholder="Describe your infrastructure, fleet, charging, property, corridor, briefing or consulting requirement." />
              </label>

              <button type="submit" className="access-submit">
                Submit for review
              </button>

              <small>
                Automated confirmation emails should be sent from
                do-not-reply@iq4ev.co.za once backend email handling is
                connected.
              </small>
            </form>
          </>
        )}
      </section>
    </div>
  );
}