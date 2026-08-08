/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve remote images directly instead of proxying through Next's
    // optimizer (sandbox network can't reach the image CDN at build/dev time;
    // the visitor's browser loads them without issue).
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    // Capability aliases → existing service pages. Config-level redirects emit
    // a proper Location header in production (page-level redirect() in a
    // statically generated route returned a 307 with no Location, breaking
    // navigation on deployed builds).
    return [
      { source: '/services/brand', destination: '/services/branding', permanent: false },
      { source: '/services/digital', destination: '/services/web-design', permanent: false },
      { source: '/services/product', destination: '/services/ui-ux-design', permanent: false },
      { source: '/services/code', destination: '/services/frontend-development', permanent: false },
      { source: '/services/motion', destination: '/services/motion-design', permanent: false },
    ];
  },
};

export default nextConfig;
