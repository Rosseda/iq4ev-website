import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const SMTP_HOST = process.env.SMTP_HOST || "mail.iq4ev.co.za";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_SECURE = process.env.SMTP_SECURE === "true";
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const EMAIL_FROM = process.env.EMAIL_FROM || "IQ4EV <do-not-reply@iq4ev.co.za>";
const EMAIL_LOGO_URL =
  process.env.EMAIL_LOGO_URL || "https://www.iq4ev.co.za/iq4ev-logo.png";

const SUPPORT_EMAIL = "info@iq4ev.co.za";

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getTemplate(event) {
  const metadata = event.metadata || {};
  const recipientName = event.recipient_name || "IQ4EV subscriber";

  const footer =
    "IQ4EV (Pty) Ltd · Strategic EV Data & Consulting · info@iq4ev.co.za";

  const privacyDisclaimer =
    "This communication may contain information intended for the named recipient only. IQ4EV processes personal information for legitimate subscription, access, account, support and service communication purposes. If you received this message in error or did not initiate the related request, please contact info@iq4ev.co.za.";

  const base = {
    sender: EMAIL_FROM,
    supportEmail: SUPPORT_EMAIL,
    logoUrl: EMAIL_LOGO_URL,
    footer,
    privacyDisclaimer,
  };

  switch (event.event_type) {
    case "subscription_confirmation":
      return {
        ...base,
        subject:
          event.subject ||
          "IQ4EV Enterprise Briefings subscription confirmation",
        preview:
          "Your IQ4EV Enterprise Briefings access request has been received.",
        heading: "Welcome to IQ4EV Enterprise Briefings.",
        body: [
          `Dear ${recipientName},`,
          "Thank you for requesting access to IQ4EV Enterprise Briefings.",
          "Your briefing access account has been created. Once email confirmation and subscription payment steps are complete, your account will be eligible for subscriber-only briefing access.",
          "IQ4EV Enterprise Briefings are designed to support clearer decision-making across EV infrastructure, fleet transition, charging behaviour, policy, grid exposure and market-readiness themes.",
          "If this request was not made by you, please contact info@iq4ev.co.za so that the matter can be reviewed.",
        ],
        ctaLabel: "Continue to subscription",
        ctaUrl: metadata.subscription_url || "https://www.iq4ev.co.za/subscribe",
      };

    case "briefing_published":
      return {
        ...base,
        subject:
          event.subject ||
          `New IQ4EV briefing: ${
            metadata.briefing_title || "Enterprise Briefing"
          }`,
        preview: "We think this may spark your interest.",
        heading: metadata.briefing_title || "New IQ4EV briefing published",
        body: [
          `Dear ${recipientName},`,
          "A new IQ4EV Enterprise Briefing has been published.",
          "We think this may spark your interest based on your selected briefing interests and the strategic themes covered in this publication.",
          metadata.briefing_excerpt ||
            "The briefing is now available in the IQ4EV Enterprise Briefings library.",
          "Use the link below to open the briefing directly.",
        ],
        ctaLabel: "Read briefing",
        ctaUrl: metadata.briefing_url || "https://www.iq4ev.co.za/briefings",
      };

    case "subscription_cancelled":
      return {
        ...base,
        subject:
          event.subject ||
          "IQ4EV Enterprise Briefings subscription cancellation confirmed",
        preview:
          "Your IQ4EV Enterprise Briefings subscription has been cancelled.",
        heading: "Subscription cancellation confirmed.",
        body: [
          `Dear ${recipientName},`,
          "This confirms that your IQ4EV Enterprise Briefings subscription has been cancelled.",
          "Thank you for choosing IQ4EV.",
          "If you cancelled because you were dissatisfied with the briefing content, you are welcome to share your feedback with us at info@iq4ev.co.za. Your input helps IQ4EV improve the quality and relevance of its intelligence products.",
          "Subscriber-only briefing access will no longer be available once cancellation takes effect.",
        ],
        ctaLabel: "Contact IQ4EV",
        ctaUrl: "mailto:info@iq4ev.co.za",
      };

    case "payment_not_received":
      return {
        ...base,
        subject:
          event.subject || "IQ4EV Enterprise Briefings payment not received",
        preview:
          "Payment has not been received. Briefing access may be blocked pending payment.",
        heading: "Subscription payment not received.",
        body: [
          `Dear ${recipientName},`,
          "IQ4EV has not received the required subscription payment for your Enterprise Briefings access.",
          "Access to subscriber-only briefing content will be blocked or remain blocked pending payment confirmation.",
          "Please use the renewal link below to restore or continue your subscription access.",
          "If you believe this notice was sent in error, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "Renew subscription",
        ctaUrl: metadata.renewal_url || "https://www.iq4ev.co.za/subscribe",
      };

    case "payment_success":
      return {
        ...base,
        subject:
          event.subject || "IQ4EV Enterprise Briefings payment confirmed",
        preview: "Your IQ4EV Enterprise Briefings payment has been confirmed.",
        heading: "Payment confirmed.",
        body: [
          `Dear ${recipientName},`,
          "Your IQ4EV Enterprise Briefings subscription payment has been confirmed.",
          "Your subscriber access is active, and you may continue reading subscriber-only briefing content through your IQ4EV account.",
          "For account or subscription assistance, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "View briefings",
        ctaUrl: metadata.briefings_url || "https://www.iq4ev.co.za/briefings",
      };

    case "payment_failed":
      return {
        ...base,
        subject: event.subject || "IQ4EV Enterprise Briefings payment failed",
        preview:
          "Your subscription payment could not be completed. Access may be affected.",
        heading: "Subscription payment failed.",
        body: [
          `Dear ${recipientName},`,
          "Your IQ4EV Enterprise Briefings subscription payment could not be completed.",
          "If payment is not completed, access to subscriber-only briefing content may be blocked pending payment.",
          "Please use the payment link below to retry or renew your subscription.",
          "For support, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "Retry payment",
        ctaUrl: metadata.renewal_url || "https://www.iq4ev.co.za/subscribe",
      };

    case "access_blocked_pending_payment":
      return {
        ...base,
        subject:
          event.subject ||
          "IQ4EV Enterprise Briefings access blocked pending payment",
        preview:
          "Briefing access has been blocked pending subscription payment.",
        heading: "Access blocked pending payment.",
        body: [
          `Dear ${recipientName},`,
          "Your IQ4EV Enterprise Briefings access has been blocked because subscription payment has not been received.",
          "Access can be restored once payment is confirmed.",
          "Please use the renewal link below to continue your subscription.",
          "If you believe this is incorrect, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "Renew subscription",
        ctaUrl: metadata.renewal_url || "https://www.iq4ev.co.za/subscribe",
      };

    case "access_request_received":
      return {
        ...base,
        subject: event.subject || "IQ4EV access request received",
        preview: "Your IQ4EV access request has been received.",
        heading: "Access request received.",
        body: [
          `Dear ${recipientName},`,
          "IQ4EV has received your access request.",
          "Access to IQ4EV systems and intelligence services is consultation-led. Your request will be reviewed manually before any further onboarding steps are confirmed.",
          "For any additional information or corrections, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "Visit IQ4EV",
        ctaUrl: metadata.website_url || "https://www.iq4ev.co.za",
      };

    case "consultation_request_received":
      return {
        ...base,
        subject: event.subject || "IQ4EV consultation request received",
        preview: "Your IQ4EV consultation request has been received.",
        heading: "Consultation request received.",
        body: [
          `Dear ${recipientName},`,
          "IQ4EV has received your consultation request.",
          "Your request will be reviewed manually so that IQ4EV can better understand the infrastructure, fleet, property, corridor, charging or strategic support requirement involved.",
          "If you need to add context to your request, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "Contact IQ4EV",
        ctaUrl: "mailto:info@iq4ev.co.za",
      };

    default:
      return {
        ...base,
        subject: event.subject || "IQ4EV communication",
        preview: "IQ4EV system communication.",
        heading: "IQ4EV communication.",
        body: [
          `Dear ${recipientName},`,
          "This is an IQ4EV system communication related to your account, subscription, access request or service interaction.",
          "For further assistance, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "",
        ctaUrl: "",
      };
  }
}

function buildHtml(template) {
  const paragraphs = template.body
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");

  const cta =
    template.ctaLabel && template.ctaUrl
      ? `
        <p style="margin:26px 0;">
          <a href="${escapeHtml(template.ctaUrl)}"
             style="display:inline-block;padding:12px 18px;border-radius:999px;background:#ff6a2a;color:#ffffff;text-decoration:none;font-weight:700;">
            ${escapeHtml(template.ctaLabel)}
          </a>
        </p>
      `
      : "";

  return `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f6f7fb;">
        <div style="font-family:Arial,sans-serif;color:#141824;line-height:1.55;max-width:680px;margin:0 auto;padding:28px 18px;">
          <div style="background:#ffffff;border-radius:22px;padding:28px;border:1px solid #eceef3;">
            <div style="border-bottom:1px solid #eee;padding-bottom:16px;margin-bottom:22px;">
              <img src="${escapeHtml(template.logoUrl)}"
                   alt="IQ4EV"
                   style="display:block;width:120px;max-width:120px;height:auto;margin:0 0 10px;" />
              <div style="font-size:12px;color:#666;">Strategic EV Data & Consulting</div>
            </div>

            <p style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">
              ${escapeHtml(template.preview)}
            </p>

            <h1 style="font-size:24px;line-height:1.25;margin:0 0 16px;">
              ${escapeHtml(template.heading)}
            </h1>

            <div style="font-size:14px;color:#333;">
              ${paragraphs}
            </div>

            ${cta}

            <div style="border-top:1px solid #eee;margin-top:26px;padding-top:16px;font-size:12px;color:#666;">
              <p>${escapeHtml(template.footer)}</p>
              <p>${escapeHtml(template.privacyDisclaimer)}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function buildText(template) {
  return [
    template.heading,
    "",
    ...template.body,
    "",
    template.ctaLabel && template.ctaUrl
      ? `${template.ctaLabel}: ${template.ctaUrl}`
      : "",
    "",
    template.footer,
    "",
    template.privacyDisclaimer,
  ]
    .filter(Boolean)
    .join("\n");
}

async function sendEmail({ to, subject, html, text }) {
  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "SMTP_USER or SMTP_PASS is not configured in Vercel environment variables."
    );
  }

  await transporter.sendMail({
    from: EMAIL_FROM,
    to,
    subject,
    html,
    text,
  });
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = request.headers.authorization || "";
  const expectedToken = process.env.EMAIL_JOB_SECRET;

  if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
    return response.status(401).json({ error: "Unauthorised" });
  }

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return response.status(500).json({
      error:
        "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not configured in Vercel.",
    });
  }

  try {
    const { data: events, error } = await supabaseAdmin
      .from("email_events")
      .select("*")
      .eq("status", "pending")
      .order("created_at", { ascending: true })
      .limit(25);

    if (error) {
      throw error;
    }

    const results = [];

    for (const event of events || []) {
      const template = getTemplate(event);
      const html = buildHtml(template);
      const text = buildText(template);

      try {
        await sendEmail({
          to: event.recipient_email,
          subject: template.subject,
          html,
          text,
        });

        await supabaseAdmin
          .from("email_events")
          .update({
            status: "sent",
            sent_at: new Date().toISOString(),
            error_message: null,
          })
          .eq("id", event.id);

        results.push({
          id: event.id,
          recipient: event.recipient_email,
          status: "sent",
        });
      } catch (sendError) {
        await supabaseAdmin
          .from("email_events")
          .update({
            status: "failed",
            error_message:
              sendError?.message || "Email sending failed unexpectedly.",
          })
          .eq("id", event.id);

        results.push({
          id: event.id,
          recipient: event.recipient_email,
          status: "failed",
          error: sendError?.message || "Unknown error",
        });
      }
    }

    return response.status(200).json({
      processed: results.length,
      results,
    });
  } catch (error) {
    return response.status(500).json({
      error: error.message || "Email job failed.",
    });
  }
}