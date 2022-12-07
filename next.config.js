/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (cfg) => {
    // cfg.module.rules.push({
    //   test: /\.md$/,
    //   loader: "frontmatter-markdown-loader",
    //   options: {
    //     mode: ["body"],
    //   },
    // });
    return cfg;
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
