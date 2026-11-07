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

const sastDate = new Intl.DateTimeFormat("en-ZA", {
  timeZone: "Africa/Johannesburg",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export function getSastDate(date) {
  const parts = Object.fromEntries(
    sastDate.formatToParts(date).map(({ type, value }) => [type, value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function toScheduledTimestamp(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;

  const date = new Date(`${value}T00:00:00+02:00`);
  return Number.isFinite(date.getTime()) && getSastDate(date) === value
    ? date.toISOString()
    : null;
}

// A draft scheduled by the editor carries midnight SAST in published_at.
export function getScheduledDate(item) {
  if (item?.status !== "draft" || !item.published_at) return "";

  const timestamp = new Date(item.published_at);
  if (!Number.isFinite(timestamp.getTime())) return "";

  const date = getSastDate(timestamp);
  return toScheduledTimestamp(date) === timestamp.toISOString() ? date : "";
}
