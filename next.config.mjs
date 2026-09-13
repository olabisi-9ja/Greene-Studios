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
      { source: '/services/frontend-dev', destination: '/services/frontend-development', permanent: true },
    ];
  },
};

export default nextConfig;
