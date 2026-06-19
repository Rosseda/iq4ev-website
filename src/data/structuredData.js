const SITE_URL = "https://www.iq4ev.co.za";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "IQ4EV",
  legalName: "IQ4EV (Pty) Ltd",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  email: "info@iq4ev.co.za",
  description:
    "IQ4EV is a South African EV intelligence and infrastructure strategy company providing charger reliability analysis, EV infrastructure intelligence, fleet transition modelling, strategic briefings, and consulting.",
  slogan: "Strategic EV Data & Consulting",
  foundingLocation: {
    "@type": "Place",
    name: "Johannesburg, Gauteng, South Africa",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  knowsAbout: [
    "Electric vehicle infrastructure",
    "EV charging reliability",
    "OCPP charger data",
    "EV fleet transition",
    "EV corridor planning",
    "Charging station risk analysis",
    "EV infrastructure strategy",
    "South African electric mobility",
  ],
  sameAs: [
    "https://www.linkedin.com/company/iq4ev"
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "IQ4EV",
  url: SITE_URL,
  description:
    "South African EV intelligence, infrastructure strategy, charger reliability analysis, fleet transition modelling, and EV market briefings.",
  publisher: {
    "@type": "Organization",
    name: "IQ4EV",
    url: SITE_URL,
  },
};

export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "IQ4EV",
  url: SITE_URL,
  image: `${SITE_URL}/iq4ev-og-image.png`,
  logo: `${SITE_URL}/logo.png`,
  email: "info@iq4ev.co.za",
  description:
    "IQ4EV provides EV infrastructure strategy, charging reliability intelligence, fleet transition analysis, EV data consulting, spatial deployment intelligence, and strategic EV sector briefings in South Africa.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Johannesburg",
    addressRegion: "Gauteng",
    addressCountry: "ZA",
  },
  areaServed: {
    "@type": "Country",
    name: "South Africa",
  },
  serviceType: [
    "EV infrastructure consulting",
    "EV charging data analysis",
    "Fleet electrification readiness",
    "EV market intelligence",
    "Charger reliability analysis",
    "EV corridor planning",
    "Strategic EV briefings",
  ],
};

export const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is IQ4EV?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "IQ4EV is a South African EV intelligence and infrastructure strategy company. It helps organisations understand EV charging reliability, infrastructure readiness, fleet electrification risk, corridor opportunity, and EV market transition strategy.",
      },
    },
    {
      "@type": "Question",
      name: "What does IQ4EV do?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "IQ4EV provides EV data analysis, charging infrastructure intelligence, fleet transition modelling, strategic EV briefings, charger reliability analysis, and consulting for OEMs, fleet operators, property groups, municipalities, charge point stakeholders, and infrastructure investors.",
      },
    },
    {
      "@type": "Question",
      name: "What is Pulse360?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Pulse360 is IQ4EV’s charger and property intelligence system. It analyses EV charging station reliability, OCPP charger data, site-level risk, property context, charger performance, and operational signals.",
      },
    },
    {
      "@type": "Question",
      name: "What is TerrainIntel?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "TerrainIntel is IQ4EV’s spatial EV infrastructure intelligence service. It supports corridor planning, charging deployment strategy, location readiness, grid exposure assessment, and regional EV infrastructure analysis.",
      },
    },
    {
      "@type": "Question",
      name: "What is EVSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EVSS is IQ4EV’s EV fleet simulation and operational readiness service. It helps organisations test fleet electrification assumptions before major procurement, infrastructure, or operational decisions are made.",
      },
    },
    {
      "@type": "Question",
      name: "Who does IQ4EV support?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "IQ4EV supports OEMs, fleet operators, charge point operators, property groups, municipalities, infrastructure stakeholders, investors, and organisations preparing for South Africa’s electric vehicle transition.",
      },
    },
  ],
};

export const pulse360FaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Pulse360?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Pulse360 is IQ4EV’s charger and property intelligence system for analysing EV charging station reliability, OCPP data, property information, site risk, charger status, and operational performance.",
      },
    },
    {
      "@type": "Question",
      name: "What data can Pulse360 analyse?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Pulse360 can support analysis of charger performance signals, OCPP messages, charging station metadata, property context, manually added site notes, geolocation markers, risk indicators, and operational trends.",
      },
    },
    {
      "@type": "Question",
      name: "Who is Pulse360 for?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Pulse360 is designed for charge point operators, OEMs, property groups, infrastructure stakeholders, fleet operators, and organisations that need better visibility into charging station reliability and site-level risk.",
      },
    },
  ],
};

export const terrainIntelFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TerrainIntel?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "TerrainIntel is IQ4EV’s spatial EV infrastructure intelligence service for assessing corridor readiness, deployment opportunity, municipal readiness, infrastructure gaps, location risk, and grid exposure.",
      },
    },
    {
      "@type": "Question",
      name: "Does TerrainIntel give clients dashboard access?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "TerrainIntel is delivered as a managed intelligence and advisory service. Clients receive analysis, reports, visuals, recommendations, and strategic outputs rather than default access to IQ4EV’s internal models or dashboard environment.",
      },
    },
    {
      "@type": "Question",
      name: "Who can use TerrainIntel?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "TerrainIntel supports organisations planning EV charging deployments, corridor coverage, property expansion, municipal readiness studies, infrastructure investment, or location-based EV strategy.",
      },
    },
  ],
};

export const evssFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is EVSS?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EVSS is IQ4EV’s EV fleet simulation and operational readiness service. It helps organisations assess whether electric vehicles can meet route, charging, energy, downtime, and operational requirements before major transition decisions are made.",
      },
    },
    {
      "@type": "Question",
      name: "Does EVSS give clients dashboard access?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EVSS is delivered as a managed simulation and advisory engagement. IQ4EV operates the internal model and clients receive reports, visuals, consultations, recommendations, and strategic outputs rather than default access to the underlying model.",
      },
    },
    {
      "@type": "Question",
      name: "Who is EVSS for?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "EVSS is for fleet operators, logistics companies, municipalities, property-linked fleets, corporate mobility teams, and organisations preparing for electric fleet adoption.",
      },
    },
  ],
};

export const briefingsFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What are IQ4EV Briefings?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "IQ4EV Briefings are executive-grade EV sector intelligence publications covering charging reliability, infrastructure economics, fleet transition, corridor readiness, policy, grid exposure, and market risk.",
      },
    },
    {
      "@type": "Question",
      name: "Who are IQ4EV Briefings for?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "IQ4EV Briefings are for decision-makers, operators, investors, policy observers, fleet leaders, OEM teams, and EV sector stakeholders who need structured intelligence rather than general EV news.",
      },
    },
    {
      "@type": "Question",
      name: "Are IQ4EV Briefings the same as a newsletter?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. IQ4EV Briefings are designed as strategic intelligence products. They focus on interpretation, risk, scenarios, implications, and decision-useful insight rather than general newsletter updates.",
      },
    },
  ],
};