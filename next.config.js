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
      "img.icons8.com",
      "firebasestorage.googleapis.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
