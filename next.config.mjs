/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bing.com",
      },
      {
        protocol: "https",
        hostname: "tse2.mm.bing.net",
      },
    ],
  },
};

export default nextConfig;
