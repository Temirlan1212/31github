/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")("./i18n.ts");

const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
};

module.exports = withNextIntl(nextConfig);
