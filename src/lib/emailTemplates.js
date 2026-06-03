const IQ4EV_SENDER = "do-not-reply@iq4ev.co.za";
const IQ4EV_SUPPORT = "info@iq4ev.co.za";
const IQ4EV_COMPANY = "IQ4EV";

// Put the logo file in: public/iq4ev-logo.png
// In production, email sending should replace this with:
// https://www.iq4ev.co.za/iq4ev-logo.png
const IQ4EV_LOGO_URL = "/iq4ev-logo.png";
const IQ4EV_FOOTER =
  "IQ4EV (Pty) Ltd · Strategic EV Data & Consulting · info@iq4ev.co.za";

const PRIVACY_DISCLAIMER =
  "This communication may contain information intended for the named recipient only. IQ4EV processes personal information for legitimate subscription, access, account, support and service communication purposes. If you received this message in error or did not initiate the related request, please contact info@iq4ev.co.za.";

function safe(value, fallback = "") {
  return value || fallback;
}

function getSupportFooter() {
  return {
    companyLine: IQ4EV_FOOTER,
    supportEmail: IQ4EV_SUPPORT,
    privacyDisclaimer: PRIVACY_DISCLAIMER,
  };
}

function buildTemplate({
  eventType,
  subject,
  preview,
  heading,
  body,
  ctaLabel = "",
  ctaUrl = "",
  recipientName = "",
}) {
  return {
  eventType,
  sender: IQ4EV_SENDER,
  supportEmail: IQ4EV_SUPPORT,
  company: IQ4EV_COMPANY,
  logoUrl: IQ4EV_LOGO_URL,
  recipientName,
  subject,
  preview,
  heading,
  body,
  ctaLabel,
  ctaUrl,
  ...getSupportFooter(),
};

}

export function getEmailTemplate(event = {}) {
  const metadata = event.metadata || {};
  const recipientName = safe(event.recipient_name, "IQ4EV subscriber");

  switch (event.event_type) {
    case "subscription_confirmation":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(
          event.subject,
          "IQ4EV Enterprise Briefings subscription confirmation"
        ),
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
        ctaLabel: safe(metadata.cta_label, "Continue to subscription"),
        ctaUrl: safe(metadata.subscription_url, "/subscribe"),
      });

    case "briefing_published":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(
          event.subject,
          `New IQ4EV briefing: ${safe(metadata.briefing_title, "Enterprise Briefing")}`
        ),
        preview: "We think this may spark your interest.",
        heading: safe(metadata.briefing_title, "New IQ4EV briefing published"),
        body: [
          `Dear ${recipientName},`,
          "A new IQ4EV Enterprise Briefing has been published.",
          "We think this may spark your interest based on your selected briefing interests and the strategic themes covered in this publication.",
          safe(
            metadata.briefing_excerpt,
            "The briefing is now available in the IQ4EV Enterprise Briefings library."
          ),
          "Use the link below to open the briefing directly.",
        ],
        ctaLabel: "Read briefing",
        ctaUrl: safe(metadata.briefing_url, "/briefings"),
      });

    case "subscription_cancelled":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(
          event.subject,
          "IQ4EV Enterprise Briefings subscription cancellation confirmed"
        ),
        preview: "Your IQ4EV Enterprise Briefings subscription has been cancelled.",
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
      });

    case "payment_not_received":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(
          event.subject,
          "IQ4EV Enterprise Briefings payment not received"
        ),
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
        ctaUrl: safe(metadata.renewal_url, "/subscribe"),
      });

    case "payment_success":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(
          event.subject,
          "IQ4EV Enterprise Briefings payment confirmed"
        ),
        preview: "Your IQ4EV Enterprise Briefings payment has been confirmed.",
        heading: "Payment confirmed.",
        body: [
          `Dear ${recipientName},`,
          "Your IQ4EV Enterprise Briefings subscription payment has been confirmed.",
          "Your subscriber access is active, and you may continue reading subscriber-only briefing content through your IQ4EV account.",
          "For account or subscription assistance, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "View briefings",
        ctaUrl: safe(metadata.briefings_url, "/briefings"),
      });

    case "payment_failed":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(
          event.subject,
          "IQ4EV Enterprise Briefings payment failed"
        ),
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
        ctaUrl: safe(metadata.renewal_url, "/subscribe"),
      });

    case "access_blocked_pending_payment":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(
          event.subject,
          "IQ4EV Enterprise Briefings access blocked pending payment"
        ),
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
        ctaUrl: safe(metadata.renewal_url, "/subscribe"),
      });

    case "access_request_received":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(event.subject, "IQ4EV access request received"),
        preview: "Your IQ4EV access request has been received.",
        heading: "Access request received.",
        body: [
          `Dear ${recipientName},`,
          "IQ4EV has received your access request.",
          "Access to IQ4EV systems and intelligence services is consultation-led. Your request will be reviewed manually before any further onboarding steps are confirmed.",
          "For any additional information or corrections, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "Visit IQ4EV",
        ctaUrl: safe(metadata.website_url, "/"),
      });

    case "consultation_request_received":
      return buildTemplate({
        eventType: event.event_type,
        recipientName,
        subject: safe(event.subject, "IQ4EV consultation request received"),
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
      });

    default:
      return buildTemplate({
        eventType: safe(event.event_type, "unknown"),
        recipientName,
        subject: safe(event.subject, "IQ4EV communication"),
        preview: "IQ4EV system communication.",
        heading: "IQ4EV communication.",
        body: [
          `Dear ${recipientName},`,
          "This is an IQ4EV system communication related to your account, subscription, access request or service interaction.",
          "For further assistance, contact info@iq4ev.co.za.",
        ],
        ctaLabel: "",
        ctaUrl: "",
      });
  }
}

export function getEmailBodyText(template) {
  return [
    template.heading,
    "",
    ...(template.body || []),
    "",
    template.ctaLabel && template.ctaUrl
      ? `${template.ctaLabel}: ${template.ctaUrl}`
      : "",
    "",
    template.companyLine,
    "",
    template.privacyDisclaimer,
  ]
    .filter(Boolean)
    .join("\n");
}

export function getEmailBodyHtml(template) {
  const paragraphs = (template.body || [])
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  const cta =
    template.ctaLabel && template.ctaUrl
      ? `<p><a href="${template.ctaUrl}" style="display:inline-block;padding:12px 18px;border-radius:999px;background:#ff6a2a;color:#ffffff;text-decoration:none;font-weight:700;">${template.ctaLabel}</a></p>`
      : "";

  return `
    <div style="font-family:Arial, sans-serif; color:#141824; line-height:1.55; max-width:680px; margin:0 auto; padding:24px;">
      <div style="border-bottom:1px solid #eee; padding-bottom:16px; margin-bottom:22px;">
         <img
          src="${template.logoUrl}"
          alt="IQ4EV"
         style="display:block; width:120px; max-width:120px; height:auto; margin:0 0 10px;"
      />
      <div style="font-size:12px; color:#666;">Strategic EV Data & Consulting</div>
    </div>

      <h1 style="font-size:24px; line-height:1.25; margin:0 0 16px;">${template.heading}</h1>

      ${paragraphs}

      ${cta}

      <div style="border-top:1px solid #eee; margin-top:26px; padding-top:16px; font-size:12px; color:#666;">
        <p>${template.companyLine}</p>
        <p>${template.privacyDisclaimer}</p>
      </div>
    </div>
  `;
}