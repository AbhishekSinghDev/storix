import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@storix/validators", "@storix/aws-s3"],
};

export default nextConfig;
