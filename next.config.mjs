import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const withPWA = require('next-pwa')({
  dest: 'public',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: {
      displayName: true, // 개발 중 스타일 컴포넌트의 디버깅 편의성을 높이기 위한 설정
      ssr: true, // 서버사이드 렌더링을 위해 true 유지
    },
  },

  webpack: (config) => {
    config.cache = false; // ✅ Webpack 캐시 문제 해결 (필요 시 활성화)
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/group-service/:path*',
        destination: `${
          process.env.NODE_ENV === 'development'
            ? 'http://3.39.135.47:8083/group-service/:path*'
            : 'https://urdego.com/api/group-service/:path*'
        }`,
      },
    ];
  },

  images: {
    domains: ['urdego.site'], // ✅ 외부 이미지 사용을 위해 허용할 도메인 추가
    unoptimized: true,
  },

  transpilePackages: [
    '@capacitor/core',
    '@capacitor/camera',
    '@capacitor/filesystem',
  ],
};

export default withPWA(nextConfig);
