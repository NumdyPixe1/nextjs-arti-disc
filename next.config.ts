import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['@xenova/transformers'],
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zfcjarjlreqtvbtwzzyp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },

    ],
  },

};

export default nextConfig;
