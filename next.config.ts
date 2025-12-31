import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 파일 업로드 제한을 10MB로 증가
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sxlrcbrpvztamixcdraz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
