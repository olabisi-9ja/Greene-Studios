import { fileURLToPath } from 'node:url';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // this folder is the project root (there are other lockfiles further up)
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    const csp = [
      "default-src 'self'",
      // Next's inline bootstrap and the JSON-LD blocks need inline scripts; no eval anywhere
      "script-src 'self' 'unsafe-inline'" + (process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''),
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      // exchange rates for prices in the visitor's currency
      "connect-src 'self' https://open.er-api.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self' mailto:",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ');
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/services/brand', destination: '/services/branding', permanent: false },
      { source: '/services/digital', destination: '/services/web-design', permanent: false },
      { source: '/services/product', destination: '/services/ui-ux-design', permanent: false },
      { source: '/services/code', destination: '/services/frontend-development', permanent: false },
      { source: '/services/motion', destination: '/services/motion-design', permanent: false },
      // Studio is now canonical at /studio; keep /about for backwards links
      { source: '/about', destination: '/studio', permanent: true },
      { source: '/services/ui-ux', destination: '/services/ui-ux-design', permanent: true },
      // pages retired in the 2026 redesign
      { source: '/process', destination: '/studio', permanent: true },
      { source: '/industries/:path*', destination: '/services', permanent: true },
      { source: '/industries', destination: '/services', permanent: true },
      { source: '/careers', destination: '/team', permanent: true },
      { source: '/lab', destination: '/work', permanent: true },
      { source: '/experiments', destination: '/work', permanent: true },
      { source: '/creator', destination: '/', permanent: true },
      { source: '/resources', destination: '/journal', permanent: true },
      { source: '/demo/:path*', destination: '/work', permanent: true },
      { source: '/demo', destination: '/work', permanent: true },
      { source: '/work/archive', destination: '/work', permanent: true },
      { source: '/journal/typography-that-converts', destination: '/journal', permanent: true },
      { source: '/journal/freelance-to-studio', destination: '/journal/building-greene-studios', permanent: true },
      { source: '/journal/the-\$0-seo-strategy', destination: '/journal', permanent: true },
      { source: '/services/frontend-dev', destination: '/services/frontend-development', permanent: true },
    ];
  },
};

export default nextConfig;
