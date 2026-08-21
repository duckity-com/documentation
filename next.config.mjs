import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  serverExternalPackages: ["@takumi-rs/core", "typescript", "twoslash"],
  output: "export",
  reactStrictMode: true,
  allowedDevOrigins: ["duckity.com", "duckity.dev"],
  basePath: "/docs",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default withMDX(config);
