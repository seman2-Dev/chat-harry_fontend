// Image URL safety for next/image. The optimizer fetches remote srcs
// server-side; localhost/private targets are an SSRF risk and must never be
// allowed on a deployed site (relative /images/… paths stay fine).

const DEFAULT_STUDIO_IMAGE = "/images/studios/product-studio.jpg";

function isLocalHostname(host) {
  if (!host) return true;
  if (host === "localhost" || host.endsWith(".localhost")) return true;
  if (host === "0.0.0.0" || host === "::1" || host === "[::1]") return true;
  if (/^127\./.test(host)) return true;
  if (/^10\./.test(host)) return true;
  if (/^192\.168\./.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(host)) return true;
  if (/^169\.254\./.test(host)) return true;
  return false;
}

export function isSafeImageSrc(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith("data:image/")) return true;
  // Same-origin path only — protocol-relative "//host" is not a path.
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;
    return !isLocalHostname(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function safeImageSrc(url, fallback = DEFAULT_STUDIO_IMAGE) {
  return isSafeImageSrc(url) ? url.trim() : fallback;
}

export function safeOptionalImageSrc(url) {
  return isSafeImageSrc(url) ? url.trim() : null;
}

export { DEFAULT_STUDIO_IMAGE };
