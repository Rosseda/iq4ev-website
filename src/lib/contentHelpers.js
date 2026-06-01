export const CONTENT_TYPES = [
  { value: "insight", label: "Public Insight" },
  { value: "briefing", label: "Enterprise Briefing" },
];

export const ACCESS_LEVELS = [
  { value: "public", label: "Public" },
  { value: "subscriber", label: "Subscriber only" },
];

export const CONTENT_STATUSES = [
  { value: "draft", label: "Draft" },
  { value: "published", label: "Published" },
  { value: "archived", label: "Archived" },
];

export const BRIEFING_SERIES = [
  "Corridor Watch",
  "Infrastructure Economics Watch",
  "Fleet Transition Watch",
  "Municipal Readiness Watch",
  "Property Strategy Watch",
  "Grid Exposure Watch",
  "Policy & Regulatory Watch",
  "Charging Behaviour Watch",
];

export function createSlug(value) {
  return value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function formatContentDate(value) {
  if (!value) return "Not published";

  return new Intl.DateTimeFormat("en-ZA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}