/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.dicebear.com",
      "images.unsplash.com",
      "64.media.tumblr.com",
      "cdn.pixabay.com",
      "openweathermap.org",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
