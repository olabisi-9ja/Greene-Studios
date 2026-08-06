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
};

export default nextConfig;
