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
      }

    ],
  },

};

export default nextConfig;
