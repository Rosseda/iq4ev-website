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
  "Infrastructure Economics Watch",
  "Fleet Transition Watch",
  "Municipal Readiness Watch",
  "Property Strategy Watch",
  "Grid Exposure Watch",
  "Policy & Regulatory Watch",
  "Charging Behaviour Watch",
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

const PRODUCT_COPY = {
  general: {
    eyebrow: "IQ4EV Enterprise Onboarding",
    title: "Request IQ4EV Access",
    description:
      "Access is consultation-led. Submissions are reviewed manually before platform or advisory onboarding.",
    sourcePage: "general",
    requestType: "general",
    defaultPlatform: "",
  },
  briefing: {
    eyebrow: "IQ4EV Enterprise Briefings",
    title: "Request Briefing Access",
    description:
      "Create your briefing access account, select your intelligence interests, then continue to the secure monthly subscription step.",
    sourcePage: "briefings",
    requestType: "briefing",
    defaultPlatform: "Enterprise Briefings",
  },
  consulting: {
    eyebrow: "IQ4EV Strategic Consulting",
    title: "Request IQ4EV Consultation",
    description:
      "Tell us what kind of EV infrastructure, fleet, property or strategic support your organisation needs.",
    sourcePage: "consulting",
    requestType: "consulting",
    defaultPlatform: "Strategic Consulting",
  },
  pulse360: {
    eyebrow: "Pulse360 Site & Charger Intelligence",
    title: "Request Pulse360 Engagement",
    description:
      "Tell us about your charger sites, property-host reporting needs, operational concerns or charger evaluation requirements.",
    sourcePage: "pulse360",
    requestType: "pulse360",
    defaultPlatform: "Pulse360",
  },
  terrainintel: {
    eyebrow: "TerrainIntel Spatial Intelligence",
    title: "Request TerrainIntel Engagement",
    description:
      "Tell us about your deployment area, corridor, municipal exposure or spatial planning requirement.",
    sourcePage: "terrainintel",
    requestType: "terrainintel",
    defaultPlatform: "TerrainIntel",
  },
  evss: {
    eyebrow: "EVSS Fleet Transition Intelligence",
    title: "Request EVSS Engagement",
    description:
      "Tell us about your fleet transition, vehicle comparison, route readiness or operational simulation requirement.",
    sourcePage: "evss",
    requestType: "evss",
    defaultPlatform: "EVSS",
  },
};

