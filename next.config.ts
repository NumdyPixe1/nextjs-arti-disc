import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  serverExternalPackages: ['@xenova/transformers'],

  // ถ้ายังติดเรื่อง ONNX ให้เพิ่ม Webpack config นิดหน่อย
  experimental: {
  },
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

}
  ;

export default nextConfig;
