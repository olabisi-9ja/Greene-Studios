/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
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
      { source: '/journal/typography-that-converts', destination: '/journal', permanent: true },
      { source: '/journal/the-\$0-seo-strategy', destination: '/journal', permanent: true },
      { source: '/services/frontend-dev', destination: '/services/frontend-development', permanent: true },
    ];
  },
};

export default nextConfig;
