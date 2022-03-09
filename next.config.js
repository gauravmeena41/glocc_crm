/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.dicebear.com",
      "images.unsplash.com",
      "64.media.tumblr.com",
      "cdn.pixabay.com",
    ],
  },
};

module.exports = nextConfig;
