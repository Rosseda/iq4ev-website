function looksLikeHtml(value) {
  return /<\/?[a-z][\s\S]*>/i.test(value || "");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function plainTextToHtml(value) {
  if (!value?.trim()) return "";

  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function sanitizeHtml(html) {
  if (typeof window === "undefined" || !html) return "";

  const allowedTags = new Set([
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "blockquote",
    "hr",
  ]);

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  function cleanNode(node) {
    [...node.children].forEach((child) => {
      const tag = child.tagName.toLowerCase();

      if (!allowedTags.has(tag)) {
        child.replaceWith(...child.childNodes);
        return;
      }

      [...child.attributes].forEach((attribute) => {
        child.removeAttribute(attribute.name);
      });

      cleanNode(child);
    });
  }

  cleanNode(doc.body);

  return doc.body.innerHTML;
}

export function RichTextBody({ html, className = "" }) {
  const normalizedHtml = looksLikeHtml(html) ? html : plainTextToHtml(html);
  const safeHtml = sanitizeHtml(normalizedHtml);

  if (!safeHtml) return null;

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}