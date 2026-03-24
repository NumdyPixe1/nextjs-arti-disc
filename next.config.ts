import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'antique.finearts.go.th',
      //   pathname: '/**',
      // },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.finearts.go.th'
      }, {
        protocol: 'https',
        hostname: 'seaarts.sac.or.th'
      }, {
        protocol: 'https',
        hostname: 'zfcjarjlreqtvbtwzzyp.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      }

    ],
  },

};

export default nextConfig;
