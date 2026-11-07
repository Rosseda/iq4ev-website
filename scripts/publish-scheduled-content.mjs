import { getScheduledDate } from "../src/lib/contentHelpers.js";

const projectUrl = new URL(process.env.SUPABASE_URL || "");
const key = process.env.SUPABASE_PUBLISHING_KEY;
if (projectUrl.protocol !== "https:" || projectUrl.username || projectUrl.password || !key) {
  throw new Error("Configure the HTTPS Supabase project URL and server-only publishing key.");
}

const auditOnly = process.env.AUDIT_ONLY === "true";
const cutoff = new Date().toISOString();
const headers = {
  apikey: key,
  ...(key.startsWith("sb_secret_") ? {} : { Authorization: `Bearer ${key}` }),
};

async function contentRequest(params, options = {}) {
  const url = new URL("/rest/v1/content_items", projectUrl);
  url.search = new URLSearchParams(params);
  const response = await fetch(url, {
    ...options,
    headers: { ...headers, ...options.headers },
    redirect: "error",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`Content request failed (HTTP ${response.status}).`);
  return response.json();
}

let lastId;
let inspected = 0;
let released = 0;
let skipped = 0;
let failed = 0;

while (true) {
  const drafts = await contentRequest({
    select: "id,status,content_type,published_at",
    status: "eq.draft",
    content_type: "in.(insight,briefing)",
    published_at: auditOnly ? "not.is.null" : `lte.${cutoff}`,
    order: "id.asc",
    limit: 50,
    ...(lastId ? { id: `gt.${lastId}` } : {}),
  });
  if (drafts.length === 0) break;
  lastId = drafts.at(-1).id;
  inspected += drafts.length;
  if (auditOnly) continue;

  for (const item of drafts) {
    const scheduledDate = getScheduledDate(item);
    if (!scheduledDate) {
      skipped++;
      continue;
    }

    try {
      const updated = await contentRequest(
        {
          id: `eq.${item.id}`,
          status: "eq.draft",
          content_type: `eq.${item.content_type}`,
          published_at: `eq.${item.published_at}`,
          select: "id,published_at",
        },
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Prefer: "return=representation" },
          body: JSON.stringify({ status: "published", published_at: new Date().toISOString() }),
        }
      );

      if (updated.length === 1) {
        released++;
        console.log(`Released ${item.content_type} ${item.id} scheduled for ${scheduledDate} SAST at ${updated[0].published_at}.`);
      } else {
        skipped++;
      }
    } catch (error) {
      failed++;
      console.error(`Release of ${item.id} failed: ${error.message}`);
    }
  }
}

if (auditOnly) {
  console.log(`Found ${inspected} dated draft(s). The expected count before enabling is zero.`);
  if (inspected) process.exitCode = 1;
} else {
  console.log(`Checked ${inspected}, released ${released}, skipped ${skipped}, failed ${failed}.`);
  if (failed) process.exitCode = 1;
}
