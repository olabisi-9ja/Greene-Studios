import { NextResponse, type NextRequest } from "next/server";

/**
 * Serves each concept brand from its own subdomain out of this one app.
 *
 *   luminary.greenestudios.co/pricing  →  /demo/luminary/pricing
 *
 * Everything stays reachable at /demo/<slug> as well, so local development
 * and preview deployments need no DNS at all. Production needs a wildcard
 * domain (*.greenestudios.co) added once in the Vercel dashboard — see
 * README, "Concept site subdomains".
 */
const BRAND_SUBDOMAINS = new Set(["luminary", "vera", "arc", "bloom", "onyx", "prism"]);

/** Hosts that are the Greene site itself, never a brand. */
const RESERVED = new Set(["www", "greenestudios", "greene-studios", "localhost"]);

function brandFromHost(host: string): string | null {
  // Strip port, lowercase.
  const hostname = host.split(":")[0].toLowerCase();
  const parts = hostname.split(".");
  // Need at least sub.domain.tld — a bare apex has nothing to match.
  if (parts.length < 3) return null;
  const sub = parts[0];
  if (RESERVED.has(sub)) return null;
  return BRAND_SUBDOMAINS.has(sub) ? sub : null;
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const brand = brandFromHost(host);
  if (!brand) return NextResponse.next();

  const url = request.nextUrl.clone();
  // Already rewritten (or someone hit the canonical path on a subdomain).
  if (url.pathname.startsWith("/demo/")) return NextResponse.next();

  url.pathname = `/demo/${brand}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, the API, and anything with a file extension.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