export default function AccessModal({
  open,
  onClose,
  mode = "general",
  defaultPlatform = "",
  defaultRequestType = "",
}) {
  const activeMode = PRODUCT_COPY[mode] ? mode : "general";
  const copy = PRODUCT_COPY[activeMode];

  const initialPlatform =
    defaultPlatform || copy.defaultPlatform ? [defaultPlatform || copy.defaultPlatform] : [];

  const [organisationType, setOrganisationType] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState(initialPlatform);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedConsultingAreas, setSelectedConsultingAreas] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState(null);

  const dynamicQuestions = useMemo(() => {
    switch (organisationType) {
      case "Fleet Operator":
        return [
          { label: "Fleet size", name: "fleet_size" },
          { label: "Route type", name: "route_type" },
          { label: "Depot availability", name: "depot_availability" },
          { label: "EV transition stage", name: "ev_transition_stage" },
        ];
      case "Property Host":
        return [
          { label: "Site type", name: "site_type" },
          { label: "Number of locations", name: "number_of_locations" },
          { label: "Existing chargers?", name: "existing_chargers" },
          { label: "Reporting issues", name: "reporting_issues" },
        ];
      case "Charge Point Operator":
        return [
          { label: "Network size", name: "network_size" },
          { label: "OCPP/data availability", name: "ocpp_data_availability" },
          { label: "Host reporting needs", name: "host_reporting_needs" },
          { label: "Operational pain points", name: "operational_pain_points" },
        ];
      case "Municipality":
        return [
          { label: "Province", name: "province" },
          { label: "Infrastructure goals", name: "infrastructure_goals" },
          { label: "Fleet electrification plans", name: "fleet_electrification_plans" },
          { label: "Corridor concerns", name: "corridor_concerns" },
        ];
      case "OEM":
        return [
          { label: "EV programme focus", name: "ev_programme_focus" },
          { label: "Infrastructure concerns", name: "infrastructure_concerns" },
          { label: "Customer readiness needs", name: "customer_readiness_needs" },
          { label: "Market intelligence needs", name: "market_intelligence_needs" },
        ];
      case "Consultant":
        return [
          { label: "Client sector", name: "client_sector" },
          { label: "Project scope", name: "project_scope" },
          { label: "Data/intelligence needs", name: "data_intelligence_needs" },
          { label: "Timeline", name: "timeline_detail" },
        ];
      case "Investor / Research":
        return [
          { label: "Research focus", name: "research_focus" },
          { label: "Region of interest", name: "region_of_interest_detail" },
          { label: "Investment/intelligence needs", name: "investment_intelligence_needs" },
          { label: "Decision timeline", name: "decision_timeline" },
        ];
      default:
        return [
          { label: "Organisation focus", name: "organisation_focus" },
          { label: "Main challenge", name: "main_challenge" },
          { label: "Support required", name: "support_required" },
          { label: "Timeline", name: "timeline_detail" },
        ];
    }
  }, [organisationType]);

  if (!open) return null;

  function clearNotice() {
    setNotice(null);
  }

  function showNotice(type, title, message) {
    setNotice({ type, title, message });
  }

  function toggleItem(value, setter) {
    clearNotice();

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

  function getFormValue(formData, key) {
    return formData.get(key)?.toString().trim() || "";
  }

  function collectDynamicAnswers(formData) {
    return dynamicQuestions.reduce((answers, question) => {
      answers[question.label] = getFormValue(formData, question.name);
      return answers;
    }, {});
  }
async function createPendingEmailEvent({
  eventType,
  recipientEmail,
  recipientName,
  subject,
  relatedAccessRequestId = null,
  metadata = {},
}) {
  if (!supabase || !recipientEmail) return;

  await supabase.from("email_events").insert({
    event_type: eventType,
    recipient_email: recipientEmail,
    recipient_name: recipientName || "",
    subject,
    sender_email: "do-not-reply@iq4ev.co.za",
    status: "pending",
    related_access_request_id: relatedAccessRequestId,
    metadata: {
      support_email: "info@iq4ev.co.za",
      ...metadata,
    },
  });
}

  async function handleBriefingSubmit(event) {
    event.preventDefault();
    clearNotice();

    if (!supabase) {
      showNotice(
        "error",
        "Connection not available",
        "Supabase is not connected yet. Please check your .env.local values and restart the development server."
      );
      return;
    }

    if (selectedTopics.length === 0) {
      showNotice(
        "error",
        "Select at least one briefing topic",
        "Please select the briefing topics you are most interested in before continuing."
      );
      return;
    }

    const formData = new FormData(event.currentTarget);

    const fullName = getFormValue(formData, "fullName");
    const email = getFormValue(formData, "email").toLowerCase();
    const password = formData.get("password")?.toString() || "";
    const company = getFormValue(formData, "company");
    const position = getFormValue(formData, "position");

    if (!fullName || !email || !password || !company || !position) {
      showNotice(
        "error",
        "Complete the required fields",
        "Please complete your full name, email address, password, company and position before continuing."
      );
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
      showNotice("error", "Briefing access could not be created", error.message);
      return;
    }

    await createPendingEmailEvent({
  eventType: "subscription_confirmation",
  recipientEmail: email,
  recipientName: fullName,
  subject: "IQ4EV Enterprise Briefings subscription confirmation",
  metadata: {
    company,
    position,
    topics_of_interest: selectedTopics,
    subscription_url: `${window.location.origin}/subscribe`,
    briefings_url: `${window.location.origin}/briefings`,
  },
});

    showNotice(
      "success",
      "Briefing access account created",
      "Please confirm your email address, then continue to the subscription payment page. IQ4EV subscription communication will be sent from do-not-reply@iq4ev.co.za. If this request was not made by you, contact info@iq4ev.co.za."
    );
  }

  async function submitAccessRequest(event, requestType) {
    event.preventDefault();
    clearNotice();

    if (!supabase) {
      showNotice(
        "error",
        "Connection not available",
        "Supabase is not connected yet. Please check your .env.local values and restart the development server."
      );
      return;
    }

    const formData = new FormData(event.currentTarget);

    const fullName = getFormValue(formData, "fullName");
    const email = getFormValue(formData, "email").toLowerCase();
    const company = getFormValue(formData, "company");
    const position = getFormValue(formData, "position");
    const timeline = getFormValue(formData, "timeline");
    const region = getFormValue(formData, "region");
    const message = getFormValue(formData, "message");

    if (!fullName || !email || !company) {
      showNotice(
        "error",
        "Complete the required fields",
        "Please complete your name, work email and organisation before submitting."
      );
      return;
    }

    if (requestType === "consulting" && selectedConsultingAreas.length === 0) {
      showNotice(
        "error",
        "Select an area of support",
        "Please select at least one area where IQ4EV can support your organisation."
      );
      return;
    }

    if (
      ["general", "pulse360", "terrainintel", "evss"].includes(requestType) &&
      selectedPlatforms.length === 0
    ) {
      showNotice(
        "error",
        "Select an IQ4EV system",
        "Please select at least one IQ4EV platform, service or intelligence area before submitting."
      );
      return;
    }

    setSubmitting(true);

    const { data: savedRequest, error } = await supabase
  .from("access_requests")
  .insert({
    request_type: requestType,
    full_name: fullName,
    email,
    company,
    role: position,
    organisation_type: organisationType,
    area_of_support:
      requestType === "consulting"
        ? selectedConsultingAreas
        : selectedPlatforms,
    timeline,
    region_of_interest: region,
    message,
    source_page: copy.sourcePage,
    status: "new",
    metadata: {
      selected_platforms: selectedPlatforms,
      selected_consulting_areas: selectedConsultingAreas,
      dynamic_answers: collectDynamicAnswers(formData),
      default_request_type: defaultRequestType || copy.title,
    },
  })
  .select("id, request_type, full_name, email")
  .single();

    setSubmitting(false);

    if (error) {
      showNotice(
        "error",
        "Request could not be submitted",
        error.message.includes("access_requests")
          ? "The access request database table is not available yet. Create the access_requests table before testing this form."
          : error.message
      );
      return;
    }

    await createPendingEmailEvent({
  eventType:
    requestType === "consulting"
      ? "consultation_request_received"
      : "access_request_received",
  recipientEmail: email,
  recipientName: fullName,
  subject:
    requestType === "consulting"
      ? "IQ4EV consultation request received"
      : "IQ4EV access request received",
  relatedAccessRequestId: savedRequest?.id || null,
  metadata: {
    request_type: requestType,
    company,
    role: position,
    organisation_type: organisationType,
    area_of_support:
      requestType === "consulting"
        ? selectedConsultingAreas
        : selectedPlatforms,
    timeline,
    region_of_interest: region,
    source_page: copy.sourcePage,
    website_url: window.location.origin,
  },
});

    showNotice(
      "success",
      "Request submitted for review",
      "Thank you. IQ4EV has received your request. Further communication should be directed to info@iq4ev.co.za."
    );
  }

  const showGeneralProductForm = ["general", "pulse360", "terrainintel", "evss"].includes(
    activeMode
  );

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
          <p>{copy.eyebrow}</p>
          <h2>{defaultRequestType || copy.title}</h2>
          <span>{copy.description}</span>
        </div>

        {notice && (
          <div className={`access-message ${notice.type}`}>
            <strong>{notice.title}</strong>
            <p>{notice.message}</p>

            {notice.type === "success" && activeMode === "briefing" && (
              <button
                type="button"
                className="access-inline-action"
                onClick={() => {
                  window.location.href = "/subscribe";
                }}
              >
                Continue to subscription page
              </button>
            )}
          </div>
        )}

        {activeMode === "briefing" && (
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
              {submitting ? "Creating access..." : "Create account and continue"}
            </button>

            <small>
              Subscription-related communication is sent from
              do-not-reply@iq4ev.co.za. Questions, privacy concerns or incorrect
              subscription requests should be directed to info@iq4ev.co.za.
            </small>
          </form>
        )}

        {activeMode === "consulting" && (
          <form
            className="access-form"
            onSubmit={(event) => submitAccessRequest(event, "consulting")}
          >
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
                <input
                  type="text"
                  name="position"
                  placeholder="Your role"
                />
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
                    onClick={() => {
                      clearNotice();
                      setOrganisationType(type);
                    }}
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

            <button
              type="submit"
              className="access-submit"
              disabled={submitting}
            >
              {submitting ? "Submitting request..." : "Submit consultation request"}
            </button>

            <small>
              This is a consultation request, not a subscription payment flow.
              IQ4EV will review the request manually. Further communication
              should be directed to info@iq4ev.co.za.
            </small>
          </form>
        )}

        {showGeneralProductForm && (
          <>
            <div className="access-section">
              <h3>What best describes your organisation?</h3>

              <div className="access-card-grid">
                {ORG_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={organisationType === type ? "active" : ""}
                    onClick={() => {
                      clearNotice();
                      setOrganisationType(type);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="access-form"
              onSubmit={(event) => submitAccessRequest(event, copy.requestType)}
            >
              <div className="access-two-col">
                <label>
                  Name
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Your name"
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
                  Organisation
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
                    placeholder="Your role"
                  />
                </label>
              </div>

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
                  <label key={question.name}>
                    {question.label}
                    <input
                      type="text"
                      name={question.name}
                      placeholder={question.label}
                    />
                  </label>
                ))}
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
                  placeholder="Describe your infrastructure, fleet, charging, property, corridor, briefing or consulting requirement."
                />
              </label>

              <button
                type="submit"
                className="access-submit"
                disabled={submitting}
              >
                {submitting ? "Submitting request..." : "Submit for review"}
              </button>

              <small>
                Automated system communication should be sent from
                do-not-reply@iq4ev.co.za once backend email handling is
                connected. Further communication should be directed to
                info@iq4ev.co.za.
              </small>
            </form>
          </>
        )}
      </section>
    </div>
  );
}